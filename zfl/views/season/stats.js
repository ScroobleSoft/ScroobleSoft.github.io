
//------------------------------------------------
//---------- MATCH STATS VIEW --------------------
var MatchStatsView = function() {
};
MatchStatsView.prototype = new GenieView();
MatchStatsView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
MatchStatsView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.ConsoleView.Update();
};
MatchStatsView.prototype.Draw = function() {
	var i;

	//Headings
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 84, 5);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 284, 5);

	Text.SetColour("blue");

	for (i=0;i<OFFENSE.PLAYERS;++i) {
		this.DisplayPlayer(GameSim.HomeTeam.OffStarters[i], GameSim.HomeOffBigPlays[i], 5, 35+(16*i))
		this.DisplayPlayer(GameSim.HomeTeam.DefStarters[i], GameSim.HomeDefBigPlays[i], 5, 220+(16*i))
		this.DisplayPlayer(GameSim.VisitorTeam.OffStarters[i], GameSim.VisitorOffBigPlays[i], 205, 35+(16*i))
		this.DisplayPlayer(GameSim.VisitorTeam.DefStarters[i], GameSim.VisitorDefBigPlays[i], 205, 220+(16*i))
	}

	Text.ResetColour();

	Graphics.DrawRectangle(196, 10, 2, 380, "blue", 2);
};
MatchStatsView.prototype.DisplayPlayer = function(plyr, plays, x, y) {

	Text.Write(Positions[plyr.Position], x+5, y);
	Text.Write(plyr.Name.First[0] + " " + plyr.Name.Last, x+33, y);
	Text.Write(Utils.NumberToGrade(plyr.Quality),  x+145,y);
	Text.Write(plays, x+170, y);
};
MatchStatsView.prototype.OpenSeasonView = function() {

	this.Close(this.LaunchSeasonView.bind(this), 100);
};
MatchStatsView.prototype.LaunchSeasonView = function() {

	SeasonView.SetInfoView(SeasonInfoView);
	SeasonView.Open();
	SeasonView.Update();
};
