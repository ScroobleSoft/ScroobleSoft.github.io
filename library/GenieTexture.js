/*
 *  this is in addition to existing texture technique, so could implement a sub-class, where patches of varied hue are generated and
 *  painted randomly, with a check that identical ones are not being placed adjacent (maybe about 7 shades would be enough); this is
 *  actually more applicable to grass than the sea
 *
 * one type of terrain would be subtly placed watermark effects, such as a pseudo chariot wheel with spokes sticking out, etc
 */
/*
 *  GenieTexture - option for number of tiles; no padding (offset) between tiles in buffer; textures can be irregular rectangles
 *  (random dimensions)/diamonds/circles etc; use colour with varying dark and light shading over base colour
 */
//---------------------------------------------
//---------- GENIE TEXTURE --------------------
var GenieTexture = function() {
   var Screen;		//using this instead of Context since only main screen is used
   var Randomizer;
   var ScreenRect;
   var Specs;
   var TileImage;

   var Buffer;
   var Grid;		//set of indices of buffered tiles, used to shuffle tile positions over an entire screen
   var Cols, Rows;
   var Col, Row;	//used in calculations

   var x, y, sx, sy, c, r, iCol, iRow, iTile;		//scratch variables
};
GenieTexture.prototype = {  //SPECS: { COLOUR: { BACKGROUND: bClr, TEXTURE: tClr }, TILE: { W: w, H: h, C: c, R: r } };
   Set(cntxt, rGenerator, sRect, specs, img) {
      this.Screen = cntxt;
      this.Randomizer = rGenerator;
      this.ScreenRect = sRect;
      this.Specs = specs;
      this.TileImage = img;

      this.CreateBuffer();
      this.CreateGrid();
   },
   CreateBuffer() {

      this.Buffer = new GenieBuffer();
/* TODO: this needs to be changed because this approach creates massive buffers, and probably only want a 300x150px size
      if ((this.Specs.TILE.W*this.Specs.TILE.C>300) || (this.Specs.TILE.H*this.Specs.TILE.R>150))
	 this.Buffer.Set( { WIDTH: this.Specs.TILE.W*this.Specs.TILE.C, HEIGHT: this.Specs.TILE.H*this.Specs.TILE.R } );
      else
*/
	 this.Buffer.Set();
   },
   CreateGrid() {
      var c, r;
      var nTiles, iTile;	//nTiles - number of tiles in buffer
      var iTiles;		//array of indices

      if (this.Specs)
	 if (this.Specs.TILE)
	    if (this.Specs.TILE.W && this.Specs.TILE.H) {
	       this.Cols = SCREEN.WIDTH/this.Specs.TILE.W;
	       this.Rows = SCREEN.HEIGHT/this.Specs.TILE.H;
	       this.Grid = ArrayUtils.Create2D(this.Cols, this.Rows);
	       nTiles = this.Specs.TILE.C*this.Specs.TILE.R;
	       iTiles = new Array(this.Cols*this.Rows);
	       this.Randomizer.GetUniqueIndices(iTiles, this.Cols*this.Rows, this.Cols*this.Rows);
	       iTile = 0;
	       for (c=0;c<this.Cols;++c)
		  for (r=0;r<this.Rows;++r) {
		     this.Grid[c][r] = iTiles[iTile] % nTiles;
		     ++iTile;
		  }
	    }
   },
   GenerateTiles() {  //NOTE: uses the standard 300x150 buffer size to generate several tiles, be they 50x50, 30x30, 15x15 etc, unless specified otherwise
      var x, y;

      this.Buffer.Context.fillStyle = this.Specs.COLOUR.BACKGROUND;
      this.Buffer.Context.fillRect(0, 0, this.Buffer.Canvas.width, this.Buffer.Canvas.height);
      this.Buffer.Context.fillStyle = this.Specs.COLOUR.TEXTURE;
      for (x=0;x<this.Buffer.Canvas.width;++x)
	 for (y=0;y<this.Buffer.Canvas.height;++y)
	    if (this.Randomizer.CheckUnderOdds(1,4)) {		//TODO: odds should be specified in Specs
	       this.Buffer.Context.globalAlpha = this.Randomizer.GetInRange(1,10)*0.1;	//TODO: have to formalize this, but this step makes it look much better
	       this.Buffer.Context.fillRect(x, y, 1, 1);
	    }
   },
   DrawTiles() {  //NOTE: buffered tiles are numbered row by row, columns first

      //Determine offsets
      this.x = this.ScreenRect.L % this.Specs.TILE.W;
      this.y = this.ScreenRect.T % this.Specs.TILE.H;

      //Determine correct rows and tiles to start drawing from
      this.Col = Math.floor((this.ScreenRect.L % SCREEN.WIDTH)/this.Specs.TILE.W);
      this.Row = Math.floor((this.ScreenRect.T % SCREEN.HEIGHT)/this.Specs.TILE.H);

      //Draw all tiles
      for (this.c=0;this.c<=this.Cols;++this.c)
	 for (this.r=0;this.r<=this.Rows;++this.r) {
	    this.iCol = this.c + this.Col;
	    if (this.iCol>=this.Cols)
	       this.iCol -= this.Cols;
	    this.iRow = this.r + this.Row;
	    if (this.iRow>=this.Rows)
	       this.iRow -= this.Rows;
	    this.DrawTile(this.iCol, this.iRow, (this.c*this.Specs.TILE.W)-this.x, (this.r*this.Specs.TILE.H)-this.y);
	 }
   },
   DrawTile(c, r, x, y) {

      //Check if are drawing completely off-screen
      if (x>=SCREEN.WIDTH || y>=SCREEN.HEIGHT)
	 return;

      this.iTile = this.Grid[c][r];
      this.sx = (this.iTile % this.Specs.TILE.C)*this.Specs.TILE.W;
      this.sy = Math.floor(this.iTile/this.Specs.TILE.C)*this.Specs.TILE.H;
      this.Screen.drawImage(this.Buffer.Canvas, this.sx, this.sy, this.Specs.TILE.W, this.Specs.TILE.H, x, y, this.Specs.TILE.W, this.Specs.TILE.H);
   },
   DrawVariedTiles() {
      //-calling app will keep an array of tile indices, and supply that to indicate sequence of tile display
      //-actually, array could be created in app and stored here
   }
};
