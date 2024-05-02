
//----------------------------------------------
//---------- CROSSLE BOARD --------------------
var CrossleBoard = function() {
	var Crossle;
	var Specs;
	var Screen;
	var GraphicsTool;
	var Cells, SelectedCell, CellClicked;
	var CellImage, SelectedCellImage;
	var CellOrder, WordOrder, BorderIndices;
	var State, Frames;
};
CrossleBoard.prototype = {
	Set(specs, cntxt, gTool, crsl) {
		this.Specs = specs;
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.Crossle = crsl;
		this.SetData();
		this.SetImages();
		this.SetCells();
		this.State = this.Specs.STATE.NORMAL;
	},
	SetData() {

		this.CellOrder = [ 1,2,3,4,5,6,7,8,9,
								 11,13,15,17,19,21,
								 22,23,24,25,26,28,29,30,31,32,
								 33,35,37,39,41,43,
								 44,45,46,47,48,50,51,52,53,54,
								 55,65,
								 66,67,68,69,70,72,73,74,75,76,
								 77,79,81,83,85,87,
								 88,89,90,91,92,94,95,96,97,98,
								 99,101,103,105,107,109,
								 111,112,113,114,115,116,117,118,119
							  ];
		this.WordOrder = [ [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
								 [3,0],[4,1],[5,1],[6,1],[7,1],[1,0],
								 [3,1],[12,1],[4,2],[12,3],[5,2],[6,2],[14,1],[7,2],[14,3],[1,1],
								 [3,2],[4,3],[5,3],[6,3],[7,3],[1,2],
								 [3,3],[13,1],[4,4],[13,3],[5,4],[6,4],[15,1],[7,4],[15,3],[1,3],
								 [3,4],[1,4],
								 [3,5],[16,1],[8,0],[16,3],[9,0],[10,0],[18,1],[11,0],[18,3],[1,5],
								 [3,6],[8,1],[9,1],[10,1],[11,1],[1,6],
								 [3,7],[17,1],[8,2],[17,3],[9,2],[10,2],[19,1],[11,2],[19,3],[1,7],
								 [3,8],[8,3],[9,3],[10,3],[11,3],[1,8],
								 [2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]
							  ];
		this.BorderIndices = [ 1,2,3,4,5,6,7,8,9,									//top word
									  21,32,43,54,65,76,87,98,109,					//right word
									  111,112,113,114,115,116,117,118,119,			//bottom word
									  11,22,33,44,55,66,77,88,99						//left word
									];
		this.Vowels = [ "a","e","i","o","u" ];
	},
	SetImages() {

		this.CellImage = new GenieImage();
		this.CellImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
		this.SelectedImage = new GenieImage();
		this.SelectedImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTED);
	},
	SetCells() {
		var i;
		var x, y;

		this.Cells = ArrayUtils.Create(this.Specs.CELL.COUNT, CrossleCell);

		for (i=0;i<this.Specs.CELL.COUNT;++i) {
			this.Cells[i].Set(this.Specs.CELL, this.GraphicsTool, this);
			x = this.Specs.L + ((i % this.Specs.CELL.C)*this.Specs.CELL.W);
			y = this.Specs.T + (Math.floor(i/this.Specs.CELL.C)*this.Specs.CELL.H);
			this.Cells[i].SetLocation(x, y);
		}

		this.SelectedCell = this.Cells[1];
	},
	SetSolution(slctr) {  //assign a letter to each cell
		var i;
		var words;

		words = [ slctr.NineSolutions[0], slctr.NineSolutions[1], slctr.NineSolutions[2], slctr.NineSolutions[3],
					 slctr.FiveSolutions[0], slctr.FiveSolutions[1], slctr.FiveSolutions[2], slctr.FiveSolutions[3],
					 slctr.FiveSolutions[4], slctr.FiveSolutions[5], slctr.FiveSolutions[6], slctr.FiveSolutions[7],
					 slctr.FiveSolutions[8], slctr.FiveSolutions[9], slctr.FiveSolutions[10], slctr.FiveSolutions[11],
					 slctr.FiveSolutions[12], slctr.FiveSolutions[13], slctr.FiveSolutions[14], slctr.FiveSolutions[15]
				  ];
		for (i=0;i<this.CellOrder.length;++i)
			if (words[this.WordOrder[i][0]][this.WordOrder[i][1]]!="0")
				this.Cells[this.CellOrder[i]].Solution = words[this.WordOrder[i][0]][this.WordOrder[i][1]];
	},
	DrawGrid() {
		var r, c;
		var x, y;
		var iCell;

		this.Screen.fillStyle = this.Specs.COLOUR;
		this.Screen.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

		//Grid
		iCell = 0;
		for (r=0;r<this.Specs.CELL.R;++r)
			for (c=0;c<this.Specs.CELL.C;++c) {
				x = this.Specs.L + (this.Specs.CELL.W*c);
				y = this.Specs.T + (this.Specs.CELL.H*r);
				this.CellImage.Draw(x, y);
				if (!this.Cells[iCell].Solution)
					this.GraphicsTool.DrawRectangle(x+1, y+1, this.Specs.CELL.W-1, this.Specs.CELL.H-1, "black", 0);
				++iCell;
			}

		this.SelectedCell.DrawSelectionSquare();
	},
	UpdateClick() {
		var cell;

		if (SpaceUtils.CheckPointInBox(Mouse.Down, this.Specs)) {
			switch (this.State) {
				case this.Specs.STATE.NORMAL:
					this.CellClicked = this.GetCell(Mouse.Down.X, Mouse.Down.Y);
					if (this.CellClicked.Solution) {
						this.State = this.Specs.STATE.CLICKED;
						this.Frames = 45;
					}
					break;
				case this.Specs.STATE.WAITING:
					cell = this.GetCell(Mouse.Down.X, Mouse.Down.Y);
					if (cell.Solution) {
						if (cell==this.CellClicked)
							this.State = this.Specs.STATE.DOUBLeCLICKED;
						else {
							this.State = this.Specs.STATE.CLICKED;
							this.CellClicked = cell;
							this.Frames = 45;
						}
					}
					break;
			}

			return (true);
		}

		return (false);
	},
	Update() {

		switch (this.State) {
			case this.Specs.STATE.CLICKED:
				if (this.CellClicked!==this.SelectedCell) {
					this.SelectedCell.ClearSelectionSquare();
					this.SelectedCell = this.CellClicked;
					this.SelectedCell.DrawSelectionSquare();
				}
				this.State = this.Specs.STATE.WAITING;
				break;
			case this.Specs.STATE.WAITING:
				--this.Frames;
				if (!this.Frames)
					this.State = this.Specs.STATE.NORMAL;
				break;
			case this.Specs.STATE.DOUBLeCLICKED:
				this.CellClicked.Clear();
				this.State = this.Specs.STATE.NORMAL;
				break;
		}
	},
	GetCell(x, y) {
		var r, c;
		var iCell;

		r = Math.floor((y-this.Specs.T)/this.Specs.CELL.H);
		c = Math.floor((x-this.Specs.L)/this.Specs.CELL.W);
		iCell = (this.Specs.CELL.C*r) + c;
		
		return (this.Cells[iCell]);
	},
	FillLetter(lttr) {
		var i;

		for (i=0;i<this.Specs.CELL.COUNT;++i)
			if (this.Cells[i].Solution==lttr)
				this.Cells[i].SetLetter(lttr);

		this.CheckSolved();
		this.SelectNewCell();
	},
	CheckSolved() {
		var i;

		for (i=0;i<this.Specs.CELL.COUNT;++i)
			if (this.Cells[i].Letter!=this.Cells[i].Solution)
				break;

		if (i==this.Specs.CELL.COUNT)
			this.Solve();
	},
	Solve() {
		var i;

		for (i=0;i<this.Specs.CELL.COUNT;++i)
			if (this.Cells[i].Solution) {
				this.Cells[i].Letter = this.Cells[i].Solution;
				this.Cells[i].Draw(true);
			}

		this.Crossle.TextWriter.Write("Bravo!", 200, 390, { FONT: "18px Arial" } );
	},
	FillVowels() {
		var i;

		for (i=0;i<this.Cells.length;++i)
			if (this.Vowels.includes(this.Cells[i].Solution))
				this.Cells[i].SetLetter(this.Cells[i].Solution);
	},
	FillBorder() {
		var i;
		var cell;

		for (i=0;i<this.BorderIndices.length;++i) {
			cell = this.Cells[this.BorderIndices[i]];
			cell.SetLetter(cell.Solution);
		}
	},
	SelectNewCell() {
		var i;

		for (i=0;i<this.CellOrder.length;++i)
			if (this.Cells[this.CellOrder[i]].CheckClear()) {
				this.SelectedCell.ClearSelectionSquare();
				this.SelectedCell = this.Cells[this.CellOrder[i]];
				this.SelectedCell.DrawSelectionSquare();
				break;
			}
	},
	Reset() {

		this.Cells.forEach(function(cell) { cell.Reset(); });
		this.SelectedCell = this.Cells[1];
	}
};
