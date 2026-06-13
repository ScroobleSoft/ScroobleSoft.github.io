
//---------------------------------------------------------------
//----------- MARKED PROSPECTS DIALOG VIEW ----------------------  TODO: restrict the number of players marked? to 16?
var MarkedProspectsDialogView = function() {
};
MarkedProspectsDialogView.prototype = new GenieDialogView();
MarkedProspectsDialogView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

};
MarkedProspectsDialogView.prototype.Draw = function() {  //UNLOGGED

	Graphics.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);
	this.DisplayProspects();
};
MarkedProspectsDialogView.prototype.DisplayProspects = function() {  //UNLOGGED
	var i;
	var nPrspcts;

	Text.SetColour(BLUE.INDIGO);

	Text.Write("Marked prospects:", this.Specs.L+20, this.Specs.T+30, { STYLE: FONT.STYLE.UNDERLINED } );

	nPrspcts = 0;
	for (i=0;i<Draft.ValueList.length;++i) {
		if (Draft.ValueList[i].Experience==-1) {
			Text.Write(Positions[Draft.ValueList[i].Position], this.Specs.L+30, this.Specs.T+50+(15*nPrspcts));
			Text.Write(Draft.ValueList[i].Name.First[0]+" "+Draft.ValueList[i].Name.Last, this.Specs.L+55, this.Specs.T+50+(15*nPrspcts));
			Text.Write(GradeUtils.NumberToGrade(Draft.ValueList[i].Quality), this.Specs.L+180, this.Specs.T+50+(15*nPrspcts));
			++nPrspcts;
		}
	}

	Text.ResetColour();
};
