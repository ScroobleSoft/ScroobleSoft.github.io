
TollTesting.prototype.SetScoutingDemo = function() {
   this.SetTerrain();
   this.SetScout();
   this.UpdateDarkMap(4, 4);
};
TollTesting.prototype.SetTerrain = function() {

   this.TerrainTiles = Utilities.Create2DArray(10, 10, TollTile);
   for (coords.X=0;coords.X<10;++coords.X)
      for (coords.Y=0;coords.Y<10;++coords.Y) {
	 num = this.Randomizer.GetInRange(1,10);
	 if (num==10)
	    this.TerrainTiles[coords.X][coords.Y] = TILE.CANAL;
	 else if (num % 2)
	    this.TerrainTiles[coords.X][coords.Y] = TILE.PATH;		//not really - just a flag to draw green
	 else
	    this.TerrainTiles[coords.X][coords.Y] = TILE.EMPTY;
      }
   this.DarkMap = Utilities.Create2DArray(10, 10);
};
TollTesting.prototype.SetScout = function() {

   this.ScoutSprite = new StaticSprite();
   this.ScoutSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], { L: 1058, T: 8, W: 19, H: 28 });
   this.Scout = new GenieAgent();
   this.Scout.Set( { X: 260, Y: 285 }, this.ScoutSprite);
};
TollTesting.prototype.PlayScoutingDemo = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayScoutingDemo.bind(this));

   this.DrawTerrain();
   this.Scout.Draw();

   if (Mouse.CheckLeftClicked())
      this.ProcessMouseClick();
};
TollTesting.prototype.DrawTerrain = function() {

   for (coords.X=0;coords.X<10;++coords.X)
      for (coords.Y=0;coords.Y<10;++coords.Y)
	 if (this.DarkMap[coords.X][coords.Y])
	    switch (this.TerrainTiles[coords.X][coords.Y]) {
	       case TILE.EMPTY:
		  this.GraphicsTool.DrawRectangle(60*coords.X, 60*coords.Y, 60, 60, "brown", 0);
		  break;
	       case TILE.PATH:
		  this.GraphicsTool.DrawRectangle(60*coords.X, 60*coords.Y, 60, 60, "green", 0);
		  break;
	       case TILE.CANAL:
		  this.GraphicsTool.DrawRectangle(60*coords.X, 60*coords.Y, 60, 60, "blue", 0);
		  break;
	    }
	 else
	    this.GraphicsTool.DrawRectangle(60*coords.X, 60*coords.Y, 60, 60, "black", 0);
};
TollTesting.prototype.UpdateDarkMap = function(x, y) {

   this.DarkMap[x][y] = 1;
   if (y>0) this.DarkMap[x][y-1] = 1;			//N
   if (y>0 && x<9) this.DarkMap[x+1][y-1] = 1;		//NE
   if (x<9) this.DarkMap[x+1][y] = 1;			//E
   if (x<9 && y<9) this.DarkMap[x+1][y+1] = 1;		//SE
   if (y<9) this.DarkMap[x][y+1] = 1;			//S
   if (x>0 && y<9) this.DarkMap[x-1][y+1] = 1;		//SW
   if (x>0) this.DarkMap[x-1][y] = 1;			//W
   if (x>0 && y>0) this.DarkMap[x-1][y-1] = 1;		//NW
};
TollTesting.prototype.ProcessMouseClick = function() {

   //Get tile indices, update dark map
   coords.X = Math.floor(Mouse.ClickX/MAP.TILE.W);
   coords.Y = Math.floor(Mouse.ClickY/MAP.TILE.H);
   this.UpdateDarkMap(coords.X, coords.Y);

   //Update scout position
   this.Scout.Position.Set((MAP.TILE.W*coords.X)+15, (MAP.TILE.H*coords.Y)+45);
};
