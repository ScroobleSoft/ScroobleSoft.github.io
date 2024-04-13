
//var PIeCHART = { PERCENTAGE: 0, COLOUR: 1, LABEL: 2 };

//------------------------------------------------
//---------- GENIE LINE CHART --------------------	specs: { LINES: -1, COLOUR: { BACKGROUND: "", AXES: "" }, COLOURS: ["","",""], LW: -1 }
var GenieLineChart = function() {
   var Positions;

   var i, lw;
};
GenieLineChart.prototype = new GenieControl();
GenieLineChart.prototype.Set = function(canvas, specs) {
   GenieControl.prototype.Set.call(this, canvas, specs);

   this.Positions = ArrayUtils.Create(this.Specs.LINES, Coordinate2D);
};
GenieLineChart.prototype.SetLines = function(aPos) {	//NOTE: aPos- array of .Y values
   var i;

   for (i=0;i<this.Specs.LINES;++i) {
      this.Positions[i].X = 0;
      this.Positions[i].Y = aPos[i];
   }
};
GenieLineChart.prototype.Update = function(aPos) {	//NOTE: aPos- array of .X/.Y coords

   this.lw = this.Context.lineWidth;
   this.Context.lineWidth = this.Specs.LW || 1;
   for (this.i=0;this.i<this.Specs.LINES;++this.i)
      if (aPos[this.i].X!=this.Positions[this.i].X || aPos[this.i].Y!=this.Positions[this.i].Y) {
	 this.Context.strokeStyle = this.Specs.COLOURS[this.i];
	 this.Context.beginPath();
	 this.Context.moveTo(this.Specs.L+6+this.Positions[this.i].X, this.Specs.T+this.Specs.H-(this.Positions[this.i].Y+5));
	 this.Context.lineTo(this.Specs.L+6+aPos[this.i].X, this.Specs.T+this.Specs.H-(aPos[this.i].Y+5));
	 this.Context.stroke();
	 this.Context.closePath();
	 this.Positions[this.i].X = aPos[this.i].X;
	 this.Positions[this.i].Y = aPos[this.i].Y;
      }
   this.Context.lineWidth = this.lw;
};
GenieLineChart.prototype.Draw = function(x, y) {
   var x, y, l;

   //UNLOGGED - very basic right now (only axes, no markings)

   //Draw background
   if (this.Specs.COLOUR)
      this.Context.fillStyle = this.Specs.COLOUR.BACKGROUND || GREY.LIGHT;
   else
      this.Context.fillStyle = GREY.LIGHT;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

   //Draw axes
   if (this.Specs.COLOUR)
      this.Context.strokeStyle = this.Specs.COLOUR.AXES || "black";
   else
      this.Context.strokeStyle = "black";
   x = this.Specs.L + 5;
   y = this.Specs.T + 5;
   l = this.Specs.H - 10;
   this.GraphicsTool.DrawVerticalLine( { X: x, Y: y }, l, "black", 1);
   x = this.Specs.L + 5;
   y = this.Specs.T + this.Specs.H - 5;
   l = this.Specs.L + this.Specs.W - 10;
   this.GraphicsTool.DrawHorizontalLine( { X: x, Y: y }, l, "black", 1);
};
