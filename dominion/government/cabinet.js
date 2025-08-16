
//------------------------------------------------
//---------- DOMINION CABINET --------------------
var DominionCabinet = function() {
	var Nation;
	var Agriculture;
	var Culture;		//sports, education, health, entertainment
	var Defence;
	var Energy;
	var Foreign;
	var Health;
	var Industry;
	var Ministries;
	var Information;	//espionage, internal and external
	var SurplusPercentages;
};
DominionCabinet.prototype = {
	Set(nation) {
		this.Nation = nation;
		this.CreateMinistries();
		this.SetMinistries();
		this.Ministries = [ this.Agriculture, this.Culture, this.Defence, this.Energy, this.Foreign, this.Health, this.Industry, this.Information ];
		this.SurplusPercentages = new Array(MINISTRY.PORTFOLIOS);
	},
	CreateMinistries() {

		this.Agriculture = new AgricultureMinistry();
		this.Culture = new CultureMinistry();
		this.Defence = new DefenceMinistry();
		this.Energy = new EnergyMinistry();
		this.Foreign = new ForeignMinistry();
		this.Health = new HealthMinistry();
		this.Industry = new IndustryMinistry();
		this.Information = new InformationMinistry();
	},
	SetMinistries() {

		this.Agriculture.Set(this);
		this.Culture.Set(this);
		this.Defence.Set(this);
		this.Energy.Set(this);
		this.Foreign.Set(this);
		this.Health.Set(this);
		this.Industry.Set(this);
		this.Information.Set(this);
	},
	SetSurplusPercentages() {
		var i;

		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (this.Nation.Index==POWER.TOMCAT)
				this.SurplusPercentages[i] = 100 / MINISTRY.PORTFOLIOS;
			else {
				if (i==PowerProfiles[this.Nation.Index][1])
					this.SurplusPercentages[i] = 50;
				else
					this.SurplusPercentages[i] = 50 / (MINISTRY.PORTFOLIOS-1);
			}
	},
	SetInventory() {
		var i;

		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			this.Ministries[i].Inventory = Math.round(this.Treasury*this.SurplusPercentages[i]/100);
		this.Nation.Treasury = 0;
	},
	UpdateInventory() {
		var i;
		var rvnue;

		rvnue = this.Population * GDP.PErCAPITA;		//annual GDP
		rvnue *= 0.4;											//tax revenue
		rvnue /= 25;											//per fortnight

		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			this.Ministries[i].Inventory += Math.round(rvnue*this.SurplusPercentages[i]/100);
	},
	IncreaseMinistryBudget(iMinistry) {  //UNLOGGED - currently REDUNDANT
		var i;
		var margin;
		var negatives, nNgtvs;

		//Error check
		if (this.SurplusPercentages[iMinistry]==100)
			return;

		//Increment the chosen ministry's allocation
		if (this.SurplusPercentages[iMinistry]>99)
			margin = 100 - this.SurplusPercentages[iMinistry];
		else
			margin = 1;
		this.SurplusPercentages[iMinistry] += margin;

		//Lessen the amounts in the other ministries proportionally
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (i==iMinistry)
				continue;
			else
				this.SurplusPercentages[i] -= margin / (MINISTRY.PORTFOLIOS-1);

		//Check if any of the allocations have gone negative
		nNgtvs = 0;
		negatives = 0;
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (i==iMinistry)
				continue;
			else
				if (this.SurplusPercentages[i]<0) {
					negatives += 0 - this.SurplusPercentages[i];
					this.SurplusPercentages[i] = 0;
					++nNgtvs;
				}

		//Add any unused amounts to other ministries
		if (negatives!=0)
			for (i=0;i<MINISTRY.PORTFOLIOS;++i)
				if (i==iMinistry)
					continue;
				else
					if (this.SurplusPercentages[i]!=0)
						this.SurplusPercentages[i] += negatives / nNgtvs;
	},
	DecreaseMinistryBudget(iMinistry) {  //UNLOGGED - currently REDUNDANT
		var i;
		var margin;

		//Error check
		if (this.SurplusPercentages[iMinistry]==0)
			return;

		//Decrement the chosen ministry's allocation
		if (this.SurplusPercentages[iMinistry]<1)
			margin = this.SurplusPercentages[iMinistry];
		else
			margin = 1;
		this.SurplusPercentages[iMinistry] -= margin;

		//Increase the amounts in the other ministries proportionally
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (i==iMinistry)
				continue;
			else
				this.SurplusPercentages[i] += margin / (MINISTRY.PORTFOLIOS-1);

		//Check if any of the allocations have gone negative
		nNgtvs = 0;
		negatives = 0;
		for (i=0;i<MINISTRY.PORTFOLIOS;++i)
			if (i==iMinistry)
				continue;
			else
				if (this.SurplusPercentages[i]<0) {
					negatives += 0 - this.SurplusPercentages[i];
					this.SurplusPercentages[i] = 0;
					++nNgtvs;
				}

		//Add any unused amounts to other ministries
		if (negatives!=0)
			for (i=0;i<MINISTRY.PORTFOLIOS;++i)
				if (i==iMinistry)
					continue;
				else
					if (this.SurplusPercentages[i]!=0)
						this.SurplusPercentages[i] += negatives / nNgtvs;
	}
};
