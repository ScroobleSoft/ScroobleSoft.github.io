
//---------------------------------------------
//---------- TACTICAL TILE --------------------
var TacticalTile = function() {
	var C, R;
	var Type;
	var City;
	var Stack;
};
TacticalTile.prototype = new GenieTile();
TacticalTile.prototype.Set = function(col, row) {
	GenieTile.prototype.Set.call(this);

	this.C = col;
	this.R = row;
	this.Type = MAP.TILE.SEA;
};
TacticalTile.prototype.SetStack = function(stack) {

	this.Stack = stack;
	Map.UpdateLightMap(this.Stack.Tile.C, this.Stack.Tile.R, this.Stack.Clan);
};
