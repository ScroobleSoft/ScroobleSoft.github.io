
//-------------------------------------------------
//---------- SOLAR MINI GAMES ---------------------
var SolarMiniGames = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter;
   var Randomizer;
   var ScreenRect;
   var AnimationFrameHandle;
   var Frames;
   var State;

   //PIRATES
   var KraitAngle;
   var Pirates;

   //ASTEROID

   var t1, t2;
};
SolarMiniGames.prototype = {
   Set(cntxt, iBox, cPanel, gTool, cPad, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
      this.CalcPad = cPad;
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
	       case MINiGAME.PIRATES:
		  this.SetPirates();
		  this.PlayPirates();
		  break;
	       case MINiGAME.ASTEROIDS:
		  this.SetAsteroidMining();
		  this.PlayAsteroidMining();
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
