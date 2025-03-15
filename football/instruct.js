
//----------------------------------------------------------
//---------- FOOTBALL GAME INSTRUCTIONS --------------------
var FootballGameInstructions = function() {
   var InfoBox;
   var TextWriter;
};
FootballGameInstructions.prototype = {
   Set(iBox, tWriter) {
      this.InfoBox = iBox;
      this.TextWriter = tWriter;
   },
   Instruct(text) {
      //clear space needed in info box based on size of text string
      //write Instructions: in large, bold font
      //write string wrapped below it
   }
};
