import { isObj, isUnd, hasProp, isGetLike, isNum } from '../util/func'
import { object2Query } from '../util/format'
import { customAdapter, xhrAdapter } from '../adapter/index'
import cache from '../cache'

export default function request (conf) {

  const baseUrl = conf.baseUrl || ''
  const url = conf.url || ''

  let uri = baseUrl + url

  if (isObj(conf.params)) {
    conf.query = object2Query(conf.params)
    uri += '?' + conf.query
  }

  conf.uri = uri

  const { getCache } = conf
  const getCacheTimePeriod = isNum(getCache) && getCache > 0
  const needCache = (getCache || getCacheTimePeriod) && isGetLike(conf.method)
  
  if (needCache) {
    if (hasProp(cache, uri)) {
      return Promise.resolve(cache[uri])
    }
    else if (getCacheTimePeriod) {
      setTimeout(() => {
        if (hasProp(cache, uri)) {
          delete cache[uri]
        }
      }, getCache * 1000 + 1)
    }
  }
  

  const before = conf.beforeQueue
  const catcher = conf.catcher || (e => Promise.reject(e))

  const _conf = before.reduce(function (formatConf, transfer) {
    return transfer(formatConf)
  }, conf)

  const adapter = isUnd(_conf.adapter) ? xhrAdapter: customAdapter

  return adapter(_conf).then(function (res) {
    const after = _conf.afterQueue

    const response = after.reduce(function (formatRes, transfer) {
      return transfer(formatRes)
    }, res)

    if (needCache) {
      cache[uri] = response
    }

    return response
  })
  .catch(catcher)
}