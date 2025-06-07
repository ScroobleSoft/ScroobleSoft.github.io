
//---------------------------------------------------
//---------- SOLAR WORDS INFO VIEW ------------------
var SolarWordsInfoView = function() {
	var LetterImages, CellImage, SubCellImage, SelectionImage;
	var Grid;
	var SelectedCell;  //TODO: top-left, to start with
};
SolarWordsInfoView.prototype = new GenieSubView();
SolarWordsInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.SetGrid();
};
SolarWordsInfoView.prototype.SetImages = function() {

	this.LetterImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.LETTERS);
	this.CellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.CELL);
	this.SubCellImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.SUbCELL);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.SELECTION);
};
SolarWordsInfoView.prototype.SetGrid = function() {  //UNLOGGED
	var c, r;
	var x, y;
	var iCll;

	this.Grid = ArrayUtils.Create(this.Specs.GRID.CELLS, SolarWordCell);
	iCll = 0;
	for (c=0;c<this.Specs.GRID.C;++c)
		for (r=0;r<this.Specs.GRID.R;++r) {
			this.Grid[iCll].Set(this.Specs, this.GraphicsTool);
			x = 22 + ((this.Specs.GRID.W-this.Specs.GRID.LW)*c);
			y = 22 + ((this.Specs.GRID.H-this.Specs.GRID.LW)*r);
			this.Grid[iCll].SetLocation(x, y);
			++iCll;
		}
};
SolarWordsInfoView.prototype.Draw = function() {  //UNLOGGED

};
