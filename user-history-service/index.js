const http = require('http')

const server = http.createServer((_, res) => {
  res.writeHead(200);
  res.end('Hello');
})

server.listen(8000, () => {
  console.log('start at 8000')
})