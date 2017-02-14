"use strict"

let Freerider = require('./Freerider.js');
let FreeriderRoute = require('./FreeriderRoute.js');
let FreeriderTrip = require('./FreeriderTrip.js');
let SlackSender = require('./SlackSender.js');

module.exports = {
	Helper: Freerider,
	Route: FreeriderRoute,
	Trip: FreeriderTrip,
	SlackSender: SlackSender
}