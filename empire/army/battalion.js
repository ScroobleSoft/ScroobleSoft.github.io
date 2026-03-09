
//--------------------------------------------------
//---------- IMPERIAL BATTALION --------------------
var ImperialBattalion = function() {
	var Satrapy;
	var Squads;

	var i, num;
};
ImperialBattalion.prototype = {
	Set() {
		this.Squads = new GenieArray();
		this.Squads.Set(ARMY.BATTALION.SQUADS, ImperialSquad);
	},
	SetSatrapy(strpy) {

		this.Satrapy = strpy;
		this.Squads.forEach( function(sqd) {sqd.SetSatrapy(strpy);} )
	},
	SetSoldiers(nSldrs) {
		var i;

		for (i=0;i<this.Squads.length;++i)
			if (nSldrs<ARMY.SQUAD.SOLDIERS) {
				this.Squads.SetSoldiers(nSldrs);
				nSldrs = 0;
			} else {
				this.Squads.SetSoldiers(ARMY.SQUAD.SOLDIERS);
				nSldrs -= ARMY.SQUAD.SOLDIERS;
			}
	},
	GetSoldiers() {

		this.num = 0;
		for (this.i=0;this.i<this.Squads.length;++this.i)
			this.num += this.Squads[this.i].GetSoldiers();

		return (this.num);
	},
	CheckMergeable(sqd1, sqd2) {  //UNLOGGED
	},
	Merge(sqd1, sqd2) {  //UNLOGGED
	}
};
