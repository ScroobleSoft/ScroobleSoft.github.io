
//---------------------------------------------------
//---------- TOLL PRESIDIO IMAGE --------------------
var TollPresidioImage = function() {
   var Screen;
   var CalcPad;
   var Buffer;
   var PentagonN, PentagonE, PentagonS, PentagonW;
};
TollPresidioImage.prototype = {
   Set(cntxt, cPad) {
      this.Screen = cntxt;
      this.CalcPad = cPad;
      this.Buffer = new GenieBuffer();
      this.Buffer.Set();
   },
   Generate(iClan, drctn) {
   },
   Draw() {
   }
};
