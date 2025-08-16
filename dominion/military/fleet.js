
//------------------------------------------------------
//---------- DOMINION CARRIER FLEET --------------------
var DominionCarrierFleet = function() {
	var Nation;
	var CarrierType;
	var F1s, F2s, F3s, F4s, F5s, F6s, F7s, F8s, F9s;
	var Strafers, Bombers;
	var Frigates, Cruisers, Destroyers, Battleships;
	var Location;		//TODO: might re-name this Allied, unless they can be stationed at portals, maybe even in an ocean
};
DominionCarrierFleet.prototype = {
	Set(nation, type) {
		this.Nation = nation;
		this.Type = type;
		this.SetJets();
		this.SetShips();
	},
	SetJets() {
		var type;

		type = this.Type - SHIP.ESCORtCARRIER;

		//Fighters
		this.AirForce.F1s = (this.Type+2) * ArmsDistribution[this.Index][0];
		this.AirForce.F2s = (this.Type+2) * ArmsDistribution[this.Index][0];
		this.AirForce.F3s = (this.Type+2) * ArmsDistribution[this.Index][0];
		this.AirForce.F4s = (this.Type+2) * ArmsDistribution[this.Index][1];
		this.AirForce.F5s = (this.Type+2) * ArmsDistribution[this.Index][1];
		this.AirForce.F6s = (this.Type+2) * ArmsDistribution[this.Index][1];
		this.AirForce.F7s = (this.Type+2) * ArmsDistribution[this.Index][2];
		this.AirForce.F8s = (this.Type+2) * ArmsDistribution[this.Index][2];
		this.AirForce.F9s = (this.Type+2) * ArmsDistribution[this.Index][2];

		//Others
		this.Strafer = 1 + Math.floor(this.Type/2);
		this.Bomber = (this.Type>SHIP.LIGHtCARRIER) ? 2 : 1;
	},
	SetShips() {

		this.Frigates = (this.Type>SHIP.LIGHtCARRIER) ? 2 : 1;
		this.Cruisers = (this.Type>SHIP.LIGHtCARRIER) ? 2 : 1;
		this.Destroyers = Math.floor((this.Type+1)/2);
		this.Battleships = Math.floor((this.Type+1)/2);
	}
};
