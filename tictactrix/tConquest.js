
//-------------------------------------------------
//---------- TACTICAL CONQUEST --------------------
var TacticalConquest = function () {
	var Portless, Coastals;		//used in unit allocation
};
TacticalConquest.prototype = new GenieGame();
TacticalConquest.prototype.Set = function(intrfc, gTool, cPad, tWriter, rGenerator) {
	GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

	this.CalcPad = cPad;
	this.ScreenRect = new GenieRect();
//	this.ScreenRect.Set((MAP.W-SCREEN.WIDTH)/2, (MAP.H-SCREEN.HEIGHT)/2, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.Components = new TacticalComponents();
	this.SetTiled();
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
	this.SetCityUnits();
	this.SetUpClans();
	this.SetUpUnits();
};
TacticalConquest.prototype.SetCityUnits = function() {

	this.Coastals = new Array(CITY.COUNT.TOTAL);
	this.Randomizer.Shuffle(this.Coastals, INITIALIZE);
	this.Portless = ArrayUtils.Split(this.Coastals, CITY.COUNT.COASTAL);

	this.DetermineCityType();
	this.AssignCoastalUnits();
	this.AssignPortlessUnits();
	this.SetSmallIslandPorts();
};
TacticalConquest.prototype.SetUpClans = function() {
	var i;
	var unit;		//for swapping
	var aIslnds, iIslnds;

	aIslnds = new Array();
	for (i=0;i<CITY.COUNT.TOTAL;++i)
		if (Cities[i].Unit==TACTICAlUNIT.GUNNER)
			aIslnds.push(Cities[i]);
	for (i=0;i<CLAN.COUNT;++i) {
		unit = Map.ClanCities[i].Unit;
		Map.ClanCities[i].Unit = TACTICAlUNIT.GUNNER;
		aIslnds[i].Unit = unit;
	}

	//Assign a city to each clan
	iIslnds = new Array(MAP.ISLANDS.SMALL);
	Randomizer.Shuffle(iIslnds, INITIALIZE);
	for (i=0;i<CLAN.COUNT;++i)
		Clans[i].AddCity(Islands[ISLAND.SMALL][iIslnds[i]].Cities[2]);
};
TacticalConquest.prototype.SetUpUnits = function() {
	var tpe;
	var tle;

	//Give a stack with 1 gunner to each side
	for (i=0;i<CLAN.COUNT;++i) {
		tpe = TacticalUtils.GetUnitType(TACTICAlUNIT.GUNNER);
		tle = TacticalUtils.GetNeighbouringTile(Clans[i].Cities[0].Tile);
		TacticalUtils.CreateStack(tpe, Clans[i], tle, TACTICAlUNIT.GUNNER);
	}
};
TacticalConquest.prototype.DetermineCityType = function() {
	var i, j, k;
	var nCstls, nPrtlss;

	nCstls = 0;
	nPrtlss = 0;
	for (i=0;i<Islands.length;++i)
		for (j=0;j<Islands[i].length;++j)
			for (k=0;k<Islands[i][j].Cities.length;++k)
				if (Map.CoastalCityIndices[i].includes(k)) {
					Map.CoastalCities[nCstls] = Islands[i][j].Cities[k];
					++nCstls;
				} else {
					Map.PortlessCities[nPrtlss] = Islands[i][j].Cities[k];
					++nPrtlss;
				}
};
TacticalConquest.prototype.AssignCoastalUnits = function() {
	var i;

	for (i=0;i<CITY.COUNT.COASTAL;++i)
		if (i<CITY.COUNT.NAVAL)
			Cities[this.Coastals[i]].Unit = TACTICAlUNIT.FRIGATE + (i % TACTICAlUNIT.VARIETIES.SEA);
		else
			this.Portless.push(this.Coastals[i]);
};
TacticalConquest.prototype.AssignPortlessUnits = function() {
	var i;

	for (i=CITY.COUNT.NAVAL;i<CITY.COUNT.TOTAL;++i)
		if (i<(CITY.COUNT.NAVAL+CITY.COUNT.AIR))
			Cities[this.Portless[i-CITY.COUNT.NAVAL]].Unit = TACTICAlUNIT.HELICOPTER + (i % TACTICAlUNIT.VARIETIES.AIR);
		else
			Cities[this.Portless[i-CITY.COUNT.NAVAL]].Unit = i % TACTICAlUNIT.VARIETIES.LAND;
};
TacticalConquest.prototype.SetSmallIslandPorts = function() {  //ensures each small island has a naval city
	var i, j, k;
	var nType, iIslnd, iCty;
	var prt, aPrts;

	//Tally the number of naval cities on each small island
	aPrts = new Array(MAP.ISLANDS.SMALL);
	aPrts.fill(0);
	for (i=0;i<MAP.ISLANDS.SMALL;++i)
		for (j=0;j<ISLAND.CITIES[ISLAND.SMALL];++j) {
			if (j==2)
				continue;
			if ( Islands[ISLAND.SMALL][i].Cities[j].Unit>=TACTICAlUNIT.FRIGATE && Islands[ISLAND.SMALL][i].Cities[j].Unit<=TACTICAlUNIT.BATTLESHIP )
				++aPrts[i];
		}

	//For portless islands, find a port to switch with
	for (i=0;i<MAP.ISLANDS.SMALL;++i)
		if (aPrts[i]==0) {

			//find a naval city
			do {
				nType = this.Randomizer.GetInRange(ISLAND.MEDIUM, ISLAND.HUGE);					//pick between medium/large/huge islands
				iIslnd = this.Randomizer.GetIndex(Islands[nType].length);							//pick an island
				iCty = this.Randomizer.GetIndex(Map.CoastalCityIndices[nType].length);			//pick a city
				prt = Islands[nType][iIslnd].Cities[Map.CoastalCityIndices[nType][iCty]];
			} while ( prt.Unit<TACTICAlUNIT.FRIGATE || prt.Unit>TACTICAlUNIT.BATTLESHIP );

			//switch unit production with it
			unit = Islands[ISLAND.SMALL][i].Cities[2].Unit;
			Islands[ISLAND.SMALL][i].Cities[2].Unit = prt.Unit;
			prt.Unit = unit;
		}
};
