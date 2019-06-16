import { ResponseHeaders, AskerConf, ConfTransfer, ResponseTransfer } from './type'
import { isObj, isArr, isIter, isFunc, forEach } from './func'

export function object2Query (obj: Object, encode = false) {
  
  if (!isObj(obj)) return ''
  
  const r: string[] = []

  forEach(function handlePair (val, key) {
    val = encode ? encodeURIComponent(val) : val
    r.push(`${key}=${val}`)
  }, obj) 

  return r.join('&')
  
}

export function object2Json (obj: Object) {
  return JSON.stringify(obj)
}

export function object2formdata (obj: Object) {

  if (!isIter(obj)) return null
  const data = new FormData()
  forEach(function handlePair (val, key) {
    return data.append(String(key), val)
  }, obj)

  return data

}

export function merge (o: any, ...args: Object[]) {
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

const ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]

export function getResHeaders (xhr: XMLHttpRequest): ResponseHeaders {
  if (!isFunc(xhr.getAllResponseHeaders)) return null

  const headerStr = xhr.getAllResponseHeaders()
  const parsed: ResponseHeaders = {}
  let key: string, val: string, i: number

  headerStr.split('\n').forEach(function parser(line) {
    
    i = line.indexOf(':')
    key = line.substr(0, i).trim().toLowerCase()
    val = line.substr(i + 1).trim()

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.includes(key)) {
        return
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] || []).concat(val)
      }
      else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val
      }
    }
  })

  return parsed

}

export function mergeConf (conf1: AskerConf, conf2: AskerConf) {
  const before: ConfTransfer[] = 
    [].concat(conf1.before).concat(conf2.before).filter(isFunc)

  const after: ResponseTransfer[] = 
    [].concat(conf1.after).concat(conf1.after).filter(isFunc)

  const newConf: AskerConf = merge({}, conf1, conf2)
  
  newConf.before = before
  newConf.after = after
  
  return newConf
}