
//----------------------------------------------
//---------- LIBRARY OBJECTS -------------------

var TollScape;
var TollGraphics;
var TollCalcPad;
var TollText;
var TollRandomizer;
var Controller;

//-------------------------------------------
//---------- CORE OBJECTS -------------------

var Presidios, Ports;
var Vaults;
var Paths;
var Map;
var Clans, PlayerClan;
var BattleField;
var Battle;

//-------------------------------------------
//---------- CORE OBJECTS -------------------

var Intro;

//------------------------------------
//---------- TOOLS -------------------

var Testing;
var Colourizer;
var ScreenManager;

//scratch variables
var indx, indx2, coords, num, offst, rect;

//-----------------------------------
//---------- DATA -------------------

var MedianColours;
var PresidioInnerPentagon, PresidioOuterPentagon;
var SpriteOffsets;		//used for drawing in tiles on battlefield

//-------------------------------------
//---------- IMAGES -------------------

var TestingImage;

var PillarTopImage;
var PillarBaseImage;
var PillarMarkerImage;
var SwitchMarkerImage;

//--------------------------------------
//---------- SPRITES -------------------

//Troops
var ScoutSprite;
var GunnerSprite;
var BazookerSprite;
var BayonetterSprite;
var HorizontalBayonetteSprite;
var VerticalBayonetteSprite;
var DiagonalBayonetteSprite;
var CommandantSprite;

//Vehicles
var JeepSprite;
var LightTankSprite;
var MediumTankSprite;
var HeavyTankSprite;
var AVSprite;
var HowitzerSprite;
var RocketLauncherSprite;
var AAGunSprite;
var MissileLauncherSprite;

//Vessels
var SubmarineSprite;
var FrigateSprite;
var CruiserSprite;
var BattleshipSprite;

//Aircraft
var FighterSprite;
var BomberSprite;
var CopterSprite;
var InterceptorSprite;

//Projectiles
var BulletSprite;
var MissileSprite;

var UnitSprites;

//--------------------------------------
//---------- AGENTS -------------------

//Land
var LeftGunners, RightGunners;
var LeftBazookers, RightBazookers;
var LeftJeeps, RightJeeps;
var LeftLightTanks, RightLightTanks;
var LeftMediumTanks, RightMediumTanks;
var LeftHeavyTanks, RightHeavyTanks;
var LeftAVs, RightAVs;
var LeftHowitzers, RightHowitzers;
var LeftRocketLaunchers, RightRocketLaunchers;
var LeftAAGuns, RightAAGuns;

//---------------------------------
//---------- FX -------------------

//Sprites
var NoEntrySprite;
var SparkSprite;
var ExplosionSprite;

//----------------------------------------------
//---------- TOLL COMPONENTS -------------------
var TollComponents = function() {
   var Interface;
   var Screen;
   var InfoBox;
   var ControlPanel;
   var GraphicsTool;
   var CalcPad;
   var TextWriter;
   var Randomizer;
   var ScreenRect;
};
TollComponents.prototype = {
   Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect) {
      this.Interface = intrfc;
      this.Screen = this.Interface.PrimeScape.Context;
      this.InfoBox = this.Interface.ZoomScape.Context;
      this.ControlPanel = this.Interface.Console;
      this.GraphicsTool = gTool;
      this.CalcPad = cPad;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;

      this.CreateCoreObjects();
      this.CreateSimObjects();
      this.CreateTools();
      this.CreateControls();
      this.CreateImages();
      this.CreateViews();
      this.CreateSprites();
      this.CreateAgents();
      this.CreateFX();

      this.SetCoreObjects();
      this.SetSimObjects();
      this.SetTools();
      this.SetControls();
      this.SetImages();
      this.SetViews();
      this.SetSprites();
      this.SetAgents();
      this.SetFX();

      this.SetData();
   },
   CreateCoreObjects() {

      //UNLOGGED

      Map = new TollMap();
      Presidios = new GenieArray();
      Ports = new Array();
      Vaults = new GenieArray();
      Clans = new GenieArray();
      BattleField = new TollBattlefield();
      Battle = new TollBattle();
   },
   SetCoreObjects() {

      //UNLOGGED

      Map.Set(this.Screen, this.InfoBox, this.GraphicsTool, this.Randomizer, this.ScreenRect);
      Map.Generate();
      Presidios.Set(PRESIDIO.COUNT, TollPresidio, INDEXED, this.GraphicsTool, this.ScreenRect);
      Vaults.Set(VAULT.COUNT, TollVault, INDEXED, this.Screen, this.GraphicsTool, this.Randomizer);
      Clans.Set(CLAN.COUNT, TollClan, INDEXED);
      PlayerClan = Clans[0];
      BattleField.Set(this.Screen, this.GraphicsTool);
      Battle.Set(this.Randomizer);
   },
   CreateSimObjects() {

      //UNLOGGED

      Intro = new TollIntro();
   },
   SetSimObjects() {

      //UNLOGGED

      Intro.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
   },
   CreateTools() {

      Testing = new TollTesting();
      Colourizer = new GenieColourizer();
      ScreenManager = new GenieScreenManager();

      //Scratch variables
      coords = new Coordinate2D();
      offst = new Coordinate2D();
      rect = new GenieRect();
   },
   SetTools() {

      Testing.Set(this.Screen, this.InfoBox, this.GraphicsTool, this.CalcPad, this.TextWriter, this.Randomizer);
      Colourizer.Set();
      ScreenManager.Set(this.InfoBox, this.ScreenRect, this.GraphicsTool, 100, true);
   },
   CreateControls() {
   },
   SetControls() {
   },
   CreateImages() {

      //UNLOGGED

      TestingImage = new GenieImageMap();

      PillarTopImage = new GenieImage();
      PillarBaseImage = new GenieImage();
      PillarMarkerImage = new GenieImage();
      SwitchMarkerImage = new GenieImage();
   },
   SetImages() {

      //UNLOGGED

      TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);

      PillarTopImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PILLArTOpIMAGE);
      PillarBaseImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PILLArBASeIMAGE);
      PillarMarkerImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES],PILLArMARKErIMAGE);
      SwitchMarkerImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SWITChMARKErIMAGE);
   },
   CreateViews() {
   },
   SetViews() {
   },
   CreateSprites() {

      //Troops
      ScoutSprite = new AnimatedSprite();
      GunnerSprite = new AnimatedSprite();
      BazookerSprite = new AnimatedSprite();
      BayonetterSprite = new AnimatedSprite();
      HorizontalBayonetteSprite = new StaticSprite();
      VerticalBayonetteSprite = new StaticSprite();
      DiagonalBayonetteSprite = new AnimatedSprite();
      CommandantSprite = new AnimatedSprite();

      //Vehicles
      JeepSprite = new AnimatedSprite();
      LightTankSprite = new AnimatedSprite();
      MediumTankSprite = new AnimatedSprite();
      HeavyTankSprite = new AnimatedSprite();
      AVSprite = new AnimatedSprite();
      HowitzerSprite = new AnimatedSprite();
      RocketLauncherSprite = new AnimatedSprite();
      AAGunSprite = new AnimatedSprite();
      MissileLauncherSprite = new AnimatedSprite();

      //Vessels
      SubmarineSprite = new AnimatedSprite();
      FrigateSprite = new AnimatedSprite();
      CruiserSprite = new AnimatedSprite();
      BattleshipSprite = new AnimatedSprite();

      //Aircraft
      FighterSprite = new AnimatedSprite();
      BomberSprite = new AnimatedSprite();
      CopterSprite = new AnimatedSprite();
      InterceptorSprite = new AnimatedSprite();

      //Projectiles
      BulletSprite = new AnimatedSprite();
      MissileSprite = new AnimatedSprite();
   },
   SetSprites() {

      //Troops
      ScoutSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SCOUtSPRITE);
      GunnerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GUNNErSPRITE);
      BazookerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BAZOOKErSPRITE);
      BayonetterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BAYONETTErSPRITE);
      HorizontalBayonetteSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HORIZONTAlBAYONETTeSPRITE);
      VerticalBayonetteSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], VERTICAlBAYONETTeSPRITE);
      DiagonalBayonetteSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DIAGONAlBAYONETTeSPRITE);
      CommandantSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], COMMANDANtSPRITE);

      //Vehicles
      JeepSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], JEEpSPRITE);
      HowitzerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HOWITZErSPRITE);
      AVSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], AVsPRITE);
      RocketLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ROCKEtLAUNCHErSPRITE);
      LightTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LIGHtTANkSPRITE);
      MediumTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MEDIUmTANkSPRITE);
      HeavyTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HEAVyTANkSPRITE);
      AAGunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], AAgUnSPRITE);
      MissileLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILeLAUNCHErSPRITE);
      MissileSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILeSPRITE);

      //Vessels
      SubmarineSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SUBMARINeSPRITE);
      FrigateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FRIGATeSPRITE);
      CruiserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CRUISErSPRITE);
      BattleshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BATTLESHIpSPRITE);

      //Aircraft
      FighterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FIGHTErSPRITE);
      BomberSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BOMBErSPRITE);
      CopterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], COPTErSPRITE);
      InterceptorSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], INTERCEPTOrSPRITE);

      //Projectiles
      BulletSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BULLEtSPRITE);
      MissileSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILeSPRITE);

      UnitSprites = [ ScoutSprite, GunnerSprite, BazookerSprite, BayonetterSprite,
		      HowitzerSprite, AVSprite, RocketLauncherSprite, LightTankSprite, MediumTankSprite, HeavyTankSprite, AAGunSprite, MissileLauncherSprite,
		      SubmarineSprite, FrigateSprite, CruiserSprite, BattleshipSprite,
		      FighterSprite, BomberSprite, CopterSprite, InterceptorSprite ];
   },
   CreateAgents() {

      //UNLOGGED

      LeftGunners = new AgentArray();
      RightGunners = new AgentArray();
   },
   SetAgents() {

      //UNLOGGED

      //Gunners
      LeftGunners.Set(STACK.MAX, TollGunner, INDEXED, GUNNER, GunnerSprite, DIRECTION.E);
      RightGunners.Set(STACK.MAX, TollGunner, INDEXED, GUNNER, GunnerSprite, DIRECTION.W);
      LeftGunners.SetLinks(this.GraphicsTool);
      RightGunners.SetLinks(this.GraphicsTool);
/*
      for (indx=0;indx<STACK.MAX;++indx) {
	 LeftGunners[indx].SetExtraLinks(Map.Tiles);
	 RightGunners[indx].SetExtraLinks(Map.Tiles);
	 LeftGunners[indx].Foes = RightGunners;
	 RightGunners[indx].Foes = LeftGunners;
      }
*/
   },
   CreateFX() {

      //UNLOGGED

      //Sprites
      NoEntrySprite = new StaticSprite();
      SparkSprite = new AnimatedSprite();
      ExplosionSprite = new StaticSprite();
   },
   SetFX() {

      //UNLOGGED

      //Sprites
      NoEntrySprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeSPRITES], NoENTRySPRITE);
      SparkSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeSPRITES], GENIeSPARkSPRITE);
      ExplosionSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EXPLOSIOnSPRITE);
   },
   SetData() {

      //Presidio dimensions
      PresidioInnerPentagon = this.CalcPad.GetPolygonVertices(5, 90);
      PresidioOuterPentagon = this.CalcPad.GetPolygonVertices(5, 100);
      PresidioInnerPentagon.forEach(function(vrtx){vrtx.Y=-vrtx.Y;});
      PresidioOuterPentagon.forEach(function(vrtx){vrtx.Y=-vrtx.Y;});

      //Presidio colours
      MedianColours = new Array(CLAN.COUNT);
      for (indx=0;indx<=CLAN.COUNT;++indx)
	 MedianColours[indx] = Colourizer.GetMedianColour(ClanColours[indx][0], ClanColours[indx][1]);

      //Calculate sprite offsets for battlefield display
      SpriteOffsets = new Array(UNIT.COUNT);
      for (indx=0;indx<UNIT.COUNT;++indx)
	 SpriteOffsets[indx] = Math.round((BATTLeFIELD.TILE.W-UnitSprites[indx].Specs.W)/2);
   }
};
