import { mergeQueue, merge } from '../util/format'
import request from './request'

export default function genGetMethod (method) {
  return function getLike (url, params, conf) {
    
    const queueMap = mergeQueue(this.conf, conf)
    
    

    let _conf = merge({}, this.conf, conf)
    _conf = Object.assign(_conf, queueMap)
    
    _conf.method = method
    _conf.url = url
    _conf.params = params

    return request(_conf)
  }
}