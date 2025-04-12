/*
 *		* TODO: 2 approaches for formation selection - bottom to top (RB to S) and top-bottom, the best outcome then picked
 */
//-----------------------------------------
//--------- FOOTBALL TEAM -----------------
var FootballTeam = function() {
	var Randomizer;

	var Manager;
	var Record, Points, Position;							//.Position is where team finishes in a simulated season
	var GoalsFor, GoalsAgainst, GoalDifference;
	var Squad, YouthTeam;
	var TransferList;
	var Starters, Substitutes;
	var SelectedIndices, SelectedYouth;
	var FormationStarters, Formation, SortedSquadList;
	var Injuries, InjuryList;
	var Budget, Revenue;			//.Budget are coffers . . . NOTE: .Revenue will vary week-to-week depending on opposition and status of cup game
	var Fixtures;			//TODO: can also contain results . . . not sure yet if this is REDUNDANT
};
FootballTeam.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;

		this.Squad = new FootballSquad();
		this.Squad.Set(this.Randomizer, this);
		this.YouthTeam = new FootballYouthTeam();
		this.YouthTeam.Set(this.Randomizer, this);
		this.TransferList = new Array();

		this.SetStats();
		this.SetLists();
	},
	SetStats() {

		this.Record = { W: 0, L: 0, T: 0 };
		this.Formation = FORMATION.NONE;
		this.Budget = 0;
		this.Injuries = 0;
		this.Points = 0;
		this.GoalsFor = 0;
		this.GoalsAgainst = 0;
	},
	SetLists() {
		var i;

		this.FormationStarters = ArrayUtils.Create2D(FORMATION.TYPES, MATCH.PLAYERS);
		this.Substitutes = new Array(MATCH.SUBS);
		this.SelectedIndices = new Array(SQUAD.SIZE);		//NOTE: actual squad size may be less, but that's OK
		this.SelectedYouth = new Array(YOUTH.PLAYERS);
		this.SortedSquadList = new Array(SQUAD.SIZE);
	},
	CalculatePoints() {

		this.Points = (3*this.Record.W) + this.Record.T;
		this.GoalDifference = this.GoalsFor - this.GoalsAgainst;
	},
	BuyPlayer(tIndx, pIndx) {  //t- team, p- player
		//NOTE: won't have a readily available pool of free agents as in NFL, but will have the option of 'calling up'
		//		players from the youth teams when in a fix
	},
	SellPlayer(indx) {
	},
	GenerateFormations() {
		var i;
		var nPlyrs;

		//Sort list from best player downwards, the best 10 to be selected first, others subbing in if they upgrade a position
		nPlyrs = 0;
		for (i=0;i<SQUAD.SIZE;++i)
			if (this.Squad.Players[i].Position!=POSITION.GK)
				if (!this.Squad.Players[i].CheckInjured()) {
					if (nPlyrs<this.SortedSquadList.length)
						this.SortedSquadList[nPlyrs] = this.Squad.Players[i];
					else
						this.SortedSquadList.push(this.Squad.Players[i]);
					++nPlyrs;
				}
		this.SortedSquadList.length = nPlyrs;
		this.SortedSquadList.sort(function(ftblr1, ftblr2) {return (ftblr1.Quality-ftblr2.Quality);});

		for (i=0;i<FORMATION.TYPES;++i)
			this.SelectStarters(i);
	},
	SetFormation(frmtn) {

		this.Formation = frmtn;
		this.Starters = this.FormationStarters[this.Formation];
	},
	SelectBestFormation() {
		var i, j;
		var qlty;
		var mQlty, iFrmtn;  //m- max

		mQlty = GRADE.Fplus * MATCH.PLAYERS;
		for (i=0;i<FORMATION.TYPES;++i) {
			qlty = 0;
			for (j=0;j<MATCH.PLAYERS;++j)
				qlty += this.FormationStarters[i][j].Quality;
			if (qlty<mQlty) {
				iFrmtn = i;
				mQlty = qlty;
			}
		}

		this.SetFormation(iFrmtn);
	},
	SelectStarters(frmtn) {
		var i;
		var nSlctd;
		var dffrntl;

		//Flush previous selections
		for (i=0;i<SQUAD.SIZE;++i)
			this.Squad.Players[i].Selected = false;
		for (i=0;i<this.FormationStarters[frmtn].length;++i)
			this.FormationStarters[frmtn][i] = null;

		//Pick keeper
		this.SelectKeeper(frmtn);
		nSlctd = 1;

		//Select exact matches for positions, then less exact, and so on
		dffrntl = 0;
		do {
			for (i=1;i<MATCH.PLAYERS;++i) {

				if (!this.FormationStarters[frmtn][i]) {
					this.FormationStarters[frmtn][i] = this.SelectBest(Formations[frmtn][i], dffrntl);
					if (this.FormationStarters[frmtn][i])
						++nSlctd;
				}
			}
			++dffrntl;
			if (dffrntl>12)		//this is the most it can be
				break;
		} while (nSlctd!=MATCH.PLAYERS);

		//Check if unselected players are improvements over selected ones, substitute if so
		for (i=1;i<MATCH.PLAYERS;++i)
			this.UpgradeSelection(frmtn, i);
	},
	SelectBest(pstn, dffrntl) {
		var i;
		var dstnc;

		for (i=0;i<10;++i)
			if (!this.SortedSquadList[i].Selected && this.SortedSquadList[i].Position!=POSITION.GK) {
				dstnc = this.SortedSquadList[i].GetDisplacement(pstn);
				if (dstnc<=dffrntl) {
					this.SortedSquadList[i].Selected = true;
					this.SortedSquadList[i].Rating = this.SortedSquadList[i].Quality + dstnc;
					return (this.SortedSquadList[i]);
				}
			}
	},
	UpgradeSelection(iFrmtn, iPlyr) {
		var i;
		var rtng;

		for (i=0;i<this.SortedSquadList.length;++i) {
//			if (!this.SortedSquadList[i])			//looks REDUNDANT
//				continue;
			if ( this.SortedSquadList[i].Selected || this.SortedSquadList[i].Position==POSITION.GK )
				continue;
			rtng = this.SortedSquadList[i].GetDisplacement(Formations[iFrmtn][iPlyr]) + this.SortedSquadList[i].Quality;
			if (rtng<this.FormationStarters[iFrmtn][iPlyr].Rating) {		//select player if they are an improvement, de-select previously selected player
				this.FormationStarters[iFrmtn][iPlyr].Selected = false;
				this.FormationStarters[iFrmtn][iPlyr] = this.SortedSquadList[i];
				this.SortedSquadList[i].Selected = true;
				this.SortedSquadList[i].Rating = rtng;
			}
		}
	},
	SelectKeeper(frmtn) {  //UNLOGGED - revise

		this.FormationStarters[frmtn][0] = this.Squad.Goalkeepers[0];
		this.Squad.Goalkeepers[0].Selected = true;
	},
	LoanPlayer() {  //incoming loan

		//UNLOGGED

	},
	TransferList() {

		//UNLOGGED

	}
};
