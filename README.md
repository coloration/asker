建个group
group下新建项目 eg: projectname

```
$ npm init --scope=yourgroupname
```
配置完之后上传上去

```
$ yarn add git+ssh://git@xxx.com:yourgroupname/projectname.git
```

# Asker

- [Methods](#Methods)
- [Transform](#Transform)
- [Adapter](#Adapter)


## install

``` bash
$ yarn add git+ssh://git@code.aliyun.com:coloration/asker.git -S
```

## conf 

可以在 `Asker.conf`, `new Asker(conf)`, `asker.conf`, `asker[method](url, params, conf)` 四处设置。

优先级: 方法传入的 conf > asker 实例的 conf > Asker.conf

``` ts
// conf
type conf = {
  baseUrl: string,              // 基础路径，
  url: string,                  // 具体路径，最终路径为 baseUrl + url
  params: {} | null,            // 请求参数，get 方法会转化为 queryString。eg: ?foo=1&bar=2
  headers: {},                  // 配置请求头, 会依据上方优先级规则**覆盖**
  postType:                     // 根据此配置对 params 进行处理，默认为 json
    'json' | 'text' | 'form-data' | 'form-urlencoded',         
  transReq: conf => conf,       // 在发起请求req前执行，
                                // 执行顺序为 Asker.conf.transReq, asker.conf.transReq, [method](conf.transReq)
  transRes: res => res,         // 在得到相应res后执行，
                                // 执行顺序为 Asker.conf.transRes, asker.conf.transRes, [method](conf.transRes)

  validator: status => boolean, // 代替默认的校验，默认为 status >= 200 && status < 300        
  adapter:                      // 代替实际发送的请求，对请求进行模拟，
                                // 如果返回非函数值，则该值会被填充进 Response.data 中
                                // 如果返回函数值，需要手动填充，以保证一致性，第二个参数是默认的 Response 结构
    null | string | number | Array | {} | (conf, defaultRes) => res,              
                              
  resType: 'json' | 'text',     // 操作 responseText，默认为 json，即对其进行 JSON.parse 操作，
                                // 当设置 adapter时，此配置不生效
  timeout: 0,                   // 设置超时时间单位为秒(s)，
                                // 超时后执行 conf.onTimeout(Asker.type.TIMEOUT)
                                // 如果不存在则会调用 reject(Asker.type.TIMEOUT)
  onTimeout: Asker.type => ()   // 超时回调函数，此方法会依据上方优先级规则**覆盖**
  onError: Asker.type => ()     // 错误回调，此方法会依据上方优先级规则**覆盖**，
                                // 如果没配置此字段会执行 reject(Asker.type.ERROR)
  onAbort: Asker.type => ()     // 中断回调，此方法会依据上方优先级规则**覆盖**，
                                // 如果没配置此字段会执行 reject(Asker.type.ABORT)                                
  onUploadProgress: Function,   // 上传进度回调  
  onDownloadProgress: Function, // 下载进度回调
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
```

`'get' | 'delete' | 'head' | 'options'` 执行 getLike 方法，
`'post' | 'put' | 'patch'` 执行 postLike 方法

--- 


<h3 id="Transform">Transform</h3>

``` js
import Asker from '@coloration/asker'

const someApi = new Asker({
  transRes: ({ data }) => data,
  transReq: conf => {
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


just for freedom