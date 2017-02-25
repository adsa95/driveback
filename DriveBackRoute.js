"use strict"

class DriveBackSearch{
	constructor(from, to = '*', bothways = false){
		this.from = from;
		this.to = to;
		this.bothways = bothways;
	}
}

module.exports = DriveBackSearch;
