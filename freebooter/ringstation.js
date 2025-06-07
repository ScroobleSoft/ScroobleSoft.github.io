/*
 *  A large central ring with smaller ones above and below it, central rotating counter-clockwise and the other 2 in the opposite direction;
 *   also, a connecting spine
 *  an ellipse and 2 arcs for drawing each ring
 *  yellow windows
 */
//--------------------------------------------
//---------- RING STATION --------------------
var RingStation = function() {
   var GraphicsTool;
   var Location;
};
RingStation.prototype = {
   Set(gTool) {
      this.GraphicsTool = gTool;
   }
};
