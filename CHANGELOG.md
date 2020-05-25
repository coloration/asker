# ChangeLog

## 0.9.3

### Fix 

- `object2Query` error decoding

## 0.9.1 ~ 0.9.2

### Fix

- fix `batch` method responses error

## 0.9.0

### Fix

- fix `query2Object` and `object2Query` methods' typing

### Optimization

- `query2Object` methods will replace any chat with empty before the first `?`.

### Feature

- getCache support time period. `{ getCache: true | number }`

## 0.8.3 ~ 0.8.5

### Fix

- resposeType can be setted string

## 0.8.2 

### Fix

- export HttpStatus

## 0.8.1

*2020-03-10*

### Fix

- 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED from `0.7.0`

## 0.8.0

*2020-03-07*

### New Feature

- export Http Status. copy from `nestjs`

## 0.7.1

*2020-02-22*

### Fix

- [#2](https://github.com/coloration/asker/issues/2) responses of Batch methods are unordered. param slice has no default value.

## 0.7.0

*2020-02-03*

### New Feature

- `xhr` and `jsonp` can canel now, 

### Optimization

- optimize the code of `timeout`, `abort` and `error` in `xhr` adapter

## 0.6.9

### Rollback

- rollback response type from `Promise<AskerResponse<T>>` to `Promise<T>` in `d.ts`

## 0.6.8

### Fix
- change `Promise<T>` response type to `Promise<AskerResponse<T>>`  in `d.ts`

## 0.6.7

### New Feature

- export `window.Asker`. we can use Asker in `<script>` tag. detail in README.md

## 0.6.6

### New Feature

- export `query2Object(query: string, raw:boolean = false)` function. 
  if spec the `raw: true`. the function will call `JSON.parse` with the string after `=`

## 0.6.5

*2019-09-29*

### Fix

- add `delete` instance method into `d.ts` 

## 0.6.4

*2019-09-29*

### Optimization

- delete unuseful code

## 0.6.3

*2019-09-29*

### Optimization

- transform code to es5

## 0.6.2

*2019-09-05*

### Update

- update `objectToQuery` type

## 0.6.1

*2019-09-05*

### New Feature

- export the `objectToQuery` format function

## 0.6.0

*2019-06-26*

### New Feature

- `conf.getCache = true` will cache the response when invoke the getLike(`get`, `option`, `head`) and `jsonp`。we can get the store with `Asker.cache`，Asker save it use the uri (baseUrl + query) as key

## 0.5.3

*2019-06-25*

### Optimization
- jsonp can pass callback name to 2nd. parameter `Asker.jsonp('url', 'jsonpcallback')`

### Fix
- `Conf.responseType` : `object | string` to `object | text`

## 0.5.2

*2019-06-20*

### Optimization
- safe (safeCall return function) will return a Promise when you return a Promise in its scope

## 0.5.1

*2019-06-18*

### Fix
- after/before merge repeated
- merge will change array to object

## 0.5.0

*2019-06-18*

### New Feature

- add xhr, conf to the `onUploadProcess` and `onDownloadProcess` for call total 
data when you call `batch`
- add `withCredentials` to `conf` 
- add `d.ts` for editor

### Optimization

- change `conf.transReq` to `conf.before`, change `conf.transRes` to `conf.after`


## 0.4.0

*2019-06-15*

### New Features

- Add `batch` method, you can pass a array params or body to 2rd. parameter, default method is 'get',
you can change it in `conf` parameter


## 0.3.0

*2019-06-07*

### New Features

- Add `jsonp`


## 0.2.0

*2019-06-03*


## 0.1.0

*2019-04-18*