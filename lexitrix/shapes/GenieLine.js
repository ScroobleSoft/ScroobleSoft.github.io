
//--------------------------------------------------
//---------- GENIE LINE GRAPHIC --------------------
var GenieLineGraphic = function() {
   var Point1, Point2;

   var i;
};
GenieLineGraphic.prototype = new GenieShape();
GenieLineGraphic.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Point1 = new Coordinate2D();
   this.Point2 = new Coordinate2D();
   if (this.Specs)
      this.Reset();
};
GenieLineGraphic.prototype.Reset = function() {
   GenieShape.prototype.Reset.call(this);

   if (this.Specs.P1) {
      this.Point1.X = this.Specs.P1.X;
      this.Point1.Y = this.Specs.P1.Y;
   }
   if (this.Specs.P2) {
      this.Point2.X = this.Specs.P2.X;
      this.Point2.Y = this.Specs.P2.Y;
   }
};
GenieLineGraphic.prototype.Draw = function(x, y, p1, p2, colour, lWidth) {

   //UNLOGGED

   this.ExecuteDraw(x, y, p1, p2, colour, lWidth);  //TEMP
};
GenieLineGraphic.prototype.SpecsDraw = function(x, y) {
   x = x || 0;
   y = y || 0;
   this.ExecuteDraw(x, y, this.Specs.P1, this.Specs.P2, this.Specs.COLOUR, this.Specs.LINeW);
};
GenieLineGraphic.prototype.QuickDraw = function(x, y) {
   x = x || 0;
   y = y || 0;
   this.ExecuteDraw(x, y, this.Point1, this.Point2, this.Colour, this.LineWidth);
};
GenieLineGraphic.prototype.ExecuteDraw = function(x, y, p1, p2, colour, lWidth) {
   this.Context.lineWidth = lWidth;
   this.Context.strokeStyle = colour;
   this.Context.beginPath();
   this.Context.moveTo(x+p1.X, y+p1.Y);
   this.Context.lineTo(x+p2.X, y+p2.Y);
   this.Context.stroke();
   this.Context.closePath();
};
GenieLineGraphic.prototype.DrawGrid = function(x, y, specs) {
   x = x || 0;
   y = y || 0;
   specs = specs || this.Specs.GRID;

   //Horizontal lines
   for (this.i=0;this.i<specs.H;this.i+=(specs.H/specs.R))
      this.ExecuteDraw(x, y, { X: 0, Y: this.i }, { X: (specs.H-1), Y: this.i }, specs.COLOUR, specs.LINeW);

   //Vertical lines
   for (this.i=0;this.i<specs.W;this.i+=(specs.W/specs.C))
      this.ExecuteDraw(x, y, { X: this.i, Y: 0 }, { X: this.i, Y: (specs.W-1) }, specs.COLOUR, specs.LINeW);
};
GenieLineGraphic.prototype.DrawBasReliefGrid = function(x, y, specs) {
   x = x || 0;
   y = y || 0;
   x -= 0.5;
   y -= 0.5;
   if (specs) {
      specs.LINeW = 2;
      specs.COLOUR = "black";
   } else {
      this.Specs.GRID.LINeW = 2;
      this.Specs.GRID.COLOUR = "black";
   }
   this.DrawGrid(x, y, specs);
   if (specs)
      specs.COLOUR = "white";
   else
      this.Specs.GRID.COLOUR = "white";
   this.DrawGrid(x+1, y+1, specs);
};
