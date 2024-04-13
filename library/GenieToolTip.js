
//----------------------------------------------
//---------- GENIE TOOL TIP --------------------
var GenieToolTip = function() {
   var Context;
   var GraphicsTool;
   var TextWriter;
   var Specs;
   var Width, Height;
};
GenieToolTip.prototype = {
   Set(cntxt, specs, gTool, tWriter) {
      this.Context = cntxt;
      this.Specs = specs;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
   },
   Draw() {  //yellow rectangle with thin black outline, label in black text, positioned to the bottom and right of cursor

      //ISSUE: have to check if tip is slipping off-screen at left and/or bottom, re-position it appropriately
      //ISSUE: should have a wordp wrap option, or could present the INFO as a string array

      //TODO: putting this here for now since a tool-tip object is being re-used in most cases, and so text changes (as might the font)
      this.Width = this.Context.measureText(this.Specs.INFO).width + 6;		//6 comes from 2px padding on all 4 sides
      this.Height = Utilities.GetTextHeight(this.Context) + 6;			//HARD-CODING, by the way

      this.GraphicsTool.DrawRectangle(Mouse.X+1, Mouse.Y+21, this.Width-2, this.Height-2, "yellow", 0);
      this.GraphicsTool.DrawRectangle(Mouse.X, Mouse.Y+20, this.Width, this.Height, "black", 1);
      this.TextWriter.Write(this.Specs.INFO, Mouse.X+3, Mouse.Y+this.Height+15);
   }
};
