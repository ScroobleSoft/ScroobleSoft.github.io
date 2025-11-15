
//----------------------------------------------
//---------- DOMINION OFFER --------------------  UNLOGGED - maybe REDUNDANT
var DominionOffer = function() {
	var Randomizer;
};
DominionOffer.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
	},
	GetAllied(power) {  //UNLOGGED - looking REDUNDANT

		return (power.CourtAlliance());
	}
};
