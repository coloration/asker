import { AskerConf, GetLikeMethod, GetLike } from '../util/type'
import { mergeConf } from '../util/format'
import request from './request'

export default function genGetMethod (method: GetLikeMethod): GetLike {
  return function getLike (url: string, query?: any, conf?: AskerConf) {
    
    conf = mergeConf(this.conf, conf)
    conf.method = method
    conf.url = url
    conf.query = query

    return request(conf)
  }
}