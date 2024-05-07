
//------------------------------------------------------
//---------- SLIDESHOW CONSOLE VIEW --------------------
var SlideshowConsoleView = function() {
	var GalleriesButton;
};
SlideshowConsoleView.prototype = new GenieSubView();
SlideshowConsoleView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
SlideshowConsoleView.prototype.SetControls = function() {

	this.GalleriesButton = new ImageButton();
	this.GalleriesButton.Set(this.Canvas, this.Specs.BUTTON.GALLERIES, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.GalleriesButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.GalleriesButton);
};
SlideshowConsoleView.prototype.Draw = function() {
	var cntxt;

	cntxt = RaisedCornerImages.Context;
	RaisedCornerImages.Context = this.Context;

	GenieSubView.prototype.Draw.call(this);

	RaisedCornerImages.Context = cntxt;
};
SlideshowConsoleView.prototype.Update = function() {
	//UNLOGGED

	if (this.GalleriesButton.CheckClicked())
		this.MainView.ReturnToGalleries();
};
