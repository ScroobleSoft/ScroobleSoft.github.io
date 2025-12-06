
TacticalPlayView.prototype.DetermineAction = function(tile) {  //UNLOGGED - REDUNDANT

	if (this.SelectedStack)
		if (Map.CheckNeighbouringTiles(this.SelectedStack.Tile, tile)) {
			actn = this.SelectedStack.DetermineAction(tile);
			switch (actn) {
				case STACK.ACTION.MOVE:
					this.MoveStack(tile);
					//AI.ExecuteTurns();
					break;
				case STACK.ACTION.TRANSFER:
					this.Close(this.OpenTransferView.bind(this), 100);
					break;
				case STACK.ACTION.TELEPORT:
					this.Close(this.OpenTeleportView.bind(this), 100);
					break;
				case STACK.ACTION.ATTACK:
					this.Close(this.OpenCombatView.bind(this), 100);
					break;
				case STACK.ACTION.CAPTURE:
					this.CaptureCity(tile.City);
					//AI.ExecuteTurns();
					break;
			}
		}
};
TacticalPlayView.prototype.MoveStack = function(tile) {  //REDUNDANT
//	var tle;

	//Check if a move is even possible (depends on whether it is a land/sea/air unit)
	if (!this.SelectedStack.CheckMoveValid(tile)) {
		this.DisplayMoveInvalid(tile);
		setTimeout(this.Draw.bind(this), 50);		//call time lapsed to clear symbol - TODO: some tiles can be individually drawn instead
		return;
	} else {
		this.SelectedStack.Move(tile);
		this.AdjustMarkers();
		this.Draw();
	}
/*
	tle = this.SelectedStack.Tile;
	tile.SetStack(this.SelectedStack);
	this.SelectedStack.SetTile(tile);
	tle.ClearStack();
	this.AdjustMarkers();
	this.Draw();
*/
};
TacticalPlayView.prototype.CaptureCity = function(city) {  //UNLOGGED - keep this method

	//-stack doesn't move
	//-city transfers to clan, it's colour changing
	//-if city had been owned by foe, it has to be removed from city list
	if (city.Clan) {
		//-attack rival city
	} else {
		city.SetClan(this.Clan);
		city.Draw();
	}
};
TacticalPlayView.prototype.GetTileClicked = function() {
	var c, r;

	c = Math.floor(Mouse.Click.X/MAP.TILE.W) + TopLeftTile.C;
	r = Math.floor(Mouse.Click.Y/MAP.TILE.H) + TopLeftTile.R;

	return (Map.Tiles[c][r]);
};
TacticalPlayView.prototype.AdjustMarkers = function() {
	var c, r;

	//Make sure the selected stack is 3 tiles away from the edge of the screen
	c = this.SelectedStack.Tile.C - TopLeftTile.C;
	r = this.SelectedStack.Tile.R - TopLeftTile.R;
	if (c<this.Specs.PADDING)
		--TopLeftTile.C;
	if (r<this.Specs.PADDING)
		--TopLeftTile.R;
	if (c>=this.Specs.TILE.C-this.Specs.PADDING)
		++TopLeftTile.C;
	if (r>=this.Specs.TILE.R-this.Specs.PADDING)
		++TopLeftTile.R;

	this.AdjustTopLeftTile();
	Map.AlignRects();
};
TacticalPlayView.prototype.AdjustTopLeftTile = function() {

	//Adjust top left tile
	if (TopLeftTile.C<0)
		TopLeftTile.C = 0;
	if (TopLeftTile.R<0)
		TopLeftTile.R = 0;
	if (TopLeftTile.C>(MAP.TILE.C-VIEW.PLAY.TILE.C))
		TopLeftTile.C = MAP.TILE.C - VIEW.PLAY.TILE.C;
	if (TopLeftTile.R>(MAP.TILE.R-VIEW.PLAY.TILE.R))
		TopLeftTile.R = MAP.TILE.R - VIEW.PLAY.TILE.R;
};
