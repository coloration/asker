import { jsonpAdapter } from '../adapter/index'
import { AskerJsonpConf } from '../util/type'

export default function jsonp (url: string, query?: any, conf?: AskerJsonpConf) {
  conf.adapter = jsonpAdapter
  return this.get(url, query, conf)
}