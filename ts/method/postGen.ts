import { AskerConf, PostLikeMethod, PostLike, PostType, CONTENT_TYPE } from '../util/type'
import { mergeConf, object2formdata, object2Query, object2Json } from '../util/format'
import request from './request'

export default function postGen (method: PostLikeMethod) : PostLike {
  return function postLike (url: string, body?: any, conf?: AskerConf) {

    conf = mergeConf(this.conf, conf)
    conf.method = method
    conf.url = url

    if (body) {
      const headers = conf.headers || {}
      let _body: any = null

      switch (conf.postType) {
        
        case PostType.formData:
          _body = object2formdata(body)
          delete headers[CONTENT_TYPE]
          break
        
        case PostType.text:
          _body = body
          headers[CONTENT_TYPE] = 'text/plain'
          break
        
        case PostType.formUrlencoded:
          _body = object2Query(body, true)
          headers[CONTENT_TYPE] = 'application/x-www-form-urlencoded'
          break
        
        case PostType.json:
        default:
          _body = object2Json(body)
          headers[CONTENT_TYPE] = 'application/json'
          break
      }

      conf.body = _body
    }


    return request(conf)
  }
}
