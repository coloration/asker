export function Canceler () {
  
  if (!(this instanceof Canceler)) return new Canceler()

  this.promise = new Promise(function cancelExecutor (resolve) {
    this.resolve = resolve
  }.bind(this))

}


Canceler.prototype.cancel = function (cancelSuccessCallback) {
  this.resolve(cancelSuccessCallback)
}