
//------------------------------------------------------
//---------- TACTICAL FULL MAP VIEW --------------------
var TacticalScreenMapView = function() {
	var TinyOctagon, SmallOctagon, MediumOctagon, LargeOctagon, HugeOctagon, Octagons;
	var Clan;
	var GridFlag;
};
TacticalScreenMapView.prototype = new GenieView();
TacticalScreenMapView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.GridFlag = true;
	this.SetData();
};
TacticalScreenMapView.prototype.SetData = function() {

	this.TinyOctagon = Geometry.GetOctagonVertices(this.Specs.TILE.W*ISLAND.SIZE.TINY);
	this.SmallOctagon = Geometry.GetOctagonVertices(this.Specs.TILE.W*ISLAND.SIZE.SMALL);
	this.MediumOctagon = Geometry.GetOctagonVertices(this.Specs.TILE.W*ISLAND.SIZE.MEDIUM);
	this.LargeOctagon = Geometry.GetOctagonVertices(this.Specs.TILE.W*ISLAND.SIZE.LARGE);
	this.HugeOctagon = Geometry.GetOctagonVertices(this.Specs.TILE.W*ISLAND.SIZE.HUGE);
	this.Octagons = [ this.TinyOctagon, this.SmallOctagon, this.MediumOctagon, this.LargeOctagon, this.HugeOctagon ];
};
TacticalScreenMapView.prototype.SetClan = function(clan) {

	this.Clan = clan;
};
TacticalScreenMapView.prototype.Open = function() {  //UNLOGGED - TEMP, should be REDUNDANT
	GenieView.prototype.Open.call(this);

	//TEMP
	var MockUp = new GenieImage();
	MockUp.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOCKUP1], { L: 2, T: 2, W: 331, H: 335 } );
	TacticalScape.InfoBox.fillStyle = GREY.LIGHT;
	TacticalScape.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	TacticalScape.InfoBox.drawImage(MockUp.Pic, 204, 138, 124, 54, 65, 40, 124, 54);
	TacticalScape.InfoBox.drawImage(MockUp.Pic, 204, 194, 124, 56, 65, 125, 124, 56);
};
TacticalScreenMapView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {  //TODO: call ::Close, as is usual, especially when this has sub-views
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.AlignRects();
		PlayView.SetClan(this.Clan);
		PlayView.Open();
		PlayView.Update();
	}
};
TacticalScreenMapView.prototype.Draw = function() {

	Graphics.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, MAP.COLOUR.SEA, 0);
	this.DrawIslands();
	Platforms.forEach( function(pltfrm) {pltfrm.MiniDraw();} );
	if (this.GridFlag)
		this.DrawGrid();
//	if (Map.CheckDarkMapOn())
//		this.DrawDarkMap();
};
TacticalScreenMapView.prototype.DrawIslands = function() {
	var i, j, k;
	var x, y;

	for (i=0;i<ISLAND.TYPES;++i)
		for (j=0;j<Islands[i].length;++j) {

			//Lsnd mass
			x = this.Specs.TILE.W * (Islands[i][j].Tile.C+0.5);
			y = this.Specs.TILE.H * (Islands[i][j].Tile.R+0.5);
			Graphics.DrawPolygon(x, y, this.Octagons[i], MAP.COLOUR.LAND, 0);

			//Cities
			for (k=0;k<Islands[i][j].Cities.length;++k) {
				x = this.Specs.TILE.W * Islands[i][j].Cities[k].Tile.C;
				y = this.Specs.TILE.H * Islands[i][j].Cities[k].Tile.R;
				if (Islands[i][j].Cities[k].Clan)
					CityOctagonImages.DrawPatchNumber(Islands[i][j].Cities[k].Clan.Index, x, y);
				else
					CityOctagonImages.DrawPatchNumber(CLAN.NEUTRAL, x, y);
//				Text.Write(Islands[i][j].Cities[k].Unit, x-6, y-2, { COLOUR: "white" } );		TEMP
			}
		}
};
TacticalScreenMapView.prototype.DrawGrid = function() {
	var c, r;

	for (c=0;c<SCREEN.WIDTH;c+=this.Specs.TILE.W)
		for (r=0;r<SCREEN.HEIGHT;r+=this.Specs.TILE.H)
			Graphics.DrawRectangle(c, r, this.Specs.TILE.W, this.Specs.TILE.H, "white", 1, 0.1);
};
TacticalScreenMapView.prototype.DrawDarkMap = function() {
	var r, c;

	for (r=0;r<MAP.TILE.R;++r)
		for (c=0;c<MAP.TILE.C;++c)
			if (Map.CheckTileDark(c, r, this.Clan))
				Graphics.DrawRectangle(this.Specs.TILE.W*c, this.Specs.TILE.H*r, this.Specs.TILE.W, this.Specs.TILE.H, "black", 0);
};
TacticalScreenMapView.prototype.AlignRects = function() {

	//Cols
	TopLeftTile.C = Math.floor(Mouse.Click.X/this.Specs.TILE.W) - (VIEW.PLAY.TILE.C/2);
	if (TopLeftTile.C<0)
		TopLeftTile.C = 0;
	if (TopLeftTile.C>(MAP.TILE.C-VIEW.PLAY.TILE.C))
		TopLeftTile.C = MAP.TILE.C - VIEW.PLAY.TILE.C;
	InfoRect.L = TopLeftTile.C * VIEW.PLAY.INFO.TILE.W;
	ScreenRect.L = TopLeftTile.C * MAP.TILE.W;

	//Rows
	TopLeftTile.R = Math.floor(Mouse.Click.Y/this.Specs.TILE.H) - (VIEW.PLAY.TILE.R/2);
	if (TopLeftTile.R<0)
		TopLeftTile.R = 0;
	if (TopLeftTile.R>(MAP.TILE.R-VIEW.PLAY.TILE.R))
		TopLeftTile.R = MAP.TILE.R - VIEW.PLAY.TILE.R;
	InfoRect.T = TopLeftTile.R * VIEW.PLAY.INFO.TILE.H;
	ScreenRect.T = TopLeftTile.R * MAP.TILE.H;
};
