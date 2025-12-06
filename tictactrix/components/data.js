
TacticalComponents.prototype.SetTileData = function() {

	TinyIslandClearTiles = [ ];
	SmallIslandClearTiles = [ ];
	MediumIslandClearTiles = [ [-4,-4],[4,-4],[4,4],[-4,4] ];
	LargeIslandClearTiles = [ [-6,-6],[6,-6],[6,6],[-6,6] ];
	HugeIslandClearTiles = [ [-6,-6],[-5,-6],[-6,-5], [5,-6],[6,-6],[6,-5], [-6,5],[-6,6],[-5,6], [5,6],[6,6],[6,5]  ];
	CapitalIslandClearTiles = [ ];
	IslandClearTiles = [ TinyIslandClearTiles, SmallIslandClearTiles, MediumIslandClearTiles, LargeIslandClearTiles, HugeIslandClearTiles,
																																							CapitalIslandClearTiles ];
	NeighbouringTiles = [ [0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1] ];
	VisibleTiles = [ 			 [-1,-2],[0,-2],[1,-2],
						  [-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],
						  [-2, 0],[-1, 0],[0, 0],[1, 0],[2, 0],
						  [-2, 1],[-1, 1],[0, 1],[1, 1],[2, 1],
									 [-1, 2],[0, 2],[1, 2]
	];
};
TacticalComponents.prototype.SetOffsetData = function() {

	TinyCityOffsets = [ [0,0] ];
	SmallCityOffsets = [ [0,-2], [-2,0],[0,0],[2,0], [0,2] ];
	MediumCityOffsets = [ [-1,-3],[1,-3], [-3,-1],[-1,-1],[1,-1],[3,-1], [-3,1],[-1,1],[1,1],[3,1], [-1,3],[1,3] ];
	LargeCityOffsets = [ [-1,-4],[1,-4], [-2,-2],[0,-2],[2,-2], [-4,-1],[4,-1], [-2,0],[0,0],[2,0], [-4,1],[4,1], [-2,2],[0,2],[2,2], [-1,4],[1,4] ];
	HugeCityOffsets = [ [-2,-5],[0,-5],[2,-5], [-3,-3],[-1,-3],[1,-3],[3,-3], [-5,-2],[5,-2], [-3,-1],[-1,-1],[1,-1],[3,-1], [-5,0],[5,0],
							  [-3,1],[-1,1],[1,1],[3,1], [-5,2],[5,2], [-3,3],[-1,3],[1,3],[3,3], [-2,5],[0,5],[2,5] ];
	CityOffsets = [ TinyCityOffsets, SmallCityOffsets, MediumCityOffsets, LargeCityOffsets, HugeCityOffsets ];
};
TacticalComponents.prototype.SetAgentData = function() {  //UNLOGGED

	GUNNER = Object.assign({}, TROOPER, GUNNER);
	BAZOOKER = Object.assign({}, TROOPER, BAZOOKER);
	MISSILER = Object.assign({}, TROOPER, MISSILER);
};
