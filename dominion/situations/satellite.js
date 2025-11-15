
//----------------------------------------------------------
//---------- DOMINION SATELLITE HACKING --------------------  could be REDUNDANT?
var DominionSatelliteHacking = function() {
	var Randomizer;
};
DominionSatelliteHacking.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
	},
	GetPower(power) {  //UNLOGGED
		var iPwr;

		do {
			iPwr = this.Randomizer.GetIndex(POWER.COUNT);
		} while (iPwr==power.Index);

		return (Powers[iPwr]);
	}
};
