/*
 *		* for mobile, subs will be displayed in pop-up
 */
//---------------------------------------------------------------
//---------- FOOTBALL FORMATION CONSOLE VIEW --------------------
var FootballFormationConsoleView = function() {
	var FormationIconPanel;
	var AutoSelectButton, SubsButton;
	var IconContext;
};
FootballFormationConsoleView.prototype = new GenieSubView();
FootballFormationConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
FootballFormationConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.FormationIconPanel = this.SetCornersIconPanel(this.Specs.ICOnPANEL.FORMATION, this.Specs.ICOnPANEL.FORMATION.IMAGE, 
																			IconCornerImages, this.GraphicsTool);
		this.AutoSelectButton = this.SetTextButton(this.Specs.BUTTON.AUToSELECT, RaisedCornerImages, this.TextWriter);
		this.SubsButton = this.SetTextButton(this.Specs.BUTTON.SUBS, RaisedCornerImages, this.TextWriter);
	}
};
FootballFormationConsoleView.prototype.ShowControls = function() {

	if (Game.CheckMobile()) {  //TODO: remove spurious lines
		this.IconContext = IconCornerImages.Context;
		IconCornerImages.Context = this.Context;
		this.FormationIconPanel.Show();
		IconCornerImages.Context = this.IconContext;
		this.AutoSelectButton.Show();
		this.SubsButton.Show();
	}
};
FootballFormationConsoleView.prototype.Update = function() {
	//UNLOGGED
	if (Game.CheckMobile()) {

		//Check if formation has changed
		if (this.FormationIconPanel.CheckMouseDown()) {
			this.MainView.SetFormation(this.FormationIconPanel.DepressedIcon);
			this.MainView.Draw();
			this.DisplayFormationRating();
		}

		//-subs and auto-select buttons?
	}
};
FootballFormationConsoleView.prototype.Draw = function() {
	//UNLOGGED
	if (!Game.CheckMobile())
		this.DisplayPlayersInfo();
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Rating:", 5, 185);
	this.TextWriter.ResetContext();
	this.DisplayFormationRating();
};
FootballFormationConsoleView.prototype.DisplayPlayersInfo = function() {
	var i;
	var font;

	font = { FONT: "12px Arial", COLOUR: "white" };
	this.TextWriter.SetContext(this.Context);
	for (i=0;i<this.MainView.Team.YouthTeam.Players.length;++i) {
		this.TextWriter.Write(this.MainView.Team.YouthTeam.Players[i].Name.First[0], 5, 15*(i+1), font);
		this.TextWriter.Write(this.MainView.Team.YouthTeam.Players[i].Name.Last, 15, 15*(i+1), font);
		this.TextWriter.Write(this.MainView.Team.YouthTeam.Players[i].Age, 105, 15*(i+1), font);
		this.TextWriter.Write(Positions[this.MainView.Team.YouthTeam.Players[i].Position], 135, 15*(i+1), font);
		this.TextWriter.Write(Utils.NumberToGrade(this.MainView.Team.YouthTeam.Players[i].Quality), 175, 15*(i+1), font);
	}
	this.TextWriter.RestoreContext();
};
FootballFormationConsoleView.prototype.DisplayFormationRating = function() {
	var i;
	var rtng;

	//Erase previous rating
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(60, 170, 35, 20, this.Specs.COLOUR, 0);
	this.GraphicsTool.ResetContext();

	//Write new rating
	rtng = 0;
	for (i=0;i<MATCH.PLAYERS;++i)
		rtng += this.MainView.Team.FormationStarters[this.MainView.Team.Formation][i].Rating;
	rtng = Utils.NumberToGrade(Math.round(rtng/MATCH.PLAYERS));
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write(rtng, 65, 185);
	this.TextWriter.ResetContext();
};
