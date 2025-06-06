
//-------------------------------------------------
//---------- CORRIDOR INVADERS --------------------
var CorridorInvaders = function () {
   var Interface;
   var Screen;
   var InfoBox;
   var ControlPanel;
   var GraphicsTool;
   var TextWriter;
   var Randomizer;
   var Components;
   var AnimationFrameHandle;
   var Reset;

   var mrkr1, mrkr2;		//scratch variables
};
CorridorInvaders.prototype = {
   Set(interface, cPad, gTool, tWriter, rGenerator) {
      this.Interface = interface;
      this.Screen = this.Interface.PrimeScape.Context;
      this.InfoBox = this.Interface.ZoomScape.Context;
      this.ControlPanel = this.Interface.Console.Canvas;
      this.GraphicsTool = gTool;
      this.TextWriter = tWriter;
      this.CalcPad = cPad;
      this.Randomizer = rGenerator;
      this.ScreenRect = new GenieRect();
      this.Components = new TollComponents();
      this.Reset = false;

      //Scracth variables
      this.mrkr1 = new Coordinate2D();
      this.mrkr2 = new Coordinate2D();
   },
   CheckImagesLoaded() {

      this.AnimationFrameHandle = requestAnimationFrame(this.CheckImagesLoaded.bind(this));

      if (ImageManager.AllLoaded) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Components.Set(this.Interface, this.CalcPad, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
/*
	 this.CreateSpriteBuffers();
*/
	 this.Start();
	 Intro.Start();
      }
   },
   Start() {
      this.SetPresidios();
      this.SetClans();
      this.SetVaults();
/*
   Intro.Play();
*/
   },
   SetPresidios() {

      //Assign locations
      for (indx=0;indx<PRESIDIO.COUNT;++indx) {
	 do {
	    Presidios[indx].Location.X = this.Randomizer.GetInRange(1, MAP.TILE.C-3);
	    Presidios[indx].Location.Y = this.Randomizer.GetInRange(1, MAP.TILE.R-3);
	 } while (!this.CheckValidLocation(Presidios[indx].Location.X, Presidios[indx].Location.Y));
	 Map.Tiles[Presidios[indx].Location.X][Presidios[indx].Location.Y].Type = TILE.PRESIDIO;
	 Map.Tiles[Presidios[indx].Location.X+1][Presidios[indx].Location.Y].Type = TILE.PRESIDIO;
	 Map.Tiles[Presidios[indx].Location.X][Presidios[indx].Location.Y+1].Type = TILE.PRESIDIO;
	 Map.Tiles[Presidios[indx].Location.X+1][Presidios[indx].Location.Y+1].Type = TILE.PRESIDIO;
      }

      //Determine ports
      for (indx=0;indx<PRESIDIO.COUNT;++indx)
	 if (Presidios[indx].CheckPort(Map.Tiles))
	    Ports.push(Presidios[indx]);

      //Make sure the quantity is precisely correct
      if (Ports.length>PRESIDIO.PORTS)
	 for (indx=PRESIDIO.PORTS;indx<Ports.length;++indx)
	    Presidios[indx].SetWaterfront();
      else if (Ports.length<PRESIDIO.PORTS)
	 Map.CreatePorts(PRESIDIO.PORTS-Ports.length);
   },
   CheckValidLocation(x, y) {

      //First check if tile is solid land
      if (Map.Tiles[x][y].Type==TILE.CANAL || Map.Tiles[x+1][y].Type==TILE.CANAL || Map.Tiles[x][y+1].Type==TILE.CANAL || Map.Tiles[x+1][y+1].Type==TILE.CANAL)
	 return (false);

      //Check if location is far away enough from all current presidios
      for (indx2=0;indx2<indx;++indx2) {
	 if (Math.abs(x-Presidios[indx2].Location.X)<4 && Math.abs(y-Presidios[indx2].Location.Y)<4)
	    return (false);
      }

      return (true);
   },
   SetClans() {
      var aPresidios;

      aPresidios = new Array(CLAN.COUNT);
      this.Randomizer.GetUniqueIndices(aPresidios, CLAN.COUNT, PRESIDIO.COUNT);
      for (indx=0;indx<CLAN.COUNT;++indx) {
//	 Clans[indx].AssignPresidio(Presidios[aPresidios[indx]]);
	 Clans[indx].Presidios.push(Presidios[aPresidios[indx]]);
	 Presidios[aPresidios[indx]].Clan = Clans[indx];
      }
      coords.X = (PlayerClan.Presidios[0].Location.X-4)*MAP.TILE.W;
      coords.Y = (PlayerClan.Presidios[0].Location.Y-4)*MAP.TILE.H;
      if (coords.X<0)
	 coords.X = 0;
      if (coords.Y<0)
	 coords.Y = 0;
      this.ScreenRect.Set(coords.X, coords.Y, SCREEN.WIDTH, SCREEN.HEIGHT);
   },
   SetVaults() {

      //Assign locations
      for (indx=0;indx<VAULT.COUNT;++indx) {
	 do {
	    do {
	       coords.X = this.Randomizer.GetIndex(MAP.TILE.C);
	       coords.Y = this.Randomizer.GetIndex(MAP.TILE.R);
	    } while (!this.CheckSpotClear(coords.X, coords.Y));
	 } while (!this.SetMarkers(coords.X, coords.Y));
//	 Map.Tiles[coords.X][coords.Y].Location.Set(coords.X, coords.Y);
	 Map.Tiles[coords.X][coords.Y].Type = TILE.VAULT;
	 Vaults[indx].Markers.push(this.mrkr1, this.mrkr2);
      }
   },
   CheckSpotClear(x, y) {
      if (Map.Tiles[coords.X][coords.Y].Type==TILE.CANAL || Map.Tiles[coords.X][coords.Y].Type==TILE.PRESIDIO)
	 return (false);
      if (Map.Tiles[coords.X][coords.Y].Type==TILE.MARKER || Map.Tiles[coords.X][coords.Y].Type==TILE.MINEFIELD)
	 return (false);
      return (true);
   },
   SetMarkers(x, y) {
      var drctn;

      //UNLOGGED

      //First pick a direction
      drctn = this.Randomizer.GetInRange(0,3);	//NOTE: only 4 directions are needed because will only have horziontal/vertical/2 diagonals
      switch (drctn) {
	 case DIRECTION.N:
	    this.mrkr1.Set(x, y-3);
	    this.mrkr2.Set(x, y+3);
	    offst.X = 0;
	    offst.Y = -1;
	    break;
	 case DIRECTION.NE:
	    this.mrkr1.Set(x+2, y-2);
	    this.mrkr2.Set(x-2, y+2);
	    offst.X = 1;
	    offst.Y = -1;
	    break;
	 case DIRECTION.E:
	    this.mrkr1.Set(x+3, y);
	    this.mrkr2.Set(x-3, y);
	    offst.X = 1;
	    offst.Y = 0;
	    break;
	 case DIRECTION.SE:
	    this.mrkr1.Set(x+2, y+2);
	    this.mrkr2.Set(x-2, y-2);
	    offst.X = 1;
	    offst.Y = 1;
	    break;
      }

      //Set first marker
      do {
	 this.mrkr1.X += offst.X;
	 this.mrkr1.Y += offst.Y;
	 if (this.mrkr1.X<0 || this.mrkr1.X>=MAP.TILE.C || this.mrkr1.Y<0 || this.mrkr1.Y>=MAP.TILE.R)
	    return (false);
      } while (Map.Tiles[this.mrkr1.X][this.mrkr1.Y].Type);

      //Set second marker
      offst.X = -offst.X;
      offst.Y = -offst.Y;
      do {
	 this.mrkr2.X += offst.X;
	 this.mrkr2.Y += offst.Y;
	 if (this.mrkr2.X<0 || this.mrkr2.X>=MAP.TILE.C || this.mrkr2.Y<0 || this.mrkr2.Y>=MAP.TILE.R)
	    return (false);
      } while (Map.Tiles[this.mrkr2.X][this.mrkr2.Y].Type);

      Map.Tiles[this.mrkr1.X][this.mrkr1.Y].Type = TILE.MARKER;
      Map.Tiles[this.mrkr2.X][this.mrkr2.Y].Type = TILE.MARKER;
      return (true);
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      Map.Draw();
      Map.DrawInfoBox();
      ScreenManager.DrawScreenRect();
//      Map.DrawFullScreen();
      if (Mouse.CheckLeftClicked()) {
	 ScreenManager.UpdateScreenRect();
	 this.ScreenRect.L -= this.ScreenRect.L % MAP.TILE.W;	//trim so that tiles are properly aligned
	 this.ScreenRect.T -= this.ScreenRect.T % MAP.TILE.H;
	 //TODO: similarly adjust Info Box rect (actually, should derive new class from ScreenManager)
      }
/*
      //EXPERIMENT
      var specs = { COLOUR: "red", LOCATION: { X: 100, Y: 100 }, CANNON: [ { MAX: 400, MIN: 300 }, { MAX: 300, MIN: 200 }, { MAX: 200, MIN: 100 } ] };
      var b1 = Array.isArray(specs.COLOUR);
      var b2 = Array.isArray(specs.LOCATION);
      var b3 = Array.isArray(specs.CANNON);
      //SUCCESS!!!
*/
   }
};
