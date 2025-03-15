
//------------------------------------------------------
//---------- FOOTBALL TRANSFER POOL --------------------
var FootballTransferPool = function() {
	var Randomizer;

	var Players;
	var LeaguePlayers;
	var OverseasPlayers, DomesticPlayers, PeripheralPlayers, YouthPlayers, SemiProPlayers, ProdigyPlayers;
	var AllList, GList, DList, MList, AList;
	var AllFilter, DFilter, MFilter, AFilter, DesignationFilter;
	var PlayerIndex;
	var PlayerTypes, PlayerDesignations;
	var DummyPlayer;				//used to fill up lists for sorting
};
FootballTransferPool.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;

		this.PlayerIndex = 0;
		this.SetLists();
		this.SetFilters();
		this.PlayerTypes = new Array(FOOTBALLER.TYPE.COUNT);
		this.PlayerDesignations = new Array(FOOTBALLER.DESIGNATION.COUNT);
		this.DummyPlayer = { Quality: -1 };
	},
	SetLists() {

		this.Players = new Array(TRANSFERS.POOL.TOTAL);
		this.LeaguePlayers = new Array(TRANSFERS.POOL.LEAGUE);

		//Designation arrays
		this.OverseasPlayers = new GenieArray();
		this.DomesticPlayers = new GenieArray();
		this.PeripheralPlayers = new GenieArray();
		this.YouthPlayers = new GenieArray();
		this.SemiProPlayers = new GenieArray();
		this.ProdigyPlayers = new GenieArray();
		this.OverseasPlayers.Set(TRANSFERS.POOL.OVERSEAS, FootballPlayer);
		this.DomesticPlayers.Set(TRANSFERS.POOL.DOMESTIC, FootballPlayer);
		this.PeripheralPlayers.Set(TRANSFERS.POOL.PERIPHERAL, FootballPlayer);
		this.YouthPlayers.Set(TRANSFERS.POOL.YOUTH, FootballPlayer);
		this.SemiProPlayers.Set(TRANSFERS.POOL.SEMiPRO, FootballPlayer);
		this.ProdigyPlayers.Set(TRANSFERS.POOL.PRODIGY, FootballPlayer);

		//Position arrays
		this.AllList = new GenieList();
		this.GList = new GenieList();
		this.DList = new GenieList();
		this.MList = new GenieList();
		this.AList = new GenieList();
		this.AllList.Set(TRANSFERS.TARGETS.ALL);
		this.GList.Set(TRANSFERS.TARGETS.G);
		this.DList.Set(TRANSFERS.TARGETS.D);
		this.MList.Set(TRANSFERS.TARGETS.M);
		this.AList.Set(TRANSFERS.TARGETS.A);
	},
	FillLists() {
		var i;
		var player;

		for (i=0;i<TRANSFERS.POOL.FRINGE;++i) {
			player = new FootballPlayer();
			player.Set(this.Randomizer);
			this.Players[i] = player;
			switch(true) {
				case (i<100):
					this.OverseasPlayers[i] = player;
					break;
				case (i<200):
					this.DomesticPlayers[i-100] = player;
					break;
				case (i<300):
					this.PeripheralPlayers[i-200] = player;
					break;
				case (i<400):
					this.YouthPlayers[i-300] = player;
					break;
				case (i<500):
					this.SemiProPlayers[i-400] = player;
					break;
				case (i<600):
					this.ProdigyPlayers[i-500] = player;
					break;
			}
		}
	},
	SetFilters() {

		this.AllFilter = 0x1FFF;
		this.DFilter = 0xFF;
		this.MFilter = 0x3FF;
		this.AFilter = 0x3F;
		this.DesignationFilter = 0x1FF;
	},
	Generate() {

		this.GenerateOverseas();
		this.GenerateDomestics();
		this.GeneratePeripherals();
		this.GenerateYouths();
		this.GenerateSemiPros();
		this.GenerateProdigies();
		this.AddLeaguePlayers();
	},
	GenerateOverseas() {
		var i;

		for (i=0;i<TRANSFERS.POOL.OVERSEAS;++i) {
			this.OverseasPlayers[i].Set(this.Randomizer, i);
			if (this.Randomizer.CheckBoolean())
				this.OverseasPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.OverseasPlayers[i].Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);
			this.OverseasPlayers[i].Designation = FOOTBALLER.DESIGNATION.OVERSEAS;
			this.OverseasPlayers[i].SetIdentity();
			this.OverseasPlayers[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.YOUTH+1,FOOTBALLER.AGE.VETERAN);
			this.OverseasPlayers[i].GeneratePosition();
			this.OverseasPlayers[i].Quality = this.Randomizer.GetInRange(GRADE.Aplus,GRADE.Dminus);
			this.OverseasPlayers[i].Team = -1;
			this.Players[this.PlayerIndex] = this.OverseasPlayers[i];
			++this.PlayerIndex;
		}
	},
	GenerateDomestics() {
		var i;

		for (i=0;i<TRANSFERS.POOL.DOMESTIC;++i) {
			this.DomesticPlayers[i].Set(this.Randomizer, i);
			if (this.Randomizer.CheckBoolean())
				this.DomesticPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.DomesticPlayers[i].Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);
			this.DomesticPlayers[i].Designation = FOOTBALLER.DESIGNATION.DOMESTIC;
			this.DomesticPlayers[i].SetIdentity();
			this.DomesticPlayers[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.MIN,FOOTBALLER.AGE.EXPERIENCED);
			this.DomesticPlayers[i].GeneratePosition();
			if (this.DomesticPlayers[i].Age>FOOTBALLER.AGE.YOUTH)
				this.DomesticPlayers[i].Quality = this.Randomizer.GetInRange(GRADE.Dplus, GRADE.Fminus);
			else
				this.DomesticPlayers[i].GenerateYouthRating();
			this.DomesticPlayers[i].Team = this.Randomizer.GetInRange(LEAGUE.TEAMS, LEAGUES.TEAMS-1);
			this.Players[this.PlayerIndex] = this.DomesticPlayers[i];
			++this.PlayerIndex;
		}
	},
	GeneratePeripherals() {
		var i;

		for (i=0;i<TRANSFERS.POOL.PERIPHERAL;++i) {
			this.PeripheralPlayers[i].Set(this.Randomizer, i);
			if (this.Randomizer.CheckBoolean())
				this.PeripheralPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.PeripheralPlayers[i].Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);;
			this.PeripheralPlayers[i].Designation = FOOTBALLER.DESIGNATION.PERIPHERAL;
			this.PeripheralPlayers[i].SetIdentity();
			this.PeripheralPlayers[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.YOUTH+1,FOOTBALLER.AGE.EXPERIENCED);
			this.PeripheralPlayers[i].GeneratePosition();
			this.PeripheralPlayers[i].Quality = this.Randomizer.GetInRange(GRADE.Dplus,GRADE.Fminus);
			this.PeripheralPlayers[i].Team = -1;
			this.Players[this.PlayerIndex] = this.PeripheralPlayers[i];
			++this.PlayerIndex;
		}
	},
	GenerateYouths() {
		var i;

		for (i=0;i<TRANSFERS.POOL.YOUTH;++i) {
			this.YouthPlayers[i].Set(this.Randomizer, i);
			if (this.Randomizer.CheckBoolean())
				this.YouthPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.YouthPlayers[i].Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);;
			this.YouthPlayers[i].Designation = FOOTBALLER.DESIGNATION.YOUTH;
			this.YouthPlayers[i].SetIdentity();
			this.YouthPlayers[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.MIN,FOOTBALLER.AGE.YOUTH);
			this.YouthPlayers[i].GeneratePosition();
			this.YouthPlayers[i].Quality = GRADE.Jminus;
			this.YouthPlayers[i].Team = this.Randomizer.GetInRange(LEAGUE.TEAMS, LEAGUES.TEAMS-1);
			this.Players[this.PlayerIndex] = this.YouthPlayers[i];
			++this.PlayerIndex;
		}
	},
	GenerateSemiPros() {
		var i;

		for (i=0;i<TRANSFERS.POOL.SEMiPRO;++i) {
			this.SemiProPlayers[i].Set(this.Randomizer, i);
			if (this.Randomizer.CheckBoolean())
				this.SemiProPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			else
				this.SemiProPlayers[i].Type = this.Randomizer.GetInRange(1,FOOTBALLER.TYPE.COUNT-1);;
			this.SemiProPlayers[i].Designation = FOOTBALLER.DESIGNATION.SEMiPRO;
			this.SemiProPlayers[i].SetIdentity();
			this.SemiProPlayers[i].Age = this.Randomizer.GetInRange(FOOTBALLER.AGE.YOUTH+1,FOOTBALLER.AGE.EXPERIENCED);
			this.SemiProPlayers[i].GeneratePosition();
			this.SemiProPlayers[i].Quality = this.Randomizer.GetInRange(GRADE.Hplus,GRADE.Jminus);
			this.SemiProPlayers[i].Team = -1;
			this.Players[this.PlayerIndex] = this.SemiProPlayers[i];
			++this.PlayerIndex;
		}
	},
	GenerateProdigies() {

		for (i=0;i<TRANSFERS.POOL.PRODIGY;++i) {
			this.ProdigyPlayers[i].Set(this.Randomizer, i);
			this.ProdigyPlayers[i].Type = FOOTBALLER.TYPE.NORMAL;
			this.ProdigyPlayers[i].Designation = FOOTBALLER.DESIGNATION.PRODIGY;
			this.ProdigyPlayers[i].SetIdentity();
			this.ProdigyPlayers[i].Age = 17;
			this.ProdigyPlayers[i].GeneratePosition();
			this.ProdigyPlayers[i].Quality = GRADE.Jminus;
			this.ProdigyPlayers[i].Team = -1;
			this.Players[this.PlayerIndex] = this.ProdigyPlayers[i];
			++this.PlayerIndex;
		}
	},
	AddLeaguePlayers() {
		var i, j;
		var iPlayer;

		Teams.forEach(function(team) {team.Squad.QualitySort();});

		iPlayer = 0;
		for (i=0;i<LEAGUE.TEAMS;++i) {
			for (j=MATCH.PLAYERS;j<Teams[i].Squad.Players.length;++j) {
				this.Players[this.PlayerIndex] = Teams[i].Squad.Players[j];
				this.LeaguePlayers[iPlayer] = Teams[i].Squad.Players[j];
				++this.PlayerIndex;
				++iPlayer;
			}
		}

		this.LeaguePlayers.forEach(function(plyr) {plyr.SetPrice();});
		this.LeaguePlayers.sort(function(plyr1,plyr2) {return (plyr2.Price-plyr1.Price);});
		this.Players.Length = this.PlayerIndex;
	},
	Update() {

		//UNLOGGED - list will keep changing as players become available because of them getting injured, or because they are needed as cover for injuries,
		//		or if transfer moves in their teams reverse their dispensable status

		//-pagination clicks
		//-touchbar clicks
	},
	UpdateAllList() {
		var i;

		//UNLOGGED

		//Add players matching criteria
		this.PlayerIndex = 0;
		for (i=0;i<this.Players.Length;++i) {
	 if (!BitUtils.CheckBit(this.AllFilter, this.Players[i].Position))
		 continue;
	 if (!BitUtils.CheckBit(this.DesignationFilter, this.Players[i].Designation))
		 continue;
	 this.AllList[this.PlayerIndex] = this.Players[i];
	 ++this.PlayerIndex;
		}

		//Pad out the rest of the list
		for (i=this.Players.Length;i<TRANSFERS.POOL.ALL;++i)
	 this.AllList[i] = this.DummyPlayer;

		this.AllList.sort(function(a, b) {return (a.Quality-b.Quality);});
	},
	UpdateDList() {

		//UNLOGGED

		this.UpdateList(this.DList, this.DFilter, TRANSFERS.TARGETS.D);
	},
	UpdateList(aTrgts, aPlyrs, fltr, limit) {
		var i;

		//UNLOGGED

		//Add players matching criteria
		this.PlayerIndex = 0;
		for (i=0;i<aPlyrs.Length;++i) {
	 //-check fee
	 if (!BitUtils.CheckBit(fltr, aPlyrs[i].Position))
		 continue;
	 if (!BitUtils.CheckBit(this.DesignationFilter, aPlyrs[i].Designation))
		 continue;
	 aTrgts[this.PlayerIndex] = aPlyrs[i];
	 ++this.PlayerIndex;
		}

		//Pad out the rest of the list
		for (i=aPlyrs.Length;i<limit;++i)
	 aTrgts[i] = this.DummyPlayer;

		aTrgts.sort(function(a, b) {return (a.Quality-b.Quality);});
	},
	UpdateLists() {

		//UNLOGGED

		this.UpdateAllList();
		this.UpdateGList();
		this.UpdateDList();
		this.UpdateMList();
		this.UpdateAList();
	},
	AddPlayer(player) {

		//UNLOGGED

		this.Players.push(player);
		//-add to the other 2 arrays depending on team (tentative idea is to have 72 league clubs plus some non-league teams, and however many foreign teams, so
		// maybe the former can be numbered 100+, the latter 200+)
	},
	Sort() {	//NOTE: by quality

		this.Players.sort(function(a, b) {return (a.Quality-b.Quality);});
	},
	SortByDesignation() {

		//UNLOGGED

		this.Players.sort(function(a, b) {return (a.Designation-b.Designation);});
	}
};
