import Asker from '../src/index'
import dream from 'dreamjs'
import Mock from 'mockjs'

export const adapterExam1Api = new Asker({
  baseUrl: '',
  adapter: [1, 2, 3],
})

export const adapterExam2Api = new Asker({
  baseUrl: '',
  adapter (conf, defRes) {
    const { _url } = conf
    if (_url === '/userinfo?uid=1') {
      defRes.data = { name: 'joe', uid: 1 } 
      return defRes
    }
    else if (_url === '/userinfo?uid=2') {
      defRes.data = { name: 'joe', uid: 1 } 
      return defRes
    }
    // 不执行 transformResponse
    throw { code: 2, message: '参数错误' }
  
  },
})

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

const registConstType = (type, value) => dream.customType(type, () => value)

export const adapterExam4Api = new Asker({
  adapter (conf, res) {
    
    const { page, pageSize } = conf.query
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

export const adapterExam5Api = new Asker({
  adapter: function adapter5 (conf, res) {
    const { page, pageSize } = conf.query

    // res.status = 500
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



