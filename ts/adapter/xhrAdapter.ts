import { isFunc, isPositive } from '../util/func'
import { AskerConf, AskerResponse, defRes, AskerError, AskerErrorType } from '../util/type'
import { getResHeaders } from '../util/format'
import { forEach } from '../util/func'

export default function xhrAdapter (conf: AskerConf) {
  
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
      const defResponse: AskerResponse = Object.create(defRes)

      Object.assign(defResponse, {
        data: conf.responseType === 'object' ? 
          JSON.parse(xhr.responseText) : xhr.responseText,
        status: xhr.status,
        statusText: xhr.statusText,
        headers,
        conf,
        request: xhr
      })

      xhr = null

      resolve(defResponse)

    }

    xhr.onabort = function handleAbort () {
      
      if (!xhr) return

      const err = new AskerError(AskerErrorType.ABORT)

      isFunc(conf.onAbort) ? conf.onAbort.call(null, err , xhr) : reject(err)
      
      xhr = null
    }

    xhr.onerror = function handleAbort () {

      if (!xhr) return
      
      const err = new AskerError(AskerErrorType.ERROR)

      isFunc(conf.onError) ? conf.onError.call(null, err, xhr) : reject(err)

      xhr = null
    }

    xhr.ontimeout = function handleTimeout () {

      if (!xhr) return
      const err = new AskerError(AskerErrorType.TIMEOUT)

      isFunc(conf.onTimeout) ? conf.onTimeout.call(null, err, xhr) : reject(err)
    }

    if (isPositive(conf.timeout)) xhr.timeout = conf.timeout * 1000

    const reqHeaders = conf.headers

    const method = conf.method ? conf.method.toUpperCase() : 'GET'

    xhr.open(method, conf.uri, true)

    forEach(function formatHeader (header, key: string) {
      
      if (!conf.body && key.toLowerCase() === 'content-type') {
        delete reqHeaders[key]
      }
      else {
        xhr.setRequestHeader(key, header)
      }

    }, reqHeaders)

    // batch will need conf to calc the load / total

    if (isFunc(conf.onDownloadProgress))
      xhr.addEventListener('progress', function (ev: ProgressEvent) {
        conf.onDownloadProgress.call(null, ev, xhr, conf)
      })
    
      
    if (isFunc(conf.onUploadProgress) && xhr.upload)
      xhr.upload.addEventListener('progress', function (ev: ProgressEvent) {
        conf.onUploadProgress.call(null, ev, xhr, conf)
      })
    
    xhr.send(conf.body)
  })


}