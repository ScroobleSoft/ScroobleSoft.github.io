
//------------------------------------------------
//---------- SOLAR INTRO VIEW --------------------
var SolarIntroView = function() {
};
SolarIntroView.prototype = new GenieView();
SolarIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
/*  UNLOGGED
SolarIntroView.prototype.SetControls = function() {

	if (Game.CheckMobile())
		this.SetMobileControls();
	else {
		this.SetSpinControls();
		this.SetPaginations();
		this.SetAllTouchBars();
		this.SetDTouchBars();
		this.SetMTouchBars();
		this.SetATouchBars();
	}
};
*/
/*  UNLOGGED
SolarIntroView.prototype.SetMobileControls = function() {

	//Pagination
	this.MobilePaginationImage = new GenieImage();
	this.MobilePaginationImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.PAGINATION.MOBILE.IMAGE);
	this.MobilePagination = new GeniePagination();
	this.MobilePagination.Set(this.Canvas, this.Specs.PAGINATION.MOBILE, this.Specs.PAGINATION.MOBILE.IMAGE);
	this.Controls.push(this.MobilePagination);

	//Buttons
	this.BuyButton = new ImageButton();
	this.BuyButton.Set(this.Canvas, this.Specs.BUTTON.BUY, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.BuyButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.BuyButton);
	this.SellButton = new ImageButton();
	this.SellButton.Set(this.Canvas, this.Specs.BUTTON.SELL, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.SellButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.SellButton);
};
*/
SolarIntroView.prototype.Open = function() {  //UNLOGGED
	GenieView.prototype.Open.call(this);

	Starfield.Generate();
	this.Update();
};
SolarIntroView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	Starfield.Draw();
	Cockpit.Draw();
	Starfield.Update();
	this.InfoView.Update();
	this.ConsoleView.Update();
};
SolarIntroView.prototype.CloseAll = function() {  //Mobile only, possibly . . . UNLOGGED

	GenieView.prototype.Close.call(this, this.OpenDockedView.bind(this), 100);
};
SolarIntroView.prototype.OpenDockedView = function() {

	DockedView.Open();
};
