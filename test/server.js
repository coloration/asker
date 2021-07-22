const http = require('http')

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
})
.listen('8877')

console.log('server running at http://localhost:8877')