import { forEach, isFunc, isPositive, isUnd } from '../util/func'
import { merge, getResHeaders, createErr } from '../util/format'
import { defRes, ABORT, ERROR, TIMEOUT } from '../util/def' 
import { Canceler } from '../canceler'

export default function xhrAdapter (conf) {
  return new Promise(function promiseCreator (resolve, reject) {
    let xhr = new XMLHttpRequest()

    function clear () {
      xhr = null
    }
    
    xhr.onreadystatechange = function handleStateChange () {
      if (!xhr || xhr.readyState !== 4) return
      if (xhr.status === 0) return

      const valid = isFunc(conf.validator) ? 
        conf.validator(xhr.status) :
        xhr.status >= 200 && xhr.status < 300
      
      if (!valid) return reject(createErr(xhr.status, xhr.responseText))

      const headers = getResHeaders(xhr)
      const res = merge({}, defRes, {
        data: conf.responseType === 'text' ? xhr.responseText : JSON.parse(xhr.responseText),
        status: xhr.status,
        statusText: xhr.statusText,
        headers,
        conf,
        request: xhr
      })

      clear()
      resolve(res)
    }

    
    xhr.onabort = function handleAbort () {
      if (!xhr) return 
      isFunc(conf.onAbort) ? 
        conf.onAbort.call(null, ABORT, xhr) : 
        reject(createErr(xhr.status, ABORT))
      
      clear()
    }

    xhr.onerror = function handleError () {
      if (!xhr) return 
      isFunc(conf.onError) ? 
        conf.onError.call(null, ERROR, xhr) : 
        reject(createErr(xhr.status, ERROR))
      
      clear()
    }

    xhr.ontimeout = function handleTimeout () {
      if (!xhr) return 
      isFunc(conf.onTimeout) ? 
        conf.onTimeout.call(null, TIMEOUT, xhr) : 
        reject(createErr(xhr.status, TIMEOUT))
      
      clear()
    }

    if (isPositive(conf.timeout)) xhr.timeout = conf.timeout

    if (conf.withCredentials) xhr.withCredentials = true

    // 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED
    xhr.open(conf.method.toUpperCase(), conf.uri, true)
    
    const reqHeaders = conf.headers

    forEach(function formatHeader (header, key) {
      if (!conf.body && key.toLowerCase() === 'content-type') {
        delete reqHeaders[key]
      }
      else {
        xhr.setRequestHeader(key, header)
      }
    }, reqHeaders)

    // Add withCredentials to request if needed
    if (!isUnd(conf.withCredentials)) {
      xhr.withCredentials = !!conf.withCredentials
    }

    if (isFunc(conf.onDownloadProgress)) 
      xhr.addEventListener('progress', function progress (progressEvent) {
        conf.onDownloadProgress.call(null, progressEvent, xhr, conf)
      })
    
    // batch will need conf to calc the load / total
    if (isFunc(conf.onUploadProgress) && xhr.upload) 
      xhr.upload.addEventListener('progress', function (progressEvent) {
        conf.onUploadProgress.call(null, progressEvent, xhr, conf)
      })
    
    if (conf.canceler) {
      conf.canceler.promise.then(function xhrCancel () {
        if (xhr) {
          xhr.abort()
          clear()
        }
      })
    }

    if (!xhr) return

    xhr.send(conf.body)

  })
}