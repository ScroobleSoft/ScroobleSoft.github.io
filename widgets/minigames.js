
//---------------------------------------------------
//---------- GALLERY MINI GAMES ---------------------
var GalleryMiniGames = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter;
   var Randomizer;
   var ScreenRect;
   var AnimationFrameHandle;
   var Frames, State;

   //FINAL
   var GameGrid;
   var Cloches;
   var ClocheIndex;
   var BesiegerPositions, BesiegerDestinations;

   var t1, t2, dstnc;
};
GalleryMiniGames.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = new GenieRect();
      this.ScreenRect.Set(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   },
   Start() {
      this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      MiniGamesImage.Draw();
      this.Play();
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      if (Mouse.CheckLeftClicked()) {
	 if (MiniGamesImage.CheckClicked()) {
	    cancelAnimationFrame(this.AnimationFrameHandle);
	    this.i = MiniGamesImage.GetMapEntry(CLICKED);
	    switch (this.i) {
	       case MINiGAME.FINAL:
		  this.SetFinalClocheCapture();
		  this.PlayFinalClocheCapture();
		  break;
	    }
	 }
      } else {
	 this.i = MiniGamesImage.GetMapEntry();
	 if (this.i!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(MiniGameDescriptions[this.i], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   }
};
