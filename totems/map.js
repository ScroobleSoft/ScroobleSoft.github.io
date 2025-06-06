
//----------------------------------------
//---------- TOLL MAP --------------------
var TollMap = function() {
   var Screen;
   var InfoBox;
   var GraphicsTool;
   var Randomizer;
   var ScreenRect;
   var Tiles;
   var DarkMap;
   var Scale;

   var x, y, lngth;	//scratch variables
};
TollMap.prototype = {
   Set(cntxt, iBox, gTool, rGenerator, sRect) {
      this.Screen = cntxt;
      this.InfoBox = iBox;
      this.GraphicsTool = gTool;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
/*
      this.Tiles = new GenieArray();
      this.Tiles.Set(MAP.TILE.R*MAP.TILE.C, TollTile);
*/
      this.Tiles = Utilities.Create2DArray(MAP.TILE.R, MAP.TILE.C, TollTile);

      this.Scale = INFoBOX.WIDTH/MAP.W;
   },
   Generate() {

      //UNLOGGED

      //TODO: add terrain if that is decided on
/* likely REDUNDANT
      for (indx=0;indx<MAP.TILE.R*MAP.TILE.C;++indx) {
	 this.Tiles[indx].Location.X = indx % MAP.TILE.R;
	 this.Tiles[indx].Location.Y = Math.floor(indx/MAP.TILE.R);
	 this.Tiles[indx].Type = TILE.EMPTY;
	 //TODO: assign neighbours (still to be seen if this is needed, as is location)
      }
*/
      this.GenerateCanals();
   },
   GenerateCanals() {
      for (indx=0;indx<36;++indx) {		//NOTE: picking 64 'source' tiles
	 coords.X = 18*((indx%6)+1);
	 coords.Y = 18*(Math.floor(indx/6)+1);
	 for (indx2=0;indx2<4;++indx2)		//canals are spawned in all 4 directions
	    this.GenerateCanal(coords.X, coords.Y, indx2);
      }
   },
   GenerateCanal(x, y, direction) {
      this.lngth = this.Randomizer.GetInRange(1,18);
      num = 0;
      do {
	 this.Tiles[x][y].Type = TILE.CANAL;
	 switch (direction) {
	    case 0:
	       --y;
	       break;
	    case 1:
	       ++x;
	       break;
	    case 2:
	       ++y;
	       break;
	    case 3:
	       --x;
	       break;
	 }
	 ++num;
      } while (num<this.lngth && x>=0 && x<MAP.TILE.C && y>=0 && y<MAP.TILE.R);
   },
   CreatePorts(nPorts) {

      //UNLOGGED - TODO

      for (indx=0;indx<nPorts;++indx) {
	 //-create ports by extending canals, starting with presidios closest to one
      }
   },
   DrawInfoBox() {

      //UNLOGGED - this is kind of TEMP

      this.InfoBox.fillStyle = MAP.COLOUR;
      this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
      this.GraphicsTool.SwitchContext(this.InfoBox);

      //Canals
      for (coords.X=0;coords.X<MAP.TILE.C;++coords.X)
	 for (coords.Y=0;coords.Y<MAP.TILE.R;++coords.Y)
	    if (this.Tiles[coords.X][coords.Y].Type==TILE.CANAL)
	       this.GraphicsTool.DrawRectangle(2*coords.X, 2*coords.Y, 2, 2, "blue", 0);

      //Presidios
      for (indx=0;indx<PRESIDIO.COUNT;++indx) {
	 if (!Presidios[indx].Clan)
	    this.GraphicsTool.DrawDiamond((2*Presidios[indx].Location.X)+1, (2*Presidios[indx].Location.Y)+1, 2, ClanColours[8][0], 0)
	 else
	    this.GraphicsTool.DrawDiamond((2*Presidios[indx].Location.X)+1, (2*Presidios[indx].Location.Y)+1, 2, ClanColours[Presidios[indx].Clan.Index][0], 0)
      }

      this.GraphicsTool.RestoreContext();
   },
   DrawFullScreen() {

      //UNLOGGED - this is kind of TEMP

      this.Screen.fillStyle = MAP.COLOUR;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      //Canals
      for (coords.X=0;coords.X<MAP.TILE.C;++coords.X)
	 for (coords.Y=0;coords.Y<MAP.TILE.R;++coords.Y)
	    if (this.Tiles[coords.X][coords.Y].Type==TILE.CANAL)
	       this.GraphicsTool.DrawRectangle(5*coords.X, 5*coords.Y, 5, 5, "blue", 0);

      //Presidios
      for (indx=0;indx<PRESIDIO.COUNT;++indx) {
	 if (!Presidios[indx].Clan)
	    this.GraphicsTool.DrawRectangle(5*Presidios[indx].Location.X, 5*Presidios[indx].Location.Y, 10, 10, ClanColours[8][0], 0)
	 else
	    this.GraphicsTool.DrawRectangle(5*Presidios[indx].Location.X, 5*Presidios[indx].Location.Y, 10, 10, ClanColours[Presidios[indx].Clan.Index][0], 0)
      }
   },
   Draw() {

      //UNLOGGED - at the moment, scrolling will be a tile at a time

      this.DrawTerrain();
      this.DrawPresidios();
   },
   DrawTerrain() {

      //UNLOGGED

      this.x = this.ScreenRect.L/MAP.TILE.W;
      this.y = this.ScreenRect.T/MAP.TILE.H;
      for (coords.X=0;coords.X<SCREEN.TILE.C;++coords.X)
	 for (coords.Y=0;coords.Y<SCREEN.TILE.R;++coords.Y) {
	    if (this.Tiles[this.x+coords.X][this.y+coords.Y].Type==TILE.CANAL)
	       this.GraphicsTool.DrawRectangle(MAP.TILE.W*coords.X, MAP.TILE.H*coords.Y, MAP.TILE.W, MAP.TILE.H, CANAL.COLOUR, 0);
	    else  //TODO: in the future, this will be the colour of the clan's territory
	       if ((coords.X+coords.Y) % 2)
		  this.GraphicsTool.DrawRectangle(MAP.TILE.W*coords.X, MAP.TILE.H*coords.Y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR1, 0);
	       else
		  this.GraphicsTool.DrawRectangle(MAP.TILE.W*coords.X, MAP.TILE.H*coords.Y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR2, 0);
/* this draws tiles in sides' colours
	       if (this.Tiles[this.x+coords.X][this.y+coords.Y].Type-TILE.CANAL) {
		  indx = this.Tiles[this.x+coords.X][this.y+coords.Y].Type - TILE.CANAL;
		  this.GraphicsTool.DrawRectangle(MAP.TILE.W*coords.X, MAP.TILE.H*coords.Y, MAP.TILE.W, MAP.TILE.H, ClanColours[indx][0], 0);
	       } else
		  this.GraphicsTool.DrawRectangle(MAP.TILE.W*coords.X, MAP.TILE.H*coords.Y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR, 0);
*/
	       //TEMP>>>
	       if (this.Tiles[this.x+coords.X][this.y+coords.Y].Type==TILE.MARKER)
		  this.GraphicsTool.DrawCircle((MAP.TILE.W*coords.X)+30, (MAP.TILE.H*coords.Y)+30, 20, "yellow", 0);
	       //<<<TEMP
	 }
   },
   DrawPresidios() {

      //UNLOGGED

      Presidios.forEach(function(prsdio){if (prsdio.CheckOnScreen()) prsdio.Draw();})
   }
};
