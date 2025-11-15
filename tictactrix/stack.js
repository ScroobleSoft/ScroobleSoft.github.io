
//----------------------------------------------
//---------- TACTICAL STACK --------------------
var TacticalStack = function() {
	var Type;
	var Clan;
	var Tile;
	var Units;
	var Direction;
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
	Move(direction) {

		Map.Tiles[this.Tile.C+NeighbouringTiles[direction][0]][this.Tile.R+NeighbouringTiles[direction][1]].SetStack(this);
		Map.Tiles[this.Tile.C][this.Tile.R].Stack = null;
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

		TacticalAgents[this.Units[0]].SetTile(this.Tile);
		TacticalAgents[this.Units[0]].Draw();
	},
	DisplayInConsole() {  //UNLOGGED - REDUNDANT?
	},
	DetermineAction(tile) {

		//Choose an action depending on contents of tile
		switch (true) {
			case (!tile.Stack):								//move to empty tile
				return (STACK.ACTION.MOVE);
			case (tile.Stack):
				if (tile.Stack.Clan===PlayerClan)
					return (STACK.ACTION.TRANSFER);		//bring up unit transfer screen
				else
					return (STACK.ACTION.ATTACK);			//attack foe stack
			case (tile.City):
				if (tile.City.Clan===PlayerClan)
					return (STACK.ACTION.TELEPORT);		//teleport if entering own city (TODO: decide if this happens)
				else
					return (STACK.ACTION.CAPTURE);		//capture city, whether belonging to foe or neutral
				break;
		}
	}
};
