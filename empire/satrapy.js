
//------------------------------------------------
//---------- IMPERIAL SATRAPY --------------------
var ImperialSatrapy = function() {
	var Army;
	var Territories;		//conquered satrapies
};
ImperialSatrapy.prototype = {
	Set() {
		this.Army = new ImperialArmy();
		this.Army.Set();
		this.Army.SetSatrapy(this);
		this.Territories = new Array();
	},
	AddTerritory() {
	}
};
