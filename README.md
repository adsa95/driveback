# driveback
### Introduction
A library for fetching and searching available cars on Driveback.

### What is Driveback?
Driveback is a service that enables you to drive cars that needs to be moved for free. Find out more here: https://www.driveback.se/

### How to use
```JavaScript
let Driveback = require('driveback');

let routes = [
	new DriveBack.Route('sundsvall', '*'),
];

// a notifier can be anything with a send-method that gets a formatted string
let notifier = {
	send: function(message){console.log(message)}
}

// When called in a static context, data is fetched and searched directly
DriveBack.Helper.search(routes, notifier);

// When using an instance, fetched data can be saved and reused
let helper = new DriveBack.Helper();
helper.getTrips(function(trips){
	// available trips are now saved in the instance, multiple searches with different routes and notifiers can be made without fetching data again
	helper.search(routes, notifier);
	// if you need to clear trips
	helper.clearTrips();
})
```
