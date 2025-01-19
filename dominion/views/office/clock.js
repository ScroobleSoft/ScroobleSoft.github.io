
// simple design - 3px circle w/ 2 lines (2px?) rotating with proper timing, as well as bullets/notches/diamonds or hour markers

//--------------------------------------------
//---------- OFFICE CLOCK --------------------
var OfficeClock = function() {
   var GraphicsTool;
   var Specs;
   var HourMarks;
   var Hour;
   var Minutes;
   var Seconds;
};
OfficeClock.prototype = {
   Set(gTool, specs) {
      this.GraphicsTool = gTool;
      this.Specs = specs;
      this.Hour = 9;
      this.Minutes = 0;
//      this.Seconds = 0;
      this.Seconds = 15;  //TEMP: just to see how it looks
      this.HourMarks = Utilities.CreateArray(this.Specs.HOURS, Coordinate2D);
      this.SetMarks();
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

      //LOGGED

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
