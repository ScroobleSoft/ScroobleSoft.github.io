
//--------------------------------------------------------------
//---------- DOMINION CALENDAR TABLOID VIEW --------------------
var DominionCalendarTabloidView = function() {
	var FortnightPadImage, FortnightPad, DayMeterImage, DayMeter;
};
DominionCalendarTabloidView.prototype = new GenieView();
DominionCalendarTabloidView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
DominionCalendarTabloidView.prototype.SetControls = function() {

	this.FortnightPadImage = new GenieImage();
	this.FortnightPadImage.Set(this.Canvas, ImageManager.Pics[IMAGeINDEX.CONTROLS], FORTNIGHtPAdIMAGE);
	this.FortnightPad = new DominionFortnightCalendar();
	this.FortnightPad.Set(this.Canvas, FORTNIGHtPAD, this.FortnightPadImage);

	this.DayMeterImage = new GenieImage();
	this.DayMeterImage.Set(this.Canvas, ImageManager.Pics[IMAGeINDEX.CONTROLS], DAyMETErIMAGE);
	this.DayMeter = new DominionDayMeter();
	this.DayMeter.Set(this.Canvas, DAyMETER, this.DayMeterImage);
};
