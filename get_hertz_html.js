/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

const http = require('http');

module.exports = function(callback){
    let request_options = {
        host: 'www.hertzfreerider.se',
        path: '/unauth/list_transport_offer.aspx'
    };

    let request = http.request(request_options, function(res){
        let data = '';

        res.on('data', function(chunk){
            data += chunk;
        });

        res.on('end', function(){
            callback(data);
        });
    });

    request.on('error', function(e){
        console.log(e.message);
    })

    request.end();
}
