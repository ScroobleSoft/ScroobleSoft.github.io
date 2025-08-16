
// simple design - 3px circle w/ 2 lines (2px?) rotating with proper timing, as well as bullets/notches/diamonds or hour markers

//--------------------------------------------
//---------- OFFICE CLOCK --------------------
var OfficeClock = function() {
	var Specs;
	var GraphicsTool;
	var HourMarks;
	var Hour;
	var Minutes;
	var Seconds;
};
OfficeClock.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Hour = 9;
		this.Minutes = 0;
//		this.Seconds = 0;
		this.Seconds = 15;  //TEMP: just to see how it looks
		this.HourMarks = ArrayUtils.Create(this.Specs.HOURS, Coordinate2D);
		this.SetPlatform();
		this.SetMarks();
	},
	SetPlatform() {

		if (Game.CheckMobile()) {
			this.Specs.X = this.Specs.MOBILE.X;
			this.Specs.Y = this.Specs.MOBILE.Y;
			this.Specs.SIZE = this.Specs.MOBILE.SIZE;
		}
	},
	SetMarks() {
		var i;

		for (i=0;i<this.Specs.HOURS;++i) {
			this.HourMarks[i].X = this.Specs.X + (Math.sin((2*Math.PI)*(i/this.Specs.HOURS))*(this.Specs.SIZE-4));
			this.HourMarks[i].Y = this.Specs.Y - (Math.cos((2*Math.PI)*(i/this.Specs.HOURS))*(this.Specs.SIZE-4));
		}
	},
	SetTime(hour, minutes) {
	},
	Update() {
		//seconds hand will move smoothly, and not jerkily
	},
	Draw() {
		var i;
		var x, y;

		//Face
		this.GraphicsTool.DrawCircle(this.Specs.X, this.Specs.Y, this.Specs.SIZE, "white", 0);
		this.GraphicsTool.DrawCircle(this.Specs.X, this.Specs.Y, this.Specs.SIZE, "black", 3);
		for (i=0;i<this.Specs.HOURS;++i)
			this.GraphicsTool.DrawDiamond(this.HourMarks[i].X, this.HourMarks[i].Y, 2, "black", 0);

		//TODO: brand logo?

		//Hands
		x = this.Specs.X + (Math.sin((2*Math.PI)*(this.Hour/this.Specs.HOURS))*(this.Specs.SIZE-12));
		y = this.Specs.Y - (Math.cos((2*Math.PI)*(this.Hour/this.Specs.HOURS))*(this.Specs.SIZE-12));
		this.GraphicsTool.DrawLine(this.Specs, { X: x, Y: y }, "black", 2);
		x = this.Specs.X + (Math.sin((2*Math.PI)*(this.Minutes/this.Specs.MINUTES))*(this.Specs.SIZE-9));
		y = this.Specs.Y - (Math.cos((2*Math.PI)*(this.Minutes/this.Specs.MINUTES))*(this.Specs.SIZE-9));
		this.GraphicsTool.DrawLine(this.Specs, { X: x, Y: y }, "black", 2);
		x = this.Specs.X + (Math.sin((2*Math.PI)*(this.Seconds/this.Specs.SECONDS))*(this.Specs.SIZE-3));
		y = this.Specs.Y - (Math.cos((2*Math.PI)*(this.Seconds/this.Specs.SECONDS))*(this.Specs.SIZE-3));
		this.GraphicsTool.DrawLine(this.Specs, { X: x, Y: y }, "black", 1);
	}
};
