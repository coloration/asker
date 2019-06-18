# Asker

- [Methods](#Methods)
- [Transform](#Transform)
- [Adapter](#Adapter)


## install

``` bash
$ yarn add git+ssh://git@github.com:coloration/asker.git -S

# or 

$ yarn add @coloration/asker -S
```

## conf 

可以在 `Asker.conf`, `new Asker(conf)`, `asker.conf`, `asker[method](url, params, conf)` 四处设置。

优先级: 方法传入的 conf > asker 实例的 conf > Asker.conf


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
  
  method?: 'get' | 'option' | 'head' | 'post' | 'put' | 'patch' | 'delete',
  
  /** request headers */
  headers?: { [key: string]: any }
  
  /** asker will change the data type auto by this */
  postType?: 'json' | 'form-data' | 'text' | 'form-urlencoded',
  
  /** default 'object' will call 'JSON.parse()', other return string */
  responseType?: 'object' | 'string',
  
  /** waiting over timeout, asker will call the 'onTimeout' or 'reject' */
  timeout?: 0,

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

  /** other props */
  [key: string]: any
}

```


## use

<h3 id="Methods">Methods</h3>

``` js
import Asker from '@coloration/asker'

const exampleApi = new Asker({ 
  baseUrl: 'https://foo.bar.com' 
})

exampleApi.get('/query-something', { param1: 'a', param2: 2 })

// https://foo.bar.com/query-something?param1=a&param2=2

exampleApi.post('/query-something', { param1: 'a', param2: 2 })

// https://foo.bar.com/query-something
// body: { param1: 'a', param2: 2 }

Asker.get('https://foo.bar.com', {})

Asker.jsonp('https://foo.bar.com', yourQueryOrNull, { jsonp: jsonpField })
```

`'get' | 'delete' | 'head' | 'options'` 执行 getLike 方法，
`'post' | 'put' | 'patch'` 执行 postLike 方法

--- 


<h3 id="Transform">Transform</h3>

``` js
import Asker from '@coloration/asker'

const someApi = new Asker({
  after: ({ data }) => data,
  before: conf => {
    conf.headers.Auth = yourAuth
    return conf
  }
})

```

---

<h3 id="Adapter">Adapter</h3>

**example1**: adapter 如果不为函数（也不能设置为 undefined），则直接填充到 response.data 中

``` js
adapterExam1Api = new Asker({ baseUrl: '', adapter: [1, 2, 3] })

adapterExam1Api.get('whatever or string').then(console.log)

/**
 * { 
 *   data: [1, 2, 3], 
 *   status: 200, 
 *   statusText: 'you skip request and success always', 
 *   headers: {}, 
 *   options: {}, 
 *   request: null 
 * }
**/
```


- [More Adapter Examples](./EXAMPLE/Adapter)



---
