
//-------------------------------------------------
//---------- DOMINION REPUBLIC --------------------
var DominionRepublic = function() {
};
DominionRepublic.prototype = new DominionGovernment();
DominionRepublic.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.REPUBLIC;
};
