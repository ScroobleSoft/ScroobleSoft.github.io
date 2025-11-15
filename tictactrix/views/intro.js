
//---------------------------------------------------
//---------- TACTICAL INTRO VIEW --------------------
var TacticalIntroView = function() {
	var DailyDate;
	var DailyButton, RandomButton, GuideButton;																		//open page
	var GameRadioOption, PastGamesFlag, GameInfo;																	//start page
	var PastGameDate, SelectedSlot, StartingSlot, EndingSlot, PastGameIndex, FirstDayIndex;			//past page
};
TacticalIntroView.prototype = new GenieView();
TacticalIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

//	this.State = this.Specs.STATE.OPEN;
	this.InfoCount = 0;
};
/*
TacticalIntroView.prototype.SetImages = function() {  //UNLOGGED

	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
	this.DeselectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DESELECTION);
};
*/
TacticalIntroView.prototype.SetControls = function() {  //UNLOGGED

	//Choice
	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.RandomButton = this.SetTextButton(this.Specs.BUTTON.RANDOM, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
/*
	//Game Options
	this.ShortButton = this.SetTextButton(this.Specs.BUTTON.SHORT, RaisedCornerImages, this.TextWriter);
	this.MediumButton = this.SetTextButton(this.Specs.BUTTON.MEDIUM, RaisedCornerImages, this.TextWriter);
	this.LongButton = this.SetTextButton(this.Specs.BUTTON.LONG, RaisedCornerImages, this.TextWriter);
	this.PastButton = this.SetTextButton(this.Specs.BUTTON.PAST, RaisedCornerImages, this.TextWriter);

	//Radio Options
	this.GameRadioOptions = this.SetRadioControls(this.Specs.RADIO.GAME, RadioOptionImage, this.TextWriter)
	this.GenderRadioOptions = this.SetRadioControls(this.Specs.RADIO.GENDER, RadioOptionImage, this.TextWriter)

	//Touch bar
	this.MonthsTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.MONTHS, this.Specs.TOUChBAR.MONTHS.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
*/
};
/*
TacticalIntroView.prototype.ShowControls = function() {  //UNLOGGED

	this.Controls.forEach(function(cntrl) {cntrl.DeActivate();});

	switch (this.State) {
		case this.Specs.STATE.OPEN:
			this.ShowOpenControls();
			break;
		case this.Specs.STATE.START:
			this.ShowStartControls();
			break;
		case this.Specs.STATE.INFO:
			this.PlayButton.Show();
			this.InfoButton.Show();
			break;
		case this.Specs.STATE.CHARACTER:
			this.OkButton.Show();
			this.CancelButton.Show();
			break;
		case this.Specs.STATE.PAST:
			this.ShowPastControls();
			break;
	}
};
*/
TacticalIntroView.prototype.Open = function() {  //UNLOGGED

	this.ColourScape(null, MAP.COLOUR.SEA);

	//TEMP - MOCK-UP (background)
	var Design = new GenieImage();
	Design.Set(this.Context, ImageManager.Pics[IMAGeINDEX.DESIGN], { L: 0, T: 0, W: 410, H: 270 } );
	this.Context.drawImage(Design.Pic, 6, 4, 381, 118, 10, 5, 381, 118);
	this.Context.drawImage(Design.Pic, 4, 130, 114, 138, 5, 255, 114, 138);
	this.Context.drawImage(Design.Pic, 123, 132, 117, 134, 277, 260, 117, 134);

	//TEMP - MOCK-UP
	var MockUp = new GenieImage();
	MockUp.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOCKUP1], { L: 2, T: 2, W: 331, H: 335 } );
	this.Context.drawImage(MockUp.Pic, 2, 2, 200, 150, 100, 125, 200, 150);
	TacticalScape.InfoBox.fillStyle = GREY.LIGHT;
	TacticalScape.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	TacticalScape.InfoBox.drawImage(MockUp.Pic, 204, 2, 124, 134, 35, 50, 124, 134);
	TacticalScape.ControlPanel.fillStyle = MAP.COLOUR.LAND;
	TacticalScape.ControlPanel.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	TacticalScape.ControlPanel.drawImage(MockUp.Pic, 2, 154, 146, 179, 0, 0, 146, 179);
	Text.Write("Click anywhere except", 125, 295);
	Text.Write("buttons to see design", 125, 312);
	Text.Write("screens.", 125, 329);

	GenieView.prototype.Open.call(this);
/*
	if (this.State==this.Specs.STATE.OPEN) {
		this.DailyDate = new Date();
		this.DailyDate.getTime();
		this.GameInfo = this.DailyDate.toDateString();
	}
*/
};
TacticalIntroView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		cancelAnimationFrame(this.AnimationFrameHandle);
/*
		Game.SetUp();
//		Map.DrawFullScreen();
		PlayerClan = Clans[0];		//TEMP - this will be selected in Intro sub-screen
		ScreenMapView.SetClan(PlayerClan);
		ScreenMapView.Open();
		ScreenMapView.Update();
//		this.TextWriter.Write("Map generated.", 5, 20);
*/
		this.ColourScape(null, MAP.COLOUR.SEA);
		Text.Write("Design screen start here.", 5, 20);
	}

	this.UpdateButtons();
/*
	if (this.State!=VIEW.INTRO.STATE.CHARACTER)
		this.UpdateInfoButton();
	if (this.State==VIEW.INTRO.STATE.START) {
		this.UpdateProfileButtons();
		this.UpdatePastButton();
		this.UpdateTurnButtons();
		this.UpdateRadioControl();
	}
	if (this.State==VIEW.INTRO.STATE.CHARACTER)
		this.UpdateCharacterControls();
	if (this.State==VIEW.INTRO.STATE.PAST)
		this.UpdatePastControls();
*/
};
/*
TacticalIntroView.prototype.Draw = function() {  //UNLOGGED

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);

	this.TextWriter.SetColour("white");
	this.TextWriter.Write("Welcome to the planet Dominion,", 96, 90);
	this.TextWriter.Write("colonized by Dominion Corp. The", 96, 107);
	this.TextWriter.Write("company has decided to quit the", 96, 124);
	this.TextWriter.Write("colony, and leave its 101 nations", 96, 141);
	this.TextWriter.Write("to pick a leader themselves.", 96, 158);
	this.TextWriter.ResetColour();

//	this.Update();
};
*/
/*
TacticalIntroView.prototype.OpenGuideView = function() {  //UNLOGGED

	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
};
*/
/*
TacticalIntroView.prototype.OpenMapView = function() {  //UNLOGGED

	ChoiceView.SetNation(PlayerPower);
	GazetteerInfoView.MainView = ChoiceView;
	ChoiceView.Open();
	ChoiceView.Update();
};
*/
TacticalIntroView.prototype.UpdateButtons = function() {  //UNLOGGED

	if (this.DailyButton.CheckClicked())
		alert("Not yet avaliable.");

	if (this.RandomButton.CheckClicked())
		this.Close(this.OpenScreenMapView.bind(this), 100);

	if (this.GuideButton.CheckClicked())
		alert("Not yet avaliable.");
};
TacticalIntroView.prototype.OpenScreenMapView = function() {  //UNLOGGED

	Game.SetUp();
	PlayerClan = Clans[0];		//TEMP - this will be selected in Intro sub-screen
	ScreenMapView.SetClan(PlayerClan);
	ScreenMapView.Open();
	ScreenMapView.Update();
};
