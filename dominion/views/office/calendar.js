
// * fortnight counter display (i.e., showing days ticking by, using a form such as a thumb on a ruler)

//-----------------------------------------------
//---------- OFFICE CALENDAR --------------------
var OfficeCalendar = function() {
	var Specs;
	var GraphicsTool;
	var Day, Fortnight;
};
OfficeCalendar.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Day = 0;
		this.Fortnight = 0;
	},
	Increment() {
		++this.Day;
		if (this.Day==CALENDAR.FORTNIGHT) {
			++this.Fortnight;
			this.Day = 0;
		}
	},
	Draw() {  //UNLOGGED

		if (Game.CheckMobile()) {
			this.GraphicsTool.DrawRectangle(this.Specs.MOBILE.L, this.Specs.MOBILE.T, this.Specs.MOBILE.W, this.Specs.MOBILE.H, "white", 0);
			this.GraphicsTool.DrawRectangle(this.Specs.MOBILE.L, this.Specs.MOBILE.T, this.Specs.MOBILE.W, this.Specs.MOBILE.H, "black", 3);
			this.GraphicsTool.DrawHorizontalLine( { X: this.Specs.MOBILE.L, Y: this.Specs.MOBILE.T+this.Specs.MOBILE.BAND }, this.Specs.MOBILE.W, "black", 3);
		} else {
			this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 0);
			this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 3);
			this.GraphicsTool.DrawHorizontalLine( { X: this.Specs.L, Y: this.Specs.T+this.Specs.BAND }, this.Specs.MOBILE.W, "black", 3);
		}
	}
};
