/*
		** stacks must be de-selected by clicking on them to click on adjacent cities/platforms/stacks with no attacking intent
		** clicking on own city adjacent to selected stack allows teleportation
*/
//--------------------------------------------------
//---------- TACTICAL PLAY VIEW --------------------
var TacticalPlayView = function() {
	var CityImages, DigitImages, SelectionImage;
	var TinyOctagon, SmallOctagon, MediumOctagon, LargeOctagon, HugeOctagon, Octagons;
	var Clan;
	var SelectedStack;
	var DarkMapFlag, DarkGrid;		//.DarkGrid used for Mouse Clicks
	var InvalidOffset;
};
TacticalPlayView.prototype = new GenieView();
TacticalPlayView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	this.DarkGrid = ArrayUtils.Create2D(this.Specs.TILE.R, this.Specs.TILE.C);
};
TacticalPlayView.prototype.SetData = function() {

	this.TinyOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.TINY);
	this.SmallOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.SMALL);
	this.MediumOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.MEDIUM);
	this.LargeOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.LARGE);
	this.HugeOctagon = Geometry.GetOctagonVertices(MAP.TILE.W*ISLAND.SIZE.HUGE);
	this.Octagons = [ this.TinyOctagon, this.SmallOctagon, this.MediumOctagon, this.LargeOctagon, this.HugeOctagon ];

	this.InvalidOffset = Math.floor((this.Specs.TILE.W-NoEntryImage.Specs.W)/2);
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

	//TEMP
	var MockUp = new GenieImage();
	MockUp.Set(this.Context, ImageManager.Pics[IMAGeINDEX.MOCKUP1], { L: 2, T: 2, W: 331, H: 335 } );
	TacticalScape.ControlPanel.drawImage(MockUp.Pic, 150, 281, 140, 43, 3, 205, 140, 43);
};
TacticalPlayView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	this.UpdateClick();
	this.UpdateKeys();
};
TacticalPlayView.prototype.Draw = function() {

	Graphics.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, MAP.COLOUR.SEA, 0);
	this.DrawIslands();
	Platforms.forEach( function(pltfrm) {if (pltfrm.CheckOnScreen()) pltfrm.Draw();} );
	this.DrawStacks();
	this.DrawGrid();
	if (Map.CheckDarkMapOn())
		this.DrawDarkMap();
};
TacticalPlayView.prototype.DrawTile = function(tile) {  //to be REDUNDANT
	var x, y;

	//Draw background
	x = (tile.C-TopLeftTile.C) * MAP.TILE.W;
	y = (tile.R-TopLeftTile.R) * MAP.TILE.H;
	if (tile.Type==MAP.TILE.LAND)
		Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.LAND, 0);
	else
		Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, MAP.COLOUR.SEA, 0);
	Graphics.DrawRect(x, y, MAP.TILE.W, MAP.TILE.H, "white", 1, 0.1);

	//Display stack if one exists
	if (Map.Tiles[tile.C][tile.R].Stack) {
		Map.Tiles[tile.C][tile.R].Stack.Display();
		Map.Tiles[tile.C][tile.R].Stack.DisplayStrength();
		if (Map.Tiles[tile.C][tile.R].Stack===this.SelectedStack)
			this.SelectionImage.Draw(x+1, y+1);
	}
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
