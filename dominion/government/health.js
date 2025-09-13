
//-----------------------------------------------
//---------- HEALTH MINISTRY --------------------
var HealthMinistry = function() {
   var Medicine;
};
HealthMinistry.prototype = new DominionMinistry();
HealthMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.HEALTH;
   this.Medicine = 0;
};
