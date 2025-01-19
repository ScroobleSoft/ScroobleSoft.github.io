
//---------------------------------------------------
//---------- DOMINION FEDERATION --------------------
var DominionFederation = function() {
};
DominionFederation.prototype = new DominionGovernment();
DominionFederation.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.FEDERATION;
};
