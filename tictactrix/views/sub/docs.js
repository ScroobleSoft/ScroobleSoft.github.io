
//-------------------------------------------------------------
//---------- TACTICAL DOCS CONSOLE VIEW -----------------------
var TacticalDocsConsoleView = function() {
	var HelpButton, GuideButton, FAQsButton, UnitsButton;
};
TacticalDocsConsoleView.prototype = new GenieSubView();
TacticalDocsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
TacticalDocsConsoleView.prototype.SetControls = function() {

	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, Text);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, Text);
	this.FAQsButton = this.SetTextButton(this.Specs.BUTTON.FAQS, RaisedCornerImages, Text);
	this.UnitsButton = this.SetTextButton(this.Specs.BUTTON.UNITS, RaisedCornerImages, Text);
};
TacticalDocsConsoleView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.HelpButton.CheckClicked()) {
		alert("Not yet available");
	}

	if (this.GuideButton.CheckClicked()) {
		alert("Not yet available");
	}

	if (this.FAQsButton.CheckClicked()) {
		alert("Not yet available");
	}

	if (this.UnitsButton.CheckClicked()) {
		alert("Not yet available");
	}
};
