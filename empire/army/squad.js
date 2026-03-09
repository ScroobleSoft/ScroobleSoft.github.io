
//----------------------------------------------
//---------- IMPERIAL SQUAD --------------------
var ImperialSquad = function() {
	var Satrapy;
	var Soldiers;
};
ImperialSquad.prototype = {
	Set() {
		this.Soldiers = ARMY.SQUAD.SOLDIERS;		//TODO: could actually be an array of agents, but maybe not
	},
	SetSatrapy(strpy) {

		this.Satrapy = strpy;
	},
	GetSoldiers() {

		return (this.Soldiers);
	}
};
