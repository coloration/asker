<template>
  <div>
    1111
    <!-- <Upload />   -->
  </div>
</template>

<script>
// import Asker from '../src/asker.js'
import {
  Asker 
  // safeCall, 
  // splitBlob, 
  // Canceler 
} from "../esm/index";

// import Upload from './upload.vue'
// import {
//   adapterExam1Api,
//   adapterExam2Api,
//   adapterExam3Api,
//   adapterExam4Api,
//   adapterExam5Api
// } from './adapter'

// import { methodApi } from "./method";

export default {
  // components: { Upload },
  mounted() {

    // const ask = new Asker({
    //   errorResponseType: 'json',
    //   adapter: (conf) => {
    //     console.log('222', conf)
    //     const responseText = '{\n  \"code\": 401, \n  \"message\": \"Signature has expired\"\n}\n'
        
    //     const errorResponse = !conf.errorResponseType || conf.errorResponseType === 'text'
    //       ? responseText
    //       : conf.errorResponseType === 'json'
    //         ? JSON.parse(responseText)
    //         : 666
    //     return Promise.reject({ status: 401, message: responseText, response: errorResponse })
        
    //   }
    // })

    // ask.get('/abc')


    // Asker.get('/abc', { a: 12, b: 5 }, {
    //   adapter: [1, 2, Math.random()],
    //   getCache: true
    // })
    // .then(parentRes => {
    //   console.log(parentRes.data)
    //   Asker.get('/abc', { a: 12, b: 5 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: true
    //   })
    //   .then(res => console.log(res.data))
    // })


    // Asker.get('/abc', { a: 12, b: 7 }, {
    //   adapter: [1, 2, Math.random()],
    //   getCache: 3
    // })
    // .then(parentRes => {
    //   console.log(parentRes.data)
    // })

    // setTimeout(() => {
    //     Asker.get('/abc', { a: 12, b: 7 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: 3
    //   })
    //   .then(res => console.log(res.data))
    // }, 1000)

    // setTimeout(() => {
    //     Asker.get('/abc', { a: 12, b: 7 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: 3
    //   })
    //   .then(res => console.log(res.data))
    // }, 2000)

    // setTimeout(() => {
    //     Asker.get('/abc', { a: 12, b: 7 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: 3
    //   })
    //   .then(res => console.log(res.data))
    // }, 2999)

    // setTimeout(() => {
    //     Asker.get('/abc', { a: 12, b: 7 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: 3
    //   })
    //   .then(res => console.log(res.data))
    // }, 3000)

    // setTimeout(() => {
    //     Asker.get('/abc', { a: 12, b: 7 }, {
    //     adapter: [1, 2, Math.random()],
    //     getCache: 3
    //   })
    //   .then(res => console.log(res.data))
    // }, 3001)

    

    // const canceler = new Canceler()

    // Asker.get("http://localhost:3000/test-timeout", undefined, {
    //   timeout: 3000,
    //   onTimeout: (message, xhr) => {
    //     console.log("error args", message, xhr);
    //   },
    //   canceler: canceler
    // })
    //   .then(res => {
    //     console.log("timeout response", res);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });

    //    Asker.get("http://localhost:3000/test-timeout", undefined, {
    //   timeout: 3000,
    //   onTimeout: (message, xhr) => {
    //     console.log("error args", message, xhr);
    //   },
    //   canceler: canceler
    // })
    //   .then(res => {
    //     console.log("timeout response", res);
    //   })
    //   .catch(error => {
    //     console.log("error", error);
    //   });


    // setTimeout(function () {
    //   canceler.cancel()
    // }, 4000)

    // Asker.conf.before = (conf) => {
    //   console.log('before')
    //   conf.headers.test = conf.headers.test ? conf.headers.test + 1 : 1

    //   return conf
    // }
    // Asker.conf.after = (res) => {
    //   console.log(12, res)
    //   return res.data
    // }

    // Asker.jsonp(
    //   'http://assistant.yingshe.com/index/taohuayun',
    //   { a: 1 },
    //   { jsonp: 'jsoncallback', getCache: true }
    // )
    // .then(data => {
    //   console.log(data, 6666)
    //   Asker.jsonp(
    //     'http://assistant.yingshe.com/index/taohuayun',
    //     { a: 1 },
    //     { jsonp: 'jsoncallback', getCache: true }
    //   )
    //   .then(data => {
    //     console.log(data, 777)
    //   })
    // })

    // const safe = safeCall(function (e) {
    //   console.log(e)
    // })

    // const a = safe((h) => {

    //   return Promise.resolve('right')
    // })
    // .then(res => {
    //   console.log('safeCall', res)
    // })

    // console.log('a', a)

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

    // methodApi.conf.after = (res) => {
    //   return res.data
    // }

    // methodApi.conf.before = (conf) => {
    //   return conf
    // }

    // const log = console.log;

    // log(safeCall)
    // log(splitBlob)

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
};
</script>

<style>
</style>
