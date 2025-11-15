
//-------------------------------------------------------------
//---------- DOMINION TURN CONSOLE VIEW -----------------------
var DominionTurnConsoleView = function() {
	var StartButton, AdviceButton, HelpButton;
//	var OfferButton;		//REDUNDANT
	var TurnImage, DigitImages, ParenthesesImages;
	var FortnightImage, WeekImage, DayImage, PhaseImage, NumeralImages;
	var CurrentView;
	var Situation;
};
DominionTurnConsoleView.prototype = new GenieSubView();
DominionTurnConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.Phase = this.Specs.PHASE.INVESTMENT;
};
DominionTurnConsoleView.prototype.SetImages = function() {

	//Turn number
	this.TurnImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.TURN);
	this.DigitImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
	this.ParenthesesImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PARENTHESES);

	//Calendar
	this.FortnightImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.FORTNIGHT);
	this.WeekImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.WEEK);
	this.DayImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DAY);
	this.PhaseImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PHASE);
	this.NumeralImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.NUMERALS);
};
DominionTurnConsoleView.prototype.SetControls = function() {

	this.StartButton = this.SetImageButton(this.Specs.BUTTON.START, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
//	this.OfferButton = this.SetTextButton(this.Specs.BUTTON.OFFER, RaisedCornerImages, this.TextWriter);
	this.AdviceButton = this.SetTextButton(this.Specs.BUTTON.ADVICE, RaisedCornerImages, this.TextWriter);
	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, this.TextWriter);

	this.Controls.push(ActionConsoleView.ModeIconPanel);
	this.Controls.push(ActionConsoleView.LeaderIcon);
};
/*
DominionTurnConsoleView.prototype.ShowControls = function() {

	if (Game.Type==DOMINION.GAME.DAILY)
		this.OfferButton.Show();
	else if (Game.Type==DOMINION.GAME.MULTiCHOICE)
		this.StartButton.Show();
	this.AdviceButton.Show();
	this.HelpButton.Show();
};
*/
DominionTurnConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	if (this.Phase==this.Specs.PHASE.INVESTMENT)
		Powers.forEach(function(pwr) {pwr.DetermineAlliedProximities();});
};
DominionTurnConsoleView.prototype.Update = function() {

	this.UpdateButtons();
};
DominionTurnConsoleView.prototype.UpdateButtons = function() {
/*
	if (this.OfferButton.CheckClicked()) {
//		this.MainView.Alliance = PlayerPower.CourtAlliance();
//		WorldMap.SelectNation(this.MainView.Alliance.AlliedState);
//		WorldMap.SelectNation(AlliedStates[this.Randomizer.GetIndex(ALLIED.COUNT)]);
//		WorldMap.ActivateSelection();
//		this.MainView.Draw();
		this.GenerateSituation();
		this.MainView.InfoView.OpenChoiceScreen();
		if (this.MainView.InfoView.Partner) {
			WorldMap.SelectNation(this.MainView.InfoView.Partner);
			WorldMap.ActivateSelection();
			WorldMap.ActivatePulse();
			this.MainView.Draw();
		}
	}
*/
	if (this.StartButton.CheckClicked()) {
		this.State = this.MainView.Specs.STATE.SUGGESTION;
		this.StartButton.Hide();
		this.MainView.Nation.GenerateSituation();
		this.DisplayMinister();
		this.MainView.SetInfoView(ChoiceInfoView);
		this.MainView.InfoView.OpenChoiceScreen();
		if (this.MainView.InfoView.Partner) {
			WorldMap.SelectNation(this.MainView.InfoView.Partner);
			WorldMap.ActivateSelection();
			WorldMap.ActivatePulse();
			this.MainView.Draw();
		}
	}
/*
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
*/
/*
	if (this.StartButton.CheckClicked()) {
		this.MainView.State = this.MainView.Specs.STATE.OFFERED;		//TODO: actually, will switch to Investment and Bonds screens as needed
		this.MainView.InfoView.Close();
		this.MainView.SetInfoView(ChoiceInfoView);
		PlayerPower.GenerateSituation();
		ChoiceInfoView.SetNation(PlayerPower);
		this.MainView.InfoView.Open();
	}
*/
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
	var x;

	this.DisplayTurnText();
//	this.DisplayAdviser();		REDUNDANT
	switch (Game.Type & 0xE) {
		case DOMINION.GAME.FREeFORM:
			this.FortnightImage.Draw(this.Specs.IMAGE.FORTNIGHT.X, this.Specs.IMAGE.FORTNIGHT.Y);
			x = this.Specs.IMAGE.FORTNIGHT.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Fortnight/100), x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			x += this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Fortnight/10), x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			x += this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP;
			this.NumeralImages.DrawPatchNumber(Game.Fortnight % 10, x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			this.WeekImage.Draw(this.Specs.IMAGE.WEEK.X, this.Specs.IMAGE.WEEK.Y);
			x = this.Specs.IMAGE.WEEK.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/100), x, this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/10), x+this.Specs.IMAGE.WEEK.NUMERALS.GAP, this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Game.Week % 10, x+(2*this.Specs.IMAGE.WEEK.NUMERALS.GAP), this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.PhaseImage.Draw(this.Specs.IMAGE.PHASE.X, this.Specs.IMAGE.PHASE.Y);
			x = this.Specs.IMAGE.PHASE.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Phase/100), x, this.Specs.IMAGE.PHASE.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Phase/10), x+this.Specs.IMAGE.PHASE.NUMERALS.GAP, this.Specs.IMAGE.PHASE.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Game.Phase % 10, x+(2*this.Specs.IMAGE.PHASE.NUMERALS.GAP), this.Specs.IMAGE.PHASE.NUMERALS.Y);
			break;
		case DOMINION.GAME.MULTiCHOICE:
			this.WeekImage.Draw(this.Specs.IMAGE.FORTNIGHT.X, this.Specs.IMAGE.FORTNIGHT.Y);
			x = this.Specs.IMAGE.WEEK.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/100), x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/10), x+this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Game.Week % 10, x+(2*this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP), this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			break;
		case DOMINION.GAME.SURVIVAL:
			this.FortnightImage.Draw(this.Specs.IMAGE.FORTNIGHT.X, this.Specs.IMAGE.FORTNIGHT.Y);
			x = this.Specs.IMAGE.FORTNIGHT.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Fortnight/100), x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			x += this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Fortnight/10), x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			x += this.Specs.IMAGE.FORTNIGHT.NUMERALS.GAP;
			this.NumeralImages.DrawPatchNumber(Game.Fortnight % 10, x, this.Specs.IMAGE.FORTNIGHT.NUMERALS.Y);
			this.WeekImage.Draw(this.Specs.IMAGE.WEEK.X, this.Specs.IMAGE.WEEK.Y);
			x = this.Specs.IMAGE.WEEK.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/100), x, this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Week/10), x+this.Specs.IMAGE.WEEK.NUMERALS.GAP, this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Game.Week % 10, x+(2*this.Specs.IMAGE.WEEK.NUMERALS.GAP), this.Specs.IMAGE.WEEK.NUMERALS.Y);
			this.PhaseImage.Draw(this.Specs.IMAGE.DAY.X, this.Specs.IMAGE.DAY.Y);
			x = this.Specs.IMAGE.DAY.NUMERALS.X;
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Day/100), x, this.Specs.IMAGE.DAY.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Math.floor(Game.Day/10), x+this.Specs.IMAGE.DAY.NUMERALS.GAP, this.Specs.IMAGE.DAY.NUMERALS.Y);
			this.NumeralImages.DrawPatchNumber(Game.Day % 10, x+(2*this.Specs.IMAGE.DAY.NUMERALS.GAP), this.Specs.IMAGE.DAY.NUMERALS.Y);
			break;
	}
};
DominionTurnConsoleView.prototype.DisplayTurnText = function() {
	var x;

	this.TurnImage.Draw();
	x = this.Specs.IMAGE.DIGITS.CHOICE.X;

	//Current turn
	this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/100), x, this.Specs.IMAGE.DIGITS.CHOICE.Y);
	this.DigitImages.DrawPatchNumber(Math.floor(Game.Turn/10), x+this.Specs.IMAGE.DIGITS.GAP, this.Specs.IMAGE.DIGITS.CHOICE.Y);
	this.DigitImages.DrawPatchNumber(Game.Turn % 10, x+(2*this.Specs.IMAGE.DIGITS.GAP), this.Specs.IMAGE.DIGITS.CHOICE.Y);

	//Turn limit
	this.ParenthesesImages.DrawPatchNumber(0, this.Specs.IMAGE.PARENTHESES.X, this.Specs.IMAGE.PARENTHESES.Y);
	x += 51;		//HARD-CODED
	this.DigitImages.DrawPatchNumber(Math.floor(Game.TurnLimit/100), x, this.Specs.IMAGE.DIGITS.CHOICE.Y);
	this.DigitImages.DrawPatchNumber(Math.floor(Game.TurnLimit/10), x+this.Specs.IMAGE.DIGITS.GAP, this.Specs.IMAGE.DIGITS.CHOICE.Y);
	this.DigitImages.DrawPatchNumber(Game.TurnLimit % 10, x+(2*this.Specs.IMAGE.DIGITS.GAP), this.Specs.IMAGE.DIGITS.CHOICE.Y);
	this.ParenthesesImages.DrawPatchNumber(1, this.Specs.IMAGE.PARENTHESES.X+this.Specs.IMAGE.PARENTHESES.GAP, this.Specs.IMAGE.PARENTHESES.Y);

	switch (Game.Type & 0xF) {
		case DOMINION.GAME.FREeFORM:
			break;
		case DOMINION.GAME.MULTiCHOICE:
			break;
		case DOMINION.GAME.SURVIVAL:
			break;
	}
/*
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
*/
};
DominionTurnConsoleView.prototype.DisplayAdviser = function() {  //TODO: should move to AdviceInfoView

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
DominionTurnConsoleView.prototype.DisplayMinister = function() {  //UNLOGGED
	var iMnstry;

	//TEMP - HACK!
//	this.MainView.Nation.Situation = SITUATION.INTRIGUE;

	//Determine minister based on situation
	iMnstry = MinisterSituationMap[this.MainView.Nation.Situation];
	if (iMnstry==-1)
		switch (this.MainView.Nation.Situation) {
			case SITUATION.OFFER:
				iMnstry = MinisterSituationMap[Offer.Goods];
				break;
			case SITUATION.PROPOSAL:
				iMnstry = MinisterSituationMap[Proposal.Goods];
				break;
			case SITUATION.DISASTER:
				iMnstry = MinisterSituationMap[Disaster.Goods];
				break;
		}

	//Background
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(8, 65, 74, 74, this.Specs.MUGSHOT, 0);
	this.GraphicsTool.ResetContext();

	//Mug shot
	CharacterGenerator.SetProfile(this.MainView.Nation.Cabinet.Ministries[iMnstry].Minister.Profile);
	CharacterGenerator.SetMugShotContext(this.Context);
	CharacterGenerator.DrawMugshot(8-13, 103-34);
	CharacterGenerator.ResetMugShotContext();

	//Name and title
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour(this.Specs.TEXT);
	this.TextWriter.Write(Ministries[iMnstry]+" Minister", 2, 155);
	this.TextWriter.Write(this.MainView.Nation.Cabinet.Ministries[iMnstry].Minister.Name, 2, 169);
	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
	this.TextWriter.ResetContext();

	//Frame
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(5, 62, 80, 80, this.Specs.TEXT, 3);
	this.GraphicsTool.ResetContext();
};
