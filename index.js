/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

var http = require('http');
var get_hertz_html = require('./get_hertz_html.js');
var process_html = require('./process_html.js');
var process_results = require('./process_results');
var notify_slack = require('./notify_slack.js');

module.exports = function(src, dst){
    require('dotenv').config();
    console.log('Searching ' + src + ' -> ' + dst);
    get_hertz_html(function(html){
        console.log('Processing HTML ' + src + ' -> ' + dst);
        process_html(html, function(items){
            console.log('Processing result ' + src + ' -> ' + dst);
            let results = process_results(items, src, dst);
            console.log('Got results (' + src + ' -> ' + dst + '), length:' + results.length);
            for (var i = 0; i < results.length; i++) {
                let item = results[i];
                console.log('Notifying about ' + item.car + ',' + item.source + ',' + item.destination);
                notify_slack(item);
            }
        })
    })
};
