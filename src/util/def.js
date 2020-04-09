export const CONTENT_TYPE = 'Content-Type'

export const defConf = {
  url: '',
  baseUrl: '',
  query: '',
  body: null,
  headers: {},
  postType: 'json',
  responseType: 'json',
  timeout: 0,
  // method: undefined,
  // before: null,
  // after: null,
  // validator: null,
  // adapter: undefined,
  // onError: undefined,
  // onTimeout: undefined,
  // onAbort: undefined,
  // onUploadProgress: undefined,
  // onDownloadProgress: undefined,
  // withCredentials: undefined
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


