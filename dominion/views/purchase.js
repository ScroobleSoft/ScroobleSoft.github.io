/*
 *	 	**	at the moment, a price (4 times GDP?), and 'yes'/'no' buttons, or rather accept or decline
 *	 	**	possibly, a list of assets, maybe also a summary of the political situation (reporting potential trouble areas)
 *		**	also available could be a list of nations with the amount each is demanding (might Tomcat want to change political situation
 *				in Dictatorships? might cost be associated with proximity of political system?)
 */
//------------------------------------------------------
//---------- DOMINION PURCHASE VIEW --------------------
var DominionPurchaseView = function() {
//	var DeclineButton, AcceptButton;				UNLOGGED
	var PurchasingNation, SellingNation;
};
DominionPurchaseView.prototype = new GenieView();
DominionPurchaseView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionPurchaseView.prototype.SetNations = function(cByr, cSllr) {

	this.PurchasingNation = cByr;
	this.SellingNation = cSllr;
};
