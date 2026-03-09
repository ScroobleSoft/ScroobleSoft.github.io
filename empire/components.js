
var Satrapies, PlayerSatrapy, Divisions, Battlefield;		//objects
var ScreenManager;					//tools
var UnitTerrainMapping;		//data
var LeftSoldierSprite, RightSoldierSprite, LeftRiderSprite, RightRiderSprite, LeftLegsSprite, RightLegsSprite, LeftRiderLegsSprite, RightRiderLegsSprite,
	 LeftBentArmSprite, RightBentArmSprite, LeftCockedArmSprite, RightCockedArmSprite, LeftStraightArmSprite, RightStraightArmSprite,
			LeftCrouchedArmSprite, RightCrouchedArmSprite,
	 LeftCrossbowSprite, RightCrossbowSprite, LeftLongbowSprite, RightLongbowSprite, LeftHorsebowSprite, RightHorsebowSprite, AxeSprite,
	 UpSwordSprite, DownSwordSprite, LeftPikeSprite, RightPikeSprite, LeftMaceSprite, RightMaceSprite, SpearSprite, LeftLanceHiltSprite, LeftLanceShaftSprite,
			RightLanceHiltSprite, RightLanceShaftSprite,
	 LeftCrestSprite, RightCrestSprite, LeftLeggingsSprite, RightLeggingsSprite, LeftBootsSprite, RightBootsSprite,
	 HillSprite, TreeSprite, PennantSprite, PennantsSprite, LetterSprite, DigitsSprite,
	 LeftHorseSprite, RightHorseSprite,
	 BattlefieldSprites;		//sprites
var IntroView, IntroInfoView, IntroConsoleView, DemoView, TutorialView, MiniGamesView, TestingView;				//standard views
var BattleView, BattleInfoView, BattleConsoleView,																					//battle views
	 RegimentClashView, RegimentClashInfoView, RegimentClashConsoleView, ClashSimView,									//clash views
	 BattalionSkirmishView, SquadMeleeView, SoldierCombatView;
var RaisedCornerImages, IconCornerImages, CheckBoxImages;		//controls
var Archer, Longbowman, HorseArcher, Axeman, Swordsman, Pikeman, Maceman, Cataphract, Knight, Immortal,
	 UnitTypes;		//agents

//-------------------------------------------------
//---------- EMPIRE COMPONENTS --------------------
var EmpireComponents = function() {
};
EmpireComponents.prototype = new GenieComponents();
EmpireComponents.prototype.Set = function() {
	GenieComponents.prototype.Set.call(this);

};
EmpireComponents.prototype.CreateObjects = function() {  //UNLOGGED

	Satrapies = new GenieArray();
	Satrapies.Set(SATRAPY.COUNT, ImperialSatrapy, INDEXED);
	PlayerSatrapy = Satrapies[0];
	Divisions = new GenieArray();
	Divisions.Set(ENGAGMENT.DIVISIONS.MAX, ImperialDivision);
	Battlefield = new ImperialBattleField();
	Battlefield.Set();
};
EmpireComponents.prototype.CreateTools = function() {  //UNLOGGED

	ScreenManager = new ImperialScreenManager();
	ScreenManager.Set(GameScape.Screen);
	TileUtils.SetDimensions(BATTLeFIELD.REGION.C, BATTLeFIELD.REGION.R);
};
EmpireComponents.prototype.SetData = function() {
	var w, h;

	UnitTerrainMapping = [ TERRAIN.LOwLAND.FOREST, TERRAIN.PLAIN.FOREST, TERRAIN.UpLAND.FOREST,
								  TERRAIN.LOwLAND.HILLS, TERRAIN.PLAIN.HILLS, TERRAIN.UpLAND.HILLS,
								  TERRAIN.LOwLAND.DESERT, TERRAIN.PLAIN.DESERT, TERRAIN.UpLAND.DESERT,
								  TERRAIN.STEPPE ];
};
EmpireComponents.prototype.CreateSprites = function() {

	this.CreateTerrainSprites();
	this.CreateSoldierSprites();
	this.CreateArmSprites();
	this.CreateArcherySprites();
	this.CreateInfantrySprites();
	this.CreateCavalrySprites();
	this.CreateColouringSprites();
	LeftHorseSprite = new AnimatedSprite();
	LeftHorseSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtHORSeSPRITE);
	RightHorseSprite = new AnimatedSprite();
	RightHorseSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtHORSeSPRITE);

	BattlefieldSprites = [ LeftSoldierSprite, RightSoldierSprite, LeftRiderSprite, RightRiderSprite, LeftLegsSprite, RightLegsSprite, LeftRiderLegsSprite, //6
								  RightRiderLegsSprite, LeftBentArmSprite, RightBentArmSprite, LeftCockedArmSprite, RightCockedArmSprite, LeftStraightArmSprite, //12
								  RightStraightArmSprite, LeftCrouchedArmSprite, RightCrouchedArmSprite, LeftCrossbowSprite, RightCrossbowSprite,						//17
								  LeftLongbowSprite, RightLongbowSprite, LeftHorsebowSprite, RightHorsebowSprite, AxeSprite, UpSwordSprite, DownSwordSprite,		//23
								  LeftPikeSprite, RightPikeSprite, LeftMaceSprite, RightMaceSprite, SpearSprite,																	//28
								  LeftLanceHiltSprite, LeftLanceShaftSprite, RightLanceHiltSprite, RightLanceShaftSprite,														//32
								  LeftCrestSprite, RightCrestSprite, LeftLeggingsSprite, RightLeggingsSprite, LeftBootsSprite, RightBootsSprite,						//38
								  LeftHorseSprite, RightHorseSprite, HillSprite, TreeSprite
	];
};
EmpireComponents.prototype.CreateAgents = function() {  //UNLOGGED

	//Units
	Archer = new ImperialArcher();
	Archer.Set(ARCHER, PennantSprite, IMPERIAlUNIT.ARCHER);
	Longbowman = new ImperialLongbowman();
	Longbowman.Set(LONGBOWMAN, PennantSprite, IMPERIAlUNIT.LONgBOwMAN);
	HorseArcher = new ImperialHorseArcher();
	HorseArcher.Set(HORSeARCHER, PennantSprite, IMPERIAlUNIT.HORSeARCHER);
	Axeman = new ImperialAxeman();
	Axeman.Set(AXEMAN, PennantSprite, IMPERIAlUNIT.AXeMAN);
	Swordsman = new ImperialSwordsman();
	Swordsman.Set(SWORDSMAN, PennantSprite, IMPERIAlUNIT.SWORDsMAN);
	Pikeman = new ImperialPikeman();
	Pikeman.Set(PIKEMAN, PennantSprite, IMPERIAlUNIT.PIKeMAN);
	Maceman = new ImperialMaceman();
	Maceman.Set(MACEMAN, PennantSprite, IMPERIAlUNIT.MACeMAN);
	Cataphract = new ImperialCataphract();
	Cataphract.Set(CATAPHRACT, PennantSprite, IMPERIAlUNIT.CATAPHRACT);
	Knight = new ImperialKnight();
	Knight.Set(KNIGHT, PennantSprite, IMPERIAlUNIT.KNIGHT);
	Immortal = new ImperialImmortal();
	Immortal.Set(IMMORTAL, PennantSprite, IMPERIAlUNIT.IMMORTAL);
							
	UnitTypes = [ Archer, Longbowman, HorseArcher, Axeman, Swordsman, Pikeman, Maceman, Cataphract, Knight, Immortal ];
};
EmpireComponents.prototype.CreateControls = function() {  //UNLOGGED

	//Images
	CheckBoxImages = new GenieImage();
	CheckBoxImages.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);
	IconCornerImages = new GenieImage();
	IconCornerImages.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ICOnCORNErIMAGEs);
	RaisedCornerImages = new GenieImage();
	RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
};
EmpireComponents.prototype.CreateViews = function() {  //UNLOGGED

	this.CreateIntroViews();
	this.CreateBattleViews();
	this.CreateClashViews();
	this.CreateSkirmishViews();
	this.CreateMeleeViews();
	this.CreateCombatViews();

	DemoView = new EmpireDemoView();
	DemoView.Set(GameScape.PrimeScape, VIEW.DEMO);
	TutorialView = new EmpireTutorialView();
	TutorialView.Set(GameScape.PrimeScape, VIEW.TUTORIAL);
	MiniGamesView = new EmpireMiniGamesView();
	MiniGamesView.Set(GameScape.PrimeScape, VIEW.MINiGAMES);
	TestingView = new EmpireTestingView();
	TestingView.Set(GameScape.PrimeScape, VIEW.TESTING);
};
