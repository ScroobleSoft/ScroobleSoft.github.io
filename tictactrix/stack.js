/*
		** attacking a stack reveals it contents, even if attack is invalid
		** a glimpsed stack remains visible for a look-in until it's contents change
*/
//----------------------------------------------
//---------- TACTICAL STACK --------------------
var TacticalStack = function() {
	var Type;
	var Clan;
	var Tile;
	var Units;
	var Direction;
	var Goal;			//-will have to store destination city/stack/platform for things like conquest/attack/transfer/teleport etc.
	var ListIndex;
};
TacticalStack.prototype = {
	Set(type, clan, tile) {
		this.Type = type;
		this.Clan = clan;
		this.Tile = tile;
		this.Units = new GenieArray();
		this.Units.Set();
		this.Direction = DIRECTION.E;
	},
	SetClan(clan) {

		this.Clan = clan;
	},
	SetTile(tile) {

		this.Tile = tile;
	},
	SetListIndex(iList) {  //UNLOGGED

		this.ListIndex = iList;
	},
	SetDirection(direction) {

		this.Direction = direction;
	},
	Update() {  //UNLOGGED - depends on .Goal (for AI rivals)

		switch (this.Goal) {
			case STACK.GOAL.GARRISON:
				//-probably nothing
				break;
			case STACK.GOAL.EXPLORATION:
				//-return a value if destination reached
				break;
			case STACK.GOAL.COMBAT:
				//-attack if stack reached (adjacently)
				break;
			case STACK.GOAL.CONQUEST:
				//-move to city; if adjacent, attack
				break;
			case STACK.GOAL.TRANSFER:
				//-move to stack; if adjacent, transfer
				break;
			case STACK.GOAL.TELEPORTATION:
				//-move to city; if adjacent, teleport
				break;
		}
	},
	Move(tile) {
		var c, r;
		var drctn;

		//Switch tiles
//		Map.Tiles[this.Tile.C+NeighbouringTiles[drctn][0]][this.Tile.R+NeighbouringTiles[drctn][1]].SetStack(this);
		c = this.Tile.C;
		r = this.Tile.R;
		tile.SetStack(this);
		Map.Tiles[c][r].ClearStack();

		//Rectify sprite directions
		drctn = this.Tile.C - tile.C;
		switch (drctn) {
			case -1:
				this.Direction = DIRECTION.W;
				break;
			case 1:
				this.Direction = DIRECTION.E;
				break;
		}
	},
	AddUnit(unit) {  //'unit' is an index

		this.Units.Add(unit);
		this.Units.sort( function(a, b) {return (b.Quality-a.Quality);} );		//put strongest unit at front of queue
	},
	CheckFull() {  //REDUNDANT? - UNLOGGED
	},
	CheckOnScreen() {  //UNLOGGED - REDUNDANT
	},
	Display() {

		//First unit in stack
		TacticalUnits[this.Units[0]].SetTile(this.Tile);
		TacticalUnits[this.Units[0]].SetDirection(this.Direction);
		TacticalUnits[this.Units[0]].SetClan(this.Clan);
		TacticalUnits[this.Units[0]].Draw();
	},
	DisplayStrength() {  //UNLOGGED
		var x, y;

		x = (MAP.TILE.W*TacticalUnits[this.Units[0]].Tile.C) - ScreenRect.L;
		x += PlayView.Specs.IMAGE.DIGITS.OFFSET.X;
		y = (MAP.TILE.H*TacticalUnits[this.Units[0]].Tile.R) - ScreenRect.T;
		y += PlayView.Specs.IMAGE.DIGITS.OFFSET.Y;
		PlayView.DigitImages.DrawPatchNumber(this.Units.length-1, x, y);
	},
	DisplayQuantity() {  //UNLOGGED
	},
	DisplayInConsole() {  //UNLOGGED - REDUNDANT?
	},
	DetermineAction(tile) {

		//Choose an action depending on contents of tile
		if (tile.Stack) {
			if (tile.Stack.Clan===PlayerClan)
				return (STACK.ACTION.TRANSFER);		//bring up unit transfer screen
			else
				return (STACK.ACTION.ATTACK);			//attack foe stack
		} else if (tile.City) {
			if (tile.City.Clan===PlayerClan)
				return (STACK.ACTION.TELEPORT);		//teleport if entering own city (TODO: decide if this happens)
			else
				return (STACK.ACTION.CAPTURE);		//capture city, whether belonging to foe or neutral
		} else
			return (STACK.ACTION.MOVE);				//move to empty tile
	},
	CheckMoveValid(tile) {  //UNLOGGED

		switch (this.Type) {
			case TACTICAlUNIT.TYPE.LAND:
				if (tile.Type==MAP.TILE.LAND)
					return (true);
				else
					return (false);
			case TACTICAlUNIT.TYPE.SEA:
				if (tile.Type==MAP.TILE.SEA)
					return (true);
				else
					return (false);
			case TACTICAlUNIT.TYPE.AIR:
				return (true);
		}
	}
};
