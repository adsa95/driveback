# freerider-slack-notifier
### Introduction
A library for for fetching and searching available cars on Hertz Freerider

### What is Hertz Freerider?
Hertz Freerider is a service that enables you to drive cars that needs to be moved for free. Find out more here: https://www.hertzfreerider.se/

### How to use
```JavaScript
let Freerider = require('freerider');

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
```
