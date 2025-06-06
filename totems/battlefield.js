
//---------------------------------------------------
//----------- TOLL BATTLEFIELD ----------------------
var TollBattlefield = function() {
   var Screen;
   var GraphicsTool;
   var TopGrid, BottomGrid;
   var X, Y;			//used for drawing lines and ascertaining tile clicked
   var Grid;
};
TollBattlefield.prototype = {
   Set(cntxt, gTool) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;

      this.SetTiles();
   },
   SetTiles() {
      var c, r;

      //LOGGED - UNTESTED

      this.TopGrid = ArrayUtils.Create2D(BATTLeFIELD.TILE.C, BATTLeFIELD.TILE.R, TollTile);
      this.BottomGrid = ArrayUtils.Create2D(BATTLeFIELD.TILE.C, BATTLeFIELD.TILE.R, TollTile);

      for (c=0;c<BATTLeFIELD.TILE.C;++c)
	 for (r=0;r<BATTLeFIELD.TILE.R;++r) {

	    //Top grid
	    this.X = (r % 2) ? (BATTLeFIELD.TILE.W/2) : 0;
	    this.TopGrid[c][r].Top = true;
	    this.TopGrid[c][r].C = c;
	    this.TopGrid[c][r].R = r;
	    this.TopGrid[c][r].X = 10 + (BATTLeFIELD.TILE.W*c) + this.X;
	    this.TopGrid[c][r].Y = 24 + (BATTLeFIELD.TILE.H*r);

	    //Bottom grid
	    this.X = (r % 2) ? (BATTLeFIELD.TILE.W/2) : 0;
	    this.BottomGrid[c][r].Top = false;
	    this.BottomGrid[c][r].C = c;
	    this.BottomGrid[c][r].R = r;
	    this.BottomGrid[c][r].X =  10 + (BATTLeFIELD.TILE.W*c) + this.X;
	    this.BottomGrid[c][r].Y = 324 + (BATTLeFIELD.TILE.H*r);
	 }
   },
   Draw() {

      //UNLOGGED

      if (true)			//TODO:
	 this.DrawLand();
      else
	 this.DrawSea();
      this.DrawSky();
   },
   DrawLand() {

      this.DrawGrid(false, THEATRE.LAND.COLOUR, THEATRE.LAND.LINES);
   },
   DrawSea() {

      this.DrawGrid(false, THEATRE.SEA.COLOUR, THEATRE.SEA.LINES);
   },
   DrawSky() {

      this.DrawGrid(true, THEATRE.AIR.COLOUR, THEATRE.AIR.LINES);
   },
   DrawGrid(bTop, cBkgrnd, cLines) {  //c- colour

      //ISSUE: this is taking 5ms, so maybe should use sprite rectangles for grid, maybe even buffered ones

      if (bTop)
	 this.Y = 0;
      else
	 this.Y = SCREEN.HEIGHT/2;

      //Draw background
      this.Screen.fillStyle = cBkgrnd;
      this.Screen.fillRect(0, this.Y, SCREEN.WIDTH, 300);

      //Draw lines
      coords.Set(10,24+this.Y);										//ALGORITHM
      this.GraphicsTool.DrawHorizontalLine(coords, 561, cLines, 1);					//.draw a shorter line for top row
      for (coords.Y=40+this.Y;coords.Y<276+this.Y;coords.Y+=16)						//.draw 15 horizontal lines for 16 rows of tiles
	 this.GraphicsTool.DrawHorizontalLine(coords, 581, cLines, 1);
      coords.X += BATTLeFIELD.TILE.W/2;
      this.GraphicsTool.DrawHorizontalLine(coords, 561, cLines, 1);					//.draw a shorter line for bottom row
      for (coords.Y=24+this.Y;coords.Y<276+this.Y;coords.Y+=16)						//.draw vertical lines to enclose the tiles
	 for (coords.X=10;coords.X<SCREEN.WIDTH;coords.X+=40)
	    if ((coords.Y-(24+this.Y)) % 32)
	       this.GraphicsTool.DrawVerticalLine( { X: coords.X+(BATTLeFIELD.TILE.W/2), Y: coords.Y }, BATTLeFIELD.TILE.H, cLines, 1);
	    else
	       this.GraphicsTool.DrawVerticalLine(coords, BATTLeFIELD.TILE.H, cLines, 1);
   },
   GetTile(pnt) {

      //LOGGED - UNTESTED

      //Check if no tile is clicked
      if (pnt.X<10 || pnt.X>590 || pnt.Y<24 || pnt.Y>580)
	 return (null);
      if (pnt.Y>280 && pnt.Y<324)
	 return (null);

      //Get tile from correct grid
      if (pnt.Y<(SCREEN.HEIGHT/2))
	 this.GetSectionTile(false, pnt);
      else
	 this.GetSectionTile(true, pnt);
   },
   GetSectionTile(bBottom, pnt) {

      //Account for which section is clicked
      this.Y = 24;
      if (bBottom) {
	 this.Y += (SCREEN.HEIGHT/2);
	 this.Grid = this.BottomGrid;
      } else
	 this.Grid = this.TopGrid;

      //Check if odd or even tiles are clicked
      if (Math.floor((pnt.Y-this.Y)/16) % 2)
	 this.X = 10 + (BATTLeFIELD.TILE.W/2);
      else
	 this.X = 10;

      //Get tile clicked
      coords.X = Math.floor((pnt.X-this.X)/BATTLeFIELD.TILE.W);
      coords.Y = Math.floor((pnt.Y-this.Y)/BATTLeFIELD.TILE.H);
      if (coords.X>=0 && coords.X<BATTLeFIELD.TILE.C)
	 return (this.Grid[coords.X][coords.Y]);
      else
	 return (null);
   }
};
