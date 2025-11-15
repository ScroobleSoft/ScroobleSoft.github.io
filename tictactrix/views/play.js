
//--------------------------------------------------
//---------- TACTICAL PLAY VIEW --------------------
var TacticalPlayView = function() {
	var CityImages, DigitImages, SelectionImage;
	var TinyOctagon, SmallOctagon, MediumOctagon, LargeOctagon, HugeOctagon, Octagons;
	var Clan;
	var SelectedStack;
	var DarkMapFlag, DarkGrid;		//.DarkGrid used for Mouse Clicks
	var State;		//TEMP
};
TacticalPlayView.prototype = new GenieView();
TacticalPlayView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.DarkGrid = ArrayUtils.Create2D(this.Specs.TILE.R, this.Specs.TILE.C);
	this.State = 0;		//TEMP
};
TacticalPlayView.prototype.SetData = function() {

	this.TinyOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.TINY);
	this.SmallOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.SMALL);
	this.MediumOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.MEDIUM);
	this.LargeOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.LARGE);
	this.HugeOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.HUGE);
	this.Octagons = [ this.TinyOctagon, this.SmallOctagon, this.MediumOctagon, this.LargeOctagon, this.HugeOctagon ];
};
TacticalPlayView.prototype.SetImages = function() {

	this.CityImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.CITY);
	this.DigitImages = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.DIGITS);
	this.SelectionImage = this.SetImage(ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
};
TacticalPlayView.prototype.SetClan = function(clan) {

	this.Clan = clan;
	this.InfoView.SetClan(this.Clan);
};
TacticalPlayView.prototype.Open = function() {  //UNLOGGED - TEMP, should be REDUNDANT
	GenieView.prototype.Open.call(this);

//	if (Map.CheckDarkMapOn())
//		this.DrawDarkMap();		//TEMP, sort of

	//TEMP
	var MockUp = new GenieImage();
	MockUp.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOCKUP1], { L: 2, T: 2, W: 331, H: 335 } );
	TacticalScape.ControlPanel.drawImage(MockUp.Pic, 150, 252, 140, 27, 3, 170, 140, 27);
	TacticalScape.ControlPanel.drawImage(MockUp.Pic, 150, 281, 140, 43, 3, 205, 140, 43);
};
TacticalPlayView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.State==0) {		//TEMP
		if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
			this.DrawDarkMap();
			Map.ActivateDarkMap();
			++this.State;
		}
	} else {		//end TEMP
		this.UpdateClick();
		this.UpdateKeys();
	}
};
TacticalPlayView.prototype.Draw = function() {
	var i;
	var c, r;

	Graphics.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, MAP.COLOUR.SEA, 0);
	this.DrawIslands();
	this.DrawStacks();
	this.DrawGrid();
	if (Map.CheckDarkMapOn())
		this.DrawDarkMap();
};
TacticalPlayView.prototype.DrawIslands = function() {
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
TacticalPlayView.prototype.DrawCities = function(island) {
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
TacticalPlayView.prototype.DrawStacks = function() {
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

	this.InfoView.DrawDarkMap()
};
TacticalPlayView.prototype.UpdateClick = function() {  //UNLOGGED

	if (Mouse.CheckLeftClicked(CANVAS.PRIME)) {
		this.UpdateCanvasClick();
	} else if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
		this.InfoView.UpdateClick();
		this.Draw();
	} else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE)) {
	}
};
TacticalPlayView.prototype.UpdateCanvasClick = function() {  //UNLOGGED
	var tile;
	var actn;

	//Screen for dark map
	tile = this.GetTileClicked();
	if (this.DarkMapFlag)
		if (this.DarkGrid[tile.C][tile.R])
			return;

	//Select stack if the tile has one
	if (Map.Tiles[tile.C][tile.R].Stack) {
		this.SelectedStack = Map.Tiles[tile.C][tile.R].Stack;
		this.DrawTile(Map.Tiles[tile.C][tile.R]);
		//-show stack contents in console
		return;
	}

	//Check which stack should take place
	if (this.SelectedStack)
		if (Map.CheckNeighbouringTiles(this.SelectedStack.Tile, tile)) {
			actn = this.SelectedStack.DetermineAction(tile);
			switch (actn) {
				case STACK.ACTION.MOVE:
					this.MoveStack(tile);
					break;
				case STACK.ACTION.TRANSFER:
					this.Close(this.OpenTransferView.bind(this), 100);
					break;
				case STACK.ACTION.TELEPORT:
					this.Close(this.OpenTeleportView.bind(this), 100);
					break;
				case STACK.ACTION.ATTACK:
					this.Close(this.OpenCombatView.bind(this), 100);
					break;
				case STACK.ACTION.CAPTURE:
					this.CaptureCity(tile.City);
					break;
			}
		}
};
TacticalPlayView.prototype.UpdateKeys = function() {  //UNLOGGED - REDUNDANT unless a desktop game is made
};
TacticalPlayView.prototype.GetTileClicked = function() {  //NOTE: returns map tile indices
	var c, r;

	c = Math.floor(Mouse.Click.X/MAP.TILE.W);
	r = Math.floor(Mouse.Click.Y/MAP.TILE.H);

	return ( { C: TopLeftTile.C+c, R: TopLeftTile.R+r } );
};
TacticalPlayView.prototype.MoveStack = function(tile) {  //UNLOGGED
	var tle;

	//TODO: check if a move is even possible (depends on whether it is a land/sea/air unit)

	tle = this.SelectedStack.Tile;
	Map.Tiles[tile.C][tile.R].SetStack(this.SelectedStack);
	this.SelectedStack.SetTile(tile);
	Map.Tiles[tle.C][tle.R].SetStack(null);
	this.DrawTile(tile);
	this.DrawTile(tle);
};
TacticalPlayView.prototype.DrawTile = function(tile) {
	var x, y;

	x = (tile.C-TopLeftTile.C) * MAP.TILE.W;
	y = (tile.R-TopLeftTile.R) * MAP.TILE.H;
	if (tile.Type==MAP.TILE.LAND)
		Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.LAND, 0);
	else
		Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.SEA, 0);
	Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, "white", 1, 0.1);
	tile.Stack.Display();
	if (tile.Stack===this.SelectedStack)
		this.SelectionImage.Draw(x+1, y+1);
};
TacticalPlayView.prototype.CaptureCity = function(city) {  //UNLOGGED

	//-stack doesn't move
	//-city transfers to clan, it's colour changing
	//-if city had been owned by foe, it has to be removed from city list
};
TacticalPlayView.prototype.OpenTransferView = function() {  //UNLOGGED
/*
	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
*/
};
TacticalPlayView.prototype.OpenTeleportView = function() {  //UNLOGGED
/*
	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
*/
};
TacticalPlayView.prototype.OpenCombatView = function() {  //UNLOGGED
/*
	this.ConsoleView.Close();
	this.SetConsoleView(DocumentationConsoleView);
	GuideView.Open();
	GuideView.Update();
*/
};
