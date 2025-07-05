
//----------------------------------------
//----------- OBJECTS --------------------

var SolarScape, SolarGraphics, SolarCalcPad, SolarText, SolarRandomizer, Controller;		//library
var Planets, SelectedPlanet;
var Pilots, PlayerPilot, Ships, Starfield, SolarSystem, ColonyStation, StarStile, HabitationStation;			//core
var Cockpit, CargoBay, Journey;
var Intro, MiniGames;

//----------------------------------------
//----------- TOOLS ----------------------

var Testing;
var PlanetBuffer, StarStileBuffer;
var ReticleImage, TrackPad;

//Scratch variables - remove (TODO)
var indx, indx2, num, info, coords, coords2;

//------------------------------------------
//----------- GAME DATA --------------------

var EliteStationVertices;
var PiratePositions;

//-----------------------------------------
//----------- CONTROLS --------------------

var TravelButton;  //maybe TEMP, although could be used to launch ships
var DockingButton;
var ShiningStarButton;

var RaisedCornerImages;  //images

//-----------------------------------------
//---------- IMAGE MAPS -------------------

var TestingImage, MiniGamesImage;

//-------------------------------------
//---------- IMAGES -------------------

var TitleImage, PicatrixImage, ByImage, ScrooblesoftImage, TrixsterImage, SoundImage;
var CrateImage, ShipImage, StationImage;
var StationChuteImage;

//----------------------------------------
//----------- SPRITES --------------------
/* DE-LOG */
var BlueKraitSprite, YellowAdderSprite, RedCobraSprite, GreenAspSprite;
var CyanViperSprite, MaroonPythonSprite, OliveStoatSprite, CreamMarmotSprite;
var FusciaDiabloSprite, PurpleRattlerSprite, TealCascabelSprite, GreyCopperHeadSprite;
var GreyNagaSprite, PinkMothSprite, PurpleTaipanSprite, PuceLancerSprite;
var KraitHalfSprite;
/* */
var TouristSprite, FreebooterSprite, ShuttleSprite, LinerSprite;
var CourierSprite, PirateSprite, WarshipSprite, FugitiveSprite;
var SmugglerSprite, FerrySprite, AnarchidSprite, FreighterSprite;

//-------------------------------------
//---------- SOUNDS -------------------

var Soundtrack;
var LaserSound, ExplosionSound;

//---------------------------------
//---------- FX -------------------

var ExplosionSprite;

var EliteLaserList;
//var BVRRocketList;
//var BVRShellList;
var EliteExplosionList;

//---------------------------------------
//----------- AGENTS --------------------

var KraitShip;

//--------------------------------------
//----------- VIEWS --------------------

var IntroView, IntroInfoView, IntroConsoleView;
var CourierView, CourierInfoView, CourierConsoleView;
var DockedView, DockedInfoView, DockedConsoleView;
var JumpView, JumpInfoView, JumpConsoleView;
var TradeView, TradeInfoView, TradeConsoleView;
var VoyageView, VoyageInfoView, VoyageConsoleView, CockpitInfoView, CockpitConsoleView;
var WordsInfoView, WordsConsoleView;
var HabStatView, ExpeditionView, PirateView, AnarchidView, RingStatView;

//-------------------------------------------------
//----------- SOLAR COMPONENTS --------------------
var SolarComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel, Ticker, Tabloid;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
//	var EliteSpace;
	var FXLists;
};
SolarComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console.Context;
/*
		if ( (Game.Settings & GAME.PLATFORM.TABLET) || (Game.Settings & GAME.PLATFORM.PC) ) {
			this.Ticker = this.Interface.Dashboard.Context;
			this.Tabloid = this.Interface.HelpDeck.Context;
		}
*/
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;

		this.CreateSimObjects();
		this.CreateTools();
		this.CreateCoreObjects();
		this.CreateControls();
		this.CreateImageMaps();
		this.CreateImages();
		this.CreateSprites();
		this.CreateSounds();
		this.CreateFXLists();
		this.CreateAgents();
		this.CreateViews();

		this.SetData();

		this.SetSimObjects();
		this.SetTools();
		this.SetCoreObjects();
		this.SetControls();
		this.SetImageMaps();
		this.SetImages();
		this.SetSprites();
		this.SetSounds();
		this.SetFXLists();
		this.SetAgents();
		this.SetViews();
	},
	CreateSimObjects() {

		//UNLOGGED

		Intro = new SolarIntro();

		if ( (Game.Settings & GAME.PLATFORM.TABLET) || (Game.Settings & GAME.PLATFORM.PC) )
			MiniGames = new SolarMiniGames();
	},
	SetSimObjects() {

		//UNLOGGED

		Intro.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);

		if ( (Game.Settings & GAME.PLATFORM.TABLET) || (Game.Settings & GAME.PLATFORM.PC) )
			MiniGames.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer);
	},
	CreateCoreObjects() {

		//UNLOGGED

		Pilots = new GenieArray();
		Ships = new GenieArray();
		Planets = new GenieArray();
		Starfield = new SolarStarfield();
		SolarSystem = new RogueSolarSystem();
		ColonyStation = new SolarDockingStation();
		StarStile = new SolarStarStile();

		Cockpit = new SolarCockpit();
		CargoBay = new SolarCargoBay();
		Journey = new SolarJourney();
	},
	SetCoreObjects() {
		var i;
		var order;

		//UNLOGGED

		Pilots.Set(PILOT.COUNT, SolarPilot, INDEXED);
		Ships.Set(PILOT.COUNT, FreebooterShip, INDEXED);
		PlayerPilot = Pilots[0];
		Planets.Set(PLANET.COUNT, SolarPlanet, INDEXED, this.Screen, this.GraphicsTool, this.Randomizer, PLANET, PlanetBuffer);
//		Utilities.GetUniqueRandomNumbers(order, PLANET.COUNT, PLANET.COUNT, STARtAtZERO);
/*
		Planets.Set(PLANET.COUNT, SolarPlanet);
		order = new Array();
		this.Randomizer.GetUniqueIndices(order, PLANET.COUNT, PLANET.COUNT);
		for (i=0;i<PLANET.COUNT;++i) {
			Planets[i].Index = order[i];
			Planets[i].Set(this.Screen, this.GraphicsTool, this.Randomizer, PLANET, PlanetBuffer);
			Planets[i].Generate();
		}
		Planets.forEach(function(plnt){plnt.Buffer=PlanetBuffer;});
*/
//		Planets.forEach(function(plnt){plnt.Generate();plnt.GenerateOrbit();});
		Planets.forEach(function(plnt){plnt.Generate();});
		SolarSystem.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.Randomizer);
		SolarSystem.SetPlanets();
		Starfield.Set(this.Screen, this.GraphicsTool, this.Randomizer, STARFIELD);
		ColonyStation.Set(this.Screen, this.GraphicsTool, this.CalcPad);
		StarStile.Set(this.Screen, this.CalcPad);

		Cockpit.Set(this.InfoBox, this.GraphicsTool, COCKPIT);
		CargoBay.Set(this.Screen, this.GraphicsTool);
		Journey.Set();

		StarStileBuffer.Set(SCREEN);
	},
	SetData() {
		var sides;
		var polygon;

		//UNLOGGED

		EliteStationVertices = new Array();
		for (sides=SOLArDOCKINgSTATION.MInSIDES;sides<=SOLArDOCKINgSTATION.MAxSIDES;++sides) {
			polygon = this.CalcPad.GetPolygonVertices(sides, SOLArDOCKINgSTATION.SIZE);
			polygon.forEach(function(vertex){vertex.X += SCREEN.WIDTH/2; vertex.Y += SCREEN.WIDTH/2;});
			EliteStationVertices.push(polygon);
		}

		PiratePositions = [ { X: 50, Y: 50 }, { X: 150, Y: 50 }, { X: 250, Y: 50 }, { X: 350, Y: 50 }, { X: 450, Y: 50 }, { X: 550, Y: 50 },		  //top row
			  { X: 50, Y: 150 }, { X: 50, Y: 250 }, { X: 50, Y: 350 }, { X: 50, Y: 450 },							  //left column
			  { X: 550, Y: 150 }, { X: 550, Y: 250 }, { X: 550, Y: 350 }, { X: 550, Y: 450 },						  //right column
			  { X: 50, Y: 550 }, { X: 150, Y: 550 }, { X: 250, Y: 550 }, { X: 350, Y: 550 }, { X: 450, Y: 550 }, { X: 550, Y: 550 }  ];  //bottom row
	},
	CreateTools() {

		//UNLOGGED

 		if (Game.Settings & GAME.CONTROLLER.TRACKPAD) {
			ReticleImage = new GenieImage();
			TrackPad = new GenieTrackPad();
		}

		//Buffers
		PlanetBuffer = new GenieBuffer();
		StarStileBuffer = new GenieBuffer();	//TODO: see if this can be eliminated

		if (Game.CheckPC())
			Testing = new SolarTesting();

		//Scratch variables
		coords = new Coordinate2D();
		coords2 = new Coordinate2D();
	},
	SetTools() {

		//UNLOGGED

 		if (Game.Settings & GAME.CONTROLLER.TRACKPAD) {
			ReticleImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], RETICLeIMAGE);
			TrackPad.Set(this.Screen, SOLArTRACKPAD, ReticleImage);
		}

		//Buffers
		PlanetBuffer.Set( { WIDTH: 6*PLANET.GLOBE.R, HEIGHT: 2*PLANET.GLOBE.R } );

		if (Game.CheckPC())
			Testing.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer);
	},
	CreateControls() {

		//UNLOGGED

		DockingButton = new TextButton();
		ShiningStarButton = new TextButton();
		TravelButton = new TextButton();

		//Images
		RaisedCornerImages = new GenieImage();
	},
	SetControls() {

		//UNLOGGED

		DockingButton.Set(this.Interface.Console, { L: 5, T: 210, W: 60, H: 20, LABEL: "Docking" }, this.TextWriter);
		ShiningStarButton.Set(this.Interface.Console, { L: 85, T: 210, W: 60, H: 20, LABEL: "Star" }, this.TextWriter);
		TravelButton.Set(this.Interface.Console, { L: 170, T: 210, W: 60, H: 20, LABEL: "Travel" }, this.TextWriter);

		//Images
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
	},
	CreateImageMaps() {

		//UNLOGGED

		if (Game.CheckPC()) {
			TestingImage = new GenieImageMap();
			MiniGamesImage = new GenieImageMap();	//TODO: have to make sure this included for tablets
		}
	},
	SetImageMaps() {

		//UNLOGGED

		if (Game.CheckPC()) {
			TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);
			MiniGamesImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiGAMES], MINiGAMEsIMAGE, MiniGamesMap);	//TODO: include for tablets
		}
	},
	CreateImages() {

		//UNLOGGED

		CrateImage = new GenieImage();
		ShipImage = new GenieImage();
		StationImage = new GenieImage();
		StationChuteImage = new GenieImage();

		this.CreateCreditImages();
	},
	SetImages() {

		//UNLOGGED

		CrateImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], CRATeIMAGE);
		ShipImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SHIpIMAGE);
		StationImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], STATIOnIMAGE);
		StationChuteImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], STATIOnCHUTeIMAGE);

		this.SetCreditImages();
	},
	CreateSprites() {
/* REDUNDANT below */
		BlueKraitSprite = new GenieSprite();
		YellowAdderSprite = new GenieSprite();
		RedCobraSprite = new GenieSprite();
		GreenAspSprite = new GenieSprite();

		CyanViperSprite = new GenieSprite();
		MaroonPythonSprite = new GenieSprite();
		OliveStoatSprite = new GenieSprite();
		CreamMarmotSprite = new GenieSprite();

		FusciaDiabloSprite = new GenieSprite();
		PurpleRattlerSprite = new GenieSprite();
		TealCascabelSprite = new GenieSprite();
		GreyCopperHeadSprite = new GenieSprite();

		GreyNagaSprite = new GenieSprite();
		PinkMothSprite = new GenieSprite();
		PurpleTaipanSprite = new GenieSprite();
		PuceLancerSprite = new GenieSprite();

		KraitHalfSprite = new GenieSprite();
/* end REDUNDANT */
		TouristSprite = new AnimatedSprite();
		FreebooterSprite = new AnimatedSprite();
		ShuttleSprite = new AnimatedSprite();
		LinerSprite = new AnimatedSprite();
		CourierSprite = new AnimatedSprite();
		PirateSprite = new AnimatedSprite();
		WarshipSprite = new AnimatedSprite();
		FugitiveSprite = new AnimatedSprite();
		SmugglerSprite = new AnimatedSprite();
		FerrySprite = new AnimatedSprite();
		AnarchidSprite = new AnimatedSprite();
		FreighterSprite = new AnimatedSprite();
	},
	SetSprites() {
/* REDUNDANT below */
		BlueKraitSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BLUeKRAItSPRITE);
		YellowAdderSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], YELLOwADDErSPRITE);
		RedCobraSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], REdCOBRaSPRITE);
		GreenAspSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GREEnASpSPRITE);

		CyanViperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CYAnVIPErSPRITE);
		MaroonPythonSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MAROOnPYTHOnSPRITE);
		OliveStoatSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], OLIVeSTOAtSPRITE);
		CreamMarmotSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CREAmMARMOtSPRITE);

		FusciaDiabloSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FUSCIaDIABLoSPRITE);
		PurpleRattlerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PURPLeRATTLErSPRITE);
		TealCascabelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TEAlCASCABElSPRITE);
		GreyCopperHeadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GREyCOPPErHEAdSPRITE);

		GreyNagaSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GREyNAGaSPRITE);
		PinkMothSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PINkMOThSPRITE);
		PurpleTaipanSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PURPLeTAIPAnSPRITE);
		PuceLancerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PUCeLANCErSPRITE);

		KraitHalfSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], KRAItHALfSPRITE);
/* end REDUNDANT */
		TouristSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TOURIStSPRITE);
		FreebooterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FREEBOOTErSPRITE);
		ShuttleSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SHUTTLeSPRITE);
		LinerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LINErSPRITE);
		CourierSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], COURIErSPRITE);
		PirateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PIRATeSPRITE);
		WarshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WARSHIpSPRITE);
		FugitiveSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FUGITIVeSPRITE);
		SmugglerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SMUGGLErSPRITE);
		FerrySprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FERRySPRITE);
		AnarchidSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ANARCHIdSPRITE);
		FreighterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FREIGHTErSPRITE);
	},
	CreateSounds() {

		//UNLOGGED

		Soundtrack = new GenieSound();
		LaserSound = new GenieSound();
		ExplosionSound = new GenieSound();
	},
	SetSounds() {

		//UNLOGGED

		Soundtrack.Set(SolarSounds[SOUNdINDEX.SOUNDTRACK]);
		LaserSound.Set(SolarSounds[SOUNdINDEX.LASER]);
		ExplosionSound.Set(SolarSounds[SOUNdINDEX.EXPLOSION]);
	},
	CreateFXLists() {

		//UNLOGGED
/*
		this.FXLists = new Array();
		EliteLaserList = new GenieList();
//		BVRRocketList = new GameList();
//		BVRShellList = new GameList();
		EliteExplosionList = new GenieList();
		this.FXLists.push(EliteLaserList);
//		this.FXLists.push(BVRRocketList);
//		this.FXLists.push(BVRShellList);
		this.FXLists.push(EliteExplosionList);
		FXLists = this.FXLists;
*/
	},
	SetFXLists() {

		//U-LOGGED
/*
		EliteLaserList.Set(1, GenieLaserBlast, null, this.GraphicsTool);
//		BVRRocketList.Set(1, GenieRocket, null, null, this.GraphicsTool);
//		BVRShellList.Set(1, GenieShell, null, null, this.GraphicsTool);
		EliteExplosionList.Set(1, PulsatingExplosion, null, ExplosionSprite);
*/
	},
	CreateAgents() {

		//U-LOGGED

		KraitShip = new SolarShip();
	},
	SetAgents() {

		//UNLOGGED

//		KraitShip.Set( { X: 300, Y: 300 }, null, null, BLUeKRAItSHIP, BlueKraitSprite);
//		KraitShip.Set(BLUeKRAItSHIP, BlueKraitSprite);
//		KraitShip.SetLinks(this.ScreenRect, this.InfoBox, null, null, null, null, [KraitHalfSprite]);
		KraitShip.SetLinks(this.ScreenRect, this.InfoBox);
	},
	CreateViews() {  //UNLOGGED

		this.CreateIntroViews();
		this.CreateCockpitViews();
		this.CreateCourierViews();
		this.CreateDockedViews();
		this.CreateJumpViews();
		this.CreateTradeViews();
		VoyageView = new SolarVoyageView();
		this.CreateWordViews();
	},
	SetViews() {  //UNLOGGED

		this.SetIntroViews();
		this.SetCockpitViews();
		this.SetCourierViews();
		this.SetDockedViews();
		this.SetJumpViews();
		this.SetTradeViews();
		this.SetVoyageViews();
		this.SetWordViews();
	}
};
