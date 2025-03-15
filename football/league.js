
//-----------------------------------------------
//---------- FOOTBALL LEAGUE --------------------
var FootballLeague = function() {
	var Randomizer;
	var Season;
	var Week;
	var FixtureList, HomeAwayArray;		//used for constructing .Fixtures; 'true' entry in .HomeAwayArray means Home game
	var Fixtures;								//only contains fixtures for a given week (in a 1-dimensional array)
	var League;									//array used in loading
	var SquadPlayers, YouthPlayers;		//counters used in saving/loading
	var SquadSizes, YouthTeamSizes;		//arrays used in saving/loading
	var ResultsMatrix;
};
FootballLeague.prototype = {
	Set(rGenerator) {
		this.Randomizer = rGenerator;
		this.Season = 0;
		this.Week = 0;
		this.SetLists();
	},
	SetLists() {

		this.FixtureList = new Array(LEAGUE.TEAMS);
		this.HomeAwayArray = new Array(LEAGUE.WEEKS/2);
		this.Fixtures = ArrayUtils.Create2D(LEAGUE.WEEKS, LEAGUE.FIXTURES, function() {var Home, Away;});
		this.ResultsMatrix = ArrayUtils.Create2D(LEAGUE.TEAMS, LEAGUE.TEAMS, function() {var HomeGoals, AwayGoals;} );
	},
	Load() {

		this.LoadLeague();
		this.LoadSquads();
		this.LoadYouth();
		this.LoadTargets();

		Teams.forEach(function(team) {team.GenerateFormations();});
		Teams.forEach(function(team) {team.SelectBestFormation();});
	},
	Dump() {  //NOTE: transactions not being recorded right now

		this.DumpLeague();
		this.DumpSquads();
		this.DumpYouth();
		this.DumpTargets();
	},
	Generate(gType, bdgt) {  //g- game

		this.GeneratePlayers(gType);
		Teams.forEach(function(team) {team.YouthTeam.Generate();});
		this.GenerateBudgets(bdgt);
		this.GenerateFixtureLists();
		TransferPool.Generate();
	}
};
