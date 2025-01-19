
//---------------------------------------------
//---------- DEFENSIVE END --------------------
var DefensiveEnd = function() {
};
DefensiveEnd.prototype = new FootballGridder();
DefensiveEnd.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.DE;
};
DefensiveEnd.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.ER - (10*POSITION.DE);
};
