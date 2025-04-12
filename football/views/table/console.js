
//--------------------------------------------------------------
//---------- FOOTBALL TABLE CONSOLE VIEW -----------------------
var FootballTableConsoleView = function() {
	var CompetitionIconPanel;
	var ExitButton;
	var CompetitionIndex;

	var i;
};
FootballTableConsoleView.prototype = new GenieSubView();
FootballTableConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.CompetitionIndex = 0;
};
FootballTableConsoleView.prototype.SetControls = function() {

	this.CompetitionIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.COMPETITION, this.Specs.ICOnPANEL.COMPETITION.IMAGE, 
																															IconCornerImages, this.GraphicsTool);
	this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
};
FootballTableConsoleView.prototype.Open = function() {  //UNLOGGED
	GenieSubView.prototype.Open.call(this);

	this.CompetitionIconPanel.DeActivate();		//TEMP - since only one table is currently shown
};
FootballTableConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.CompetitionIconPanel.CheckMouseDown())
		if (this.CompetitionIndex!=this.CompetitionIconPanel.DepressedIcon) {
			this.CompetitionIndex = this.CompetitionIconPanel.DepressedIcon;
			switch (this.CompetitionIndex) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
			}
		}

	if (this.ExitButton.CheckClicked())
		this.MainView.CloseAll();
};
