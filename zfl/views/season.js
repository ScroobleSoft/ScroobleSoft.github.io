
//----------------------------------------------------
//---------- GRIDIRON SEASON VIEW --------------------
var GridironSeasonView = function() {
	var Team;

	var info;
};
GridironSeasonView.prototype = new GenieView();
GridironSeasonView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
GridironSeasonView.prototype.Open = function() {

	GameSim.SetTeams(PlayerTeam, Teams[PlayerTeam.Schedule[League.GamesPlayed]]);

	GenieView.prototype.Open.call(this);
};
GridironSeasonView.prototype.SetTeam = function(team) {

	this.Team = team;
};
GridironSeasonView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {  //TEMP - this looks REDUNDANT now
		if (League.GamesPlayed % 2)
			GameSim.SetTeams(Teams[PlayerTeam.Schedule[League.GamesPlayed]], PlayerTeam);
		else
			GameSim.SetTeams(PlayerTeam, Teams[PlayerTeam.Schedule[League.GamesPlayed]]);
		GameSim.RunMatch();
		Text.Write(info, 5+(200*Math.floor(League.GamesPlayed/8)), 30+(50*Math.floor(i % 8)));
		Text.Write(Scorecard.Score.Home, 175+(200*Math.floor(League.GamesPlayed/8)), 15+(50*Math.floor(i % 8)), { STYLE: STYLE.BOLD } );
		Text.Write(Scorecard.Score.Visitor, 175+(200*Math.floor(League.GamesPlayed/8)), 30+(50*Math.floor(i % 8)), { STYLE: STYLE.BOLD } );
		++League.GamesPlayed;
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		this.InfoView.UpdateClick();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}

	this.ConsoleView.Update();
};
GridironSeasonView.prototype.Draw = function() {

	this.DisplayPlayers();
	this.DisplayScores();
};
GridironSeasonView.prototype.DisplayPlayers = function() {
	var i;
	var x, y, w;
	var hTeam, vTeam;		//strings

	//Team labels
	for (i=0;i<SEASON.GAMES;++i) {
		x = 5 + (200*Math.floor(i/8));
		y = 16 + (50*Math.floor(i % 8));
		hTeam = TeamNames[PlayerTeam.Index][0] + " " + TeamNames[PlayerTeam.Index][1];
		vTeam = TeamNames[PlayerTeam.Schedule[i]][0] + " " + TeamNames[PlayerTeam.Schedule[i]][1];
		w = Math.max(StringUtils.GetTextWidth(hTeam, null, this.Context), StringUtils.GetTextWidth(vTeam, null, this.Context));
		if (i % 2) {
			Graphics.DrawRectangle(x-3, y-14, w+6, 20, Teams[PlayerTeam.Schedule[i]].SecondaryColour, 0);
			Text.Write(vTeam, x, y, { COLOUR: Teams[PlayerTeam.Schedule[i]].PrimaryColour, STYLE: STYLE.BOLD } );
			Graphics.DrawRectangle(x-3, y+7, w+6, 20, PlayerTeam.SecondaryColour, 0);
			Text.Write(hTeam, x, y+21, { COLOUR: PlayerTeam.PrimaryColour, STYLE: STYLE.BOLD } );
		} else {
			Graphics.DrawRectangle(x-3, y-14, w+6, 20, PlayerTeam.SecondaryColour, 0);
			Text.Write(hTeam, x, y, { COLOUR: PlayerTeam.PrimaryColour, STYLE: STYLE.BOLD } );
			Graphics.DrawRectangle(x-3, y+7, w+6, 20, Teams[PlayerTeam.Schedule[i]].SecondaryColour, 0);
			Text.Write(vTeam, x, y+21, { COLOUR: Teams[PlayerTeam.Schedule[i]].PrimaryColour, STYLE: STYLE.BOLD } );
		}
	}
};
GridironSeasonView.prototype.DisplayScores = function() {
	var i;

	for (i=0;i<League.GamesPlayed;++i)
		if (i % 2)
			this.DisplayScore(i, PlayerTeam.Scores[i].Conceded, PlayerTeam.Scores[i].Scored);
		else
			this.DisplayScore(i, PlayerTeam.Scores[i].Scored, PlayerTeam.Scores[i].Conceded);
};
GridironSeasonView.prototype.DisplayScore = function(iMtch, hPnts, vPnts) {
	var x, y;

	x = 175 + (200*Math.floor(iMtch/8));
	y = 16 + (50*Math.floor(iMtch % 8));
	Graphics.DrawRectangle(x-3, y-13, 21, 16, PlayerTeam.SecondaryColour, 0);
	Text.Write(hPnts, x, y, { COLOUR: PlayerTeam.PrimaryColour, STYLE: STYLE.BOLD } );
	Graphics.DrawRectangle(x-3, y+8, 21, 16, Teams[PlayerTeam.Schedule[iMtch]].SecondaryColour, 0);
	Text.Write(vPnts, x, y+21, { COLOUR: Teams[PlayerTeam.Schedule[iMtch]].PrimaryColour, STYLE: STYLE.BOLD } );
};
GridironSeasonView.prototype.UpdateGamesPlayed = function() {

	++League.GamesPlayed;
	if (League.GamesPlayed==SEASON.GAMES)
		return;

	if (League.GamesPlayed % 2)
		GameSim.SetTeams(Teams[PlayerTeam.Schedule[League.GamesPlayed]], PlayerTeam);
	else
		GameSim.SetTeams(PlayerTeam, Teams[PlayerTeam.Schedule[League.GamesPlayed]]);

	this.InfoView.ColourScape();
	this.InfoView.Draw();
};
GridironSeasonView.prototype.OpenMatchUpsView = function() {

	this.Close(this.LaunchMatchUpsView.bind(this), 100);
};
GridironSeasonView.prototype.LaunchMatchUpsView = function() {

	MatchUpsView.SetInfoView(SeasonInfoView);
	MatchUpsView.Open();
	MatchUpsView.Update();
};
GridironSeasonView.prototype.OpenStatsView = function() {  //UNLOGGED

	this.Close(this.LaunchStatsView.bind(this), 100);
};
GridironSeasonView.prototype.LaunchStatsView = function() {  //UNLOGGED

	StatsView.Open();
	StatsView.Update();
};
