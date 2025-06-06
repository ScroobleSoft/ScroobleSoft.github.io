
TollTesting.prototype.SetVaultNavigation = function() {

   this.TileFlag = false;
   this.FLOOR = { LIGHT: 0, DARK: 1, OBSCURED: 2, PILLArMARKER: 4, SWITChMARKER: 8, PILLAR: 16, SWITCH: 32 };	//SWITChMARKER probably REDUNDANT
   this.SetBayonetter();
   this.SetFloorTiles();
   this.SetPillars();
   this.SetSwitches();
};
TollTesting.prototype.SetBayonetter = function() {

   this.Bayonetter = new VaultBayonetter();
   coords.X = this.Randomizer.GetIndex(VAULT.TILE.C);
   coords.Y = this.Randomizer.GetIndex(VAULT.TILE.R);
   this.Bayonetter.Set( { SPEED: 0.5, ANIMATION: { SEQUENCE: [0,1] } }, BayonetterSprite);
   this.Bayonetter.SetPosition(coords.X, coords.Y);		 				//position in tile coords
   this.Bayonetter.Direction = DIRECTION.E;
   this.Bayonetter.Clan = Clans[0];
};
TollTesting.prototype.SetFloorTiles = function() {
   this.TileGrid = Utilities.Create2DArray(VAULT.TILE.C, VAULT.TILE.R);
   for (coords.X=0;coords.X<VAULT.TILE.C;++coords.X) {
      for (coords.Y=0;coords.Y<VAULT.TILE.R;++coords.Y) {
	 if (this.TileFlag)
	    this.TileGrid[coords.X][coords.Y] = this.FLOOR.DARK;
	 this.TileFlag = !this.TileFlag;
	 if (!this.CheckStartingSpots(coords.X, coords.Y))
	    this.TileGrid[coords.X][coords.Y] |= 0; //this.FLOOR.OBSCURED;
      }
      this.TileFlag = !this.TileFlag;
   }
};
TollTesting.prototype.SetPillars = function() {
   var aTiles;

   aTiles = new Array(100);
   this.Randomizer.GetUnique(aTiles, 100, VAULT.TILE.COUNT, STARtAtZERO);
   for (indx=0;indx<100;++indx) {
      coords.X = aTiles[indx] % VAULT.TILE.C;
      coords.Y = Math.floor(aTiles[indx]/VAULT.TILE.C);
      this.TileGrid[coords.X][coords.Y] |= this.FLOOR.PILLArMARKER;
   }
};
TollTesting.prototype.SetSwitches = function() {
   for (indx=0;indx<50;++indx) {
      do {
	 coords.X = this.Randomizer.GetIndex(VAULT.TILE.C);
	 coords.Y = this.Randomizer.GetIndex(VAULT.TILE.R);
      } while (this.TileGrid[coords.X][coords.Y] & this.FLOOR.PILLArMARKER);
      this.TileGrid[coords.X][coords.Y] |= this.FLOOR.SWITChMARKER;
   }
};
TollTesting.prototype.CheckStartingSpots = function(x, y) {
   if (this.Bayonetter.Tile.X==x   && this.Bayonetter.Tile.Y==y)   return (true);	//C
   if (this.Bayonetter.Tile.X==x   && this.Bayonetter.Tile.Y==y+1) return (true);	//N
   if (this.Bayonetter.Tile.X==x-1 && this.Bayonetter.Tile.Y==y+1) return (true);	//NE
   if (this.Bayonetter.Tile.X==x-1 && this.Bayonetter.Tile.Y==y)   return (true);	//E
   if (this.Bayonetter.Tile.X==x-1 && this.Bayonetter.Tile.Y==y-1) return (true);	//SE
   if (this.Bayonetter.Tile.X==x   && this.Bayonetter.Tile.Y==y-1) return (true);	//S
   if (this.Bayonetter.Tile.X==x+1 && this.Bayonetter.Tile.Y==y-1) return (true);	//SW
   if (this.Bayonetter.Tile.X==x+1 && this.Bayonetter.Tile.Y==y)   return (true);	//W
   if (this.Bayonetter.Tile.X==x+1 && this.Bayonetter.Tile.Y==y+1) return (true);	//NW
   return (false);
};
TollTesting.prototype.PlayVaultNavigation = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayVaultNavigation.bind(this));

   this.DrawFloor();
   this.Bayonetter.Draw();
   this.Bayonetter.Update();

   if (Mouse.CheckLeftClicked())
      this.ProcessVaultClick();
};
TollTesting.prototype.DrawFloor = function() {
   for (coords.X=0;coords.X<VAULT.TILE.C;++coords.X)
      for (coords.Y=0;coords.Y<VAULT.TILE.R;++coords.Y)
	 if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.OBSCURED) {
	    this.Screen.fillStyle = "black";
	    this.Screen.fillRect(coords.X*VAULT.TILE.W, coords.Y*VAULT.TILE.H, VAULT.TILE.W, VAULT.TILE.H);
	 } else {
	    if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.DARK)
	       this.DrawTile(coords.X, coords.Y, false);
	    else
	       this.DrawTile(coords.X, coords.Y, true);
	    if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.PILLArMARKER)
	       PillarMarkerImage.Draw((coords.X*VAULT.TILE.W)+5, (coords.Y*VAULT.TILE.H)+6);
	    else if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.SWITChMARKER)
	       SwitchMarkerImage.Draw((coords.X*VAULT.TILE.W)+5, (coords.Y*VAULT.TILE.H)+6);
	    else if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.PILLAR) {
	    } else if (this.TileGrid[coords.X][coords.Y] & this.FLOOR.SWITCH) {
	    }
	 }
};
TollTesting.prototype.DrawTile = function(x, y, bLight) {
   x *= VAULT.TILE.W;
   y *= VAULT.TILE.H;
   this.Screen.fillStyle = "white";
   this.Screen.fillRect(x, y, VAULT.TILE.W-1, VAULT.TILE.H-1);
   this.Screen.fillStyle = GREY.DARK;
   this.Screen.fillRect(x+1, y+1, VAULT.TILE.W-1, VAULT.TILE.H-1);
   if (bLight)
      this.Screen.fillStyle = GREY.SILVER;
   else
      this.Screen.fillStyle = GREY.ASH;
   this.Screen.fillRect(x+1, y+1, VAULT.TILE.W-2, VAULT.TILE.H-2);
};
TollTesting.prototype.ProcessVaultClick = function() {
   coords.X = Math.floor(Mouse.ClickX/VAULT.TILE.W);
   coords.Y = Math.floor(Mouse.ClickY/VAULT.TILE.H);
   this.Bayonetter.SetDirection(coords.X, coords.Y);
};
