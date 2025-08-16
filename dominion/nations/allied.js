
//-----------------------------------------------------
//---------- DOMINION ALLIED STATE --------------------
var DominionAlliedState = function() {
	var Randomizer;
	var AssociatedIndex, SecondaryIndex;		//.Associated - most closely associated Power, .Secondary - more peripheral association
	var PrimaryColour, SecondaryColour;
	var Alliance, Grants, Aid, Treaties, Pacts;
	var Orientation, Belligerence;
	var ConsulGenerals;
};
DominionAlliedState.prototype = new DominionNation();
DominionAlliedState.prototype.Set = function(rGenerator) {
	DominionNation.prototype.Set.call(this, rGenerator);

	this.Type = NATION.ALLIED;
	this.SetData();

	//TODO: this is TEMP for Mobile/Multiple-Choice game
	this.Units = 59 * 5;		//NOTE: missiles not included
};
DominionAlliedState.prototype.SetData = function() {

	this.Grants = new Array(POWER.COUNT);
	this.Grants.fill(0);
	this.Aid = new Array(POWER.COUNT);
	this.Aid.fill(0);
	this.Treaties = new Array(POWER.COUNT);
	this.Treaties.fill(0);
	this.Pacts = new Array(POWER.COUNT);
	this.Pacts.fill(0);
};
/*
DominionAlliedState.prototype.Generate = function(blgrnc) {

	//UNLOGGED

	//Set basic data
	this.Population = Math.round((0.9*POPULATION.ALLIED) + (0.2*POPULATION.ALLIED*Math.random()));	//0.9M - 1.1M
	this.Revenue = Math.round((50/25)*0.25*this.Population);
	this.GDP = GDP.ALLIED * (this.Population/POPULATION.ALLIED);
	this.Treasury = 4*this.Revenue;
	this.Buoys = ALLIED.BUOYS;
	this.Satellites = 0;
	this.SetGovernment(this.AssociatedIndex);
	this.SetPersonnel();
};
*/
DominionAlliedState.prototype.Generate = function() {  //UNLOGGED
	DominionNation.prototype.Generate.call(this);

	this.Cities = new GenieArray();
	this.Cities.Set(ALLIED.CITIES, DominionCity, null, this);
};
DominionAlliedState.prototype.SetGovernment = function() {

	//UNLOGGED

	switch (PowerProfiles[this.AssociatedIndex][2]) {
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
DominionAlliedState.prototype.SetBudget = function(blgrnc) {

	this.Belligerence = (blgrnc==-1) ? -1 : this.Randomizer.GetInRange(0,BELLIGERENCE.TYPES);

	DominionNation.prototype.SetBudget.call(this, BELLIGERENCE.NONE);
};
DominionAlliedState.prototype.SetPersonnel = function() {
	DominionNation.prototype.SetPersonnel.call(this);

	this.ConsulGenerals = ArrayUtils.Create(POWER.COUNT, DominionCharacter);
	this.ConsulGenerals.forEach(function(cnsl) {cnsl.Set();});
};
/*
DominionAlliedState.prototype.SetArmy = function() {

	this.Army.LARTs		 = 4 * ALLIED.CITIES;
	this.Army.MARTs		 = 3 * ALLIED.CITIES;
	this.Army.HARTs		 = 2 * ALLIED.CITIES;
	this.Army.Jeeps		 = 4 * ALLIED.CITIES;
	this.Army.Howitzers	 = 4 * ALLIED.CITIES;
	this.Army.APCs			 = 4 * ALLIED.CITIES;
	this.Army.AVs			 = 3 * ALLIED.CITIES;
	this.Army.Artilleries = 3 * ALLIED.CITIES;
	this.Army.IFVs			 = 3 * ALLIED.CITIES;
	this.Army.MobileGuns	 = 2 * ALLIED.CITIES;
	this.Army.Trunks		 = 2 * ALLIED.CITIES;
	this.Army.Tanks		 = 2 * ALLIED.CITIES;
	this.Army.AAGuns		 = 1 * ALLIED.CITIES;
	this.Army.ATWs			 = 1 * ALLIED.CITIES;
	this.Army.LCGs			 = 1 * ALLIED.CITIES;
	this.Army.Helicopters = 1 * ALLIED.CITIES;
};
DominionAlliedState.prototype.SetNavy = function() {
	DominionNation.prototype.SetNavy.call(this);

	this.Navy.PatrolBoats	 = 1 * ALLIED.CITIES;

	this.Navy.GunBoats		 = 2 * ALLIED.CITIES;
	this.Navy.MissileBoats	 = 2 * ALLIED.CITIES;
	this.Navy.Frigates		 = 1 * ALLIED.CITIES;
	this.Navy.Cruisers		 = 1 * ALLIED.CITIES;
	this.Navy.Destroyers		 = 0;
	this.Navy.Battleships	 = 0;
	this.Navy.EscortCarriers = 0;
	this.Navy.FleetCarriers	 = 0;
	this.Navy.SuperCarriers	 = 0;

	this.Navy.Submarines		 = 1 * ALLIED.CITIES;
};
DominionAlliedState.prototype.SetAirForce = function() {

	this.AirForce.Bombers		= ALLIED.CITIES;
	this.AirForce.Interceptors	= 0;
	this.AirForce.Interdictors	= 0;
	this.AirForce.Recons			= 0;
	this.AirForce.Refuellers	= 0;
	this.AirForce.Strafers		= ALLIED.CITIES;
	this.AirForce.Transports	= 0;

	this.AirForce.F1s = 1 * ALLIED.CITIES;
	this.AirForce.F2s = 1 * ALLIED.CITIES;
	this.AirForce.F3s = 1 * ALLIED.CITIES;
	this.AirForce.F4s = 1 * ALLIED.CITIES;
	this.AirForce.F5s = 1 * ALLIED.CITIES;
	this.AirForce.F6s = 1 * ALLIED.CITIES;
	this.AirForce.F7s = 1 * ALLIED.CITIES;
	this.AirForce.F8s = 1 * ALLIED.CITIES;
	this.AirForce.F9s = 1 * ALLIED.CITIES;
};
*/
DominionAlliedState.prototype.SetMissilery = function() {

	//UNLOGGED

};
DominionAlliedState.prototype.CheckClicked = function() {

	//UNLOGGED - only implementing for Global View right now

	return (SpaceUtils.CheckPointInCircle(Mouse, this.Location, MAP.SIZE.ALLIED/2));
};
