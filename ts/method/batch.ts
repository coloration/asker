import { AskerBatchConf } from '../util/type'
import { isArr } from '../util/func'

export default function batch (url: string, params: any, conf: AskerBatchConf) {

  const paramList: any[] = isArr(params) ? params : [params]
  
  const _this = this

  const method = conf.method || 'get'
  // max number of batch
  const slice = conf.slice || paramList.length
  // retry times of a batch
  const retry = conf.retry || 0

  const responses: any[] = []

  const firstBatch = paramList.slice(0, slice)
  const remain = paramList.slice(slice)

  const failTimes = new Map<any, number>()

  function rec (url: string, param: any, conf: AskerBatchConf, queue: any[]) {
    return _this[method](url, param, conf)
    .then(function oneSuccess (res: any) {
      responses.push(res)
    })
    .catch(function oneFailAndRetry (e: Error) {

      if (!failTimes.get(param)) {
        failTimes.set(param, 0)
      }

      const times = failTimes.get(param)

      if (times < retry) {
        failTimes.set(param, times + 1)
        queue.push(param)
        return Promise.resolve()
      }

      return Promise.reject({
        error: e, which: param, all: Array.from(failTimes.keys())
      })
    })
    .then(function recOrEnd () {
      if (queue.length > 0) {
        return rec(url, queue.shift(), conf, queue)
      }
    })
  }

  return new Promise(function promiseCreator (resolve, reject) {

    const batchPromises = firstBatch.map(param => rec(url, param, conf, remain))
    Promise.all(batchPromises)
    .then(function allSuccess () {
      resolve(responses)
    })
    .catch(function anyFailOverRetryTimes (e) {
      reject(e)
    })
  })
}