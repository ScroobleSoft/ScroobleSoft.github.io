/*
 *  possible for a ship to target a rival by clicking on list on match-up screen (as alternative to using main screen)
 *  Battleships and Cruisers has a fog of war, which could be a good use for helicopters
 *  actually, a better idea may be to use them for discerning contents of ship pods, so reconaissance, basically; pods will always
 *   be visible, however, in terms of whether they are gun placement or missile racks
 *  2 phases - helicopters sent for scouting/copter combat, then inter-ship combat
 *  helicopters may need 2 radar ranges for scouting foe copter ammo and ship ammo
 */
/*
 * DOMINION: completely overhauling chaff/flare dynamic, since now will be shooting them towards missile, the countermeasure operating as an
	infrared projectile on its own, a change that will allow one plane to protect another, and in fact for specialty planes to protect entire
	squadrons, and better yet leave scope for new weapon and unit types to be added in the future for such purposes; note that countermeasures
	are active, or extant, for much shorter ranges, so need to be fired when missile gets closer, perhaps when it is 1 to 1.5 screens away
*/
var NAVAlSHIP = { SUBMARINE: 0, TRANSPORT: 1, GUnBOAT: 2, MISSILeBOAT: 3, FRIGATE: 3, DESTROYER: 4, CRUISER: 5,
		  BATTLeSHIP: 6, CARRIER: 7, TYPES: 8 };  //TODO: REDUNDANT

var LARGeFRIGATeSPRITE = { L: 226, T: 67, W: 112, H: 32 };
var LARGeCRUISErSPRITE = { L: 226, T: 100, W: 136, H: 32 };
var LARGeDESTROYErSPRITE = { L: 226, T: 133, W: 160, H: 32 };
var LARGeBATTLESHIpSPRITE = { L: 226, T: 166, W: 184, H: 32 };

var SBMGaRMADA = { SIZE: 8 };

//-- SBMG Ship --
var SBMGShip = function() {
   var Type;
   var Position;
   var Arsenal;
};

//-- SBMG ARMADA --
var SBMGArmada = function() {
   var Frigates;
   var Destroyers;
   var Cruisers;
   var BattleShips;
/*
   var Ships;
   var ShipLists;
   var Group;
*/
};

//-----------------------------------------------------
//---------- SHIP BATTLE MINI GAME --------------------
var ShipBattleMiniGame = function() {
   var Screen;
   var InfoBox;
   var GraphicsTool, TextWriter, Randomizer;
//   var CalcPad;
   var Frames;

   var LargeFrigateSprite;
   var LargeCruiserSprite;
   var LargeDestroyerSprite;
   var LargeBattleshipSprite;

   var BlueArmada;
   var RedArmada;
/*
   var Chopper;

   var TargetingCircle;
   var TargetDistance;
   var InterceptionSpot;
*/
   var i, section, pane;

   /***** Orion game below *****/
   var SHELlSPRITE;
   var MISSILeSPRITE;
   var ShellSprite, MissileSprite;
   var LeftFlotilla;
   var RightFlotilla;
   var Shell, ShellFrames, ShellPhase;
   var Missile;

   var colour;
};
ShipBattleMiniGame.prototype = {
//   Set(cntxt, iBox, gTool, calc) {
   Set(cntxt, iBox, gTool, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
//      this.CalcPad = calc;
		this.Randomizer = rGenerator;
/*
      this.TargetingCircle = new OldGenieCircle();
      this.TargetingCircle.Set(3, "yellow", 0);
      this.TargetingCircle.SetLinks(this.GraphicsTool);
*/
      this.CreateComponents();
      this.SetComponents();
   },
   CreateComponents() {
/*
      this.LargeFrigateSprite = new CompositeSprite();
      this.LargeCruiserSprite = new CompositeSprite();
      this.LargeDestroyerSprite = new CompositeSprite();
      this.LargeBattleshipSprite = new CompositeSprite();
*/
      this.LargeFrigateSprite = new GenieSprite();
      this.LargeCruiserSprite = new GenieSprite();
      this.LargeDestroyerSprite = new GenieSprite();
      this.LargeBattleshipSprite = new GenieSprite();
//      this.BlueArmada = new SBMGArmada();
//      this.RedArmada = new SBMGArmada();
      this.BlueArmada = ArrayUtils.Create(SBMGaRMADA.SIZE, SBMGShip);
      this.RedArmada = ArrayUtils.Create(SBMGaRMADA.SIZE, SBMGShip);
//      this.Chopper = new ScreenHelicopter();
//      mgNBShellList = new GameList();
   },
   SetComponents() {
      this.LargeFrigateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeFRIGATeSPRITE, this.GraphicsTool);
      this.LargeCruiserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeCRUISErSPRITE, this.GraphicsTool);
      this.LargeDestroyerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeDESTROYErSPRITE, this.GraphicsTool);
      this.LargeBattleshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeBATTLESHIpSPRITE, this.GraphicsTool);

      this.SetArmada(this.BlueArmada);
      this.SetArmada(this.RedArmada);
/*
      this.GenerateArmadas();
      this.SetArmadas();
      this.Chopper.Set(0.5, { X: 150, Y: 300 }, null, DIRECTION.E, 0, NavalChopperSprite);
      this.Chopper.SetLinks(this.GraphicsTool);
      mgNBShellList.Set(1, VisualShell);
      mgNBShellList.Items[0].Set(1.0, null, null, null, 0, ShellSprite);
//      mgNBShellList.Items[0].Sprite = ShellSprite;
*/
   },
   SetArmada(armda) {
      var i, j;
      var type;

      for (i=0;i<SBMGaRMADA.SIZE;++i) {
	 type = this.Randomizer.GetIndex(5);
	 armda[i].Type = NAVAlSHIP.FRIGATE + type;
	 armda[i].Position = i;
	 armda[i].Arsenal = 0b00011;
	 for (j=0;j<type;++j)
	    armda[i].Arsenal += 2*(j+2);
      }
   },
   DrawShipsAndSea() {
      this.Screen.fillStyle = BLUE.SEA;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      for (this.i=0;this.i<SBMGaRMADA.SIZE;++this.i) {
	 if (this.i<3) {
	    this.DrawShip(((2*this.i)+1)*(SCREEN.WIDTH/6), 50, this.RedArmada[this.i].Type);
	    this.DrawShip(((2*this.i)+1)*(SCREEN.WIDTH/6), (SCREEN.HEIGHT/2)+50, this.BlueArmada[this.i].Type);
	 }
	 if (this.i==3 || this.i==4) {
	    this.DrawShip(((2*(this.i-3))+1)*(SCREEN.WIDTH/4), 150, this.RedArmada[this.i].Type);
	    this.DrawShip(((2*(this.i-3))+1)*(SCREEN.WIDTH/4), (SCREEN.HEIGHT/2)+150, this.BlueArmada[this.i].Type);
	 }
	 if (this.i>4) {
	    this.DrawShip(((2*(this.i-5))+1)*(SCREEN.WIDTH/6), 250, this.RedArmada[this.i].Type);
	    this.DrawShip(((2*(this.i-5))+1)*(SCREEN.WIDTH/6), (SCREEN.HEIGHT/2)+250, this.RedArmada[this.i].Type);
	 }
      }
   },
   DrawShip(x, y, type) {
      switch (type) {
	 case NAVAlSHIP.FRIGATE:
	    this.LargeFrigateSprite.Draw(x, y);
	    break;
	 case NAVAlSHIP.CRUISER:
	    this.LargeCruiserSprite.Draw(x, y);
	    break;
	 case NAVAlSHIP.DESTROYER:
	    this.LargeDestroyerSprite.Draw(x, y);
	    break;
	 case NAVAlSHIP.BATTLeSHIP:
	    this.LargeBattleshipSprite.Draw(x, y);
	    break;
      }
   },
   DrawPartitions() {
      for (this.section=0;this.section<SCREEN.HEIGHT;this.section+=300) {
	 for (this.pane=0;this.pane<SCREEN.WIDTH;this.pane+=300) {
	    this.GraphicsTool.DrawRectangle(this.pane, 0+this.section, 300, 100, "black", 2);
	    this.GraphicsTool.DrawRectangle(this.pane, 200+this.section, 300, 100, "black", 2);
	 }
	 for (this.pane=0;this.pane<SCREEN.WIDTH;this.pane+=450)
	    this.GraphicsTool.DrawRectangle(this.pane, 100+this.section, 450, 100, "black", 2);
      }
      this.GraphicsTool.DrawRectangle(0, (SCREEN.HEIGHT/2)-4, SCREEN.WIDTH, 8, "black", 0);
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      this.DrawShipsAndSea();
      this.DrawPartitions();

      if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.DrawControlBar();
	 this.SetOrionScape();
	 this.PlayOrionScape();
      }
   },
   SetOrionScape() {
      this.Frames = 0;

      this.LeftFlotilla = new Array(8);
      this.RightFlotilla = new Array(8);

      SHELlSPRITE = { W: 5, H: 4, GS: [ [ SHAPE.DIAMOND, "white", 0, [0,0,2] ],
					[ SHAPE.DIAMOND, "black", 1, [0,0,2] ]  ] };
      MISSILeSPRITE = { W: 5, H: 4, GS: [ [ SHAPE.IRREGULAR, "white", 0, [[0,0],[0,4],[5,2]] ],
					  [ SHAPE.IRREGULAR, "black", 1, [[0,0],[0,4],[5,2]] ]  ] };
      this.ShellSprite = new GeometricSprite();
      this.ShellSprite.Set(this.Screen, SHELlSPRITE, this.GraphicsTool);
      this.MissileSprite = new GeometricSprite();
      this.MissileSprite.Set(this.Screen, MISSILeSPRITE, this.GraphicsTool);

      this.Shell = new GenieAgent();
      this.Shell.Set(null, null, null, {SPEED: 1.0 }, this.ShellSprite);
      this.ShellFrames = 15;
      this.ShellPhase = true;
      this.Missile = new GenieAgent();
      this.Missile.Set(null, null, null, {SPEED: 1.0 }, this.MissileSprite);

//      ZoomButtons.Buttons.forEach(function(button){button.Display();});
      ZoomButtons.Display();
   },
   PlayOrionScape() {

      this.AnimationFrameHandle = requestAnimationFrame(this.PlayOrionScape.bind(this));

      this.DrawBackground();
      this.DrawShips();
      this.DrawShell();
      if (this.Missile.Extant) {
	 this.Missile.Draw();
	 this.Missile.Move();
      }
      SmallMissileBoatSprite.Draw(300, 300);

      if (Mouse.CheckLeftClicked()) {
	 this.Missile.SetPosition( { X: 0, Y: 450 } );
	 this.Missile.SetDestination( { X: Mouse.ClickX, Y: Mouse.ClickY } );
	 this.Missile.Extant = true;
	 ZoomButtons.Hide();
      }

      ++this.Frames;
   },
   GenerateArmadas() {
      //this is the key to this sub-game: various combos of single- and general-purpose ships being generated on the same
      // budget and being played against each other, keeping a scorecard (printed to main screen on conclusion) of the outcome
      // actually, this might mean different size armadas, beyond the 8
   },
   DrawControlBar() {

      //Draw sea
      this.Screen.fillStyle = BLUE.SEA;
      this.Screen.fillRect(0, 450, SCREEN.WIDTH, 150);

      this.GraphicsTool.DrawRectangle(0, 450, SCREEN.WIDTH, 150, "black", 3);

      //Left armada ship close-up and status
      this.GraphicsTool.DrawRectangle(200, 450, 130, 150, "black", 3);
      this.GraphicsTool.DrawRectangle(3, 577, 197, 20, "grey", 0);
      this.GraphicsTool.DrawRectangle(1, 575, 201, 25, "black", 2);
      this.TextWriter.Write("STATUS", 240, 470);
      this.TextWriter.Write("(weaponry,", 210, 490);
      this.TextWriter.Write("damage)", 210, 510);

      //Match-up window
//      this.GraphicsTool.DrawRectangle(330, 450, 240, 150, "black", 3);
      this.TextWriter.Write("match-up mini-screen", 340, 470);

      //Right armada ship close-up and status
//      this.GraphicsTool.DrawRectangle(700, 450, 200, 150, "black", 3);
      this.GraphicsTool.DrawRectangle(570, 450, 130, 150, "black", 3);
      this.GraphicsTool.DrawRectangle(700, 577, 197, 20, "grey", 0);
      this.GraphicsTool.DrawRectangle(698, 575, 201, 25, "black", 2);
      this.TextWriter.Write("STATUS", 610, 470);
      this.TextWriter.Write("(weaponry,", 580, 490);
      this.TextWriter.Write("damage)", 580, 510);
   },
   DrawBackground() {

      //Draw sea
      this.Screen.fillStyle = BLUE.SEA;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, 450);
   },
   DrawShips() {
      var i, j;

      //LOGGED

      for (i=1;i<=ARMADA.SHIPS;++i) { 
	 this.GraphicsTool.DrawRoundedRectangle(40+(this.Frames/10), 50*i, 51, 11, 2, "black", "grey", 0);
	 for (j=0;j<5;++j)
	    this.GraphicsTool.DrawCircle(48+(9*j)+(this.Frames/10), (50*i)+6, 4, "blue", 0);
	 this.GraphicsTool.DrawRoundedRectangle(820-(this.Frames/10), 50*i, 51, 11, 2, "black", "grey", 0);
	 for (j=0;j<5;++j)
	    this.GraphicsTool.DrawCircle(828+(9*j)-(this.Frames/10), (50*i)+6, 4, "yellow", 0);
      }

      this.LargeBattleshipSprite.Draw(10, 530);
      this.LargeFrigateSprite.Draw(740, 530);

      for (i=1;i<=ARMADA.SHIPS;++i) {
	 BattleShipSprite.Draw(332, 454+(17*i));
	 BattleShipSprite.Draw(475, 454+(17*i));
      }
   },
   DrawShell() {

      //UNLOGGED

      if (!this.ShellFrames) {
	 this.ShellFrames = 15;
	 this.ShellPhase = !this.ShellPhase;
	 if (this.ShellPhase)
	    this.colour = "white";
	 else
	    this.colour = "black";
      }
      this.GraphicsTool.DrawDiamond(this.Frames, this.Frames/2, 2, this.colour, 0);
      this.GraphicsTool.DrawDiamond(this.Frames, this.Frames/2, 2, "black", 1);
      --this.ShellFrames;
   }
};
