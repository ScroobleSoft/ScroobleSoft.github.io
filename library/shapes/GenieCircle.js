
//--------------------------------------------
//---------- GENIE CIRCLE --------------------
var GenieCircle = function() {
   var Radius;
   var BasReliefColour;

   var segment, radians;
};
GenieCircle.prototype = new GenieShape();
GenieCircle.prototype.Set = function(cntxt, specs) {
   GenieShape.prototype.Set.call(this, cntxt, null, specs);

   this.Reset();
};
GenieCircle.prototype.Reset = function() {
   if (this.Specs)
      this.Radius = this.Specs.R;
};
GenieCircle.prototype.SetBasRelief = function() {
   this.BasReliefColour = new GenieColour();
   this.BasReliefColour.Set("rgb(0xFF,0xFF,0xFF)");
};
GenieCircle.prototype.Draw = function(x, y, rds, colour, lWidth, style, opcty) {

   //UNLOGGED

   if (opcty) {
      this.GlobalAlpha = this.Context.globalAlpha;
      this.Context.globalAlpha = opcty;
   } else
      this.GlobalAlpha = null;

   if (!style) {
      this.DrawWireFrame(x, y, rds, colour, lWidth, opcty);
   } else {
      //switch here
   }

   if (this.GlobalAlpha)
      this.Context.globalAlpha = this.GlobalAlpha;
};
GenieCircle.prototype.DrawWireFrame = function(x, y, rds, colour, lWidth, opcty) {
   x = x || this.X;
   y = y || this.Y;
   rds = rds || this.Radius;
   colour = colour || this.Colour;
   if (!colour)
      colour = "black";
   lWidth = lWidth || this.LineWidth;
   if (!lWidth)
      lWidth = 1;

   this.Context.beginPath();
   this.Context.arc(x, y, rds, 0, 2*Math.PI);
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
GenieCircle.prototype.DrawStaggered = function(x, y, rds, colour, lWidth, sgmnts, prcntg, angle, opcty) {

   //UNLOGGED - this is only rough, and does not alter opacity

   this.segment = 2*Math.PI/sgmnts;		//length of arcs
   this.radians = this.segment*(prcntg/100);	//portion of arc that is actually drawn
   this.Context.strokeStyle = colour;
   this.Context.lineWidth = lWidth;
   angle = angle || 0;
   angle = Utilities.DegreesToRadians(angle);	//angle is meant to be offset, basically
   for (this.i=0;this.i<sgmnts;++this.i) {
      this.Context.beginPath();
      this.Context.arc(x, y, rds, angle+(this.segment*this.i)-(this.radians/2), angle+(this.segment*this.i)+(this.radians/2));
      this.Context.stroke();
      this.Context.closePath();
   }
};
GenieCircle.prototype.DrawBasRelief = function(x, y, rds, colour, lWidth, opcty) {

   //UNLOGGED

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
};
