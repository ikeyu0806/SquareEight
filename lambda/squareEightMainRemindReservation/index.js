const https = require('https')

let options = {
  hostname: 'square-eight.net',
  port: 443,
  path: '/post/batch/reservations/remind_date_notifications',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const data = JSON.stringify({
  text: "text",
})

exports.handler = (event, context, callback) => {
  const req = https.request(options, (res) => {
    let body = ''
    console.log('Status:', res.statusCode)
    console.log('Headers:', JSON.stringify(res.headers))
    res.setEncoding('utf8')
    res.on('data', (chunk) => body += chunk)
    res.on('end', () => {
      console.log('Successfully processed HTTPS response')
      if (res.headers['content-type'] === 'application/json') {
          body = JSON.parse(body)
      }
      callback(null, body)
    })
  })
  req.on('error', callback)
  req.write(JSON.stringify(data))
  req.end()
}
