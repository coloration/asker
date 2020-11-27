import { CONTENT_TYPE } from '../util/def'
import { mergeQueue, merge, object2formdata, object2Query, object2Json } from '../util/format'
import request from './request'

export default function postGen (method) {
  return function postLike (url, body, conf) {

    const queueMap = mergeQueue(this.conf, conf)
    let _conf = merge({}, this.conf, conf)
    _conf = Object.assign(_conf, queueMap)

    _conf.method = method
    _conf.url = url

    if (body) {
      const headers = _conf.headers || {}
      let _body = null

      switch (_conf.postType) {
        
        case 'form-data':
          _body = object2formdata(body)
          delete headers[CONTENT_TYPE]
          break
        
        case 'text':
          _body = body
          headers[CONTENT_TYPE] = 'text/plain'
          break
        
        case 'form-urlencoded':
          _body = object2Query(body, true)
          headers[CONTENT_TYPE] = 'application/x-www-form-urlencoded'
          break
        
        case 'json':
        default:
          _body = object2Json(body)
          headers[CONTENT_TYPE] = 'application/json'
          break
      }

      _conf.body = _body
    }


    return request(_conf)
  }
}
