"use strict"

class FreeriderSearch{
	constructor(from, to = '*', bothways = false){
		this.from = from;
		this.to = to;
		this.bothways = bothways;
	}
}

module.exports = FreeriderSearch;