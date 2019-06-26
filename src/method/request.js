import { isObj, isUnd, hasProp, isGetLike } from '../util/func'
import { object2Query } from '../util/format'
import { customAdapter, xhrAdapter } from '../adapter'
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

  const needCache = conf.getCache && isGetLike(conf.method)
  
  if (needCache && hasProp(cache, uri)) {
    return Promise.resolve(cache[uri])
  }

  const before = conf.beforeQueue

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
}