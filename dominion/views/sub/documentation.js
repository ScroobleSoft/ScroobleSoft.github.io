
//----------------------------------------------------------------------
//---------- DOMINION DOCUMENTATION CONSOLE VIEW -----------------------
var DominionDocumentationConsoleView = function() {
	var HelpButton, GuideButton, GazetteerButton, DompaediaButton, FAQButton, UnitsButton;
};
DominionDocumentationConsoleView.prototype = new GenieSubView();
DominionDocumentationConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionDocumentationConsoleView.prototype.SetControls = function() {  //UNLOGGED

	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
	this.GazetteerButton = this.SetTextButton(this.Specs.BUTTON.GAZETTEER, RaisedCornerImages, this.TextWriter);
	this.DompaediaButton = this.SetTextButton(this.Specs.BUTTON.DOMPAEDIA, RaisedCornerImages, this.TextWriter);
	this.FAQButton = this.SetTextButton(this.Specs.BUTTON.UNITS, RaisedCornerImages, this.TextWriter);
	this.UnitsButton = this.SetTextButton(this.Specs.BUTTON.FAQ, RaisedCornerImages, this.TextWriter);
};
DominionDocumentationConsoleView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.HelpButton.CheckClicked()) {
	}

	if (this.GuideButton.CheckClicked()) {
	}

	if (this.GazetteerButton.CheckClicked()) {
	}

	if (this.DompaediaButton.CheckClicked()) {
	}

	if (this.FAQButton.CheckClicked()) {
	}

	if (this.UnitsButton.CheckClicked()) {
	}
};
