
//----------------------------------------------------
//---------- GRIDIRON LEAGUE VIEW --------------------
var GridironLeagueView = function() {
	var TeamButtons;
	var ConferenceIconPanel;

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

	this.TeamButtons = ArrayUtils.Create(LEAGUE.TEAMS, ImageButton);
	if (Game.CheckPhone())
		this.SetPhoneButtons();
	else
		this.SetTabletButtons();

	if (Game.CheckPhone())
		this.ConferenceIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.CONFERENCE, this.Specs.ICOnPANEL.CONFERENCE.IMAGE, IconCornersImage,
																																	Graphics, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
GridironLeagueView.prototype.SetPhoneButtons = function() {
	var i;
	var l, t;
	var sx, sy;
	var specs;

	t = this.Specs.BUTTON.TEAM.PHONE.T;
	for (i=0;i<LEAGUE.TEAMS;++i) {
		l = this.Specs.BUTTON.TEAM.PHONE.L + (this.Specs.BUTTON.TEAM.PHONE.O*((i % 4) % this.Specs.BUTTON.TEAM.PHONE.C));
		if (i<LEAGUE.TEAMS/2) {
			if (l!=this.Specs.BUTTON.TEAM.PHONE.L)
				l += 3;
		} else {
			if (l!=this.Specs.BUTTON.TEAM.PHONE.L)
				l -= 3;
		}

		sx = 1 + ((this.Specs.IMAGE.HELMET.W+this.Specs.IMAGE.HELMET.O)*(i % Math.round(LEAGUE.TEAMS/4)));
		sy = 1 + ((this.Specs.IMAGE.HELMET.H+this.Specs.IMAGE.HELMET.O)*Math.floor(i/(LEAGUE.TEAMS/4)));
		specs = { L: l, T: t, W: this.Specs.BUTTON.TEAM.W, H: this.Specs.BUTTON.TEAM.H, LW: this.Specs.BUTTON.TEAM.LW, SX: sx, SY: sy,
					 STYLE: this.Specs.BUTTON.TEAM.STYLE };
		this.TeamButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.TeamButtons[i].SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.TeamButtons[i]);
		if (i==((LEAGUE.TEAMS/2)-1))
			t = this.Specs.BUTTON.TEAM.PHONE.T;
		else {
			if (i % 4==2)
				t += 40;
			else if (i % 4==3)
				t += 50;
		}
	}
};
GridironLeagueView.prototype.SetTabletButtons = function() {
	var i;
	var l, t;
	var sx, sy;
	var specs;

	for (i=0;i<LEAGUE.TEAMS;++i) {
		l = this.Specs.BUTTON.TEAM.L + (140*(i % this.Specs.BUTTON.TEAM.C));
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
GridironLeagueView.prototype.ShowControls = function() {  //UNLOGGED

	if (Game.CheckPhone())
		this.ConferenceIconPanel.Show();
	this.ShowButtons();
};
GridironLeagueView.prototype.ShowButtons = function() {  //UNLOGGED
	var i;

	if (Game.CheckPhone()) {
		if (this.ConferenceIconPanel.DepressedIcon==0)
			for (i=0;i<LEAGUE.TEAMS/2;++i)
				this.TeamButtons[i].Show();
		else
			for (i=LEAGUE.TEAMS/2;i<LEAGUE.TEAMS;++i)
				this.TeamButtons[i].Show();
	} else
		this.TeamButtons.forEach( function(btn) {btn.Show();} );
};
GridironLeagueView.prototype.Open = function() {

	if (Game.Type!=ZFL.TYPE.RANDOM) {
		this.GenerateLeague();
//		this.ConsoleView.DisplayStarterThumbnails();		REDUNDANT
	}

	GenieView.prototype.Open.call(this);
};
GridironLeagueView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Game.CheckPhone())
		this.UpdatePhone();
	else {
		if (this.UpdateTeamButtons()!=-1) {			//check team selected
			this.SelectLeague();
			this.Close(this.OpenTeamView.bind(this), 100);
		}

		if (this.UpdateLoadGame())						//check load game request - for PC only
			this.LoadLeague();
	}
};
GridironLeagueView.prototype.UpdatePhone = function() {

	if (this.ConferenceIconPanel.CheckIconChanged()) {
		this.TeamButtons.forEach( function(btn) {btn.Hide();} );
		Graphics.DrawRectangle(0, 0, 280, 400, this.Specs.COLOUR, 0);
		Graphics.DrawRectangle(280, 35, 120, 365, this.Specs.COLOUR, 0);
		this.Draw();
		this.ShowButtons();
	}

	if (this.UpdateTeamButtons()!=-1) {			//check team selected
		this.SelectLeague();
		this.Close(this.OpenRosterView.bind(this), 100);
	}
};
GridironLeagueView.prototype.Draw = function() {

	if (Game.CheckPhone())
		this.DrawPhone();
	else
		this.DrawTablet();
};
GridironLeagueView.prototype.DrawPhone = function() {
	var i;
	var ofst;

	//Titles
	if (this.ConferenceIconPanel.DepressedIcon==0) {
		this.TextWriter.Write("TDFC", this.Specs.LABEL.PHONE.X, this.Specs.LABEL.PHONE.Y, { FONT: "bold 14px Arial" } );
		this.TextWriter.Write("(Touchdown Football Conference):", this.Specs.LABEL.PHONE.X, this.Specs.LABEL.PHONE.Y+15, { FONT: "bold 14px Arial" } );
		ofst = 0;
	} else {
		this.TextWriter.Write("SMFC", this.Specs.LABEL.PHONE.X, this.Specs.LABEL.PHONE.Y, { FONT: "bold 14px Arial" } );
		this.TextWriter.Write("(Smash Mouth Football Conference):", this.Specs.LABEL.PHONE.X, this.Specs.LABEL.PHONE.Y+15, { FONT: "bold 14px Arial" } );
		ofst = LEAGUE.TEAMS/2;
	}

	//Division names and sections
	for (i=0;i<LEAGUE.DIVISIONS;++i) {
		Graphics.DrawRectangle(5, 40+(90*i), 395, 85, PAINT.SEA, 0);
		Text.Write(DivisionNames[i]+" Division", 265, 115+(90*i), { FONT: "bold 14px Arial" } );
	}

	//Buttons labels
	for (i=0;i<this.TeamButtons.length/2;++i) {
		this.TextWriter.Write(TeamNames[i+ofst][TEAM.CITY], this.TeamButtons[i+ofst].Specs.L+40, this.TeamButtons[i+ofst].Specs.T+12);
		this.TextWriter.Write(TeamNames[i+ofst][TEAM.NICkNAME], this.TeamButtons[i+ofst].Specs.L+40, this.TeamButtons[i+ofst].Specs.T+32);
	}
};
GridironLeagueView.prototype.DrawTablet = function() {  //UNLOGGED
	var i;

	//Titles
	this.TextWriter.Write("TDFC (Touchdown Football Conference) Teams:", this.Specs.LABEL.TABLET.TDFC.X, this.Specs.LABEL.TABLET.TDFC.Y,
																																					{ FONT: "bold 18px Arial" } );
	this.TextWriter.Write("SMFC (Smash Mouth Football Conference) Teams:", this.Specs.LABEL.TABLET.SMFC.X, this.Specs.LABEL.TABLET.SMFC.Y,
																																					{ FONT: "bold 18px Arial" } );

	//Buttons labels
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
	if (Game.CheckPC())
		League.Dump();
};
GridironLeagueView.prototype.GenerateLeague = function() {  //NOTE: for scheduled games

	League.Type = LEAGUE.ZFL;
	League.Options = ROSTER.DISTRIBUTION.RANDOM;
	this.Randomizer.SaveSeeds();
	this.Randomizer.SetSeeds(Daily[0][0], Daily[0][0]+1);
//		var dt = new Date();
//		this.Randomizer.SetDailySeed(dt);
	Teams.forEach(function(team) {team.Generate();});
	League.SimulateSeason(RANDOM);
	Draft.Generate();
	this.Randomizer.RestoreSeeds();
	FreeAgency.SortGridders();
	if (Game.CheckPC())
		League.Dump();
};
GridironLeagueView.prototype.SimSeason = function() {  //REDUNDANT
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
GridironLeagueView.prototype.OpenRosterView = function() {

	RosterView.SetRoster(PlayerTeam.Roster);
	SquadConsoleView.SetSquad(PlayerTeam.PracticeSquad);
	RosterView.Open();
	RosterView.UpdatePhone();
};
