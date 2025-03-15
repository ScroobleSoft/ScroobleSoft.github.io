
//-------------------------------------------------
//---------- ASSISTANT MANAGER --------------------
var AssistantManager = function() {
   var InfoBox;
   var TextWriter;
};
AssistantManager.prototype = {
   Set(iBox, tWriter) {
      this.InfoBox = iBox;
      this.TextWriter = tWriter;
   }
};
