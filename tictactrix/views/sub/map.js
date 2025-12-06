
//------------------------------------------------------
//---------- TACTICAL MAP INFO VIEW --------------------
var TacticalMapInfoView = function() {
	var Clan;
};
TacticalMapInfoView.prototype = new GenieSubView();
TacticalMapInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
TacticalMapInfoView.prototype.SetClan = function(clan) {

	this.Clan = clan;
};
TacticalMapInfoView.prototype.Draw = function() {

	Graphics.SetContext(this.Context);

	//Sea
	this.Context.fillStyle = MAP.COLOUR.SEA;
	this.Context.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

	this.DrawIslands();
	this.DrawPlatforms();
	if (Map.CheckDarkMapOn())
		this.DrawDarkMap();

	//Info rect
	Graphics.DrawRectangle(InfoRect.L, InfoRect.T, InfoRect.W, InfoRect.H, "red", 1);

	Graphics.ResetContext();
};
TacticalMapInfoView.prototype.UpdateClick = function() {

	//Adjust info rect
	InfoRect.L = Mouse.Click.X - (InfoRect.W/2);
	InfoRect.T = Mouse.Click.Y - (InfoRect.H/2);
	InfoRect.L -= InfoRect.L % this.Specs.TILE.W;		//align with tiles
	InfoRect.T -= InfoRect.T % this.Specs.TILE.H;

	//Ensure it's not 'off canvas'
	if (InfoRect.L<0)
		InfoRect.L = 0;
	if (InfoRect.T<0)
		InfoRect.T = 0;
	if (InfoRect.L+InfoRect.W>INFoBOX.WIDTH)
		InfoRect.L = INFoBOX.WIDTH - InfoRect.W;
	if (InfoRect.T+InfoRect.H>INFoBOX.HEIGHT)
		InfoRect.T = INFoBOX.HEIGHT - InfoRect.H;

	//Adjust screen rect
	TopLeftTile.C = InfoRect.L / this.Specs.TILE.W;
	TopLeftTile.R = InfoRect.T / this.Specs.TILE.H;
	ScreenRect.L = MAP.TILE.W * TopLeftTile.C;
	ScreenRect.T = MAP.TILE.H * TopLeftTile.R;

	this.Draw();
	this.MainView.Draw();
};
TacticalMapInfoView.prototype.DrawIslands = function() {
	var i, j, k;
	var x, y;

	for (i=0;i<Islands.length;++i)
		for (j=0;j<Islands[i].length;++j) {

			//octagons
			x = this.Specs.TILE.W * (Islands[i][j].Tile.C+0.5);
			y = this.Specs.TILE.H * (Islands[i][j].Tile.R+0.5);
			Graphics.DrawOctagon(x, y, this.Specs.TILE.W*((2*i)+3), MAP.COLOUR.LAND, 0);

			//cities
			for (k=0;k<Islands[i][j].Cities.length;++k) {
				x = this.Specs.TILE.W * (Islands[i][j].Cities[k].Tile.C+0.5);
				y = this.Specs.TILE.H * (Islands[i][j].Cities[k].Tile.R+0.5);
				if (Islands[i][j].Cities[k].Clan)
					Graphics.DrawCircle(x, y, this.Specs.TILE.W/2, ClanColours[Islands[i][j].Cities[k].Clan.Index][0], 0);
				else
					Graphics.DrawCircle(x, y, this.Specs.TILE.W/2, ClanColours[CLAN.NEUTRAL][0], 0);
			}
		}
};
TacticalMapInfoView.prototype.DrawPlatforms = function() {
	var i;
	var x, y;

	for (i=0;i<PLATFORM.COUNT;++i) {
		x = this.Specs.TILE.W * (Platforms[i].Tile.C+0.5);
		y = this.Specs.TILE.H * (Platforms[i].Tile.R+0.5);
		if (Platforms[i].Clan)
			Graphics.DrawDiamond(x, y, this.Specs.TILE.W/2, ClanColours[Platforms[i].Clan.Index][0], 0);
		else
			Graphics.DrawDiamond(x, y, this.Specs.TILE.W/2, ClanColours[CLAN.NEUTRAL][0], 0);
	}
};
TacticalMapInfoView.prototype.DrawDarkMap = function() {
	var c, r;
	var x, y;

	for (r=0;r<MAP.TILE.R;++r)
		for (c=0;c<MAP.TILE.C;++c) {
			if (Map.CheckTileDark(c, r, this.Clan)) {
				x = this.Specs.TILE.W * c;
				y = this.Specs.TILE.H * r;
				Graphics.DrawRectangle(x, y, this.Specs.TILE.W, this.Specs.TILE.H, "black", 0);
			}
		}
};
