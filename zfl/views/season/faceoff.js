
//-----------------------------------------------------
//---------- MATCH STATS INFO VIEW --------------------
var MatchStatsInfoView = function() {
};
MatchStatsInfoView.prototype = new GenieSubView();
MatchStatsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
MatchStatsInfoView.prototype.Draw = function() {

	this.DisplayHeadings();
	this.DisplayPlayers();

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(98, 25, 2, 165, "WHITE", 1);
	Graphics.ResetContext();
};
MatchStatsInfoView.prototype.DisplayHeadings = function() {
	var cntxt;

	cntxt = AbbreviationImages.Context;
	AbbreviationImages.SetContext(this.Context);
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 5, 5);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 54, 5);
	AbbreviationImages.DrawPatchNumber(GameSim.HomeTeam.Index, 105, 5);
	AbbreviationImages.DrawPatchNumber(GameSim.VisitorTeam.Index, 154, 5);
	AbbreviationImages.SetContext(cntxt);
};
MatchStatsInfoView.prototype.DisplayPlayers = function() {
	var i, y;

	Text.SetContext(this.Context);
	Text.SetColour("white");

	for (i=0;i<OFFENSE.PLAYERS;++i) {
		y = 35 + (15*i);
		this.DisplayPlayer(GameSim.HomeTeam.OffStarters[i], 5, y, { COLOUR: "white" } );
		this.DisplayPlayer(GameSim.VisitorTeam.DefStarters[GameSim.MatchUps[i]], 54, y, { COLOUR: "black" } );
		this.DisplayPlayer(GameSim.HomeTeam.DefStarters[i], 105, y, { COLOUR: "white" } );
		this.DisplayPlayer(GameSim.VisitorTeam.OffStarters[MatchUpsView.DefMatchUps[i]], 154, y, { COLOUR: "black" } );
	}

	Text.ResetColour();
	Text.ResetContext();
};
MatchStatsInfoView.prototype.DisplayPlayer = function(plyr, x, y) {

	Text.Write(Positions[plyr.Position], x, y);
	Text.Write(Utils.NumberToGrade(plyr.Quality), x+25, y);
};
