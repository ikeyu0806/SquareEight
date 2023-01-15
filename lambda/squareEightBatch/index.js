const https = require('https');

exports.handler = (event, context, callback) => {
    console.log('event', event, event.enviroment, event.enviroment == 'development')
    let hostname = '';

    if (event.enviroment == 'main') {
        hostname = process.env.VIDEOCALL_MAIN_HOSTNAME
    }  else if (event.enviroment == 'staging') {
        hostname = process.env.VIDEOCALL_STAGING_HOSTNAME
    }
    
    let path = '';
    
    if (event.batch_type == 'remind_tommorow_notifications') {
        path = process.env.REMIND_TOMMOROW_NOTIFICATIONS_PATH
    } else if (event.batch_type == 'confirm_lottery_reservation') {
      path = process.env.CONFIRM_LOTTERY_RESERVATION_PATH
    } else if (event.batch_type == 'send_same_hour_schedule_mail') {
        path = process.env.SEND_SAME_HOUR_SCHEDULE_MAIL_PATH
    }  else if (event.batch_type == 'send_same_hour_schedule_line') {
        path = process.env.SEND_SAME_HOUR_SCHEDULE_LINE_PATH
    }
    
    let options = {
        hostname: hostname,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    console.log("options", options)
    
    const data = JSON.stringify({
      text: "text",
    })
    const req = https.request(options, (res) => {
        let body = '';
        console.log('Status:', res.statusCode);
        console.log('Headers:', JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Successfully processed HTTPS response');
            // If we know it's JSON, parse it
            if (res.headers['content-type'] === 'application/json') {
                body = JSON.parse(body);
            }
            callback(null, body);
        })
        ;
    });
    req.on('error', callback);
    req.write(JSON.stringify(data));
    req.end();
};
