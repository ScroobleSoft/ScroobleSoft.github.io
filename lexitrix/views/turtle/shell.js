
//--------------------------------------------
//---------- TURTLE SHELL --------------------
var TurtleShell = function() {
	var Turtle;
	var Specs;
	var Context;
	var GraphicsTool;
	var Cells, SelectedCell, SelectedCellLetter, CellClicked;
	var UnselectedCellImage, SelectedCellImage, BlockedCellImage, IncorrectCellImage, WrongCellImage;
	var LetterImage;
	var CellTiles, FilledIndices, BorderIndices;
};
TurtleShell.prototype = {
	Set(specs, cntxt, gTool, trtl) {
		this.Specs = specs;
		this.Context = cntxt;
		this.GraphicsTool = gTool;
		this.Turtle = trtl;
		this.SetData();
		this.SetImages();
		this.SetCells();
	},
	SetData() {

		this.CellTiles = [ [4,0],
								 [2,1],[3,1],[4,1],[5,1],[6,1],
								 [1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],
								 [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],
								 [1,4],[2,4],[3,4],[4,4],[5,4],[6,4],[7,4],
								 [2,5],[3,5],[4,5],[5,5],[6,5],
								 [3,6],[5,6]
							  ];
		this.BlockedIndices = [ 6,8,10,12,22,24,26,28,34,35 ];
		this.FilledIndices = [ 0,1,5,13,21,29,33 ];
	},
	SetImages() {

		//Cells
		this.UnselectedCellImage = new GenieImage();
		this.UnselectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.UNSELECTED);
		this.SelectedCellImage = new GenieImage();
		this.SelectedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.SELECTED);
		this.BlockedCellImage = new GenieImage();
		this.BlockedCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.BLOCKED);
		this.IncorrectCellImage = new GenieImage();
		this.IncorrectCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.INCORRECT);
		this.WrongCellImage = new GenieImage();
		this.WrongCellImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.WRONG);

		this.LetterImage = new GenieImage();
		this.LetterImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LETTERS);
	},
	SetCells() {
		var i;
		var x, y;

		this.Cells = new GenieArray();
		this.Cells.Set(this.Specs.CELLS, TurtleCell, null, this.Specs.CELL, this);
		this.SelectedCell = this.Cells[3];
		for (i=0;i<this.Specs.CELLS;++i) {
			x = this.Specs.L + ((this.Specs.CELL.W-1)*this.CellTiles[i][0]);
			y = this.Specs.T + ((this.Specs.CELL.H-1)*this.CellTiles[i][1]);
			this.Cells[i].SetLocation(x, y);
			if (this.Cells[i]===this.SelectedCell)
				this.Cells[i].State = this.Specs.CELL.STATE.SELECTED;
			else if (this.BlockedIndices.includes(i))
				this.Cells[i].State = this.Specs.CELL.STATE.BLOCKED;
			else
				this.Cells[i].State = this.Specs.CELL.STATE.UNSELECTED;
		}
	},
	SetSolution(slctr) {
		var i;
		var letters;

		letters = [ slctr.SixSolution[0],
						slctr.FiveSolutions[0][0], slctr.FiveSolutions[0][1], slctr.FiveSolutions[0][2], slctr.FiveSolutions[0][3], slctr.FiveSolutions[0][4],
						0, slctr.FiveSolutions[2][1], 0, slctr.SixSolution[2], 0, slctr.FiveSolutions[3][1], 0,
						slctr.NineSolution[0], slctr.NineSolution[1], slctr.NineSolution[2], slctr.NineSolution[3], slctr.NineSolution[4],
													  slctr.NineSolution[5], slctr.NineSolution[6], slctr.NineSolution[7], slctr.NineSolution[8],
						0, slctr.FiveSolutions[2][3], 0, slctr.SixSolution[4], 0, slctr.FiveSolutions[3][3], 0,
						slctr.FiveSolutions[1][0], slctr.FiveSolutions[1][1], slctr.FiveSolutions[1][2], slctr.FiveSolutions[1][3], slctr.FiveSolutions[1][4],
						0, 0
					 ];

		//Assign letters
		for (i=0;i<this.Specs.CELLS;++i) {
			this.Cells[i].Solution = letters[i];
			if (this.FilledIndices.includes(i))
				this.Cells[i].Letter = letters[i];
			if (this.BlockedIndices.includes(i))
				this.Cells[i].Letter = letters[i];
		}
	},
	Update() {

		this.Cells.forEach(function(cell) {cell.CheckClicked();});
	},
	Draw() {

		this.Cells.forEach(function(cell) {cell.Draw();});
	},
	FillVowels() {
		var i;

		for (i=0;i<this.Cells.length;++i)
			if (Vowels.includes(this.Cells[i].Solution))
				this.Cells[i].SetLetter(this.Cells[i].Solution);
	},
	FillLetter(lttr) {
		var i;

		for (i=0;i<this.Cells.length;++i)
			if (this.Cells[i].Solution==lttr) {
				this.Cells[i].Letter = lttr;
				if (this.Cells[i]===this.SelectedCell)
					this.Cells[i].State = this.Specs.CELL.STATE.SELECTED;
				else
					this.Cells[i].State = this.Specs.CELL.STATE.UNSELECTED;
				this.Cells[i].Draw();
			}
	},
	CheckSolved() {
		var i;

		for (i=0;i<this.Specs.CELLS;++i)
			if (this.Cells[i].Letter!=this.Cells[i].Solution)
				break;

		if (i!=this.Specs.CELLS)
			return (false);

		return (true);
	},
	Solve() {
		var i;

		for (i=0;i<this.Specs.CELLS;++i)
			if (this.Cells[i].State!=this.Specs.CELL.STATE.BLOCKED)
				this.Cells[i].SetLetter(this.Cells[i].Solution);
		this.Turtle.SolvedFlag = true;
	},
	Reset() {

		this.Cells.forEach(function(cell) {cell.Reset();});
	}
};
