
//-------------------------------------------------
//---------- DOMINION CITY STATE --------------------
var DominionCityState = function() {
	var City;
	var StockPrice, PriceChange;
	var Investments, Credit;							//Ringit value of current investments made by Powers, and cumulative credit they have accumulated
	var FighterNomenclatures;
	var Factories;
};
DominionCityState.prototype = new DominionNation();
DominionCityState.prototype.Set = function(rGenerator) {
	DominionNation.prototype.Set.call(this, rGenerator);

//	this.FighterNomenclatures = new Array();
	this.Type = NATION.CITySTATE;
	this.City = new DominionCity();
	this.City.Set(this);
	this.StockPrice = new Array();
	this.StockPrice = 20;
	this.PriceChange = 0;
	this.Investments = new Array(POWER.COUNT);
	this.Investments.fill(0);
	this.Credit = new Array(POWER.COUNT);
	this.Credit.fill(0);
};
DominionCityState.prototype.SetLinks = function(cfNmns) {  //cf- champion fighter

	this.FighterNomenclatures = cfNmns;
};
DominionCityState.prototype.SetTempGame = function() {  //TEMP

	this.Factories = new Array(5);  //will eventually have a more elaborate structure
	DominionRandomizer.GetUniqueNumbers(this.Factories, 5, ALLIED.COUNT, STARtAtZERO);
};
DominionCityState.prototype.SetGovernment = function() {

	//UNLOGGED

	this.Government = new DominionCommonwealth();
	this.Government.Set(this);
};
DominionCityState.prototype.GenerateChampionFighter = function() {  //NOTE: other plane types? maybe not

	//LOGGED

	var i;
	var fighter;
	var type;
	var upgrades;

	fighter = new ChampionFighter();
	i = 0;
	do {  //need loop to pick unique nomenclature
		type = Utilities.GetRandomNumber(FIGHTER.BASeTYPES, STARtAtZERO);		//determine base type
		type *= 100;
		type += Utilities.GetRandomNumber(89)+10;  //ISSUE: distinct nomenclatures
		for (i=0;i<this.FighterNomenclatures.length;++i)
	 if (type==this.FighterNomenclatures[i])
		 break;
	} while (i!=this.FighterNomenclatures.length);
	this.FighterNomenclatures.push(type);
	fighter.Set(null, type);

	//***** RESUME HERE *****/

	upgrades = Utilities.GetRandomNumber(FIGHTER.MAxUPGRADES);

	//Randomly select both number and type of enhancements and bonuses
	//TODO: can take binary approach to random selection per augmentation
	//2 possibilities here - randomly select number of attributes OR go bit-by-bit and randomly flip each on or off;
	//  latter would yield units of about the same quaility and cost (more significantly); better to randomly select overall
	//  quality first, then distribute bits accordingly?
};
DominionCityState.prototype.SetArmy = function() {

	this.Army.LARTs = 0;
	this.Army.MARTs = 0;
	this.Army.HARTs = 0;
	this.Army.Jeeps = 0;
	this.Army.Howitzers = 0;
	this.Army.AVs = 0;
	this.Army.MobileGuns = 0;
	this.Army.Artillery = 0;
	this.Army.Tanks = 0;
	this.Army.AAGuns = 0;
	this.Army.Helicopters = 0;
};
DominionCityState.prototype.SetNavy = function() {
	DominionNation.prototype.SetNavy.call(this);

	this.Navy.PatrolBoats = 0;
	this.Navy.GunBoats = 0;
	this.Navy.MissileBoats = 0;
	this.Navy.Frigates = 0;
	this.Navy.Cruisers = 0;
	this.Navy.Destroyers = 0;
	this.Navy.Battleships = 0;
	this.Navy.Submarines = 0;
};
DominionCityState.prototype.SetAirForce = function() {

	this.SetFighters();
	this.AirForce.Bombers = 0;
	this.AirForce.Interceptors = 0;
	this.AirForce.Interdictors = 0;
	this.AirForce.Recons = 0;
	this.AirForce.Refuellers = 0;
	this.AirForce.Strafers = 0;
	this.AirForce.Transporters = 0;
};
DominionCityState.prototype.SetFighters = function() {

	//UNLOGGED

	this.AirForce.F1s = 0;
	this.AirForce.F2s = 0;
	this.AirForce.F3s = 0;
	this.AirForce.F4s = 0;
	this.AirForce.F5s = 0;
	this.AirForce.F6s = 0;
	this.AirForce.F7s = 0;
	this.AirForce.F8s = 0;
	this.AirForce.F9s = 0;
};
DominionCityState.prototype.SetMissilery = function() {

	//UNLOGGED

};
