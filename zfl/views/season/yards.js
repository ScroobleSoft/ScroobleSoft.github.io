
//--------------------------------------------------------
//---------- MATCH STATS CONSOLE VIEW --------------------
var MatchStatsConsoleView = function() {
	var ExitButton;
};
MatchStatsConsoleView.prototype = new GenieSubView();
MatchStatsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
MatchStatsConsoleView.prototype.SetControls = function() {

	this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
MatchStatsConsoleView.prototype.Update = function() {

	if (this.ExitButton.CheckClicked())
		this.MainView.OpenSeasonView();
};
MatchStatsConsoleView.prototype.Draw = function() {

	this.DisplayHeadings();

	Text.SetContext(this.Context);
	Text.SetColour(BLUE.INDIGO);

	this.DisplayYards();
	this.DisplayBigPlays();
	this.DisplayPossession();
	this.DisplayPoints();

	Text.ResetColour();
	Text.ResetContext();
};
MatchStatsConsoleView.prototype.DisplayHeadings = function() {
	var cntxt;

	cntxt = AbbreviationImages.Context;
	AbbreviationImages.SetContext(this.Context);
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 95, 5);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 150, 5);
	AbbreviationImages.SetContext(cntxt);
};
MatchStatsConsoleView.prototype.DisplayYards = function() {

	//Yards
	Text.Write("Yards:", 5, 40);
	Text.Write(GameSim.HomeYards, 97, 40);
	Text.Write(GameSim.VisitorYards, 154, 40);

	//Plays
	Text.Write("Plays:", 5, 58);
	Text.Write(GameSim.HomePlays, 97, 58);
	Text.Write(GameSim.VisitorPlays, 154, 58);
};
MatchStatsConsoleView.prototype.DisplayBigPlays = function() {
	var plays;

	Text.Write("Big Plays:", 5, 76);
	plays = ArrayUtils.GetSum(GameSim.HomeOffBigPlays);
	plays += ArrayUtils.GetSum(GameSim.HomeDefBigPlays);
	Text.Write(plays, 97, 76);
	plays = ArrayUtils.GetSum(GameSim.VisitorOffBigPlays);
	plays += ArrayUtils.GetSum(GameSim.VisitorDefBigPlays);
	Text.Write(plays, 154, 76);
};
MatchStatsConsoleView.prototype.DisplayPossession = function() {
	var time;

	Text.Write("Time of", 5, 94);
	Text.Write("Possession:", 5, 109);
	time = 25 * GameSim.HomePlays;
	time = Math.floor(time/60) + ":" + (time % 60);
	Text.Write(time, 97, 109);
	time = 25 * GameSim.VisitorPlays;
	time = Math.floor(time/60) + ":" + (time % 60);
	Text.Write(time, 154, 109);
};
MatchStatsConsoleView.prototype.DisplayPoints = function() {

	Text.Write("Score:", 5, 127);
	Text.Write(Scorecard.Score.Home, 97, 127);
	Text.Write(Scorecard.Score.Visitor, 154, 127);
};
