const squareEightRemindMail = () => {

  const https = require('https')
  const date = new Date()
  // 明日の予約にリマインドを送るので加算して明日日付に
  date.setDate(date.getDate() + 1)

  let postData = JSON.stringify({
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).slice(-2),
    day: ('0' + date.getDate()).slice(-2)
  })

  let options = {
    host: 'square_eight.com',
    path: '/api/batch/reservations/remind_date_notifications',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  }

  let req = https.request(options)
  req.write(postData)
  req.end()
}

squareEightRemindMail()
