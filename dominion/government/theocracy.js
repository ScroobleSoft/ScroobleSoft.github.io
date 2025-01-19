
//--------------------------------------------------
//---------- DOMINION THEOCRACY --------------------
var DominionTheocracy = function() {
};
DominionTheocracy.prototype = new DominionGovernment();
DominionTheocracy.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.THEOCRACY;
};
