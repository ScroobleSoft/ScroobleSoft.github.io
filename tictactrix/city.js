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
		this.Turns = CITY.PRODUCTION.TURNS;
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
