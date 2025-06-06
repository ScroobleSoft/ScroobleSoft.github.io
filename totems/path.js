/*
 *  UNLOGGED - each pair of cities are connected by a path, and capturing both presidios allows a tax to be collected for each tile traversed by
 *	       anyone
 */
//-----------------------------------------
//---------- TOLL PATH --------------------
var TollPath = function() {
   var Presidio1, Presidio2;
};
TollPath.prototype = {
   Set(prsdio1, prsdio2) {
      this.Presidio1 = prsdio1;
      this.Presidio2 = prsdio2;
   }
};
