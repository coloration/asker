import { isArr } from './type'

export function forEach(fn, obj) {
  // null or undefind
  if (obj == null) return

  // Force an array if not already something iterable
  if (typeof obj !== 'object') obj = [obj]

  if (isArr(obj)) {
    // Iterate over array values
    obj.forEach((o, i) => fn.call(null, o, i, obj))
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
    }
  }
}