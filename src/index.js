import Asker from './asker'
import { splitBlob, safeCall } from './public'
import { batch, jsonp, genGet, genPost } from './method' 

const getMethods = ['get', 'delete', 'head', 'options']
const postMethods = ['post', 'put', 'patch']

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
export { splitBlob, safeCall }
export { object2Query } from './util/format'