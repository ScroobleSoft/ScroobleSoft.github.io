
//-play button, sim button, options to sim a batch of games at once (2/4, e.g.), rest of season
//-also details about outcome(s) in shape of stats (time of possession)
//-since Info View will contain player list, so team ratings and records could be here

//------------------------------------------------------------
//---------- GRIDIRON SEASON CONSOLE VIEW --------------------
var GridironSeasonConsoleView = function() {
	var PlayButton, NextButton, ExitButton, HelpButton, MatchUpsButton, StatsButton;
	var SimRadioControls;
	var QuarterGauges;
};
GridironSeasonConsoleView.prototype = new GenieSubView();
GridironSeasonConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.State = this.MainView.Specs.STATE.MATCH;
};
GridironSeasonConsoleView.prototype.SetControls = function() {

	this.PlayButton = this.SetImageButton(this.Specs.BUTTON.PLAY, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NextButton = this.SetImageButton(this.Specs.BUTTON.NEXT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.ExitButton = this.SetTextButton(this.Specs.BUTTON.EXIT, RaisedCornerImages, Text);
	this.HelpButton = this.SetTextButton(this.Specs.BUTTON.HELP, RaisedCornerImages, Text);
	this.MatchUpsButton = this.SetTextButton(this.Specs.BUTTON.MATChUPs, RaisedCornerImages, Text);
	this.StatsButton = this.SetTextButton(this.Specs.BUTTON.STATS, RaisedCornerImages, Text);
	this.SimRadioControls = this.SetRadioControls(this.Specs.RADIO.SIM, RadioOptionImage, Text);
	this.SetGauges();
};
GridironSeasonConsoleView.prototype.SetGauges = function() {
	var i;
	var specs;

	this.QuarterGauges = ArrayUtils.Create(MATCH.QUARTERS, GenieGauge);
	for (i=0;i<MATCH.QUARTERS;++i) {
		specs = { L: this.Specs.GAUGE.QUARTER.L, T: this.Specs.GAUGE.QUARTER.T+(this.Specs.GAUGE.QUARTER.GAP*i), W: this.Specs.GAUGE.QUARTER.W,
						H: this.Specs.GAUGE.QUARTER.H, COLOUR: this.Specs.GAUGE.QUARTER.COLOUR, ORIENTATION: this.Specs.GAUGE.QUARTER.ORIENTATION };
		this.QuarterGauges[i].Set(this.Canvas, specs);
		this.QuarterGauges[i].SetLinks(Graphics);
		this.Controls.push(this.QuarterGauges[i]);
	}
};
GridironSeasonConsoleView.prototype.ShowControls = function() {

	this.ExitButton.Show();
	this.HelpButton.Show();
	this.SimRadioControls.Show();
	this.QuarterGauges.forEach( function(gauge) {gauge.Show();} );
	if (this.State==this.MainView.Specs.STATE.MATCH) {
		this.PlayButton.Show();
		this.MatchUpsButton.Show();
	} else {
		this.NextButton.Show();
		this.StatsButton.Show();
	}
};
GridironSeasonConsoleView.prototype.Open = function() {  //UNLOGGED - TEMP
	GenieSubView.prototype.Open.call(this);

	League.GamesPlayed = 0;
};
GridironSeasonConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.PlayButton.CheckClicked()) {  //TODO; only implemented for full sim
		GameSim.RunMatch();
		this.MatchUpsButton.Hide();
		if (League.GamesPlayed % 2)
			this.MainView.DisplayScore(League.GamesPlayed, Scorecard.Score.Home, Scorecard.Score.Visitor);
		else
			this.MainView.DisplayScore(League.GamesPlayed, Scorecard.Score.Visitor, Scorecard.Score.Home);
		this.DisplayMVP();
		this.StatsButton.Show();
		if (League.GamesPlayed==SEASON.GAMES)
			this.PlayButton.Disable();
		else
			this.UpdateWeekNumber();
		this.State = this.MainView.Specs.STATE.NEXT;
		setTimeout(this.SwitchNextButton.bind(this), 100);
	}

	if (this.NextButton.CheckClicked()) {
		this.StatsButton.Hide();
		this.MatchUpsButton.Show();
		Scorecard.Reset();
		GameSim.Reset();
		this.MainView.UpdateGamesPlayed();
		this.State = this.MainView.Specs.STATE.MATCH;
		setTimeout(this.SwitchPlayButton.bind(this), 100);
	}

	if (this.MatchUpsButton.CheckClicked())
		this.MainView.OpenMatchUpsView();

	if (this.StatsButton.CheckClicked())
		this.MainView.OpenStatsView();
};
GridironSeasonConsoleView.prototype.Draw = function() {  //UNLOGGED
	var i;
	var cntxt;

	//-speed adjustment radio controls, maybe 3s per quarter, so 12 secs for whole game - maybe unnecessary
	//-drive outcome: points, yards, plays, 3 and out if so

	this.UpdateWeekNumber();

	//Labels
	cntxt = AbbreviationImages.Context;
	AbbreviationImages.SetContext(this.Context);
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 3, 41);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 3, 58);
	AbbreviationImages.SetContext(cntxt);

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(4, 77, 188, 37, "black", 1);							//big play frame
	Graphics.ResetContext(this.Context);

	Text.SetContext(this.Context);

	//Quarter numbers
	for (i=0;i<MATCH.QUARTERS;++i) {
		Text.Write((i+1), 57+(23*i), 35);
		Text.Write((i+1), 3, 133+(23*i));
	}

	Text.ResetContext();
};
GridironSeasonConsoleView.prototype.UpdateWeekNumber = function() {

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(0, 0, 70, 20, this.Specs.COLOUR, 0);
	Graphics.ResetContext();

	Text.SetContext(this.Context);
	Text.Write(("Week "+League.GamesPlayed+1), 5, 15);
	Text.ResetContext();
};
GridironSeasonConsoleView.prototype.UpdateDrive = function() {  //UNLOGGED

};
GridironSeasonConsoleView.prototype.DisplayMVP = function() {
	var plyr;
	var info;

	Text.SetContext(this.Context);
	Graphics.SetContext(this.Context);

	Graphics.DrawRectangle(5, 80, 186, 33, this.Specs.COLOUR, 0);
/*
	this.DisplayBigPlay(GameSim.HomeOffBigPlays, GameSim.HomeTeam.OffStarters, 10, 95)
	this.DisplayBigPlay(GameSim.HomeDefBigPlays, GameSim.HomeTeam.DefStarters, 103, 95)
	this.DisplayBigPlay(GameSim.VisitorOffBigPlays, GameSim.VisitorTeam.OffStarters, 10, 110)
	this.DisplayBigPlay(GameSim.VisitorDefBigPlays, GameSim.VisitorTeam.DefStarters, 103, 110)
*/
	Text.Write("Game MVP:", 7, 93);
	plyr = this.GetGameMVP();
//	Text.Write(TeamAbbreviations[plyr.Team.Index], 7, 110);
	info = TeamAbbreviations[plyr.Player.Team.Index] + ".";
//	Text.Write(Positions[plyr.Position], 43, 110);
	info += Positions[plyr.Player.Position] + ".";
//	Text.Write(plyr.Name.First[0]+plyr.Name.Last[0], 69, 110);
	info += plyr.Player.Name.First[0] + plyr.Player.Name.Last[0] + ".";
//	Text.Write(Utils.NumberToGrade(plyr.Quality), 94, 110);
	info += Utils.NumberToGrade(plyr.Player.Quality) + ".";
//	Text.Write(aPlays[iPlyr], 112, 110);
	info += plyr.Plays;
	Text.Write(info, 7, 108);

	Graphics.ResetContext();
	Text.ResetContext();
};
GridironSeasonConsoleView.prototype.DisplayBigPlay = function(aPlays, aStrtrs, x, y) {  //UNLOGGED - REDUNDANT
	var iPlyr;
	var plyr;
	var info;

	iPlyr = ArrayUtils.GetHighestIndex(aPlays);
	plyr = aStrtrs[iPlyr];
//	info = Positions[plyr.Position] + " " + Utils.NumberToGrade(plyr.Quality) + ": " + aPlays[iPlyr];
//	Text.Write(info, x, y);
	Text.Write(Positions[plyr.Position], x, y);
	Text.Write(plyr.Name.First[0]+plyr.Name.Last[0], x+22, y);
	Text.Write(Utils.NumberToGrade(plyr.Quality), x+44, y);
	Text.Write(aPlays[iPlyr], x+66, y);
};
GridironSeasonConsoleView.prototype.SwitchNextButton = function() {

	this.PlayButton.Hide();
	this.NextButton.Show();
};
GridironSeasonConsoleView.prototype.SwitchPlayButton = function() {

	this.NextButton.Hide();
	this.PlayButton.Show();
};
GridironSeasonConsoleView.prototype.GetGameMVP = function() {
	var hPairs, vPairs;

	hPlyr = this.GetTeamMVP(GameSim.HomeOffBigPlays, GameSim.HomeDefBigPlays, GameSim.HomeTeam);
	vPlyr = this.GetTeamMVP(GameSim.VisitorOffBigPlays, GameSim.VisitorDefBigPlays, GameSim.VisitorTeam);
	if (hPlyr.Plays<vPlyr.Plays)
		return (vPlyr);
	else
		return (hPlyr);
};
GridironSeasonConsoleView.prototype.GetTeamMVP = function(oPlys, dPlys, team) {
	var i;
	var plyr;
	var bPlays;

	bPlays = 0;
	for (i=0;i<OFFENSE.PLAYERS;++i) {
		if (oPlys[i]>bPlays) {
			plyr = team.OffStarters[i];
			bPlays = oPlys[i];
		}
		if (dPlys[i]>bPlays) {
			plyr = team.DefStarters[i];
			bPlays = dPlys[i];
		}
	}

	return ( { Player: plyr, Plays: bPlays } );
};
