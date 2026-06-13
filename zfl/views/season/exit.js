
//-----------------------------------------------------------
//---------- MATCH-UPS EXIT CONSOLE VIEW --------------------  NOTE: only exists to exit Match-Ups View
var MatchUpsExitConsoleView = function() {
	var ExitButton;
};
MatchUpsExitConsoleView.prototype = new GenieSubView();
MatchUpsExitConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
MatchUpsExitConsoleView.prototype.SetControls = function() {

	this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
MatchUpsExitConsoleView.prototype.Update = function() {

	if (this.ExitButton.CheckClicked())
		this.MainView.OpenSeasonView();
};
MatchUpsExitConsoleView.prototype.Draw = function() {  //UNLOGGED

	//-use abbreviation images rather than text labels
	//-could have a mugshot faceoff to add colour

	Text.SetContext(this.Context);
	Text.SetColour(BLUE.INDIGO);

	Text.Write("Match-Up Advantages", 5, 20, { STYLE: FONT.STYLE.UNDERLINED } );
	Text.Write("Home:", 5, 40);
	Text.Write(this.MainView.HomeAdvantages, 70, 40);
	Text.Write("Visitors:", 5, 55);
	Text.Write(this.MainView.VisitorAdvantages, 70, 55);

	Text.ResetColour();
	Text.ResetContext();
};
