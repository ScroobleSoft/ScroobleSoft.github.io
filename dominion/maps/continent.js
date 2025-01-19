
//--------------------------------------------------
//---------- DOMINION CONTINENT --------------------  //TODO: map should draw these from here
var DominionContinent = function() {
	var Nations;
	var Power, Allieds;
};
DominionContinent.prototype = {
	Set() {
		this.Nations = new Array();
		this.Allieds = new Array();
	},
	AddPower(power) {

		this.Nations.push(power);
		this.Power = power;
		power.Continent = this;
	},
	AddAllied(allied) {

		this.Nations.push(allied);
		this.Allieds.push(allied);
		allied.Continent = this;
	}
};
