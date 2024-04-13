
//-------------------------------------------------------
//---------- GENIE ROUNDED RECTANGLE --------------------
var GenieRoundedRectangle = function() {
   var Width, Height;
   var Radius;
   var FrameColour;
};
GenieRoundedRectangle.prototype = new GenieShape();
GenieRoundedRectangle.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Reset();
};
GenieRoundedRectangle.prototype.Reset = function() {
   GenieShape.prototype.Reset.call(this);

   this.Width = this.Specs.W;
   this.Height = this.Specs.H;
   this.Radius = this.Specs.R;
};
GenieRoundedRectangle.prototype.Draw = function(x, y, w, h, r, colour, fColour, lWidth, style, opcty) {  //r- radius of arcs, f- frame

   //UNLOGGED - only plain draw right now

   x = x || this.X;
   y = y || this.Y;
   w = w || this.Width;
   h = h || this.Height;
   r = r || this.Radius;
   colour = colour || this.Colour;
   if (!colour)
      colour = "white";
   colour = colour || this.Colour;
   if (!fColour)
      fColour = "white";
   lWidth = lWidth || this.LineWidth;
   if (!lWidth)
      lWidth = 1;
   opcty = opcty || this.Opacity;

   if (opcty) {
      this.GlobalAlpha = this.Context.globalAlpha;
      this.Context.globalAlpha = opcty;
   } else
      this.GlobalAlpha = null;

   this.ExecuteDraw(x, y, w, h, r, colour, fColour, lWidth);

   if (this.GlobalAlpha)
      this.Context.globalAlpha = this.GlobalAlpha;
};
GenieRoundedRectangle.prototype.SpecsDraw = function() {
   this.ExecuteDraw(this.Specs.X, this.Specs.Y, this.Specs.W, this.Specs.H, this.Specs.R, this.Specs.COLOUR.BACkGROUND, this.Specs.COLOUR.FRAME, this.Specs.LINeWIDTH);
};
GenieRoundedRectangle.prototype.QuickDraw = function() {
   this.ExecuteDraw(this.X, this.Y, this.Width, this.Height, this.Radius, this.Colour, this.FrameColour, this.LineWidth);
};
GenieRoundedRectangle.prototype.ExecuteDraw = function(x, y, w, h, r, colour, fColour, lWidth) {

   //Draw background if colour specified
   if (colour) {
      this.Context.fillStyle = colour;
      this.Context.beginPath();
      this.Context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
      this.Context.lineTo(x+w-r, y);
      this.Context.arc(x+w-r, y+r, r, 1.5*Math.PI, 0);
      this.Context.lineTo(x+w, y+h-r);
      this.Context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
      this.Context.lineTo(x+r, y+h);
      this.Context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
      this.Context.lineTo(x, y+r);
      this.Context.fill();
      this.Context.closePath();
   }

   r -= (lWidth-1);  //ISSUE: what's this for?
   //Draw frame if required, starting from top left corner
   if (fColour) {
      this.Context.strokeStyle = fColour;
      this.Context.lineWidth = lWidth;
      this.Context.beginPath();
      this.Context.arc(x+r, y+r, r, Math.PI, 1.5*Math.PI);
      this.Context.lineTo(x+w-r, y);
      this.Context.arc(x+w-r, y+r, r, 1.5*Math.PI, 0);
      this.Context.lineTo(x+w, y+h-r);
      this.Context.arc(x+w-r, y+h-r, r, 0, 0.5*Math.PI);
      this.Context.lineTo(x+r, y+h);
      this.Context.arc(x+r, y+h-r, r, 0.5*Math.PI, Math.PI);
      this.Context.lineTo(x, y+r);
      this.Context.stroke();
      this.Context.closePath();
   }
};
GenieRoundedRectangle.prototype.DrawBasRelief = function(x, y, size) {

   //UNLOGGED

};
