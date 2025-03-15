
//-----------------------------------------------
//---------- SEASON SCHEDULE --------------------  NOTE: for prem teams only . . . looking REDUNDANT
var SeasonSchedule = function() {
   var Screen;
   var Randomizer;

   var LeagueGames;
   var CupGames;
};
SeasonSchedule.prototype = {
   Set(cntxt, rGenerator) {
      this.Screen = cntxt;
      this.Randomizer = rGenerator;

      this.LeagueGames = new Array(LEAGUE.TEAMS-1);  //NOTE: will contain team index (1-92 for entry below); also season is symmetrical
      this.CupGames = new Array(41);		//HARD-CODED here and above
   },
   Generate() {  //TODO: better to generate for the first team, then use that for the other teams (all done elsewhere)
      var i;

      //NOTE: method will probably go away since generation has to be done in coordinated manner for every team

      //UNLOGGED

      //TEMP - below has an obvious flaw since a team can end up having itself on the schedule
      this.Randomizer.GetUniqueIndices(this.LeagueGames, LEAGUE.TEAMS-1, LEAGUE.TEAMS);
   },
   Load() {
      //maybe needed
   }
};
