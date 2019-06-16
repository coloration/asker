import { isObj, isUnd } from '../util/func'
import { AskerConf, ConfTransfer, ResponseTransfer } from '../util/type'
import { object2Query } from '../util/format'
import { customAdapter, xhrAdapter } from '../adapter/index'

export default function request (conf: AskerConf) {
  let uri = conf.baseUrl + conf.url

  if (isObj(conf.query)) {
    uri += '?' + object2Query(conf.query)
  }

  conf.uri = uri

  const before: ConfTransfer[] = conf.before as any

  conf = before.reduce(function (formatConf: AskerConf, transfer: ConfTransfer) {
    return transfer(formatConf)
  }, conf)

  const adapter = isUnd(conf.adapter) ? xhrAdapter: customAdapter

  return adapter(conf).then(function (res: any) {
    const after: ResponseTransfer[] = conf.after as any

    return after.reduce(function (formatRes: any, transfer: ResponseTransfer) {
      return transfer(formatRes)
    }, res)
  })
}