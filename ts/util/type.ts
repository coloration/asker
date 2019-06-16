export const CONTENT_TYPE = 'Content-Type'

export enum AskerErrorType {
  ABORT = 'ASKER:REQUEST_ABORT',
  ERROR = 'ASKER:REQUEST_ERROR',
  TIMEOUT = 'ASKER:REQUEST_TIMEOUT',
}

export class AskerError extends Error {
  message: AskerErrorType

  constructor(message: AskerErrorType) {
    super()
    this.message = message
  }
}

export type GetLike = (url: string, query?: any, conf?: AskerConf) => Promise<any>
export type PostLike = (url: string, body?: any, conf?: AskerConf) => Promise<any>


export enum GetLikeMethod {
  get = 'get',
  head = 'head',
  option = 'option'

}

export enum PostLikeMethod {
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch'
}

export enum PostType {
  json = 'json',
  formData = 'form-data',
  text = 'text',
  formUrlencoded = 'form-urlencoded'
}

export type AskerConf = {
  url?: string,
  baseUrl?: string,
  query?: string,
  body?: any,
  params?: NormalObject,
  method?: GetLikeMethod | PostLikeMethod,
  headers?: NormalObject
  postType?: PostType,
  responseType?: 'object' | 'json',
  timeout?: 0,
  validator?: (status: number) => boolean,

  before?: ConfTransfer | ConfTransfer[],
  after?: ResponseTransfer | ResponseTransfer[]

  adapter?: any,
  onError?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any,
  onAbort?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any,
  onTimeout?: (err: AskerError, xhr: XMLHttpRequest, conf: AskerConf) => any,

  onUploadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any,
  onDownloadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any

  [key: string]: any
}

export type ConfTransfer = (conf: AskerConf) => AskerConf
export type ResponseTransfer = (response: any) => any


export const defConf: AskerConf = {
  url: '',
  baseUrl: '',
  query: '',
  params: {},
  body: null,
  headers: {},
  postType: PostType.json,
  responseType: 'object',
  timeout: 0,
  validator: null,
  before: [],
  after: [],
  adapter: undefined,
  onAbort: null,
  onError: null,
  onTimeout: null,
  onUploadProgress: null,
  onDownloadProgress: null,

}



export type AskerJsonpConf = AskerConf & {
  jsonp?: string
}

export type AskerBatchConf = AskerConf & {
  slice?: number,
  retry?: number
}


export type ResponseHeaders = {
  [key: string] : string | string[]
}

export type AskerResponse = {
  data: any,
  status: number,
  statusText: string,
  headers: ResponseHeaders,
  conf: AskerConf,
  request: any
}

export const defRes: AskerResponse = {
  data: null,
  status: 200,
  statusText: 'you skip request and success always',
  headers: {},
  conf: {},
  request: null
}





export type NormalObject = {
  [key: string]: any
}


