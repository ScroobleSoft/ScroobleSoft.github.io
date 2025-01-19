/*
 *		** different types of intrigues, possibly
 */
//------------------------------------------------------
//---------- DOMINION INTRIGUE VIEW --------------------
var DominionIntrigueView = function() {
	var Plotter, Target;
};
DominionIntrigueView.prototype = new GenieView();
DominionIntrigueView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionIntrigueView.prototype.SetNations = function(plttr, trgt) {  //UNLOGGED

	this.Plotter = plttr;
	this.Target = trgt;
};
