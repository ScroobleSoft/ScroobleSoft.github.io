/*
 *  Powers cumulatively have 80B to spend; 8B each, except 16B for Tomcat
 *  draft order changes every round
 *  8/10 rounds
 *  items:	1-8B satellites
 *		carrier, super-carrier 240/320M
 *		tech 8-pack 800M
 *  		64 pack army units
 *		16 pack jets
 *		4 pack ships
 *		32 pack missiles
 *		buoys/drilling
 *		B2+, C2+, I2+ . . . etc
 */
//----------------------------------------------
//---------- DOMINION DRAFT --------------------
var DominionDraft = function() {
   var Order;
/*
   var Screen;
   var GraphicsTool;
   var TextWriter;
*/
};
DominionDraft.prototype = {
   Set(cntxt, gTool, tWriter) {
/*
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
*/
      this.Order = new Array(POWER.COUNT);
   },
   Start() {
      //state amount sought
      //receive bids from interested powers
      //if multiple bids, increase amount
      //repeat until only one bid left
   },
   Play() {
   }
};
