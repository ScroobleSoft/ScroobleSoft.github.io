
//----------------------------------------------------
//---------- GRIDIRON LEAGUE VIEW --------------------
var GridironLeagueView = function() {
	var TeamButtons;

	var i;
};
GridironLeagueView.prototype = new GenieView();
GridironLeagueView.prototype.Set = function(cnvs, specs, gTool, tWriter, rGenerator) {

	this.GraphicsTool = gTool;
	this.TextWriter = tWriter;
	this.Randomizer = rGenerator;

	GenieView.prototype.Set.call(this, cnvs, specs);
};
GridironLeagueView.prototype.SetControls = function() {
	var i;
	var l, t;
	var sx, sy;
	var specs;

	this.TeamButtons = ArrayUtils.Create(LEAGUE.TEAMS, ImageButton);
	for (i=0;i<LEAGUE.TEAMS;++i) {
		l = this.Specs.BUTTON.TEAM.L + (140*(i % Math.round(this.Specs.BUTTON.TEAM.C)));
		t = this.Specs.BUTTON.TEAM.T + (60*Math.floor(i/this.Specs.BUTTON.TEAM.C));
		if (i>=LEAGUE.TEAMS/2)
			t += 40;
		sx = 1 + ((this.Specs.IMAGE.HELMET.W+this.Specs.IMAGE.HELMET.O)*(i % Math.round(LEAGUE.TEAMS/4)));
		sy = 1 + ((this.Specs.IMAGE.HELMET.H+this.Specs.IMAGE.HELMET.O)*Math.floor(i/(LEAGUE.TEAMS/4)));
		specs = { L: l, T: t, W: this.Specs.BUTTON.TEAM.W, H: this.Specs.BUTTON.TEAM.H, LW: this.Specs.BUTTON.TEAM.LW, SX: sx, SY: sy,
					 STYLE: this.Specs.BUTTON.TEAM.STYLE };
		this.TeamButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.TeamButtons[i].SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.TeamButtons[i]);
	}
};
GridironLeagueView.prototype.Open = function() {

	if (Game.Type!=ZFL.TYPE.RANDOM) {
		this.GenerateLeague();
		this.SimSeason();
		this.ConsoleView.DisplayStarterThumbnails();
	}

	GenieView.prototype.Open.call(this);

	this.Update();
};
GridironLeagueView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	//Check team selected
	if (this.UpdateTeamButtons()!=-1)
		this.SelectLeague();

	//Check load game request
	if (this.UpdateLoadGame())
		this.LoadLeague();
};
/*  needs DE-LOGGING
GridironLeagueView.prototype.Close = function() {

	cancelAnimationFrame(this.AnimationFrameHandle);

	//Remove controls
	this.TeamButtons.forEach(function(button) {button.Enabled = false;});
	this.LeagueTouchBar.Enabled = false;
	this.GameRadioOptions.Enabled = false;
	this.DifficultyTouchBar.Enabled = false;

	this.Context.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	this.InfoScape.Context.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.ConsoleScape.Context.clearRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);

	TeamView.SetTeam(PlayerTeam);
//		document.getElementById("LoadButton").disabled = true;

	setTimeout(this.Exit.bind(this), 50);
};
*/
GridironLeagueView.prototype.Draw = function() {
	//UNLOGGED
	var i;

	//Titles
	this.TextWriter.Write("TDFC Teams:", 35, 35, { FONT: "bold 18px Arial" } );
	this.TextWriter.Write("SMFC Teams:", 35, 315, { FONT: "bold 18px Arial" } );

	//Buttons and labels
	for (i=0;i<this.TeamButtons.length;++i) {
		this.TextWriter.Write(TeamNames[i][TEAM.CITY], this.TeamButtons[i].Specs.L+40, this.TeamButtons[i].Specs.T+12);
		this.TextWriter.Write(TeamNames[i][TEAM.NICkNAME], this.TeamButtons[i].Specs.L+40, this.TeamButtons[i].Specs.T+32);
	}
};
GridironLeagueView.prototype.UpdateTeamButtons = function() {

	for (this.i=0;this.i<this.TeamButtons.length;++this.i)
		if (this.TeamButtons[this.i].CheckClicked()) {
			PlayerTeam = Teams[this.i];
			return (this.i);
		}

	return (-1);
};
GridironLeagueView.prototype.UpdateLoadGame = function() {

	if (Game.Load) {
		Game.Load = false;
		if ( LeagueDataArea.CheckEmpty() || RosterDataArea.CheckEmpty() || FADataArea.CheckEmpty() )
			alert("Please enter data");
		else
			return (true);
	}

	return (false);
};
GridironLeagueView.prototype.SelectLeague = function() {
	var i;
	var num;
	var rstr;
	var rcrd;

	if (Game.Type==ZFL.TYPE.RANDOM) {
		League.Type = this.ConsoleView.LeagueTouchBar.SelectedKey;
		League.Options = this.ConsoleView.GameRadioOptions.Selected;
		for (i=0;i<LEAGUE.TEAMS;++i) {
			if (i==PlayerTeam.Index) {
				PlayerTeam.SetSystems(this.ConsoleView.LeagueTouchBar.SelectedKey, this.ConsoleView.LeagueTouchBar.SelectedKey);
				PlayerTeam.Roster.Generate();
			} else
				Teams[i].Generate();
		}
		FreeAgency.SortGridders();
	} else {  //NOTE: Teams[0]'s roster will always be used
		if (PlayerTeam.Index!=0) {
			rstr = PlayerTeam.Roster;
			num = PlayerTeam.DraftPosition;
			rcrd = PlayerTeam.Record;
			PlayerTeam.Roster = Teams[0].Roster;
			PlayerTeam.Roster.Team = PlayerTeam;
			PlayerTeam.PracticeSquad.Team = PlayerTeam;
			PlayerTeam.ResetGridders();
			PlayerTeam.DraftPosition = Teams[0].DraftPosition;
			PlayerTeam.Record = Teams[0].Record;
			Teams[0].Roster = rstr;
			Teams[0].Roster.Team = Teams[0];
			Teams[0].PracticeSquad.Team = Teams[0];
			Teams[0].ResetGridders();
			Teams[0].DraftPosition = num;
			Teams[0].Record = rcrd;
		}
	}

	Draft.SetSelectionOrder();  //TODO: additional code is needed if future picks are traded
/*
	 if (League.Type)
		 NFLUtils.ConfigureNomenclature(PlayerTeam);
	 League.SimSeason();
*/
	League.Dump();
	this.Close(this.OpenTeamView.bind(this), 100);
};
GridironLeagueView.prototype.GenerateLeague = function() {  //NOTE: for scheduled games

	League.Type = LEAGUE.ZFL;
	League.Options = ROSTER.DISTRIBUTION.RANDOM;
	this.Randomizer.SaveSeeds();
	this.Randomizer.SetSeeds(Daily[0][0], Daily[0][0]+1);
	Teams.forEach(function(team) {team.Generate();});
	this.Randomizer.RestoreSeeds();
	FreeAgency.SortGridders();
	League.Dump();
};
GridironLeagueView.prototype.SimSeason = function() {
	var i, j;
	var num;
	var nHomeQuality, nVisitorsQuality;
	var iTeams;

	this.Randomizer.SaveSeeds();
	this.Randomizer.SetSeeds(Daily[0][0], Daily[0][0]+1);

	iTeams = new Array(LEAGUE.TEAMS);
	for (i=0;i<SEASON.GAMES;++i) {

		this.Randomizer.Shuffle(iTeams, INITIALIZE);

		//Simulate games and update records
		for (j=0;j<iTeams.length;j+=2) {
			nHomeQuality = Teams[iTeams[j]].Roster.GetCumulativeQuality();
			nVisitorsQuality = Teams[iTeams[j+1]].Roster.GetCumulativeQuality();
			num = this.GetWinningTeam(nHomeQuality, nVisitorsQuality);
			if (num==0) {
				++Teams[iTeams[j]].Record.W;
				++Teams[iTeams[j+1]].Record.L;
			} else if (num==1) {
				++Teams[iTeams[j]].Record.L;
				++Teams[iTeams[j+1]].Record.W;
			} else {
				++Teams[iTeams[j]].Record.T;
				++Teams[iTeams[j+1]].Record.T;
			}
		}
	}

	this.Randomizer.RestoreSeeds();
};
GridironLeagueView.prototype.GetWinningTeam = function(hTeam, vTeam) {
	var hWins, vWins;

	hWins = 0;
	vWins = 0;
	for (this.i=0;this.i<144;++this.i)
		if (this.Randomizer.GetWinner(hTeam, vTeam, INVERTED)==0)
			++hWins;
		else
			++vWins;

	if (hWins>vWins)
		return (0);
	else if (vWins>hWins)
		return (1);
	else
		return (2);
};
GridironLeagueView.prototype.LoadLeague = function() {

	League.Load();
	//-do some book-keeping depending on game state, such as generating draft prospects
	this.Close(this.OpenTeamView.bind(this), 100);
};
GridironLeagueView.prototype.OpenTeamView = function() {

	TeamView.SetTeam(PlayerTeam);
	TeamView.Open();
};
