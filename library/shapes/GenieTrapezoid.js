/*
 *  NOTE: only isosceles trapezoids, i.e. sloping sides have same length and angle
 */
//-----------------------------------------------
//---------- GENIE TRAPEZOID --------------------
var GenieTrapezoid = function() {
   var TopWidth, BottomWidth;
   var Height;
};
GenieTrapezoid.prototype = new GenieShape();
GenieTrapezoid.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Reset();
};
GenieTrapezoid.prototype.Reset = function() {
   GenieShape.prototype.Reset.call(this);

   this.TopWidth = this.Specs.W.T;
   this.BottomWidth = this.Specs.W.B;
   this.Height = this.Specs.H;
};
GenieTrapezoid.prototype.Draw = function(x, y, tWidth, bWidth, hght, colour, lWidth, style, opcty) {  //t- top, b- bottom

   //UNLOGGED - only plain draw right now

   x = x || this.X;
   y = y || this.Y;
   tWidth = tWidth || this.TopWidth;
   bWidth = bWidth || this.BottomWidth;
   hght = hght || this.Height;
   colour = colour || this.Colour;
   if (!colour)
      colour = "black";
   if (lWidth==null)
      lWidth = this.LineWidth;
   opcty = opcty || this.Opacity;

   if (opcty) {
      this.GlobalAlpha = this.Context.globalAlpha;
      this.Context.globalAlpha = opcty;
   } else
      this.GlobalAlpha = null;

   this.ExecuteDraw(x, y, tWidth, bWidth, hght, colour, lWidth);

   if (this.GlobalAlpha)
      this.Context.globalAlpha = this.GlobalAlpha;
};
GenieTrapezoid.prototype.SpecsDraw = function() {  //UNTESTED
   this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.Specs.W.T, this.Specs.W.B, this.Specs.H, this.Specs.COLOUR, this.Specs.LINeWIDTH);
};
GenieTrapezoid.prototype.QuickDraw = function() {
   this.ExecuteDraw(this.X, this.Y, this.TopWidth, this.BottomWidth, this.Height, this.Colour, this.LineWidth);
};
GenieTrapezoid.prototype.ExecuteDraw = function(x, y, tWidth, bWidth, hght, colour, lWidth) {

   //Start drawing starting from bottom left corner
   if (lWidth) {
      this.Context.lineWidth = lWidth;
      this.Context.strokeStyle = colour;
   } else
      this.Context.fillStyle = colour;
   this.Context.beginPath();
   this.Context.moveTo(x, y);
   this.Context.lineTo(x+((bWidth-tWidth)/2), y-hght);
   this.Context.lineTo(x+((bWidth-tWidth)/2)+tWidth, y-hght);
   this.Context.lineTo(x+bWidth, y);
   this.Context.lineTo(x, y);
   if (lWidth)
      this.Context.stroke();
   else
      this.Context.fill();
   this.Context.closePath();
};
GenieTrapezoid.prototype.DrawBasRelief = function(x, y, size) {

   //UNLOGGED

};
