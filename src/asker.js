import { isFunc, isObj, isUnd } from './utils/type'
import { merge }  from './utils/helper'
import { query2Str, data2Json, data2formdata } from './utils/format'
import { customAdapter, xhrAdapter, jsonpAdapter } from './adapter'
import { ABORT, ERROR, TIMEOUT, defConf, CONTENT_TYPE } from './utils/def'
import * as util from './utils/public'
import batch from './batch'


const getMethods = ['get', 'delete', 'head', 'options']
const postMethods = ['post', 'put', 'patch']

function Asker (conf) {
  /// no new
  if (!(this instanceof Asker)) {
    return new Asker(conf)
  }

  conf = conf || {}
  this._reqQueue = []
  this._resQueue = []

  this.conf = merge({}, Asker.conf, conf)

  isFunc(Asker.conf.transReq) && this._reqQueue.push(Asker.conf.transReq)
  isFunc(Asker.conf.transRes) && this._resQueue.push(Asker.conf.transRes)

  isFunc(conf.transReq) && this._reqQueue.push(conf.transReq)
  isFunc(conf.transRes) && this._resQueue.push(conf.transRes)

}

let instance = null

function staticMethodGenerator (method) {
  Asker[method] = function () {
    instance = instance || new Asker()
    return instance[method](...arguments)
  }
}


function getMethodGenerator (method) {
  Asker.prototype[method] = function (url, query, conf) {
    conf = conf || {}
    const _conf = merge({}, this.conf, conf, { method, url })
    
    const _reqQueue = this._reqQueue.slice()
    const _resQueue = this._resQueue.slice()
    
    isFunc(conf.transReq) && _reqQueue.push(conf.transReq)
    isFunc(conf.transRes) && _resQueue.push(conf.transRes)

    let _url = _conf.baseUrl + _conf.url 
    if (isObj(query)) {
      _url += '?' + query2Str(query)
      _conf.query = query
    }

    const body = _conf.body || null 

    Object.assign(_conf, { _reqQueue, _resQueue, _url, body })

    return ask(_conf)
  }
} 


function postMethodGenerator (method) {
  Asker.prototype[method] = function (url, params, conf) {
    conf = conf || {}
    const _conf = merge({}, this.conf, conf, { method, url })

    const _reqQueue = this._reqQueue.slice()
    const _resQueue = this._resQueue.slice()

    isFunc(conf.transReq) && _reqQueue.push(conf.transReq)
    isFunc(conf.transRes) && _resQueue.push(conf.transRes)
    
    let _url = _conf.baseUrl + _conf.url

    if (isObj(_conf.query)) {
      _url += '?' + query2Str(_conf.query)
    }

    let body = null
    const headers = _conf.headers
    switch (_conf.postType) {
      case 'form-data':
        body = data2formdata(params)
        delete headers[CONTENT_TYPE]
        break
      
      case 'text':
        body = params
        headers[CONTENT_TYPE] = 'text/plain'
        break

      case 'form-urlencoded':
        body = query2Str(params, true)
        headers[CONTENT_TYPE] = 'application/x-www-form-urlencoded'
        break

      case 'json':
      default:
        body = data2Json(params)
        headers[CONTENT_TYPE] = 'application/json'
        break
    }
    
    Object.assign(_conf, { _url, _reqQueue, _resQueue, body })
    return ask(_conf) 
  }
}

function ask (conf) {
  conf = conf._reqQueue.reduce(
    (formatConf, reqTransfer) => reqTransfer(formatConf),
    conf
  )
  
  const resPromise = isUnd(conf.adapter) ? 
    xhrAdapter(conf) : 
    customAdapter(conf)

  return resPromise.then(res => {
    return conf._resQueue.reduce(
      (formatRes, resTransfer) => resTransfer(formatRes),
      res
    )
  })

}


Asker.prototype.jsonp = function jsonp (url, query, conf) {
  
  conf.adapter = jsonpAdapter

  return this.get(url, query, conf)
}

Asker.prototype.batch = batch

Asker.type = { ABORT, ERROR, TIMEOUT }
Asker.conf = merge({}, defConf)
Asker.util = util

getMethods.forEach(getMethodGenerator)
postMethods.forEach(postMethodGenerator)
getMethods.concat(postMethods).concat(['jsonp', 'batch']).forEach(staticMethodGenerator)


export default Asker