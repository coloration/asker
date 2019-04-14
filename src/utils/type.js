function toString (obj) {
  return Object.prototype.toString.call(obj)
}

export function isFunc (obj) {
  return typeof obj === 'function'
}

export function isObj (obj) {
  return toString(obj) === '[object Object]'
}

export function isNum (obj) {
  return typeof obj === 'number'
}

export function isPositive (obj) {
  return isNum(obj) && obj > 0
}

export function isUnd (obj) {
  return obj === void 0
}

export function isArr (obj) {
  return Array.isArray(obj)
}