/*
 *  UNLOGGED - actual possession of ball, as well as possesion stats, to be kept track of in an actual Match class
 */
//------------------------------------------
//---------- MATCH TEAM --------------------
var MatchTeam = function() {
   var Goals;
   var Attempts, AttemptsSaved, AttemptsMissed;
   var DefensiveBattlesWon, MidfieldBattlesWon;
};
MatchTeam.prototype = {
   Set() {
      this.Goals = 0;
      this.Attempts = 0;
      this.AttemptsSaved = 0;
      this.AttemptsMissed = 0;
      this.DefensiveBattlesWon = 0;
      this.MidfieldBattlesWon = 0;
   }
};
