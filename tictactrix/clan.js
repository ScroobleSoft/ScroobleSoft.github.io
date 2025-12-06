
//---------------------------------------------
//---------- TACTICAL CLAN --------------------
var TacticalClan = function() {
	var Cities;
	var Stacks, ActiveStack;
	var ExplorationEndeavour, ExpansionAmbition;
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
	Generate() {  //UNLOGGED - REDUNDANT
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
	},
	ExecuteTurn() {  //UNLOGGED
		//-maybe have 8 'explorer' units, preferrably Gunners, stronger units left to garrison
		//-leave one 8-stack to defend city, send rest to conquer
		//-actually, there will be a separate exploration and acquisition aggressiveness rating; in fact, there are dynamics,
		//	.exploration (number of scouts sent out, maybe even varied strength stacks per clan)
		//	.pace of city acquisition
		// .garrision size
		//-explore island first
		//-locate port as priority
		//-for ships, when they discover an island, they circle it until all shore tiles are visible to clan (**)
		//		otherwise, head to the centre of the map
		//		in later turns, least explored sectors with unexplored tiles are sailed towards, sectors being 5x5 in a 10x10 grid
		if (this.ActiveStack)
			this.ActiveStack.Update();		//-probably won't happen like this, but it might, a value being returned to determine whether .ActiveStack
													// needs to be switched to another, etc.
	},
	GetLeastExploredSector() {  //UNLOGGED - called by ::ExecuteTurn (OR, might be better in TacticalMap)
		//-for ties, go to closest sector
	}
};
