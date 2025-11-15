
//-------------------------------------------------------------
//---------- TACTICAL DOCS CONSOLE VIEW -----------------------
var TacticalDocsConsoleView = function() {
	var HelpButton, GuideButton, FAQButton, UnitsButton;  //UNLOGGED
};
TacticalDocsConsoleView.prototype = new GenieSubView();
TacticalDocsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
TacticalDocsConsoleView.prototype.SetControls = function() {  //UNLOGGED
/*
	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
	this.FAQButton = this.SetTextButton(this.Specs.BUTTON.UNITS, RaisedCornerImages, this.TextWriter);
	this.UnitsButton = this.SetTextButton(this.Specs.BUTTON.FAQ, RaisedCornerImages, this.TextWriter);
*/
};
TacticalDocsConsoleView.prototype.UpdateButtons = function() {  //UNLOGGED
/*
	if (this.HelpButton.CheckClicked()) {
	}

	if (this.GuideButton.CheckClicked()) {
	}

	if (this.FAQButton.CheckClicked()) {
	}

	if (this.UnitsButton.CheckClicked()) {
	}
*/
};
