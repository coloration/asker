# Asker

[document: http://asker.coloration.top](http://asker.coloration.top)

## install

``` bash
$ yarn add git+ssh://git@github.com:coloration/asker.git -S

# or 

$ yarn add @coloration/asker -S
```

## conf 

可以在 `Asker.conf`, `new Asker(conf)`, `asker.conf`, `asker[method](url, params, conf)` 四处设置。

优先级: 方法传入的 conf > asker 实例的 conf > Asker.conf, 注意：除了`before`, `after`会进入调用栈，其他的配置项均覆盖上层配置

基本配置如下, 

``` ts

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

```
---
