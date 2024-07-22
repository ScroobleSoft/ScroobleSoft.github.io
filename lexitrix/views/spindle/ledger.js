
//----------------------------------------------
//---------- SPINDLE LEDGER --------------------
var SpindleLedger = function() {
	var Screen;
	var GraphicsTool;
	var Randomizer;
	var Spindle;
	var Specs;
	var SpineCells, RowCells, SelectedCell;
	var LargeLetterImages, SmallLetterImages;
	var LargeCellImage, SmallCellImage, LargeSelectionImage, SmallSelectionImage;
	var SolvedFlag;
};
SpindleLedger.prototype = {
	Set(specs, cntxt, gTool, rGenerator, spndl) {
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.Specs = specs;
		this.Spindle = spndl;
		this.SetImages();
		this.SetCells();
	},
	SetImages() {

		this.LargeCellImage = new GenieImage();
		this.LargeCellImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.LARGE);
		this.SmallCellImage = new GenieImage();
		this.SmallCellImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL.SMALL);
		this.LargeSelectionImage = new GenieImage();
		this.LargeSelectionImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.LARGE);
		this.SmallSelectionImage = new GenieImage();
		this.SmallSelectionImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION.SMALL);
		this.LargeLetterImages = new GenieImage();
		this.LargeLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LETTERS.LARGE);
		this.SmallLetterImages = new GenieImage();
		this.SmallLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.LETTERS.SMALL);
	},
	SetCells() {

		this.SetSpineCells();
		this.SetRowCells();
	},
	SetSpineCells() {
		var i;
		var x, y;

		this.SpineCells = ArrayUtils.Create(this.Specs.CELL.SPINE.COUNT, SpindleCell);

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i) {
			this.SpineCells[i].Set(this.Specs.CELL, this.GraphicsTool, this.Specs.CELL.TYPE.SPINE, this);
			x = this.Specs.CELL.SPINE.L;
			y = this.Specs.CELL.SPINE.T + ((this.Specs.CELL.SPINE.H-2)*i);
			this.SpineCells[i].SetLocation(x, y);
		}

		this.SelectedCell = this.SpineCells[0];
	},
	SetRowCells() {
		var i;
		var x, y;

		this.RowCells = ArrayUtils.Create(this.Specs.CELL.ROW.COUNT, SpindleCell);

		for (i=0;i<this.Specs.CELL.ROW.COUNT/2;++i) {
			this.RowCells[i].Set(this.Specs.CELL, this.GraphicsTool, this.Specs.CELL.TYPE.ROW, this);
			x = this.Specs.CELL.ROW.L + ((i % this.Specs.CELL.ROW.C)*(this.Specs.CELL.ROW.W-2));
			y = this.Specs.CELL.ROW.T + (Math.floor(i/this.Specs.CELL.ROW.C)*this.Specs.CELL.ROW.GAP);
			this.RowCells[i].SetLocation(x, y);
			this.RowCells[i+(this.Specs.CELL.ROW.COUNT/2)].Set(this.Specs.CELL, this.GraphicsTool, this.Specs.CELL.TYPE.ROW, this);
			x = this.Specs.CELL.ROW.R + ((i % this.Specs.CELL.ROW.C)*(this.Specs.CELL.ROW.W-2));
			this.RowCells[i+(this.Specs.CELL.ROW.COUNT/2)].SetLocation(x, y);
		}
	},
	SetSolution() {
		var i, j;
		var iCll;

		for (i=0;i<this.Spindle.Selector.SpineWord.length;++i)
			this.SpineCells[i].Solution = this.Spindle.Selector.SpineWord[i];
		iCll = 0;
		for (i=0;i<this.Spindle.Selector.LeftLedgerEntries.length;++i)
			for (j=0;j<this.Specs.CELL.ROW.C;++j) {
				this.RowCells[iCll].Solution = this.Spindle.Selector.LeftLedgerEntries[i][j];
				this.RowCells[iCll+(this.Specs.CELL.ROW.COUNT/2)].Solution = this.Spindle.Selector.RightLedgerEntries[i][j+1];
				++iCll;
			}
	},
	DrawFrame() {

		this.RowCells.forEach(function(cell) {if (cell.Solution) cell.DrawFrame();});
		this.SpineCells.forEach(function(cell) {if (cell.Solution) cell.DrawFrame();});
	},
	ShowVowels() {
		var i;

		for (i=0;i<this.RowCells.length;++i)
			if (this.RowCells[i].Solution)
				if (Vowels.includes(this.RowCells[i].Solution)) {
					this.RowCells[i].Letter = this.RowCells[i].Solution;
					this.RowCells[i].Status = this.Specs.CELL.STATUS.SOLVED;
					this.RowCells[i].DrawBackground();
					this.RowCells[i].DisplayLetter();
				}
	},
	UpdateClick() {
		var i;

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i)
			if (this.SpineCells[i].Solution)
				if (this.SpineCells[i].CheckClicked()) {
					this.SpineCells[i].UpdateClick();
					return;
				}

		for (i=0;i<this.Specs.CELL.ROW.COUNT;++i)
			if (this.RowCells[i].Solution)
				if (this.RowCells[i].CheckClicked()) {
					this.RowCells[i].UpdateClick();
					return;
				}
	},
	FillRows(lttr) {
		var i;

		for (i=0;i<this.Specs.CELL.ROW.COUNT;++i)
			if (this.RowCells[i].Solution)
				if (this.RowCells[i].Status!=this.Specs.CELL.STATUS.FILLED)
					if (this.RowCells[i].Solution==lttr) {
						this.RowCells[i].Letter = lttr;
						this.RowCells[i].Status = this.Specs.CELL.STATUS.SOLVED;
						this.RowCells[i].Draw();
					}
	},
	FillSpine(lttr) {
		var i;

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i)
			if (this.SpineCells[i].Solution)
				if (this.SpineCells[i].Status!=this.Specs.CELL.STATUS.FILLED)
					if (this.SpineCells[i].Solution==lttr) {
						this.SpineCells[i].Letter = lttr;
						this.SpineCells[i].Status = this.Specs.CELL.STATUS.SOLVED;
						this.SpineCells[i].Draw();
					}
	},
	CheckSolved() {
		var i;

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i)
			if (this.SpineCells[i].Solution) {
				if (!this.SpineCells[i].Letter)
					return (false);
				if (this.SpineCells[i].Letter!=this.SpineCells[i].Solution)
					return (false);
			}

		return (true);
	},
	Solve() {
		var i;

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i)
			if (this.SpineCells[i].Solution) {
				this.SpineCells[i].Letter = this.SpineCells[i].Solution;
				this.SpineCells[i].Status = this.Specs.CELL.STATUS.SOLVED;
				this.SpineCells[i].Draw();
			}
	},
	ClearIncorrectEntries() {
		var i;

		for (i=0;i<this.Specs.CELL.SPINE.COUNT;++i)
			if (this.SpineCells[i].Letter)
				if (this.SpineCells[i].Letter!=this.SpineCells[i].Solution)
					this.SpineCells[i].Clear();

		for (i=0;i<this.Specs.CELL.ROW.COUNT;++i)
			if (this.RowCells[i].Letter)
				if (this.RowCells[i].Letter!=this.RowCells[i].Solution)
					this.RowCells[i].Clear();
	},
	PlaceHint() {
		var i;
		var iCell;

		while (true) {
			if (this.Randomizer.CheckBoolean()) {
				iCell = this.Randomizer.GetIndex(this.Spindle.Selector.SpineWord.length);
				if (!this.SpineCells[iCell].Letter) {
					this.SpineCells[iCell].Letter = this.SpineCells[iCell].Solution;
					this.SpineCells[iCell].DisplayHint();
					return;
				}
			} else {
				iCell = this.Randomizer.GetIndex(this.Specs.CELL.ROW.COUNT);
				if (this.RowCells[iCell].Solution)
					if (!this.RowCells[iCell].Letter) {
						this.RowCells[iCell].Letter = this.RowCells[iCell].Solution;
						this.RowCells[iCell].DisplayHint();
						return;
					}
			}
		}
	},
	Reset() {

		this.RowCells.forEach(function(cell) {cell.Reset();});
		this.SpineCells.forEach(function(cell) {cell.Reset();});
		this.SolvedFlag = false;
	}
};
