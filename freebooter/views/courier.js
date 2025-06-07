
//--------------------------------------------------
//---------- SOLAR COURIER VIEW --------------------
var SolarCourierView = function() {
	var Offers, OfferIndex;
	var PreviousButton, NextButton;  //UNLOGGED

	var i;
};
SolarCourierView.prototype = new GenieView();
SolarCourierView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.OfferIndex = -1;
	this.Offers = new Array(8);	//8? would 5 be better?
};
SolarCourierView.prototype.SetControls = function() {  //UNLOGGED

	//this.PreviousButton
	//this.NextButton
};
SolarCourierView.prototype.ShowControls = function() {  //UNLOGGED

};
SolarCourierView.prototype.SetOffers = function() {  //UNLOGGED
};
SolarCourierView.prototype.Draw = function() {  //UNLOGGED

	//-flip (4) pages
	//-envelopes if documents, pouches if materiel/gems/chips
	//-mugshot
};
