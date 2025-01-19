
//--------------------------------------------------
//---------- DOMINION FEUDALISM --------------------
var DominionFeudalism = function() {
};
DominionFeudalism.prototype = new DominionGovernment();
DominionFeudalism.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.FEUDAL;
};
