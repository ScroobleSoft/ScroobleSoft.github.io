/*
		graphics here, text in Info Box, menu (links) in Console
*/
//---------------------------------------------------
//---------- TACTICAL GUIDE VIEW --------------------
var TacticalGuideView = function() {
	var CallingView;		//needed to return to same state - this may only be available on the first screen, so maybe REDUNDANT
};
TacticalGuideView.prototype = new GenieView();
TacticalGuideView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
TacticalGuideView.prototype.Draw = function() {  //UNLOGGED

	//-show various aspects of gameplay
	//	.start with first city, showing first gunner next to it
	//	.explain stacks, vis a vis movement-merging-teleporting
	//-exploration (how many tiles are revealed)
	//-city capture (neutral vs rival)
	//-how garrisons work
	//-platform attacks
	//-stack vs stack combat
	//-stack merging
};
