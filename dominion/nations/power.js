/*
 *		TODO: time to break up this file, maybe into Set.js and Alliance.js
 */
//----------------------------------------------
//---------- DOMINION POWER --------------------
var DominionPower = function() {
	var Alliances;
	var GovernmentsList;		//sorted by affinity, used in forming alliances
	var ContinentIndices;	//random, used in alliances
	var Investments, Bonds;
	var Ambassadors, ConsulGenerals, HighCommissioners;
	var Allieds;

	var i, j;
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
	this.Bonds = new Array();

	//TODO: this is TEMP for Mobile/Multiple-Choice game
	this.Units = 88 * 17;		//NOTE: missiles not included

   this.Allieds = ArrayUtils.Create(ALLIED.COUNT, function() {var Index, Proximity;} );
	this.DetermineAlliedProximities();
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
/*
DominionPower.prototype.SetEconomy = function() {
	var i;
	var sum;

	DominionNation.prototype.SetEconomy.call(this);

	this.Cabinet.SetSurplusPercentages();
	return;

	//Distribute allocation evenly if Tomcat - TODO: the code below will be REDUNDANT
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
		this.Reserves[i] = 2 * this.SurplusAllocations[i];		//only 2 rather than 4, since the rest is split into .Cash
	this.Cash = (this.Index==POWER.TOMCAT) ? 4*BUDGET.UNITS : 2*BUDGET.UNITS;
};
*/
DominionPower.prototype.SetPersonnel = function() {
	DominionNation.prototype.SetPersonnel.call(this);

	this.Ambassadors = ArrayUtils.Create(POWER.COUNT-1, DominionCharacter);
	this.Ambassadors.forEach(function(ambsdr) {ambsdr.Set();});

	this.ConsulGenerals = ArrayUtils.Create(ALLIED.COUNT, DominionCharacter);
	this.ConsulGenerals.forEach(function(cnsl) {cnsl.Set();});

	this.HighCommissioners = ArrayUtils.Create(CITySTATE.COUNT, DominionCharacter);
	this.HighCommissioners.forEach(function(cmshnr) {cmshnr.Set();});
};
DominionPower.prototype.SetInvestments = function() {
	var i;

	this.Investments = ArrayUtils.Create(CITySTATE.COUNT, DominionInvestment);
	for (i=0;i<CITySTATE.COUNT;++i) {
		this.Investments[i].Set(this, CityStates[i]);
		CityStates[i].Investments.push(this.Investments[i]);
	}
};
DominionPower.prototype.GetInvestedAmount = function() {
	var i;
	var funds;

	funds = 0;
	for (i=0;i<CITySTATE.COUNT;++i)
		funds += this.Investments[i].Amount;

	return (funds);
};
DominionPower.prototype.GetBondsAmount = function() {  //UNLOGGED

	return (this.Bonds.length*100000);		//TODO: actual amount yet to be decided
};
DominionPower.prototype.UpdateReserves = function() {  //UNLOGGED - for MOBILE game
	var i;

	for (i=0;i<COMMODITY.TYPES;++i)
		this.Reserves[i] += this.SurplusAllocations[i];
};
DominionPower.prototype.SetFleet = function() {  //TODO: might implement this differently
	var i;
	var n;
	var carrier;

	this.Fleets = new GenieArray();
	n = (this.Index==POWER.TOMCAT) ? 2 : 1;
	for (i=0;i<n;++i)
		for (type=0;type<SHIP.CARRIERS;++type) {
			carrier = new DominionCarrierFleet();
			carrier.Set(this, type);
			this.Fleets.push(carrier);
		}
};
DominionPower.prototype.SetMissilery = function() {

	//UNLOGGED

};
DominionPower.prototype.Update = function() {

	//UNLOGGED - NOTE: only for Alliances mini-game

	this.num = 10 - PowerProfiles[this.Index][0];
	if (this.Randomizer.CheckUnderOdds(1,this.num))
		this.MakeAlliance();
};
DominionPower.prototype.Generate = function() {  //UNLOGGED
	DominionNation.prototype.Generate.call(this);

	this.Cabinet.SetInventory();
	this.Cities = new GenieArray();
	this.Cities.Set(POWER.CITIES, DominionCity, null, this);
};
DominionPower.prototype.AddAlliance = function(alld) {  //REDUNDANT?
	var allnc;

	allnc = new DominionAlliance();
	var type = 0;
	var amnt = 0;
	allnc.Set(type);
	allnc.Forge(this, alld, amnt);

	//TODO: more data and detail is needed depending on type of alliance
};
DominionPower.prototype.MakeAlliance = function() {
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
DominionPower.prototype.DetermineAlliedProximities = function() {  //UNLOGGED
	var i;

	for (i=0;i<ALLIED.COUNT;++i) {
		this.Allieds[i].Index = i;
		this.Allieds[i].Proximity = Math.abs(power.Government.Type-AlliedStates[i].Government.Type);
	}
};
DominionPower.prototype.CourtAlliance = function() {
	var nOffrs;
	var iAlld;
	var allnc, type;

	//Try 8 times to make an alliance with an unallied state
	nOffrs = 0;
	while (nOffrs!=8) {		//TODO: remove HARD-CODING
		iAlld = this.Randomizer.GetIndex(ALLIED.COUNT);
		if (!AlliedStates[iAlld].Alliance)
			if (this.CheckApproached(iAlld)) {
				//-one step here should determine whether offer will be accepted or not
				allnc = new DominionAlliance();
				type = this.DetermineAllianceType();
				allnc.Set(this, AlliedStates[iAlld], type);
				return (allnc);
			}
		++nOffrs;
	}

	//Pick any Allied to force alliance
};
DominionPower.prototype.CheckApproached = function(iAllied) {  //UNLOGGED
	var odds;

	odds = 10 * (9-this.Allieds[iAllied].Proximity);
	if (this.Randomizer.CheckUnderOdds(odds))
		return (true);
};
DominionPower.prototype.DetermineAllianceType = function() {

	//-at the moment, it is just aid
	this.AllianceType = ALLIANCE.AID;
};
DominionPower.prototype.ForgeAlliance = function(alliance) {  //UNLOGGED

	//-in case this is an upgraded alliance, scan the list and delete the previous one
	this.Alliances.push(allnc);
	allied.Alliance = allnc;
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
