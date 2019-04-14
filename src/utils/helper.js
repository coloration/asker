import { forEach } from './func'
import { isObj, isArr } from './type'

export function merge (origin, ...args) {
  const filterArgs = args.filter(arg => arg != null)
  
  filterArgs.reduce((origin, arg) => {
    if (!isObj(arg) && !isArr(arg)) throw `merge a ${arg} to object`
    forEach((value, key) => {

      if (isObj(value)) {
        origin[key] = merge(isObj(origin[key]) ? origin[key] : {}, value)
      }
      else if (isArr(value)) {
        origin[key] = merge(isArr(origin[key]) ? origin[key] : [], value)
      }
      else {
        origin[key] = value  
      }
      
    }, arg)
    return origin
  }, origin)

  return origin
}