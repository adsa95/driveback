"use strict"

let request = require('request');
let url = require('url');

class SlackSender{
	constructor(hookUrl){
		this.hook = hookUrl;
	}

	send(message, callback){
	    request({
	        method: 'POST',
	        url: url.parse(this.hook),
	        json: true,
	        body: {
		        "bot-name": 'Hertz Freerider',
		        "text": message
		    }
	    }, function(err, res, body){
	        if(body == 'ok') console.log('SlackSender: Message sent');
	        if(callback) callback();
	    })
	}
}

module.exports = SlackSender;