/*
		likely 3 or 4 pages
		in console, could have a list of categories, clicking any of which presents QAs grouped by such
*/
//-------------------------------------------------
//---------- TACTICAL FAQ VIEW --------------------
var TacticalFAQView = function() {
	var CallingView;		//needed to return to same state - this may only be available on the first screen, so maybe REDUNDANT
};
TacticalFAQView.prototype = new GenieView();
TacticalFAQView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
TacticalFAQView.prototype.Draw = function() {  //UNLOGGED
};
