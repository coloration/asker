import { isFunc } from './type'
export const CONTENT_TYPE = 'Content-Type'
export const defConf = {
  url: '',
  baseUrl: '',
  query: null,
  body: null,
  headers: {},
  postType: 'json',
  resType: 'json',
  timeout: 0,
  validator: null,
  transReq: null,
  transRes: null,
  adapter: undefined,
  onUploadProgress: null,
  onDownloadProgress: null,
}

export const defRes = {
  data: null,
  status: 200,
  statusText: 'you skip request and success always',
  headers: {},
  conf: {},
  request: null

}


export const ABORT = 'ASKER:REQUEST_ABORT'
export const ERROR = 'ASKER:REQUEST_ERROR'
export const TIMEOUT = 'ASKER:REQUEST_TIMEOUT'


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