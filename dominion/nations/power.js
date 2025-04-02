
//----------------------------------------------
//---------- DOMINION POWER --------------------
var DominionPower = function() {
	var Alliances;
	var GovernmentsList;		//sorted by affinity, used in forming alliances
	var ContinentIndices;	//random, used in alliances

	var j;
};
DominionPower.prototype = new DominionNation();
DominionPower.prototype.Set = function(rGenerator) {
	DominionNation.prototype.Set.call(this, rGenerator);

	this.Type = NATION.POWER;
	this.Alliances = new Array();
	this.Cities = new Array(POWER.CITIES);		//TODO: this is TEMP (likely will have an array of DominionCities eventually)
	this.GovernmentsList = new Array(GOVERNMENT.TYPES);
	this.ContinentIndices = new Array(MAP.CONTINENT.COUNT);
	ArrayUtils.Index(this.ContinentIndices);
};
DominionPower.prototype.SetPopulation = function() {
	DominionNation.prototype.SetPopulation.call(this);

	if (this.Index==POWER.TOMCAT) {
		this.Population *= 2;
		if (this.Randomizer.FlipCoin())
			++this.Population;
	}
};
DominionPower.prototype.SetGovernment = function() {

	switch (PowerProfiles[this.Index][2]) {
		case GOVERNMENT.DEMOCRACY:
			this.Government = new DominionDemocracy();
			break;
		case GOVERNMENT.ANARCHY:
			this.Government = new DominionAnarchy();
			break;
		case GOVERNMENT.MARXIST:
			this.Government = new DominionMarxism();
			break;
		case GOVERNMENT.REPUBLIC:
			this.Government = new DominionRepublic();
			break;
			case GOVERNMENT.FEDERATION:
			this.Government = new DominionFederation();
			break;
		case GOVERNMENT.THEOCRACY:
			this.Government = new DominionTheocracy();
			break;
		case GOVERNMENT.FEUDAL:
			this.Government = new DominionFeudalism();
			break;
		case GOVERNMENT.MONARCHY:
			this.Government = new DominionMonarchy();
			break;
		case GOVERNMENT.DICTATORSHIP:
			this.Government = new DominionDictatorship();
			break;
	}
	this.Government.Set(this);
};
DominionPower.prototype.SetEconomy = function() {
	var i;
	var sum;

	DominionNation.prototype.SetEconomy.call(this);

	//Distribute allocation evenly if Tomcat
	if (this.Index==POWER.TOMCAT) {
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			this.SurplusAllocations[i] = 7;
	} else {
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (i==PowerProfiles[this.Index][1])
				this.SurplusAllocations[i] = 28;
			else
				this.SurplusAllocations[i] = 4;
	}

	//Calculate percentages . . . NOTE: this array can be calculated as needed, and doesn't need to be stored
	sum = this.SurplusAllocations[0];
	for (i=1;i<MINISTRY.PORTFOLIOS;++i)
		sum += this.SurplusAllocations[i];
	for (i=0;i<MINISTRY.PORTFOLIOS;++i)
		this.SurplusPercentages[i] = 100 * (this.SurplusAllocations[i]/sum);

	//NOTE: this is for MOBILE game, but could become permanent
	for (i=0;i<COMMODITY.TYPES;++i)
		this.Reserves[i] = 2 * this.SurplusAllocations[CommodityMap[i]];		//only 2 rather than 4, since the rest is split into .Cash
	this.Cash = (this.Index==POWER.TOMCAT) ? 4*BUDGET.UNITS : 2*BUDGET.UNITS;
};
DominionPower.prototype.UpdateReserves = function() {  //UNLOGGED - for MOBILE game
	var i;

	for (i=0;i<COMMODITY.TYPES;++i)
		this.Reserves[i] += this.SurplusAllocations[CommodityMap[i]];
};
DominionPower.prototype.SetArmy = function() {  //TODO: should be in Military object (or field)
	var scale;

	scale = 1.0;
	if (this.Index==POWER.TOMCAT)
		scale *= 2;

	if (Game.CheckMobile()) {
		this.Army.LARTs =			8 * POWER.CITIES * (ArmsDistribution[this.Index][0]+scale);
		this.Army.MARTs =			6 * POWER.CITIES * (ArmsDistribution[this.Index][1]+scale);
		this.Army.HARTs =			4 * POWER.CITIES * (ArmsDistribution[this.Index][2]+scale);
		this.Army.Jeeps =			8 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Army.Howitzers =	8 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Army.APCs =			8 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Army.AVs =			6 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Army.Artilleries =	6 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Army.IFVs =			6 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Army.MobileGuns =	4 * POWER.CITIES * ArmsDistribution[this.Index][2];
		this.Army.Trucks =		4 * POWER.CITIES * ArmsDistribution[this.Index][2];
		this.Army.Tanks =			4 * POWER.CITIES * ArmsDistribution[this.Index][2];
		this.Army.AAGuns =		2 * POWER.CITIES * scale;
		this.Army.ATWs =			2 * POWER.CITIES * scale;
		this.Army.LCGs =			2 * POWER.CITIES * scale;
		this.Army.Helicopters =	2 * POWER.CITIES * scale;
	} else {  //likely REDUNDANT
		this.Army.LARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.Army.MARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.Army.HARTs =			(this.Index==POWER.TOMCAT) ? 16*POWER.CITIES : 8*POWER.CITIES;
		this.Army.Jeeps =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.Howitzers =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.AVs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.MobileGuns =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.Artillery =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.Tanks =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.AAGuns =		(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.ATWs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.LCGs =			(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
		this.Army.Helicopters =	(this.Index==POWER.TOMCAT) ?  8*POWER.CITIES : 4*POWER.CITIES;
	}
};
DominionPower.prototype.SetNavy = function() {
	DominionNation.prototype.SetNavy.call(this);

	if (Game.CheckMobile()) {
		this.Navy.PatrolBoats  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;

		this.Navy.GunBoats		 = 3 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Navy.MissileBoats	 = 3 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Navy.Frigates		 = 2 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Navy.Cruisers		 = 2 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Navy.Destroyers		 = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];
		this.Navy.Battleships	 = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];
		this.Navy.EscortCarriers = 1 * POWER.CITIES * ArmsDistribution[this.Index][0];
		this.Navy.FleetCarriers	 = 1 * POWER.CITIES * ArmsDistribution[this.Index][1];
		this.Navy.SuperCarriers	 = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];

		this.Navy.Submarines	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	} else {
		this.Navy.PatrolBoats  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.GunBoats	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.MissileBoats = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.Frigates	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.Cruisers	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.Destroyers	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.Battleships  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
		this.Navy.Submarines	  = (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	}
};
DominionPower.prototype.SetAirForce = function() {

	this.SetFighters();

	this.AirForce.Bombers		= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Interceptors	= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Interdictors	= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Recons			= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Refuellers	= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Strafers		= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
	this.AirForce.Transports	= (this.Index==POWER.TOMCAT) ? 2*POWER.CITIES : POWER.CITIES;
};
DominionPower.prototype.SetFighters = function() {

	this.AirForce.F1s = 3 * POWER.CITIES * ArmsDistribution[this.Index][0];
	this.AirForce.F2s = 3 * POWER.CITIES * ArmsDistribution[this.Index][0];
	this.AirForce.F3s = 3 * POWER.CITIES * ArmsDistribution[this.Index][0];
	this.AirForce.F4s = 2 * POWER.CITIES * ArmsDistribution[this.Index][1];
	this.AirForce.F5s = 2 * POWER.CITIES * ArmsDistribution[this.Index][1];
	this.AirForce.F6s = 2 * POWER.CITIES * ArmsDistribution[this.Index][1];
	this.AirForce.F7s = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];
	this.AirForce.F8s = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];
	this.AirForce.F9s = 1 * POWER.CITIES * ArmsDistribution[this.Index][2];
};
DominionPower.prototype.SetMissilery = function() {

	//UNLOGGED

};
DominionPower.prototype.Update = function() {

	//UNLOGGED - NOTE: only for Alliances mini-game

	this.num = 10 - PowerProfiles[this.Index][0];
	if (this.Randomizer.CheckUnderOdds(1,this.num))
		this.ForgeAlliance();
};
DominionPower.prototype.Generate = function() {  //UNLOGGED
	DominionNation.prototype.Generate.call(this);

	this.Cities = new GenieArray();
	this.Cities.Set(POWER.CITIES, DominionCity, null, this);
};
DominionPower.prototype.AddAlliance = function(alld) {
	var allnc;

	allnc = new DominionAlliance();
	var type = 0;
	var amnt = 0;
	allnc.Set(type);
	allnc.Forge(this, alld, amnt);

	//TODO: more data and detail is needed depending on type of alliance
};
DominionPower.prototype.ForgeAlliance = function() {
	var iGvrnmnt;

	//UNLOGGED

	if (this.Randomizer.FlipCoin()) {  //attempt on same continent
		this.Randomizer.Shuffle(SatelliteIndex);
		for (this.i=0;this.i<POWER.SATELLITES;++this.i)
			if (!this.Continent.Allieds[SatelliteIndex[this.i]].Alliance) {
				this.AddAlliance(this.Continent.Allieds[SatelliteIndex[this.i]]);
				return;
			}
	}

	//Form alliance on another continent
	this.SetGovernmentsList();
	for (this.i=0;this.i<this.GovernmentsList.length;++this.i) {
		if (this.Randomizer.FlipCoin())
			continue;
		this.Randomizer.Shuffle(GovernmentsMatrix[this.GovernmentsList[this.i]]);
		for (this.j=0;this.j<GovernmentsMatrix[this.GovernmentsList[this.i]].length;++this.j)
			if (!GovernmentsMatrix[this.GovernmentsList[this.i]][this.j].Alliance) {
				this.AddAlliance(GovernmentsMatrix[this.GovernmentsList[this.i]][this.j].Alliance);
				return;
			}
	}

	//Pick one completely at random
	this.Randomizer.Shuffle(AlliedsIndex);
	for (this.i=0;this.i<ALLIED.COUNT;++this.i)
		if (!AlliedStates[AlliedsIndex[this.i]].Alliance) {
			this.Alliances.push(AlliedStates[this.i]);
			AlliedStates[this.i].Alliance = this;
			return;
		}

	//TODO: since all Allied States are taken, consider one that isn't free
};
DominionPower.prototype.SetGovernmentsList = function() {
	var nGvrnmnts;
	var dGvrnmnt, iGvrnmnt;  //d- decrement, i- increment

	nGvrnmnts = 0;
	dGvrnmnt = this.Government.Index - 1;
	iGvrnmnt = this.Government.Index + 1;
	this.GovernmentsList[nGvrnmnts] = this.Government.Index;
	++nGvrnmnts;
	while ( dGvrnmnt>=0 || iGvrnmnt<GOVERNMENT.TYPES ) {
		if (iGvrnmnt<GOVERNMENT.TYPES) {
			this.GovernmentsList[nGvrnmnts] = iGvrnmnt;
			++iGvrnmnt;
			++nGvrnmnts;
		}
		if (dGvrnmnt>=0) {
			this.GovernmentsList[nGvrnmnts] = dGvrnmnt;
			--dGvrnmnt;
			++nGvrnmnts;
		}
	}
};
DominionPower.prototype.CheckAnnexable = function(ntn) {
	var i;

	if (PlayerPower===ntn)
		return (false);

	for (i=0;i<this.Alliances.length;++i)
		if (this.Alliances[i].Ally===ntn)
			return (false);

	return (true);
};
