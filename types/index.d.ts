export as namespace Asker

export type AskerResponseHeaders = {
  [key: string] : string | string[]
}


export type AskerResponse<T = any> = {
  data: T,
  status: number,
  statusText: string,
  headers: AskerResponseHeaders,
  conf: AskerConf,
  request: any
}


export interface AskerConf {
  /** a sub url, it will be added after `baseUrl` at last */
  url?: string,
  
  /** the url first part */
  baseUrl?: string,
  
  /** the string result */
  query?: string,
  
  /** the transferred object for post  */
  body?: any,
  
  /** if you need to set the query string when you call the post like methods, you could set this  */
  params?: { [key: string]: any },
  
  /** request method, will be override when you invoke instance[method] */
  method?: 'get' | 'option' | 'head' | 'post' | 'put' | 'patch' | 'delete',
  
  /** request headers */
  headers?: { [key: string]: any }

  /** will cache response after first (getLike) request, second will return the cache */
  getCache?: boolean

  /** asker will change the data type auto by this */
  postType?: 'json' | 'form-data' | 'text' | 'form-urlencoded',
  
  /** default 'object' will call 'JSON.parse()', other return string */
  responseType?: 'object' | 'text',
  
  /** waiting over timeout(MS), asker will call the 'onTimeout' or 'reject' */
  timeout?: number,

  /** set `XMLHTTPRequest` withCredentials */
  withCredentials?: true,

  /** custom validator, default is `status >= 200 && status < 300` */
  validator?: (status: number) => boolean,

  /** custom adapter: you can replace default xhr adapter, `Asker.jsonp` is implemented by this way。
   * it also can be used in mock, you can pass a data (except `undefined`), it will return a response 
   * wrapped by `AskerResponse` object. Or you pass a function return a custom data
  */
  adapter?: string | number | boolean | { [key: string]: any } | any[] |
    ((response: any, defaultResponse: AskerResponse) => Promise<any>) | 
    (<T>(response: T, defaultResponse: AskerResponse) => Promise<T>)
  ,
  
  /** hook chain change the `AskerConf` before the request  */
  before?: (conf: AskerConf) => AskerConf | ((conf: AskerConf) => AskerConf)[],
  
  /** hook chain change your resopnse after the request */
  after?: (response: any) => any

  /** called when xhr trigger `error` event */
  onError?: (errType: string, xhr: XMLHttpRequest, conf: AskerConf) => any,

  /** called when xhr trigger `abort` event */
  onAbort?: (errType: string, xhr: XMLHttpRequest, conf: AskerConf) => any,

  /** called when xhr trigger `timeout` event */
  onTimeout?: (errType: string, xhr: XMLHttpRequest, conf: AskerConf) => any,

  /** called when xhr trigger `upload.progress` event */
  onUploadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any,
  
  /** called when xhr trigger `progress` event */
  onDownloadProgress?: (e: ProgressEvent, xhr: XMLHttpRequest, conf: AskerConf) => any

  /** other custom props */
  [key: string]: any
}

export interface AskerJsonpConf extends AskerConf {
  /** *required, JSONP callback field  */
  jsonp: string
}

export interface AskerBatchConf extends AskerConf {
  /** default number of a batch */
  slice?: number,
  /** retry times when a request failed */
  retry?: number
}


declare class Asker {
  constructor (conf?: AskerConf)

  static errorType: {
    ABORT: string, 
    ERROR: string, 
    TIMEOUT: string
  }

  static conf: AskerConf
  static cache: { [key: string]: any }

  conf: AskerConf

  static get<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  static option<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  static head<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  static delete<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>

  static post<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  static put<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  static patch<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  
  static jsonp<T = any>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<AskerResponse<T>>
  static jsonp<T = any>(url?: string, params?: any, conf?: AskerJsonpConf): Promise<AskerResponse<T>>

  static batch<T = any>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<AskerResponse<T>>
  
  get<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  option<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  head<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  delete<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<AskerResponse<T>>
 
  post<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  put<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  patch<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<AskerResponse<T>>
  
  /** JSONP implemented by ScriptDOM */
  jsonp<T = any>(url?: string, params?: any, conf?: AskerJsonpConf): Promise<AskerResponse<T>>
  jsonp<T = any>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<AskerResponse<T>>
  
  batch<T = any>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<AskerResponse<T>>

}

export default Asker

export function splitBlob (fileOrblob: Blob, piece: number): Blob[]
export function safeCall (exceptionHandler: (e: any) => any): (exceptionHandler?: (e: any) => any) => any
export function object2Query (obj: { [key: string]: any }, encode?: boolean): string
export function query2Object<T = any> (query: string, raw: boolean = false): T