// var {
//   Asker 
// } = require("../dist/index")

// console.log(1)
// console.log(typeof Asker)

// Asker.get('https://v1.jinrishici.com/all.json')
// .then(res => {
//   console.log(res)
// })

const http = require('http')

const req = http.get('http://localhost:8877', (res) => {
  console.log('???')
  console.log(Object.keys(res))
})

req.on('error', (err) => {
  console.log(err)
})

