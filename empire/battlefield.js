
//----------------------------------------------------
//---------- IMPERIAL BATTLEFIELD --------------------
var ImperialBattleField = function() {
	var Regions;
	var DiamondVertices, DiamondCoords, LowlandVertices, UplandVertices;

	var c, r, ofst;
};
ImperialBattleField.prototype = {
	Set() {
		this.Regions = ArrayUtils.Create2D(BATTLeFIELD.REGION.R, BATTLeFIELD.REGION.C, function() { var C, R, Type, Division; } );
		this.DiamondCoords = new Coordinate2D();
		this.SetData();
	},
	SetData() {
		var w, h;

		w = BATTLeFIELD.REGION.W / 2;
		h = BATTLeFIELD.REGION.H / 2;
		this.DiamondVertices = [ { X: -w, Y: 0 }, { X: 0, Y: -h }, { X: w, Y: 0 }, { X: 0, Y: h } ];
		this.LowlandVertices = { DARK:  [ { X: w, Y: -h }, { X: 40, Y: 0 }, { X: 36, Y:   3 }, { X: w, Y: -10 } ],
										 LIGHT: [ { X: 0, Y:  0 }, { X:  4, Y: 3 }, { X:  w, Y: -10 }, { X: w, Y: -h } ]   };
		this.UplandVertices = { DARK:  [ { X: 0, Y:  0 }, { X: w, Y: h }, { X:  w, Y: 10 }, { X:  4, Y: -3 } ],
										LIGHT: [ { X: w, Y:  h }, { X: w, Y: 10 }, { X: 36, Y: -3 }, { X: 40, Y:  0 } ]  };
	},
	Generate() {
		var i;
		var c, r;

		//Initialize all tiles
		for (r=0;r<BATTLeFIELD.REGION.R;++r)
			for (c=0;c<BATTLeFIELD.REGION.C;++c) {
				this.Regions[c][r].C = c;
				this.Regions[c][r].R = r;
				this.Regions[c][r].Type = TERRAIN.STEPPE;
			}

		//Give terrain to half of middle row tiles
		for (i=0;i<BATTLeFIELD.REGIONS.CENTRAL;++i)
			if (Randomizer.CheckBoolean()) {
				c = i % BATTLeFIELD.REGION.C;
				r = BATTLeFIELD.REGIONS.CLEAR.R + Math.floor(i/BATTLeFIELD.REGION.C);
				this.Regions[c][r].Type = Randomizer.GetInRange(1, TERRAIN.TYPES);
			}
	},
	DrawTerrain() {

		for (this.r=(BATTLeFIELD.REGION.R-1);this.r>=0;--this.r)
			for (this.c=0;this.c<=(BATTLeFIELD.REGION.C-1);++this.c) {
				this.GetDiamondCoords(this.c, this.r);
				this.DrawRegion(this.Regions[this.c][this.r].Type, ((this.c+this.r) % 2));
			}
	},
	DrawRegion(iTerrain, bDark, cntxt) {

		if (cntxt)
			ScreenManager.SwitchSpriteContext(cntxt);

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
				Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.SAND.MEDIUM, 0);
				break;
			case TERRAIN.PLAIN.FOREST:
				Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.GRASS.MEDIUM, 0);
				this.DrawForest(TERRAIN.ELEVATION.PLAIN);
				break;
			case TERRAIN.PLAIN.HILLS:
				Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, TERRAIN.GRASS.MEDIUM, 0);
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
					Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, BATTLeFIELD.COLOUR.DARK, 0);
				else
					Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, BATTLeFIELD.COLOUR.LIGHT, 0);
				break;
		}

		if (cntxt)
			ScreenManager.SwitchSpriteContext(GameScape.Screen);
	},
	GetRegionClicked() {
		var c, r;

		c = (((SCREEN.HEIGHT/2)-Mouse.Click.Y)/(BATTLeFIELD.REGION.H/BATTLeFIELD.REGION.W)) + ((SCREEN.WIDTH/2)-Mouse.Click.X);
		c = Math.floor(((SCREEN.WIDTH/2)-c)/40);
		r = (((SCREEN.HEIGHT/2)-Mouse.Click.Y)/(BATTLeFIELD.REGION.H/BATTLeFIELD.REGION.W)) - ((SCREEN.WIDTH/2)-Mouse.Click.X);
		r = Math.floor(((SCREEN.WIDTH/2)-r)/40);

		return ( { C: c, R: r } );
	},
	GetDiamondCoords(c, r) {  //returns left corner of diamond

		this.DiamondCoords.X = BATTLeFIELD.REGION.W * (0.5*(c+r));
		this.DiamondCoords.Y = (SCREEN.HEIGHT/2) + (BATTLeFIELD.REGION.H*(0.5*(c-r)));
	},
	DrawLowland(terrain) {  //UNLOGGED

		Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, terrain.MEDIUM, 0);
		Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.LowlandVertices.DARK, terrain.DARK, 0);
		Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.LowlandVertices.LIGHT, terrain.LIGHT, 0);
	},
	DrawUpland(terrain) {  //UNLOGGED

		Graphics.DrawPolygon(this.DiamondCoords.X+20, this.DiamondCoords.Y, this.DiamondVertices, terrain.MEDIUM, 0);
		Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.UplandVertices.DARK, terrain.DARK, 0);
		Graphics.DrawPolygon(this.DiamondCoords.X, this.DiamondCoords.Y, this.UplandVertices.LIGHT, terrain.LIGHT, 0);
	},
	DrawForest(elevation) {  //UNLOGGED

		this.ofst = (elevation==TERRAIN.ELEVATION.UpLAND) ? -4 : 0;

		TreeSprite.Draw(this.DiamondCoords.X+5,  this.DiamondCoords.Y+2+this.ofst, elevation);
		TreeSprite.Draw(this.DiamondCoords.X+21, this.DiamondCoords.Y+2+this.ofst, elevation);
		TreeSprite.Draw(this.DiamondCoords.X+13, this.DiamondCoords.Y+9+this.ofst, elevation);
	},
	DrawHills(elevation) {  //UNLOGGED

		this.ofst = 3 - (3*elevation);

		HillSprite.Draw(this.DiamondCoords.X+9,  this.DiamondCoords.Y+2+this.ofst,  3*elevation);
		HillSprite.Draw(this.DiamondCoords.X+19, this.DiamondCoords.Y+2+this.ofst, (3*elevation)+2);
		HillSprite.Draw(this.DiamondCoords.X+14, this.DiamondCoords.Y+6+this.ofst, (3*elevation)+1);
	},
	CheckUpland(region) {  //UNLOGGED

		if ( region.Type>=TERRAIN.UpLAND.DESERT && region.Type<=TERRAIN.UpLAND.HILLS )
			return (true);
	}
};
