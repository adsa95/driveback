"use strict"

let request = require('request');
let cheerio = require('cheerio');
let dateRegExp = /^\d{4}-\d{2}-\d{2}$/;
let FreeriderTrip = require('./FreeriderTrip.js');
let FreeriderRoute = require('./FreeriderRoute.js');

class Freerider{
	static search(routes, sender){
		let f = new Freerider();
		f.search(routes, sender);
	}

	static createSearch(from, to, bothways){
		return new FreeriderSearch(from, to, bothways);
	}

	static createSlackSender(hook_url){
		return new SlackSender(hook_url);
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

	setTrups(trips){
		this.trips = trips;
	}

	getTrips(callback){
		if(this.trips !== undefined){
			console.log('Freerider: Returning cached trips');
			callback(this.trips);
		}else{
			this.fetchTrips(callback);
		}
	}

	clearTrips(){
		delete this.trips;
	}

	fetchTrips(callback){
		console.log('Freerider: Fetching trips');

		let _this = this;

		request("http://www.hertzfreerider.se/unauth/list_transport_offer.aspx", function(err, res, body){
			if(err) throw err;

			let $ = cheerio.load(body);
		    let trips = [];
		    let trip = false;

		    $('tr').each(function(i, elm1){
		        let tr = $(this);
		        if(tr.hasClass('highlight')){
		            trip = new FreeriderTrip();

		            tr.find('a').each(function(j, elm2){
		                let text = $(this).text().trim();

		                if(j == 0){
		                    trip.from = text;
		                }else if(j == 1){
		                    trip.to = text;
		                }
		            });
		        }else if(trip !== false){
		            tr.find('span').each(function(k, elm3){
		                let text = $(this).text().trim();
		                let isDate = dateRegExp.test(text);

		                if(k == 0 && isDate){
		                    trip.startDate = text;
		                }else if(k == 1 && isDate){
		                    trip.endDate = text;
		                }else if(k == 2 && !isDate){
		                    trip.car = text;
		                }
		            })

		            trips.push(trip);
		            trip = false;
		        }
		    });

		    console.log('Freerider: Found ' + trips.length + ' trips');
		    
		    _this.trips = trips;
		    callback(trips);
		});
	}
}

module.exports = Freerider;