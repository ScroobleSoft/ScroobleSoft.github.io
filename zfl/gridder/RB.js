
//--------------------------------------------
//---------- RUNNING BACK --------------------
var RunningBack = function() {
};
RunningBack.prototype = new FootballGridder();
RunningBack.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.RB;
};
RunningBack.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.SB - (10*POSITION.RB);
};
