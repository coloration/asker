export as namespace Asker

export type AskerResponseHeaders = {
  [key: string] : string | string[]
}


export type AskerResponse = {
  data: any,
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

  static get(url?: string, params?: any, conf?: AskerConf): Promise<any>
  static get<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>

  static option(url?: string, params?: any, conf?: AskerConf): Promise<any>
  static option<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>

  static head(url?: string, params?: any, conf?: AskerConf): Promise<any>
  static head<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  
  static post(url?: string, body?: any, conf?: AskerConf): Promise<any>
  static post<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>

  static put(url?: string, body?: any, conf?: AskerConf): Promise<any>
  static put<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>

  static patch(url?: string, body?: any, conf?: AskerConf): Promise<any>
  static patch<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>

  static delete(url?: string, body?: any, conf?: AskerConf): Promise<any>
  static delete<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  
  static jsonp(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<any>
  static jsonp<T>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<T>
  static jsonp(url?: string, body?: any, conf?: AskerJsonpConf): Promise<any>
  static jsonp<T>(url?: string, body?: any, conf?: AskerJsonpConf): Promise<T>

  static batch(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<any>
  static batch<T>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<T>
  
  get(url?: string, params?: any, conf?: AskerConf): Promise<any>
  get<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  
  option(url?: string, params?: any, conf?: AskerConf): Promise<any>
  option<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>

  head(url?: string, params?: any, conf?: AskerConf): Promise<any>
  head<T>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  
  post(url?: string, body?: any, conf?: AskerConf): Promise<any>
  post<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>

  put(url?: string, body?: any, conf?: AskerConf): Promise<any>
  put<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>

  patch(url?: string, body?: any, conf?: AskerConf): Promise<any>
  patch<T>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  
  /** JSONP implemented by ScriptDOM */
  jsonp(url?: string, body?: any, conf?: AskerJsonpConf): Promise<any>
  jsonp<T>(url?: string, body?: any, conf?: AskerJsonpConf): Promise<T>
  jsonp(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<any>
  jsonp<T>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<T>
  
  batch(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<any>
  batch<T>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<T>

}

export default Asker

export function splitBlob (fileOrblob: Blob, piece: number): Blob[]
export function safeCall (exceptionHandler: (e: any) => any): (exceptionHandler?: (e: any) => any) => any