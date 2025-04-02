
//------------------------------------------------
//---------- DEFENCE MINISTRY --------------------
var DefenceMinistry = function() {
   var Army;
   var Navy;
   var AirForce;
};
DefenceMinistry.prototype = new DominionMinistry();
DefenceMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

   this.Army = new DominionArmy();
   this.Navy = new DominionNavy();
   this.AirForce = new DominionAirForce();
};
