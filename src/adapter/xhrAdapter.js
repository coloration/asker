import { forEach } from '../utils/func'
import { isFunc, isPositive } from '../utils/type'
import { merge } from '../utils/helper'
import { defRes, getResHeaders, ABORT, ERROR, TIMEOUT } from '../utils/def' 

export default function xhrAdapter (conf) {
  return new Promise(function promiseCreator (resolve, reject) {
    let xhr = new XMLHttpRequest()
    
    xhr.onreadystatechange = function handleStateChange () {
      if (!xhr || xhr.readyState !== 4) return
      
      const valid = isFunc(conf.validator) ? 
        conf.validator(xhr.status) :
        xhr.status >= 200 && xhr.status < 300
      
      if (!valid) return reject({ 
        message: xhr.responseText, 
        status: xhr.status
      })

      const headers = getResHeaders(xhr)
      const res = merge({}, defRes, {
        data: conf.resType === 'text' ? xhr.responseText : JSON.parse(xhr.responseText),
        status: xhr.status,
        statusText: xhr.statusText,
        headers,
        conf,
        request: xhr
      })

      xhr  = null
      resolve(res)
    }

    xhr.onabort = function handleAbort () {
      if (!xhr) return 
      isFunc(conf.onAbort) ? conf.onAbort(ABORT) : reject(ABORT)
      xhr = null
    }

    xhr.onerror = function handleError () {
      if (!xhr) return 
      isFunc(conf.onError) ? conf.onError(ERROR) : reject(ERROR)
      xhr = null
    }

    xhr.ontimeout = function handleTimeout () {
      if (!xhr) return 
      isFunc(conf.onTimeout) ? conf.onTimeout(TIMEOUT) : reject(TIMEOUT)
      xhr = null
    }

    if (isPositive(conf.timeout)) xhr.timeout = conf.timeout * 1000
    const reqHeaders = conf.headers
    xhr.open(conf.method.toUpperCase(), conf._url, true)

    forEach(function formatHeader (header, key) {
      if (!conf.body && key.toLowerCase() === 'content-type') {
        delete reqHeaders[key]
      }
      else {
        xhr.setRequestHeader(key, header)
      }
    }, reqHeaders)

    if (isFunc(conf.onDownloadProgress)) 
      xhr.onprogress = function progress (e) {
        conf.onDownloadProgress(e)
      }
    
    if (isFunc(conf.onUploadProgress) && xhr.upload) 
      xhr.upload.addEventListener('progress', function (progressEvent) {
        conf.onUploadProgress(progressEvent, xhr, conf)
      })
    
    xhr.send(conf.body)
  })
}