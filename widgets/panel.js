/*
 *  UNLOGGED - 4x8 buttons in the middle showing weapons, two 4x4 columns on either side displaying buildings accessible
 */
//---------------------------------------------
//---------- WEAPONS PANEL --------------------
var WeaponsPanel = function() {
   var Screen;
   var Wimp;		//pointer to the one that panel is associated with
};
WeaponsPanel.prototype = {
   Set(cntxt) {
      this.Screen = cntxt;
   },
   Draw() {
      this.Screen.fillStyle = GREY.SILVER;
      this.Screen.fillRect(200, 400, 400, 200);
   },
   DrawUnpressed(iButton) {
      coords.X = 200 + (50*(iButton % 8));
      coords.Y = 400 + (50*Math.floor(iButton/8));
//      this.GraphicsTool.DrawRectangle(coords.X+2, coords.Y, 46, );
   }
};
