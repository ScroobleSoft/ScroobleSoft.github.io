
//--------------------------------------
//---------- OBJECTS -------------------

var DominionScape, DominionGraphics, DominionCalcPad, DominionText, DominionRandomizer, Controller;		//library
var Nations, Powers, PlayerPower, AlliedStates, CityStates, Tomcat, DiplomacyTable;								//nations
var Continents, Archipelagos, Atolls, Map, WorldMap;																		//maps
var Intro, Demo, Tutorial, MiniGames;																							//sim

//------------------------------------
//---------- TOOLS -------------------

var Testing;
var Colourizer;
var ScreenManager;
var DominionUtils;
var CharacterGenerator;

//-----------------------------------
//---------- DATA -------------------

var FIGHTErSPRITeOFFSETs, FighterDistributions;
var JEtCOLOUrINDICEs, CARRIErBOwOFFSETs;
var LEFtFLAReOFFSETs, RIGHtFLAReOFFSETs, LEFtCHAFfOFFSETs, RIGHtCHAFfOFFSETs;
var AlliedsIndex, SatelliteIndex, GovernmentsMatrix, ContinentLocations;
var ArmsDistribution;		//MOBILE

//---------------------------------------
//---------- CONTROLS -------------------

//Buttons
var NewGameButton, TutorialButton, DemoButton, MiniGamesButton;						//standard
var IconCornerImages, RaisedCornerImages, CheckBoxImages, RadioOptionImage;		//images

var AllianceCancelButton, AllianceButton, TurnButton;						//REDUNDANT?

var NewsCarousel;

var CheckBoxImage;
var ScanModeCheckBox;

var JetAccuracyMeter;				//UNLOGGED
var StepButton;					//UNLOGGED

//-------------------------------------
//---------- IMAGES -------------------

var DemoImage, TutorialImage, MiniGamesImage, TestingImage;		//image maps
var MinistryPanelImage, MinistryImagePanel;							//image panels
var ArverniDigitImages;
var PowerLabelImages, AlliedLabelImages;
var AllianceImage;										//UNLOGGED - REDUNDANT

//Characters
var HairStyleImages, HairDoImages, LongHairImages;
var EyeBrowImages, EyeImages, HalfEyeImages, ClosedEyeImages;
var FaceImages, UrnFaceImages, NoseImages, MouthImages;
var TieImages;

//Weapons
var ShortCannonImages, LongCannonImages, ShortCannonConsoleImages, LongCannonConsoleImages;
var AAMHorizontalShaftImages, AAMVerticalShaftImages;
var FirebrandHorizontalFinImages, SilklightHorizontalFinImages, FirebrandVerticalFinImages, SilklightVerticalFinImages;
var FirebrandHorizontalWarheadImages, SilklightHorizontalWarheadImages, FirebrandVerticalWarheadImage, SilklightVerticalWarheadImage;

//Wards
var FlareImage, ChaffImage, FlareSymbolImage, ChaffSymbolImage;

var FortnightDigitImages, JetLetterImages, TinyDigitImages;

//--------------------------------------
//---------- SPRITES -------------------

//Army
var LeftTrooperSprite, RightTrooperSprite, GrenadeSprite, LeftBazookaSprite, RightBazookaSprite,
	 LeftGunArmSprite, RightGunArmSprite, LeftGrenadierArmSprite, RightGrenadierArmSprite, LeftBazookerArmSprite, RightBazookerArmSprite;	//troopers
var LeftHowitzerSprite, RightHowitzerSprite, JeepSprite, APCSprite, SmallBarrelSprite, LeftJeepGunSprite, RightJeepGunSprite;		//light units - UNLOGGED
var AVSprite, ArtillerySprite, IFVSprite, LeftAVCannonSprite, RightAVCannonSprite, LeftBarrelSprite, RightBarrelSprite;				//medium units
var MobileGunSprite, LeftTruckSprite, RightTruckSprite, TankSprite, TankHutchSprite, LargeBarrelSprite;	//heavy units - UNLOGGED
var ATWSprite, LeftATMSprite, RightATMSprite, AAGunSprite, LeftLCGSprite, RightLCGSprite, LeftLCGBarrelSprite, RightLCGBarrelSprite; //defence units - U
var MissilePadSprite, SAMSprite, LeftSSMSprite, RightSSMSprite;		//missile - UNLOGGED
var LargeWheelSprite, MediumWheelSprite, SmallWheelSprite, TreadSprite;		//wheels - UNLOGGED

//Navy
var GunBoatSprite, MissileBoatSprite, FrigateSprite, DestroyerSprite, CruiserSprite, BattleshipSprite,
	 EscortCarrierSprite, LightCarrierSprite, FleetCarrierSprite, SuperCarrierSprite, CarrierTowerSprite;
var ShipBowSprite, ShipOutlineSprite, ShipHullSprite;

//Air Force
var LeftBomberSprite, LeftFighterSprite, LeftInterceptorSprite, LeftInterdictorSprite,
	 LeftReconSprite, LeftRefuellerSprite, LeftStraferSprite, LeftTransporterSprite;
var RightBomberSprite, RightFighterSprite, RightInterceptorSprite, RightInterdictorSprite,
	 RightReconSprite, RightRefuellerSprite, RightStraferSprite, RightTransporterSprite;
var LeftJetSprites, RightJetSprites;
var FighterInfoSprite, FighterDecalSprite;

//Projectiles
var FirebrandSprite, SilklightSprite;
var ICBMSprite, VapouriserSprite, VagabondSprite, VenomSprite;

//Wards
var FlareSprite, ChaffSprite;

//Bases
var JammerSprite, MissilePadSprite, JammerPadSprite;

//Misc
var WorldMapFlagSprite;

//-------------------------------------
//---------- AGENTS -------------------

//Jets
var LeftBombers, LeftFighters;
var RightBombers, RightFighters;
var LeftJets, RightJets;

//---------------------------------
//---------- FX -------------------

//Projectiles
var LaserList, ShellList;
var FirebrandList, SilklightList;
var FlareList, ChaffList;

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var GlobalView, IntroView,
	 GazetteerInfoView, VotesInfoView, BudgetInfoView, ReservesInfoView, DiplomacyInfoView, CashInfoView, ArmsInfoView, EventsInfoView,
	 ActionConsoleView;
//var BoardView;
var OfficeView, OfficeInfoView;
var AllianceView, MissionView;
var ConquestView, ConquestInfoView, ConquestConsoleView;
var PurchaseView, GrantView, PactView, TreatyView, IntrigueView;
var AssetsView, ForcesView, InvestmentView, BondsView;
var AirMissionView, ChampionsView;									//missions
var SeaTheatre, BeachheadTheatre;									//theatres
var SolicitationView, SolicitationInfoView, TurnConsoleView, MultipleChoiceView;
var GuideView, GuideInfoView, DocumentationConsoleView;

//--------------------------------------------------
//---------- DOMINION COMPONENTS -------------------
var DominionComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var Ticker, Tabloid;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var Controller;
};
DominionComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect, cntrllr) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console.Context;
		if (!Game.CheckMobile()) {
			this.Ticker = this.Interface.Dashboard.Context;
			this.Tabloid = this.Interface.HelpDeck.Context;
		}
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.Controller = cntrllr;

		this.SetData();

		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateTools();
		this.CreateControls();
		this.CreateImages();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateFX();
		this.CreateSounds();
		this.CreateViews();
		this.CreateTheatres();

		this.SetCoreObjects();
		this.SetSimObjects();
		this.SetTools();
		this.SetControls();
		this.SetImages();
		this.SetSprites();
		this.SetAgents();
		this.SetFX();
		this.SetSounds();
		this.SetViews();
		this.SetTheatres();
	},
	SetData() {
		var i;

		//UNLOGGED

		CARRIErBOwOFFSETs = [ [ { X: 1, Y: -18 }, { X: 104, Y: -18 }, { X: 104, Y: -1 }, { X: 1, Y: -1 } ],
				 [ { X: 1, Y: -34 }, { X: 104, Y: -34 }, { X: 104, Y: -1 }, { X: 1, Y: -1 } ]  ];

		//Indices
		AlliedsIndex = new Array(ALLIED.COUNT);
		for (i=0;i<AlliedsIndex.length;++i)
			AlliedsIndex[i] = i;
		SatelliteIndex = new Array(MAP.CONTINENT.SATELLITES);
		for (i=0;i<SatelliteIndex.length;++i)
			SatelliteIndex[i] = i;
		GovernmentsMatrix = new Array(GOVERNMENT.TYPES);
		for (i=0;i<GOVERNMENT.TYPES;++i)
			GovernmentsMatrix[i] = new Array();
		ContinentLocations = [ 0, 4, 1, 5, 2, 6, 3, 7, 8 ];

		this.SetSpriteData();
		this.SetAirData();
		this.SetJetData();

		//NOTE: this may or may not be Mobile exclusive
		ArmsDistribution = [ [ 3,0,0 ],		//27/27-Hornet (quantity/strength, latter based on 1-1.5-3<sic> for levels)
									[ 2,1,0 ],		//24/27-Jaguar
									[ 1,2,0 ],		//21/27-Falcon
									[ 2,0,1 ],		//21/27-Vulcan
									[ 0,2,1 ],		//15/27-Eagle
									[ 1,0,2 ],		//15/27-Buccanear
									[ 0,1,2 ],		//12/27-Phantom
									[ 0,0,3 ],		// 9/27-Mirage
									[ 2,2,2 ]		//36/54-Tomcat
		];
	},
	CreateCoreObjects() {

		//UNLOGGED

		//Nations
		Powers = new GenieArray();
		AlliedStates = new GenieArray();
		CityStates = new GenieArray();

		DiplomacyTable = new GenieDiplomacyTable();

		//Maps
		Continents = new GenieArray();
		Atolls = new GenieArray();
		Map = new DominionMap();
		WorldMap = new DominionWorldMap();
//		Office = new DominionOffice();
	},
	SetCoreObjects() {
		var i, j;

		//UNLOGGED

		//Nations
		Powers.Set(POWER.COUNT, DominionPower, INDEXED, this.Randomizer);
		PlayerPower = Powers[POWER.TOMCAT];
		Tomcat = Powers[POWER.TOMCAT];
		this.SetAlliedStates();
		CityStates.Set(CITySTATE.COUNT, DominionCityState, INDEXED, this.Randomizer);

		DiplomacyTable.Set(DIPLOMACY);

		//Maps
		Continents.Set(MAP.CONTINENT.COUNT, DominionContinent, INDEXED);
		for (i=0;i<POWER.COUNT;++i) {
			Continents[i].AddPower(Powers[i]);
			for (j=0;j<POWER.SATELLITES;++j)
				Continents[i].AddAllied((i*POWER.SATELLITES)+j);
		}
		Atolls.Set(ATOLL.COUNT, DominionAtoll, INDEXED);
		Map.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter, this.ScreenRect);
		Map.Generate();
		WorldMap.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter, this.ScreenRect);
	},
	CreateSimObjects() {

		Intro = new DominionIntro();
		Demo = new DominionDemo();
		Tutorial = new DominionTutorial();
		MiniGames = new DominionMiniGames();
	},
	SetSimObjects() {

		Intro.Set(this.Interface, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
		Demo.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		Tutorial.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		MiniGames.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
	},
	CreateTools() {

		//UNLOGGED

		if (!Game.CheckMobile())
			Testing = new DominionTesting();
		Colourizer = new GenieColourizer();
		ScreenManager = new GenieScreenManager();
		DominionUtils = new DominionUtilities();
		CharacterGenerator = new DominionCharacterGenerator();
	},
	SetTools() {

		//UNLOGGED

		if (!Game.CheckMobile())
			Testing.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer, this.ScreenRect);
		Colourizer.Set();
		ScreenManager.Set(this.InfoBox, this.ScreenRect, this.GraphicsTool, 200, true);
		DominionUtils.Set(this.Randomizer);
		CharacterGenerator.Set(this.GraphicsTool, this.Randomizer);
	},
	CreateControls() {

		//UNLOGGED

		//Standard buttons
		NewGameButton = new ImageButton();
		TutorialButton = new ImageButton();
		DemoButton = new ImageButton();
		MiniGamesButton = new ImageButton();

		//Images
		IconCornerImages = new GenieImage();
		CheckBoxImages = new GenieImage();
		RadioOptionImage = new GenieImage();

		//Buttons
		RaisedCornerImages = new GenieImage();
		AllianceCancelButton = new TextButton();
		AllianceButton = new TextButton();
		TurnButton = new TextButton();

		if (!Game.CheckMobile())
			NewsCarousel = new GenieCarouselSlider();

		//Options
		ScanModeCheckbox = new GenieCheckBox();
		StepButton = new TextButton();

		JetAccuracyMeter = new GenieGauge();
	},
	SetControls() {

		//UNLOGGED

		//Standard buttons
		NewGameButton.Set(this.Interface.ZoomScape, NEwGAMeBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		TutorialButton.Set(this.Interface.ZoomScape, TUTORIAlBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		DemoButton.Set(this.Interface.ZoomScape, DEMoBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		MiniGamesButton.Set(this.Interface.ZoomScape, MINiGAMEsBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);

		//Images
		IconCornerImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ICOnCORNErIMAGEs);
		CheckBoxImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);
		RadioOptionImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RADIoCONTROlIMAGE);

		//Buttons
		RaisedCornerImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
		AllianceCancelButton.Set(this.Interface.PrimeScape, ALLIANCeCANCElBUTTON, this.TextWriter);
		AllianceButton.Set(this.Interface.Console, ALLIANCeBUTTON, this.TextWriter);
		TurnButton.Set(this.Interface.Console, TURnBUTTON, this.TextWriter);

		if (!Game.CheckMobile()) {
			NewsCarousel.Set(this.Interface.HelpDeck, NEWsCAROUSEL);
			NewsCarousel.SetLinks(this.GraphicsTool, this.TextWriter);
		}

		//Options
		ScanModeCheckbox.Set(this.Interface.Console, SCAnMODeCHECkBOX, CheckBoxImage);
		ScanModeCheckbox.SetLinks(this.TextWriter);

		JetAccuracyMeter.Set(this.Interface.Console, JEtACCURACyMETER);
		JetAccuracyMeter.SetLinks(this.GraphicsTool);
		StepButton.Set(this.Interface.Console, STEpBUTTON, this.TextWriter);
	},
	CreateImages() {

		//UNLOGGED

		//Image Maps
		DemoImage = new GenieImageMap();
		TutorialImage = new GenieImageMap();
		MiniGamesImage = new GenieImageMap();
		TestingImage = new GenieImageMap();

		ArverniDigitImages = new GenieImage();

		PowerLabelImages = new GenieImage();
		AlliedLabelImages = new GenieImage();

		AllianceImage = new GenieImageMap();

		MinistryPanelImage = new GenieImage();
		MinistryImagePanel = new GenieImagePanel();

		this.CreateCharacterImages();
		this.CreateCannonImages();
		this.CreateMissileImages();
		this.CreateWardImages();

		JetLetterImages = new GenieImage();
		TinyDigitImages = new GenieImage();

		//Controls
		CheckBoxImage = new GenieImage();
	},
	SetImages() {

		//UNLOGGED

		//Image Maps
		DemoImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.DEMO], DEMoIMAGE, DemoMap);
		TutorialImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TUTORIAL], TUTORIAlIMAGE, TutorialMap);
		MiniGamesImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiGAMES], MINiGAMEsIMAGE, MiniGamesMap);
		TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);

		ArverniDigitImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], ARVERNiDIGItIMAGEs);

		PowerLabelImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], POWErLABElIMAGEs);
		AlliedLabelImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], ALLIEdLABElIMAGEs);

		AllianceImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], ALLIANCeIMAGE);

		MinistryPanelImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], MINISTRyPANElIMAGE);
		MinistryImagePanel.Set(this.Interface.PrimeScape, MINISTRyIMAGePANEL, MinistryPanelImage);

		this.SetCharacterImages();
		this.SetCannonImages();
		this.SetMissileImages();
		this.SetWardImages();

		//Digits
		JetLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], JEtLETTErIMAGES);
		TinyDigitImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], TINyDIGItIMAGES);

		//Controls
		CheckBoxImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);
	},
	CreateSprites() {

		//UNLOGGED

		this.CreateTrooperSprites();
		this.CreateLightCombatantSprites();
		this.CreateMediumCombatantSprites();
		this.CreateHeavyCombatantSprites();
		this.CreateDefenceCombatantSprites();
		this.CreateMissileSprites();
		this.CreateWheelSprites();
		this.CreateShipSprites();
		this.CreateJetSprites();
		this.CreateInfoJetSprites();
		this.CreateProjectileSprites();

		ShipBowSprite = new AnimatedSprite();
		ShipOutlineSprite = new AnimatedCompositeSprite();
		ShipHullSprite = new CompositeSprite();

		FlareSprite = new GenieSprite();
		ChaffSprite = new GenieSprite();

		//Bases
		JammerSprite = new GenieSprite();
		MissilePadSprite = new GenieSprite();
		JammerPadSprite = new GenieSprite();

		WorldMapFlagSprite = new AnimatedSprite();
	},
	SetSprites() {

		//UNLOGGED

		this.SetTrooperSprites();
		this.SetLightCombatantSprites();
		this.SetMediumCombatantSprites();
		this.SetHeavyCombatantSprites();
		this.SetDefenceCombatantSprites();
		this.SetMissileSprites();
		this.SetWheelSprites();
		this.SetShipSprites();
		this.SetJetSprites();
		this.SetInfoJetSprites();
		this.SetProjectileSprites();

		ShipBowSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SHIpBOwSPRITE);
		ShipOutlineSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SHIpOUTLINeSPRITE, this.GraphicsTool);
		ShipHullSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SHIpHULlSPRITE, this.GraphicsTool);

		FlareSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FLAReSPRITE);
		ChaffSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CHAFfSPRITE);

		//Bases
		JammerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], JAMMErSPRITE);
		MissilePadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILePAdSPRITE);
		JammerPadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], JAMMErPAdSPRITE);

		WorldMapFlagSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WORLdMApFLAgSPRITE);
	},
	CreateAgents() {

		//UNLOGGED

		this.CreateJets();
	},
	SetAgents() {

		//UNLOGGED

		this.SetJets();
	},
	CreateFX() {

		//UNLOGGED

		this.CreateMissiles();

		LaserList = new GenieFXList();
		ShellList = new GenieFXList();
		FirebrandList = new GenieFXList();
		SilklightList = new GenieFXList();
		FlareList = new GenieFXList();
		ChaffList = new GenieFXList();
	},
	SetFX() {

		//UNLOGGED

		this.SetMissiles();

//		LaserList.Set(20, DominionLaser, LASER);
//		ShellList.Set(20, CannonShell, SHELL);
		FirebrandList.Set(THEATRE.AIR.FIREBRANDS, DominionCounterMeasure, FIREBRAND, FirebrandSprite);
		SilklightList.Set(THEATRE.AIR.SILKLIGHTS, DominionCounterMeasure, SILKLIGHT, SilklightSprite);
		FlareList.Set(20, DominionCounterMeasure, FLARE, FlareSprite);
		ChaffList.Set(20, DominionCounterMeasure, CHAFF, ChaffSprite);
	},
	CreateSounds() {
	},
	SetSounds() {
	},
	CreateViews() {

		//UNLOGGED

		this.CreateGlobalViews();

		IntroView = new DominionIntroView();

		OfficeView = new DominionOfficeView();
		OfficeInfoView = new DominionOfficeInfoView();

//		BoardView = new DominionBoardView();

		AllianceView = new AllianceSelectionView();
		MissionView = new DominionMissionView();

		//Expansion
		ConquestView = new DominionConquestView();
		ConquestInfoView = new DominionConquestInfoView()
		ConquestConsoleView  = new DominionConquestConsoleView();

		PurchaseView = new DominionPurchaseView();
		GrantView = new DominionGrantView();
		PactView = new DominionPactView();
		TreatyView = new DominionTreatyView();
		IntrigueView = new DominionIntrigueView();

		//Inventory
		AssetsView = new DominionAssetsView();
		ForcesView = new DominionForcesView();
		InvestmentView = new DominionInvestmentView();
		BondsView = new DominionBondsView();

		//Turns
		SolicitationView = new DominionSolicitationView();
		SolicitationInfoView = new DominionSolicitationInfoView();
		TurnConsoleView = new DominionTurnConsoleView();
		MultipleChoiceView = new DominionChoiceInfoView();

		DocumentationConsoleView = new DominionDocumentationConsoleView();
	},
	SetViews() {  //UNLOGGED

		this.SetGlobalViews();
		this.SetIntroViews();
		this.SetFinancialViews();
		this.SetTurnViews();
		this.SetOfficeViews();
		DocumentationConsoleView.SetLinks(null, this.TextWriter);
		DocumentationConsoleView.Set(this.Interface.Console, VIEW.DOCUMENTATION);
		this.SetGuideViews();

//		BoardView.Set(this.Interface.PrimeScape, this.GraphicsTool, this.CalcPad, this.TextWriter, this.ScreenRect);	//TODO: all these arguments needed?

		AllianceView.Set(this.Interface.PrimeScape, VIEW.ALLIANCE, this.GraphicsTool);

		MissionView.SetLinks(this.GraphicsTool);
		MissionView.Set(this.Interface.PrimeScape, VIEW.MISSION);

		//Expansion
		ConquestView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
		ConquestView.Set(this.Interface.PrimeScape, VIEW.CONQUEST);
		ConquestInfoView.SetLinks(this.GraphicsTool, this.TextWriter);
		ConquestInfoView.Set(this.Interface.ZoomScape, VIEW.CONQUEST.INFO, ConquestView);
		ConquestConsoleView.SetLinks(null, this.TextWriter);
		ConquestConsoleView.Set(this.Interface.Console, VIEW.CONQUEST.CONSOLE, ConquestView);
		ConquestView.SetSubViews(ConquestInfoView, ConquestConsoleView);

		PurchaseView.Set(this.Interface.PrimeScape, VIEW.PURCHASE);
		GrantView.Set(this.Interface.PrimeScape, VIEW.GRANT);
		PactView.Set(this.Interface.PrimeScape, VIEW.PACT);
		TreatyView.Set(this.Interface.PrimeScape, VIEW.TREATY);
		IntrigueView.Set(this.Interface.PrimeScape, VIEW.INTRIGUE);
	},
	CreateTheatres() {
 
		//UNLOGGED

		AirMissionView = new DominionAirMissionView();
		ChampionsView = new DominionChampionsView();

		SeaTheatre = new DominionSeaTheatre();
		BeachheadTheatre = new DominionBeachheadTheatre();
	},
	SetTheatres() {
 
		//UNLOGGED

		AirMissionView.Set(this.Interface.PrimeScape, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad);
		ChampionsView.Set(this.Screen, this.InfoBox, this.GraphicsTool);

		SeaTheatre.Set(this.Interface.PrimeScape, THEATRE.SEA, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.CalcPad, this.TextWriter);
		BeachheadTheatre.Set(this.Interface.PrimeScape, this.InfoBox, this.ControlPanel, this.GraphicsTool);
	}
};
