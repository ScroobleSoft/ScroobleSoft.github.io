
//-----------------------------------------------
//---------- GALLERY TERRAIN --------------------
var GalleryTerrain = function() {
   var Screen;
   var Square;
};
GalleryTerrain.prototype = {
   Set(cntxt) {
      this.Screen = cntxt;
      this.Square = new GenieRect();
      this.Square.Set(this.Screen);
   },
   DrawBevel() {
   },
   DrawDivot() {
      //-speculative, but going over a divot could flash a number over all bevels indicating both level of danger from a bevel (equal to
      //-probability of there being a mine), and a second indicator as to the probability of there being a weapon to procure
   }
};
