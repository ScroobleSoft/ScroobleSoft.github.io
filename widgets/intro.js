
//---------------------------------------------
//---------- GALLERY INTRO -------------------
var GalleryIntro = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, TextWriter;
   var Randomizer;
   var ScreenRect, ScreenQuad;
   var State;
};
GalleryIntro.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect, sQuad) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
		this.ScreenQuad = sQuad;
      this.State = 0;
   },
   Start() {
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

   }
};
