
//----------------------------------------------------------
//---------- MATCH HIGHLIGHTS INFO VIEW --------------------
var MatchHighlightsInfoView = function() {
	var InstantButton, SubButton, PauseButton;
};
MatchHighlightsInfoView.prototype = new GenieSubView();
MatchHighlightsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
MatchHighlightsInfoView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.InstantButton = this.SetTextButton(this.Specs.BUTTON.INSTANT, RaisedCornerImages, this.TextWriter);
		this.SubsButton = this.SetTextButton(this.Specs.BUTTON.SUBSTITUTION, RaisedCornerImages, this.TextWriter);
		this.PauseButton = this.SetTextButton(this.Specs.BUTTON.PAUSE, RaisedCornerImages, this.TextWriter);
	}
};
MatchHighlightsInfoView.prototype.Draw = function() {
	var i;
//	var initials;

	this.TextWriter.SetContext(this.Context);

	//Home team
	this.TextWriter.SetColour(TeamColours[QuickSim.HomeTeam.Index][0]);
	this.TextWriter.Write(ClubNames[QuickSim.HomeTeam.Index], 5, 20, { STYLE: FONT.STYLE.UNDERLINED } );
	for (i=0;i<MATCH.PLAYERS;++i) {
		this.TextWriter.Write(Positions[QuickSim.HomeTeam.Starters[i].Position], 5, 40+(15*i));
//		initials = QuickSim.HomeTeam.Starters[i].Name.First[0] + QuickSim.HomeTeam.Starters[i].Name.Last[0];
//		this.TextWriter.Write(initials, 45, 140);
		this.TextWriter.Write(QuickSim.HomeTeam.Starters[i].Name.Last, 40, 40+(15*i));
		this.TextWriter.Write(Utils.NumberToGrade(QuickSim.HomeTeam.Starters[i].Rating), 115, 40+(15*i));
//		this.TextWriter.Write(QuickSim.HomePlayerWins[i], 180, 40+(15*i));
	}
	this.TextWriter.ResetColour();

	//Away team
	this.TextWriter.SetColour(TeamColours[QuickSim.AwayTeam.Index][0]);
	this.TextWriter.Write(ClubNames[QuickSim.AwayTeam.Index], 168, 20, { STYLE: FONT.STYLE.UNDERLINED } );
	for (i=0;i<MATCH.PLAYERS;++i) {
		this.TextWriter.Write(Positions[QuickSim.AwayTeam.Starters[i].Position], 168, 40+(15*i));
//		initials = QuickSim.HomeTeam.Starters[i].Name.First[0] + QuickSim.HomeTeam.Starters[i].Name.Last[0];
//		this.TextWriter.Write(initials, 45, 140);
		this.TextWriter.Write(QuickSim.AwayTeam.Starters[i].Name.Last, 203, 40+(15*i));
		this.TextWriter.Write(Utils.NumberToGrade(QuickSim.AwayTeam.Starters[i].Rating), 278, 40+(15*i));
//		this.TextWriter.Write(QuickSim.AwayPlayerWins[i], 385, 40+(15*i));
	}
	this.TextWriter.ResetColour();

	this.TextWriter.ResetContext();
};
MatchHighlightsInfoView.prototype.DisplayWins = function() {  //UNLOGGED - this will move to a dialog
	var i;

	//-add wins for zone and unit duels

	this.TextWriter.SetContext(this.Context);

	//Home team
	this.TextWriter.SetColour(TeamColours[QuickSim.HomeTeam.Index][0]);
	for (i=0;i<MATCH.PLAYERS;++i)
		this.TextWriter.Write(QuickSim.HomePlayerWins[i], 135, 40+(15*i));
	this.TextWriter.ResetColour();

	//Away team
	this.TextWriter.SetColour(TeamColours[QuickSim.AwayTeam.Index][0]);
	for (i=0;i<MATCH.PLAYERS;++i)
		this.TextWriter.Write(QuickSim.AwayPlayerWins[i], 298, 40+(15*i));
	this.TextWriter.ResetColour();

	this.TextWriter.ResetContext();
};
//phenomenal-great-good-adequate-disapointing-poor-terrible-abysmal
