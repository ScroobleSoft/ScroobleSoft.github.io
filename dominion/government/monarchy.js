
//-------------------------------------------------
//---------- DOMINION MONARCHY --------------------
var DominionMonarchy = function() {
};
DominionMonarchy.prototype = new DominionGovernment();
DominionMonarchy.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.MONARCHY;
};
