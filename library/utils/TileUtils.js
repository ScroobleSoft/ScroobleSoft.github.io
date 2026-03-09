
//-------------------------------------------------
//----------- TILE UTILITIES ----------------------
var TileUtilities = function() {
	var Rows, Columns;
	var Neighbours;
};
TileUtilities.prototype = {
	Set() {
		this.Neighbours = [ [-1,-1],[0,-1],[1,-1], [1,0], [1,1],[0,1],[-1,1], [-1,0] ];
	},
	SetDimensions(c, r) {

		this.Rows = r;
		this.Columns = c;
	},
	CheckNeighbours(tile1, tile2) {

		return ( (Math.abs(tile1.C-tile2.C)<=1) && (Math.abs(tile1.R-tile2.R)<=1) );
	},
	CheckTileValid(c, r) {

		return ( c>=0 && c<this.Columns && r>=0 && r<this.Rows );
	},
	MoveToTile(unit, direction) {

		if (this.CheckTileValid(unit.C, unit.R))
			unit.SetTile(unit.C+this.Neighbours[direction][0], unit.R+this.Neighbours[direction][1]);
	}
};

TileUtils = new TileUtilities();
TileUtils.Set();
