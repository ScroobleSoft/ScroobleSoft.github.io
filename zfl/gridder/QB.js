
//-------------------------------------------
//---------- QUARTERBACK --------------------
var Quarterback = function() {
};
Quarterback.prototype = new FootballGridder();
Quarterback.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.QB;
};
Quarterback.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.GQB - (10*POSITION.QB);
};
