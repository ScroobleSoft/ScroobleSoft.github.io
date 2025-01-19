
//------------------------------------------------------
//---------- DOMINION PACT ALLIANCE --------------------
var DominionPactAlliance = function() {
};
DominionPactAlliance.prototype = new DominionAlliance();
DominionPactAlliance.prototype.Set = function() {
	DominionAlliance.prototype.Set.call(this);
	
	this.Type = ALLIANCE.PACT;
};
