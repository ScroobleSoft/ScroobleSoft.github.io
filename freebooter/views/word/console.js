
//--------------------------------------------------------
//---------- SOLAR WORDS CONSOLE VIEW --------------------
var SolarWordsConsoleView = function() {
	var HelpButton, NewButton, ExitButton;
	var KeyButtonImages, KeyLetterImages;
	var Keys;
};
SolarWordsConsoleView.prototype = new GenieSubView();
SolarWordsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.SetKeys();
};
SolarWordsConsoleView.prototype.SetImages = function() {

	this.KeyButtonImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.BUTTON);
	this.KeyLetterImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.LETTERS);
};
SolarWordsConsoleView.prototype.SetControls = function() {

	this.HelpButton = this.SetImageButton(this.Specs.BUTTON.HELP, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
	this.NewButton = this.SetImageButton(this.Specs.BUTTON.NEW, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
	this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
};
SolarWordsConsoleView.prototype.SetKeys = function() {
	var i;

	this.Keys = ArrayUtils.Create(this.Specs.KEY.COUNT, SolarWordKey);
	for (i=0;i<this.Specs.KEY.COUNT;++i)
		this.Keys[i].Set(this.Specs.KEY, i);
};
SolarWordsConsoleView.prototype.Update = function() {

	if (this.HelpButton.CheckClicked()) {
		//-open relevant screen
	}

	if ( this.MainView.InfoView.State==VIEW.WORDS.STATE.GAME || this.MainView.InfoView.State==VIEW.WORDS.STATE.SOLVED )
		if (this.NewButton.CheckClicked()) {
			this.MainView.InfoView.State = VIEW.WORDS.STATE.INTRO;
			this.MainView.InfoView.ColourScape();
			this.MainView.InfoView.ShowControls();
		}

	if (this.ExitButton.CheckClicked())
		this.MainView.CloseWordGames();
};
SolarWordsConsoleView.prototype.UpdateClick = function() {
	var i;

	if (this.MainView.InfoView.State==VIEW.WORDS.STATE.GAME)
		for (i=0;i<this.Specs.KEY.COUNT;++i)
			if (this.Keys[i].CheckClicked()) {
				this.PressKey(i);
				this.MainView.InfoView.UpdateKeyClick(this.Keys[i]);
				return;
			}
};
SolarWordsConsoleView.prototype.Draw = function() {

	if (Game.CheckMobile()) {
		this.DisplayKeys();
		this.DisplaySolarons();
	}
};
SolarWordsConsoleView.prototype.DisplayKeys = function() {
	var i;

	for (i=0;i<this.Specs.KEY.COUNT;++i)
		this.DrawKey(i);
};
SolarWordsConsoleView.prototype.PressKey = function(iKey) {

	this.KeyButtonImages.DrawPatchNumber(1, this.Keys[iKey].BoundingBox.L, this.Keys[iKey].BoundingBox.T);
	this.KeyLetterImages.DrawPatchNumber(iKey, this.Keys[iKey].BoundingBox.L+this.Specs.KEY.O.X, this.Keys[iKey].BoundingBox.T+this.Specs.KEY.O.Y);
	setTimeout(this.DrawKey.bind(this, iKey), 60);
};
SolarWordsConsoleView.prototype.DrawKey = function(iKey) {

	this.KeyButtonImages.DrawPatchNumber(0, this.Keys[iKey].BoundingBox.L, this.Keys[iKey].BoundingBox.T);
	this.KeyLetterImages.DrawPatchNumber(iKey, this.Keys[iKey].BoundingBox.L+this.Specs.KEY.O.X, this.Keys[iKey].BoundingBox.T+this.Specs.KEY.O.Y);
};
SolarWordsConsoleView.prototype.DisplaySolarons = function() {

	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(40, 155, 116, 25, this.Specs.COLOUR, 0);
	this.GraphicsTool.ResetContext();
	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Solarons: "+PlayerPilot.Solarons, 40, 175, { FONT: "16px Arial", COLOUR: "white" } );
	this.TextWriter.ResetContext();
};
