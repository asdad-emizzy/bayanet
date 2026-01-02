const https = require('https')

const opts = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
}

const req = https.request(opts, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
  if (res.statusCode === 200) process.exit(0)
  else process.exit(1)
})

req.on('error', (e) => {
  console.error(e)
  process.exit(1)
})

req.end()
