
//---------------------------------------------
//---------- GENIE OCTAGON --------------------  TODO: re-write so it is derived from GeniePolygon
var GenieOctagon = function() {
   var SpecsVertices;
   var Vertices;
   var BasReliefVertices;

   var i;
};
GenieOctagon.prototype = new GenieShape();
GenieOctagon.prototype.Set = function(cntxt, cPad, specs) {
   GenieShape.prototype.Set.call(this, cntxt, cPad, specs);

   this.Sides = 8;
   this.SpecsVertices = this.CalcPad.GetOctagonVertices(this.Specs.SIZE);
   this.Vertices = new GenieArray();
   this.Vertices.Set(8, Coordinate2D);
   this.Reset();
};
GenieOctagon.prototype.Reset = function() {
   var i;

   GenieShape.prototype.Reset.call(this);

   this.Size = this.Specs.SIZE;
   for (i=0;i<8;++i) {
      this.Vertices[i].X = this.SpecsVertices[i].X;
      this.Vertices[i].Y = this.SpecsVertices[i].Y;
   }
};
GenieOctagon.prototype.Draw = function(x, y, size, colour, lWidth, style, opcty) {

   //UNLOGGED

   x = x || this.X;
   y = y || this.Y;
   size = size || this.Size;
   colour = colour || this.Colour;
   colour = colour || "black";
   if (lWidth==null)
      lWidth = this.LineWidth;
   opcty = opcty || this.Opacity;

   if (opcty) {
      this.GlobalAlpha = this.Context.globalAlpha;
      this.Context.globalAlpha = opcty;
   } else
      this.GlobalAlpha = null;

   this.ExecuteDraw(x, y, this.Vertices, colour, lWidth);

   if (this.GlobalAlpha)
      this.Context.globalAlpha = this.GlobalAlpha;
};
GenieOctagon.prototype.SpecsDraw = function() {
   this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.SpecsVertices, this.Specs.COLOUR, this.Specs.LW);
};
GenieOctagon.prototype.QuickDraw = function() {
   this.ExecuteDraw(this.X, this.Y, this.Vertices, this.Colour, this.LineWidth);
};
GenieOctagon.prototype.ExecuteDraw = function(x, y, vrtcs, colour, lWidth) {
   if (lWidth) {
      this.Context.lineWidth = lWidth;
      this.Context.strokeStyle = colour;
   } else
      this.Context.fillStyle = colour;
   this.Context.beginPath();
   this.Context.moveTo(x+vrtcs[0].X, y-vrtcs[0].Y);
   for (this.i=1;this.i<VERTICES.OCTAGON;++this.i)
      this.Context.lineTo(x+vrtcs[this.i].X, y-vrtcs[this.i].Y);
   if (lWidth) {
      this.Context.lineTo(x+vrtcs[0].X, y-vrtcs[0].Y);
      this.Context.stroke();
   } else
      this.Context.fill();
   this.Context.closePath();
};
GenieOctagon.prototype.DrawBasRelief = function(x, y, size) {
/* */
   //UNLOGGED - since at the moment colours, line widths and angles are fixed
   //NOTE: this is only applicable to GJ MOON crater drawings

   if (!this.Vertices) {
      this.Vertices = this.CalcPad.GetPolygonVertices(this.Sides, size);
      this.BasReliefVertices = this.CalcPad.GetPolygonVertices(this.Sides, size-1);
   }

   //Draw light border
   this.Context.lineWidth = 1;
   this.Context.strokeStyle = GREY.MEDIUM;
   this.Context.beginPath();
   this.Context.moveTo(x+this.Vertices[0].X, y-this.Vertices[0].Y);
   for (this.i=1;this.i<Math.floor(this.Sides/2)+1;++this.i)
      this.Context.lineTo(x+this.Vertices[this.i].X, y-this.Vertices[this.i].Y);
   this.Context.stroke();
   this.Context.closePath();

   //Draw dark border
   this.Context.lineWidth = 1;
   this.Context.strokeStyle = "white";
   this.Context.beginPath();
   this.Context.moveTo(x+this.Vertices[Math.floor(this.Sides/2)].X, y-this.Vertices[Math.floor(this.Sides/2)].Y);
   for (this.i=Math.floor(this.Sides/2)+1;this.i<this.Sides;++this.i)
      this.Context.lineTo(x+this.Vertices[this.i].X, y-this.Vertices[this.i].Y);
   this.Context.lineTo(x+this.Vertices[0].X, y-this.Vertices[0].Y);
   this.Context.stroke();
   this.Context.closePath();
/* */
};
