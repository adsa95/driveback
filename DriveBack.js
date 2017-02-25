"use strict"

let request = require('request');
let cheerio = require('cheerio');
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
			for (var i = trips.length - 1; i >= 0; i--) {
				for (var j = routes.length - 1; j >= 0; j--) {
					if(trips[i].matches(routes[j])){
						sender.send(trips[i].getMessage());
					}
				}
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

		request("http://www.driveback.se/", function(err, res, body){
			if(err) throw err;

			let $ = cheerio.load(body);
		    let trips = [];

		    $('.list-group-items .list-group-item:not(.text-center)').each(function(i, elm1){
		        let tr = $(this);
				let trip = new DriveBackTrip();

				let text = tr.find('.list-group-item-heading').text();
				let places = text.split('→');

				if(places.length !== 2) return;

				trip.from = places[0].replace(/(\s){1,}/g, ' ').trim();
				trip.to = places[1].replace(/(\s){1,}/g, ' ').trim();

				trip.car = tr.find('.list-group-item-text .label-info').text().replace(/(\s){1,}/g, ' ').trim();

				trips.push(trip);
		    });

		    console.log('DriveBack: Found ' + trips.length + ' trips');

		    _this.trips = trips;
		    callback(trips);
		});
	}
}

module.exports = DriveBack;
