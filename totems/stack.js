
//------------------------------------------
//---------- TOLL STACK --------------------
var TollStack = function() {
   var ScreenRect;
   var Tile;		//indicates location
};
TollStack.prototype = {
   Set(sRect) {
      this.ScreenRect = sRect;
   },
   Draw() {
      //-was thinking of drawing a rounded rectangle, and still could do that, but also could use a sprite
   }
};
