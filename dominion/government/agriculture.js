
//----------------------------------------------------
//---------- AGRICULTURE MINISTRY --------------------
var AgricultureMinistry = function() {
   var Food;
};
AgricultureMinistry.prototype = new DominionMinistry();
AgricultureMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.AGRICULTURE;
   this.Food = 0;
};
