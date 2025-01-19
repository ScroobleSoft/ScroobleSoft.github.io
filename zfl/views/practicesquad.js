
//--------------------------------------------------------------------
//---------- GRIDIRON PRACTICE SQUAD CONSOLE VIEW --------------------
var GridironPracticeSquadConsoleView = function() {
	var Squad;
};
GridironPracticeSquadConsoleView.prototype = new GenieNestedView();
GridironPracticeSquadConsoleView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

};
GridironPracticeSquadConsoleView.prototype.SetSquad = function(sqd) {

	this.Squad = sqd;
};
GridironPracticeSquadConsoleView.prototype.Open = function() {
	GenieNestedView.prototype.Open.call(this);

	//UNLOGGED

	this.DisplayGridders();
/*
		PromoteButton.Show();
//		CutButton.Show();
		RosterSubView.ConsoleView = this;
*/
};
/*
GridironPracticeSquadConsoleView.prototype.Update = function() {
};
GridironPracticeSquadConsoleView.prototype.Close = function() {
};
*/
GridironPracticeSquadConsoleView.prototype.DisplayGridders = function() {
	var i;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont( "12px Arial" );
	this.TextWriter.SetColour( "white" );

	this.TextWriter.Write("Practice Squad:", 5, 20, { FONT: "14px Arial", STYLE: FONT.STYLE.BOLD, COLOUR: "yellow" } );		//title

	for (i=0;i<this.Squad.Gridders.length;++i) {

		//Position, name and experience
		this.TextWriter.Write(Positions[this.Squad.Gridders[i].Position], 10, (i*15)+40);
		this.TextWriter.Write(this.Squad.Gridders[i].Name.GetFullName(), 35, (i*15)+40);
		this.TextWriter.Write(this.Squad.Gridders[i].Experience, 160, (i*15)+40);

		//Quality and potential
		this.TextWriter.Write(Utilities.NumberToGrade(this.Squad.Gridders[i].Quality), 180, (i*15)+40);
		if (Math.abs(this.Squad.Gridders[i].Potential)<10) {
			if (this.Squad.Gridders[i].Potential<0)
				this.TextWriter.Write(this.Squad.Gridders[i].Potential, 205, (i*15)+40);
			 else
				this.TextWriter.Write("+"+this.Squad.Gridders[i].Potential, 205, (i*15)+40);
		} else {
			if (this.Squad.Gridders[i].Potential<0)
				this.TextWriter.Write(this.Squad.Gridders[i].Potential, 200, (i*15)+40);
			else
				this.TextWriter.Write("+"+this.Squad.Gridders[i].Potential, 200, (i*15)+40);
		}

		//Type
		switch (this.Squad.Gridders[i].Type) {
			case GRIDDER.TYPE.DIVISIONAL:
				this.TextWriter.Write("divisional", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.INJURED:
				this.TextWriter.Write("injured", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.SPARKER:
				this.TextWriter.Write("sparker", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.SPECIAL:
				this.TextWriter.Write("special", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.VERSATILE:
				this.TextWriter.Write("temp'mental", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.VERSATILE:
				this.TextWriter.Write("versatile", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.VOLATILE:
				this.TextWriter.Write("volatile", 230, (i*15)+40);
				break;
			case GRIDDER.TYPE.PROJECT:
				this.TextWriter.Write("project", 230, (i*15)+40);
				break;
		 }
	}

	this.TextWriter.ResetFont();
	this.TextWriter.ResetColour();
	this.TextWriter.ResetContext();
};
GridironPracticeSquadConsoleView.prototype.UpdateClick = function() {

	//-show player info below squad list but above Promote+Waive buttons
};
