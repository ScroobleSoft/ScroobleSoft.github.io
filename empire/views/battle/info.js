
//---------------------------------------------------------
//---------- IMPERIAL BATTLE INFO VIEW --------------------
var ImperialBattleInfoView = function() {
	var ArrowImages;
	var ArrowCentres, CircleCentre;
	var DiamondVertices, DiamondTopCorners, DiamondTiles, DiamondCoords;
	var LowlandVertices, UplandVertices;
};
ImperialBattleInfoView.prototype = new GenieSubView();
ImperialBattleInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

};
ImperialBattleInfoView.prototype.SetData = function() {
	var w, h;

	this.DiamondVertices = [ { X: 0, Y: 0 }, { X: 40, Y: 30 }, { X: 0, Y: 60 }, { X: -40, Y: 30 } ];
	this.DiamondTopCorners = [ { X:  80, Y: 33 }, { X: 120, Y:   0 }, { X: 160, Y: 33 },										//NW-N-NE
										 { X:  40, Y: 66 }, { X: 120, Y:  66 }, { X: 200, Y: 66 },										//W-C-E
										 { X:  80, Y: 99 }, { X: 120, Y: 132 }, { X: 160, Y: 99 }  ];									//SW-S-SE
	this.DiamondTiles = [ [-1,0],[-1,1],[0,1], [-1,-1],[0,0],[1,1], [0,-1],[1,-1],[1,0] ];										//NW-N-NE..W-C-E..SW-S-SE
	this.ArrowCentres = [ { X: 120, Y: 202 }, { X: 152, Y: 224 }, { X: 184, Y: 246 }, { X: 152, Y: 268 },					//N-NE-E-SE
								 { X: 120, Y: 290 }, { X:  98, Y: 268 }, { X:  66, Y: 246 }, { X:  98, Y: 224 }  ];				//S-SW-W-NW
	this.CircleCentre = new Coordinate2D();

	w = BATTLeFIELD.REGION.W;
	h = BATTLeFIELD.REGION.H;
	this.LowlandVertices = { DARK:  [ { X: 0, Y:  0 }, { X:  w, Y: h }, { X:  w-6, Y: h+4 }, { X: 0, Y: 8 } ],
									 LIGHT: [ { X: 0, Y:  0 }, { X: -w, Y: h }, { X: -w+6, Y: h+4 }, { X: 0, Y: 8 } ]  };
	this.UplandVertices = { DARK:  [ { X: -w, Y:   h }, { X: 0, Y: 2*h }, { X:   0, Y: (2*h)-8 }, { X: -w+6, Y:     h-4 } ],
									LIGHT: [ { X:  0, Y: 2*h }, { X: w, Y:   h }, { X: w-6, Y:     h-4 }, { X:    0, Y: (2*h)-8 } ]  };
};
ImperialBattleInfoView.prototype.SetImages = function() {

	this.ArrowImages = new GenieImage();
	this.ArrowImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], this.Specs.IMAGE.ARROWS);
};
ImperialBattleInfoView.prototype.Update = function() {

	this.Context.clearRect(0, 0, INFoBOX.WIDTH, 192);
	this.DrawRegions();
};
ImperialBattleInfoView.prototype.Draw = function() {

	this.Context.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.DrawRegions();
	this.DrawArrows();
};
ImperialBattleInfoView.prototype.DrawRegions = function() {

	Graphics.SetContext(this.Context);
	ScreenManager.SwitchSpriteContext(this.Context);
	this.DrawTerrain();
	if (this.MainView.SelectedDivision)
		this.DrawDivisions();
	ScreenManager.ResetSpriteContext();
	Graphics.ResetContext();
};
ImperialBattleInfoView.prototype.UpdateClick = function() {  //UNLOGGED
	var i;

	if (!this.MainView.SelectedRegiment)
		return;

	for (i=0;i<this.ArrowCentres.length;++i) {
		if (IntersectUtils.CheckPointCircle(Mouse.Click, this.ArrowCentres[i], 16)) {					//HARD-CODING!!!
			this.ClickDiamond(i);
			return;
		}
		this.CircleCentre.Set(this.ArrowCentres[i].X-22, this.ArrowCentres[i].Y);
		if (IntersectUtils.CheckPointCircle(Mouse.Click, this.ArrowCentres[i], 5)) {					//HARD-CODING!!!
			this.ClickDiamond(i);
			return;
		}
		this.CircleCentre.Set(this.ArrowCentres[i].X+22, this.ArrowCentres[i].Y);
		if (IntersectUtils.CheckPointCircle(Mouse.Click, this.ArrowCentres[i], 5)) {					//HARD-CODING!!!
			this.ClickDiamond(i);
			return;
		}
	}
};
ImperialBattleInfoView.prototype.DrawTerrain = function() {
	var i;
	var c, r;
	var bDark;

	if (this.MainView.SelectedDivision) {

		//Terrain colour
		for (i=0;i<this.Specs.REGION.COUNT;++i) {
			c = this.MainView.SelectedDivision.Region.C + this.DiamondTiles[i][0];
			r = this.MainView.SelectedDivision.Region.R + this.DiamondTiles[i][1];
			if (TileUtils.CheckTileValid(c, r)) {
				this.DiamondCoords = this.DiamondTopCorners[i];
				this.DrawRegion(Battlefield.Regions[c][r].Type, (c+r) % 2);
			}
		}
	} else
		for (i=0;i<this.Specs.REGION.COUNT;++i)
			if ( (i % 2) || (i==4) )
				Graphics.DrawPolygon(this.DiamondTopCorners[i].X, this.DiamondTopCorners[i].Y, this.DiamondVertices, TERRAIN.GRASS.DARK, 0);
			else
				Graphics.DrawPolygon(this.DiamondTopCorners[i].X, this.DiamondTopCorners[i].Y, this.DiamondVertices, TERRAIN.GRASS.LIGHT, 0);
};
ImperialBattleInfoView.prototype.DrawDivisions = function() {
	var i;
	var c, r;
	var x, y;
	var dvsn;

	for (i=0;i<this.Specs.REGION.COUNT;++i) {
		c = this.MainView.SelectedDivision.Region.C + this.DiamondTiles[i][0];
		r = this.MainView.SelectedDivision.Region.R + this.DiamondTiles[i][1];
		if (TileUtils.CheckTileValid(c, r))
			if (Battlefield.Regions[c][r].Division) {
				dvsn = Battlefield.Regions[c][r].Division;
				x = this.DiamondTopCorners[i].X;
				y = this.DiamondTopCorners[i].Y + 43;
				ScreenManager.DrawUnit(this.Context, dvsn.Unit.Type, dvsn.Direction, dvsn.Command.Satrapy, Battlefield.Regions[c][r], { X: x, Y: y } );
			}
	}
};
ImperialBattleInfoView.prototype.DrawArrows = function() {  //UNLOGGED

	if (this.MainView.SelectedDivision)
		if ( (this.MainView.SelectedDivision.Region.C+this.MainView.SelectedDivision.Region.R) % 2 ) {
			this.ArrowImages.DrawPatchNumber(1, 27, 194);
			return;
		}
/*
		else
			this.ArrowImages.DrawPatchNumber(0, 27, 194);
	} else
*/
	this.ArrowImages.DrawPatchNumber(0, 27, 194);
};
ImperialBattleInfoView.prototype.ClickDiamond = function(iRgmnt) {  //UNLOGGED

	Graphics.DrawCircle(this.ArrowCentres[iRgmnt].X, this.ArrowCentres[iRgmnt].Y, 10, "red", 0);
	this.MainView.SelectedRegiment.Move(iRgmnt);
	setTimeout(this.Draw.bind(this), 100);
};
ImperialBattleInfoView.prototype.DrawRegion = function(iTerrain, bDark) {

	switch (iTerrain) {
		case TERRAIN.LOwLAND.DESERT:
			this.DrawLowland(TERRAIN.SAND);
			break;
			case TERRAIN.LOwLAND.FOREST:
				this.DrawLowland(TERRAIN.GRASS);
				this.DrawForest(TERRAIN.ELEVATION.LOwLAND);
				break;
			case TERRAIN.LOwLAND.HILLS:
				this.DrawLowland(TERRAIN.GRASS);
				this.DrawHills(TERRAIN.ELEVATION.LOwLAND);
				break;
			case TERRAIN.PLAIN.DESERT:
				Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.SAND.MEDIUM, 0);
				break;
			case TERRAIN.PLAIN.FOREST:
				Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.GRASS.MEDIUM, 0);
				this.DrawForest(TERRAIN.ELEVATION.PLAIN);
				break;
			case TERRAIN.PLAIN.HILLS:
				Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.GRASS.MEDIUM, 0);
				this.DrawHills(TERRAIN.ELEVATION.PLAIN);
				break;
			case TERRAIN.UpLAND.DESERT:
				this.DrawUpland(TERRAIN.SAND);
				break;
			case TERRAIN.UpLAND.FOREST:
				this.DrawUpland(TERRAIN.GRASS);
				this.DrawForest(TERRAIN.ELEVATION.UpLAND);
				break;
			case TERRAIN.UpLAND.HILLS:
				this.DrawUpland(TERRAIN.GRASS);
				this.DrawHills(TERRAIN.ELEVATION.UpLAND);
				break;
			default:
				if (bDark)
					Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, BATTLeFIELD.COLOUR.DARK, 0);
				else
					Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, BATTLeFIELD.COLOUR.LIGHT, 0);
				break;
	}
};
ImperialBattleInfoView.prototype.DrawLowland = function(terrain) {

	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, terrain.MEDIUM, 0);
	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.LowlandVertices.DARK, terrain.DARK, 0);
	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.LowlandVertices.LIGHT, terrain.LIGHT, 0);
};
ImperialBattleInfoView.prototype.DrawUpland = function(terrain) {

	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.DiamondVertices, terrain.MEDIUM, 0);
	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.UplandVertices.DARK, terrain.DARK, 0);
	Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.UplandVertices.LIGHT, terrain.LIGHT, 0);
};
ImperialBattleInfoView.prototype.DrawForest = function(elevation) {
	var ofst;

	ofst = (elevation==TERRAIN.ELEVATION.UpLAND) ? -4 : 0;

	TreeSprite.Draw(this.DiamondCoords.X+5-40,  this.DiamondCoords.Y+2+29+ofst, elevation);
	TreeSprite.Draw(this.DiamondCoords.X+21-40, this.DiamondCoords.Y+2+29+ofst, elevation);
	TreeSprite.Draw(this.DiamondCoords.X+13-40, this.DiamondCoords.Y+9+29+ofst, elevation);
};
ImperialBattleInfoView.prototype.DrawHills = function(elevation) {
	var ofst;

	ofst = 3 - (3*elevation);

	HillSprite.Draw(this.DiamondCoords.X+9-39,  this.DiamondCoords.Y+2+28+ofst,  3*elevation);
	HillSprite.Draw(this.DiamondCoords.X+19-39, this.DiamondCoords.Y+2+28+ofst, (3*elevation)+2);
	HillSprite.Draw(this.DiamondCoords.X+14-39, this.DiamondCoords.Y+6+28+ofst, (3*elevation)+1);
};
