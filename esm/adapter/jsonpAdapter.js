export default function jsonpAdapter (conf, defRes) {

  return new Promise(function promiseCreator (resolve) {

    const callbackName = 'asker_jsonp' + new Date().getTime()
    const jsonpQuery = `${conf.jsonp}=${callbackName}`
    let uri = conf.uri

    const hasQuery = uri.split('?').length > 1

    uri += (hasQuery ? '&' : '?') + jsonpQuery

    const scriptDom = document.createElement('script')
    scriptDom.src = uri

    function clear () {

      if (!window[callbackName]) return

      delete window[callbackName]
      document.body.removeChild(scriptDom)
    }
    
    window[callbackName] = function jsonpCallback (resData) {
      const response = Object.assign({}, defRes, {
        data: resData,
        status: 200,
        statusText: 'jsonp',
        conf,
        request: uri
      })

      resolve(response)
      clear()
    }

    if (conf.canceler) conf.canceler.promise.then(clear)

    if (!window[callbackName]) return

    document.body.appendChild(scriptDom)

  })
}