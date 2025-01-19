
//--------------------------------------------
//---------- ZFL TESTING ---------------------
var ZFLTesting = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter;
   var Randomizer;
   var Frames, State;

   //NAMES
   var ChangedName;
   var NamePrefixes;
   var NameLeagueIndex, NamePositionIndex;

   //PROGRESS
   var ProgressionTeams;
   var ProgressionRatings, ProgressionGrades;

   //CURVE
   var BellCurves;
   var OutcomeCurve;

   var i, t1, t2, t3, t4;
};
ZFLTesting.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
//      this.CalcPad = cPad;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
      this.Frames = 0;
      this.State = 0;
   },
   Start() {
      this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      TestingImage.Draw();
      this.Play();
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      if (Mouse.CheckLeftClicked()) {
	 if (TestingImage.CheckClicked()) {
	    cancelAnimationFrame(this.AnimationFrameHandle);
	    indx = TestingImage.GetMapEntry(CLICKED);
	    switch (indx) {
	       case TEST.NAME:
		  this.SetNameChange();
		  this.PlayNameChange();
		  break;
	       case TEST.PROGRESSION:
		  this.SetRosterProgression();
		  this.PlayRosterProgression();
		  break;
	       case TEST.SPRITES:
		  this.SetSpriteExhibit();
		  this.PlaySpriteExhibit();
		  break;
	       case TEST.CURVE:
		  this.SetBellCurveGrades();
		  this.PlayBellCurveGrades();
		  break;
	    }
	 }
      } else {
	 indx = TestingImage.GetMapEntry();
	 if (indx!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(TestingDescriptions[indx], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   }
};
