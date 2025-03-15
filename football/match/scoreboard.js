
//------------------------------------------------
//---------- MATCH SCOREBOARD --------------------
var MatchScoreboard = function() {
   var Screen;
   var GraphicsTool;

   var HomeTeam, AwayTeam;
   var Minutes;
   var HomePossession, AwayPossession;
   var Scorers;		//a list
   var MatchStats;	//ISSUE: fairly sure will keep these in depth, but not reported until requested
   var Commentary;	//TODO: undecided if there will be any
};
MatchScoreboard.prototype = {
   Set(cntxt, gTool) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.Minutes = 0;
      this.HomePossession = 0;
      this.AwayPossession = 0;
   },
   SetMatch(hTeam, aTeam) {  //h- home, a- away

      //UNLOGGED

      this.HomeTeam = hTeam;
      this.AwayTeam = aTeam;
      this.Scorers = 0;

      //TODO: stat pack recording possession, shots, shots on target, detailed team stats instantiated from FootballStats
   },
   UpdatePossession(bHome) {

      //UNLOGGED

      ++this.Minutes;
      if (bHome)
	 ++this.HomePossession;
      else
	 ++this.AwayPossession;

      //- probably need to display the scorecard below
      //- (this.HomePossession/this.Minutes)*100, (this.AwayPossession/this.Minutes)*100
   },
   Draw() {
   }
};
