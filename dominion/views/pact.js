/*
 *		** could have an inventory of military assets possessed by Allied State
 */
//--------------------------------------------------
//---------- DOMINION PACT VIEW --------------------
var DominionPactView = function() {
	var Power, AlliedState;
};
DominionPactView.prototype = new GenieView();
DominionPactView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionPactView.prototype.SetNations = function(pwr, ally) {  //UNLOGGED

	this.Power = pwr;
	this.AlliedState = ally;
};
