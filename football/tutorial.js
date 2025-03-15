
//-------------------------------------------------
//---------- FOOTBALL TUTORIAL --------------------
var FootballTutorial = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter, Randomizer;
   var ScreenRect;
   var State, Frames;
   var AnimationFrameHandle;

   //ONE

   //TWO

   var t1, t2;
};
FootballTutorial.prototype = {
   Set(cntxt, iBox, gTool, cPanel, tWriter, rGenerator, sRect) {
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
      TutorialImage.Draw();
      this.Play();
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      if (Mouse.CheckLeftClicked()) {
	 if (TutorialImage.CheckClicked()) {
	    cancelAnimationFrame(this.AnimationFrameHandle);
	    indx = TutorialImage.GetMapEntry(CLICKED);
	    switch (indx) {
	       case TUTORIAL.ONE:
		  this.SetTestOne();
		  this.PlayTestOne();
		  break;
	       case TUTORIAL.TWO:
		  this.SetTestTwo();
		  this.PlayTestTwo();
		  break;
	    }
	 }
      } else {
	 indx = TutorialImage.GetMapEntry();
	 if (indx!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(TutorialDescriptions[indx], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   },
   SetTestOne() {
   },
   PlayTestOne() {

      //UNLOGGED

      this.AnimationFrameHandle = requestAnimationFrame(this.PlayTestOne.bind(this));

      if (Game.Reset)
	 cancelAnimationFrame(this.AnimationFrameHandle);
   },
   ResetTestOne() {
   },
   SetTestTwo() {
   },
   PlayTestTwo() {

      //UNLOGGED

      this.AnimationFrameHandle = requestAnimationFrame(this.PlayTestTwo.bind(this));

      if (Game.Reset)
	 cancelAnimationFrame(this.AnimationFrameHandle);
   },
   ResetTestTwo() {
   }
};
