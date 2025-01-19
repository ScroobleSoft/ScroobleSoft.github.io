
//------------------------------------------------
//---------- DOMINION MARXISM --------------------
var DominionMarxism = function() {
};
DominionMarxism.prototype = new DominionGovernment();
DominionMarxism.prototype.Set = function(nation) {
	DominionGovernment.prototype.Set.call(this, nation);

	this.Type = GOVERNMENT.MARXIST;
};
