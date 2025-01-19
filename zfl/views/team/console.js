
//----------------------------------------------------------
//---------- GRIDIRON TEAM CONSOLE VIEW --------------------
var GridironTeamConsoleView = function() {
	var SectionIcons;
	var PendingFAsButton, StartSeasonButton, SignFAButton, DraftButton, MatchButton, WireButton, PracticeButton;
	//TODO: clicking the 'Practice' button will present a few options (intense/balanced/light etc.); practice button could show up after clicking match button
};
GridironTeamConsoleView.prototype = new GenieSubView();
GridironTeamConsoleView.prototype.Set = function(cnvs, specs, mView) {  //TODO: might need to add ID for current nested view
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironTeamConsoleView.prototype.SetControls = function() {
/* */
	this.PendingFAsButton = new ImageButton();
	this.PendingFAsButton.Set(this.Canvas, this.Specs.BUTTON.PENDINgFAs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.PendingFAsButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.PendingFAsButton);

	this.StartSeasonButton = new ImageButton();
	this.StartSeasonButton.Set(this.Canvas, this.Specs.BUTTON.STARtSEASON, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.StartSeasonButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.StartSeasonButton);
/* */
	function SetButton(btn, cnvs, specs, img, aCntrls) {

		btn.Set(cnvs, specs, img);
		btn.SetCornersPic(RaisedCornerImages);
		aCntrls.push(btn);
	};

//	this.PendingFAsButton = new ImageButton();
//	SetButton(this.PendingFAsButton, this.Canvas, this.Specs.BUTTON.PENDINgFAs, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
//	this.StartSeasonButton = new ImageButton();
//	SetButton(this.StartSeasonButton, this.Canvas, this.Specs.BUTTON.STARtSEASON, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
	this.DraftButton = new ImageButton();
	SetButton(this.DraftButton, this.Canvas, this.Specs.BUTTON.DRAFT, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
	this.SignFAButton = new ImageButton();
	SetButton(this.SignFAButton, this.Canvas, this.Specs.BUTTON.FA, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
	this.MatchButton = new ImageButton();
	SetButton(this.MatchButton, this.Canvas, this.Specs.BUTTON.MATCH, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
	this.WireButton = new ImageButton();
	SetButton(this.WireButton, this.Canvas, this.Specs.BUTTON.WAIVER, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Controls);
};
GridironTeamConsoleView.prototype.ShowControls = function() {

	switch (League.GamesPlayed) {
		case SEASON.STATE.END:
			this.PendingFAsButton.Show();
			this.PendingFAsButton.Disable();			//TODO: TEMP, feature not implemented
			this.StartSeasonButton.Show();
			break;
		case SEASON.STATE.START:
		case SEASON.STATE.FAs:
		case SEASON.STATE.TRADES:
			this.PendingFAsButton.Hide();
			this.StartSeasonButton.Hide();
			this.SignFAButton.Show();
			this.SignFAButton.Disable();				//TODO: TEMP, feature not implemented
			this.DraftButton.Show();
			break;
		case SEASON.STATE.CUTS:							//TODO: state probably redundant
		default:
			this.SignFAButton.Hide();
			this.DraftButton.Hide();
			this.WireButton.Show();
			this.WireButton.Disable();					//TODO: TEMP, feature not implemented
			this.MatchButton.Show();
	}
};
/*
GridironTeamConsoleView.prototype.Open = function() {
	GenieSubView.prototype.Open.call(this);

	switch (this.MainView.SubViewID) {
	}
};
*/
