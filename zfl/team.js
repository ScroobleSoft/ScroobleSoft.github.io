
//-------------------------------------------
//--------- GRIDIRON TEAM -------------------
var GridironTeam = function() {
	var Randomizer;

	var OffFormation, DefFormation;			//REDUNDANT
	var OffSystem, DefSystem;
	var DraftPosition, DraftProfile;
	var Roster;
	var PracticeSquad;
	var Injuries;					//cumulative injuries already accrued

	var StarterNeeds, DepthNeeds, QualityNeeds;
	var OffStarters, DefStarters;
	var Picks;						//TODO: REDUNDANT? useful only for displaying team info
	var TradeTargets;
	var Transactions;

	var PreviousRecord, Record;
	var Stats;
	var CapSpace;
};
GridironTeam.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.SetGridders();
		this.SetLists();
		this.SetFields();
	},
	SetGridders() {

		this.Roster = new GridironRoster();
		this.Roster.Set(this.Randomizer, this);
		this.PracticeSquad = new GridironPracticeSquad();
		this.PracticeSquad.Set(this.Randomizer, this);
	},
	SetLists() {

		this.OffStarters = new Array(OFFENSE.PLAYERS);
		this.DefStarters = new Array(DEFENSE.PLAYERS);
		this.Transactions = new Array();

		//Needs
		this.StarterNeeds = new GenieArray();
		this.StarterNeeds.Set(10, function() {var Position, Need;});
		this.DepthNeeds = new GenieArray();
		this.DepthNeeds.Set(10, function() {var Position, Need;});

		//Picks
		this.Picks = new Array();										//TODO: to be used later for future picks
		for (indx=0;indx<DRAFT.ROUNDS;++indx)
			this.Picks.push( { Pick: -1, Selection: "" } );

		this.TradeTargets = new GenieList();
		this.TradeTargets.Set(VIEW.ROSTER.TRADE.PAGINATION.TARGETS.ITEM.MAX);
	},
	SetFields() {

		this.CapSpace = 0;
		this.Injuries = 0;
		this.PreviousRecord = { W: 0, L: 0, T: 0 };
		this.Record = { W: 0, L: 0, T: 0, Scored: 0, Conceded: 0 };
		this.DraftPosition = -1;
//		this.Stats = stats;
	},
	Generate() {

		this.OffSystem = this.Randomizer.GetIndex(1, SYSTEM.OFF.COUNT);
		this.DefSystem = this.Randomizer.GetIndex(1, SYSTEM.DEF.COUNT);
		this.Roster.Generate();
	},
	GenerateDraftProfile() {

		//UNLOGGED

		this.DraftProfile = this.Randomizer.GetNumberWithinRange(0, 100);
	},
	SetFormations(oForm, dForm) {  //REDUNDANT

		this.OffFormation = oForm;
		this.DefFormation = dForm;
	},
	SetSystems(oSstm, dSstm) {

		//UNLOGGED - will replace previous method

		this.OffSystem = oSstm;
		this.DefSystem = dSstm;
	},
	SetPlayerValues() {
		var i, j;

		//Roster
		for (i=0;i<POSITION.COUNT;++i)
			for (j=0;j<this.Roster.Gridders[i].length;++j)
				this.Roster.Gridders[i][j].SetValue();

		//Practice squad
		for (i=0;i<this.PracticeSquad.Gridders.length;++i)
			this.PracticeSquad.Gridders[i].SetValue();
	},
	ResetGridders() {
		var i;
		var team;

		team = this;
		for (i=0;i<this.Roster.Gridders.length;++i)
			this.Roster.Gridders[i].forEach(function(grddr) {grddr.SetTeam(team);});
		this.PracticeSquad.Gridders.forEach(function(grddr) {grddr.SetTeam(team);});
	},
	EvaluateNeeds() {
		var i;

		//Evaluate starters
		for (i=0;i<POSITION.COUNT/2;++i) {
			this.StarterNeeds[i].Position = i;
			this.StarterNeeds[i].Need = OffFormationStarters[this.OffSystem][i] - this.Roster.Gridders[i].length;
			this.StarterNeeds[i+5].Position = i + 5;
			this.StarterNeeds[i+5].Need = DefFormationStarters[this.DefSystem][i] - this.Roster.Gridders[i+5].length;
		}
		this.StarterNeeds.sort(function(a, b) {return (b.Need-a.Need);});

		//Evaluate depth
		for (i=0;i<POSITION.COUNT/2;++i) {
			this.DepthNeeds[i].Position = i;
			this.DepthNeeds[i].Need = OffSystemDepth[this.OffSystem][i] - this.Roster.Gridders[i].length;
			this.DepthNeeds[i+5].Position = i + 5;
			this.DepthNeeds[i+5].Need = DefSystemDepth[this.DefSystem][i] - this.Roster.Gridders[i+5].length;
		}
		this.DepthNeeds.sort(function(a, b) {return (b.Need-a.Need);});

		//TODO: evaluate quality-based needs . . . also, move the 3 sections to their own methods
	},
	CycleNeeds() {  //rotate highest to last, bump all others up

		//UNLOGGED - this is only taking care of starters, whereas all three needs have to be managed

		num = this.StarterNeeds.shift();	//remove current highest need
		this.StarterNeeds.push(num);		//tack it on at the end of the list
	},
	StartNewSeason() {

		//Update gridders
		this.Roster.StartNewSeason();
		this.PracticeSquad.StartNewSeason();

		//Reset record
		this.PreviousRecord.W = this.Record.W;
		this.PreviousRecord.L = this.Record.L;
		this.PreviousRecord.T = this.Record.T;
		this.Record.W = 0;
		this.Record.L = 0;
		this.Record.T = 0;

		//Reset stats
		this.Injuries = 0;
	},
	SelectStarters() {  //NOTE: if free agents are signed, teams do it in batches, not serially (which would be preferrable)
		var i, j, k;
		var oStarters, dStarters;
		var fGame;			//f- flag

		//LOGGED - no practice squadders selected, which can be revised

		fGame = Math.pow(2, League.GamesPlayed);
		oStarters = 0;
		dStarters = 0;
		for (i=0;i<POSITION.COUNT/2;++i) {

			//OFF
			for (j=0;j<OffFormationStarters[this.OffSystem][i];++j) {		//offense
				for (k=0;k<this.Roster.Gridders[i].length;++k)
		//			 if ((this.Roster.Gridders[i][k].Injury & fGame)==0 && this.Roster.Gridders[i][k].History==0) {
					if ((this.Roster.Gridders[i][k].Injury & fGame)==0) {
						this.OffStarters[oStarters] = this.Roster.Gridders[i][k];
						this.Roster.Gridders[i][k].History = -1;
						break;
					}
				if (k==this.Roster.Gridders[i].length)
					this.OffStarters[oStarters] = this.SignTempFreeAgent(i);
				++oStarters;
			 }

			//DEF
			for (j=0;j<DefFormationStarters[this.DefSystem][i];++j) {		//defense
				for (k=0;k<this.Roster.Gridders[i+5].length;++k)
		//			 if ((this.Roster.Gridders[i+5][k].Injury & fGame)==0 && this.Roster.Gridders[i+5][k].History==0) {
					if ((this.Roster.Gridders[i+5][k].Injury & fGame)==0) {
						this.DefStarters[dStarters] = this.Roster.Gridders[i+5][k];
						this.Roster.Gridders[i+5][k].History = -1;
						break;
					}
				if (k==this.Roster.Gridders[i+5].length)
					this.DefStarters[dStarters] = this.SignTempFreeAgent(i+5);
				++dStarters;
			}
		}

		//Clear all temporary flags
		for (i=0;i<this.Roster.Gridders.length;++i)
			for (j=0;j<this.Roster.Gridders[i].length;++j)
				this.Roster.Gridders[i][j].History = 0;
	},
	GenerateTradeTargets(grddr, pos) {
		var i, j;
		var aGrddrs;

		this.TradeTargets.Length = 0;

		for (i=0;i<LEAGUE.TEAMS;++i) {
			if (i==this.Index)
				continue;
			aGrddrs = Teams[i].GetAvailableTargets(grddr, pos);
			for (j=0;j<aGrddrs.length;++j){
				aGrddrs[j].SetValue();					//NOTE: ASSUMPTION is that value has not been set elsewhere
				this.TradeTargets.Add(aGrddrs[j]);
			}
		}
		this.TradeTargets.sort(function(a, b) {return (a.Quality-b.Quality);});
		if (this.TradeTargets.Length>VIEW.ROSTER.TRADE.PAGINATION.TARGETS.ITEM.MAX)		//pare list to max if necessary
			this.TradeTargets.Length = VIEW.ROSTER.TRADE.PAGINATION.TARGETS.ITEM.MAX;

		return (this.TradeTargets);
	},
	GetAvailableTargets(grddr, pos) {  //NOTE: only teams with depth chart slots to fill at that position respond right now
		var i;
		var aGrddrs;

		aGrddrs = new Array();

		//First check if there is a need for a player at that position (on depth chart)
		for (i=0;i<POSITION.COUNT;++i)
			if (this.DepthNeeds[i].Position==pos)
				if (this.DepthNeeds[i].Needs<=0)
					return (aGrddrs);			//indicates there are no targets to offer

		//Get targets . . . NOTE: a simple check is being done - same or more experienced and same or lesser rated players (no value matching for now)
		for (i=0;i<this.Roster.Gridders[pos].length;++i)
			if (!this.Roster.Gridders[pos][i].CheckInjured()) {
				if (grddr.Type!=GRIDDER.TYPE.SPECIAL)
					if (this.Roster.Gridders[pos][i].Type==GRIDDER.TYPE.SPECIAL)
						continue;
				if (grddr.Type!=GRIDDER.TYPE.VERSATILE)
					if (this.Roster.Gridders[pos][i].CheckImprover() && this.Roster.Gridders[pos][i].Type==GRIDDER.TYPE.VERSATILE)
						continue;
				if (grddr.Experience<GRIDDER.YEARS.IMPROVER) {  //Improvers
					if (grddr.Experience<=this.Roster.Gridders[pos][i].Experience)
						if (grddr.Quality<=this.Roster.Gridders[pos][i].Quality)
							if (grddr.Potential>=this.Roster.Gridders[pos][i].Potential)
								aGrddrs.push(this.Roster.Gridders[pos][i]);
				} else if (grddr.Experience<GRIDDER.YEARS.DECLINER) {  //Veterans
					if (grddr.Experience<=this.Roster.Gridders[pos][i].Experience)
						if (grddr.Quality<=this.Roster.Gridders[pos][i].Quality)
							aGrddrs.push(this.Roster.Gridders[pos][i]);
				} else {  //Decliners
					if (grddr.Experience<=this.Roster.Gridders[pos][i].Experience)
						if (grddr.Quality<=this.Roster.Gridders[pos][i].Quality)
							if (grddr.Potential<=this.Roster.Gridders[pos][i].Potential)
								aGrddrs.push(this.Roster.Gridders[pos][i]);
				}
			}

		return (aGrddrs);		//NOTE: every chance this could be empty
	},
	SignTempFreeAgent(pos) {
		var i;
		var aFAs;

		aFAs = new Array();
		for (i=0;i<FreeAgency.Gridders.length;++i)
	 if (FreeAgency.Gridders[i].Position==pos)
		 aFAs.push(FreeAgency.Gridders[i]);

		if (aFAs.length) {
	 num = this.Randomizer.GetInRange(0,aFAs.length-1);
	 return ( { Name: { First: aFAs[num].Name.First, Last: aFAs[num].Name.Last+"*" }, Position: pos, Quality: aFAs[num].Quality } );
		} else {
	 num = this.Randomizer.GetInRange(15,29);
	 return ( { Name: { First: "Street", Last: "Free Agent" }, Position: pos, Quality: num } );
		}
	},
	GetWaivables() {  //return all players between E+ and E- with 4 years experience
		var i, j;
		var aPlyrs;

		aPlyrs = new GenieArray();
		for (i=0;i<POSITION.COUNT;++i)
	 for (j=0;j<this.Roster.Gridders[i].length;++j)
		 if (this.Roster.Gridders[i][j].Quality>=12 && this.Roster.Gridders[i][j].Quality<=14 && this.Roster.Gridders[i][j].Experience==4)
			 aPlyrs.push(this.Roster.Gridders[i][j]);
		return (aPlyrs);
	},
	GetAlternate() {	//NOTE: this is used in Waiver process to get compensatory rookie
		var i, j;
		var aAlts;
		var iAlt;

		//LOGGED - UNTESTED

		//Create array of Alternates
		aAlts = new Array();
		for (i=0;i<POSITION.COUNT;++i)
	 for (j=0;j<this.Roster.Gridders[i].length;++j)
		 if (this.Roster.Gridders[i][j].Status>GRIDDER.PROJECT && this.Roster.Gridders[i][j].Experience==0)
			 aAlts.push(this.Roster.Gridders[i][j]);

		//Remove and return a random Alternate
		if (aAlts.length) {
	 iAlt = this.Randomizer.GetNumberWithinRange(0, aAlts.length-1);
	 return (this.Roster.RemoveGridder(aAlts[iAlt]));
		} else
	 return (null);
	},
	UpdatePostMatch() {

		//UNLOGGED - probably will need to do more things here, like injury based promotions and demotions

		this.UpdateInjuries();
		this.UpdateAlternates();
	},
	UpdateInjuries() {
		var i, j;
		var fGame;

		fGame = Math.pow(2, League.GamesPlayed);
		for (i=0;i<POSITION.COUNT;++i)
	 for (j=0;j<this.Roster.Gridders[i].length;++j)
		 if (this.Roster.Gridders[i][j].Injury & fGame)
			 ++this.Injuries;
	},
	UpdateAlternates() {  //NOTE: this is currently relevant for Projects only
		var bPopped;

		for (indx=0;indx<this.PracticeSquad.Gridders.length;++indx) {
	 bPopped = false;
	 if (this.PracticeSquad.Gridders[indx].Status==GRIDDER.PROJECT) {
		 if (this.PracticeSquad.Gridders[indx].Experience==0) {
			 if (this.Randomizer.GetInRange(1,96)==1)
		  bPopped = true;
		 } else {
			 if (this.Randomizer.GetInRange(1,64)==1)
		  bPopped = true;
		 }
	 }
	 if (bPopped)
		 if (this.PracticeSquad.Gridders[indx].Status!=GRIDDER.NORMAL) {
			 this.PracticeSquad.Gridders[indx].Status = GRIDDER.NORMAL;
			 info = Positions[this.PracticeSquad.Gridders[indx].Position] + " " + this.PracticeSquad.Gridders[indx].Name.GetFullName() + " now roster eligible";
			 this.Transactions.push(info);
			 if (this.Index==PlayerTeam.Index)
		  alert(info);
		 }
		}
	}
};
