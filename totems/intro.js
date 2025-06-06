
//-----------------------------------------
//---------- TOLL INTRO -------------------
var TollIntro = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, TextWriter;
   var Randomizer;
   var ScreenRect;
   var State;

   //TEMP
   var UnitImagesColumn1, UnitImagesColumn2;
};
TollIntro.prototype = {
   Set(cntxt, iBox, cPanel, gTool, tWriter, rGenerator, sRect) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.ControlPanel = cPanel;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
      this.State = 0;
   },
   Start() {

      this.Screen.fillStyle = MAP.COLOUR2;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      //TEMP
      this.UnitImagesColumn1 = new GenieImage();
      this.UnitImagesColumn1.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.DESIGN], { L: 386, T: 4, W: 38, H: 391, O: 1, C: 1, R: 10, PATCH: { W: 38, H: 38 } } );
      this.UnitImagesColumn2 = new GenieImage();
      this.UnitImagesColumn2.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.DESIGN], { L: 540, T: 6, W: 38, H: 391, O: 1, C: 1, R: 10, PATCH: { W: 38, H: 38 } } );

      for (indx=0;indx<5;++indx) {
	 this.UnitImagesColumn1.DrawPatchNumber(indx, 10, 50*(indx+1));
	 this.UnitImagesColumn1.DrawPatchNumber(indx+5, 60, 50*(indx+1));
	 this.UnitImagesColumn2.DrawPatchNumber(indx, 110, 50*(indx+1));
	 this.UnitImagesColumn2.DrawPatchNumber(indx+5, 160, 50*(indx+1));
      }

      this.TextWriter.Write(" * 20 units total in the game", 10, 350);
      this.TextWriter.Write(" * each unit has a specific purpose in battle", 10, 365);
      this.TextWriter.Write("      e.g. Bazookers are potent against vehicles", 10, 380);
      this.TextWriter.Write("           and Rockets can spray several tiles", 10, 395);
      this.TextWriter.Write(" * units also have an additional purpose", 10, 410);
      this.TextWriter.Write("      e.g. Scouters unearth vaults, Bayonetters enter them", 10, 425);
      this.TextWriter.Write(" * 160 presidios in all, so there are 8 presidios manufacturing each unit", 10, 440);
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

   }
};
