/*
 *  UNLOGGED
 */
//-------------------------------------------
//---------- BATTLE CLAN --------------------
var BattleClan = function() {
   var Opponent;
   var Stack;
   var Direction;
   var TileGrid;
};
BattleClan.prototype = {
   Set() {
      this.Stack = new AgentArray();
   },
   SetStack(stck, drctn) {
      for (indx=0;indx<stck.length;++indx) {
	 this.Stack[indx].Unit = stck[indx];
	 this.Stack[indx].SetVisible();
	 this.Stack[indx].SetExtant();
      }
   },
   ExecuteTurn() {
      //-move or shoot decision
   },
   EvaluateTargets() {
      //-to see who has the best move (may need a sorted list of %s of success for each unit)
   }
};
