
//--------------------------------------
//---------- SAFETY --------------------
var Safety = function() {
};
Safety.prototype = new FootballGridder();
Safety.prototype.Set = function(rGenerator) {
   FootballGridder.prototype.Set.call(this, rGenerator); 

   this.Position = POSITION.S;
};
Safety.prototype.SetDimensional = function() {

   this.SubPosition = POSITION.ES - (10*POSITION.S);
};
