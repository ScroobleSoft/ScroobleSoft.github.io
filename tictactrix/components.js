
//-------------------------------------------
//---------- MAIN OBJECTS -------------------

var TacticalScape, TacticalGraphics, TacticalCalcPad, TacticalText, TacticalRandomizer, Controller;		//library
var Cities, TinyIslands, SmallIslands, MediumIslands, LargeIslands, HugeIslands, Islands, Map;				//map
var Clans, PlayerClan, Stacks;																									//core
var TacticalUtils, ScreenRect, InfoRect, TopLeftTile;																		//tools

//-----------------------------------
//---------- DATA -------------------

var TinyIslandClearTiles, SmallIslandClearTiles, MediumIslandClearTiles, LargeIslandClearTiles, HugeIslandClearTiles, IslandClearTiles;
var NeighbouringTiles, VisibleTiles;
var TinyCityOffsets, SmallCityOffsets, MediumCityOffsets, LargeCityOffsets, HugeCityOffsets, CityOffsets;

//---------------------------------------
//---------- CONTROLS -------------------

//Buttons
var RaisedCornerImages;

//-------------------------------------
//---------- IMAGES -------------------

var CityOctagonImages;

//--------------------------------------
//---------- SPRITES -------------------

var EastTrooperSprite, WestTrooperSprite, FeetSprite, RightArmSprite, LeftArmSprite;																	//trooper
var EastRifleSprite, WestRifleSprite, EastBazookaSprite, WestBazookaSprite, EastLauncherSprite, WestLauncherSprite;							//weapons
var EastJeepSprite, WestJeepSprite, EastRocketPodSprite, WestRocketPodSprite, EastMissileLauncherSprite, WestMissileLauncherSprite;		//light vehicles
var EastHowitzerSprite, WestHowitzerSprite, EastArtillerySprite, WestArtillerySprite, EastAVSprite, WestAVSprite;								//medium vehicles
var EastSwiftTankSprite, WestHybridTankSprite, EastMegaTankSprite, WestSwiftTankSprite, EastHybridTankSprite, WestMegaTankSprite;		//heavy vehicles - U
var TireSprite, SmallTreadSprite, MediumTreadSprite, LargeTreadSprite, SwiftTankSprite, HybridTrackSprite, MegaTankSprite;					//treads - U

//-------------------------------------
//---------- AGENTS -------------------

var Gunner, Bazooker, Missiler, Jeep, RocketPod, MissileLauncher, Howitzer, Artillery, AV, SwiftTank, HybridTank, MegaTank;	//army units
var Frigate, Cruiser, Destroyer, Battleship, Helicopter, Strafer, Fighter, Bomber;															//navy and air force units
var TacticalAgents;

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var IntroView, DocsConsoleView;
var ScreenMapView, PlayView, MapInfoView;
var TransferView, TeleportView, CombatView;

//--------------------------------------------------
//---------- Tactical COMPONENTS -------------------
var TacticalComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter, Ticker, Tabloid;
	var Randomizer;
	var Controller;
};
TacticalComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect, cntrllr) {
		this.Interface = intrfc;
		this.Screen = this.Interface.Screen;
		this.InfoBox = this.Interface.InfoBox;
		this.ControlPanel = this.Interface.ControlPanel;
		this.Ticker = this.Interface.TickerTape;
		this.Tabloid = this.Interface.Tabloid;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.Controller = cntrllr;

		this.SetData();

		this.CreateTools();
		this.CreateControls();
		this.CreateImages();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateSounds();
		this.CreateCoreObjects();
		this.CreateViews();

		this.SetTools();
		this.SetControls();
		this.SetImages();
		this.SetSprites();
		this.SetAgents();
		this.SetSounds();
		this.SetCoreObjects();
		this.SetViews();
	},
	SetData() {  //UNLOGGED

		this.SetTileData();
		this.SetOffsetData();
		this.SetAgentData();
	},
	CreateCoreObjects() {  //UNLOGGED

		Cities = new GenieArray();
		Map = new TacticalMap();
		Clans = new GenieArray();
		Stacks = new GenieList();
	},
	SetCoreObjects() {  //UNLOGGED

		Cities.Set(CITY.COUNT.TOTAL, TacticalCity, INDEXED);
		this.SetIslands();
		Map.Set(MAP, this.GraphicsTool, this.Randomizer, this.CalcPad);
		Clans.Set(CLAN.COUNT, TacticalClan, INDEXED);
		Stacks.Set(1000);
	},
	CreateTools() {  //UNLOGGED

		TacticalUtils = new TacticalUtilities();
		TopLeftTile = new GenieTile();
		ScreenRect = new GenieRect();
		InfoRect = new GenieRect();
	},
	SetTools() {  //UNLOGGED

		TacticalUtils.Set();
		TopLeftTile.Set(0, 0);
		ScreenRect.Set(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		InfoRect.Set(0, 0, INFoBOX.WIDTH*(SCREEN.WIDTH/MAP.W), INFoBOX.HEIGHT*(SCREEN.HEIGHT/MAP.H));
	},
	CreateControls() {

		//UNLOGGED

		//Buttons
		RaisedCornerImages = new GenieImage();
	},
	SetControls() {

		//UNLOGGED
		//Buttons
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
	},
	CreateImages() {  //UNLOGGED

		CityOctagonImages = new GenieImage();
	},
	SetImages() {  //UNLOGGED

		CityOctagonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], CITyOCTAGOnIMAGEs);
	},
	CreateSprites() {  //UNLOGGED

		this.CreateTrooperSprites();
		this.CreateWeaponSprites();
		this.CreateLightVehicleSprites();
		this.CreateMediumVehicleSprites();
	},
	SetSprites() {  //UNLOGGED

		this.SetTrooperSprites();
		this.SetWeaponSprites();
		this.SetLightVehicleSprites();
		this.SetMediumVehicleSprites();
	},
	CreateAgents() {  //UNLOGGED

		Gunner = new TacticalGunner();
		Bazooker = new TacticalBazooker();
		Missiler = new TacticalMissiler();
		Jeep = new TacticalJeep();
		RocketPod = new TacticalRocketPod();
		MissileLauncher = new TacticalMissileLauncher();
/*
		Howitzer = new TacticalHowitzer();
		Artillery = new TacticalArtillery();
		AV = new TacticalAV();
		SwiftTank = new TacticalSwiftTank();
		HybridTank = new TacticalHybridTank();
		MegaTank = new TacticalMegaTank();
		Frigate = new TacticalFrigate();
		Cruiser = new TacticalCruiser();
		Destroyer = new TacticalDestroyer();
		Battleship = new TacticalBattleship();
		Helicopter = new TacticalHelicopter();
		Strafer = new TacticalStrafer();
		Fighter = new TacticalFighter();
		Bomber = new TacticalBomber();
*/
	},
	SetAgents() {  //UNLOGGED
		var i;

		Gunner.Set(GUNNER, EastTrooperSprite);
		Bazooker.Set(BAZOOKER, EastTrooperSprite);
		Missiler.Set(MISSILER, EastTrooperSprite);
		Jeep.Set(JEEP, EastJeepSprite);
		RocketPod.Set(ROCKEtPOD, EastRocketPodSprite);
		MissileLauncher.Set(MISSILeLAUNCHER, EastMissileLauncherSprite);
/*
		Howitzer.Set(HOWITZER, EastHowitzerSprite);
		Artillery.Set(ARTILLERY, EastArtillerySprite);
		AV.Set(AV, EastAVSprite);
		SwiftTank.Set(SWIFtTANK, EastSwiftTankSprite);
		HybridTank.Set(HYBRIdTANK, EastHybridTankSprite);
		MegaTank.Set(MEGaTANK, EastMegaTankSprite);
		Frigate.Set(FRIGATE, EastFrigateSprite);
		Cruiser.Set(CRUISER, EastCruiserSprite);
		Destroyer.Set(DESTROYER, EastDestroyerSprite);
		Battleship.Set(BATTLESHIP, EastBattleshipSprite);
		Helicopter.Set(HELICOPTER, EastHelicopterSprite);
		Strafer.Set(STRAFER, EastStraferSprite);
		Fighter.Set(FIGHTER, EastFighterSprite);
		Bomber.Set(BOMBER, EastBomberSprite);
*/
		TacticalAgents = [ Gunner, Bazooker, Missiler, Jeep, RocketPod, MissileLauncher, Howitzer, Artillery, AV, SwiftTank, HybridTank, MegaTank,
								 Frigate, Cruiser, Destroyer, Battleship, Helicopter, Strafer, Fighter, Bomber
		];
//		for (i=0;i<TACTICAlUNIT.TYPES;++i)
		for (i=0;i<6;++i)
			TacticalAgents[i].ScreenRect = ScreenRect;
	},
	CreateFX() {
	},
	SetFX() {
	},
	CreateSounds() {
	},
	SetSounds() {
	},
	CreateViews() {  //UNLOGGED

		IntroView = new TacticalIntroView();
		DocsConsoleView = new TacticalDocsConsoleView();
		ScreenMapView = new TacticalScreenMapView();
		PlayView = new TacticalPlayView();
		MapInfoView = new TacticalMapInfoView();

		//Stack views
		TransferView = new UnitTransferView();
//		TeleportView = new UnitTeleportView();
//		CombatView = new StackCombatView();
	},
	SetViews() {  //UNLOGGED

		IntroView.SetLinks(null, this.TextWriter);
		IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
		DocsConsoleView.Set(this.Interface.Console, VIEW.INTRO.CONSOLE);
		IntroView.SetSubViews(null, DocsConsoleView);

		ScreenMapView.Set(this.Interface.PrimeScape, VIEW.MAP);
		PlayView.Set(this.Interface.PrimeScape, VIEW.PLAY);
		MapInfoView.Set(this.Interface.ZoomScape, VIEW.PLAY.INFO, PlayView);
		PlayView.SetSubViews(MapInfoView);

		//Stack views
		TransferView.Set(this.Interface.PrimeScape, VIEW.TRANSFER);
//		TeleportView.Set(this.Interface.PrimeScape, VIEW.TELEPORT);
//		CombatView.Set(this.Interface.PrimeScape, VIEW.COMBAT);
	}
};
