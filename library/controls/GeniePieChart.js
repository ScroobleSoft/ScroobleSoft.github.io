/*
 *  NOTE: only specs-based
 */
//-----------------------------------------------
//---------- GENIE PIE CHART --------------------	specs: { SLICES: -1, X: -1, Y: -1, RADIUS: -1, COLOURS: [] }
var GeniePieChart = function() {
   var Slices;
   var Angle, CumulativeAngle;
};
GeniePieChart.prototype = new GenieControl();
GeniePieChart.prototype.Set = function(canvas, specs) {
   GenieControl.prototype.Set.call(this, canvas, specs);

   this.Slices = new Array(this.Specs.SLICES);
};
GeniePieChart.prototype.SetSlices = function(slcs) {

   for (this.i=0;this.i<this.Specs.SLICES;++this.i)
      this.Slices[this.i] = slcs[this.i];
};
GeniePieChart.prototype.Draw = function(x, y) {

   this.CumulativeAngle = 0;
   x = x || this.Specs.X;
   y = y || this.Specs.Y;
   this.GraphicsTool.SwitchContext(this.Context);
   for (this.i=0;this.i<this.Specs.SLICES;++this.i) {
      this.Angle = 360*(this.Slices[this.i]/100);
      this.GraphicsTool.DrawArc(x, y, this.Specs.RADIUS, this.CumulativeAngle, this.CumulativeAngle+this.Angle, this.Specs.COLOURS[this.i], 0);
      this.CumulativeAngle += this.Angle;

      //Write label if required
      if (this.Specs.LABELS) {
	 this.x = x + (this.Specs.RADIUS*Math.sin(Utilities.DegreesToRadians(this.CumulativeAngle)));
	 this.y = y + (this.Specs.RADIUS*Math.cos(Utilities.DegreesToRadians(this.CumulativeAngle)));
	 this.Screen.fillText(this.Specs.LABELS[this.i], this.x, this.y);
      }
   }
   this.GraphicsTool.RestoreContext();
};
