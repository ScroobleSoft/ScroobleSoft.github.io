/*
 *		Arms quantities won't be that informative, so will need a strength rating instead
 *		total, per base, also by unit
 */
//-------------------------------------------------------
//---------- DOMINION ARMS INFO VIEW --------------------
var DominionArmsInfoView = function() {
	var Nation;
};
DominionArmsInfoView.prototype = new GenieSubView();
DominionArmsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionArmsInfoView.prototype.SetControls = function() {

	//UNLOGGED

	//-there might be one to toggle between list of states for one particular nation, and bar chart for Powers
};
