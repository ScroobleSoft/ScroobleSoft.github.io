
//---------------------------------------------
//---------- TACTICAL TILE --------------------
var TacticalTile = function() {
	var C, R;
	var X, Y;		//screen coords
	var Type;
	var City, Platform, Stack;
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
	this.Stack.SetTile(this);
	if (this.Stack)
		Map.UpdateLightMap(this.Stack.Tile.C, this.Stack.Tile.R, this.Stack.Clan);
};
TacticalTile.prototype.ClearStack = function() {

	this.Stack = null;
};
TacticalTile.prototype.Display = function() {  //UNLOGGED - NOTE: only applicable to non-shore tiles

	this.DetermineCoords();

	//Background
	switch (this.Type) {
		case MAP.TILE.LAND:
			Graphics.DrawRectangle(this.X, this.Y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.LAND, 0);
			break;
		case MAP.TILE.SEA:
			Graphics.DrawRectangle(this.X, this.Y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.SEA, 0);
			break;
	}

	//Stack
	if (this.Stack) {
		this.Stack.Display();
		this.Stack.DisplayStrength();
		if (this.Stack===PlayView.SelectedStack)
			PlayView.SelectionImage.Draw(this.X+1, this.Y+1);
	}
};
TacticalTile.prototype.DisplayNoEntry = function() {

	this.DetermineCoords();
	NoEntryImage.Draw(this.X+NoENTRyIMAGE.O.X, this.Y+NoENTRyIMAGE.O.Y);
};
TacticalTile.prototype.DetermineCoords = function() {

	this.X = (this.C-TopLeftTile.C) * MAP.TILE.W;
	this.Y = (this.R-TopLeftTile.R) * MAP.TILE.H;
};
