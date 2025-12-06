
TacticalPlayView.prototype.UpdateClick = function() {  //UNLOGGED

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.UpdateCanvasClick();
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
		this.InfoView.UpdateClick();
		this.Draw();
	} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}
};
TacticalPlayView.prototype.UpdateCanvasClick = function() {
	var tile;
	var actn;

	//Screen for dark map
	tile = this.GetTileClicked();
	if (this.DarkMapFlag)
		if (this.DarkGrid[tile.C][tile.R])
			return;

	//Select or de-select stack if the tile has one
	if (tile.Stack)
		this.UpdateStackClick(tile);
	else if (tile.City)
		this.UpdateCityClick(tile);
	else if (tile.Platform)
		this.UpdatePlatformClick(tile);
	else
		this.UpdateTileClick(tile);
};
TacticalPlayView.prototype.UpdateStackClick = function(tile) {  //UNLOGGED

		if (this.SelectedStack) {
			if (this.SelectedStack===tile.Stack) {
				this.SelectedStack = null;							//de-select stack
				this.Draw();
				//-clear console contents if it was showing selected stack (maybe replace with something else)
			} else {
					/***   PSEUDO-CODE   ***/
				//if rival stack {
				//  if selected stack adjacent (-need a method to check adjacency) {
				//    if stack types match
				//		  attack (actually, have to check if attack is valid)
				//		else
				//		  show no entry symbol
				//	 } else
				//    if show stack contents on
				//		  show contents in console
				//} else (own stack)
				//    if selected stack adjacent {
				//		  if stack types match
				//			 merge/transfer
				//		  else if army-navy combo
				//			 transfer land units either way (using transfer view)
				//		} else
				//		  select this stack (old selection automatically de-selects)
					/***   PSEUDO-CODE   ***/
			}
		} else {
			if (tile.Stack.Clan===PlayerClan) {
				this.SelectedStack = tile.Stack;
				this.Draw();
				//-show stack contents in console
			} else {  //rival stack
					/***   PSEUDO-CODE   ***/
				//if see in stacks on
				//  show rival stack contents
					/***   PSEUDO-CODE   ***/
			}
		}
};
TacticalPlayView.prototype.UpdateCityClick = function(tile) {  //UNLOGGED

	if (Map.CheckNeighbouringTiles(this.SelectedStack.Tile, tile)) {
					/***   PSEUDO-CODE   ***/
		//if own city
		//		open teleport view
		//else if rival city
		//		attack (open combat screen)
		//else (neutral city)
		//		capture city (re-draw city only, end turn)
					/***   PSEUDO-CODE   ***/
	} else {
					/***   PSEUDO-CODE   ***/
		//if own city
		//		show contents in console
		//else
		//		show contents if visible
					/***   PSEUDO-CODE   ***/
	}
};
TacticalPlayView.prototype.UpdatePlatformClick = function(tile) {  //UNLOGGED

	if (Map.CheckNeighbouringTiles(this.SelectedStack.Tile, tile)) {
					/***   PSEUDO-CODE   ***/
		//if own platform
		//		open transfer screen to acquire units to stack
		//else if rival platform
		//		attack (open combat screen)
		//else (neutral platform)
		//		attack platform (open combat screen, re-draw platform, re-draw stack tile, end turn)
					/***   PSEUDO-CODE   ***/
	} else {
					/***   PSEUDO-CODE   ***/
		//if own platform
		//		show contents in console
		//else
		//		show contents if visible
					/***   PSEUDO-CODE   ***/
	}
};
TacticalPlayView.prototype.UpdateTileClick = function(tile) {  //UNLOGGED

	//Check if a move is even possible (depends on whether it is a land/sea/air unit)
	if (!this.SelectedStack.CheckMoveValid(tile)) {
		this.DisplayMoveInvalid(tile);
//		if (tile.Type==MAP.TILE.SHORE)
			setTimeout(this.Draw.bind(this), 50);		//call time lapsed to clear symbol - TODO: some tiles can be individually drawn instead
//		else
//			setTimeout(tile.Draw.bind(this), 50);		//TODO: will this even work?
	} else {
//		this.SelectedStack.Move(tile);
		this.SelectedStack.Move(tile);
		this.AdjustMarkers();
		this.Draw();					//TODO: if neither tile is a shore tile, they can be drawn individually instead
	}
};
TacticalPlayView.prototype.UpdateKeys = function() {  //UNLOGGED - REDUNDANT unless a desktop game is made (could have on-screen keys)
};
