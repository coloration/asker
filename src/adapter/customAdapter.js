import { merge } from '../utils/helper'
import { defRes } from '../utils/def'
import { isFunc } from '../utils/type'

export default function customAdapter (conf) {
  return new Promise((resolve, reject) => {
    const { adapter } = conf
    const defaultResponse = merge({}, defRes, { conf })
    const res = isFunc(adapter) ? 
      adapter(conf, defaultResponse) : 
      merge(defaultResponse, { data: adapter, request: null })

    let resPromise = res instanceof Promise ? res : Promise.resolve(res)

    resPromise.then(function (res) {
      const valid = isFunc(conf.validator) ? 
        conf.validator(res.status) :
        res.status >= 200 && res.status < 300
      
      valid ? resolve(res) : reject({ 
        message: `adapter return status: ${res.status}`,
        status: res.status
      })
    }) 
    
  })
}