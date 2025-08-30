
// * fortnight counter display (i.e., showing days ticking by, using a form such as a thumb on a ruler)

//-----------------------------------------------
//---------- OFFICE CALENDAR --------------------
var OfficeCalendar = function() {
	var GraphicsTool;
	var ImageSpecs;
	var Day, Week, Fortnight;
	var DigitImages, ColonImage;
};
OfficeCalendar.prototype = new OfficeItem();
OfficeCalendar.prototype.Set = function(specs, pic, iSpecs, gTool) {
	OfficeItem.prototype.Set.call(this, specs, pic);

	this.GraphicsTool = gTool;
	this.ImageSpecs = iSpecs;
	this.Day = 0;
	this.Week = 0;
	this.Fortnight = 0;
	this.SetImages();
};
OfficeCalendar.prototype.SetImages = function() {

	this.DigitImages = new GenieImage();
	this.DigitImages.Set(this.GraphicsTool.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.ImageSpecs.DIGITS);
	this.ColonImage = new GenieImage();
	this.ColonImage.Set(this.GraphicsTool.Context, ImageManager.Pics[IMAGeINDEX.OFFICE], this.ImageSpecs.COLON);
};
OfficeCalendar.prototype.Increment = function() {

	if (Game.Type==DOMINION.GAME.SURVIVAL) {
		++this.Day;
		if (this.Day==CALENDAR.DAYS.FORTNIGHT) {
			++this.Fortnight;
			this.Day = 0;
		}
	} else if (Game.Type==DOMINION.GAME.MULTiCHOICE) {
		++this.Day;
		if (this.Day==CALENDAR.DAYS.Week) {
			++this.Week;
			this.Day = 0;
		}
	}
};
OfficeCalendar.prototype.Draw = function() {

	//Outline and background
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 0);
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);
	this.GraphicsTool.DrawHorizontalLine( { X: this.Specs.L, Y: this.Specs.T+this.Specs.BAND }, this.Specs.W, "black", 1);

	//Label
	this.Pic.Draw();

	this.DisplayDigits();
};
OfficeCalendar.prototype.DisplayDigits = function() {
	var n;

	this.Pic.Draw();
	if (Game.Type==DOMINION.GAME.SURVIVAL) {
		n = Math.floor(this.Fortnight/10);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.FORTNIGHT.X, this.ImageSpecs.FORTNIGHT.Y);
		n = this.Fortnight % 10;
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.FORTNIGHT.X+this.ImageSpecs.GAP, this.ImageSpecs.FORTNIGHT.Y);
		this.ColonImage.Draw();
		n = Math.floor(this.Day/10);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.DAY.X, this.ImageSpecs.DAY.Y);
		n = this.Day % 10;
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.DAY.X+this.ImageSpecs.GAP, this.ImageSpecs.DAY.Y);
	} else if (Game.Type==DOMINION.GAME.MULTiCHOICE) {
		n = Math.floor(this.Week/100);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X, this.ImageSpecs.WEEK.Y);
		n = Math.floor(this.Week/10);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X+this.ImageSpecs.GAP, this.ImageSpecs.WEEK.Y);
		n = this.Week % 10;
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X+(2*this.ImageSpecs.GAP), this.ImageSpecs.WEEK.Y);
	} else {		//Free form
		n = Math.floor(this.Fortnight/100);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X, this.ImageSpecs.WEEK.Y);
		n = Math.floor(this.Fortnight/10);
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X+this.ImageSpecs.GAP, this.ImageSpecs.WEEK.Y);
		n = this.Fortnight % 10;
		this.DigitImages.DrawPatchNumber(n, this.ImageSpecs.WEEK.X+(2*this.ImageSpecs.GAP), this.ImageSpecs.WEEK.Y);
	}
};
