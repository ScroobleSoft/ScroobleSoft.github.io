
//----------------------------------------------------
//---------- FOOTBALL LEAGUE VIEW --------------------
var FootballLeagueView = function() {
	var TabView;
	var RotatingBallButtons, TrophyButtons, TeamButtons;								//1st for tablet, 2nd for phone
	var ReturnButton;
	var SwapSquad;		//used for swapping scheduled squads
	var ButtonAngle, ButtonToggle;

	var i, x, y, w, h, angle;
};
FootballLeagueView.prototype = new GenieView();
FootballLeagueView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.ButtonAngle = 0;
	this.ButtonToggle = true;
};
FootballLeagueView.prototype.SetLinks = function(gTool, tWriter, rGenerator) {
	var i;

	GenieView.prototype.SetLinks.call(this, gTool, tWriter, rGenerator);

	this.ReturnButton.SetLinks(null, this.TextWriter);
	for (i=0;i<LEAGUE.TEAMS;++i)
		this.RotatingBallButtons[i].SetLinks(this.GraphicsTool);
};
FootballLeagueView.prototype.SetControls = function() {
	var i;
	var l, t;
	var sx, sy;
	var specs;

	//Rotating buttons (tablet)
	this.RotatingBallButtons = ArrayUtils.Create(LEAGUE.TEAMS, FootballRotatingBallButton);
	for (i=0;i<LEAGUE.TEAMS;++i) {
		l = 40 + (150*(i % 5));
		t = 40 + (140*Math.floor(i/5));
		specs = { L: l, T: t, COLOUR: { BACKGROUND: TeamColours[i][0] } };
		specs = Object.assign(specs, this.Specs.BUTTON.ROTATINgBALL);
		this.RotatingBallButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
		this.RotatingBallButtons[i].SetCornersPic(RaisedCornerImages);
		this.RotatingBallButtons[i].ColourIndex = i;
		this.Controls.push(this.RotatingBallButtons[i]);
	}

	//Trophy buttons (phone)
	this.TrophyButtons = ArrayUtils.Create(LEAGUE.TEAMS, ImageButton);
	for (i=0;i<LEAGUE.TEAMS;++i) {
		l = 15 + ((this.Specs.BUTTON.TROPHY.W+10)*(i % 5));
		t = 19 + ((this.Specs.BUTTON.TROPHY.H+30)*Math.floor(i/5));
		sx = this.Specs.BUTTON.TROPHY.SX + (62*(i % 5));
		sy = this.Specs.BUTTON.TROPHY.SY + (62*Math.floor(i/5));
		specs = { L: l, T: t, W: this.Specs.BUTTON.TROPHY.W, H: this.Specs.BUTTON.TROPHY.H, LW: this.Specs.BUTTON.TROPHY.LW,
					 SX: sx, SY: sy, STYLE: this.Specs.BUTTON.TROPHY.STYLE };
		this.TrophyButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.MOBILE]);
		this.TrophyButtons[i].SetCornersPic(RaisedCornerImages);
		this.Controls.push(this.TrophyButtons[i]);
	}

	this.ReturnButton = new TextButton();
	this.ReturnButton.Set(this.Canvas, this.Specs.BUTTON.RETURN, this.TextWriter);
	this.ReturnButton.SetCornersPic(ShallowCornerImages);
	this.Controls.push(this.ReturnButton);
};
FootballLeagueView.prototype.ShowControls = function() {

	if (Game.Settings & GAME.PLATFORM.PHONE)
		this.TrophyButtons.forEach(function(btn) {btn.Show()});
	else {
		this.RotatingBallButtons.forEach(function(btn) {btn.Show();});
		this.ReturnButton.Show();
	}
};
FootballLeagueView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	this.Update();
};
FootballLeagueView.prototype.Draw = function() {
	var i;
	var x, y;
	var font;

	//Titles
	if (Game.CheckMobile())
		this.TextWriter.Write("Pick a team:", 15, 15, { FONT: "14px Arial", COLOUR: "blue" } );
	else
		this.TextWriter.Write("Pick a team:", 40, 25, { FONT: "18px Arial", COLOUR: "blue" } );

	//Team button captions
	if (Game.CheckMobile())
		font = "12px Arial bold";
	else
		font = "16px Arial bold";
	for (i=0;i<LEAGUE.TEAMS;++i) {
		if (Game.CheckMobile()) {
			x = 15 + (76*(i % 5));
			y = 97 + (96*Math.floor(i/5));
		} else {
			x = 40 + (150*(i % 5));
			y = 154 + (140*Math.floor(i/5));
		}
		if (ClubNames[i].length>9) {
			if (ClubNames[i]=="West Bridgford")
				x -= 13;
			else if (ClubNames[i]=="Craven Cottage")
				x -= 9;
			this.TextWriter.Write(ClubNames[i].toUpperCase(), x-1, y-1, { FONT: "10px Arial bold", COLOUR: "white" } );
			this.TextWriter.Write(ClubNames[i].toUpperCase(), x, y, { FONT: "10px Arial bold", COLOUR: BLUE.MEDIUM } );
		} else {
			if (ClubNames[i]=="Portman")
				x += 7;
			else if (ClubNames[i]=="Dell")
				x += 2;
			this.TextWriter.Write(ClubNames[i].toUpperCase(), x-1, y-1, { FONT: font, COLOUR: "white" } );
			this.TextWriter.Write(ClubNames[i].toUpperCase(), x, y, { FONT: font, COLOUR: BLUE.MEDIUM } );
		}
		if (Game.CheckMobile())
			y += 13;
		else
			y += 16;
		this.TextWriter.Write(ClubNickNames[i].toUpperCase(), x-1, y-1, { FONT: font, COLOUR: "white" } );
		this.TextWriter.Write(ClubNickNames[i].toUpperCase(), x, y, { FONT: font, COLOUR: BLUE.MEDIUM } );
	}
};
FootballLeagueView.prototype.OpenCustom = function() {  //will be REDUNDANT, UNLOG

	if (Game.Type==FOOTBALL.TYPE.CUSTOM) {
		this.Context.fillStyle = "lightgrey";
		this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	}

	League.Generate(GAMeTYPE.PRECISE, BUDGET.ZERO);

	this.TextWriter.Write("Pick a team:", 40, 30, { FONT: "18px Arial" } );
	TeamButtons.forEach(function(button) {button.Show();});

	//TEMP
	this.TextWriter.Write("NOTE: pre-set squads option not", 5, 20, null, CANVAS.ZOOM);
	this.TextWriter.Write("		needs work", 5, 35, null, CANVAS.ZOOM);
};
FootballLeagueView.prototype.UpdateCustom = function() {  //TODO: will become REDUNDANT

		this.AnimationFrameHandle = requestAnimationFrame(this.UpdateCustom.bind(this));

		for (this.i=0;this.i<TeamButtons.length;++this.i)
			if (TeamButtons[this.i].CheckClicked()) {
				cancelAnimationFrame(this.AnimationFrameHandle);
				TeamSelected = Teams[this.i];
				Game.Type = FOOTBALL.TYPE.EPL;
				League.Generate(GameRadioOptions.Selected, BudgetRadioOptions.Selected);
				League.Dump();

				//TODO: ::Update will have to be modified to optionally select colour/name/nick-name

				setTimeout(this.CloseCustom.bind(this), 100);
				return;
			}
};
FootballLeagueView.prototype.Update = function() {  //TODO: will have to be modified to optionally select colour/name/nick-name

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Game.CheckMobile())
		this.TeamButtons = this.TrophyButtons;
	else {
		this.UpdateButtons();
		this.TeamButtons = this.RotatingBallButtons;
	}

	//Check click
	for (this.i=0;this.i<this.TeamButtons.length;++this.i)
		if (this.TeamButtons[this.i].CheckClicked()) {
			if (this.InfoView.OptionSelected!=FOOTBALL.TYPE.RANDOM)	//NOTE: no seeding is needed for random game
				this.SelectGame();
			League.Generate(GAMeTYPE.PRECISE, BUDGET.ZERO);	 //TODO: there will be several options to be implemented
			League.GenerateSeasonFixtures();
			TeamSelected = Teams[this.i];
//			TransferPool.AddLeaguePlayers();			//NOTE: call is here to avoid adding selected team's players on the list

			//Squads have already been generated for display, so swap for right one
			this.SwapSquad = TeamSelected.Squad;
			TeamSelected.Squad = Teams[0].Squad;
			Teams[0].Squad = this.SwapSquad;
			Teams.forEach(function(team) {team.GenerateFormations();});
			Teams.forEach(function(team) {team.SelectBestFormation();});
			this.SimulateSeason();
			if (!Game.CheckMobile())
				League.Dump();
			this.Randomizer.ResetSeeds();
			if (Game.CheckMobile())
				this.Close(this.OpenSquadView.bind(this), 100);
			else
				this.Close(this.OpenTeamView.bind(this), 100);
			return;
		}

	GenieView.prototype.Update.call(this);

//	Mouse.ClearAll();
};
FootballLeagueView.prototype.SelectGame = function() {

	switch (this.InfoView.OptionSelected) {
		case FOOTBALL.TYPE.FEATURED:
			Game.Type = FOOTBALL.TYPE.FEATURED;
			this.Randomizer.SetSeeds(Featured[0][0], Featured[0][1]);
//			this.Randomizer.SetSeeds(Featured[0][0], Featured[0][0]+1);
			break;
		case FOOTBALL.TYPE.DAILY:
			Game.Type = FOOTBALL.TYPE.DAILY;
			this.Randomizer.SetSeeds(Daily[0][0], Daily[0][1]);
//			this.Randomizer.SetSeeds(Daily[0][0], Daily[0][0]+1);
			break;
		case FOOTBALL.TYPE.WEEKLY:
			Game.Type = FOOTBALL.TYPE.WEEKLY;
			this.Randomizer.SetSeeds(Weekly[0][0], Weekly[0][1]);
//			this.Randomizer.SetSeeds(Weekly[0][0], Weekly[0][0]+1);
			break;
	}
};
FootballLeagueView.prototype.UpdateButtons = function() {

	function ReDrawButton(btn, angle, w, h, cntxt, gTool, img, colours) {  //BUG! - colour seeps in at the ball's edges
		var x, y;

		x = btn.Specs.L + btn.Specs.LW;
		y = btn.Specs.T + btn.Specs.LW;
		cntxt.fillStyle = colours[0];
		cntxt.fillRect(x, y, w, h);
		x += w / 2;
		y += h / 2;
		gTool.DrawCircle(x+0.5, y+0.5, (img.Specs.W/2)-1, colours[1], 0);
		cntxt.translate(x, y);
		cntxt.rotate(angle);
		img.Draw(-(img.Specs.W/2), -(img.Specs.H/2));
		cntxt.rotate(-angle);
		cntxt.translate(-x, -y);
	}

	this.w = this.Specs.BUTTON.ROTATINgBALL.W - (2*this.Specs.BUTTON.ROTATINgBALL.LW);
	this.h = this.Specs.BUTTON.ROTATINgBALL.H - (2*this.Specs.BUTTON.ROTATINgBALL.LW);
	this.angle = GeoUtils.DegreesToRadians(this.ButtonAngle);
	if (this.ButtonToggle)
		for (this.i=0;this.i<this.RotatingBallButtons.length/2;++this.i)
			ReDrawButton(this.RotatingBallButtons[this.i], this.angle, this.w, this.h, this.Context, this.GraphicsTool, RotatingBallImage, TeamColours[this.i]);
	else
		for (this.i=this.RotatingBallButtons.length/2;this.i<this.RotatingBallButtons.length;++this.i)
			ReDrawButton(this.RotatingBallButtons[this.i], this.angle, this.w, this.h, this.Context, this.GraphicsTool, RotatingBallImage, TeamColours[this.i]);
	this.ButtonToggle = !this.ButtonToggle;

	++this.ButtonAngle;
};
FootballLeagueView.prototype.SimulateSeason = function() {  //TODO: a more sophisticated solution accounting for injuries and back-ups
	var i, j;
	var aTeams;

	//Play half the season
	for (i=0;i<LEAGUE.WEEKS/2;++i) {
		for (j=0;j<LEAGUE.FIXTURES;++j) {
			QuickSim.SetTeams(Teams[League.Fixtures[i][j].Home], Teams[League.Fixtures[i][j].Away]);
			QuickSim.SimMatch();
			if (QuickSim.HomeGoals>QuickSim.AwayGoals)
				Teams[League.Fixtures[i][j].Home].Points += 3;
			else if (QuickSim.HomeGoals<QuickSim.AwayGoals)
				Teams[League.Fixtures[i][j].Away].Points += 3;
			else {
				Teams[League.Fixtures[i][j].Home].Points += 1;
				Teams[League.Fixtures[i][j].Away].Points += 1;
			}
			QuickSim.Reset();
		}
		Teams.forEach(function(team) {team.Squad.UpdateInjuries();});
	}
	Teams.forEach(function(team) {team.Squad.ClearInjuries();});

	//Determine each teams' table position
	aTeams = new Array(LEAGUE.TEAMS);
	for (i=0;i<LEAGUE.TEAMS;++i)
		aTeams[i] = Teams[i];
	aTeams.sort(function(team1, team2) {return (team2.Points-team1.Points);});
	for (i=0;i<LEAGUE.TEAMS;++i)
		Teams[aTeams[i].Index].Position = i;
	LeagueTable.FirstSort();
};
FootballLeagueView.prototype.OpenSquadView = function() {

	TeamView.SetTeam(TeamSelected);
	SquadView.SetTeam(TeamSelected);
	SquadView.Open();
};
FootballLeagueView.prototype.OpenTeamView = function() {

	TeamView.SetTeam(TeamSelected);
	TeamView.Open();
	TeamView.Update();
};
FootballLeagueView.prototype.CloseCustom = function() {  //TODO: process
	//UNLOGGED - probably TEMP
		this.Context.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

		//Controls
		TeamButtons.forEach(function(btn){btn.Hide();});
		GameRadioOptions.Hide();
		BudgetRadioOptions.Hide();

		TeamView.SetTeam(TeamSelected);
		TeamView.Open();
		TeamView.Update();
};
