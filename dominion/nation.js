
//-----------------------------------------------
//---------- DOMINION NATION --------------------
var DominionNation = function() {
	var Randomizer;
	var Type;
	var Location, Continent;								//.Location- world screen map coordinates
	var Population, GDP, Revenue;
	var SurplusPercentages, SurplusAllocations;		//both REDUNDANT? - moving this to cabinet
	var Treasury, Reserves;									//coffers - .Reserves REDUNDANT?
	var Popularity, Government, Opposition;			//internal
	var HeadOfState, Adviser;
	var Cabinet;
	var Army, AirForce, Navy, Missilery, Fleets;
	var MicroUnits, MidUnits, MegaUnits, Units;		//for MOBILE game (maybe TEMP)

	var Cities, Provinces, Bases;	//TODO: one or more of these may be REDUNDANT
	var TerritorialWaters;		//ISSUE: very much a maybe

	var i, num;
};
DominionNation.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.Location = new Coordinate2D();
		this.Popularity = 50;
		this.SetSlots();
	},
	SetSlots() {

		//UNLOGGED - REDUDANT?

		this.SurplusPercentages = new Array(MINISTRY.PORTFOLIOS);
		this.SurplusPercentages.fill(0);
		this.SurplusAllocations = new Array(MINISTRY.PORTFOLIOS);
		this.SurplusAllocations.fill(0);
		this.Reserves = new Array(COMMODITY.TYPES);
	},
	Generate() {

		//UNLOGGED

		this.SetPopulation();
		this.SetGovernment();
		this.SetPersonnel();
		this.SetEconomy();
		this.SetCabinet();
		this.SetMilitary();
		this.SetInvestments();

		//-also have to set buoys, satellites, in ministry objects
	},
	SetPopulation() {

		this.Population = Populations[this.Type];
		this.AdjustPopulation();
	},
	SetLocation(loc) {

		this.Location.Set(loc.X, loc.Y);
	},
	AdjustPopulation() {

		this.Population += this.Randomizer.GetIndex(Math.round(0.1*this.Population));
	},
	SetPersonnel() {

		this.HeadOfState = new DominionCharacter();
		this.HeadOfState.Set();
		this.Adviser = new DominionCharacter();			//TODO: cabinet will be generated, adviser will be selected among ministers
		this.Adviser.Set();
	},
	SetCabinet() {

		this.Cabinet = new DominionCabinet();
		this.Cabinet.Set(this);
		if (this.Type==NATION.POWER) {
			this.Cabinet.SetSurplusPercentages();
			this.Cabinet.SetInventory();
		}
	},
	SetEconomy() {  //UNLOGGED

		this.GDP = this.Population * GDP.PErCAPITA;
		this.Revenue = 0.4 * this.GDP;													//TODO: tax rate could be adjustable
		this.Treasury = Math.floor(4*(this.Revenue/25));							//4 fortnights
	},
	SetMilitary() {

		if (this.Type!=NATION.CITySTATE) {
			this.Army = new DominionArmy();
			this.Army.Set(this);
			this.Navy = new DominionNavy();
			this.Navy.Set(this);
			this.AirForce = new DominionAirForce();
			this.AirForce.Set(this);
			if (this.Type==NATION.POWER)
				this.SetFleet();
		}
		this.Missilery = new DominionMissilery();
		this.Missilery.Set(this);
	},
	SetInvestments() {  //NOTE: dummy function
	},
/*
	SetArmy() {  //NOTE: dummy function
	},
	SetNavy() {  //NOTE: dummy function
	},
	SetAirForce() {  //NOTE: dummy function
	},
	SetFleets() {  //NOTE: dummy function
	},
*/
	SetBudget(blgrnc) {  //REDUNDANT - UNLOG with impunity
		var i;
		var portion;

		//Distribute allocation evenly if Tomcat or an Allied State
		if (!blgrnc) {
	 for (i=0;i<MINISTRY.PORTFOLIOS;++i)
		 this.Budget[i] = BUDGET.PORTIONS/MINISTRY.PORTFOLIOS;
	 return;
		}

		portion = 1;
		iMinistries = new Array(MINISTRY.PORTFOLIOS);
		for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
	 this.Budget[BudgetDistribution[blgrnc][i]] = portion;
	 ++portion;
		}
	},
	Update() {
		//TODO: plan for this to be first call in game cycle
	}
};
