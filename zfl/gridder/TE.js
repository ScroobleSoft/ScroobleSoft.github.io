
//-----------------------------------------
//---------- TIGHT END --------------------
var TightEnd = function() {
};
TightEnd.prototype = new FootballGridder();
TightEnd.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.TE;
};
TightEnd.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.RS - (10*POSITION.TE);
};
