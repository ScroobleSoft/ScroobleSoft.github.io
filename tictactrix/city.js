
//---------------------------------------------
//---------- TACTICAL CITY --------------------
var TacticalCity = function() {
	var Clan;
	var Island;
	var Unit;		//index
	var Tile;		//TODO: this will hold garrison? will there be a garrison?
	var Turns;
};
TacticalCity.prototype = {
	Set() {
		this.Tile = new GenieTile();
		this.Turns = CITY.PRODUCTION.TURNS;
	},
	SetClan(clan) {

		this.Clan = clan;
	},
	SetIsland(island) {

		this.Island = island;
	},
	SetTile(c, r) {

		this.Tile.Set(c, r);
	},
	CheckOnScreen() {

		if ( this.Tile.C<TopLeftTile.C || this.Tile.R<TopLeftTile.R )
			return (false);
		if ( this.Tile.C>=(TopLeftTile.C+MAP.TILE.SCREEN.C) || this.Tile.R>=(TopLeftTile.R+MAP.TILE.SCREEN.R) )
			return (false);

		return (true);
	},
	Update() {  //UNLOGGED

		--this.Turns;
		if (!this.Turns) {
			this.ProduceUnit();
			this.Turns = CITY.PRODUCTION.TURNS;
		}
	},
	ProduceUnit() {  //UNLOGGED
		var i;
		var aTiles;		//indices

		aTiles = new Array(NeighbouringTiles.length);
		Randomizer.Shuffle(aTiles, INITIALIZE);

		//First look for empty tiles
		for (i=0;i<aTiles.length;++i) {
			c = this.Tile.C + NeighbouringTiles[aTiles[i]][0];
			r = this.Tile.R + NeighbouringTiles[aTiles[i]][1];
			if (Map.Tiles[c][r].Stack)		//skip empty tiles
				continue;
			if (Map.Tiles[c][r].Type==MAP.TILE.SEA) {
				if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.NAVY) {
					TacticalUtils.CreateStack(TACTICAlUNIT.TYPE.SEA, this.Clan, Map.Tiles[c][r], this.Unit);
					return;
				} else if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.AIrFORCE) {
					TacticalUtils.CreateStack(TACTICAlUNIT.TYPE.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
					return;
				}
			} else if (Map.Tiles[c][r].Type==MAP.TILE.LAND) {
				if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.ARMY) {
					TacticalUtils.CreateStack(TACTICAlUNIT.TYPE.LAND, this.Clan, Map.Tiles[c][r], this.Unit);
					return;
				} else if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.AIrFORCE) {
					TacticalUtils.CreateStack(TACTICAlUNIT.TYPE.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
					return;
				}
			} else  //shore tile
				if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.AIrFORCE) {
					TacticalUtils.CreateStack(TACTICAlUNIT.TYPE.AIR, this.Clan, Map.Tiles[c][r], this.Unit);
					return;
				}
		}

		//If no empty tile was found, add to a neighbouring stack
		if (i==aTiles.length)
			for (i=0;i<aTiles.length;++i) {
				c = this.Tile.C + NeighbouringTiles[aTiles[i]][0];
				r = this.Tile.R + NeighbouringTiles[aTiles[i]][1];
				if (Map.Tiles[c][r].Type==MAP.TILE.SEA) {
					if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.NAVY) {
						if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
							return;
					}
				} else if (Map.Tiles[c][r].Type==MAP.TILE.LAND) {
					if (TacticalUtils.GetUnitType()==CITY.PRODUCTION.TYPE.ARMY) {
						if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
							return;
					}
				} else
					if (Map.Tiles[c][r].Stack.AddUnit(this.Unit))
						return;
			}

		//If all stacks were full, maybe teleport? fill a slightly further tile?
		//-TODO:
	}
};
