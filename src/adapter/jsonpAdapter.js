export default function jsonpAdapter (conf, defRes) {
  return new Promise(function (resolve, reject) {

    const callbackName = 'asker_jsonp' + new Date().getTime()
    const jsonpQuery = `${conf.jsonp}=${callbackName}`

    let url = conf._url

    const hasQuery = conf._url.split('?').length > 1

    url += hasQuery ? '&' : '?' + jsonpQuery

    const scriptDom = document.createElement('script')
    scriptDom.src = url
    
    window[callbackName] = function (resData) {
      const response = Object.assign({}, defRes, {
        data: resData,
        status: 200,
        statusText: 'jsonp',
        conf,
        request: url
      })

      resolve(response)
      delete window[callbackName]
      document.body.removeChild(scriptDom)
    }


    document.body.appendChild(scriptDom)


  })
}