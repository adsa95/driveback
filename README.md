# freerider
### Introduction
A library for for fetching and searching available cars on Hertz Freerider. Includes a module to notify about matches with a Slack Hook.

### What is Hertz Freerider?
Hertz Freerider is a service that enables you to drive cars that needs to be moved for free. Find out more here: https://www.hertzfreerider.se/

### How to use
```JavaScript
let Freerider = require('freerider');

let routes = [
	new Freerider.Route('göteborg', '*'),
];

// a notifier can be anything with a send-method that gets a formatted string
let notifier = {
	send: function(message){console.log(message)}
}

// When called in a static context, data is fetched and searched directly
Freerider.Helper.search(routes, notifier);	

// When using an instance, fetched data can be saved and reused
let helper = new Freerider.Helper();
helper.getTrips(function(trips){
	// available trips are now saved in the instance, multiple searches with different routes and notifiers can be made without fetching data again
	helper.search(routes, notifier);
	// if you need to clear trips
	helper.clearTrips();
})
```
