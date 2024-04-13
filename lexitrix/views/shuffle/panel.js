
//--------------------------------------------------
//---------- SHUFFLE INFO PANEL --------------------
var ShuffleInfoPanel = function() {
	var Specs, Top, Left;
   var Screen;
   var GraphicsTool, TextWriter;
   var Moves, Shuffles, Hints;
};
ShuffleInfoPanel.prototype = {
   Set(specs, cntxt, gTool, tWriter) {
		this.Specs = specs;
		this.Top = 0;
		this.Left = 0;
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Reset();
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

      this.DisplayInfoBox(this.Specs.L.MOVES, "Moves", this.Moves);
   },
   DisplayShufflesBox() {

      this.DisplayInfoBox(this.Specs.L.SHUFFLES, "Shuffles", this.Shuffles);
   },
   DisplayHintsBox() {

      this.DisplayInfoBox(this.Specs.L.HINTS, "Hints", this.Hints);
   },
   DisplayInfoBox(l, str, num) {

      this.Screen.clearRect(l, this.Specs.T, this.Specs.W, this.Specs.H);
      this.GraphicsTool.DrawRectangle(l, this.Specs.T, this.Specs.W, this.Specs.H, this.Specs.COLOUR, 0);
      this.GraphicsTool.DrawRectangle(l, this.Specs.T, this.Specs.W, this.Specs.H, "white", 1);
      this.TextWriter.Write(str+":", l+10, this.Specs.T+25, { COLOUR: "white" } );
      this.TextWriter.Write(num, l+70, this.Specs.T+25, { COLOUR: "white" } );
   }
};
