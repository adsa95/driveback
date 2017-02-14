"use strict"

require('dotenv').config();

let Freerider = require('./index.js');

let routes = [
	new Freerider.Route('göteborg', '*'),
];

let sender = new Freerider.SlackSender(process.env.SLACK_HOOK_URL);

let doStatic = false;

if(doStatic){
	// static
	Freerider.Helper.search(routes, sender);	
}else{
	// instantiated
	let f = new Freerider.Helper();
	f.getTrips(function(){
		f.search(routes, sender);
	})
}