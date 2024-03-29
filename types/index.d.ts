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

export type AskerAdapter = string | number | boolean | { [key: string]: any } | any[] |
(<T = any>(conf: AskerAdapterConf, defaultResponse: AskerResponse) => Promise<T>)


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

  /** will cache response after first (getLike) request, second will return the cache. 
   * if spec a number. the cache will be hold on `seconds`. after it will be delete.
   **/
  getCache?: boolean | number

  /** asker will change the data type auto by this */
  postType?: 'json' | 'form-data' | 'text' | 'form-urlencoded',
  
  /** */
  responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream',
  /** */
  errorResponseType?: 'json' | 'text',
  
  /** waiting over timeout(MS), asker will call the 'onTimeout' or 'reject' */
  timeout?: number,

  /** set `XMLHTTPRequest` withCredentials */
  withCredentials?: boolean,

  /** server only */
  httpsAgent?: any,

  /** server only */
  httpAgent?: any,
  
  /** server only */
  socketPath?: string | null,
  
  /** server only */
  transport?: any,
  
  /** server only */
  maxRedirects?: number,
  
  /** server only */
  beforeRedirect?: (options: Record<string, any>, responseDetails: {headers: Record<string, string>}) => void,

  /** server only */
  maxBodyLength?: number,

  /** server only */
  insecureHTTPParser?: boolean,
  
  /** server only */
  decompress?: boolean,

  /** server only */
  maxContentLength?: number,

  /** server only */
  responseEncoding?: ResponseEncoding,

  /** server only */
  transitional?: any,

  /** custom validator, default is `status >= 200 && status < 300` */
  validator?: (status: number) => boolean,

  /** custom adapter: you can replace default xhr adapter, `Asker.jsonp` is implemented by this way。
   * it also can be used in mock, you can pass a data (except `undefined`), it will return a response 
   * wrapped by `AskerResponse` object. Or you pass a function return a custom data
  */
  adapter?: AskerAdapter,
  
  /** hook chain change the `AskerConf` before the request  */
  before?: (conf: AskerConf) => AskerConf | ((conf: AskerConf) => AskerConf)[],
  
  /** hook chain change your resopnse after the request */
  after?: (response: any) => any

  /** set default catcher */
  catcher?: (e: { status: HttpStatus, message: string, response: any }) => any

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

  /** cancellion */
  canceler?: Canceler

  /** other custom props */
  [key: string]: any
}

export type ResponseEncoding =
  | 'ascii' | 'ASCII'
  | 'ansi' | 'ANSI'
  | 'binary' | 'BINARY'
  | 'base64' | 'BASE64'
  | 'base64url' | 'BASE64URL'
  | 'hex' | 'HEX'
  | 'latin1' | 'LATIN1'
  | 'ucs-2' | 'UCS-2'
  | 'ucs2' | 'UCS2'
  | 'utf-8' | 'UTF-8'
  | 'utf8' | 'UTF8'
  | 'utf16le' | 'UTF16LE'

export interface AskerJsonpConf extends AskerConf {
  /** *required, JSONP callback field  */
  jsonp: string
}

export interface AskerBatchConf extends AskerConf {
  /** default number of a batch, default is params' length */
  slice?: number,
  /** retry times when a request failed, default is 0 */
  retry?: number
}

export interface AskerAdapterConf extends AskerConf {
  uri: string
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

  static get<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  static option<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  static head<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  static delete<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>

  static post<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  static put<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  static patch<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  
  static jsonp<T = any>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<T>
  static jsonp<T = any>(url?: string, params?: any, conf?: AskerJsonpConf): Promise<T>

  static batch<T = any>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<T>
  
  get<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  option<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  head<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
  delete<T = any>(url?: string, params?: any, conf?: AskerConf): Promise<T>
 
  post<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  put<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  patch<T = any>(url?: string, body?: any, conf?: AskerConf): Promise<T>
  
  /** JSONP implemented by ScriptDOM */
  jsonp<T = any>(url?: string, params?: any, conf?: AskerJsonpConf): Promise<T>
  jsonp<T = any>(url?: string, callName?: string, conf?: AskerJsonpConf): Promise<T>
  
  batch<T = any>(url?: string, paramsOrbody?: any[], conf?: AskerBatchConf): Promise<T>

}

declare class Canceler {
  
  public cancel(): void

  promise: Promise<unknown>
  resolve(): void
}


export { Asker }
export { Canceler }
export function splitBlob (fileOrblob: Blob, piece: number): Blob[]
export function safeCall (exceptionHandler: (e: any) => any): (exceptionHandler?: (e: any) => any) => any
export function object2Query (obj: { [key: string]: any }, encode?: boolean): string
export function query2Object<T = any> (query: string, raw?: boolean): T

/** 
 * copy from wikipedia 
 * https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
 * https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81
 **/
export declare enum HttpStatus {
  continue = 100,
  switchingProtocols = 101,
  processing = 102,
  earlyHints = 103,

  ok = 200,
  created = 201,
  accepted = 202,
  nonauthoritativeInformation = 203,
  noContent = 204,
  resetContent = 205,
  partialContent = 206,
  multistatus = 207,
  alreadyReported = 208,
  imUsed = 226,

  multipleChoices = 300,
  movedPermanently = 301,
  found = 302,
  seeOther = 303,
  notModified = 304,
  useProxy = 305,
  switchProxy = 306,
  temporaryRedirect = 307,
  permanentRedirect = 308,

  badRequest = 400,
  unauthorized = 401,
  paymentRequired = 402,
  forbidden = 403,
  notFound = 404,
  methodNotAllowed = 405,
  notAcceptable = 406,
  proxyAuthenticationRequired = 407,
  requestTimeout = 408,
  conflict = 409,
  gone = 410,
  lengthRequired = 411,
  preconditionFailed = 412,
  requestEntityTooLarge = 413,
  requesturiTooLong = 414,
  unsupportedMediaType = 415,
  requestedRangeNotSatisfiable = 416,
  expectationFailed = 417,
  iAmATeapot = 418,
  misdirectedRequest = 421,
  unprocessableEntity = 422,
  locked = 423,
  failedDependency = 424,
  tooEarly = 425,
  upgradeRequired = 426,
  preconditionRequired = 428,
  tooManyRequests = 429,
  requestHeaderFieldsTooLarge = 431,
  unavailableForLegalReasons = 451,

  internalServerError = 500,
  notImplemented = 501,
  badGateway = 502,
  serviceUnavailable = 503,
  gatewayTimeout = 504,
  httpVersionNotSupported = 505,
  variantAlsoNegotiates = 506,
  insufficientStorage = 507,
  loopDetected = 508,
  notExtended = 510,
  networkAuthenticationRequired = 511
}
