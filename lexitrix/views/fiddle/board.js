
//--------------------------------------------
//---------- FIDDLE BOARD --------------------
var FiddleBoard = function() {
	var Fiddle;
	var Specs;
	var Context, GraphicsTool, Randomizer;
	var Cells, SelectedCell, SelectedCellLetter, CellClicked;
	var CellOutlineImage, WhiteCellImage, GreenCellImage, YellowCellImage, RedCellImage, CyanCellImage;
	var LetterImage;
	var LetterIndices, BumperIndices, NeighbouringIndices, CornerIndices, Letters;							  //UNLOGGED
	var SelectedCell;

	var i;
};
FiddleBoard.prototype = {
	Set(specs, cntxt, gTool, rGnrtr, fddl) {
		this.Specs = specs;
		this.Context = cntxt;
		this.GraphicsTool = gTool;
		this.Randomizer = rGnrtr;
		this.Fiddle = fddl;
		this.SetData();
		this.SetImages();
		this.SetCells();
		this.State = this.Specs.STATE.NORMAL;
	},
	SetData() {  //UNLOGGED
		var i, j;

		this.LetterIndices = [ 0,1,2,3,4, 5, 7, 9, 10,11,12,13,14, 15, 17, 19, 20,21,22,23,24 ];
		this.BumperIndices = [ 6,8,16,18 ];
		this.CornerIndices = [ 0,4,20,24 ];
		for (i=1;i<this.Specs.SQUARES;++i) {
			for (j=0;j<this.Specs.SQUARE.LETTERS;++j)
				this.LetterIndices.push(this.LetterIndices[j]+(this.Specs.SQUARE.CELLS*i));
			for (j=0;j<this.Specs.SQUARE.BUMPERS;++j)
				this.BumperIndices.push(this.BumperIndices[j]+(this.Specs.SQUARE.CELLS*i));
			for (j=0;j<this.Specs.SQUARE.CORNERS;++j)
				this.CornerIndices.push(this.CornerIndices[j]+(this.Specs.SQUARE.CELLS*i));
		}
		this.NeighbouringIndices = [ -6,-5,-4,1,6,5,4,-1 ];
		this.Letters = [ [0,0],[0,1],[0,2],[0,3],[0,4],
							  [1,1],      [2,1],      [3,1],
							  [4,0],[4,1],[4,2],[4,3],[4,4],
							  [1,3],      [2,3],      [3,3],
							  [5,0],[5,1],[5,2],[5,3],[5,4]
		];
		this.ShuffledIndices = new Array(this.LetterIndices.length);
	},
	SetImages() {  //UNLOGGED

		//Cells
		this.CellOutlineImage = new GenieImage();
		this.CellOutlineImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.OUTLINE);
		this.WhiteCellImage = new GenieImage();
		this.WhiteCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.WHITE);
		this.GreenCellImage = new GenieImage();
		this.GreenCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.GREEN);
		this.YellowCellImage = new GenieImage();
		this.YellowCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.YELLOW);
		this.RedCellImage = new GenieImage();
		this.RedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.RED);
		this.CyanCellImage = new GenieImage();
		this.CyanCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.CYAN);

		this.LetterImage = new GenieImage();
		this.LetterImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LETTERS);
	},
	SetCells() {
		var i;
		var x, y;
		var ox, oy;

		this.Cells = new GenieArray();
		this.Cells.Set(this.Specs.CELLS, FiddleCell, INDEXED, this.Specs.CELL, this.Context, this);
		this.SelectedCell = this.Cells[0];
		for (i=0;i<this.Specs.CELLS;++i) {
			switch (true) {
				case (i<25):
					ox = 0;
					oy = 0;
					break;
				case (i<50):
					ox = 166;
					oy = 0;
					break;
				case (i<75):
					ox = 0;
					oy = 190;
					break;
				default:
					ox = 166;
					oy = 190;
					break;
			}
			x = this.Specs.L + ((this.Specs.CELL.W-2)*(i % this.Specs.SQUARE.C)) + ox;
			y = this.Specs.T + ((this.Specs.CELL.H-2)*Math.floor((i % this.Specs.SQUARE.CELLS)/this.Specs.SQUARE.C)) + oy;
			this.Cells[i].SetLocation(x, y);
			if (this.BumperIndices.includes(i)) {
				this.Cells[i].Status = this.Specs.CELL.STATUS.BUMPER;
				this.Cells[i].State = this.Specs.CELL.STATE.GREEN;
			} else
				this.Cells[i].Status = this.Specs.CELL.STATUS.LETTER;
		}
	},
	UpdateBumpers(iCll) {  //UNLOGGED
		var i;

		for (i=0;i<this.Specs.BUMPERS;++i)
			this.UpdateBumperState(this.BumperIndices[i]);
	},
	UpdateBumperState(iCll) {
		var i;
		var iSqr;
		var nCrrct;

		iSqr = Math.floor(iCll/this.Specs.SQUARE.CELLS);
		nCrrct = 0;
		for (i=0;i<this.Specs.CELL.BUMPER.NEIGHBOURS;++i)
			if (this.Cells[iCll+this.NeighbouringIndices[i]].Letter==this.Cells[iCll+this.NeighbouringIndices[i]].Solution)
				++nCrrct;
		if (nCrrct==0)
			this.Cells[iCll].State = this.Specs.CELL.STATE.RED;
		else if (nCrrct==9)
			this.Cells[iCll].State = this.Specs.CELL.STATE.GREEN;
		else
			this.Cells[iCll].State = this.Specs.CELL.STATE.YELLOW;
		this.Cells[iCll].Draw();
	},
	SetSolution(slctr) {  //UNLOGGED
		var i;
		var iCll;
		var iSqr;
		var a, b;

		iCll = 0;
		iSqr = 0;
		for (i=0;i<this.Specs.CELLS;++i) {
			if (this.BumperIndices.includes(i))
				continue;
			a = this.Letters[iCll % this.Specs.SQUARE.LETTERS][0];
			b = this.Letters[iCll % this.Specs.SQUARE.LETTERS][1];
			this.Cells[this.LetterIndices[iCll]].Solution = slctr.Grids[iSqr][a][b];
			++iCll;
			if ((iCll % this.Specs.SQUARE.LETTERS)==0)
				++iSqr;
		}
	},
	SetLetters() {  //UNLOGGED
		var i;

		this.Randomizer.Shuffle(this.ShuffledIndices, INITIALIZE);
		for (i=0;i<this.Specs.LETTERS;++i)
			this.Cells[this.LetterIndices[i]].Letter = this.Cells[this.LetterIndices[this.ShuffledIndices[i]]].Solution;
		for (i=0;i<this.Specs.BUMPERS;++i)
			this.UpdateBumperState(this.BumperIndices[i]);
	},
	Update() {  //UNLOGGED

		switch (this.State) {
			case this.Specs.STATE.NORMAL:
				if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {

					//Check if a cell was clicked
					for (this.i=0;this.i<this.Specs.CELLS;++this.i)
						if (this.Cells[this.i].CheckClicked()) {
							if (this.Cells[this.i].Status==this.Specs.CELL.STATUS.BUMPER)
								return;
							else
								break;
						}

					//Select cell if clicked
					if (this.i!=this.Specs.CELLS) {
						this.SelectedCell = this.Cells[this.i];
						this.SelectedCell.Select();
						this.State = this.Specs.STATE.SWITCHING;
					}
				}
				break;
			case this.Specs.STATE.SWITCHING:
				if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
					for (this.i=0;this.i<this.Specs.CELLS;++this.i)
						if (this.Cells[this.i].CheckClicked()) {
							if (this.Cells[this.i].Status==this.Specs.CELL.STATUS.BUMPER || this.Cells[this.i]===this.SelectedCell)
								this.ResetStatus();
							else
								this.State = this.Specs.STATE.SWITCHED;
							return;
						}
					if (this.i==this.Specs.CELLS)
						this.ResetStatus();
				}
				break;
			case this.Specs.STATE.SWITCHED:
				this.SelectedCell.State = this.Specs.STATE.UNSELECTED;
				this.SwapCells(this.SelectedCell, this.Cells[this.i]);
				this.SelectedCell.UpdateBumpers();
				this.Cells[this.i].UpdateBumpers();
				this.State = this.Specs.STATE.NORMAL;
				this.Fiddle.IncrementMoves();
				if (this.SelectedCell.Letter==this.SelectedCell.Solution) {
					if (this.Fiddle.RewardIcon.CheckPressed())
						this.FillLetter(this.SelectedCell.Letter);
				} else
					this.Fiddle.IncrementErrors();
				break;
		}
	},
	ResetStatus() {  //UNLOGGED

		this.SelectedCell.State = this.Specs.CELL.STATE.UNSELECTED;
		this.SelectedCell.Draw();
		this.State = this.Specs.STATE.NORMAL;
	},
	Draw() {

		this.Cells.forEach(function(cell) {cell.DrawOutline();});
		this.Cells.forEach(function(cell) {cell.Draw();});
	},
	SwapCells(sCll, tCll) {
		var lttr;

		lttr = sCll.Letter;
		sCll.SetLetter(tCll.Letter);
		tCll.SetLetter(lttr);
	},
	PlaceCorners() {
		var i;
		var cell;

		for (i=0;i<this.Specs.CORNERS;++i)
			if (!this.Cells[this.CornerIndices[i]].CheckSolved()) {
				cell = this.GetMatchingCell(this.CornerIndices[i]);
				this.SwapCells(this.Cells[this.CornerIndices[i]], cell);
			}
		this.UpdateBumpers();
	},
	PlaceVowels() {
		var i;
		var cell;

		for (i=0;i<this.Specs.CELLS;++i) {
			if (Vowels.includes(this.Cells[i].Solution))
				if (this.Cells[i].Letter!=this.Cells[i].Solution) {
					cell = this.GetMatchingCell(i);
					this.SwapCells(this.Cells[i], cell);
				}
		}
		this.UpdateBumpers();
	},
	GetMatchingCell(iCll) {
		var i;

		for (i=0;i<this.Specs.CELLS;++i) {
			if (i==iCll)
				continue;
			if (this.Cells[i].Letter==this.Cells[i].Solution)		//skip already solved cells
				continue;
			if (this.Cells[i].Letter==this.Cells[iCll].Solution)
				return (this.Cells[i]);
		}
	},
	FillLetter(lttr) {  //UNLOGGED
		var i;
		var num;
		var bInvalid;

		for (i=0;i<this.Specs.LETTERS;++i) {
			if (this.Cells[this.LetterIndices[i]].CheckSolved())		//skip solved cells
				continue;
			if (this.Cells[this.LetterIndices[i]].Solution!=lttr)		//handle only relevant cells
				continue;
			do {
				bInvalid = false;
				num = this.Randomizer.GetIndex(this.Specs.LETTERS);	//get another cell
				if (num==i)															//skip if same cell
					bInvalid = true;
				if (this.Cells[this.LetterIndices[num]].Letter==this.Cells[this.LetterIndices[num]].Solution)		//skip solved cell
					bInvalid = true;
				if (this.Cells[this.LetterIndices[num]].Letter!=lttr)																//skip irrelevant cell
					bInvalid = true;
			} while (bInvalid);
			this.SwapCells(this.Cells[this.LetterIndices[i]], this.Cells[this.LetterIndices[num]]);
		}
	},
	CheckSolved() {
		var i;

		for (i=0;i<this.Specs.LETTERS;++i)
			if (this.Cells[this.LetterIndices[i]].Letter!=this.Cells[this.LetterIndices[i]].Solution)
				return (false);

		return (true);
	},
	Solve() {  //UNLOGGED
		var i;

		for (i=0;i<this.Specs.LETTERS;++i)
			this.Cells[this.LetterIndices[i]].SetLetter(this.Cells[this.LetterIndices[i]].Solution);
		for (i=0;i<this.Specs.BUMPERS;++i) {
			this.Cells[this.BumperIndices[i]].State = this.Specs.CELL.STATE.GREEN;
			this.Cells[this.BumperIndices[i]].Draw();
		}

		return (true);
	},
	Reset() {  //UNLOGGED

		this.Cells.forEach(function(cll) {cll.Reset()});
		this.State = this.Specs.STATE.NORMAL;
	}
};
