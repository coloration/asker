import { isObj, isArr, isFunc, isIter, forEach } from './func'

export function object2Query (obj, encode = false) {
  if (!isObj(obj)) return ''
  
  const result = []

  forEach((value, field) => {
    value = encode ? encodeURIComponent(value) : value
    result.push(`${field}=${value}`)
  }, obj)

  return result.join('&')
}

export function object2Json (obj) {
  return JSON.stringify(obj)
}

export function object2formdata (obj) {
  if (!isObj(obj) && !isArr(obj)) return obj
  const data = new FormData()
  forEach((value, field) => data.append(field, value), obj)

  return data
}

export function merge (o, ...args) {
  o = isIter(o) ? o : {}

  const objArgs = args.filter(arg => isIter(arg))

  objArgs.reduce((o, arg) => {
    if (!isIter(arg)) throw TypeError(`merge a ${arg} to object`)

    forEach(function handlePair (val, key) {
      
      const curr = o[key]
      
      if (isObj(val)) 
        o[key] = merge(isObj(curr) ? curr : {}, val)
      
      else if (isArr(val)) 
        o[key] = merge(isArr(curr) ? curr : [], val)
      
      else 
        o[key] = val

    }, arg)
  
    return o

  }, o)

  return o
}


export function mergeConf (conf1, conf2 = {}) {
  const before = 
    [].concat(conf1.before).concat(conf2.before).filter(isFunc)

  const after = 
    [].concat(conf1.after).concat(conf1.after).filter(isFunc)

  const newConf = merge({}, conf1, conf2)
  
  newConf.before = before
  newConf.after = after
  
  return newConf
}

const ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]

export function getResHeaders(xhr) {

  if (!isFunc(xhr.getAllResponseHeaders)) return null

  const headerStr = xhr.getAllResponseHeaders()
  const parsed = {}
  let key
  let val
  let i


  headerStr.split('\n').forEach(function parser(line) {
    
    i = line.indexOf(':')
    key = line.substr(0, i).trim().toLowerCase()
    val = line.substr(i + 1).trim()

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.includes(key)) {
        return
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val])
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
      }
    }
  })

  return parsed
}