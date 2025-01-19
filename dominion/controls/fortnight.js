
//-----------------------------------------------------------
//---------- DOMINION FORTNIGHT CALENDAR --------------------
var DominionFortnightCalendar = function() {
	var FortnightDigitImages;
};
DominionFortnightCalendar.prototype = new GenieControl();
DominionFortnightCalendar.prototype.Set = function(cnvs, specs) {
	GenieControl.prototype.Set.call(this, cnvs, specs);

	this.FortnightDigitImages = new GenieImage();
	this.FortnightDigitImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FORTNIGHtDIGItIMAGES);
};
DominionFortnightCalendar.prototype.Draw = function() {

	this.Erase();

	GenieControl.prototype.Draw.call(this);

	//Digits
	if (Game.Fortnight<10)
		this.FortnightDigitImages.DrawPatchNumber(Game.Fortnight, this.Specs.L+15, this.Specs.T+12);
	else if (Game.Fortnight==100) {
		this.FortnightDigitImages.DrawPatchNumber(1, this.Specs.L+2, this.Specs.T+12);
		this.FortnightDigitImages.DrawPatchNumber(0, this.Specs.L+9, this.Specs.T+12);
		this.FortnightDigitImages.DrawPatchNumber(0, this.Specs.L+29, this.Specs.T+12);
	} else {
		this.FortnightDigitImages.DrawPatchNumber(Game.Fortnight % 10, this.Specs.L+5, this.Specs.T+12);
		this.FortnightDigitImages.DrawPatchNumber(Math.floor(Game.Fortnight/10), this.Specs.L+26, this.Specs.T+12);
	}
};
