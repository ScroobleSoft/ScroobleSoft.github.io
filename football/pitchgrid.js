/*
 *  purpose of this class is to allow each position to move 1 spot adjacent with impunity
 *  note that irregular formations should be allowable in terms of moving a player a zone forward or back for more offense/defense
 *
 *  NOTE: pitch divided into zones, players in centre of zone
 */
//------------------------------------------------
//--------- FOOTBALL PITCH GRID ------------------
var FootballPitchGrid = function() {
   var Zones;
};
FootballPitchGrid.prototype = {
   Set() {
      this.Zones = Create2DArray(7, 7);		//HARD-CODING
   }
};
