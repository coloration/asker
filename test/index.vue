<template>
<div>
  <Upload />  
</div>  
</template>

<script>
import Asker from '../src/asker.js'
import Upload from './upload.vue'
import { 
  adapterExam1Api, 
  adapterExam2Api,
  adapterExam3Api,
  adapterExam4Api,
  adapterExam5Api
} from './adapter'

import { methodApi } from './method'

export default {
  components: { Upload },
  mounted () {


    // Asker.jsonp('http://assistant.yingshe.com/index/taohuayun', undefined, { jsonp: 'jsoncallback' })
    // .then(data => {
    //   console.log(data, 6666)
    // })

    // window.asker_jsonp666 = function (data) {
    //   console.log('2222', data)
    //   document.body.removeChild(scriptDom)
    // }

    // const scriptDom = document.createElement('script')
    // // scriptDom.onload = function () {
    // //   console.log('xxxxxxxxxxxx')
    // //   console.log(scriptDom)
    // // }
    // scriptDom.src = 'http://assistant.yingshe.com/index/taohuayun?jsoncallback=asker_jsonp666'

    // document.body.appendChild(scriptDom)



    
    // const log = console.log

    // log(Asker.get)
    // adapterExam1Api.get('whatever or string').then(log)
    // adapterExam2Api.get('/userinfo', { uid: 1 }).then(log)
    // adapterExam2Api.get('/userinfo1', { uid: 1 }).catch(log)
    // adapterExam3Api.get('a url query userinfo', { uid: 1 }).then(log)
    // adapterExam4Api.get('a url query list', { page: 2, pageSize: 20 }).then(log)
    // adapterExam5Api.get('a url query list', { page: 2, pageSize: 20 }).then(log)


    // methodApi.get('/comments').then(log)
    // methodApi.get('/comments', { id: 1, foo: 2 }).then(log)
    // methodApi.post('/comment', { id: '1', comment: '我已经出门了' }, { postType: 'form-data' }).then(log)
    // methodApi.post('/comment', { id: '2', comment: '我要化妆啦' }, { postType: 'json', }).then(log)
    // methodApi.post('/comment', { id: '1', comment: '太慢了！' }, { postType: 'form-urlencoded' }).then(log)
    // methodApi.post('/comment', { id: '2', comment: '还好啦！' }).then(log)

    // methodApi.put('/testput', { name: 'joe' }, { postType: 'json' }).then(log)
    // methodApi.patch('/testpatch', { name: 'david' }).then(log).then(log)
  }
}
</script>

<style>

</style>
