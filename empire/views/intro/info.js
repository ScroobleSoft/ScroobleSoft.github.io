
//--------------------------------------------------------
//---------- IMPERIAL INTRO INFO VIEW --------------------
var ImperialIntroInfoView = function() {
	var MonthTouchBar;
	var CellImage, SelectionImage, DigitImages;
	var SelectedCell;
	var Day, Month, Year, Days;
};
ImperialIntroInfoView.prototype = new GenieSubView();
ImperialIntroInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.DetermineDate();
};
ImperialIntroInfoView.prototype.SetControls = function() {

	this.MonthTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.MONTH, this.Specs.TOUChBAR.MONTH.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
ImperialIntroInfoView.prototype.SetImages = function() {

	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.CELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.SELECTION);
	this.DigitImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], this.Specs.IMAGE.DIGITS);
};
ImperialIntroInfoView.prototype.DetermineDate = function() {
	var date;

	date = new Date();
	this.Day = date.getDate();
	this.Month = date.getMonth();
	this.Year = date.getFullYear();
	if (this.Year % 4==0)
		++DaysInMonth[MONTH.FEBRUARY];

	this.MonthTouchBar.Specs.SELECT = this.Month;
};
ImperialIntroInfoView.prototype.Update = function() {  //UNLOGGED

	//-redraw grid every time a new month is selected
	//-in the future, the year will have to be selected, probably from an icon panel at the bottom
};
ImperialIntroInfoView.prototype.Draw = function() {

	this.DrawCells();
	Text.SetContext(this.Context);
	Text.Write(this.Day + " " + Months[this.Month] + " " + this.Year, 25, 285);
	Text.ResetContext();
};
ImperialIntroInfoView.prototype.DrawCells = function() {

	this.DisplayBackground();
	this.DisplayDigits();
	this.DisplaySelection();
};
ImperialIntroInfoView.prototype.DisplayBackground = function() {

	//Draw background
	Graphics.SetContext(this.Context);
	if (this.Month==MONTH.FEBRUARY) {
		Graphics.DrawRectangle(16, 76, 186, 123, "white", 0);
		if (this.DaysInMonth[MONTH.FEBRUARY]==28)
			Graphics.DrawRectangle(16, 199, 30, 30, "white", 0);
		else
			Graphics.DrawRectangle(16, 199, 61, 30, "white", 0);
	} else {
		Graphics.DrawRectangle(16, 76, 186, 154, "white", 0);
		if (DaysInMonth[this.Month]==31)
			Graphics.DrawRectangle(16, 230, 30, 30, "white", 0);
	}
	Graphics.ResetContext();
};
ImperialIntroInfoView.prototype.DisplayDigits = function() {  //TODO: don't display future days
	var c, r;
	var x, y;
	var iDay;

	iDay = 1;
	for (r=0;r<6;++r)  //TEMP numbers
		for (c=0;c<6;++c) {  //TEMP numbers

			//Cells
			x = 15 + (c*(this.Specs.IMAGE.CELL.W-1));
			y = 75 + (r*(this.Specs.IMAGE.CELL.H-1));
			this.CellImage.Draw(x, y);

			//Digits
			if (iDay<10)
				this.DigitImages.DrawPatchNumber(iDay, x+11, y+10);
			else {
				this.DigitImages.DrawPatchNumber(Math.floor(iDay/10), x+7, y+10);
				this.DigitImages.DrawPatchNumber(iDay % 10, x+17, y+10);
			}

			//Check if all days have been displayed
			if (iDay==DaysInMonth[this.Month])
				return;

			++iDay;
		}
};
ImperialIntroInfoView.prototype.DisplaySelection = function() {  //TODO: don't display future days
	var c, r;
	var x, y;

	c = (this.Day-1) % 6;
	r = Math.floor((this.Day-1)/6);
	x = this.Specs.GRID.X + this.Specs.GRID.CELL.LW + (c*(this.Specs.GRID.CELL.W+this.Specs.GRID.CELL.LW));
	y = this.Specs.GRID.Y + this.Specs.GRID.CELL.LW + (r*(this.Specs.GRID.CELL.H+this.Specs.GRID.CELL.LW));
	this.SelectionImage.Draw(x, y);
};
