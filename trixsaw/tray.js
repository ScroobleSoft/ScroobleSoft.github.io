
//------------------------------------------
//---------- PIECE TRAY --------------------
var PieceTray = function() {
	var Specs;
	var RowIndex;		//top visible row of pieces (w/ 60px 4 will fit, so 36 rows, 4 visible at one time)
	var Grid;
	var SelectedPiece;
};
PieceTray.prototype = {
	Set(specs) {
		this.SetGrid();
	},
	SetGrid() {  //UNLOGGED-this is what specs are used for

//		this.Grid = ArrayUtils.Create2D(this.Specs.C, this.Specs.R, TriPiece);
	}
};
