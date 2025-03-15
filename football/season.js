
//----------------------------------------------
//---------- FOOTBALL SEASON -------------------
var FootballSeason = function() {
   var Number;
   var TablePosition;
   var Played;
   var Won, Lost, Tied;
   var GoalsFor, GoalsAgainst;
   var Stats;			//Not just goals for and goals against, but others that only computer can keep
				// track of, such as % of passes completed, shot on target etc.
};
FootballSeason.prototype = {
   Set() {
      this.Number = 0;
      this.TablePosition = -1;
      this.Played = 0;
      this.Won = 0;
      this.Lost = 0;
      this.Tied = 0;
      this.GoalsFor = 0;
      this.GoalsAgainst = 0;

      //TODO: stats
   }
};
