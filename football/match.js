
//--------------------------------------------
//---------- FOOTBALL MATCH ------------------
var FootballMatch = function() {
	var Randomizer;
	var HomeTeam, AwayTeam;
	var AttackingTeam, DefensiveTeam;
	var Minutes;
	var HomePossession, HomeShots, HomeGoals, HomeRating;
	var AwayPossession, AwayShots, AwayGoals, AwayRating;
	var HomePlayerWins, AwayPlayerWins;
};
FootballMatch.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.SetLists();
//		this.ResetMatchUps();
		this.SetData();
		this.SetComponents();
	},
	Reset() {

		this.SetData();
		this.HomePlayerWins.fill(0);
		this.AwayPlayerWins.fill(0);
	},
	SetData() {

		this.Minutes = 0;
		this.HomePossession = 0;
		this.HomeShots = 0;
		this.HomeGoals = 0;
		this.HomeRating = 0;
		this.AwayPossession = 0;
		this.AwayShots = 0;
		this.AwayGoals = 0;
		this.AwayRating = 0;
	},
	SetComponents() {  //UNLOGGED
/*
		this.HomeTeam = new MatchTeam();
		this.HomeTeam.Set();
		this.AwayTeam = new MatchTeam();
		this.AwayTeam.Set();
*/
	},
	SetLists() {
/*
		this.HomePlayers = new Array(MATCH.PLAYERS);
		this.AwayPlayers = new Array(MATCH.PLAYERS);
		this.HomeSubs = new Array(MATCH.SUBS);
		this.AwaySubs = new Array(MATCH.SUBS);
		this.HomeLocations = ArrayUtils.Create(MATCH.PLAYERS, Coordinate2D);
		this.AwayLocations = ArrayUtils.Create(MATCH.PLAYERS, Coordinate2D);
		this.HomeMatchUps = ArrayUtils.Create2D(PLAYERS.OUTFIELD, PLAYERS.OUTFIELD);
		this.AwayMatchUps = ArrayUtils.Create2D(PLAYERS.OUTFIELD, PLAYERS.OUTFIELD);
*/
		this.HomePlayerWins = new Array(MATCH.PLAYERS);
		this.HomePlayerWins.fill(0);
		this.AwayPlayerWins = new Array(MATCH.PLAYERS);
		this.AwayPlayerWins.fill(0);
	},
	SetTeams(hTeam, aTeam) {

//		this.HomeTeam.Club = hTeam;
//		this.AwayTeam.Club = aTeam;
		this.HomeTeam = hTeam;
		this.AwayTeam = aTeam;
		this.SetRatings();
//		this.SetFormations(this.HomeTeam.Formation, this.AwayTeam.Formation);

		//-there needs to be some evaluation of starters vis a vis formations selected to determine quality of G-D-M-A units
		//-90 minutes are simulated by playing each minute, there being 1 'play' per minute (or possession), starting with home side and alternating
	},
	SetRatings() {
		var i;

		for (i=0;i<MATCH.PLAYERS;++i) {
			this.HomeTeam.Starters[i].DetermineMatchRating(Formations[this.HomeTeam.Formation][i]);
			this.HomeRating += this.HomeTeam.Starters[i].Rating;
			this.AwayTeam.Starters[i].DetermineMatchRating(Formations[this.AwayTeam.Formation][i]);
			this.AwayRating += this.AwayTeam.Starters[i].Rating + 1;
		}
	},
	SetFormations(hFrmtn, aFrmtn) {  //REDUNDANT
		var i;

		//UNLOGGED

		this.HomeTeam.Formation = hFrmtn;
		this.AwayTeam.Formation = aFrmtn;

		for (i=0;i<MATCH.PLAYERS;++i) {
			this.HomeTeam.Players[i].Unit = this.HomeTeam.Club.FormationStarters[this.HomeTeam.Formation][i];
			this.AwayTeam.Players[i].Unit = this.AwayTeam.Club.FormationStarters[this.AwayTeam.Formation][i];
		}
	},
	ResetMatchUps() {  //TODO: currently REDUNDANT
		var i;

		for (i=0;i<this.MatchUps.length;++i)
	 this.MatchUps[i].fill(-1);
	},
	GenerateMatchUps() {  //maybe REDUNDANT
		var i, j;
		var nMatchups;

		//Home . . . * home players on left, away on right
		for (i=1;i<MATCH.PLAYERS;++i) {
	 nMatchups = 0;
	 for (j=1;j<MATCH.PLAYERS;++j)
		 if (this.HomeLocations[i].X<this.AwayLocations[j].X && (this.HomeLocations[i].Y-this.AwayLocations[j].Y)<2) {
			 this.HomeMatchUps[i][nMatchups] = this.AwayPlayers[j];
			 ++nMatchUps;
		 }
		}

		//Away
		for (i=1;i<MATCH.PLAYERS;++i) {
	 nMatchups = 0;
	 for (j=1;j<MATCH.PLAYERS;++j)
		 if (this.AwayLocations[i].X>this.HomeLocations[j].X && (this.AwayLocations[i].Y-this.HomeLocations[j].Y)<2) {
			 this.AwayMatchUps[i][nMatchups] = this.HomePlayers[j];
			 ++nMatchUps;
		 }
		}
	},
	Play() {  //NOTE: a minute is played

		//-ball is usually punted to midfield
		//-see who wins it, add to possession stats
		//++this.Scoreboard.UpdatePossession('true' or 'false');
	},
	DisplayHighlight() {
	}
};
