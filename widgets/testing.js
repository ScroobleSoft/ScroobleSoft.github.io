
//-------------------------------------------------
//---------- GALLERY TESTING ---------------------
var GalleryTesting = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter;
   var Randomizer;
   var ScreenRect, ScreenQuad;
   var State, Frames;

   //NAVIGATION
   var Wimp;
   var Speed;
   var PlantPad, InnerRoad, OuterRoad;

   //DISINTEGRATION
   var Buffer;
   var DotArray;

   //FACILITY
   var Quad, InfoQuad;
   var Facility, Buildings;
   var ScreenCentre;
   var PointA, PointB, Offset;

   //INTERSECTION
   var LiquefierIcon, ShedIcon, StationIcon, PortalIcon, SiloIcon;		//UNLOGGED
   var LiquefierImage, ShedImage, StationImage, PortalImage, SiloImage;		//UNLOGGED

   //MASTERMIND
   var Combination, Attempt, Matches, Order;
   var DigitsImage;								//UNLOGGED
   var UpButtons, DownButtons, UpPressedButtons, DownPressedButtons;		//UNLOGGED

   var i, j, t1, t2, t3, t4;
};
GalleryTesting.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect, sQuad) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
//      this.CalcPad = cPad;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
      this.ScreenQuad = sQuad;
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
	       case TEST.NAVIGATION:
		  this.SetNavigationTest();
		  this.PlayNavigationTest();
		  break;
	       case TEST.DISINTEGRATION:
		  this.SetDisintegrationDemo();
		  this.PlayDisintegrationDemo();
		  break;
	       case TEST.INTERSECTION:
		  this.SetIntersectionTest();
		  this.PlayIntersectionTest();
		  break;
	       case TEST.FACILITY:
		  this.SetFacilityDesign();
		  this.PlayFacilityDesign();
		  break;
	       case TEST.MASTERMIND:
		  this.SetMastermind();
		  this.PlayMastermind();
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
