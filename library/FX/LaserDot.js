
//-----------------------------------------------
//---------- GENIE LASER DOT --------------------
var GenieLaserDot = function() {
   var Specs;
   var GraphicsTool;
   var Colour;
};
GenieLaserDot.prototype = new GenieFX();
GenieLaserDot.prototype.Set = function(specs, gTool, sRect) {
   GenieFX.prototype.Set.call(this, specs, null, null, gTool, sRect);

};
GenieLaserDot.prototype.Draw = function() {

   this.DetermineScreenCoords();
   if (this.Elevation)
      this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y-this.Elevation, this.Specs.R, this.Colour, 0, this.Extant/100);
   else
      this.GraphicsTool.DrawCircle(this.ScreenCoords.X, this.ScreenCoords.Y, this.Specs.R, this.Colour, 0, this.Extant/100);
};
