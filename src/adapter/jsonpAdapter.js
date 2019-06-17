export default function jsonpAdapter (conf, defRes) {

  return new Promise(function promiseCreator (resolve, reject) {

    const callbackName = 'asker_jsonp' + new Date().getTime()
    const jsonpQuery = `${conf.jsonp}=${callbackName}`
    let uri = conf.uri

    const hasQuery = uri.split('?').length > 1

    uri += (hasQuery ? '&' : '?') + jsonpQuery

    const scriptDom = document.createElement('script')
    scriptDom.src = uri
    
    window[callbackName] = function jsonpCallback (resData) {
      const response = Object.assign({}, defRes, {
        data: resData,
        status: 200,
        statusText: 'jsonp',
        conf,
        request: uri
      })

      resolve(response)
      delete window[callbackName]
      document.body.removeChild(scriptDom)
    }

    document.body.appendChild(scriptDom)

  })
}