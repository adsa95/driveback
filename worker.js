const search = require('./index.js');
search('stockholm', 'göteborg');
search('göteborg', 'stockholm');

search('vimmerby', 'karlskrona');

setTimeout(function(){
    process.exit(1);
}, 10000);
