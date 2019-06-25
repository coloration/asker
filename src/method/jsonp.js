import { jsonpAdapter } from '../adapter'
import { isStr } from '../util/func'
export default function jsonp (url, query, conf) {
  
  conf = conf || {}
  
  if (isStr(query)) {
    conf.jsonp = query
    query = undefined
  }

  conf.adapter = jsonpAdapter
  return this.get(url, query, conf)
}