
//---------------------------------------------------
//---------- GRIDIRON MINI GAMES --------------------
var GridironMiniGames = function() {
   var Screen;
   var InfoBox;
   var ControlPanel;
   var GraphicsTool;
   var CalcPad;
   var TextWriter;
   var Randomizer;
   var ScreenRect;
   var Frames;

   //ONE

   //TWO

   var t1, t2, t3, t4;
};
GridironMiniGames.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
//      this.CalcPad = cPad;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
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
	    indx = MiniGamesImage.GetMapEntry(CLICKED);
	    switch (indx) {
	       case MINiGAME.ONE:
		  this.SetMiniGameOne();
		  this.PlayMiniGameOne();
		  break;
	       case MINiGAME.TWO:
		  this.SetMiniGameTwo();
		  this.PlayMiniGameTwo();
		  break;
	    }
	 }
      } else {
	 indx = MiniGamesImage.GetMapEntry();
	 if (indx!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(MiniGameDescriptions[indx], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   }
};
