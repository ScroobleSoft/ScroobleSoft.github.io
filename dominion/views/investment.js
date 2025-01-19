/*
 */
//--------------------------------------------------------
//---------- DOMINION INVESTMENT VIEW --------------------
var DominionInvestmentView = function() {
	var InvestingNation, InvesteeNation;
};
DominionInvestmentView.prototype = new GenieView();
DominionInvestmentView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionInvestmentView.prototype.SetNations = function(cInvstr, cInvstee) {  //UNLOGGED

	this.InvestingNation = cInvstr;
	this.InvesteeNation = cInvstee;
};
