
//---------------------------------------------
//---------- IMPERIAL ARMY --------------------
var ImperialArmy = function() {
	var Satrapy;
	var Commands;
};
ImperialArmy.prototype = {
	Set() {
		this.Commands = new GenieArray();
		this.Commands.Set(1, ImperialCommand);
	},
	SetSatrapy(strpy) {

		this.Satrapy = strpy;
		this.Commands.forEach( function(cmmnd) {cmmnd.SetSatrapy(strpy);} )
	},
	CheckInfantryUnit(iUnit) {

		return ( iUnit<=IMPERIAlUNIT.LONgBOwMAN || ( iUnit>=IMPERIAlUNIT.AXeMAN && iUnit<=IMPERIAlUNIT.PIKeMAN ) );
	}
};
