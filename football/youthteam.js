
//---------------------------------------------------
//---------- FOOTBALL YOUTH TEAM --------------------
var FootballYouthTeam = function() {
   var Randomizer;
   var Team;
   var Players;
};
FootballYouthTeam.prototype = {
   Set(rGenerator, team) {  //NOTE: passing pointer to team rather than index
      this.Randomizer = rGenerator;

      this.Team = team;
      this.Players = new Array();
   },
   Generate() {

      this.Players = ArrayUtils.Create(YOUTH.PLAYERS, FootballPlayer);
      for (i=0;i<YOUTH.PLAYERS;++i)
	 this.Players[i].Set(this.Randomizer, this.Team.Index);
      this.Players.forEach(function(player){player.GenerateYouth();});
      this.Players.sort(function(a, b) {return a.Position-b.Position;});
   },
   AddPlayer(plyr) {

      this.Players.push(plyr);
   },
   Sort() {
   }
};
