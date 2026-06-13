/*
 *		TODO: this will change so it shows passing windows (4 - with the last one for dump-off to HB/FB)
 *		TODO: Console will have an auto-play check-box that can be unchecked for player to take over
 *		TODO: additional buttons will allow playing drives or just one play at a time
 *		TODO: players will have random ratings (displayed), so another button will be there to 're-rate'
 *		TODO: 2X sprites
 */
//--------------------------------------------------------
//---------- GRIDIRON INTRO INFO VIEW --------------------
var GridironIntroInfoView = function() {
	var AutoPlayCheckBox, PlayModeRadioControls;
	var ScrambleButton, EditButton;
};
GridironIntroInfoView.prototype = new GenieSubView();
GridironIntroInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironIntroInfoView.prototype.SetControls = function() {

	this.AutoPlayCheckBox = this.SetCheckBox(this.Specs.CHECkBOX.AUToPLAY, CheckBoxImage, Text);
	this.PlayModeRadioControls = this.SetRadioControls(this.Specs.RADIO.PLAyMODE, RadioOptionImage, Text);
	this.ScrambleButton = this.SetTextButton(this.Specs.BUTTON.SCRAMBLE, RaisedCornerImages, Text);
	this.EditButton = this.SetTextButton(this.Specs.BUTTON.EDIT, RaisedCornerImages, Text);
};
GridironIntroInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.AutoPlayCheckBox.Check();
};
GridironIntroInfoView.prototype.Update = function() {  //UNLOGGED

	// if () {
	//		this.DrawPitchSections();
	//		this.DisplayGridders();  -updates gridders once play is running
	//}

	//-mousedown will need to be processed, processing starting in MainView
};
GridironIntroInfoView.prototype.UpdateClick = function() {  //UNLOGGED - dummy function for now
};
GridironIntroInfoView.prototype.Draw = function() {  //UNLOGGED

	this.DrawFrames();
	this.DrawPitchSections();

	Text.SetContext(this.Context);
	Text.Write("Ratings:", 5, 227);
	Text.ResetContext();
};
GridironIntroInfoView.prototype.DrawPitchSections = function() {

	Graphics.SetContext(this.Context);

	Graphics.DrawRectangle(7, 7, 88, 78, FIELD.COLOUR, 0);
	Graphics.DrawRectangle(105, 7, 88, 78, FIELD.COLOUR, 0);
	Graphics.DrawRectangle(7, 95, 88, 78, FIELD.COLOUR, 0);
	Graphics.DrawRectangle(105, 95, 88, 78, FIELD.COLOUR, 0);

	Graphics.ResetContext();
};
GridironIntroInfoView.prototype.DrawFrames = function() {

	Graphics.SetContext(this.Context);

	Graphics.DrawRectangle(4, 4, 94, 84, PAINT.LIVID, 3);
	Graphics.DrawRectangle(102, 4, 94, 84, PAINT.LIVID, 3);
	Graphics.DrawRectangle(4, 92, 94, 84, PAINT.LIVID, 3);
	Graphics.DrawRectangle(102, 92, 94, 84, PAINT.LIVID, 3);

	Graphics.ResetContext();
};
GridironIntroInfoView.prototype.DisplayGridders = function() {  //UNLOGGED
};
