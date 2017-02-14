"use strict"

class FreeriderTrip{
	constructor(from = "", to = "", startDate, endDate, car){
		this.to = from;
		this.to = to;
		this.startDate = startDate;
		this.endDate = endDate;
		this.car = car;
	}

	_matches(from, to = '*'){
		from = from.toLowerCase();
        if(this.from.toLowerCase().indexOf(from) == -1 && from !== '*') return false;

        to = to.toLowerCase();
        if(this.to.toLowerCase().indexOf(to) == -1 && to !== '*') return false;

        return true;
	}

	matches(search){
		if(search.bothways){
			return (this._matches(search.from, search.to) || this._matches(search.to, search.from));
		}else{
			return this._matches(search.from, search.to);
		}
	}

	getMessage(){
		return this.car + ' tillgänglig ' + this.from + ' -> ' + this.to + ' (' + this.startDate + ' - ' + this.endDate + ')';
	}
}

module.exports = FreeriderTrip;