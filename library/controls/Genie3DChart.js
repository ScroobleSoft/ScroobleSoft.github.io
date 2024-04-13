/*
 *  specs: { L: -1, T: -1, W: -1, H: -1, BARS: -1, BAR: { W: -1, GAP: -1, MAX: -1 }, COLOUR: { MAIN: "", SIDE: "", TOP: "" } },
 *										     COLOURS: [ { MAIN: "", SIDE: "", TOP: "" } ] . . . }	(alternative)
 */
//--------------------------------------------------
//---------- GENIE 3D BAR CHART --------------------
var Genie3DBarChart = function() {
   var Values;
   var SideQuad, TopQuad;
   var BarHeight;

   var i, h, colour;
};
Genie3DBarChart.prototype = new GenieControl();
Genie3DBarChart.prototype.Set = function(canvas, specs) {
   GenieControl.prototype.Set.call(this, canvas, specs);

   this.SideQuad = Utilities.CreateArray(4, Coordinate2D);
   this.SideQuad[0].Set(0, 0);
   this.SideQuad[1].Set(this.Specs.BAR.W/2, -this.Specs.BAR.W/2);
   this.TopQuad = Utilities.CreateArray(4, Coordinate2D);
   this.TopQuad[0].Set(0, 0);
   this.TopQuad[1].Set(this.Specs.BAR.W, 0);
   this.TopQuad[2].Set(1.5*this.Specs.BAR.W, -this.Specs.BAR.W/2);
   this.TopQuad[3].Set(0.5*this.Specs.BAR.W, -this.Specs.BAR.W/2);
};
Genie3DBarChart.prototype.SetValues = function(vals) {
   this.Values = vals;
};
Genie3DBarChart.prototype.SetColours = function(colours) {
   this.Specs.COLOURS = colours;
};
Genie3DBarChart.prototype.Draw = function() {
   this.GraphicsTool.SwitchContext(this.Context);
   this.Context.fillStyle = GREY.LIGHT;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   this.DrawAxes();
   this.DrawBars();
   this.GraphicsTool.RestoreContext();
};
Genie3DBarChart.prototype.DrawAxes = function() {
   offst = this.Specs.BAR.W/2;

   //Y-axis
   coords.X = this.Specs.L + 5;
   coords.Y = this.Specs.T + 5 + offst;
   this.GraphicsTool.DrawVerticalLine(coords, this.Specs.H-(offst+10), "black", 1);

   //Depth diagonal
   coords.Y = this.Specs.T + (this.Specs.H - 5);
   coords2.X = coords.X + offst;
   coords2.Y = coords.Y - offst;
   this.GraphicsTool.DrawLine(coords, coords2, "black", 1);

   //Depth y-axis
   coords.X = coords2.X;
   coords.Y = this.Specs.T + this.Specs.H - (offst+5);
   this.GraphicsTool.DrawVerticalLine(coords, -(this.Specs.H-(offst+10)), "black", 1);

   //X-axis
   coords.X = this.Specs.L + 5;
   coords.Y = this.Specs.T + (this.Specs.H-5);
   this.GraphicsTool.DrawHorizontalLine(coords, this.Specs.W-10, "black", 1);

   //Depth x-axis
   coords.X += offst;
   coords.Y -= offst;
   this.GraphicsTool.DrawHorizontalLine(coords, this.Specs.W-(10+offst), "black", 1);
};
Genie3DBarChart.prototype.DrawBars = function() {
   for (indx=0;indx<this.Specs.BARS;++indx) {
   coords.X = this.Specs.L + this.Specs.BAR.GAP + (iBar*(this.Specs.BAR.GAP+this.Specs.BAR.W));
   coords.Y = this.Specs.T + this.Specs.H - 6;
   this.BarHeight = (this.Values[iBar]/this.Specs.BAR.MAX)*(this.Specs.H-(10+(this.Specs.BAR.W/2)));
   if (this.Specs.COLOUR) {
      colour = this.Specs.COLOUR.MAIN;
      colour2 = this.Specs.COLOUR.SIDE;
      colour3 = this.Specs.COLOUR.TOP;
   } else {
      colour = this.Specs.COLOURS[iBar][0];
      colour2 = this.Specs.COLOURS[iBar][1];
      colour3 = this.Specs.COLOURS[iBar][2];
   }
   this.GraphicsTool.DrawRectangle(coords.X, coords.Y, this.Specs.BAR.W, -this.BarHeight, colour, 0);		//main
   this.SideQuad[2].Set(this.SideQuad[1].X, this.SideQuad[1].Y-this.BarHeight);
   this.SideQuad[3].Set(this.SideQuad[0].X, this.SideQuad[0].Y-this.BarHeight);
   this.GraphicsTool.DrawPolygon(coords.X+this.Specs.BAR.W, coords.Y, this.SideQuad, colour2, 0);		//side
   coords.Y -= this.BarHeight;
   this.GraphicsTool.DrawPolygon(coords.X, coords.Y, this.TopQuad, colour3, 0);					//top
   }
};
