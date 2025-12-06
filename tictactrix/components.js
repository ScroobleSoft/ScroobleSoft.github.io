
//-------------------------------------------
//---------- MAIN OBJECTS -------------------

var TacticalScape, TacticalGraphics, TacticalCalcPad, TacticalText, TacticalRandomizer, Controller;				//library
var TinyIslands, SmallIslands, MediumIslands, LargeIslands, HugeIslands, CapitalIslands, Islands;					//islands
var Cities, Platforms, Map;																												//geography
var Clans, PlayerClan, Stacks, AI;																										//core
var TacticalUtils, ScreenRect, InfoRect, TopLeftTile;																				//tools

//-----------------------------------
//---------- DATA -------------------

var TinyIslandClearTiles, SmallIslandClearTiles, MediumIslandClearTiles, LargeIslandClearTiles, HugeIslandClearTiles, IslandClearTiles,
																																								CapitalIslandClearTiles;
var NeighbouringTiles, VisibleTiles;
var TinyCityOffsets, SmallCityOffsets, MediumCityOffsets, LargeCityOffsets, HugeCityOffsets, CityOffsets;

//---------------------------------------
//---------- CONTROLS -------------------

//Buttons
var RaisedCornerImages, CheckBoxImages;

//-------------------------------------
//---------- IMAGES -------------------

var CityOctagonImages, PlatformImages;
var NoEntryImage;

//--------------------------------------
//---------- SPRITES -------------------

var EastTrooperSprite, WestTrooperSprite, FeetSprite, RightArmSprite, LeftArmSprite;																	//trooper
var EastRifleSprite, WestRifleSprite, EastBazookaSprite, WestBazookaSprite, EastLauncherSprite, WestLauncherSprite;							//weapons
var EastJeepSprite, WestJeepSprite, EastRocketPodSprite, WestRocketPodSprite, EastMissileLauncherSprite, WestMissileLauncherSprite;		//light vehicles
var EastHowitzerSprite, WestHowitzerSprite, EastArtillerySprite, WestArtillerySprite, EastAVSprite, WestAVSprite;								//medium vehicles
var EastSwiftTankSprite, WestHybridTankSprite, EastMegaTankSprite, WestSwiftTankSprite, EastHybridTankSprite, WestMegaTankSprite;		//heavy vehicles
var TireSprite, SmallTreadSprite, MediumTreadSprite, LargeTreadSprite, SwiftTrackSprite, HybridTrackSprite, MegaTrackSprite;				//undercarriage
var EastFrigateSprite, WestFrigateSprite, EastCruiserSprite, WestCruiserSprite, EastDestroyerSprite, WestDestroyerSprite,
																											EastBattleshipSprite, WestBattleshipSprite;				//ships
var EastFighterSprite, WestFighterSprite, EastBomberSprite, WestBomberSprite, EastStraferSprite, WestStraferSprite,
																										EastHelicopterSprite, WestHelicopterSprite;					//jets - UNLOGGED
var BulletSprite, ShellSprite, EastMissileHeadSprite, WestMissileHeadSprite;																				//trooper ammo - U
var EastAAMSprite, WestAAMSprite, EastBombSprite, WestBombSprite, EastMissileSprite, WestMissileSprite, MineSprite;							//large ammo - U

//-------------------------------------
//---------- AGENTS -------------------

var Gunner, Bazooker, Missiler, Jeep, RocketPod, MissileLauncher, Howitzer, Artillery, ArmouredVehicle, SwiftTank, HybridTank, MegaTank;	//army units
var Frigate, Cruiser, Destroyer, Battleship, Helicopter, Strafer, Fighter, Bomber;															//navy and air force units
var TacticalUnits;

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var IntroView, OptionsView, DocsConsoleView;
var ScreenMapView, PlayView, MapInfoView, CityConsoleView;
var TransferView, TeleportView, CombatView;		//stacks

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

		Cities = new Array(CITY.COUNT.TOTAL);
		Platforms = new GenieArray();
		Map = new TacticalMap();
		Clans = new GenieArray();
		Stacks = new GenieList();
		AI = new TacticalAI();
	},
	SetCoreObjects() {  //UNLOGGED

		Platforms.Set(PLATFORM.COUNT, TacticalPlatform, INDEXED);
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

		RaisedCornerImages = new GenieImage();
		CheckBoxImages = new GenieImage();
	},
	SetControls() {

		//UNLOGGED

		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
		CheckBoxImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);
	},
	CreateImages() {  //UNLOGGED

		CityOctagonImages = new GenieImage();
		PlatformImages = new GenieImage();
		NoEntryImage = new GenieImage();
	},
	SetImages() {  //UNLOGGED

		CityOctagonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], CITyOCTAGOnIMAGEs);
		PlatformImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PLATFORmIMAGEs);
		NoEntryImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], NoENTRyIMAGE);
	},
	CreateSprites() {  //UNLOGGED

		this.CreateTrooperSprites();
		this.CreateWeaponSprites();
		this.CreateLightVehicleSprites();
		this.CreateMediumVehicleSprites();
		this.CreateHeavyVehicleSprites();
		this.CreateUndercarriageSprites();
		this.CreateShipSprites();
		this.CreateJetSprites();
		this.CreateMiniAmmoSprites();
		this.CreateLargeAmmoSprites();
	},
	SetSprites() {  //UNLOGGED

		this.SetTrooperSprites();
		this.SetWeaponSprites();
		this.SetLightVehicleSprites();
		this.SetMediumVehicleSprites();
		this.SetHeavyVehicleSprites();
		this.SetUndercarriageSprites();
		this.SetShipSprites();
		this.SetJetSprites();
		this.SetMiniAmmoSprites();
		this.SetLargeAmmoSprites();
	},
	CreateAgents() {  //UNLOGGED

		Gunner = new TacticalGunner();
		Bazooker = new TacticalBazooker();
		Missiler = new TacticalMissiler();
		Jeep = new TacticalJeep();
		RocketPod = new TacticalRocketPod();
		MissileLauncher = new TacticalMissileLauncher();
		Howitzer = new TacticalHowitzer();
		Artillery = new TacticalArtillery();
		ArmouredVehicle = new TacticalAV();
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
	},
	SetAgents() {  //UNLOGGED
		var i;

		Gunner.Set(GUNNER, EastTrooperSprite, WestTrooperSprite);
		Bazooker.Set(BAZOOKER, EastTrooperSprite, WestTrooperSprite);
		Missiler.Set(MISSILER, EastTrooperSprite, WestTrooperSprite);
		Jeep.Set(JEEP, EastJeepSprite, WestJeepSprite);
		RocketPod.Set(ROCKEtPOD, EastRocketPodSprite, WestRocketPodSprite);
		MissileLauncher.Set(MISSILeLAUNCHER, EastMissileLauncherSprite, WestMissileLauncherSprite);
		Howitzer.Set(HOWITZER, EastHowitzerSprite, WestHowitzerSprite);
		Artillery.Set(ARTILLERY, EastArtillerySprite, WestArtillerySprite);
		ArmouredVehicle.Set(AV, EastAVSprite, WestAVSprite);
		SwiftTank.Set(SWIFtTANK, EastSwiftTankSprite, WestSwiftTankSprite);
		HybridTank.Set(HYBRIdTANK, EastHybridTankSprite, WestHybridTankSprite);
		MegaTank.Set(MEGaTANK, EastMegaTankSprite, WestMegaTankSprite);
		Frigate.Set(FRIGATE, EastFrigateSprite, WestFrigateSprite);
		Cruiser.Set(CRUISER, EastCruiserSprite, WestCruiserSprite);
		Destroyer.Set(DESTROYER, EastDestroyerSprite, WestDestroyerSprite);
		Battleship.Set(BATTLESHIP, EastBattleshipSprite, WestBattleshipSprite);
		Helicopter.Set(HELICOPTER, EastHelicopterSprite, WestHelicopterSprite);
		Strafer.Set(STRAFER, EastStraferSprite, WestStraferSprite);
		Fighter.Set(FIGHTER, EastFighterSprite, WestFighterSprite);
		Bomber.Set(BOMBER, EastBomberSprite, WestBomberSprite);

		TacticalUnits = [ Gunner, Bazooker, Missiler, Jeep, RocketPod, MissileLauncher, Howitzer, Artillery, ArmouredVehicle,
								 SwiftTank, HybridTank, MegaTank, Frigate, Cruiser, Destroyer, Battleship, Helicopter, Strafer, Fighter, Bomber
		];
		for (i=0;i<TACTICAlUNIT.TYPES;++i)
			TacticalUnits[i].ScreenRect = ScreenRect;
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
		OptionsView = new GameOptionsView();
		DocsConsoleView = new TacticalDocsConsoleView();
		ScreenMapView = new TacticalScreenMapView();
		PlayView = new TacticalPlayView();
		MapInfoView = new TacticalMapInfoView();
		CityConsoleView = new TacticalCityConsoleView();

		//Stack views
		TransferView = new UnitTransferView();
		TeleportView = new UnitTeleportView();
		CombatView = new TacticalCombatView();
	},
	SetViews() {  //UNLOGGED

		IntroView.SetLinks(null, this.TextWriter);
		OptionsView.Set(this.Interface.PrimeScape, VIEW.OPTIONS);
		IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
		DocsConsoleView.Set(this.Interface.Console, VIEW.INTRO.CONSOLE);
		IntroView.SetSubViews(null, DocsConsoleView);

		ScreenMapView.Set(this.Interface.PrimeScape, VIEW.MAP);
		PlayView.Set(this.Interface.PrimeScape, VIEW.PLAY);
		MapInfoView.Set(this.Interface.ZoomScape, VIEW.PLAY.INFO, PlayView);
		PlayView.SetSubViews(MapInfoView);
		CityConsoleView.Set(this.Interface.ControlPanel, VIEW.CITY, PlayView);

		//Stack views
		TransferView.Set(this.Interface.PrimeScape, VIEW.TRANSFER);
		TeleportView.Set(this.Interface.PrimeScape, VIEW.TELEPORT);
		CombatView.Set(this.Interface.PrimeScape, VIEW.COMBAT);
	}
};
