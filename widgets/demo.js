
//-----------------------------------------
//--------- GALLERY DEMO ------------------
var GalleryDemo = function() {
   var Screen;
   var InfoBox;
   var ControlPanel;
   var GraphicsTool;
   var TextWriter;
   var Randomizer;
   var ScreenRect;

   var i;
}
GalleryDemo.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect, sQuad) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
      this.Randomizer = rGenerator;
      this.TextWriter = tWriter;
      this.ScreenRect = sRect;
      this.ScreenQuad = sQuad;
   },
   Start() {
      this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      DemoImage.Draw();
      this.Play();
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      if (Mouse.CheckLeftClicked()) {
	 if (DemoImage.CheckClicked()) {
	    cancelAnimationFrame(this.AnimationFrameHandle);
	    this.i = DemoImage.GetMapEntry(CLICKED);
	    switch (this.i) {
	       case DEMO.FINAL:
		  this.SetFinalClocheCapture();
		  this.PlayFinalClocheCapture();
		  break;
	    }
	 }
      } else {
	 this.i = DemoImage.GetMapEntry();
	 if (this.i!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(DemoDescriptions[this.i], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   }
};
