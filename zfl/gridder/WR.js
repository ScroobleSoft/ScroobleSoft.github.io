
//---------------------------------------------
//---------- WIDE RECEIVER --------------------
var WideReceiver = function() {
};
WideReceiver.prototype = new FootballGridder();
WideReceiver.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.WR;
};
WideReceiver.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.DR - (10*POSITION.WR);
};
