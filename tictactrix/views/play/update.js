
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

		//A lot hinges on whether a stack is selected by the player, or not
		if (this.SelectedStack) {																	//check if a player stack is currently selected
			if (this.SelectedStack===tile.Stack) {												//check if stack clicked is already selected
				this.SelectedStack = null;															//de-select stack
				this.Draw();
				//-clear console contents if it was showing selected stack (maybe replace with something else)
			} else {
				if (tile.Stack.Clan.Index!=PlayerClan.Index) {								//check if rival stack
					if (this.SelectedStack.CheckStackAdjacent(tile.Stack)) {				//check if rival stack is next to selected stack
						if (this.SelectedStack.CheckStackAttackable(tile.Stack)) {		//see if unit types match to an extent
							//-open combat screen
						} else {
							//-display no entry symbol
						}
					} else {
							//-if (stack visible)
							//-	show contents in console
					}
				} else { 																				//is own stack
				   if (this.SelectedStack.CheckStackAdjacent(tile.Stack)) {
						if (this.SelectedStack.Type==tile.Stack.Type) {
							TransferView.SetStacks(this.SelectedStack, tile.Stack);
							this.Close(this.OpenTransferView.bind(this), 100);				//open transfer window
						} else {
							//-display no entry symbol
						}
					} else {
						this.SelectedStack = tile.Stack;											//select new stack
						this.Draw();
					}
				}
			}
		} else {																							//no stack has been selected
			if (tile.Stack.Clan===PlayerClan) {
				this.SelectedStack = tile.Stack;
				this.DisplaySelector();
				//-show stack contents in console
			} else {  																					//rival stack
				//-if (stack visible)
				//-	show rival stack contents
			}
		}
};
TacticalPlayView.prototype.UpdateCityClick = function(tile) {  //UNLOGGED

	if (this.SelectedStack) {
		if (Map.CheckNeighbouringTiles(this.SelectedStack.Tile, tile)) {				//check if city is adjacent to selected stack
			if (!tile.City.Clan) {																	//if city neutral, capture it
				this.SelectedStack.CaptureCity(tile.City);
				Game.ExecuteTurns();
				this.Draw();
				this.InfoView.Draw();
			} else if (tile.City.Clan===PlayerClan) {													//if own city open teleport view
				//-open teleport view
				//-if teleportation is cancelled, do nothing, else execute turns, re-draw view
			} else {																						//if rival city, attack
				//-attack rival city (open combat screen)
				//-execute turns, re-draw view
			}
		} else {
			if (tile.City.Clan===PlayerClan) {
				//-show contents in console
			} else {												//rival city
				//-show contents if city visible
			}
		}
	} else {
		//-show contents if visible
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
		this.SelectedStack.Move(tile);
		Game.ExecuteTurns();
		this.AdjustMarkers();
		this.Draw();					//TODO: if neither tile is a shore tile, they can be drawn individually instead
		this.InfoView.Draw();
	}
};
TacticalPlayView.prototype.UpdateKeys = function() {  //UNLOGGED - REDUNDANT unless a desktop game is made (could have on-screen keys for mobile)
};
