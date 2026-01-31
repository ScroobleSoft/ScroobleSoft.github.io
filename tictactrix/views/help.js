
//--------------------------------------------------
//---------- TACTICAL HELP VIEW --------------------
var TacticalHelpView = function() {
	var CallingView;		//needed to return to same state
};
TacticalHelpView.prototype = new GenieView();
TacticalHelpView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
