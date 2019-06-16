export function isFunc (any: any) {
  return typeof any == 'function'
}

export function isObj (any: any) {
  return any != null && typeof any == 'object'
}

export function isNum (any: any) {
  return typeof any == 'number' && !isNaN(any)
}

export function isPositive (any: any) {
  return isNum(any) && any > 0
}

export function isUnd (any: any) {
  return any === undefined
}

export function isArr (any: any) {
  return Array.isArray(any)
}

export function isIter (any: any) {
  return isObj(any) || isArr(any)
}

export function isStr (any: any) {
  return typeof any === 'string'
}

export function forEach (
  fn: (value: any, key: number | string, object: any) => void,
  object: any
  ) {
    
    // null or undefined
    if (object == null) return

    // other
    if (typeof object != 'object') {
      fn(object, 0, object)
    }
    
    // array
    else if (isArr(object)) {
      object.forEach(function (value: any, index: number) {
        fn.call(null, value, index, object)
      })
    }

    // object
    else {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          fn.call(null, object[key], key, object)
        }
      }
    }
      
    
    
}