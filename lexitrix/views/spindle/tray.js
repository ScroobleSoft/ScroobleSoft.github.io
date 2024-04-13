
//---------------------------------------------
//---------- SHUFFLE BOARD --------------------
var ShuffleBoard = function() {
	var Specs;
   var Screen;
   var Randomizer;
   var TileGrid, BorderIndices, InnerIndices;
   var TopRow, RightColumn, BottomRow, LeftColumn;
   var Alphabet, WordsString;

   var c, r;			//scratch variables
};
ShuffleBoard.prototype = {
   Set(specs, cntxt, rGenerator) {
		this.Specs = specs;
		this.Screen = cntxt;
		this.Randomizer = rGenerator;
		this.SetGrid();
		this.SetData();
   },
   SetGrid() {
      var r, c;
      var iTile;

      this.TileGrid = ArrayUtils.Create2D(this.Specs.TILE.C, this.Specs.TILE.R, ShuffleTile);
		this.TileGrid[3][3] = null;			//ditch centre tile for 'Shuffle' button

      iTile = 0;
		for (r=0;r<this.Specs.TILE.R;++r)
			for (c=0;c<this.Specs.TILE.C;++c) {
				if (!this.TileGrid[c][r]) {
					++iTile;
					continue;
				}
				this.TileGrid[c][r].Set(this.Specs.TILE, this.Screen, this, iTile);
				this.TileGrid[c][r].X = this.Specs.L + (this.Specs.TILE.W*c);
				this.TileGrid[c][r].Y = this.Specs.T + (this.Specs.TILE.H*r);
				++iTile;
			}
   },
   SetData() {

      this.BorderIndices = [0,1,2,3,4,5,6,13,20,27,34,41,48,47,46,45,44,43,42,35,28,21,14,7];
      this.InnerIndices = [ [1,1],[2,1],[3,1],[4,1],[5,1],
									 [1,2],[2,2],[3,2],[4,2],[5,2],
									 [1,3],[2,3],[4,3],[5,3],
									 [1,4],[2,4],[3,4],[4,4],[5,4],
									 [1,5],[2,5],[3,5],[4,5],[5,5]  ];
      this.Alphabet = "abcdefghijklmnopqrstuvwxyz";
   },
   SetWords(aWords) {  //-there will be several statements here
      var word, aLttrs;

      //Record the 4 words
      this.TopRow = aWords[0];
      this.RightColumn = aWords[1];
      this.BottomRow = aWords[2];
      this.LeftColumn = aWords[3];

      //Concatenate the 4 words into 1 long string
      this.WordsString = this.TopRow.concat(this.RightColumn.substring(1));
      word = this.BottomRow.substring(0,6);
      word = Utils.ReverseString(word);
      this.WordsString = this.WordsString.concat(word);
      word = this.LeftColumn.substring(1, 6);
      word = Utils.ReverseString(word);
      this.WordsString = this.WordsString.concat(word);

      this.AssignLetters();
      this.ShuffleTiles();
   },
   AssignLetters() {  //arrange the letters around the inner tiles
      var r, c;
      var iTile;

      iTile = 0;
      for (r=1;r<this.Specs.TILE.R-1;++r)
			for (c=1;c<this.Specs.TILE.C-1;++c) {
				if (r==3 && c==3)
					continue;
				else
					this.TileGrid[r][c].Letter = this.WordsString[iTile];
			 ++iTile;
			}
   },
   ShuffleTiles() {
      var i;
      var r1, c1, r2, c2;
      var lttr;
      var iLetters;

      iLetters = new Array(this.WordsString.length);
      this.Randomizer.Shuffle(iLetters, INITIALIZE);
      for (i=0;i<this.WordsString.length/2;++i) {
			r1 = this.InnerIndices[iLetters[2*i]][0];
			c1 = this.InnerIndices[iLetters[2*i]][1];
			lttr = this.TileGrid[r1][c1].Letter;
			r2 = this.InnerIndices[iLetters[(2*i)+1]][0];
			c2 = this.InnerIndices[iLetters[(2*i)+1]][1];
			this.TileGrid[r1][c1].Letter = this.TileGrid[r2][c2].Letter;
			this.TileGrid[r2][c2].Letter = lttr;
      }
   },
   Draw() {

		//Border
		this.Screen.fillStyle = this.Specs.BORDER.COLOUR;
		this.Screen.fillRect(this.Specs.BORDER.L, this.Specs.BORDER.T, this.Specs.BORDER.W, this.Specs.BORDER.LW);									//Top
		this.Screen.fillRect(this.Specs.BORDER.L+this.Specs.BORDER.W, this.Specs.BORDER.T, -this.Specs.BORDER.LW, this.Specs.BORDER.H);		//Right
		this.Screen.fillRect(this.Specs.BORDER.L+this.Specs.BORDER.W, this.Specs.BORDER.T+this.Specs.BORDER.H, -this.Specs.BORDER.W, -this.Specs.BORDER.LW);
		this.Screen.fillRect(this.Specs.BORDER.L, this.Specs.BORDER.T, this.Specs.BORDER.LW, this.Specs.BORDER.H);									//Left

		//Padding around border
		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(this.Specs.BORDER.L+this.Specs.BORDER.W, this.Specs.BORDER.T, this.Specs.BORDER.LW, this.Specs.BORDER.H);
		this.Screen.fillRect(this.Specs.BORDER.L, this.Specs.BORDER.T+this.Specs.BORDER.H, this.Specs.BORDER.W, this.Specs.BORDER.LW);									//Right

		//Tiles
		for (this.r=0;this.r<this.Specs.TILE.R;++this.r)
			for (this.c=0;this.c<this.Specs.TILE.C;++this.c)
				if (this.TileGrid[this.r][this.c])
					this.TileGrid[this.r][this.c].Draw();
   },
   CheckSolved() {
      var i;

      for (i=0;i<this.BorderIndices.length;++i) {
			this.r = Math.floor(this.BorderIndices[i]/this.Specs.TILE.C);
			this.c = this.BorderIndices[i] % this.Specs.TILE.C;
			if (this.TileGrid[this.r][this.c].Letter!=this.WordsString[i])
				return (false);
      }

      return (true);
   },
	GetMouseTile(bDown) {

		if (this.CheckBorderClicked(bDown))
			return;

      if (bDown) {
			this.c = Math.floor((Mouse.Down.X-this.Specs.L)/this.Specs.TILE.W);
			this.r = Math.floor((Mouse.Down.Y-this.Specs.T)/this.Specs.TILE.H);
      } else {
			this.c = Math.floor((Mouse.Up.X-this.Specs.L)/this.Specs.TILE.W);
			this.r = Math.floor((Mouse.Up.Y-this.Specs.T)/this.Specs.TILE.H);
      }

		return (this.TileGrid[this.c][this.r]);
	},
	GetHapticTile(bTouched) {

		if (this.CheckBorderTouched(bTouched))
			return;

      if (bTouched) {
			this.c = Math.floor((TouchScreen.Start.X-this.Specs.L)/this.Specs.TILE.W);
			this.r = Math.floor((TouchScreen.Start.Y-this.Specs.T)/this.Specs.TILE.H);
      } else {
			this.c = Math.floor((TouchScreen.End.X-this.Specs.L)/this.Specs.TILE.W);
			this.r = Math.floor((TouchScreen.End.Y-this.Specs.T)/this.Specs.TILE.H);
      }

		return (this.TileGrid[this.c][this.r]);
	},
	CheckMouseOut(bDown) {
/*
		if (bDown) {
			if ( Mouse.Down.X < this.Specs.BORDER.L || Mouse.Down.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (false);
			if ( Mouse.Down.Y < this.Specs.BORDER.T || Mouse.Down.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (false);
		} else {
			if ( Mouse.Up.X < this.Specs.BORDER.L || Mouse.Up.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (false);
			if ( Mouse.Up.Y < this.Specs.BORDER.T || Mouse.Up.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (false);
		}
*/
			if ( Mouse.X < this.Specs.BORDER.L || Mouse.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (true);
			if ( Mouse.Y < this.Specs.BORDER.T || Mouse.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (true);

      return (false);
	},
	CheckTouchedOut(bTouched) {
/*
		if (bTouched) {
			if ( TouchScreen.Touched.X < this.Specs.BORDER.L || TouchScreen.Touched.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (false);
			if ( TouchScreen.Touched.Y < this.Specs.BORDER.T || TouchScreen.Touched.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (false);
		} else {
			if ( TouchScreen.Lifted.X < this.Specs.BORDER.L || TouchScreen.Lifted.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (false);
			if ( TouchScreen.Lifted.Y < this.Specs.BORDER.T || TouchScreen.Lifted.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (false);
		}
*/
			if ( TouchScreen.X < this.Specs.BORDER.L || TouchScreen.X > (this.Specs.BORDER.L+this.Specs.BORDER.W) )
				return (false);
			if ( TouchScreen.Y < this.Specs.BORDER.T || TouchScreen.Y > (this.Specs.BORDER.T+this.Specs.BORDER.H) )
				return (false);

      return (false);
	},
	CheckBorderClicked(bDown) {

		if (bDown) {
			if ( Mouse.Down.X < this.Specs.L || Mouse.Down.X > (this.Specs.L+this.Specs.W) )
				return (true);
			if ( Mouse.Down.Y < this.Specs.T || Mouse.Down.Y > (this.Specs.T+this.Specs.H) )
				return (true);
		} else {
			if ( Mouse.Up.X < this.Specs.L || Mouse.Up.X > (this.Specs.L+this.Specs.W) )
				return (true);
			if ( Mouse.Up.Y < this.Specs.T || Mouse.Up.Y > (this.Specs.T+this.Specs.H) )
				return (true);
		}

      return (false);
	},
	CheckBorderTouched(bTouched) {

		if (bTouched) {
			if ( TouchScreen.Touched.X < this.Specs.L || TouchScreen.Touched.X > (this.Specs.L+this.Specs.W) )
				return (true);
			if ( TouchScreen.Touched.Y < this.Specs.T || TouchScreen.Touched.Y > (this.Specs.T+this.Specs.H) )
				return (true);
		} else {
			if ( TouchScreen.Lifted.X < this.Specs.L || TouchScreen.Lifted.X > (this.Specs.L+this.Specs.W) )
				return (true);
			if ( TouchScreen.Lifted.Y < this.Specs.T || TouchScreen.Lifted.Y > (this.Specs.T+this.Specs.H) )
				return (true);
		}

      return (false);
	},
	SwapTiles(fTile, sTile) {
      var letter;

      //Exchange letters
      letter = fTile.Letter;
      fTile.Letter = sTile.Letter;
      sTile.Letter = letter;

      //Update tiles' status
      if (this.BorderIndices.includes(fTile.Index))
			fTile.DetermineStatus();
      if (this.BorderIndices.includes(sTile.Index))
			sTile.DetermineStatus();
	},
	Solve() {
		var i;
		var c, r;

		//Place correct letters on the border (outer tiles)
		for (i=0;i<this.BorderIndices.length;++i) {
			c = this.BorderIndices[i] % this.Specs.TILE.C;
			r = Math.floor(this.BorderIndices[i]/this.Specs.TILE.C);
			this.TileGrid[c][r].Letter = this.WordsString[i];
		}

		//Empty the inner tiles
		for (c=1;c<6;++c)
			for (r=1;r<6;++r)
				this.TileGrid[c][r] = "";
	}
};
