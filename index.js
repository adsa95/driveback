/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

var http = require('http');
var get_hertz_html = require('./get_hertz_html.js');
var process_html = require('./process_html.js');
var process_results = require('./process_results');
var notify_slack = require('./notify_slack.js');

module.exports = function(paths, callback){
    require('dotenv').config();
    console.log('INFO: Getting HTML');

    get_hertz_html(function(html){
        console.log('INFO: Processing HTML');

        process_html(html, function(items){

            for (var i = paths.length - 1; i >= 0; i--) {
                console.log('INFO: Searching result ' + paths[i][0] + ' -> ' + paths[i][1]);

                let results = process_results(items, paths[i][0], paths[i][1]);

                console.log('INFO: Got results (' + paths[i][0] + ' -> ' + paths[i][1] + '), length:' + results.length);

                for (var j = 0; j < results.length; j++) {
                    let item = results[j];
                    console.log('INFO: Notifying about ' + item.car + ' (' + item.source + ' -> ' + item.destination + ')');
                    notify_slack(item);
                }

            }   

            if(callback) callback();        
        })
    })
};
