import { isObj, isArr, isStr, isFunc, isIter, forEach } from './func'

export function object2Query (obj, encode = false) {
  if (!isObj(obj)) return ''
  
  const result = []

  forEach((value, field) => {
    value = JSON.stringify(value)
    value = encode ? encodeURIComponent(value) : value
    result.push(`${field}=${value}`)
  }, obj)

  return result.join('&')
}

export function query2Object (query, raw = false) {
  if (!isStr(query)) return query
  query = query.replace(/^.*\?/, '')
  
  return query.split('&').reduce(function (acc, curr) {
    const p = curr.split('=')
    if (p.length === 2) {
      let val = p[1]
      if (raw) {
        try { val = JSON.parse(val) } catch (e) {/* */}
      }
      acc[p[0]] = val
    }
    return acc
  }, {})
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

export function merge (...args) {

  const objArgs = args.filter(arg => isIter(arg))
  const o = objArgs.shift()

  objArgs.reduce((o, arg) => {
    if (!isIter(arg)) throw TypeError(`merge a ${arg} to object`)

    forEach(function handlePair (val, key) {
      
      const curr = o[key]

      if (isObj(val)) {
        o[key] = merge(isObj(curr) ? curr : {}, val)
      }
      else if (isArr(val)) {
        o[key] = merge(isArr(curr) ? curr : [], val)
      }
      else {
        o[key] = val
      }
        

    }, arg)
  
    return o

  }, o)

  return o
}


export function mergeQueue () {
  
  let beforeQueue = []
  let afterQueue = []

  const confs = Array.from(arguments).filter(conf => conf)

  confs.forEach(conf => {
    const b = conf.before
    const a = conf.after
    if (isFunc(b) || isArr(b)) {
      beforeQueue = beforeQueue.concat(b)
    }

    if (isFunc(a) || isArr(a)) {
      afterQueue = afterQueue.concat(a)
    }
  })
  
  return { beforeQueue, afterQueue }
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


export function createErr (status, message) {
  return { status, message }
}