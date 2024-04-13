
//---------------------------------------------
//---------- GENIE DIAMOND --------------------
var GenieDiamond = function() {
   var Radius;
   var Corners;

   var i;
};
GenieDiamond.prototype = new GenieShape();
GenieDiamond.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   if (this.Specs)
      this.Reset();
};
GenieDiamond.prototype.Reset = function() {
   GenieShape.prototype.Reset.call(this);

   this.Radius = this.Specs.R;
   this.SetCorners();
};
GenieDiamond.prototype.SetCorners = function() {
   this.Corners = [ { X: 0, Y: -this.Radius }, { X: this.Radius, Y: 0 }, { X: 0, Y: this.Radius }, { X: -this.Radius, Y: 0 } ];
};
GenieDiamond.prototype.Draw = function(x, y, rds, colour, lWidth, style, opcty) {

   //UNLOGGED - very basic right now, quick and dirty

   if (this.LineWidth) {
      this.Context.lineWidth = this.LineWidth;
      this.Context.strokeStyle = colour || this.Colour;
   } else
      this.Context.fillStyle = colour || this.Colour;
   this.Context.beginPath();
   this.Context.moveTo(x+this.Corners[0].X, y+this.Corners[0].Y);
   for (this.i=1;this.i<VERTICES.DIAMOND;++this.i)
      this.Context.lineTo(x+this.Corners[this.i].X, y+this.Corners[this.i].Y);
   if (this.LineWidth) {
      this.Context.lineTo(x+this.Corners[0].X, y+this.Corners[0].Y);
      this.Context.stroke();
   } else
      this.Context.fill();
   this.Context.closePath();
};
GenieDiamond.prototype.SpecsDraw = function() {
   this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.Specs.R, this.Specs.COLOUR, this.Specs.LINeW);
};
GenieDiamond.prototype.QuickDraw = function() {
   this.ExecuteDraw(this.X, this.Y, this.Radius, this.Colour, this.LineWidth);
};
