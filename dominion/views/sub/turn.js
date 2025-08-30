
//-------------------------------------------------------------
//---------- DOMINION TURN CONSOLE VIEW -----------------------
var DominionTurnConsoleView = function() {
	var AdviceButton, StartButton, OfferButton, HelpButton;
	var TurnImage, DigitImages, WeekImage, FortnightImage;
	var CurrentView;
};
DominionTurnConsoleView.prototype = new GenieSubView();
DominionTurnConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Phase = this.Specs.PHASE.INVESTMENT;
};
DominionTurnConsoleView.prototype.SetImages = function() {

	this.TurnImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURN);
	this.DigitImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
	this.WeekImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.WEEK);
	this.FortnightImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.FORTNIGHT);
};
DominionTurnConsoleView.prototype.SetControls = function() {

	this.AdviceButton = this.SetTextButton(this.Specs.BUTTON.ADVICE, RaisedCornerImages, this.TextWriter);
	this.StartButton = this.SetTextButton(this.Specs.BUTTON.START, RaisedCornerImages, this.TextWriter);
	this.OfferButton = this.SetTextButton(this.Specs.BUTTON.OFFER, RaisedCornerImages, this.TextWriter);
	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, this.TextWriter);
};
DominionTurnConsoleView.prototype.ShowControls = function() {

	if (Game.Type==DOMINION.GAME.DAILY)
		this.OfferButton.Show();
	else if (Game.Type==DOMINION.GAME.MULTiCHOICE)
		this.StartButton.Show();
	this.AdviceButton.Show();
	this.HelpButton.Show();
};
DominionTurnConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	if (this.Phase==this.Specs.PHASE.INVESTMENT)
		Powers.forEach(function(pwr) {pwr.DetermineAlliedProximities();});
};
DominionTurnConsoleView.prototype.Update = function() {

	this.UpdateButtons();
};
DominionTurnConsoleView.prototype.UpdateButtons = function() {

	if (this.OfferButton.CheckClicked()) {
		this.MainView.Alliance = PlayerPower.CourtAlliance();
		this.MainView.State = this.MainView.Specs.STATE.OFFERED;
		if (this.MainView.Alliance) {
			WorldMap.SelectNation(this.MainView.Alliance.AlliedState);
			WorldMap.ActivateSelection();
			this.MainView.Draw();
		}
		this.MainView.InfoView.Close();
		this.MainView.SetInfoView(SolicitationInfoView);
		if (this.MainView.Alliance) {
			this.MainView.InfoView.SetAllied(this.MainView.Alliance.AlliedState);
			this.MainView.InfoView.State =  this.MainView.Specs.INFO.STATE.OFFER;
		} else
			this.MainView.InfoView.State =  this.MainView.Specs.INFO.STATE.ACKNOWLEDGEMENT;
		this.MainView.InfoView.Open();
	}

	if (this.StartButton.CheckClicked()) {
		this.MainView.State = this.MainView.Specs.STATE.OFFERED;		//TODO: actually, will switch to Investment and Bonds screens as needed
		this.MainView.InfoView.Close();
		this.MainView.SetInfoView(MultipleChoiceView);
		PlayerPower.GenerateSituation();
		MultipleChoiceView.SetNation(PlayerPower);
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
	var x;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetColour(this.Specs.TEXT);

	//Turn, phase, fortnight and week numbers
	if (Game.Type==DOMINION.GAME.DAILY) {
		this.TurnImage.Draw();
		this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/10), this.Specs.IMAGE.DIGITS.DAILY.X, this.Specs.IMAGE.DIGITS.DAILY.Y);
		this.DigitImages.DrawPatchNumber(Game.Turn % 10, this.Specs.IMAGE.DIGITS.DAILY.X+this.Specs.IMAGE.DIGITS.GAP, this.Specs.IMAGE.DIGITS.DAILY.Y);
		this.TextWriter.Write("Phase "+Game.Phase, 90, 15);
		this.TextWriter.Write("Fortnight " + Game.Turn, 5, 31);
		if (Game.Phase==2)
			this.TextWriter.Write("Week " + (2*Game.Turn), 90, 31);
		else
			this.TextWriter.Write("Week " + ((2*Game.Turn)-1), 90, 31);
	} else if (Game.Type==DOMINION.GAME.MULTiCHOICE) {
		this.WeekImage.Draw();
		x = this.Specs.IMAGE.DIGITS.CHOICE.X;
		this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/100), x, this.Specs.IMAGE.DIGITS.CHOICE.Y);
		this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/10), x+this.Specs.IMAGE.DIGITS.GAP, this.Specs.IMAGE.DIGITS.CHOICE.Y);
		this.DigitImages.DrawPatchNumber(Game.Turn % 10, x+(2*this.Specs.IMAGE.DIGITS.GAP), this.Specs.IMAGE.DIGITS.CHOICE.Y);
	}

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
