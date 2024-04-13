
//--------------------------------------------------
//---------- SHUFFLE INFO PANEL --------------------
var ShuffleInfoPanel = function() {
	var Specs;
   var Screen;
   var GraphicsTool, TextWriter;
   var Moves, Shuffles, Hints;
   var Left;
};
ShuffleInfoPanel.prototype = {
   Set(specs, cntxt, gTool, tWriter) {
		this.Specs = specs;
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Moves = 0;
      this.Shuffles = 0;
      this.Hints = 0;
      this.Left = this.Specs.BOARD.L + this.Specs.BOARD.W + (2*this.Specs.BOARD.TILE.W);
   },
   Reset() {

      this.Moves = 0;
      this.Shuffles = 0;
      this.Hints = 0;
   },
   Display() {

      this.DisplayMovesBox();
      this.DisplayShufflesBox();
      this.DisplayHintsBox();
   },
   DisplayMovesBox(moves) {

      this.DisplayInfoBox(20, "Moves", this.Moves);
   },
   DisplayShufflesBox() {

      this.DisplayInfoBox(80, "Shuffles", this.Shuffles);
   },
   DisplayHintsBox() {

      this.DisplayInfoBox(140, "Hints", this.Hints);
   },
   DisplayInfoBox(y, str, num) {

      y += this.Specs.BOARD.T;
      this.Screen.clearRect(this.Left, y, 100, 40);
      this.GraphicsTool.DrawRectangle(this.Left, y, 100, 40, this.Specs.BOARD.BORDER.COLOUR, 0);
      this.GraphicsTool.DrawRectangle(this.Left, y, 100, 40, "white", 1);
      this.TextWriter.Write(str+":", this.Left+10, y+25, { COLOUR: "white" } );
      this.TextWriter.Write(num, this.Left+80, y+25, { COLOUR: "white" } );
   }
};
