
//-------------------------------------------------------
//---------- DOMINION GRANT ALLIANCE --------------------
var DominionGrantAlliance = function() {
	var Commodities;
};
DominionGrantAlliance.prototype = new DominionAlliance();
DominionGrantAlliance.prototype.Set = function() {
	DominionAlliance.prototype.Set.call(this);
	
	this.Type = ALLIANCE.GRANT;
	this.SetList();
};
DominionGrantAlliance.prototype.SetList = function() {

	this.Commodities = new Array(COMMODITY.TYPES);
	this.Commodities.fill(0);
};
DominionGrantAlliance.prototype.SetGrant = function(commodity) {

	++this.Commodities[commodity];
};
