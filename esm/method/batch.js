export default function batch (url, params, conf) {

  params = Array.isArray(params) ? params : [params] 

  const paramIndexMap = new Map()

  params.forEach((p, i) => paramIndexMap.set(p, i))

  const _this = this

  const method = conf.method || 'get'
  // max number of batchs
  const slice = conf.slice || params.length
  // retry times of a batch
  const retry = conf.retry || 0
  
  // resolve
  const responses = []

  const firstBatch = params.slice(0, slice)
  const remain = params.slice(slice)
  const failTimes = new Map()

  function rec (url, param, conf, queue) {
    return _this[method](url, param, conf)
    .then(function oneSuccess (res) {
      responses[paramIndexMap.get(param)] = res
    })
    .catch(function oneFailAndRetry (e) {

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
        error: e, 
        batch: param, 
        all: Array.from(failTimes.keys())
      })
      
    })
    .then(function recOrEnd () {
      if (queue.length > 0) {
        return rec(url, queue.shift(), conf, queue)
      }
    })
  }


  return new Promise(function promiseCreator (resolve, reject) {
    Promise.all(firstBatch.map((param, i) => rec(url, param, conf, remain)))
    .then(function allSuccess () {
      resolve(responses)
    })
    .catch(function anyFailOverRetryTimes (e) {
      reject(e)
    })
  })
  
}
