import { merge } from '../util/format'
import { defRes } from '../util/def'
import { isFunc } from '../util/func'

export default function customAdapter (conf) {

  return new Promise(function promiseCreator (resolve, reject) {

    const { adapter } = conf
    const defaultResponse = merge({}, defRes, { conf })
    
    // if 函数则执行
    // else 默认传入的是 mock 数据，包装后返回
    const res = isFunc(adapter) ? 
      adapter(conf, defaultResponse) : 
      merge(defaultResponse, { data: adapter, request: null })

    let resPromise = res instanceof Promise ? res : Promise.resolve(res)

    resPromise.then(function validResponse (res) {

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