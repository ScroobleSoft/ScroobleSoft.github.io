
//-----------------------------------------------
//---------- DOMINION NATION --------------------
var DominionNation = function() {
	var Randomizer;

	var Type;
	var Location, Continent;								//.Location- world screen map coordinates
	var Population;
	var GDP, Revenue;
	var SurplusPercentages, SurplusAllocations;		//.SurplusPercentages REDUNDANT?
	var Treasury, Reserves, Cash, Investments;		//coffers - .Reserves, .Cash and .Investments are for MOBILE game for now
	var Popularity, Government, Opposition;
	var HeadOfState, Advisor;
	var Cabinet;
	var Army, AirForce, Navy, Missilery, Fleets;
	var MicroUnits, MidUnits, MegaUnits;				//for MOBILE game

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

		//UNLOGGED

		this.SurplusPercentages = new Array(MINISTRY.PORTFOLIOS);
		this.SurplusPercentages.fill(0);
		this.SurplusAllocations = new Array(MINISTRY.PORTFOLIOS);
		this.SurplusAllocations.fill(0);
		this.Reserves = new Array(COMMODITY.TYPES);
		this.Investments = new Array(CITySTATE.COUNT);
		this.Investments.fill(0);
	},
	Generate() {

		//UNLOGGED

		this.SetPopulation();
		this.SetGovernment();
		this.SetPersonnel();
		this.SetCabinet();
		this.SetEconomy();
		this.SetMilitary();

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

		//UNLOGGED

		this.HeadOfState = DominionUtils.GenerateName();
		if (this.Randomizer.FlipCoin())
			this.HeadOfState += "a";
		this.HeadOfState += " " + DominionUtils.GenerateName();
		
		//-advisor
	},
	SetCabinet() {
		var nation;

		this.Cabinet = new Array(MINISTRY.PORTFOLIOS);
		this.Cabinet[MINISTRY.AGRICULTURE] = new AgricultureMinistry();
		this.Cabinet[MINISTRY.DEFENCE]	  = new DefenceMinistry();
		this.Cabinet[MINISTRY.ENERGY]		  = new EnergyMinistry();
		this.Cabinet[MINISTRY.FINANCE]	  = new FinanceMinistry();
		this.Cabinet[MINISTRY.FOREIGN]	  = new ForeignMinistry();
		this.Cabinet[MINISTRY.HEALTH]		  = new HealthMinistry();
		this.Cabinet[MINISTRY.INDUSTRY]	  = new IndustryMinistry();
		this.Cabinet[MINISTRY.INFORMATION] = new InformationMinistry();

		nation = this;
		this.Cabinet.forEach(function(mnstry){mnstry.Set(nation);});
	},
	SetEconomy() {
		var i;

		//UNLOGGED

		this.GDP = this.Population * GDP.PErCAPITA;
		this.Revenue = 0.4 * this.GDP;													//TODO: tax rate could be adjustable
		this.Treasury = Math.floor(4*(this.Revenue/25));							//4 fortnights
	},
	SetMilitary() {

		this.Army = new DominionArmy();
		this.Army.Set();
		this.Navy = new DominionNavy();
		this.Navy.Set();
		this.AirForce = new DominionAirForce();
		this.AirForce.Set();
		this.Missilery = new DominionMissilery();
		this.Missilery.Set();

		this.SetArmy();
		this.SetNavy();
		this.SetAirForce();
		this.SetMissilery();
	},
	SetNavy() {

		this.Navy.EscortCarriers = 0;
		this.Navy.FleetCarriers = 0;
		this.Navy.SuperCarriers = 0;
	},
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
