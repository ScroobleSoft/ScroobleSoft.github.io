
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
		this.Cities = new Array(ISLAND.CITIES[this.Type]);
	},
	SetTile(c, r) {

		this.Tile.Set(c, r);
	},
	SetCities(iCity) {
		var i;

		for (i=0;i<this.Cities.length;++i) {
			Cities[iCity+i].SetTile(this.Tile.C+CityOffsets[this.Type][i][0], this.Tile.R+CityOffsets[this.Type][i][1]);
			this.Cities[i] = Cities[iCity+i];
			this.Cities[i].SetIsland(this);
			if ( this.Type==ISLAND.SMALL && i==2 )
				Map.ClanCities.push(this.Cities[i]);
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
