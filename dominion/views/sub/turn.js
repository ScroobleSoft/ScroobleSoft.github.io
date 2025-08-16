
//-------------------------------------------------------------
//---------- DOMINION TURN CONSOLE VIEW -----------------------
var DominionTurnConsoleView = function() {
	var AdviceButton, OfferButton, HelpButton;
	var TurnImage, DigitImages;
	var CurrentView;
};
DominionTurnConsoleView.prototype = new GenieSubView();
DominionTurnConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
DominionTurnConsoleView.prototype.SetImages = function() {

	this.TurnImage = new GenieImage();
	this.TurnImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURN);
	this.DigitImages = new GenieImage();
	this.DigitImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
};
DominionTurnConsoleView.prototype.SetControls = function() {

	this.AdviceButton = this.SetTextButton(this.Specs.BUTTON.ADVICE, RaisedCornerImages, this.TextWriter);
	this.OfferButton = this.SetTextButton(this.Specs.BUTTON.OFFER, RaisedCornerImages, this.TextWriter);
	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, this.TextWriter);
};
/*
DominionTurnConsoleView.prototype.Open = function() {

};
*/
DominionTurnConsoleView.prototype.UpdateButtons = function() {

	if (this.OfferButton.CheckClicked()) {
		this.MainView.Alliance = PlayerPower.CourtAlliance();
		this.MainView.State = this.MainView.Specs.STATE.OFFERED;
		WorldMap.SelectNation(this.MainView.Alliance.AlliedState);
		WorldMap.ActivateSelection();
		this.MainView.Draw();
		this.MainView.InfoView.Close();
		this.MainView.SetInfoView(SolicitationInfoView);
		this.MainView.InfoView.Open();
	}

	if (this.AdviceButton.CheckClicked()) {
		this.MainView.InfoView.Close();
		this.MainView.InfoView = AdviceInfoView;
		AdviceInfoView.CurrentView = VIEW.CURRENT.SOLICITATION;
		this.MainView.InfoView.Open();
	}

	if (this.HelpButton.CheckClicked()) {
		this.MainView.InfoView.Close();
		this.MainView.InfoView = HelpInfoView;
		HelpInfoView.CurrentView = VIEW.CURRENT.SOLICITATION;
		this.MainView.InfoView.Open();
	}
};
DominionTurnConsoleView.prototype.Draw = function() {

	this.DisplayTurnText();
	this.DisplayAdviser();
};
DominionTurnConsoleView.prototype.DisplayTurnText = function() {

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(this.Specs.TEXT);

	//Turn, phase, fortnight and week numbers
	this.TurnImage.Draw();
	this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/10), this.Specs.IMAGE.DIGITS.X, this.Specs.IMAGE.DIGITS.Y);
	this.DigitImages.DrawPatchNumber(Game.Turn % 10, this.Specs.IMAGE.DIGITS.X+this.Specs.IMAGE.DIGITS.GAP, this.Specs.IMAGE.DIGITS.Y);
	this.TextWriter.Write("Phase "+Game.Phase, 90, 15);
	this.TextWriter.Write("Fortnight " + Game.Turn, 5, 31);
	if (Game.Phase==2)
		this.TextWriter.Write("Week " + (2*Game.Turn), 90, 31);
	else
		this.TextWriter.Write("Week " + ((2*Game.Turn)-1), 90, 31);

	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
DominionTurnConsoleView.prototype.DisplayAdviser = function() {

	//Background
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(25, 37, 106, 106, this.Specs.MUGSHOT, 0);
	this.GraphicsTool.ResetContext();

	//Mug shot
	CharacterGenerator.SetProfile(PlayerPower.Adviser.Profile);
	CharacterGenerator.SetMugShotContext(this.Context);
	CharacterGenerator.Draw(28, 41);
	CharacterGenerator.ResetMugShotContext();

	//Frame
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(25, 37, 106, 106, this.Specs.TEXT, 3);
	this.GraphicsTool.ResetContext();

	//Name
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(this.Specs.TEXT);
	if (PlayerPower.Adviser.GetGender()==GENDER.MALE) {
		this.TextWriter.Write(Adviser[PlayerPower.Government.Type], 6, 157);
		this.TextWriter.Write(PlayerPower.Adviser.Name+" (Adviser)", 6, 173);
	} else {
		this.TextWriter.Write(Adviser[PlayerPower.Government.Type], 2, 157);
		this.TextWriter.Write(PlayerPower.Adviser.Name+" (Adviser)", 2, 173);
	}
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
