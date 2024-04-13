
//-----------------------------------------------
//---------- GENIE BAR CHART --------------------
var GenieBarChart = function() {
   var Bars;
   var BarSpacing;

   var i, h, colour;
};
GenieBarChart.prototype = new GenieControl();
GenieBarChart.prototype.Set = function(canvas, specs) {
   GenieControl.prototype.Set.call(this, canvas, specs);

   this.Bars = new Array(this.Specs.BAR.COUNT);
   this.BarSpacing = Math.round(((this.Specs.W-10) - (this.Specs.BAR.COUNT*this.Specs.BAR.W))/this.Specs.BAR.COUNT+1);	//HARD-CODED
};
GenieBarChart.prototype.Update = function(nBar, val) {  //NOTE: val signifies percentage
   this.Bars[nBar] = val;
};
GenieBarChart.prototype.Draw = function(x, y) {

   //UNLOGGED - a few glitches

   //Draw background
   this.Context.fillStyle = GREY.LIGHT;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

   //Draw axes
   this.GraphicsTool.SwitchContext(this.Context);
   this.x1 = this.Specs.L + 4;
   this.y1 = this.Specs.T + 4;
   this.x2 = this.Specs.L + 4;
   this.y2 = this.Specs.T + this.Specs.H - 4;
   this.GraphicsTool.DrawVerticalLine(this.x1, this.y1, this.x2, this.y2, "black", 1);
   this.x1 = this.Specs.L + 4;
   this.y1 = this.Specs.T + this.Specs.H - 4;
   this.x2 = this.Specs.L + this.Specs.W - 4;
   this.y2 = this.Specs.T + this.Specs.H - 4;
   this.GraphicsTool.DrawHorizontalLine(this.x1, this.y1, this.x2, this.y2, "black", 1);

   //Draw bars
   for (this.i=0;this.i<this.Bars.length;++this.i) {
      this.h = Math.round((this.Specs.H-10)*(this.Bars[this.i]/100));
      this.x = this.Specs.L + 5 + ((this.i+1)*this.BarSpacing) + (this.i*this.Specs.BAR.W);
      this.y = ((this.Specs.T+this.Specs.H)-5) - this.h;
      this.GraphicsTool.DrawRectangle(this.x, this.y, this.Specs.BAR.W, this.h, this.Specs.COLOURS[this.i], 0);
   }
   this.GraphicsTool.RestoreContext();
};
