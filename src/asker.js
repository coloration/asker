import { isFunc, isObj, isUnd } from './utils/type'
import { merge }  from './utils/helper'
import { query2Str, data2Json, data2formdata } from './utils/format'
import { customAdapter, xhrAdapter } from './adapter'
import { ABORT, ERROR, TIMEOUT, defConf, CONTENT_TYPE } from './utils/def'

const getMethods = ['get', 'delete', 'head', 'options']
const postMethods = ['post', 'put', 'patch']

function Asker (conf) {

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
  Asker.prototype[method] = function (url, params, conf) {
    conf = isObj(url) ? url : conf || {}
    
    const _conf = merge({}, this.conf, conf, { method, url, params })
    
    const _reqQueue = [...this._reqQueue]
    const _resQueue = [...this._resQueue]
    
    isFunc(conf.transReq) && _reqQueue.push(conf.transReq)
    isFunc(conf.transRes) && _resQueue.push(conf.transRes)

    const _url = _conf.baseUrl + _conf.url + '?' + query2Str(params)
    const _data = null 

    Object.assign(_conf, { _reqQueue, _resQueue, _url, _data })

    return ask(_conf)
  }
} 


function postMethodGenerator (method) {
  Asker.prototype[method] = function (url, params, conf) {
    conf = isObj(url) ? url : conf || {}
    
    const _conf = merge({}, this.conf, conf, { method, url, params })

    const _reqQueue = [...this._reqQueue]
    const _resQueue = [...this._resQueue]

    isFunc(conf.transReq) && _reqQueue.push(conf.transReq)
    isFunc(conf.transRes) && _resQueue.push(conf.transRes)
    
    const _url = _conf.baseUrl + _conf.url

    let _data = null
    const headers = _conf.headers
    switch (_conf.postType) {
      case 'form-data':
        _data = data2formdata(params)
        delete headers[CONTENT_TYPE]
        break
      
      case 'text':
        _data = params
        headers[CONTENT_TYPE] = 'text/plain'
        break

      case 'form-urlencoded':
        _data = query2Str(params, true)
        headers[CONTENT_TYPE] = 'application/x-www-form-urlencoded'
        break

      case 'json':
      default:
        _data = data2Json(params)
        headers[CONTENT_TYPE] = 'application/json'
        break
    }

    Object.assign(_conf, { _url, _data, _reqQueue, _resQueue })

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

Asker.type = { ABORT, ERROR, TIMEOUT }
Asker.conf = merge({}, defConf)

getMethods.forEach(getMethodGenerator)
postMethods.forEach(postMethodGenerator)
getMethods.concat(postMethods).forEach(staticMethodGenerator)

export default Asker