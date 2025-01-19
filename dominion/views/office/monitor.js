/*
 *  TODO: may need to use scratchpad to clip images (make them into rounded rectangles) for monitor display - actually, will draw over corners, and might
 *	  even use images to draw monitors (definitely should do that)
 */
//----------------------------------------------
//---------- OFFICE MONITOR --------------------
var OfficeMonitor = function() {
   var Screen;
   var GraphicsTool;
   var Specs;

   var Left, Top;
   var FrameThickness;
};
OfficeMonitor.prototype = {
   Set(cntxt, gTool, specs, x, y) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.Specs = specs;

      this.Left = x;
      this.Top = y;
   },
   Draw() {
      //Draw image first, then the rounded rectangle

      //Draw frame
      this.GraphicsTool.DrawRoundedRectangle(this.Left, this.Top, this.Specs.W, this.Specs.H, this.Specs.RADIUS, this.Specs.COLOUR, this.Specs.FRAME);
   }
};
