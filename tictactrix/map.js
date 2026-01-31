
//--------------------------------------------
//---------- TACTICAL MAP --------------------  this is for MOBILE only, which this game might be
var TacticalMap = function() {
	var GraphicsTool, Randomizer, CalcPad;
	var Specs;
	var Tiles, LightMap;
	var Grid;																			//used for island and platform generation
	var Sectors;																		//TODO: needed for naval exploration? SECTOR: { W: 5, H: 5, C: 10, R: 10 }
	var CoastalCities, PortlessCities, InlandCities;
	var CoastalCityIndices, SeaTiles, ShoreTiles;							//indices only
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

		//Tiles
		this.Grid = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);
		this.Tiles = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R, TacticalTile);
		for (r=0;r<MAP.TILE.R;++r)
			for (c=0;c<MAP.TILE.C;++c)
				this.Tiles[c][r].Set(c, r);
		this.LightMap = ArrayUtils.Create2D(MAP.TILE.C, MAP.TILE.R);

		//Cities
		this.CoastalCities = new Array(CITY.COUNT.COASTAL);
		this.PortlessCities = new Array(CITY.COUNT.PORTLESS);
		this.InlandCities = new Array(CITY.COUNT.INLAND);

		//Indices
		this.CoastalCityIndices = [ [ ],
											 [ 0,1,3,4 ],
											 [ 0,1,2,5,6,9,10,11 ],
											 [ 0,1,5,6,10,11,15,16 ],
											 [ 0,1,2,7,8,13,14,19,20,25,26,27 ]
		];
		this.SeaTiles = [ [ ],
								[ ],
								[ 0,6, 42,48 ],
								[ 0,8, 72,80 ],
								[ 0,1, 9,10, 11,21, 99,109, 110,111, 119,120 ]
		];
		this.ShoreTiles = [ [ 0,2,6,8 ],
								  [ 0,1,3,4, 5,9, 15,19, 20,21,23,24 ],
								  [ 1,5, 7,13, 35,41, 43,47 ],
								  [ 1,2,6,7,9,10,16,17,18,26,54,62,63,64,70,71,73,74,78,79 ],
								  [ 2,8, 12,20, 22,32, 88,98, 100,108, 112,118 ]
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
		var i;

		this.GenerateIslands(ISLAND.HUGE, MAP.ISLANDS.HUGE, ISLAND.SIZE.HUGE, HugeIslands);
		this.GenerateIslands(ISLAND.LARGE, MAP.ISLANDS.LARGE, ISLAND.SIZE.LARGE, LargeIslands);
		this.GenerateIslands(ISLAND.MEDIUM, MAP.ISLANDS.MEDIUM, ISLAND.SIZE.MEDIUM, MediumIslands);
		this.GenerateIslands(ISLAND.SMALL, MAP.ISLANDS.SMALL, ISLAND.SIZE.SMALL, SmallIslands);
		this.GenerateIslands(ISLAND.TINY, MAP.ISLANDS.TINY, ISLAND.SIZE.TINY, TinyIslands);

		this.GenerateCities();
		this.DistributeUnitProduction();
		this.BalanceNavalPorts();
		this.GeneratePlatforms();
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
			aIslands[i].SetTile(this.Tiles[c][r]);
			this.UpdateTiles(c, r, type);
			this.UpdateGrid(c, r, type);
		}
	},
	GenerateCities() {
		var i, j, k;
		var nCities, nCoastals, nInlands;

		nCities = 0;
		nCoastals = 0;
		nInlands = 0;
		for (i=0;i<ISLAND.TYPES;++i) {
			for (j=0;j<Islands[i].length;++j) {
				Islands[i][j].SetCities();
				for (k=0;k<Islands[i][j].Cities.length;++k) {
					Cities[nCities] = Islands[i][j].Cities[k];							//add newly created cities to universal Cities list
					if (this.CoastalCityIndices[i].includes(k)) {
						this.CoastalCities[nCoastals] = Islands[i][j].Cities[k];
						++nCoastals;
					} else {
						this.InlandCities[nInlands] = Islands[i][j].Cities[k];
						++nInlands;
					}
					++nCities;
				}
			}
		}
	},
	DistributeUnitProduction() {
		var i;
		var aCstls, aPrtlss;

		//Set naval cities
		this.PortlessCities = this.InlandCities;
		aCstls = new Array(CITY.COUNT.COASTAL);
		this.Randomizer.Shuffle(aCstls, INITIALIZE);
		for (i=0;i<CITY.COUNT.COASTAL;++i)
			if (i<CITY.COUNT.NAVAL)
				this.CoastalCities[aCstls[i]].SetUnit(TACTICAlUNIT.FRIGATE+(i % TACTICAlUNIT.VARIETIES.SEA));
			else
				this.PortlessCities.push(this.CoastalCities[aCstls[i]]);

		//Set the rest
		aPrtlss = new Array(CITY.COUNT.PORTLESS);
		this.Randomizer.Shuffle(aPrtlss, INITIALIZE);
		for (i=0;i<CITY.COUNT.PORTLESS;++i)
			if (i % TACTICAlUNIT.VARIETIES.PORTLESS<12 )
				this.PortlessCities[aPrtlss[i]].SetUnit(i % TACTICAlUNIT.VARIETIES.LAND);
			else
				this.PortlessCities[aPrtlss[i]].SetUnit(TACTICAlUNIT.HELICOPTER+(i % TACTICAlUNIT.VARIETIES.AIR));
	},
	BalanceNavalPorts() {  //ensures each island, other than tiny, has a naval city
		var i, j, k;
		var aPrts, aPrtlss, aCties;
		var iIslnd, iPrt, iCty, unit;
		var islnd;

		//Make a list of islands that have more than one naval city, and another with none
		aPrts = new Array();
		aPrtlss = new Array();
		for (i=ISLAND.SMALL;i<ISLAND.TYPES;++i)
			for (j=0;j<Islands[i].length;++j) {
				aCties = new Array();
				for (k=0;k<Islands[i][j].Cities.length;++k)
					if ( Islands[i][j].Cities[k].Unit>=TACTICAlUNIT.FRIGATE && Islands[i][j].Cities[k].Unit<=TACTICAlUNIT.BATTLESHIP )
						aCties.push(k);														//array of ports
				if (aCties.length>1)
					aPrts.push( { Island: Islands[i][j], Ports: aCties } );		//multi-port island array
				if (aCties.length==0)
					aPrtlss.push(Islands[i][j]);											//no-port island array
			}

		//Assign a naval city to islands without one
		for (i=0;i<aPrtlss.length;++i) {
			iIslnd = Randomizer.GetIndex(aPrts.length);
			iPrt = Randomizer.GetIndex(aPrts[iIslnd].Ports.length);						//pick out an island randomly with surplus ports
			islnd = aPrts[iIslnd].Island;															//start unit swap
			iCty = aPrts[iIslnd].Ports[iPrt];
			unit = islnd.Cities[iCty].Unit;
			k = Randomizer.GetIndex(aPrtlss[i].Cities.length);
			islnd.Cities[iCty].SetUnit(aPrtlss[i].Cities[k].Unit);						//pick a random coastal city to receive port
			aPrtlss[i].Cities[k].SetUnit(unit);													//complete swap
			ArrayUtils.Remove(aPrts[iIslnd].Ports, iPrt);
			if (aPrts[iIslnd].Ports.length==1)
				ArrayUtils.Remove(aPrts, iIslnd);												//release all surplus islands now with only one port
		}
	},
	GeneratePlatforms() {
		var i;
		var c, r;

		for (i=0;i<PLATFORM.COUNT;++i) {
			do {
				c = this.Randomizer.GetIndex(MAP.TILE.C-4) + 2;
				r = this.Randomizer.GetIndex(MAP.TILE.R-4) + 2;
			} while (!this.CheckTilesClear(c, r, 0));
			Platforms[i].SetTile(this.Tiles[c][r]);
			this.Tiles[c][r].Type = MAP.TILE.LAND;
			this.UpdateGrid(c, r, 0);
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
		var nTiles;

		nTiles = 0;
		for (r=-(type+1);r<=(type+1);++r)
			for (c=-(type+1);c<=(type+1);++c) {
				if (this.SeaTiles[type].includes(nTiles))
					this.Tiles[col+c][row+r].Type = MAP.TILE.SEA;
				else if (this.ShoreTiles[type].includes(nTiles))
					this.Tiles[col+c][row+r].Type = MAP.TILE.SHORE;
				else
					this.Tiles[col+c][row+r].Type = MAP.TILE.LAND;
				++nTiles;
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
	},
	AlignRects() {

		ScreenRect.L = TopLeftTile.C * MAP.TILE.W;
		ScreenRect.T = TopLeftTile.R * MAP.TILE.H;
		InfoRect.L = Math.round(ScreenRect.L*MAP.INFO.SCALE);
		InfoRect.T = Math.round(ScreenRect.T*MAP.INFO.SCALE);
	}
};
