import { getMethods } from './def'

function toString (obj) {
  return Object.prototype.toString.call(obj)
}

export function isFunc (any) {
  return typeof any == 'function'
}

export function isObj (obj) {
  return toString(obj) === '[object Object]'
}

export function isNum (any) {
  return typeof any == 'number' && !isNaN(any)
}

export function isPositive (any) {
  return isNum(any) && any > 0
}

export function isUnd (any) {
  return any === undefined
}

export function isArr (any) {
  return Array.isArray(any)
}

export function isIter (any) {
  return isObj(any) || isArr(any)
}

export function isStr (any) {
  return typeof any === 'string'
}

export function identity (any) {
  return any
}

export function forEach (fn, object) {
    
    // null or undefined
  if (object == null) return

  // other
  if (typeof object != 'object') {
    fn(object, 0, object)
  }
  
  // array
  else if (isArr(object)) {
    object.forEach(function (value, index) {
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

export function hasProp (o, prop) {
  return Object.prototype.hasOwnProperty.call(o, prop)
}

export function isGetLike (method) {
  return getMethods.includes(method)
}