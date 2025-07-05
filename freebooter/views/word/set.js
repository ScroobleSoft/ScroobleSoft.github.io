SolarWordsInfoView.prototype.SetImages = function() {

	this.LetterImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.LETTERS);
	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CELL);
	this.SubCellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SUbCELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);

	this.SolutionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SOLUTIONS);
	this.SolaronsImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SOLARONS);
};
SolarWordsInfoView.prototype.SetControls = function() {

	this.LedgerButton = this.SetImageButton(this.Specs.BUTTON.LEDGER, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.VowelsButton = this.SetImageButton(this.Specs.BUTTON.VOWELS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.CornersButton = this.SetImageButton(this.Specs.BUTTON.CORNERS, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
	this.RakeButton = this.SetImageButton(this.Specs.BUTTON.RAKE, ImageManager.Pics[IMAGeINDEX.CONTROLS], RaisedCornerImages);
};
SolarWordsInfoView.prototype.SetData = function() {
	var i;

	this.FiveLetterWords = [ Words5a, Words5b, Words5c, Words5d, Words5e, Words5f, Words5g, Words5h, Words5i, Words5j, Words5k, Words5l, Words5m,
									 Words5n, Words5o, Words5p, Words5q, Words5r, Words5s, Words5t, Words5u, Words5v, Words5w, Words5y, Words5z ];
	this.FiveDistribution = new Array(this.FiveLetterWords.length);
	for (i=0;i<this.FiveDistribution.length;++i)
		this.FiveDistribution[i] = this.FiveLetterWords[i].length;
	this.WordList = new GenieList();
	this.WordList.Set(1000);				//NOTE: arbitray number, but reasonable maximum limit
};
SolarWordsInfoView.prototype.ResetData = function() {

	this.Cells.forEach(function(cell) {cell.Reset();});
};
SolarWordsInfoView.prototype.SetGrid = function() {
	var c, r;
	var x, y;
	var iCll;

	this.Cells = ArrayUtils.Create(this.Specs.GRID.CELLS, SolarWordCell);
	iCll = 0;
	for (r=0;r<this.Specs.GRID.R;++r)
		for (c=0;c<this.Specs.GRID.C;++c) {
			this.Cells[iCll].Set(this.Specs.CELL, this.GraphicsTool, iCll, this.LetterImages);
			x = this.Specs.GRID.L + ((this.Specs.CELL.W-this.Specs.CELL.LW)*c);
			y = this.Specs.GRID.T + ((this.Specs.CELL.H-this.Specs.CELL.LW)*r);
			this.Cells[iCll].SetLocation(x, y);
			++iCll;
		}
	this.SelectedCell = this.Cells[0];
};
