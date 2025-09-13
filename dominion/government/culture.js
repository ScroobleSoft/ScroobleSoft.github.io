
//------------------------------------------------
//---------- CULTURE MINISTRY --------------------
var CultureMinistry = function() {
};
CultureMinistry.prototype = new DominionMinistry();
CultureMinistry.prototype.Set = function(nation) {
   DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.CULTURE;
};
