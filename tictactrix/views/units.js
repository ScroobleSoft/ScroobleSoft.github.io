/*
*/
//---------------------------------------------------
//---------- TACTICAL UNITS VIEW --------------------  TODO: ctually be ReferenceView, or GlossaryView
var TacticalUnitsView = function() {
	var CallingView;		//needed to return to same state - this may only be available on the first screen, so maybe REDUNDANT
};
TacticalUnitsView.prototype = new GenieView();
TacticalUnitsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
TacticalUnitsView.prototype.Draw = function() {  //UNLOGGED
};
