/*
		** cities can also be used to transfer units to any garrison around them
*/
//---------------------------------------------
//---------- TACTICAL CITY --------------------
var TacticalCity = function() {
	var Clan;
	var Island;
	var Unit;						//index
	var Tile;
	var TurnsLeft;
	var ContentsVisibleFlag;
};
TacticalCity.prototype = {
	Set() {
		this.Tile = new GenieTile();
	},
	SetUnit(unit) {

		this.Unit = unit;
		this.TurnsLeft = UnitTurns[this.Unit];
	},
	SetClan(clan) {

		this.Clan = clan;
	},
	SetIsland(island) {

		this.Island = island;
	},
	SetTile(tile) {

		this.Tile = tile;
		this.Tile.City = this;
	},
	GetAssetType() {

		return (TACTICAL.ASSET.CITY);
	},
	CheckOnScreen() {

		if ( this.Tile.C<TopLeftTile.C || this.Tile.R<TopLeftTile.R )
			return (false);
		if ( this.Tile.C>=(TopLeftTile.C+MAP.TILE.SCREEN.C) || this.Tile.R>=(TopLeftTile.R+MAP.TILE.SCREEN.R) )
			return (false);

		return (true);
	},
	Update() {  //UNLOGGED

		--this.TurnsLeft;
		if (!this.TurnsLeft) {
			this.ProduceUnit();
			this.TurnsLeft = UnitTurns[this.Unit];
		}
	},
	ProduceUnit() {  //UNLOGGED
		var i;
		var aTiles;		//indices
		var type;

		aTiles = new Array(NeighbouringTiles.length);																//make an array of neighbouring tiles
		Randomizer.Shuffle(aTiles, INITIALIZE);																		//shuffle the tiles
		type = TacticalUtils.GetUnitType(this.Unit);

		//Look for empty tiles, place unit there
		for (i=0;i<aTiles.length;++i) {

			c = this.Tile.C + NeighbouringTiles[aTiles[i]][0];
			r = this.Tile.R + NeighbouringTiles[aTiles[i]][1];
			if (Map.Tiles[c][r].Stack)																						//skip tiles occupied by own stack or opponent's
				continue;

			switch (Map.Tiles[c][r].Type) {
				case MAP.TILE.LAND:
					if (type==TACTICAlUNIT.TYPE.LAND) {																	//if land tile, create army or air force stack
						TacticalUtils.CreateStack(STACK.LAND, this.Clan, Map.Tiles[c][r], this.Unit);
						return;
					} else if (type==TACTICAlUNIT.TYPE.AIR) {
						TacticalUtils.CreateStack(STACK.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
						return;
					}
					break;
				case MAP.TILE.SEA:
					if (type==TACTICAlUNIT.TYPE.SEA) {																	//if sea tile, create naval or air force stack
						TacticalUtils.CreateStack(STACK.SEA, this.Clan, Map.Tiles[c][r], this.Unit);
						return;
					} else if (type==TACTICAlUNIT.TYPE.AIR) {
						TacticalUtils.CreateStack(STACK.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
						return;
					}
					break;
				default:		//shore tile
					if (type==TACTICAlUNIT.TYPE.AIR) {																//if air unit, create stack
						TacticalUtils.CreateStack(STACK.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
						return;
					}
					break;
			}
		}

		//If no empty tile was found, add to a neighbouring stack
		if (i==aTiles.length)																								//check if no empty tiles are found
			for (i=0;i<aTiles.length;++i) {

				c = this.Tile.C + NeighbouringTiles[aTiles[i]][0];
				r = this.Tile.R + NeighbouringTiles[aTiles[i]][1];
				if (!Map.Tiles[c][r].Stack)																				//skip if there is no stack on tile
					continue;
				if (!(Map.Tiles[c][r].Stack.Clan===PlayerClan))														//skip rival stacks
					continue;

				switch (Map.Tiles[c][r].Stack.Type) {
					case STACK.LAND:
						if (type==TACTICAlUNIT.TYPE.LAND)																//if army unit, add to stack on land tile
							if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
								return;
						break;
					case STACK.SEA:
						if (type==TACTICAlUNIT.TYPE.SEA)																	//if naval unit, add to stack on sea tile
							if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
								return;
						break;
					default:
						if (type==STACK.AIR)																	//if air force unit, add to stack on air tile
							if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
								return;
						break;
				}
			}

		//-TODO: if all stacks were full, maybe teleport? fill a slightly further tile?
	},
	Draw() {  //UNLOGGED - should city images move out of play view?
		var x, y;
		var nClan;

		x = MAP.TILE.W * (this.Tile.C-TopLeftTile.C);
		x += VIEW.PLAY.IMAGE.CITY.OFFSET.X;
		y = MAP.TILE.H * (this.Tile.R-TopLeftTile.R);
		y += VIEW.PLAY.IMAGE.CITY.OFFSET.Y;

		//Determine image index
		if (this.Clan)
			nClan = this.Clan.Index;
		else
			nClan = CLAN.NEUTRAL;

		PlayView.CityImages.DrawPatchNumber(nClan, x, y);
	},
	GetNeighbouringTile() {  //returns a random neighbour - NOTE: only works for army cities surrounded entirely by land
		var c, r;
		var iTile;

		iTile = Randomizer.GetIndex(NeighbouringTiles.length);
		c = this.Tile.C + NeighbouringTiles[iTile][0];
		r = this.Tile.R + NeighbouringTiles[iTile][1];

		return (Map.Tiles[c][r]);
	},
	GetGarrsionTiles() {  //UNLOGGED - returns number of tiles that a stack can be built on
		//-depends on land/sea/air produced
	}
};
