
TacticalPlayView.prototype.DrawIslands = function() {  //TODO: move to TacticalIsland
	var i, j;
	var x, y;

	for (i=0;i<ISLAND.TYPES;++i)
		for (j=0;j<Islands[i].length;++j) {
			if (Islands[i][j].CheckOnScreen()) {
				x = MAP.TILE.W * (Islands[i][j].Tile.C+0.5-TopLeftTile.C);
				y = MAP.TILE.H * (Islands[i][j].Tile.R+0.5-TopLeftTile.R);
				Graphics.DrawPolygon(x, y, this.Octagons[i], MAP.COLOUR.LAND, 0);
				this.DrawCities(Islands[i][j]);
			}
		}
};
TacticalPlayView.prototype.DrawCities = function(island) {  //TODO: move to TacticalCity
	var i;
	var x, y;
	var nClan;

	for (i=0;i<island.Cities.length;++i)
		if (island.Cities[i].CheckOnScreen()) {

			//Coords
			x = MAP.TILE.W * (island.Cities[i].Tile.C-TopLeftTile.C);
			x += this.Specs.IMAGE.CITY.OFFSET.X;
			y = MAP.TILE.H * (island.Cities[i].Tile.R-TopLeftTile.R);
			y += this.Specs.IMAGE.CITY.OFFSET.Y;

			//Determine image index
			if (island.Cities[i].Clan)
				nClan = island.Cities[i].Clan.Index;
			else
				nClan = CLAN.NEUTRAL;

			this.CityImages.DrawPatchNumber(nClan, x, y);
		}
};
TacticalPlayView.prototype.DrawStacks = function() {  //TODO: move to TacticalStack
	var c, r;
	var stck;

	for (r=0;r<this.Specs.TILE.R;++r)
		for (c=0;c<this.Specs.TILE.C;++c)
			if (Map.Tiles[TopLeftTile.C+c][TopLeftTile.R+r].Stack) {
				stck = Map.Tiles[TopLeftTile.C+c][TopLeftTile.R+r].Stack;		//display strongest unit
				stck.Display();
				x = c * MAP.TILE.W;
				y = r * MAP.TILE.H;
				if (stck===this.SelectedStack)
					this.SelectionImage.Draw(x+1, y+1);
				x += this.Specs.IMAGE.DIGITS.OFFSET.X;
				y += this.Specs.IMAGE.DIGITS.OFFSET.Y;
				this.DigitImages.DrawPatchNumber(stck.Units.length-1, x, y);		//display stack size
			}
};
TacticalPlayView.prototype.DrawGrid = function() {
	var c, r;

	for (c=0;c<SCREEN.WIDTH;c+=MAP.TILE.W)
		for (r=0;r<SCREEN.HEIGHT;r+=MAP.TILE.H)
			Graphics.DrawRectangle(c, r, MAP.TILE.W, MAP.TILE.H, "white", 1, 0.1);
};
TacticalPlayView.prototype.DrawDarkMap = function() {
	var c, r;
	var x, y;

	for (r=0;r<this.Specs.TILE.R;++r)
		for (c=0;c<this.Specs.TILE.C;++c) {
			if (Map.CheckTileDark(TopLeftTile.C+c, TopLeftTile.R+r, this.Clan)) {
				x = this.Specs.TILE.W * c;
				y = this.Specs.TILE.H * r;
				Graphics.DrawRectangle(x, y, this.Specs.TILE.W, this.Specs.TILE.H, "black", 0);
				this.DarkGrid[c][r] = true;
			} else
				this.DarkGrid[c][r] = false;
		}
};
TacticalPlayView.prototype.DisplayMoveInvalid = function(tile) {  //draw no entry symbol
	var x, y;

	x = this.Specs.TILE.W * (tile.C-TopLeftTile.C);
	x += this.InvalidOffset;
	y = this.Specs.TILE.H * (tile.R-TopLeftTile.R);
	y += this.InvalidOffset;

	NoEntryImage.Draw(x, y);
};
