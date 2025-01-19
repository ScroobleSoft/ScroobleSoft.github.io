
//--------------------------------------------------
//---------- DOMINION DEMOCRACY --------------------
var DominionDemocracy = function() {
};
DominionDemocracy.prototype = new DominionGovernment();
DominionDemocracy.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.DEMOCRACY;
};
