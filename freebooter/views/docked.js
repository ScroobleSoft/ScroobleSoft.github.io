
//-------------------------------------------------
//---------- SOLAR DOCKED VIEW --------------------
var SolarDockedView = function() {
	var Planet, Station;
	var BevelImages, ButtonImages, ActionButtonPanel;
	var QuitButton, HelpButton, OptionsButton, CargoButton, PilotsButton, ArsenalButton;
	var ActionSelected;

	var i;
};
SolarDockedView.prototype = new GenieView();
SolarDockedView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.ActionSelected = -1;
};
SolarDockedView.prototype.SetControls = function() {

	this.SetButtons();
	this.SetButtonPanel();
};
SolarDockedView.prototype.SetButtons = function() {

	this.QuitButton = this.SetImageButton(this.Specs.BUTTON.QUIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.HelpButton = this.SetImageButton(this.Specs.BUTTON.HELP, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.OptionsButton = this.SetImageButton(this.Specs.BUTTON.OPTIONS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.CargoButton = this.SetImageButton(this.Specs.BUTTON.CARGO, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.PilotsButton = this.SetImageButton(this.Specs.BUTTON.PILOTS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.ArsenalButton = this.SetImageButton(this.Specs.BUTTON.ARSENAL, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
SolarDockedView.prototype.SetButtonPanel = function() {

	this.BevelImages = new GenieImage();
	this.BevelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.BEVEL);
	this.ButtonImages = new GenieImage();
	this.ButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.BUTTOnPANEL.ACTIONS.IMAGE);
	this.ActionButtonPanel = new GenieButtonPanel();
	this.ActionButtonPanel.Set(this.Canvas, this.Specs.BUTTOnPANEL.ACTIONS, this.BevelImages);
	this.ActionButtonPanel.SetButtonPics(this.ButtonImages);
	this.Controls.push(this.ActionButtonPanel);
};
SolarDockedView.prototype.SetPlanetStation = function(planet, station) {

	this.Planet = planet;
	this.Station = station;
};
SolarDockedView.prototype.Open = function() {  //UNLOGGED

	GenieView.prototype.Open.call(this);

	this.Update();
};
SolarDockedView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateButtonPanel();
	this.UpdateButtons();

	this.InfoView.Update();
	this.ConsoleView.Update();
};
SolarDockedView.prototype.Draw = function() {

	this.TextWriter.Write("Select an Action:", 5, 20, { FONT: "18px Arial", COLOUR: "white" } );
};
SolarDockedView.prototype.UpdateButtonPanel = function() {  //UNLOGGED

	if (this.ActionButtonPanel.CheckButtonPressed()) {
		this.ActionSelected = this.ActionButtonPanel.ButtonPressed;
		if (this.ActionSelected<this.Specs.ACTION.MISSION)  //TEMP
			this.Close.call(this, this.OpenActionView.bind(this), 100);
		else  //TEMP
			this.OpenActionView();
	}
};
SolarDockedView.prototype.UpdateButtons = function() {  //UNLOGGED
};
SolarDockedView.prototype.OpenActionView = function() {

	switch (this.ActionSelected) {
		case this.Specs.ACTION.JUMP:
			JumpView.Open();
			break;
		case this.Specs.ACTION.TRADE:
			TradeView.Planet = this.Planet;
			TradeView.Open();
			break;
		case this.Specs.ACTION.COURIER:
			CourierView.Open();
			break;
		case this.Specs.ACTION.MISSION:
//			MissionView.Open();
			alert("Not implemented - eventually, several tasks will be assigned.");
			break;
		case this.Specs.ACTION.DOCKING:
//			DockingView.Open();
			alert("Not implemented - a 2D game where other ships ask to be manually docked for a fee.");
			break;
		case this.Specs.ACTION.HACKING:
//			HackingView.Open();
			alert("Not implemented - extracting info from station/planet.");
			break;
		case this.Specs.ACTION.ROAMING:
//			RoamingView.Open();
			alert("Not implemented - wandering around the station, exploring.");
			break;
		case this.Specs.ACTION.VOYAGE:
//			VoyageView.Open();
			alert("Not implemented.");
			break;
	}
};
