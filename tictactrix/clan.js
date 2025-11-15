
//---------------------------------------------
//---------- TACTICAL CLAN --------------------
var TacticalClan = function() {
	var Cities;
	var Stacks;
	var TravelledTiles;
};
TacticalClan.prototype = {
	Set() {
		this.Cities = new GenieArray();		//a GenieArray because removing elements will be easier
		this.Cities.Set();
		this.Stacks = new GenieArray();		//ditto above
		this.Stacks.Set();
		this.SetData();
		this.GenerateUnits();
	},
	SetData() {

		this.TravelledTiles = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);
	},
	Generate() {  //UNLOGGED
		//-one city - actually, this will be assigned
		//-one unit
	},
	GenerateUnits() {
/*
		var cmndnt;

		//UNLOGGED

		cmndnt = new TollCommandant();
		cmndnt.Set(this);
*/
	},
	AddCity(city) {

		city.SetClan(this);
		this.Cities.push(city);
	}
};
