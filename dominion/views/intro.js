
//---------------------------------------------------
//---------- DOMINION INTRO VIEW --------------------  NOTE: ramdomly determined whether male or female head of state is shown first
var DominionIntroView = function() {
	var DailyButton, FreeFormButton, MultiChoiceButton, SurvivalButton, PlayButton, GuideButton, InfoButton;										//open page
	var PickMaleButton, ModifyMaleButton, PickFemaleButton, ModifyFemaleButton, ShortButton, MediumButton, LongButton, PastButton;		//start page
	var GameRadioOption, FemaleFirstFlag, LeaderPickedFlag, PastGamesFlag, MaleX, FemaleX, DailyDate, GameInfo;									//start page
	var OkButton, CancelButton;																																			//character page
	var GenderRadioOptions, MonthsTouchBar, CellImage, SelectionImage, DeselectionImage, GenderFlag;												//past page
	var PastGameDate, SelectedSlot, StartingSlot, EndingSlot, PastGameIndex, FirstDayIndex;															//past page
	var MaleName, FemaleName, MaleProfile, FemaleProfile, SelectedName, SelectedProfile;																//open page
	var InfoCount;																																								//info page
};
DominionIntroView.prototype = new GenieView();
DominionIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.OPEN;
	this.InfoCount = 0;
	this.GenderFlag = GENDER.FEMALE;
};
DominionIntroView.prototype.SetImages = function() {

	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
	this.DeselectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DESELECTION);
};
DominionIntroView.prototype.SetControls = function() {

	//Choice
	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.FreeFormButton = this.SetTextButton(this.Specs.BUTTON.FREeFORM, RaisedCornerImages, this.TextWriter);
	this.MultiChoiceButton = this.SetTextButton(this.Specs.BUTTON.MULTiCHOICE, RaisedCornerImages, this.TextWriter);
	this.SurvivalButton = this.SetTextButton(this.Specs.BUTTON.SURVIVAL, RaisedCornerImages, this.TextWriter);
	this.PlayButton = this.SetTextButton(this.Specs.BUTTON.PLAY, RaisedCornerImages, this.TextWriter);
	this.GuideButton = this.SetTextButton(this.Specs.BUTTON.GUIDE, RaisedCornerImages, this.TextWriter);
	this.InfoButton = this.SetTextButton(this.Specs.BUTTON.INFO, RaisedCornerImages, this.TextWriter);

	//Head of state
	this.PickMaleButton = this.SetTextButton(this.Specs.BUTTON.PICkMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyMaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyMALE, RaisedCornerImages, this.TextWriter);
	this.PickFemaleButton = this.SetTextButton(this.Specs.BUTTON.PICkFEMALE, RaisedCornerImages, this.TextWriter);
	this.ModifyFemaleButton = this.SetTextButton(this.Specs.BUTTON.MODIFyFEMALE, RaisedCornerImages, this.TextWriter);

	//Game Options
	this.ShortButton = this.SetTextButton(this.Specs.BUTTON.SHORT, RaisedCornerImages, this.TextWriter);
	this.MediumButton = this.SetTextButton(this.Specs.BUTTON.MEDIUM, RaisedCornerImages, this.TextWriter);
	this.LongButton = this.SetTextButton(this.Specs.BUTTON.LONG, RaisedCornerImages, this.TextWriter);
	this.PastButton = this.SetTextButton(this.Specs.BUTTON.PAST, RaisedCornerImages, this.TextWriter);

	//Profile
	this.OkButton = this.SetTextButton(this.Specs.BUTTON.OK, RaisedCornerImages, this.TextWriter);
	this.CancelButton = this.SetTextButton(this.Specs.BUTTON.CANCEL, RaisedCornerImages, this.TextWriter);

	//Radio Options
	this.GameRadioOptions = this.SetRadioControls(this.Specs.RADIO.GAME, RadioOptionImage, this.TextWriter)
	this.GenderRadioOptions = this.SetRadioControls(this.Specs.RADIO.GENDER, RadioOptionImage, this.TextWriter)

	//Touch bar
	this.MonthsTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.MONTHS, this.Specs.TOUChBAR.MONTHS.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
DominionIntroView.prototype.ShowControls = function() {

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
DominionIntroView.prototype.SetDailyCharacters = function() {
	var i;
	var nDays;
	var mName, fName, mProfile, fProfile;

	this.Randomizer.SetStringSeed("Dominion");

	nDays = Calendar.GetScheduledGames();
	Game.DailyCharacters = new Array(nDays);
	for (i=0;i<nDays;++i) {
		mName = CharacterGenerator.GenerateMaleName();
		fName = CharacterGenerator.GenerateFemaleName();
		mProfile = CharacterGenerator.GenerateMaleProfile();
		fProfile =  CharacterGenerator.GenerateFemaleProfile();
		Game.DailyCharacters[i] = { Male: { Name: mName, Profile: mProfile }, Female: { Name: fName, Profile: fProfile } };
	}

	this.Randomizer.ResetSeeds();
};
DominionIntroView.prototype.Open = function() {
	GenieView.prototype.Open.call(this);

	this.SetDailyCharacters();
	if (this.State==this.Specs.STATE.OPEN) {
		this.DailyDate = new Date();
		this.DailyDate.getTime();
		this.GameInfo = this.DailyDate.toDateString();
	}
};
DominionIntroView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdatePlayButtons();
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
};
DominionIntroView.prototype.Draw = function() {

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
DominionIntroView.prototype.OpenGlobalView = function() {  //UNLOGGED - probably REDUNDANT

	GlobalView.SetNation(PlayerPower);
	GlobalView.Open();
	GlobalView.Update();
};
DominionIntroView.prototype.OpenAssetsView = function() {

	++Game.Phase;
	AssetsView.SetNation(PlayerPower);
	WorldMap.SelectNation(PlayerPower);
	AssetsView.Open();
	AssetsView.Update();
};
DominionIntroView.prototype.OpenSolicitationView = function() {

	SolicitationView.Open();
	SolicitationView.Update();
};
DominionIntroView.prototype.OpenOfficeView = function() {

	OfficeView.SetNation(PlayerPower);
	OfficeView.Open();
};
DominionIntroView.prototype.OpenGuideView = function() {

	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
};
DominionIntroView.prototype.OpenChoiceView = function() {  //UNLOGGED

	ChoiceView.SetNation(PlayerPower);
	ChoiceView.Open();
	ChoiceView.Update();
};
