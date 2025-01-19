
//----------------------------------------------------
//---------- AGRICULTURE MINISTRY --------------------
var AgricultureMinistry = function() {
   var Food;
};
AgricultureMinistry.prototype = new DominionMinistry();
AgricultureMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

   this.Food = 0;
};
