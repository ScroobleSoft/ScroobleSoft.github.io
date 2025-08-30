
//-----------------------------------------------
//---------- ENERGY MINISTRY --------------------
var EnergyMinistry = function() {
   var Buoys;
   var Lavenoil;
};
EnergyMinistry.prototype = new DominionMinistry();
EnergyMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

   this.Buoys = 0;
   this.Lavenoil = 0;
};
