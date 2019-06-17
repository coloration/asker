import { isObj, isUnd } from '../util/func'
import { object2Query } from '../util/format'
import { customAdapter, xhrAdapter } from '../adapter'

export default function request (conf) {
  let uri = conf.baseUrl + conf.url

  if (isObj(conf.params)) {
    conf.query = object2Query(conf.params)
    uri += '?' + conf.query
  }

  conf.uri = uri

  const before = conf.before

  conf = before.reduce(function (formatConf, transfer) {
    return transfer(formatConf)
  }, conf)

  const adapter = isUnd(conf.adapter) ? xhrAdapter: customAdapter

  return adapter(conf).then(function (res) {
    const after = conf.after

    return after.reduce(function (formatRes, transfer) {
      return transfer(formatRes)
    }, res)
  })
}