
//---------------------------------------------
//---------- GENIE ELLIPSE --------------------
var GenieEllipse = function() {
   var Width, Height;
   var BasReliefColour;

   var segment, radians;
};
GenieEllipse.prototype = new GenieShape();
GenieEllipse.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Reset();
};
GenieEllipse.prototype.Reset = function() {

   if (this.Specs) {
      this.Width = this.Specs.W;
      this.Height = this.Specs.H;
   }
};
GenieEllipse.prototype.SetBasRelief = function() {

   //UNLOGGED - may never be used, and so REDUNDANT

   this.BasReliefColour = new GenieColour();
   this.BasReliefColour.Set("rgb(0xFF,0xFF,0xFF)");
};
GenieEllipse.prototype.Draw = function(x, y, w, h, colour, lWidth, style, opcty) {

   //UNLOGGED

   this.SetOpacity(opcty);

   if (!style) {
      this.DrawPlain(x, y, rds, colour, lWidth, opcty);
   } else {
      //switch here
   }

   this.ResetOpacity();
};
GenieEllipse.prototype.DrawPlain = function(x, y, w, h, colour, lWidth, opcty) {

   x = x || this.X;
   y = y || this.Y;
   w = w || this.Width;
   h = h || this.Height;
   colour = colour || this.Colour;
   if (!colour)
      colour = "black";
   lWidth = lWidth || this.LineWidth;
   if (!lWidth)
      lWidth = 1;

   this.Context.beginPath();
   this.Context.ellipse(x, y, this.Width/2, this.Height/2, 0, 0, 2*Math.PI);
   if (lWidth) {  //ISSUE: this is supposed to only be wireframe
      this.Context.lineWidth = lWidth;
      this.Context.strokeStyle = colour;
      this.Context.stroke();
   } else {
      this.Context.fillStyle = colour;
      this.Context.fill();
   }
   this.Context.closePath();
};
GenieEllipse.prototype.DrawBasRelief = function(x, y, rds, colour, lWidth, opcty) {

   //UNLOGGED - not implemented
/*
   x = x || this.X;
   y = y || this.Y;
   rds = rds || this.Radius;
   colour = colour || this.Colour;
   if (!colour)
      colour = "black";
   lWidth = lWidth || this.LineWidth;
   if (!lWidth)
      lWidth = 1;

   //ISSUE: re-write below with a new GenieColour so have more control over percentages

   //Drawing arc slices growing darker from white to grey, then grey to white, no matter the circle colour
   for (this.i=0;this.i<Math.PI;this.i+=Math.PI/32) {
      this.Context.beginPath();
      this.Context.arc(x, y, rds, this.i, this.i+(Math.PI/32));
      this.Context.lineTo(x, y);
      this.Context.fillStyle = this.BasReliefColour.RGB;
      this.Context.fill();
      this.Context.closePath();
      this.BasReliefColour.Darken(2);
   }
   for (this.i=Math.PI;this.i<2*Math.PI;this.i+=Math.PI/32) {
      this.Context.beginPath();
      this.Context.arc(x, y, rds, this.i, this.i+(Math.PI/32));
      this.Context.lineTo(x, y);
      this.BasReliefColour.Lighten(2);
      this.Context.fillStyle = this.BasReliefColour.RGB;
      this.Context.fill();
      this.Context.closePath();
   }

   //ISSUE: right now arbitrarily have selected centre circle size as 2/3rds; also
   this.Context.beginPath();
   this.Context.arc(x, y, (2/3)*rds, 0, 2*Math.PI);
   this.Context.fillStyle = colour;
   this.Context.fill();
   this.Context.closePath();
*/
};
