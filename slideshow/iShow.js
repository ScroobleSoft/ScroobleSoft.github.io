
//-----------------------------------------------
//---------- SLIDING GALLERY --------------------
var SlidingGallery = function () {
};
SlidingGallery.prototype = new GenieGame();
SlidingGallery.prototype.Set = function(intrfc, gTool, tWriter, rGenerator) {
   GenieGame.prototype.Set.call(this, intrfc, gTool, tWriter, rGenerator);

   this.Components = new SlideComponents();
};
SlidingGallery.prototype.SetComponents = function() {

   this.Components.Set(this.Interface, this.GraphicsTool, this.TextWriter, this.Randomizer);
};
