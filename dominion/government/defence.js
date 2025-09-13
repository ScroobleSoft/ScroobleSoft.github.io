
//------------------------------------------------
//---------- DEFENCE MINISTRY --------------------
var DefenceMinistry = function() {
};
DefenceMinistry.prototype = new DominionMinistry();
DefenceMinistry.prototype.Set = function(nation) {
	DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.DEFENCE;
};
