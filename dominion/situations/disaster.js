
//-------------------------------------------------
//---------- DOMINION DISASTER --------------------
var DominionDisaster = function() {
	var Randomizer;
	var Power, Allied;
	var Disaster;
};
DominionDisaster.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
	},
	DetermineNation(nation) {  //UNLOGGED
		var num;

		num = this.Randomizer.GetIndex(POWER.COUNT+ALLIED.COUNT);
		if (num<POWER.COUNT) {
			this.Power = Powers[num];
			this.Allied = null;
		} else {
			this.Power = null;
			this.Allied = AlliedStates[num-POWER.COUNT];
		}
	},
	DetermineDisaster() {  //UNLOGGED

		this.Disaster = this.Randomizer.GetIndex(COMMODITY.TYPES);
	}
};
