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
        console.log('Processing HTML');
        process_html(html, function(items){
            console.log('Processing result');
            process_results(items, src, dst, function(item){
                console.log('Notifying');
                notify_slack(item);
            });
        })
    })
};
