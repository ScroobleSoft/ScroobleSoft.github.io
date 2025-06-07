
//--------------------------------------------------------
//---------- SOLAR WORDS CONSOLE VIEW --------------------
var SolarWordsConsoleView = function() {
	var ExitButton;
	var KeyButtonImages, KeyLetterImages;
};
SolarWordsConsoleView.prototype = new GenieSubView();
SolarWordsConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SolarWordsConsoleView.prototype.SetImages = function() {

	this.KeyButtonImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.BUTTON);
	this.KeyLetterImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.LETTERS);
};
SolarWordsConsoleView.prototype.SetControls = function() {

	this.ExitButton = this.SetImageButton(this.Specs.BUTTON.EXIT, ImageManager.Pics[IMAGeINDEX.MOBILE], RaisedCornerImages);
};
/*
SolarWordsConsoleView.prototype.ShowControls = function() {  //UNLOGGED

	if (Game.CheckMobile()) {
		this.IconContext = IconCornerImages.Context;
		IconCornerImages.Context = this.Context;
		this.FormationIconPanel.Show();
		IconCornerImages.Context = this.IconContext;
		this.AutoSelectButton.Show();
		this.ExitButton.Show();
	}
};
*/
SolarWordsConsoleView.prototype.Update = function() {  //UNLOGGED

	if (Game.CheckMobile()) {

		//Check if formation has changed
//		if (this.FormationIconPanel.CheckMouseDown()) {
//			this.MainView.SetFormation(this.FormationIconPanel.DepressedIcon);
//			this.MainView.Draw();
//		}

		//-subs and auto-select buttons?

//		if (this.ExitButton.CheckClicked())
//			this.MainView.CloseAll();
	}
};
SolarWordsConsoleView.prototype.Draw = function() {  //UNLOGGED

	if (!Game.CheckMobile())
		this.DisplayKeys();
};
SolarWordsConsoleView.prototype.DisplayKeys = function() {  //UNLOGGED
	
};
