import Asker from './asker'
import { Canceler } from './canceler'

import { batch, jsonp, genGet, genPost } from './method' 
import { getMethods, postMethods } from './util/def'

let instance = null

function staticMethodGenerator (method) {
  
  Asker[method] = function () {
    instance = instance || new Asker()
    return instance[method](...arguments)
  }
}

getMethods.forEach(function (method) {
  Asker.prototype[method] = genGet(method)
})
postMethods.forEach(function (method) {
  Asker.prototype[method] = genPost(method)
})
getMethods.concat(postMethods).concat(['jsonp', 'batch']).forEach(staticMethodGenerator)

Asker.prototype.jsonp = jsonp
Asker.prototype.batch = batch


export default Asker
export { Asker }
export { Canceler }
export { splitBlob, safeCall, HttpStatus } from './public'
export { object2Query, query2Object } from './util/format'
