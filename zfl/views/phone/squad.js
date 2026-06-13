
//-----------------------------------------------------------
//---------- GRIDIRON SQUAD CONSOLE VIEW --------------------
var GridironSquadConsoleView = function() {
	var SymbolImages, ProjectImage;
	var Squad;
	var FreeAgentsButton, NewSeasonButton, SignFAsButton, StartDraftButton, WaiverButton, MatchButton;
};
GridironSquadConsoleView.prototype = new GenieSubView();
GridironSquadConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
GridironSquadConsoleView.prototype.SetImages = function() {

	this.SymbolImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SYMBOLS);
	this.ProjectImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.PROJECT);
};
GridironSquadConsoleView.prototype.SetControls = function() {

	this.FreeAgentsButton = this.SetImageButton(this.Specs.BUTTON.FAs, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.NewSeasonButton = this.SetImageButton(this.Specs.BUTTON.SEASON, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.SignFAsButton = this.SetImageButton(this.Specs.BUTTON.SIGN, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.StartDraftButton = this.SetImageButton(this.Specs.BUTTON.DRAFT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.WaiverButton = this.SetImageButton(this.Specs.BUTTON.WAIVER, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.MatchButton = this.SetImageButton(this.Specs.BUTTON.MATCH, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
GridironSquadConsoleView.prototype.SetSquad = function(sqd) {

	this.Squad = sqd;
};
GridironSquadConsoleView.prototype.ShowControls = function() {

	switch (this.MainView.State) {
		case this.MainView.Specs.STATE.PReSEASON:
			this.FreeAgentsButton.Show();
			this.NewSeasonButton.Show();
			break;
		case this.MainView.Specs.STATE.PReDRAFT:
			this.SignFAsButton.Show();
			this.StartDraftButton.Show();
			break;
		case this.MainView.Specs.STATE.SEASON:
			this.WaiverButton.Show();
			this.MatchButton.Show();
			break;
	}
};
GridironSquadConsoleView.prototype.Draw = function() {

	this.DisplayGridders();

	Graphics.SetContext(this.Context);
	Graphics.DrawRectangle(0, 160, CONTROlPANEL.WIDTH, 80, InterfaceColours[2], 0);
	Graphics.ResetContext();

	this.ProjectImage.Draw();
};
GridironSquadConsoleView.prototype.Update = function() {  //UNLOGGED

	if (this.FreeAgentsButton.CheckClicked())
		this.MainView.LaunchFADialog();

	if (this.NewSeasonButton.CheckClicked()) {
//		this.MainView.LaunchRetirementDialog();  actual code

//		GameSim.SetTeams(PlayerTeam, Teams[iTeam]);
//		GameSim.RunMatch();
		League.GamesPlayed = 0;					//TEMP
		this.MainView.OpenSeasonView();
	}

	if (this.SignFAsButton.CheckClicked()) {
	}

	if (this.StartDraftButton.CheckClicked())
		this.MainView.OpenDraftView();

	if (this.WaiverButton.CheckClicked()) {
	}

	if (this.MatchButton.CheckClicked()) {
	}
};
GridironSquadConsoleView.prototype.DisplayGridders = function() {
	var i;
	var y;

	Text.SetContext(this.Context);
	Text.SetFont( "12px Arial" );
	Text.SetColour( "white" );

	Text.Write("Practice Squad:", 5, 15, { FONT: "14px Arial", STYLE: FONT.STYLE.BOLD, COLOUR: "yellow" } );		//title

	for (i=0;i<this.Squad.Gridders.length;++i) {

		//Position, name and experience
		y = (i*15) + 35;
		Text.Write(Positions[this.Squad.Gridders[i].Position], 6, y);
		Text.Write(this.Squad.Gridders[i].Name.GetFullName(), 30, y);
		Text.Write(this.Squad.Gridders[i].Experience, 130, y);

		//Quality and potential
		Text.Write(Utilities.NumberToGrade(this.Squad.Gridders[i].Quality), 145, y);
		if (Math.abs(this.Squad.Gridders[i].Potential)<10) {
			if (this.Squad.Gridders[i].Potential<0)
				Text.Write(this.Squad.Gridders[i].Potential, 167, y);
			 else
				Text.Write("+"+this.Squad.Gridders[i].Potential, 167, y);
		} else {
			if (this.Squad.Gridders[i].Potential<0)
				Text.Write(this.Squad.Gridders[i].Potential, 162, y);
			else
				Text.Write("+"+this.Squad.Gridders[i].Potential, 162, y);
		}

		//Type
		if (this.Squad.Gridders[i].Type)
			this.SymbolImages.DrawPatchNumber(this.Squad.Gridders[i].Type-1, 184, (i*15)+25);
	}

	Text.ResetFont();
	Text.ResetColour();
	Text.ResetContext();
};
GridironSquadConsoleView.prototype.UpdateClick = function() {

	//-show player info below squad list but above Promote+Waive buttons
};
