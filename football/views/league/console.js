
//------------------------------------------------------------
//---------- FOOTBALL LEAGUE CONSOLE VIEW --------------------
var FootballLeagueConsoleView = function() {
	var ImageContext;
};
FootballLeagueConsoleView.prototype = new GenieSubView();
FootballLeagueConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
FootballLeagueConsoleView.prototype.Draw = function() {

	if (Game.CheckMobile())
		this.DisplayBestPlayers();
	else
		this.DisplayAllPlayers();
};
FootballLeagueConsoleView.prototype.DisplayAllPlayers = function() {
	var i;
	var name, grade;

	//Switch contexts to Control Panel
	this.TextWriter.SwitchContext(CANVAS.CONSOLE);
	this.ImageContext = TypeSymbolImages.Context;
	TypeSymbolImages.Context = this.Context;
	DesignationSymbolImages.Context = this.Context;

	//Write player positions names, grades and symbols in decreasing order of quality
	for (i=0;i<Teams[0].Squad.Players.length;++i) {
		this.TextWriter.Write(Positions[Teams[0].Squad.Players[i].Position], 5, 12+(14*i), { COLOUR: "white" } );
		name = Teams[0].Squad.Players[i].Name.First[0] + Teams[0].Squad.Players[i].Name.Last[0];
		this.TextWriter.Write(name, 45, 12+(14*i), { COLOUR: "white" } );
		this.TextWriter.Write(Teams[0].Squad.Players[i].Age, 75, 12+(14*i), { COLOUR: "white" } );
		grade = Utils.NumberToGrade(Teams[0].Squad.Players[i].Quality);
		this.TextWriter.Write(grade, 105, 12+(14*i), { COLOUR: "white" } );

		if (Teams[0].Squad.Players[i].Type)
			TypeSymbolImages.DrawPatchNumber(Teams[0].Squad.Players[i].Type-1, 135, 1+(14*i));
		if (Teams[0].Squad.Players[i].Designation)
			DesignationSymbolImages.DrawPatchNumber(Teams[0].Squad.Players[i].Designation-1, 165, 1+(14*i));
	}

	//Restore contexts
	this.TextWriter.ResetContext();
	TypeSymbolImages.Context = this.ImageContext;
	DesignationSymbolImages.Context = this.ImageContext;
};
FootballLeagueConsoleView.prototype.DisplayBestPlayers = function() {
	var i;
	var aPlyrs;

	//Pick appropriate players
	switch (this.MainView.InfoView.OptionSelected) {
		case FOOTBALL.TYPE.FEATURED:
			aPlyrs = Featured[0][5];
			break;
		case FOOTBALL.TYPE.DAILY:
			aPlyrs = Daily[0][5];
			break;
		case FOOTBALL.TYPE.WEEKLY:
			aPlyrs = Weekly[0][5];
			break;
		case FOOTBALL.TYPE.RANDOM:
			return;
	}

	//Write positions and grades
	this.TextWriter.SwitchContext(CANVAS.CONSOLE);
	this.TextWriter.SetColour("blue");
	this.TextWriter.Write("Best players:", 5, 15);
	for (i=0;i<aPlyrs.length;++i) {
		this.TextWriter.Write(Positions[aPlyrs[i][0]], 15, 35+(15*i));
		this.TextWriter.Write(Utils.NumberToGrade(aPlyrs[i][1]), 60, 35+(15*i));
	}
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
