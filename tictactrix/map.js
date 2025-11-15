
//--------------------------------------------
//---------- TACTICAL MAP --------------------  this is for MOBILE only, which this game might be
var TacticalMap = function() {
	var GraphicsTool, Randomizer, CalcPad;
	var Specs;
	var Grid, Tiles, LightMap;													//.Grid used for island generation
	var CoastalCities, NavalCities, PortlessCities, ClanCities;		//NOTE: .ClanCities array is filled in TacticalIsland class
	var CoastalCityIndices, SeaTiles, ShoreTiles;						//indices only
	var DarkMapFlag;
};
TacticalMap.prototype = {
	Set(specs, gTool, rGenerator, cPad) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
		this.Randomizer = rGenerator;
		this.CalcPad = cPad;
		this.SetData();
	},
	SetData() {
		var c, r;

		this.Grid = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);
		this.Tiles = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R, TacticalTile);
		for (r=0;r<MAP.TILE.R;++r)
			for (c=0;c<MAP.TILE.C;++c)
				this.Tiles[c][r].Set(c, r);
		this.LightMap = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);

		this.CoastalCities = new Array(CITY.COUNT.COASTAL);
		this.NavalCities = new Array(CITY.COUNT.NAVAL);
		this.PortlessCities = new Array(CITY.COUNT.PORTLESS);
		this.ClanCities = new Array();

		this.CoastalCityIndices = [ [ ],
											 [ 0,1,3,4 ],
											 [ 0,1,2,5,6,9,10,11 ],
											 [ 0,1,5,6,10,11,15,16 ],
											 [ 0,1,2,7,8,13,14,19,20,25,26,27 ]
		];
		this.SeaTiles = [ [ ],
								[ ],
								[ 0,6,42,48 ],
								[ 0,8,72,80 ],
								[ 0,1,9,10,11,21,99,109,110,111,118,119 ]
		];
		this.ShoreTiles = [ [ 0,2,6,8 ],
								  [ 0,4,5,9,15,19,20,24 ],
								  [ 1,5,6,13,35,41,43,47 ],
								  [ 1,2,6,7,9,10,16,17,18,26,54,62,63,64,70,71,73,74,78,79 ],
								  [ 2,8,12,20,22,32,88,98,100,108,112,118 ]
		];
	},
	UpdateLightMap(col, row, clan) {
		var i;
		var c, r;

		for (i=0;i<VisibleTiles.length;++i) {
			c = col + VisibleTiles[i][0];
			r = row + VisibleTiles[i][1];
			if (this.CheckTileValid(c, r))
				this.LightMap[c][r] = BitUtils.AddBit(this.LightMap[c][r], clan.Index);
		}
	},
	Generate() {  //NOTE: done in reverse order (instead of ascending in terms of size) for better fits

		this.GenerateIslands(ISLAND.HUGE, MAP.ISLANDS.HUGE, ISLAND.SIZE.HUGE, HugeIslands);
		this.GenerateIslands(ISLAND.LARGE, MAP.ISLANDS.LARGE, ISLAND.SIZE.LARGE, LargeIslands);
		this.GenerateIslands(ISLAND.MEDIUM, MAP.ISLANDS.MEDIUM, ISLAND.SIZE.MEDIUM, MediumIslands);
		this.GenerateIslands(ISLAND.SMALL, MAP.ISLANDS.SMALL, ISLAND.SIZE.SMALL, SmallIslands);
		this.GenerateIslands(ISLAND.TINY, MAP.ISLANDS.TINY, ISLAND.SIZE.TINY, TinyIslands);

		this.GenerateCities();
	},
	GenerateIslands(type, nIslands, size, aIslands) {
		var i;
		var c, r;

		size += 2;		//add a 'safety' border coastline
		for (i=0;i<nIslands;++i) {
			do {
				c = this.Randomizer.GetIndex(MAP.TILE.C-(size-1));
				c += (size-1) / 2;
				r = this.Randomizer.GetIndex(MAP.TILE.R-(size-1));
				r += (size-1) / 2;
			} while (!this.CheckTilesClear(c, r, type));
			aIslands[i].SetTile(c, r);
			this.UpdateTiles(c, r, type);
			this.UpdateGrid(c, r, type);
		}
	},
	GenerateCities() {
		var i, j;
		var nCities;

		nCities = 0;
		for (i=0;i<ISLAND.TYPES;++i) {
			for (j=0;j<Islands[i].length;++j) {
				Islands[i][j].SetCities(nCities);
				nCities += Islands[i][j].Cities.length;
			}
		}
	},
	CheckTilesClear(col, row, size) {  //checks if grid is clear, skipping tiles beyond the edges
		var c, r;

		for (c=-(size+2);c<(size+2);++c)
			for (r=-(size+2);r<(size+2);++r) {
				if (this.CheckClippedTile(c, r, size))
					continue;
				if (this.Grid[col+c][row+r])
					return (false);
			}

		return (true);
	},
	CheckClippedTile(col, row, size) {
		var i;

		for (i=0;i<IslandClearTiles[size].length;++i)
			if ( IslandClearTiles[size][i][0]==col && IslandClearTiles[size][i][1]==row )
				return (true);
	},
	UpdateTiles(col, row, type) {
		var c, r;
		var nTile;

		nTile = 0;
		for (r=-(type+1);r<(type+1);++r)
			for (c=-(type+1);c<(type+1);++c) {
				if (this.SeaTiles.includes(nTile))
					this.Tiles[col+c][row+r].Type = MAP.TILE.SEA;
				else if (this.ShoreTiles.includes(nTile))
					this.Tiles[col+c][row+r].Type = MAP.TILE.SHORE;
				else
					this.Tiles[col+c][row+r].Type = MAP.TILE.LAND;
			}
	},
	UpdateGrid(col, row, size) {
		var c, r;

		for (c=-(size+2);c<(size+2);++c)
			for (r=-(size+2);r<(size+2);++r) {
				if (this.CheckClippedTile(c, r, size))
					continue;
				this.Grid[col+c][row+r] = 1;		//TODO: this will likely eventually point to a tile
			}
	},
	CheckTileValid(col, row) {

		if ( col<0 || col>=MAP.TILE.C || row<0 || row>=MAP.TILE.R )
			return (false);

		return (true);
	},
	ActivateDarkMap() {

		this.DarkMapFlag = true;
	},
	DeactivateDarkMap() {

		this.DarkMapFlag = false;
	},
	CheckDarkMapOn() {

		return (this.DarkMapFlag);
	},
	CheckNeighbouringTiles(tile1, tile2) {

		return ( Math.abs(tile1.C-tile2.C)<2 && Math.abs(tile1.R-tile2.R)<2 );
	},
	CheckTileDark(col, row, clan) {

		return ( (this.LightMap[col][row] & Math.pow(2, clan.Index))==0 );
	}
};
