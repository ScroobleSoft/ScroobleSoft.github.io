
//-------------------------------------------------
//---------- IMPERIAL REGIMENT --------------------
var ImperialRegiment = function() {
	var Satrapy;
	var Type;
	var Battalions;

	var i, num;
};
ImperialRegiment.prototype = {
	Set() {
		this.Battalions = new GenieArray();
		this.Battalions.Set(ARMY.REGIMENT.BATTALIONS, ImperialBattalion);
	},
	SetType(type) {

		this.Type = type;
	},
	SetSatrapy(strpy) {

		this.Satrapy = strpy;
		this.Battalions.forEach( function(bttln) {bttln.SetSatrapy(strpy);} )
	},
	SetSoldiers(nSldrs) {
		var i;

		for (i=0;i<this.Battalions.length;++i)
			if (nSldrs<ARMY.BATTALION.SOLDIERS) {
				this.Battalions.SetSoldiers(nSldrs);
				nSldrs = 0;
			} else {
				this.Battalions.SetSoldiers(ARMY.BATTALION.SOLDIERS);
				nSldrs -= ARMY.BATTALION.SOLDIERS;
			}
	},
	GetSoldiers() {

		this.num = 0;
		for (this.i=0;this.i<this.Battalions.length;++this.i)
			this.num += this.Battalions[this.i].GetSoldiers();

		return (this.num);
	},
	AddSoldiers(nSldrs) {

		nSldrs += this.GetSoldiers();
		this.SetSoldiers(nSldrs);
	},
	SubtractSoldiers(nSldrs) {  //UNLOGGED

		nSldrs = this.GetSoldiers() - nSldrs;
		this.SetSoldiers(nSldrs);
	},
	CheckMergeable(regiment) {  //REDUNDANT?

		return ( (this.GetSoldiers()+regiment.GetSoldiers()) < ARMY.REGIMENT.SOLDIERS );
	},
	MergeDivisions(bttln1, bttln2) {

		bttln1.AddSoldiers(bttln2.GetSoldiers());
		bttln2.Empty();
	}
};
