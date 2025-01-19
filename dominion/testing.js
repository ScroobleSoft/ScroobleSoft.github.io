
//-------------------------------------------------
//---------- DOMINION TESTING ---------------------
var DominionTesting = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var Frames, State;
	var ToggleFlag;
	var PerformanceMeter1, PerformanceMeter2;

	//INTERDICTOR
	var VTOLInterdictor;
	var VTOLPosition, VTOLVelocity;

	//MAP
	var MiniOctagonImage;
	var CityStateOffsets, AlliedOffsets, PowerOffsets, ContinentOffsets, WorldOffsets;
	var SixOctagon, MapOctagonColour, MapAlliedColours;

	//NAME
	var NameCaps, NameConsonants, NameVowels;

	//RANDOM
	var PowerOctagon, AlliedOctagon;
	var AlliedColours, AlliedPositions;		//NOTE: relative to centre
	var ContinentPositions;
	var CityStateOctagon, CityStateLocations, CityStateSatellites;

	//DUEL
	var LeftEllipses, RightEllipses;
	var LeftFighterPosition, RightFighterPosition;

	//BITS
	var Arsenal, Hardpoints;
	var LeftSilklightPosition, RightSilklightPosition;
	var LeftChaffPosition, RightChaffPosition;

	//CAROUSEL
	var TEStCAROUSEL, TestCarousel;

	//ROLLING
	var ROLLINgCAROUSEL, RollingCarousel;																//UNLOGGED
	var ItemUpButton, UpRollButton, PauseRollButton, DownRollButton, ItemDownButton;		//UNLOGGED
	var ITEmUpBUTTON, UpROLlBUTTON, PAUSeROLlBUTTON, DOWnROLlBUTTON, ITEmDOWnBUTTON;

	var t1, t2, t3, t4;
};
DominionTesting.prototype = {
	Set(cntxt, iBox, cPanel, gTool, cPad, tWriter, rGenerator, sRect) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.Frames = 0;
		this.State = 0;
		this.ToggleFlag = true;
	},
	Start() {

		this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
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
			 case TEST.INTERDICTOR:
				this.SetInterdictorTest();
				this.PlayInterdictorTest();
				break;
			 case TEST.MAP:
		  this.SetMapBuilding();
		  this.PlayMapBuilding();
		  break;
			 case TEST.NAME:
		  this.SetNameGeneration();
		  this.PlayNameGeneration();
		  break;
			 case TEST.ALLIEDS:
		  this.SetRandomAllieds();
		  this.PlayRandomAllieds();
		  break;
			 case TEST.BEAM:
		  this.SetBeamAppearance();
		  this.PlayBeamAppearance();
		  break;
			 case TEST.RANDOM:
		  this.SetRandomAllieds();
		  this.PlayRandomAllieds();
		  break;
			 case TEST.DUEL:
		  this.SetFighterDuel();
		  this.PlayFighterDuel();
		  break;
			 case TEST.BITS:
		  this.SetBitPackingTest();
		  this.PlayBitPackingTest();
		  break;
			 case TEST.CAROUSEL:
				this.SetCarouselTest();
				this.PlayCarouselTest();
				break;
			 case TEST.ROLLING:
				this.SetRollingCarouselTest();
				this.PlayRollingCarouselTest();
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
