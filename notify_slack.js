/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

const http = require('https');
const querystring = require('querystring');

module.exports = function(item){
    let message = item.car + ' tillgänglig ' + item.source + ' -> ' + item.destination + ' (' + item.fromDate + ' - ' + item.toDate + ')';

    if(!process.env.SLACK_HOOK_PATH) throw new Error('SLACK_HOOK_PATH env variable not set');

    let slack_hook_path = process.env.SLACK_HOOK_PATH;

    let post_data = JSON.stringify({
        "bot-name": 'Hertz Freerider',
        "text": message
    });

    let request_options = {
        host: 'hooks.slack.com',
        path: slack_hook_path,
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(post_data)}
    };

    let request = http.request(request_options, function(res){
        let text = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk){
            text += chunk;
        });

        res.on('end', function(){
            console.log(text);
        });
    });
    request.write(post_data);
    request.end();
}
