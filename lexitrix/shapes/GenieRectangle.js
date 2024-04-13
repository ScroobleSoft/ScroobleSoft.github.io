
//-----------------------------------------------
//---------- GENIE RECTANGLE --------------------
var GenieRectangle = function() {
   var Width, Height;

   var offset;
};
GenieRectangle.prototype = new GenieShape();
GenieRectangle.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Reset();
};
GenieRectangle.prototype.Reset = function() {
   GenieShape.prototype.Reset.call(this);

   this.Width = this.Specs.W;
   this.Height = this.Specs.H;
};
GenieRectangle.prototype.Draw = function(x, y, w, h, colour, lWidth, style, opcty) {  //NOTE: only plain draw right now

   if (x==null)
      x = this.X;
   if (y==null)
      y = this.Y;
   w = w || this.Width;
   h = h || this.Height;
   colour = colour || this.Colour;
   if (!colour)
      colour = "black";
   if (lWidth==null)
      if (this.LineWidth==null)
	 lWidth = 1;
      else
	 lWidth = this.LineWidth;
   opcty = opcty || this.Opacity;

   if (opcty) {
      this.GlobalAlpha = this.Context.globalAlpha;
      this.Context.globalAlpha = opcty;
   } else
      this.GlobalAlpha = null;

   this.ExecuteDraw(x, y, w, h, colour, lWidth);

   if (this.GlobalAlpha)
      this.Context.globalAlpha = this.GlobalAlpha;
};
GenieRectangle.prototype.SpecsDraw = function() {
   this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.Specs.W, this.Specs.H, this.Specs.COLOUR, this.Specs.LINeWIDTH);
};
GenieRectangle.prototype.QuickDraw = function() {
   this.ExecuteDraw(this.X, this.Y, this.Width, this.Height, this.Colour, this.LineWidth);
};
GenieRectangle.prototype.ExecuteDraw = function(x, y, w, h, colour, lWidth) {
   if (lWidth) {
      this.Context.lineWidth = lWidth;
      this.offset = Math.floor(lWidth/2);
      if (lWidth % 2)
	 this.offset += 0.5;
      this.Context.strokeStyle = colour;
      this.Context.strokeRect(x+this.offset, y+this.offset, w-lWidth, h-lWidth);
   } else {
      this.Context.fillStyle = colour;
      this.Context.fillRect(x, y, w, h);
   }
};
GenieRectangle.prototype.DrawBasRelief = function(x, y, size) {

   //UNLOGGED

};
