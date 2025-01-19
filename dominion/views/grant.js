/*
 *		** control(s) to set amount
 *		**	might allow navigating to other nations (listed in 9 chunks of 8 each, perhaps w/ a 'scorecard' available
 */
//---------------------------------------------------
//---------- DOMINION GRANT VIEW --------------------
var DominionGrantView = function() {
// amount meter, spin controls, etc.
//	var CancelButton, OkButton;					UNLOGGED
	var DeliveringNation, ReceivingNation;
};
DominionGrantView.prototype = new GenieView();
DominionGrantView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionGrantView.prototype.SetNations = function(cDlvrr, cRcvr) {  //UNLOGGED

	this.DeliveringNation = cDlvrr;
	this.ReceivingNation = cRcvr;
};
