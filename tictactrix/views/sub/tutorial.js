
//-----------------------------------------------------------
//---------- TACTICAL TUTORIAL INFO VIEW --------------------
var TacticalTutorialInfoView = function() {
	var TutorialButton, DemoButton;
};
TacticalTutorialInfoView.prototype = new GenieView();
TacticalTutorialInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieView.prototype.Set.call(this, cnvs, specs, mView);

};
TacticalTutorialInfoView.prototype.SetControls = function() {

	this.TutorialButton = this.SetImageButton(this.Specs.BUTTON.TUTORIAL, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], RaisedCornerImages);
	this.DemoButton = this.SetImageButton(this.Specs.BUTTON.DEMO, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], RaisedCornerImages);
};
TacticalTutorialInfoView.prototype.UpdateButtons = function() {

	if (this.TutorialButton.CheckClicked())
		alert("Not available yet.");
//		this.Close(this.OpenTutorialView.bind(this), 100);

	if (this.DemoButton.CheckClicked())
		alert("Not available yet.");
//		this.Close(this.OpenDemoView.bind(this), 100);
};
TacticalTutorialInfoView.prototype.OpenTutorialView = function() {  //UNLOGGED

};
TacticalTutorialInfoView.prototype.OpenDemoView = function() {  //UNLOGGED

};
