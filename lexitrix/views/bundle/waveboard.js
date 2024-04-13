/*
 *  UNLOGGED
 */
//------------------------------------------------
//---------- BUNDLE WAVEBOARD --------------------
var BundleWaveboard = function() {
	var Specs;
	var VerticalColumn;
	var HorizontalRows;
	var ColTileBox, RowTileBox;
};
BundleWaveboard.prototype = {
	Set(specs) {
		this.Specs = specs;
		this.SetBoxes();
		this.SetTiles();
	},
	SetBoxes() {

		this.ColTileBox = new GenieRect();
		this.ColTileBox.W = this.Specs.COLUMN.TILE.W;
		this.ColTileBox.H = this.Specs.COLUMN.TILE.H;
		this.RowTileBox = new GenieRect();
		this.RowTileBox.W = this.Specs.ROW.TILE.W;
		this.RowTileBox.H = this.Specs.ROW.TILE.H;
	},
	SetTiles() {
		var i, j;
		var x, y;
		var row;

		//Main column
		this.VerticalColumn = ArrayUtils.Create(6, Coordinate2D);
		for (i=0;i<this.VerticalColumn.length;++i)
			this.VerticalColumn[i].Set(this.Specs.COLUMN.L, this.Specs.COLUMN.T+(this.Specs.COLUMN.TILE.H*i));

		//Create rows
		this.HorizontalRows = new Array(6);
		for (i=0;i<this.HorizontalRows.length/2;++i) {
			row = ArrayUtils.Create(5+i, Coordinate2D);
			this.HorizontalRows[i] = row;
			row = ArrayUtils.Create(5+i, Coordinate2D);
			this.HorizontalRows[5-i] = row;
		}

		//Set row tile locations
		for (i=0;i<this.HorizontalRows.length;++i)
			for (j=0;j<this.HorizontalRows[i].length;++j) {
				x = this.Specs.ROW.L + (j*this.Specs.ROW.TILE.W);
				y = this.Specs.ROW.T + (j*(this.Specs.ROW.TILE.H*this.Specs.ROW.GAP));
				this.HorizontalRows[i][j].Set(x, y);
			}
	},
	GetTile(pnt) {
		var i;

		//Check columns
		for (i=0;i<6;++i) {
			this.ColTileBox.T = this.VerticalColumn[i].X;
			if (SpaceUtils.CheckPointInBox(pnt, this.ColTileBox))
				return (this.VerticalColumn[i]);
		}

		//Check rows
		for (i=0;i<this.HorizontalRows.length;++i)
			for (j=0;j<this.HorizontalRows[i].length;++j) {
				this.RowTileBox.L = this.HorizontalRows[i][j].X;
				this.RowTileBox.T = this.HorizontalRows[i][j].Y;
			}
	},
	Draw() {
	},
	SwapTiles() {
	}
};
