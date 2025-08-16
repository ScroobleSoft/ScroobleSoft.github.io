/*
	NOTE: whether male or female head of state is shown first is determined randomly
*/
//----------------------------------------------------
//---------- DOMINION CHOICE VIEW --------------------
var DominionIntroView = function() {
	var DailyButton, FreeFormButton, MultiChoiceButton, PlayButton, InfoButton;
	var PickMaleButton, ModifyMaleButton, PickFemaleButton, ModifyFemaleButton;
	var ShortButton, MediumButton, LongButton;
	var PastButton;
	var OkButton, CancelButton;
	var FemaleFirstFlag, PastGamesFlag, LeaderPickedFlag;
	var MaleX, FemaleX;
	var MaleName, FemaleName, MaleProfile, FemaleProfile;
	var InfoCount;
};
DominionIntroView.prototype = new GenieView();
DominionIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.State = this.Specs.STATE.OPEN;
	this.InfoCount = 0;
};
DominionIntroView.prototype.SetControls = function() {

	//Choice
	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, this.TextWriter);
	this.FreeFormButton = this.SetTextButton(this.Specs.BUTTON.FREeFORM, RaisedCornerImages, this.TextWriter);
	this.MultiChoiceButton = this.SetTextButton(this.Specs.BUTTON.MULTiCHOICE, RaisedCornerImages, this.TextWriter);
	this.PlayButton = this.SetTextButton(this.Specs.BUTTON.PLAY, RaisedCornerImages, this.TextWriter);
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
};
DominionIntroView.prototype.ShowControls = function() {

	switch (this.State) {
		case this.Specs.STATE.OPEN:
			this.DailyButton.Show();
			this.FreeFormButton.Show();
			this.MultiChoiceButton.Show();
			this.InfoButton.Show();
			break;
		case this.Specs.STATE.START:
			this.PickMaleButton.Show();
			this.ModifyMaleButton.Show();
			this.PickFemaleButton.Show();
			this.ModifyFemaleButton.Show();
			this.MoveTurnButtons();
			this.ShortButton.Show();
			this.MediumButton.Show();
			this.LongButton.Show();
			if (!this.LeaderPickedFlag) {
				this.ShortButton.Disable();
				this.MediumButton.Disable();
				this.LongButton.Disable();
			}
			this.PastButton.Show();
			break;
		case this.Specs.STATE.INFO:
			this.PlayButton.Show();
			this.InfoButton.Show();
			break;
		case this.Specs.STATE.CHARACTER:
			this.OkButton.Show();
			this.CancelButton.Show();
	}
};
/*
DominionIntroView.prototype.Open = function() {  //UNLOGGED

	this.Draw();
	this.ShowControls();
};
*/
DominionIntroView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdatePlayButtons();
	if (this.State!=VIEW.INTRO.STATE.CHARACTER)
		this.UpdateInfoButton();
	if (this.State==VIEW.INTRO.STATE.START) {
		this.UpdateProfileButtons();
		this.UpdatePastButton();
		this.UpdateTurnButtons();
	}
	if (this.State==VIEW.INTRO.STATE.CHARACTER)
		this.UpdateCharacterControls();
};
DominionIntroView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(80, 80, 240, 240, "white", 3);

	this.TextWriter.SetColour("white");
	this.TextWriter.Write("Welcome to the planet Dominion,", 96, 105);
	this.TextWriter.Write("colonized by Dominion Corp. The", 96, 122);
	this.TextWriter.Write("company has decided to quit the", 96, 139);
	this.TextWriter.Write("colony, and leave its 101 nations", 96, 156);
	this.TextWriter.Write("to pick a leader themselves.", 96, 173);
	this.TextWriter.ResetColour();

	this.Update();
};
DominionIntroView.prototype.DisplayInfo = function() {

	this.GraphicsTool.DrawRectangle(80, 50, 240, 300, this.Specs.COLOUR, 0);
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
			date = new Date();
			date.getTime();
			this.TextWriter.Write(date.toDateString(), 70, 286, { COLOUR: "white" } );
		}
	}

	//Game options
	if (Game.Type==DOMINION.GAME.DAILY)
		x = 90;
	else
		x = 0;
	this.TextWriter.Write("Votes", 210+x, 240, { COLOUR: "white", STYLE: FONT.STYLE.UNDERLINED } );
	this.TextWriter.Write("17", 220+x, 267, { COLOUR: "white" } );
	this.TextWriter.Write("34", 220+x, 297, { COLOUR: "white" } );
	this.TextWriter.Write("51", 220+x, 327, { COLOUR: "white" } );
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
};
