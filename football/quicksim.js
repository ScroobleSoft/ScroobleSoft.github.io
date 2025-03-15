
//-----------------------------------------------------
//---------- QUICK GAME SIMULATION --------------------  REDUNDANT
var QuickGameSimulation = function() {
   var Screen;
   var GraphicsTool;
   var TextWriter;
   var Randomizer;

   var Selector;
   var HomePlayers, AwayPlayers;
};
QuickGameSimulation.prototype = {
   Set(cntxt, gTool, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;

      this.Selector = new TeamSelector();
      this.HomePlayers = new Array(MATCH.PLAYERS);
      this.AwayPlayers = new Array(MATCH.PLAYERS);
   },
   SetTeams(hTeam, aTeam) {  //h- home, a- away

      //LOGGED

      this.Selector.Set();
      this.SelectorPickPlayers(this.HomePlayers, hTeam);
      this.Selector.Set();
      this.SelectorPickPlayers(this.AwayPlayers, aTeam);
   }
};
