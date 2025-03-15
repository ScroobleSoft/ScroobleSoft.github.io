
//---------------------------------------------
//---------- TEAM SELECTOR --------------------
var TeamSelector = function() {
   var Squad;
};
TeamSelector.prototype = {
   Set(squad) {
      this.Squad = squad;
   },
   PickPlayers(lineup, formation) {  //NOTE: lineup is array of pointers that needs assignments
      var i;
      var player;
      var tandem;

      //LOGGED

      //ISSUE: only works for PRECISE game
      //TODO: have to account for injuries

      lineup[0] = this.Squad.Goalkeepers[0];										//GK
      lineup[1] = this.PickBestPlayer(this.Squad.Defenders[0], this.Squad.Defenders[1]);				//RB  HARD-
      tandem = this.PickBestTandem(this.Defenders, [ [2,3],[2,4],[3,4],[3,5],[4,5],[2,5] ] );				//CBs CODED
      lineup[2] = this.Squad.Defenders(tandem[0]);
      lineup[3] = this.Squad.Defenders(tandem[1]);
      lineup[4] = this.PickBestPlayer(this.Squad.Defenders[6], this.Squad.Defenders[7]);				//LB
      lineup[5] = this.PickBestPlayer(this.Squad.Midfielders[0], this.Squad.Midfielders[1]);				//RM
      tandem = this.PickBestTandem(this.Midfielders, [ [2,3],[2,4],[2,5],[3,5],[3,4],[4,5],[3,6],[4,6],[5,6] ] );	//CMs
      lineup[6] = this.Squad.Defenders(tandem[0]);
      lineup[7] = this.Squad.Defenders(tandem[1]);
      lineup[8] = this.PickBestPlayer(this.Squad.Midfielders[7], this.Squad.Midfielders[8]);				//LM
      tandem = this.PickBestTandem(this.Attackers, [ [0,2],[0,3],[1,2],[1,3],[2,3],[2,4],[1,4] ] );
      lineup[9] = this.Squad.Attackers(tandem[0]);									//Ss
      lineup[10] = this.Squad.Attackers(tandem[1]);
   },
   PickBestPlayer(player1, player2) {

      //LOGGED

      if (player1.Quality<=player2.Quality)
	 return (player1);
      else
	 return (player2);
   },
   PickBestTandem(pArray, tArray) {  //p- player, t- tandem
      var i;
      var nTandem;  //n- number
      var tQuality, bQuality;  //t- tandem, b- best

      //LOGGED

      nTandem = 0;
      bQuality = pArray[tArray[0][0]].Quality + pArray[tArray[0][1]].Quality;
      for (i=1;i<tArray.length;++i) {
	 tQuality = pArray[tArray[i][0]].Quality + pArray[tArray[i][1]].Quality;
	 if (tQuality<bQuality) {
	    bQuality = tQuality;
	    nTandem = i;
	 }
      }
   }
};
