
DominionChoiceInfoView.prototype.OpenOfferScreen = function() {  //UNLOGGED

	this.Partner = this.Nation.CourtAlliance();

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(this.Specs.TEXT.COLOUR);

//	this.DisplayOfferHeader();
//	this.DisplayOfferSuggestion();

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();

	this.AttachOfferProsCons();

	// ** with 9 systems of government (for non city-states), there can be 81 different types of intrigue, but for now will just sponsor rival
	// ** actually, impose own form of government
};
DominionChoiceInfoView.prototype.AcceptOfferScreen = function() {  //UNLOGGED
};
