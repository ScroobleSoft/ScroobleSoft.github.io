
//------------------------------------------------
//---------- DEFENSIVE TACKLE --------------------
var DefensiveTackle = function() {
};
DefensiveTackle.prototype = new FootballGridder();
DefensiveTackle.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.DT;
};
DefensiveTackle.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.MG - (10*POSITION.DT);
};
