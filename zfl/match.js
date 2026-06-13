
//----------------------------------------------
//---------- GRIDIRON MATCH --------------------
var GridironMatch = function() {
	var HomeTeam, VisitorTeam;
	var Down, Yards, FirstDownYards, LineOfScrimmage;
	var HomeYards, VisitorYards;									//TODO: will eventually be split into run/pass
	var HomePlays, VisitorPlays;
	var HomeTime, VisitorTime;										//time of possession
	var Time, Quarter;
};
GridironMatch.prototype = {
	Set() {
		this.Reset();
	},
	Reset() {

		this.Time = 0;
		this.Quarter = 1;
		this.Down = 1;
		this.LineOfScrimmage = 20;
		this.HomeYards = 0;
		this.VisitorYards = 0;
		this.HomePlays = 0;
		this.VisitorPlays = 0;
	},
	SetTeams(hTeam, vTeam) {

		this.HomeTeam = hTeam;
		this.VisitorTeam = vTeam;
	},
	RunMatch() {  //UNLOGGED
	}
};
