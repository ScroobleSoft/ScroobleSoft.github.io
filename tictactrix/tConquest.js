
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
	Text.Set(this.Interface.Screen, this.Interface.InfoBox, this.Interface.ControlPanel);  //NOTE: switching to universal objects (TODO: remove later)
};
TacticalConquest.prototype.Start = function() {

//	this.Play();		//TODO: this can be replaced by a view
	IntroView.Open();
	IntroView.Update();
};
TacticalConquest.prototype.SetUp = function() {  //UNLOGGED

	Map.Generate();

	//TEMP
	var i;
	var aUnits = new Array(TACTICAlUNIT.TYPES+1);
	aUnits.fill(0);
	for (i=0;i<CITY.COUNT.TOTAL;++i)
		if (Cities[i].Unit==TACTICAlUNIT.NONE)
			++aUnits[TACTICAlUNIT.TYPES];
		else
			++aUnits[Cities[i].Unit];
	//TEMP

	this.SetUpClans();
	this.SetUpUnits();
//	this.SetPlatforms();
};
TacticalConquest.prototype.SetUpClans = function() {  //NOTE: method ensures central city on Small Islands produce Gunners
	var i;
	var unit;		//for swapping
	var aCities, iIslnds;

	aCities = new Array();
	for (i=0;i<CITY.COUNT.TOTAL;++i)
		if (Cities[i].Unit==TACTICAlUNIT.GUNNER)
			aCities.push(Cities[i]);
	for (i=0;i<CLAN.COUNT;++i) {
		unit = Map.ClanCities[i].Unit;
		Map.ClanCities[i].Unit = TACTICAlUNIT.GUNNER;
		aCities[i].Unit = unit;
	}

	//Assign a city to each clan
	iIslnds = new Array(MAP.ISLANDS.SMALL);
	Randomizer.Shuffle(iIslnds, INITIALIZE);
	for (i=0;i<CLAN.COUNT;++i)
		Clans[i].AddCity(Islands[ISLAND.SMALL][iIslnds[i]].Cities[2]);
};
TacticalConquest.prototype.SetUpUnits = function() {  //finds a tile next to first city, creates stack on it
	var type;
	var tile;

	//Give a stack with 1 gunner to each side
	for (i=0;i<CLAN.COUNT;++i) {
		type = TacticalUtils.GetUnitType(TACTICAlUNIT.GUNNER);
		tile = Clans[i].Cities[0].GetNeighbouringTile(Clans[i].Cities[0].Tile);
		TacticalUtils.CreateStack(type, Clans[i], tile, TACTICAlUNIT.GUNNER);
	}
};
TacticalConquest.prototype.ExecuteTurns = function() {  //UNLOGGED
	var i;
	var aTurn;

	aTurn = new Array(CLAN.COUNT);
	Randomizer.Shuffle(aTurn, INITIALIZE);
	for (i=0;i<CLAN.COUNT;++i)
		if (aTurn[i]==PlayerClanIndex)
			continue;
		else
			Clans[aTurn[i]].ExecuteTurn();

	Cities.forEach( function(city) {city.Update();} );
	Platform.forEach( function(pltfrm) {pltfrm.Update();} );
};
