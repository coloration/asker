import jsonpAdapter from '../adapter/jsonpAdapter'
import { isStr } from '../util/func'
export default function jsonp (url, query, conf) {
  
  conf = conf || {}
  
  if (isStr(query)) {
    conf.jsonp = query
    query = undefined
  }

  // for conf.getCache
  conf.method = 'get'
  
  conf.adapter = jsonpAdapter
  return this.get(url, query, conf)
}