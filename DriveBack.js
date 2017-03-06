"use strict"

let request = require('request');
let cheerio = require('cheerio');
let moment = require('moment');
let dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
let DriveBackTrip = require('./DriveBackTrip.js');
let DriveBackRoute = require('./DriveBackRoute.js');

class DriveBack{
	static search(routes, sender){
		let f = new DriveBack();
		f.search(routes, sender);
	}

	static createSearch(from, to, bothways){
		return new DriveBackSearch(from, to, bothways);
	}

	search(routes, sender){
		this.getTrips(function(trips){
			let matches = [];
			let ids = [];

			for (let i = trips.length - 1; i >= 0; i--) {
				for (let j = routes.length - 1; j >= 0; j--) {
					if(trips[i].matches(routes[j]) && ids.indexOf(trips[i].idstring) == -1){
						ids.push(trips[i].idstring);
						matches.push(trips[i]);
					}
				}
			}

			for(let i = matches.length - 1; i >= 0; i--){
				sender.send(matches[i].getMessage());
			}
		})
	}

	setTrips(trips){
		this.trips = trips;
	}

	getTrips(callback){
		if(this.trips !== undefined){
			console.log('DriveBack: Returning cached trips');
			callback(this.trips);
		}else{
			this.fetchTrips(callback);
		}
	}

	clearTrips(){
		delete this.trips;
	}

	fetchTrips(callback){
		console.log('DriveBack: Fetching trips');

		let _this = this;

		request("http://www.driveback.se/resor.json", function(err, res, body){
			if(err) throw err;

			body = JSON.parse(body);
			let trips = [];
			let ids = [];

			for (var i = 0; i < body.length; i++) {
				let trip = body[i];

				let from = trip.from_station.area + ' (' + trip.from_station.location.city + ')';
				let fromDate = moment(trip.first_pickup).format('D MMM HH:mm');
				let toDate = moment(trip.last_deliver).format('D MMM HH:mm');
				let car;

				if(trip.vehicle.car_model !== ""){
					car = trip.vehicle.car_model + ' (' + trip.vehicle.car_size + ')';
				}else{
					car = trip.vehicle.car_size;
				}

				for (var j = 0; j < trip.to_stations.length; j++) {
					let idstring = trip.id + '.' + trip.to_stations[j].id;
					if(ids.indexOf(idstring) == -1){
						ids.push(idstring);
						let to = trip.to_stations[j].area + ' (' + trip.to_stations[j].location.city + ')';
						let dbtrip = new DriveBackTrip(from, to, fromDate, toDate, car);
						dbtrip.idstring = idstring;
						trips.push(dbtrip);
					}
				}
			}

		    console.log('DriveBack: Found ' + trips.length + ' trips');

		    _this.trips = trips;
		    callback(trips);
		});
	}
}

module.exports = DriveBack;
