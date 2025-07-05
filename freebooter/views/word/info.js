
//---------------------------------------------------
//---------- SOLAR WORDS INFO VIEW ------------------
var SolarWordsInfoView = function() {
	var LetterImages, CellImage, SubCellImage, SelectionImage;
	var SolutionImage, SolaronsImage;
	var LedgerButton, VowelsButton, CornersButton, RakeButton;
	var GameType;
	var Cells, SelectedCell;  //TODO: top-left, to start with
	var FiveLetterWords, FiveDistribution, WordList;
	var Solution, Grid;
	var State;
	var Errors;

	var lttr, wrd, cntxt;
};
SolarWordsInfoView.prototype = new GenieSubView();
SolarWordsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.GameType = this.Specs.TYPE.LEDGER;
	this.State = VIEW.WORDS.STATE.INTRO;
	this.SetData();
	this.SetGrid();
};
SolarWordsInfoView.prototype.ShowControls = function() {

	if (this.State==VIEW.WORDS.STATE.INTRO) {
		this.LedgerButton.Show();
		this.VowelsButton.Show();
		this.CornersButton.Show();
		this.RakeButton.Show();
	}
};
/*
SolarWordsInfoView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

};
*/
SolarWordsInfoView.prototype.Update = function() {

	if (this.State==VIEW.WORDS.STATE.INTRO) {
		if (this.LedgerButton.CheckClicked()) {
			this.GameType = this.Specs.TYPE.LEDGER;
			setTimeout(this.StartNewGame.bind(this), 60);
		}
		if (this.VowelsButton.CheckClicked()) {
			this.GameType = this.Specs.TYPE.VOWELS;
			setTimeout(this.StartNewGame.bind(this), 60);
		}
		if (this.CornersButton.CheckClicked()) {
			this.GameType = this.Specs.TYPE.CORNERS;
			setTimeout(this.StartNewGame.bind(this), 60);
		}
		if (this.RakeButton.CheckClicked()) {
			this.GameType = this.Specs.TYPE.RAKE;
			setTimeout(this.StartNewGame.bind(this), 60);
		}
	} else
		this.UpdateJourney();
};
SolarWordsInfoView.prototype.Draw = function() {

	if (this.State==VIEW.WORDS.STATE.GAME) {
		this.DrawBackground();
		this.DisplayCells();
		this.DisplayJourney();
	}
};
SolarWordsInfoView.prototype.StartNewGame = function() {

	this.Controls.forEach(function(cntrl) {cntrl.Hide()});
	this.ResetData();

	//Select words
	switch (this.GameType) {
		case this.Specs.TYPE.LEDGER:
			this.SelectLedgerSolution();
			this.SetLedgerCellColours();
			break;
		case this.Specs.TYPE.VOWELS:
		case this.Specs.TYPE.CORNERS:
			this.SelectGridSolution();
			this.SetGridCellColours();
			break;
		case this.Specs.TYPE.RAKE:
			this.SelectRakeSolution();
			this.SetRakeCellColours();
			break;
	}

	//Draw cells
	this.SelectedCell = this.Cells[0];
	this.State = VIEW.WORDS.STATE.GAME;
	this.ColourScape();
	this.Draw();

	//Show clues
	switch (this.GameType) {
		case this.Specs.TYPE.VOWELS:
			this.DisplayVowels();
			break;
		case this.Specs.TYPE.CORNERS:
			this.DisplayCorners();
			break;
		case this.Specs.TYPE.RAKE:
			this.DisplayRakeVowels();
			break;
	}
};
SolarWordsInfoView.prototype.Congratulate = function() {

	this.State = VIEW.WORDS.STATE.SOLVED;
	this.SolutionImage.Draw();
	this.SolaronsImage.Draw();
	PlayerPilot.Solarons += 10;
	this.MainView.ConsoleView.DisplaySolarons();
};
