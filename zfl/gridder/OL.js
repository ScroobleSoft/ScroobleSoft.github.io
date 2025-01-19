
//-------------------------------------------------
//---------- OFFENSIVE LINEMAN --------------------
var OffensiveLineman = function() {
};
OffensiveLineman.prototype = new FootballGridder();
OffensiveLineman.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.OL;
};
OffensiveLineman.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.RS - (10*POSITION.OL);
};
