
//----------------------------------------------------
//---------- INFORMATION MINISTRY --------------------
var InformationMinistry = function() {
	var Satellites;
};
InformationMinistry.prototype = new DominionMinistry();
InformationMinistry.prototype.Set = function(nation) {
	DominionMinistry.prototype.Set.call(this, nation);

	this.Id = MINISTRY.INFORMATION;
	this.Satellites = 0;	//TODO: eventually an array
};
