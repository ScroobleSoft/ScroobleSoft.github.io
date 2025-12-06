
//-----------------------------------------------
//---------- TACTICAL ISLAND --------------------
var TacticalIsland = function() {
	var Type;
	var Tile;		//centre of island
	var Cities;
	var GridRect;
};
TacticalIsland.prototype = {
	Set() {
		this.Tile = new GenieTile();
		this.GridRect = new GenieRect();
		this.GridRect.Set(0, 0, MAP.TILE.C, MAP.TILE.R);
	},
	SetType(type) {

		this.Type = type;
		this.Cities = new GenieArray();
		this.Cities.Set(ISLAND.CITIES[this.Type], TacticalCity);
	},
	SetTile(tile) {

		this.Tile = tile;
	},
	SetCities(iCity) {
		var i;
		var c, r;

		for (i=0;i<this.Cities.length;++i) {
			c = this.Tile.C + CityOffsets[this.Type][i][0];
			r = this.Tile.R + CityOffsets[this.Type][i][1];
			this.Cities[i].SetTile( Map.Tiles[c][r] );
			this.Cities[i].SetIsland(this);
		}
	},
	CheckOnScreen() {
		var pnt, rds;

		pnt = { X: this.Tile.C+0.5, Y: this.Tile.R+0.5 };
		rds = 3 + (2*this.Type);

		this.GridRect.L = TopLeftTile.C;
		this.GridRect.T = TopLeftTile.R;

		return (SpaceUtils.CheckBoxCircleIntersection(this.GridRect, pnt, rds));
	}
};
