
<h3 id="Adapter">Adapter</h3>

**example1**: adapter 如果不为函数，则直接填充到 response.data 中

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

**example2**: 在adapter 中处理逻辑。如果抛出错误可以用 .catch 捕获

``` js

export const adapterExam2Api = new Asker({
  baseUrl: '',
  adapter (conf, res) {
    const { _url, method } = conf

    if (method === 'get') {
      if (_url === '/userinfo?uid=1') {
        return Object.assign(
          res, 
          { data: { name: 'joe', uid: 1 }, status: 201 }
        )
      }
      else if (_url === '/userinfo?uid=2') {
        return Object.assign(
          res,
          { data: { name: 'david', uid: 2 }, status: 202 }
        )
      }
      // 不执行 transRes
      throw { code: 2, message: '参数错误' }
    }
  },
})

adapterExam2Api.get('/userinfo', { uid: 1 }).then(console.log)

/// { data: { name: 'joe', uid: 1 }, status: 201, ... }

adapterExam2Api.get('/error-url', { uid: 1 }).catch(console.log)
/// catch throw { code: 2, message: '参数错误' }

```
  
**example3,4,5**: 使用JSON生成库模仿数据。 3, 4 使用dreamjs 5使用mockjs


模拟返回用户信息

``` js
import dream from 'dreamjs'

export const adapterExam3Api = new Asker({
  adapter: dream.schema({
    name: 'name',
    id: /[A-Z]{3}[0-9]{8}/,
    age: 'age',
    addr: 'address'
  })
  .generateRnd()
  .output()
})

adapterExam3Api.get('a url query userinfo', { uid: 1 }).then(console.log)

/**
 * {
 *   data: {
 *     addr: "133 Aropik Boulevard"
 *     age: 41
 *     id: "CEO73185295"
 *     name: "Lester Moody"
 *   },
 *   status: 200,
 *   ...
 * }
**/
```

模拟返回带分页列表数据

``` js
import Mock from 'mockjs'

export const adapterExam5Api = new Request({
  adapter: function adapter5 ({ params }, res) {
    const { page, pageSize } = params

    res.data = Mock.mock({
      page,
      pageSize,
      'total|200-500': 1,
      ['list|' + pageSize]: [{
        'id|+1': (page - 1) * pageSize + 1,
        name: '@cname',
        'age|12-86': 1,
        city: ['@city', '@province', '@region'],
      }]
    })

    return res
  }
})

/**
 * {
 *   list: [
 *    { age: 27, city: ["佛山市", "江西省", "华中"], id: 21, name: "夏秀英" }, 
 *    {…}, {…}, {…}, ... // 20 
 *   ],
 *   page: 2,
 *   pageSize: 20,
 *   total: 293,
 *   ...
 * }
**/
```


```js
import dream from 'dreamjs'

const registConstType = (type, value) => dream.customType(type, () => value)

export const adapterExam4Api = new Asker({
  adapter ({ params }, res) {
    const { page, pageSize } = params
    registConstType('page', page)
    registConstType('pageSize', pageSize)
    dream.customType('itemId', h => h.previousItem ? h.previousItem.id + 1 : (page - 1) * pageSize + 1)

    const items = dream.schema({
      id: 'itemId',
      name: 'name',
      age: 'age',
      city: ['city', 'country'],
      address: 'address'
    })
    .generateRnd(pageSize)
    .output()

    registConstType('listItem', items)
    
    res.data = dream
    .input(items)
    .schema({
      total: Number,
      page: 'page',
      pageSize: 'pageSize',
      list: 'listItem'
    })
    .generateRnd()
    .output()

    return res
  }
})

/*
 * {
 *   list: [
 *     { 
 *       address: "1998 Jasov Plaza", 
 *       age: 27, 
 *       city: ["Rivdahuje", "TL"], 
 *       id: 21, 
 *       name: "Harriett Hernandez" 
 *    }, 
 *    {…}, {…}, {…}, ... // 20 
 *   ],
 *   page: 2,
 *   pageSize: 20,
 *   total: 5028752077619200,
 *   ...
 * }
**/
```