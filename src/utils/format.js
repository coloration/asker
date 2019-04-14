import { isObj } from './type'
import { forEach } from './func'

export function query2Str (obj, encode = false) {
  if (!isObj(obj)) return ''
  const result = []

  forEach((value, field) => {
    value = encode ? encodeURIComponent(value) : value
    result.push(`${field}=${value}`)
  }, obj)

  return result.join('&')
}

export function data2Json (obj) {
  return JSON.stringify(obj)
}

export function data2formdata (obj) {
  if (!isObj(obj)) return obj
  const data = new FormData()
  forEach((value, field) => data.append(field, value), obj)

  return data
}
