
//-------------------------------------------------
//---------- TACTICAL CONQUEST --------------------
var TacticalConquest = function () {
	var Portless, Coastals;		//used in unit allocation
	var Turn;
};
TacticalConquest.prototype = new GenieGame();
TacticalConquest.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
	this.Components = new TacticalComponents();
	this.SetTiled();
	this.Turn = 0;
};
TacticalConquest.prototype.SetComponents = function() {

	this.Components.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
	Graphics.Set(this.Interface.Screen, this.Interface.InfoBox, this.Interface.ControlPanel);  //NOTE: switching to universal objects (TODO: remove later)
	Text.Set(this.Interface.Screen, null, this.Interface.InfoBox, this.Interface.ControlPanel);  //NOTE: switching to universal objects (TODO: remove later)
};
TacticalConquest.prototype.Start = function() {

//	this.Play();		//TODO: this can be replaced by a view
	IntroView.Open();
	IntroView.Update();
};
TacticalConquest.prototype.SetUp = function() {  //UNLOGGED

	Map.Generate();
	this.SetUpClans();
	this.SetUpUnits();
//	this.SetPlatforms();		method REDUNDANT?
};
TacticalConquest.prototype.SetUpClans = function() {  //NOTE: method ensures central city on Small Islands produce Gunners
	var i;
	var unit;		//for swapping
	var aCities, iIslnds, iCity;

	//Assign a central small island city to each clan
	iIslnds = new Array(MAP.ISLANDS.SMALL);
	Randomizer.Shuffle(iIslnds, INITIALIZE);
	for (i=0;i<CLAN.COUNT;++i)
		Clans[i].AddCity(Islands[ISLAND.SMALL][iIslnds[i]].Cities[2]);

	//Find the 8 cities producing Gunners
	aCities = new Array();
	for (i=0;i<CITY.COUNT.TOTAL;++i)
		if (Cities[i].Unit==TACTICAlUNIT.GUNNER)
			if (!Cities[i].Clan)															//skip cities that have already been assigned to clans
				aCities.push(Cities[i]);

	//Switch production between Gunner cities and clan cities
	iCity = 0;
	for (i=0;i<CLAN.COUNT;++i) {
		if (Clans[i].Cities[0].Unit==TACTICAlUNIT.GUNNER)						//skip the exchange if city is already producing Gunners
			continue;
		unit = Clans[i].Cities[0].Unit;
		Clans[i].Cities[0].SetUnit(TACTICAlUNIT.GUNNER);
		aCities[iCity].SetUnit(unit);
		++iCity;
	}
};
TacticalConquest.prototype.SetUpUnits = function() {  //finds a tile next to first city, creates stack on it
	var tile;

	//Give a stack with 1 gunner to each side
	for (i=0;i<CLAN.COUNT;++i) {
		tile = Clans[i].Cities[0].GetNeighbouringTile(Clans[i].Cities[0].Tile);
		TacticalUtils.CreateStack(STACK.LAND, Clans[i], tile, TACTICAlUNIT.GUNNER);
		Clans[i].Stacks[0].UpdateTravelledTiles();
		if (Clans[i].Stacks[0].CheckCityAdjacent()) {
			Clans[i].ActiveStack = Clans[i].Stacks[0];
			Clans[i].ActiveStack.Target = Clans[i].Stacks[0].GetAdjacentAsset();		//small island location means a city is always adjacent
		}
	}
};
TacticalConquest.prototype.ExecuteTurns = function() {
	var i;
	var aTurn;

	aTurn = new Array(CLAN.COUNT);
	Randomizer.Shuffle(aTurn, INITIALIZE);
	for (i=0;i<CLAN.COUNT;++i)
		if (aTurn[i]==PlayerClan.Index)
			continue;
		else
			Clans[aTurn[i]].ExecuteTurn();

	Cities.forEach( function(city) {if (city.Clan) city.Update();} );
	Platforms.forEach( function(pltfrm) {if (pltfrm.Clan) pltfrm.Update();} );
};
