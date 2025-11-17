
//----------------------------------------------
//---------- LIBRARY OBJECTS -------------------

var GalleryScape;
var GalleryGraphics;
var GalleryCalcPad;
var GalleryTextWriter;
var GalleryRandomizer;
var Controller;

//-------------------------------------------
//---------- CORE OBJECTS -------------------

var Industrialists;

//------------------------------------------
//---------- SIM OBJECTS -------------------

var Intro, Demo, Tutorial, MiniGames;

//------------------------------------
//---------- TOOLS -------------------

var Testing;
var indx, indx2, colour, coords;		//scratch variables

//-----------------------------------
//---------- DATA -------------------

var MappedQuad;

//---------------------------------------
//---------- CONTROLS -------------------

var NewGameButton, TutorialButton, DemoButton, MiniGamesButton;

//-----------------------------------------
//---------- IMAGE MAPS -------------------

var DemoImage;
var MiniGamesImage;
var TestingImage;

//-------------------------------------
//---------- IMAGES -------------------

//-- LIQUEFIER --
var LiquefierImage;
var SlidingDoorImage;
var LiquefierInteriorImage;

var PowerStationImage;
var ShedImage;
var PortalPillarImage;

//--------------------------------------
//---------- SPRITES -------------------

var WIMPSprite;
var WIMPCastorSprite;

var RobotSprite;

//-- WEAPONS --
var IonOrbSprite;
var PercutterSprite;
var PercutterDiscSprite;

//-- FX --
var ExplosionSprite;

//---------------------------------
//---------- FX -------------------

var ExplosionList;

//-------------------------------------
//---------- AGENTS -------------------

var Agents;

//-- VIEWS --

var IntroView;

//-------------------------------------------------
//---------- GALLERY COMPONENTS -------------------
var GalleryComponents = function() {
	var Interface;
	var Screen;
	var InfoBox;
	var ControlPanel;
	var GraphicsTool;
	var TextWriter;
	var Randomizer;
	var ScreenRect, ScreenQuad;
};
GalleryComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect, sQuad) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.ScreenQuad = sQuad;

		this.SetData();

		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateTools();
		this.CreateControls();
		if (Game.CheckPC())
			this.CreateImageMaps();
		this.CreateImages();
		this.CreateViews();
		this.CreateSprites();
		this.CreateFXLists();
		this.CreateAgents();
		this.CreateViews();

		this.SetCoreObjects();
		this.SetSimObjects();
		this.SetTools();
		this.SetControls();
		if (Game.CheckPC())
			this.SetImageMaps();
		this.SetImages();
		this.SetViews();
		this.SetSprites();
		this.SetFXLists();
		this.SetAgents();
		this.SetViews();
	},
	SetData() {

		//UNLOGGED

		//Generate MappedQuad coords
		MappedQuad = ArrayUtils.Create(4, Coordinate2D);

		MappedQuad[0].Set(0, 0);
		MappedQuad[1].Set(SCREEN.WIDTH, 0);
		MappedQuad[2].Set(SCREEN.WIDTH, 400);
		MappedQuad[3].Set(0, 400);
/*
		MappedQuad[0].Set(-SCREEN.WIDTH/2, -200);
		MappedQuad[1].Set(SCREEN.WIDTH/2, -200);
		MappedQuad[2].Set(SCREEN.WIDTH/2, 200);
		MappedQuad[3].Set(-SCREEN.WIDTH/2, 200);
*/
		for (indx=0;indx<MappedQuad.length;++indx) {
	 GeoUtils.IsometricToCartesian(MappedQuad[indx], CLOCKWISE, MODIFY, { W: 800, H: 400 } );
	 MappedQuad[indx].X -= 400;
	 MappedQuad[indx].Y -= 200;
		}
	},
	CreateCoreObjects() {

		//UNLOGGED

		Industrialists = new GenieArray();
	},
	SetCoreObjects() {

		//UNLOGGED

		Industrialists.Set(INDUSTRIALIST.COUNT, GalleryIndustrialist, INDEXED);
	},
	CreateSimObjects() {

		if (Game.CheckPC()) {
			Intro = new GalleryIntro();
			Demo = new GalleryDemo();
			Tutorial = new GalleryTutorial();
			MiniGames = new GalleryMiniGames();
		}
	},
	SetSimObjects() {

		if (Game.CheckPC()) {
			Intro.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
			Demo.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
			Tutorial.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
			MiniGames.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
		}
	},
	CreateTools() {

		//UNLOGGED

		coords = new Coordinate2D();

		if (Game.CheckPC())
			Testing = new GalleryTesting();
	},
	SetTools() {

		//UNLOGGED

		if (Game.CheckPC())
			Testing.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect, this.ScreenQuad);
	},
	CreateControls() {

		//UNLOGGED

		if (Game.CheckPC()) {
			NewGameButton = new ImageButton();
			TutorialButton = new ImageButton();
			DemoButton = new ImageButton();
			MiniGamesButton = new ImageButton();
		}
	},
	SetControls() {

		//UNLOGGED

		if (Game.CheckPC()) {
			NewGameButton.Set(this.Interface.ZoomScape, NEwGAMeBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	//		NewGameButton.SetLinks(null, this.TextWriter);									//REDUNDANT?
			TutorialButton.Set(this.Interface.ZoomScape, TUTORIAlBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	//		TutorialButton.SetLinks(null, this.TextWriter);									//REDUNDANT?
			DemoButton.Set(this.Interface.ZoomScape, DEMoBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	//		DemoButton.SetLinks(null, this.TextWriter);									//REDUNDANT?
			MiniGamesButton.Set(this.Interface.ZoomScape, MINiGAMEsBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	//		MiniGamesButton.SetLinks(null, this.TextWriter);								//REDUNDANT?
		}
	},
	CreateImageMaps() {

		//UNLOGGED

		DemoImage = new GenieImageMap();
		MiniGamesImage = new GenieImageMap();
		TestingImage = new GenieImageMap();
	},
	SetImageMaps() {

		//UNLOGGED

		DemoImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.DEMO], DEMoIMAGE, DemoMap);
		MiniGamesImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiGAMES], MINiGAMEsIMAGE, MiniGamesMap);
		TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);
	},
	CreateImages() {

		//UNLOGGED

		//Liquefier
		LiquefierImage = new GenieImage();
		SlidingDoorImage = new GenieImage();
		LiquefierInteriorImage = new GenieImage();

		PowerStationImage = new GenieImage();
		ShedImage = new GenieImage();
		PortalPillarImage = new GenieImage();
	},
	SetImages() {

		//UNLOGGED

		LiquefierImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], LIQUEFIErIMAGE);
		SlidingDoorImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SLIDINgDOOrIMAGE);
		LiquefierInteriorImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], LIQUEFIErINTERIOrIMAGE);

		PowerStationImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], POWErSTATIOnIMAGE);
		ShedImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SHEdIMAGE);
		PortalPillarImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PORTAlPILLArIMAGE);
	},
	CreateViews() {
	},
	SetViews() {
	},
	CreateSprites() {

		//UNLOGGED

		WIMPSprite = new AnimatedSprite();
		WIMPCastorSprite = new AnimatedSprite();

		RobotSprite = new CompositeSprite();
		if (Game.CheckPC()) {
			IonOrbSprite = new StaticSprite();
			PercutterSprite = new StaticSprite();
			PercutterDiscSprite = new StaticSprite();
		}

		//FX
		if (Game.CheckPC())
			ExplosionSprite = new StaticSprite();
	},
	SetSprites() {

		//UNLOGGED

		WIMPSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WIMPsPRITE);
		WIMPCastorSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WIMPcASTOrSPRITE);

		RobotSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ROBOtSPRITE, this.GraphicsTool);
		if (Game.CheckPC()) {
			IonOrbSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], IOnORbSPRITE);
			PercutterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PERCUTTErSPRITE);
			PercutterDiscSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PERCUTTErDIScSPRITE);
		}

		//FX
		if (Game.CheckPC())
			ExplosionSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeSPRITES], GENIeEXPLOSIOnSPRITE);
	},
	CreateFXLists() {

		//UNLOGGED

		FXLists = new Array();

		ExplosionList = new GenieList();
		FXLists.push(ExplosionList);
/*
		BVRLaserList = new GameList();
		BVRRocketList = new GameList();
		BVRShellList = new GameList();
		this.FXLists.push(BVRLaserList);
		this.FXLists.push(BVRRocketList);
		this.FXLists.push(BVRShellList);
*/
	},
	SetFXLists() {

		//UNLOGGED

		ExplosionList.Set(1, PulsatingExplosion, null, ExplosionSprite);
/*
		BVRLaserList.Set(1, GenieLaserBlast, null, this.GraphicsTool);
		BVRRocketList.Set(1, GenieRocket, null, null, this.GraphicsTool);
//		BVRShellList.Set(1, GenieShell, null, null, this.GraphicsTool);
*/
	},
	CreateAgents() {
	},
	SetAgents() {
	},
	CreateViews() {  //UNLOGGED

		if (Game.CheckMobile())
			IntroView = new WidgetIntroView();
	},
	SetViews() {

		if (Game.CheckMobile()) {
			IntroView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
			IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
		}
	}
};
