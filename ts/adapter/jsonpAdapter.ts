import { AskerJsonpConf, AskerResponse, NormalObject } from '../util/type'

export default function jsonpAdapter (conf: AskerJsonpConf) {

  return new Promise(function jsonp (resolve) {
    
    const cbName = 'asker_jp' + new Date().getTime()
    const jsonpQuery = conf.jsonp + cbName
    const hasQuery = conf._url.split('?').length > 1
    const w: any = window
    let url: string = conf._url

    url += hasQuery ? '&' : '?' + jsonpQuery

    conf._url = url 

    const scriptDom = document.createElement('script')
    scriptDom.src = url

    w[cbName] = function jsonpCb (resData: NormalObject) {
      const response: AskerResponse = {
        data: resData,
        status: 200,
        statusText: 'OK',
        headers: {},
        conf: conf,
        request: 'JSONP'
      }

      resolve(response)

      delete w[cbName]
      document.body.removeChild(scriptDom)
    }

    document.body.appendChild(scriptDom)

  })
}