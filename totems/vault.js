
//------------------------------------------
//---------- TOLL VAULT --------------------
var TollVault = function() {
   var Screen;
   var GraphicsTool;
   var Randomizer;
   var TileGrid;
   var Discovered;		//an 'OR'd field of clan indices indicating which ones have found it
   var Markers;
};
TollVault.prototype = {
   Set(cntxt, gTool, rGenerator) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
      this.Randomizer = rGenerator;
      this.Discovered = 0;
      this.Markers = new Array();
   },
   Generate() {
      var aTiles;
      var bTile;	//flag indicates light or dark

      //Tiles
      this.TileGrid = Utilities.Create2DArray(VAULT.TILE.C, VAULT.TILE.R);
      bTile = false;
      for (coords.X=0;coords.X<VAULT.TILE.C;++coords.X) {
	 for (coords.Y=0;coords.Y<VAULT.TILE.R;++coords.Y) {
	    if (bTile)
	       this.TileGrid[coords.X][coords.Y] = VAULT.TILE.DARK;
	    bTile = !bTile;
	    this.TileGrid[coords.X][coords.Y] |= VAULT.TILE.HIDDEN;
	 }
	 bTile = !bTile;
      }

      //Set pillars - fixed at 100, so 1 in 6 tiles
      aTiles = new Array(100);
      this.Randomizer.GetUnique(aTiles, VAULT.PILLARS, VAULT.TILE.COUNT, STARtAtZERO);
      for (indx=0;indx<100;++indx) {
	 coords.X = aTiles[indx] % VAULT.TILE.C;
	 coords.Y = Math.floor(aTiles[indx]/VAULT.TILE.C);
	 this.TileGrid[coords.X][coords.Y] |= VAULT.TILE.MARKER;
      }

      //Set switches - fixed at 50, so 1 in 12 tiles
      for (indx=0;indx<50;++indx) {
	 do {
	    coords.X = this.Randomizer.GetIndex(VAULT.TILE.C);
	    coords.Y = this.Randomizer.GetIndex(VAULT.TILE.R);
	 } while (this.TileGrid[coords.X][coords.Y] & VAULT.TILE.MARKER);
	 this.TileGrid[coords.X][coords.Y] |= VAULT.TILE.SWITChOFF;
      }
   },
   SetStartSpot(cSpot) {
      var x, y;

      //Loop till a spot is found without neighbouring pillars
      do {
	 x = this.Randomizer.GetIndex(VAULT.TILE.C);
	 y = this.Randomizer.GetIndex(VAULT.TILE.R);
      } while (this.CheckSpotClear(x, y));

   },
   CheckSpotClear(x, y) {
      if (this.TileGrid[x][y] & (VAULT.TILE.MARKER | VAULT.TILE.SWITChOFF)) return (false); 	//C
      if (this.TileGrid[x][y-1]   & VAULT.TILE.MARKER) return (false);		//N
      if (this.TileGrid[x+1][y-1] & VAULT.TILE.MARKER) return (false);		//NE
      if (this.TileGrid[x+1][y]   & VAULT.TILE.MARKER) return (false);		//E
      if (this.TileGrid[x+1][y+1] & VAULT.TILE.MARKER) return (false);		//SE
      if (this.TileGrid[x][y+1]   & VAULT.TILE.MARKER) return (false);		//S
      if (this.TileGrid[x-1][y+1] & VAULT.TILE.MARKER) return (false);		//SW
      if (this.TileGrid[x-1][y]   & VAULT.TILE.MARKER) return (false);		//W
      if (this.TileGrid[x-1][y-1] & VAULT.TILE.MARKER) return (false);		//NW
      return (true);
   },
   Draw() {
      for (coords.X=0;coords.X<VAULT.TILE.C;++coords.X)
	 for (coords.Y=0;coords.Y<VAULT.TILE.R;++coords.Y)
	    if (this.TileGrid[coords.X][coords.Y] & VAULT.TILE.HIDDEN) {
	       this.Screen.fillStyle = "black";
	       this.Screen.fillRect(coords.X*VAULT.TILE.W, coords.Y*VAULT.TILE.H, VAULT.TILE.W, VAULT.TILE.H);
	    } else {
	       if (this.TileGrid[coords.X][coords.Y] & VAULT.TILE.DARK)
		  this.DrawTile(coords.X, coords.Y, false);
	       else
		  this.DrawTile(coords.X, coords.Y, true);
	       if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.MARKER)
		  PillarMarkerImage.Draw((coords.X*VAULT.TILE.W)+5, (coords.Y*VAULT.TILE.H)+6);
	       else if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.SWITChON)
	          SwitchMarkerImage.Draw((coords.X*VAULT.TILE.W)+5, (coords.Y*VAULT.TILE.H)+6);
	 }
   },
   DrawTile (x, y, bLight) {
      x *= VAULT.TILE.W;
      y *= VAULT.TILE.H;
      this.Screen.fillStyle = "white";
      this.Screen.fillRect(x, y, VAULT.TILE.W-1, VAULT.TILE.H-1);
      this.Screen.fillStyle = GREY.DARK;
      this.Screen.fillRect(x+1, y+1, VAULT.TILE.W-1, VAULT.TILE.H-1);
      if (bLight)
	 this.Screen.fillStyle = VAULT.TILE.COLOUR1;
      else
	 this.Screen.fillStyle = VAULT.TILE.COLOUR2;
      this.Screen.fillRect(x+1, y+1, VAULT.TILE.W-2, VAULT.TILE.H-2);
   }
};
