
// * fortnight counter display (i.e., showing days ticking by, using a form such as a thumb on a ruler)

//-------------------------------------------------
//---------- DOMINION CALENDAR --------------------
var DominionCalendar = function() {
   var Day;
   var Fortnight;
};
DominionCalendar.prototype = {
   Set() {
      this.Day = 0;
      this.Fortnight = 0;
   },
   Increment() {
      ++this.Day;
      if (this.Day==CALENDAR.FORTNIGHT) {
	 ++this.Fortnight;
	 this.Day = 0;
      }
   }
};

//-----------------------------------------------
//---------- VISUAL CALENDAR --------------------
var VisualCalendar = function() {
   var Screen;
   var GraphicsTool;
   var Unit;
};
DominionCalendar.prototype = {
   Set(cntxt, gTool, clndr) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.Unit = clndr;
   },
   Draw() {
   }
};
