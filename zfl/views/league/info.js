
//---------------------------------------------------------
//---------- GRIDIRON LEAGUE INFO VIEW --------------------
var GridironLeagueInfoView = function() {
};
GridironLeagueInfoView.prototype = new GenieSubView();
GridironLeagueInfoView.prototype.Set = function(cnvs, specs, mView, tWriter) {

	this.SetLinks(null, tWriter);

	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);
};
GridironLeagueInfoView.prototype.Draw = function() {

	this.DisplayInstructions();
};

GridironLeagueInfoView.prototype.DisplayInstructions = function() {

	this.TextWriter.SwitchContext(CANVAS.ZOOM);

	this.TextWriter.Write("INSTRUCTIONS", 5, 20, { STYLE: FONT.STYLE.UNDERLINED } );

	if (Game.Type==ZFL.TYPE.RANDOM) {
		this.TextWriter.Write("Click on a team's button to start a new", 5, 40);
		this.TextWriter.Write("league.", 5, 55);
	} else {
		this.TextWriter.Write("Click on a team's button to select and", 5, 40);
		this.TextWriter.Write("start.", 5, 55);
	}

	if (Game.Type==ZFL.TYPE.RANDOM) {
		this.TextWriter.Write("Selecting a league determines which", 5, 80);
		this.TextWriter.Write("offensive and defensive system is", 5, 95);
		this.TextWriter.Write("used in half of the plays called.", 5, 110);

		this.TextWriter.Write("'Fixed' option fills roster slots evenly.", 5, 135);
		this.TextWriter.Write("'Minimum' option ensures all starter slots", 5, 150);
		this.TextWriter.Write("  are filled.", 5, 165);
		this.TextWriter.Write("'Random' option produces a completely", 5, 180);
		this.TextWriter.Write("  unpredictable roster distribution.", 5, 195);
	}

	this.TextWriter.RestoreContext();
};
