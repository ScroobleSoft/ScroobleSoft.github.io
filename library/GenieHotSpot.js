/*
 *  array format: [ [SHAPE.xxx, [relevant dimensions]], [ditto] . . . [ditto] ]; xxx could be RECTANGLE, CIRCLE, POLYGON, IRREGULAR . . .
 *  NOTE: only one shape is being used per hot spot, but can change that
 *  NOTE: might need to attach vertices for a regular polygon to hotspot array
 */
//--------------------------------------------------
//---------- GENIE HOT SPOT MAP --------------------
var GenieHotSpotMap = function() {
   var CalcPad;
   var HotSpotArray;
};
GenieHotSpotMap.prototype = {
   Set(cPad, sArray) {
      this.CalcPad = cPad;
      this.HotSpotArray = sArray;
   },
   CheckClicked() {
      var i;

      //UNLOGGED

      for (i=0;i<this.HotSpotArray.length;++i)
	 switch (this.HotSpotArray[i][0]) {
	    case SHAPE.CIRCLE:
	       return (Utilities.CheckPointInCircle(Mouse.GetClickCoordinates(), this.HotSpotArray[i][1], this.HotSpotArray[i][2]));
	       break;
	    case SHAPE.RECTANGLE:
	       return (Utilities.CheckPointInBox(Mouse.GetClickCoordinates(), this.HotSpotArray[i][1]));
	       break;
	    case SHAPE.IRREGULAR:
	       return (this.CalcPad.CheckPointInPolygon(Mouse.GetClickCoordinates(), this.HotSpotArray[i][1]));
	       break;
	    case SHAPE.POLYGON:
	       //TODO: get polygon vertices first - need to sort out how multiple polygons will be handled, since don't want to keep
	       //      vertices again and again
	       return (this.CalcPad.CheckPointInPolygon(Mouse.GetClickCoordinates(), this.HotSpotArray[i][1]));
	       break;
	 }

      return (i);
   }
};
