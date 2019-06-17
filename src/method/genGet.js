import { mergeConf } from '../util/format'
import request from './request'

export default function genGetMethod (method) {
  return function getLike (url, params, conf) {
    
    conf = mergeConf(this.conf, conf)
    conf.method = method
    conf.url = url
    conf.params = params

    return request(conf)
  }
}