
//--------------------------------------------------------
//---------- SOLAR COCKPIT CONSOLE VIEW ------------------
var SolarCockpitConsoleView = function() {
	var ProgressButton, ExitButton;
	var BevelImages, ButtonImages, TaskButtonPanel;
	var ProgressFlag;
};
SolarCockpitConsoleView.prototype = new GenieSubView();
SolarCockpitConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.ProgressFlag = false;
};
SolarCockpitConsoleView.prototype.SetControls = function() {

	if (Game.CheckMobile()) {
		this.ProgressButton = this.SetImageButton(this.Specs.BUTTON.PROGRESS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
		this.BevelImages = new GenieImage();
		this.BevelImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.IMAGE.BEVEL);
		this.ButtonImages = new GenieImage();
		this.ButtonImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOBILE], this.Specs.BUTTOnPANEL.TASKS.IMAGE);
		this.TaskButtonPanel = new GenieButtonPanel();
		this.TaskButtonPanel.Set(this.Canvas, this.Specs.BUTTOnPANEL.TASKS, this.BevelImages);
		this.TaskButtonPanel.SetButtonPics(this.ButtonImages);
		this.Controls.push(this.TaskButtonPanel);
	}
};
SolarCockpitConsoleView.prototype.ShowControls = function() {  //UNLOGGED

	this.TaskButtonPanel.Show();
//	if (Game.CheckMobile())
		this.ProgressButton.Show();
};
SolarCockpitConsoleView.prototype.Update = function() {  //UNLOGGED

	if (Game.CheckMobile()) {

		//Check if formation has changed
		if (this.TaskButtonPanel.CheckButtonPressed())
			if (this.TaskButtonPanel.ButtonPressed==this.MainView.Specs.TASK.WORDS)
				this.MainView.LaunchWordGames();

		if (this.ExitButton.CheckClicked())
			this.MainView.CloseAll();
	}
};
SolarCockpitConsoleView.prototype.Draw = function() {  //UNLOGGED
	//UNLOGGED
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(2,   2, 100, 202,    "black", 0);
	this.GraphicsTool.DrawRectangle(0,   0, 104, 104,   GREY.ASH, 2);
	this.GraphicsTool.DrawRectangle(2,   2, 100, 100, GREY.LIGHT, 1);
	this.GraphicsTool.DrawRectangle(2, 102, 100,   2,   GREY.ASH, 0);
	this.GraphicsTool.DrawRectangle(2, 104, 100, 100, GREY.LIGHT, 1);
	this.GraphicsTool.ResetContext();
};
