
//------------------------------------------------
//---------- IMPERIAL COMMAND --------------------
var ImperialCommand = function() {
	var Satrapy;
	var Regiments;

	var i, num;
};
ImperialCommand.prototype = {
	Set() {
		this.SetRegiments();
	},
	SetRegiments() {
		var i, j;
		var num;

		num = ARMY.COMMAND.REGIMENTS / IMPERIAlUNIT.TYPES;								//determine quantity of each regiment type

		//Create
		this.Regiments = new GenieArray();
		this.Regiments.Set(ARMY.COMMAND.REGIMENTS, ImperialRegiment);

		//Set types
		for (i=0;i<IMPERIAlUNIT.TYPES;++i)
			for (j=0;j<num;++j)
				this.Regiments[(num*i)+j].SetType(i);
	},
	SetSatrapy(strpy) {

		this.Satrapy = strpy;
		this.Regiments.forEach( function(rgmnt) {rgmnt.SetSatrapy(strpy);} )
	},
	GetRegiments() {
		var i;
		var nRgmnts;

		nRgmnts = 0;
		for (i=0;i<ARMY.COMMAND.REGIMENTS;++i)
			if (this.Regiments[i].GetSoldiers())
				++nRgmnts;

		return (nRgmnts);
	},
	GetSoldiers() {

		this.num = 0;
		for (this.i=0;this.i<this.Regments.length;++this.i)
			this.num += this.Regiments[this.i].GetSoldiers();

		return (this.num);
	},
	CheckDivisionsMergeable(rgmnt1, rgmnt2) {

		return ( (rgmnt1.GetSoldiers()+rgmnt2.GetSoldiers()) < ARMY.REGIMENT.SOLDIERS );
	},
	MergeDivisions(rgmnt1, rgmnt2) {

		rgmnt1.AddSoldiers(rgmnt2.GetSoldiers());
		rgmnt2.Empty();
	}
};
