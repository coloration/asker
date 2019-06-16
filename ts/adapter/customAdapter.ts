import { AskerConf, defRes, AskerResponse } from '../util/type'
import { isFunc } from '../util/func'

export default function customAdapter (conf: AskerConf) {

  return new Promise(function custom (resolve, reject) {

    const { adapter } = conf
    const defResponse: AskerResponse = Object.create(defRes)

    defResponse.conf = conf

    const res: AskerResponse | Promise<AskerResponse> = isFunc(adapter) ?
      adapter(conf, defResponse) :
      Object.assign(defResponse, { data: adapter })

    const resPromise = res instanceof Promise ? res : Promise.resolve(res)

    resPromise.then(function valid (res) {
      
      const valid = isFunc(conf.validator) ?
        conf.validator(res.status) :
        res.status >= 200 && res.status < 300
      
      valid ? resolve(res) : reject(Error('adapter return status: ' + res.status))
    })

  })
}