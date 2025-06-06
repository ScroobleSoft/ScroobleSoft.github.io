/*
 *  UNLOGGED - this is looking more and more like something that belong in Types.js without any method
 */
//-----------------------------------------
//---------- TOLL TILE --------------------
var TollTile = function() {
   var Type;
   var Location;	//indices
   var Clan;
   var Neighbours;
   var Stacks;
};
TollTile.prototype = {
   Set() {
      this.Location = new Coordinate2D();
      this.Neighbours = new Array(8);
      this.Stacks = new Array();
   }
};
