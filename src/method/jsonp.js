import { jsonpAdapter } from '../adapter'

export default function jsonp (url, query, conf) {
  
  conf.adapter = jsonpAdapter
  return this.get(url, query, conf)
}