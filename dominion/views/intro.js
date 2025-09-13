
//---------------------------------------------------
//---------- DOMINION INTRO VIEW --------------------  NOTE: ramdomly determined whether male or female head of state is shown first
var DominionIntroView = function() {
	var DailyButton, FreeFormButton, MultiChoiceButton, SurvivalButton, PlayButton, GuideButton, InfoButton;
	var PickMaleButton, ModifyMaleButton, PickFemaleButton, ModifyFemaleButton;
	var ShortButton, MediumButton, LongButton;
	var GameRadioOptions, PastButton;
	var OkButton, CancelButton;
	var FemaleFirstFlag, PastGamesFlag, LeaderPickedFlag;
	var MaleX, FemaleX;
	var MaleName, FemaleName, MaleProfile, FemaleProfile;
	var GameInfo, InfoCount;
};
DominionIntroView.prototype = new GenieView();
DominionIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.OPEN;
	this.InfoCount = 0;
};
DominionIntroView.prototype.Open = function() {
	var date;

	GenieView.prototype.Open.call(this);

	if (this.State==this.Specs.STATE.OPEN) {
		date = new Date();
		date.getTime();
		this.GameInfo = date.toDateString();
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
DominionIntroView.prototype.DisplayInfo = function() {

	this.GraphicsTool.DrawRectangle(80, 50, 240, 260, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(80, 50, 240, 300, "white", 3);

	this.TextWriter.SetColour("white");

	this.TextWriter.WriteParagraphs(IntroInfo[this.InfoCount], 87, 68, null, null, 6)

	this.TextWriter.ResetColour();
};
DominionIntroView.prototype.SetProfiles = function() {

	if (this.Randomizer.CheckBoolean()) {		//male first
		this.MaleX = 70;
		this.FemaleX = 210;
	} else {												//female first
		this.FemaleFirstFlag = true;
		this.MaleX = 210;
		this.FemaleX = 70;
	}
};
DominionIntroView.prototype.DisplayProfiles = function() {
	var x;
	var date;

	this.GraphicsTool.DrawRectangle(50, 50, 300, 300, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(50, 50, 300, 300, "white", 3);

	//Male
	CharacterGenerator.GenerateMaleProfile();
	this.MaleProfile = CharacterGenerator.Profile;
	CharacterGenerator.SetNation(PlayerPower);
	this.GraphicsTool.DrawRectangle(this.MaleX, 70, 100, 100, "rgb(175,239,255)", 0);
	this.GraphicsTool.DrawRectangle(this.MaleX-3, 67, 106, 106, "black", 3);
	CharacterGenerator.Draw(this.MaleX, 70);
	this.MaleName = CharacterGenerator.GenerateName() + " " + CharacterGenerator.GenerateName();
	x = (106-StringUtils.GetTextWidth(this.MaleName, null, this.Context))/2;
	this.TextWriter.Write(this.MaleName, this.MaleX+x-3, 188, { COLOUR: "white" } );

	//Female
	CharacterGenerator.GenerateFemaleProfile();
	this.FemaleProfile = CharacterGenerator.Profile;
	CharacterGenerator.SetNation(PlayerPower);
	this.GraphicsTool.DrawRectangle(this.FemaleX, 70, 100, 100, "rgb(175,239,255)", 0);
	this.GraphicsTool.DrawRectangle(this.FemaleX-3, 67, 106, 106, "black", 3);
	CharacterGenerator.Draw(this.FemaleX, 70);
	this.FemaleName = CharacterGenerator.GenerateName() + "a " + CharacterGenerator.GenerateName();
	x = (106-StringUtils.GetTextWidth(this.FemaleName, null, this.Context))/2;
	this.TextWriter.Write(this.FemaleName, this.FemaleX+x-3, 188, { COLOUR: "white" } );

	//Daily game info
	if (Game.Type==DOMINION.GAME.DAILY) {
		this.GraphicsTool.DrawRectangle(60, 235, 125, 100, "white", 2);
		this.GraphicsTool.DrawRectangle(70, 235, 50, 10, this.Specs.COLOUR, 0);
		this.TextWriter.Write("Game", 75, 240, { COLOUR: "white" } );
		if (this.PastGamesFlag) {
			this.TextWriter.Write("Past", 70, 262, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
			//-name of game chosen
		} else {
			this.TextWriter.Write("Daily", 70, 262, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
			this.TextWriter.Write(this.GameInfo, 70, 286, { COLOUR: "white" } );
		}
	}

	//Game options
	if (Game.Type==DOMINION.GAME.DAILY)
		x = 90;
	else
		x = 0;
	this.TextWriter.Write("Votes", 210+x, 240, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("20", 220+x, 267, { COLOUR: "white" } );
	this.TextWriter.Write("35", 220+x, 297, { COLOUR: "white" } );
	this.TextWriter.Write("50", 220+x, 327, { COLOUR: "white" } );
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

	GuideView.Open();
	GuideView.Update();
};
