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
	var Goal;						//-will have to store destination city/stack/platform for things like conquest/attack/transfer/teleport etc.
	var NeighbouringTiles, TravellingTiles;		//for scratch work
	var Target;												//can be city, platform or stack
};
TacticalStack.prototype = {
	Set(type, clan, tile) {
		this.Type = type;
		this.Clan = clan;
		this.Tile = tile;
		this.Units = new GenieArray();
		this.Units.Set();
		this.Direction = DIRECTION.E;
		this.SetTiles();
	},
	SetClan(clan) {

		this.Clan = clan;
	},
	SetTile(tile) {

		this.Tile = tile;
	},
	SetTiles() {
		var i;

		this.NeighbouringTiles = new Array(NeighbouringTiles.length);
		this.TravellingTiles = ArrayUtils.Create(NeighbouringTiles.length, function() { var Index, Travels; } );
		for (i=0;i<this.TravellingTiles.length;++i)
			this.TravellingTiles[i].Index = i;
	},
	SetDirection(direction) {

		this.Direction = direction;
	},
	GetAssetType() {

		return (TACTICAL.ASSET.STACK);
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
	UpdateTravelledTiles() {

		++Clans[this.Clan.Index].TravelledTiles[this.Tile.C][this.Tile.R];
	},
	Move(tile) {  //moves to tile specified
		var c, r;
		var drctn;

		//Switch tiles
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
	MoveEfficiently() {  //UNLOGGED - move to least travelled neighbouring tile
		var i;
		var c, r;

		//Sort tiles by least travelled (results stored in .TravellingTiles)
		for (i=0;i<NeighbouringTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[i][0];
			r = this.Tile.R + NeighbouringTiles[i][1];
			if (Map.CheckTileValid(c, r))
				this.TravellingTiles[i].Travels = this.Clan.TravelledTiles[c][r];
			else
				this.TravellingTiles[i].Travels = Infinity;
		}
		this.TravellingTiles.sort( function(a, b) {return (a.Travels-b.Travels);} );

		//Go through .TravellingTiles list, find an empty tile to move to
		for (i=0;i<this.TravellingTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[this.TravellingTiles[i].Index][0];
			r = this.Tile.R + NeighbouringTiles[this.TravellingTiles[i].Index][1];
			if (Map.Tiles[c][r].CheckClear())
				if (this.CheckMoveValid(Map.Tiles[c][r])) {
					this.Move(Map.Tiles[c][r]);
					return;
				}
		}

		//TODO: decide what to do if no move is available (maybe pick another stack to move)
	},
	AddUnit(unit) {  //'unit' is an index

		//TEMP
		if (this.Units.length==STACK.UNITS.MAX)		//TODO: otherwise, teleport to another city? find another tile a little further?
			return;

		this.Units.Add(unit);
		this.SortStrongestToWeakest();
	},
	SortStrongestToWeakest() {

		this.Units.sort( function(a, b) {return (a.Quality-b.Quality);} );
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
	DisplayStrength() {
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
	CheckMoveValid(tile) {

		switch (this.Type) {
			case STACK.LAND:
				if (tile.Type==MAP.TILE.LAND)
					return (true);
				else
					return (false);
			case STACK.SEA:
				if (tile.Type==MAP.TILE.SEA)
					return (true);
				else
					return (false);
			case STACK.AIR:
				return (true);
		}
	},
	CheckCityAdjacent() {
		var i;
		var c, r;

		for (i=0;i<NeighbouringTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[i][0];
			r = this.Tile.R + NeighbouringTiles[i][1];
			if (Map.Tiles[c][r].City)
				return (true);
		}
	},
	CheckStackAdjacent(stack) {

		if ( Math.abs(this.Tile.C-stack.Tile.C) > 1 )
			return (false);
		if ( Math.abs(this.Tile.R-stack.Tile.R) > 1 )
			return (false);

		return (true);
	},
	CheckStackAttackable(stack) {

		//Check if stacks are identical
		if (this.Type==stack.Type)
			return (true);

		//Check if stack contains relevant specialist units
		switch (this.Type) {
			case STACK.LAND:
				if (stack.Type==STACK.SEA) {
					if (stack.Units.includes(TACTICAlUNIT.FRIGATE))
						return (true);
				} else		//air
					if (stack.Units.includes(TACTICAlUNIT.BOMBER))
						return (true);
				break;
			case STACK.SEA:
				if (stack.Type==STACK.LAND) {
					if (ArrayUtils.CheckIncludesElement(stack.Units, [TACTICAlUNIT.JEEP, TACTICAlUNIT.ROCKEtPOD, TACTICAlUNIT.MISSILeLAUNCHER]))
						return (true);
				} else		//air
					if (stack.Units.includes(TACTICAlUNIT.STRAFER))
						return (true);
				break;
			case STACK.AIR:
				if (stack.Type==STACK.LAND) {
					if (ArrayUtils.CheckIncludesElement(stack.Units, [TACTICAlUNIT.HOWITZER, TACTICAlUNIT.ARTILLERY, TACTICAlUNIT.AV]))
						return (true);
				} else		//sea
					if (stack.Units.includes(TACTICAlUNIT.CRUISER))
						return (true);
				break;
		}

		return (false);
	},
	GetAdjacentNeutralCity() {  //UNLOGGED - may become REDUNDANT due to ::GetAdjacentAsset
		var i;
		var c, r;

		Randomizer.Shuffle(this.NeighbouringTiles, INITIALIZE);
		for (i=0;i<NeighbouringTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[this.NeighbouringTiles[i]][0];
			r = this.Tile.R + NeighbouringTiles[this.NeighbouringTiles[i]][1];
			if (Map.Tiles[c][r].City)
				if (!Map.Tiles[c][r].City.Clan)
					return (Map.Tiles[c][r].City);
		}
	},
	GetAdjacentStack() {  //UNLOGGED - may become REDUNDANT due to ::GetAdjacentAsset
		var i;
		var c, r;

		Randomizer.Shuffle(this.NeighbouringTiles, INITIALIZE);
		for (i=0;i<NeighbouringTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[this.NeighbouringTiles[i]][0];
			r = this.Tile.R + NeighbouringTiles[this.NeighbouringTiles[i]][1];
			if (Map.Tiles[c][r].Stack)
				if (Map.Tiles[c][r].Stack.Clan===this.Clan)
					return (Map.Tiles[c][r].Stack);
		}
	},
	GetAdjacentAsset() {  //UNLOGGED
		var i;
		var c, r;

		Randomizer.Shuffle(this.NeighbouringTiles, INITIALIZE);
		for (i=0;i<NeighbouringTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[this.NeighbouringTiles[i]][0];
			r = this.Tile.R + NeighbouringTiles[this.NeighbouringTiles[i]][1];
			if (Map.Tiles[c][r].City)
				if (!Map.Tiles[c][r].City.Clan)
					return (Map.Tiles[c][r].City);
			if (Map.Tiles[c][r].Platform)
				if (!Map.Tiles[c][r].Platform.Clan)
					return (Map.Tiles[c][r].Platform);
			if (Map.Tiles[c][r].Stack)
				if (!Map.Tiles[c][r].Stack.Clan)
					return (Map.Tiles[c][r].Stack);
		}
	},
	CaptureCity(city) {  //UNLOGGED

		this.Clan.AddCity(city);
		++city.TurnsLeft;					//necessary step since cities will be Updated soon after
		//-keep a stat accounting for cities captured
	},
	CapturePlatform(pltfrm) {  //UNLOGGED

		this.Clan.AddPlatform(pltfrm);  //TODO: only for neutral platforms, since otherwise will trigger a battle
		//-keep a stat accounting for platform captured, which is the only reason for this method to even exist
	},
	Merge(stack) {

		while (stack.length<STACK.UNITS.MAX) {
			stack.Units.push(this.Units.PopFront());
			if (this.Units.length==0) {
				stack.SortStrongestToWeakest();
				return (this);
			}
		}

		stack.SortStrongestToWeakest();

		return (this);
	}
};
