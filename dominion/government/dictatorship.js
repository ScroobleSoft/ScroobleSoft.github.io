
//-----------------------------------------------------
//---------- DOMINION DICTATORSHIP --------------------
var DominionDictatorship = function() {
};
DominionDictatorship.prototype = new DominionGovernment();
DominionDictatorship.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.DICTATORSHIP;
};
