/*
 *		** different types of treaties?
 */
//----------------------------------------------------
//---------- DOMINION TREATY VIEW --------------------
var DominionTreatyView = function() {
	var Initiator, Follower;
};
DominionTreatyView.prototype = new GenieView();
DominionTreatyView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionTreatyView.prototype.SetNations = function(inttr, fllwr) {  //UNLOGGED

	this.Initiator = inttr;
	this.Follower = fllwr;
};
