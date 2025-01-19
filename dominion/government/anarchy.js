
//------------------------------------------------
//---------- DOMINION ANARCHY --------------------
var DominionAnarchy = function() {
};
DominionAnarchy.prototype = new DominionGovernment();
DominionAnarchy.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.ANARCHY;
};
