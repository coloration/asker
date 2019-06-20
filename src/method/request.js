import { isObj, isUnd } from '../util/func'
import { object2Query } from '../util/format'
import { customAdapter, xhrAdapter } from '../adapter'

export default function request (conf) {

  const baseUrl = conf.baseUrl || ''
  const url = conf.url || ''

  let uri = baseUrl + url

  if (isObj(conf.params)) {
    conf.query = object2Query(conf.params)
    uri += '?' + conf.query
  }

  conf.uri = uri

  const before = conf.beforeQueue

  const _conf = before.reduce(function (formatConf, transfer) {
    return transfer(formatConf)
  }, conf)

  const adapter = isUnd(_conf.adapter) ? xhrAdapter: customAdapter

  return adapter(_conf).then(function (res) {
    const after = _conf.afterQueue

    return after.reduce(function (formatRes, transfer) {
      return transfer(formatRes)
    }, res)
  })
}