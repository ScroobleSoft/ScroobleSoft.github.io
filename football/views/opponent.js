/*
 *  will include scouting report on playing style and substitution pattern
 *  will show team and formation from last game
 *  NOTE: idea right now is for this tab to have a different visual style from Formation one, thus justifying it existing separately,
 *	  although there will surely be an overlap that needs to be resolved
 ** players optionally sorted by Position or Quality
 ** need to show price? sort by it?
 */
//------------------------------------------------------
//---------- FOOTBALL OPPONENT VIEW --------------------
var FootballOpponentSubView = function() {
	var Team;
	var OpponentButtonImages, OpponentNameImages, OpponentButtonPanel;
	var ArrowImage;
	var Left, Top, Gap;

	var OpponentSelected;		//index
};
FootballOpponentSubView.prototype = new GenieNestedView();
FootballOpponentSubView.prototype.Set = function(cnvs, specs, tView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, tView);

	if (Game.CheckMobile()) {
		this.Left = 0;
		this.Top = 0;
		this.Gap = 14;
		this.Specs.BUTTOnPANEL.OPPONENT.L = 20;
	} else {
		this.Left = 400;
		this.Top = 40;
		this.Gap = 15;
	}
};
FootballOpponentSubView.prototype.SetControls = function() {

	this.OpponentButtonImages = new GenieImage();
	this.OpponentButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.BUTTOnPANEL.OPPONENT.IMAGE.BUTTON);
	this.OpponentNameImages = new GenieImage();
	this.OpponentNameImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.BUTTOnPANEL.OPPONENT.IMAGE.NAME);
	this.OpponentButtonPanel = new FootballOpponentButtonPanel();
	this.OpponentButtonPanel.Set(this.Canvas, this.Specs.BUTTOnPANEL.OPPONENT, this.OpponentButtonImages);
	this.OpponentButtonPanel.SetExtraLinks(this.OpponentNameImages);
	this.Controls.push(this.OpponentButtonPanel);
};
FootballOpponentSubView.prototype.SetImages = function() {

	this.ArrowImage = new GenieImage();
	this.ArrowImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.ARROW);
};
FootballOpponentSubView.prototype.SetTeam = function(team) {

	this.Team = team;
	this.OpponentButtonPanel.SetTeam(this.Team.Index);
};
FootballOpponentSubView.prototype.Open = function() {

//		this.OpponentSelected = TeamSelected.Schedule.LeagueGames[0];		. . . Schedule will be replace by Fixtures, plus other changes
	this.OpponentSelected = 0;		//TEMP (until fixture list is generated)

	GenieNestedView.prototype.Open.call(this);
		//TODO: should show some team info below player list, such as attendance, league position, maybe revenue reserves, etc.
	this.Update();
};
FootballOpponentSubView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.OpponentButtonPanel.CheckButtonPressed())
		if (this.OpponentButtonPanel.ButtonPressed!=this.OpponentSelected) {
			this.OpponentSelected = this.OpponentButtonPanel.ButtonPressed;
			this.DisplayOpponent();
		}
};
FootballOpponentSubView.prototype.Draw = function() {

	if (Game.CheckMobile())
		this.ColourScape(null, this.Specs.COLOUR);
	this.DisplayOpponent();
};
FootballOpponentSubView.prototype.DisplayOpponent = function() {
	var i;
	var plyr;
	var grade;

	//Clear background
	if (Game.CheckMobile()) {
		this.Context.fillStyle = this.Specs.COLOUR;
		this.Context.fillRect(0, 40, 20, 325);
		this.Context.fillRect(145, 0, 250, 400);
	} else {
		this.Context.fillStyle = FOOTBALL.TAB.COLOUR.MAGENTA;
		this.Context.fillRect(400, 40, 20, 400);
		this.Context.fillRect(545, 40, 250, 410);
	}

	//TODO: draw column, erasing prior arrow
	if (this.OpponentSelected<this.Team.Index)
		this.ArrowImage.Draw(this.Left+4, 42+(this.Specs.BUTTOnPANEL.OPPONENT.BUTTON.H*this.OpponentSelected));
	else
		this.ArrowImage.Draw(this.Left+4, 42+(this.Specs.BUTTOnPANEL.OPPONENT.BUTTON.H*(this.OpponentSelected-1)));

	this.TextWriter.SetColour(this.Specs.TEXT.COLOUR);
	for (i=0;i<Teams[this.OpponentSelected].Squad.Players.length;++i) {	//HARD-CODING in loop
		plyr = Teams[this.OpponentSelected].Squad.Players[i];
		if (plyr.CheckInjured())
			InjuredImage.Draw(this.Left+135, this.Top+(this.Gap*(i+1))-12);
		this.TextWriter.Write(plyr.Name.GetFullName(), this.Left+150, this.Top+(this.Gap*(i+1)));
		this.TextWriter.Write(plyr.Age, this.Left+300, this.Top+(this.Gap*(i+1)));
		this.TextWriter.Write(plyr.Position, this.Left+330, this.Top+(this.Gap*(i+1)));
		grade = Utils.NumberToGrade(plyr.Quality);
		this.TextWriter.Write(grade, this.Left+370, this.Top+(this.Gap*(i+1)));
	}
	this.TextWriter.ResetColour();
};
