
//-----------------------------------------------------
//---------- DOMINION COMMONWEALTH --------------------
var DominionCommonwealth = function() {
};
DominionCommonwealth.prototype = new DominionGovernment();
DominionCommonwealth.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.COMMONWEALTH;
};
