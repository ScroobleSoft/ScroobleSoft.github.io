
//------------------------------------------
//---------- LINEBACKER --------------------
var Linebacker = function() {
};
Linebacker.prototype = new FootballGridder();
Linebacker.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.LB;
};
Linebacker.prototype.SetDimensional = function() {

   //UNLOGGED

   this.SubPosition = POSITION.BLB - (10*POSITION.LB);
};
