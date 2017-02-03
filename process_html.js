/* (c) 2017 Adam Sandström <adsa95@gmail.com> */
"use strict"

const cheerio = require('cheerio');
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
const process_results = require('./process_results.js');

module.exports = function(html, callback){
    console.log('Processing!');
    let $ = cheerio.load(html);
    let items = [];
    let item = false;

    $('tr').each(function(i, elm1){
        let tr = $(this);
        if(tr.hasClass('highlight')){
            item = {};

            tr.find('a').each(function(j, elm2){
                let text = $(this).text().trim();

                if(j == 0){
                    item.source = text;
                }else if(j == 1){
                    item.destination = text;
                }
            });
        }else if(item !== false){
            tr.find('span').each(function(k, elm3){
                let text = $(this).text().trim();
                let isDate = dateRegExp.test(text);

                if(k == 0 && isDate){
                    item.fromDate = text;
                }else if(k == 1 && isDate){
                    item.toDate = text;
                }else if(k == 2 && !isDate){
                    item.car = text;
                }
            })
            items.push(item);
        }
    });

    callback(items);
}
