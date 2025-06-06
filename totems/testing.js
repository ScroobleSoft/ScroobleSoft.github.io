
//--------------------------------------------
//---------- TOLL TESTING --------------------
var TollTesting = function() {
   var Screen;
   var InfoBox;
   var GraphicsTool;
   var CalcPad;
   var TextWriter;
   var Randomizer;
   var Frames;

   //BATTLE
   var BattleField;
   var LeftStack, RightStack;
   var LeftSideIndex, RightSideIndex;

   //WATERWAYS
   var Length, Tiles;

   //SCOUTING
   var Scout, ScoutSprite;
   var TerrainTiles, DarkMap;

   //PRESIDIO
   var InnerPentagon, OuterPentagon;

   //VAULT
   var TileFlag;
   var Bayonetter;
   var TileGrid;
   var FLOOR;

   //QUESTING
   var PathsMap;

   //SHIELD
   var Opacities;
   var FramesArray;
   var AverageFrames;

   var t1, t2;
};
TollTesting.prototype = {
   Set(cntxt, iBox, gTool, cPad,tWriter, rGenerator) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.GraphicsTool = gTool;
      this.CalcPad = cPad;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
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
	    this.i = TestingImage.GetMapEntry(CLICKED);
	    switch (this.i) {
	       case TEST.RANDOM:
		  this.SetRandomBattle();
		  this.PlayRandomBattle();
		  break;
	       case TEST.GUNNER:
		  this.SetGunnerBattle();
		  this.PlayGunnerBattle();
		  break;
	       case TEST.WATERWAYS:
		  this.SetWaterwayGeneration();
		  this.PlayWaterwayGeneration();
		  break;
	       case TEST.SCOUTING:
		  this.SetScoutingDemo();
		  this.PlayScoutingDemo();
		  break;
	       case TEST.PRESIDIO:
		  this.SetPresidioDrawing();
		  this.PlayPresidioDrawing();
		  break;
	       case TEST.VAULT:
		  this.SetVaultNavigation();
		  this.PlayVaultNavigation();
		  break;
	       case TEST.QUESTING:
		  this.SetQuestingDemo();
		  this.PlayQuestingDemo();
		  break;
	       case TEST.SHIELD:
		  this.SetShieldDepletion();
		  this.PlayShieldDepletion();
		  break;
	    }
	 }
      } else {
	 this.i = TestingImage.GetMapEntry();
	 if (this.i!=-1) {
	    this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	    this.TextWriter.SwitchContext(CANVAS.ZOOM);
	    this.TextWriter.Write(TestingDescriptions[this.i], 5, 20);
	    this.TextWriter.RestoreContext();
	 }
      }
   }
};
