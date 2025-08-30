
//----------------------------------------------------
//---------- DOMINION FORCES VIEW --------------------
var DominionForcesView = function() {
	var Nation;
};
DominionForcesView.prototype = new GenieView();
DominionForcesView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionForcesView.prototype.SetNation = function(nation) {

	this.Nation = nation;
};
DominionForcesView.prototype.Draw = function() {  //UNLOGGED

	//-two tabs (army-airforce/navy-fleets); possibly also submarines in navy tab
	//-army units in first column (15 in all), with unit names (so may need small font) and quantity
	//-jets in second column, fighters in a third column
};
