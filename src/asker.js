import { mergeConf }  from './util/format'
import { ABORT, ERROR, TIMEOUT, defConf } from './util/def'
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

function Asker (conf) {
  /// no new
  if (!(this instanceof Asker)) {
    return new Asker(conf)
  }

  this.conf = mergeConf(Asker.conf, conf)

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

Asker.errorType = { ABORT, ERROR, TIMEOUT }
Asker.conf = mergeConf({}, defConf)


export default Asker