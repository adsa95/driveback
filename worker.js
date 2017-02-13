const search = require('./index.js');

let paths = [
	['stockholm', 'göteborg'],
	['göteborg', 'stockholm']
];

search(paths, function(){
	process.exit(1);
});