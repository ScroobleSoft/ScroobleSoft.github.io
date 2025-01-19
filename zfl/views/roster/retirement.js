
//------------------------------------------------------------------
//----------- GRIDIRON RETIREMENT DIALOG VIEW ----------------------
var GridironRetirementDialogView = function() {
	var Roster;
};
GridironRetirementDialogView.prototype = new GenieDialogView();
GridironRetirementDialogView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
GridironRetirementDialogView.prototype.SetRoster = function(rstr) {

	this.Roster = rstr;
};
GridironRetirementDialogView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);
	this.DrawRetirees();
};
GridironRetirementDialogView.prototype.DrawRetirees = function() {  //UNLOGGED
	var i;

	this.TextWriter.SetColour(BLUE.INDIGO);

	this.TextWriter.Write("The following players have retired:", 110, 125, { STYLE: FONT.STYLE.UNDERLINED } );

	for (i=0;i<this.Roster.RetiredPlayers.length;++i) {
		this.TextWriter.Write(Positions[this.Roster.RetiredPlayers[i].Position], 110, 150+(15*i));
		this.TextWriter.Write(this.Roster.RetiredPlayers[i].Name.GetFullName(), 140, 150+(15*i));
		this.TextWriter.Write(Utilities.NumberToGrade(this.Roster.RetiredPlayers[i].Quality), 290, 150+(15*i));
		//-salary
		//-stats?
	}

	this.TextWriter.ResetColour();
};
