
//------------------------------------------
//---------- CORNERBACK --------------------
var Cornerback = function() {
};
Cornerback.prototype = new FootballGridder();
Cornerback.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.CB;
};
Cornerback.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.ES - (10*POSITION.CB);
};
