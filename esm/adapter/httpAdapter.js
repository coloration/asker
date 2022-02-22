import http from 'http'
import https from 'https'
import url from 'url'

export default function httpAdapter (conf) {
  return new Promise(function httpPromiseCreator (resolve, reject) {
    console.log(conf)
    
    const parsedUrl = url.parse(conf.uri)
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.path,
      method: conf.method.toUpperCase(),
      headers: conf.headers
    }

    const req = https.request(options, res => {
      console.log(1)
      resolve(res)
    })

    
    req.on('error', err => {
      console.log(2)
      reject(err)
    })
  })
}