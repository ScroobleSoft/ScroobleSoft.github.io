/*
 *  EVENT VIEW: will be paginated, only showing events for that turn, but a button in the bottom-right corner
 *  (enough space for that since there will 3 pages max) labelled 'Previous' brings up a 100 button grid for each turn
 */
//---------------------------------------------------------
//---------- DOMINION EVENTS INFO VIEW --------------------
var DominionEventsInfoView = function() {
	var Nation;
};
DominionEventsInfoView.prototype = new GenieSubView();
DominionEventsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionEventsInfoView.prototype.SetControls = function() {

	//UNLOGGED

	//-there might be one to toggle between list of states for one particular nation, and bar chart for Powers
};
