/*
 *  there will be several of these,
 *	- micro	(Info Box)
 *	- world	(Screen: 600x600px)
 *	- province
 *	- city	(panoramic, showing cities, but not going down to detailed features level)
 *	- street	(only scrolling intra-city: might nix this and let player go wherever they want to go)
 *  what about a flex map (i.e. zoomable)?
 */
//--------------------------------------------
//---------- DOMINION MAP --------------------  base class to DominionWorldMap (could be REDUNDANT)
var DominionMap = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var ScreenRect;
	var Scale;
	var PowerOctagon, AlliedOctagon, AlliedSash, CityStateOctagon, AtollOctagon;
	var ScaledPowerOctagon, ScaledAlliedOctagon, ScaledSash, ScaledCityStateOctagon, ScaledAtollOctagon;
	var ScaledPowerLocations, ScaledAlliedLocations, ScaledCityStateLocations;

	var i, j, x, y, colour;
};
DominionMap.prototype = {
	Set(cntxt, iBox, cPanel, gTool, cPad, tWriter, sRect) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.ScreenRect = sRect;
	},
	Generate() {		//assigns sizes and locations

		if (Game.CheckMobile()) {
			this.Scale = MOBILE.SCALE;
			MAP.SIZE.POWER *= MOBILE.SCALE;
			MAP.RING.POWER *= MOBILE.SCALE;
			MAP.SIZE.ALLIED *= MOBILE.SCALE;
			MAP.RING.ALLIED *= MOBILE.SCALE;
			MAP.SIZE.CITySTATE *= MOBILE.SCALE;
			MAP.RING.CITySTATE *= MOBILE.SCALE;
			MAP.SIZE.ATOLL *= MOBILE.SCALE;
			MAP.RING.ATOLL *= MOBILE.SCALE;
		} else
			this.Scale = 1.0;

		this.GeneratePowers();
		this.GenerateAllieds();
		this.GenerateCityStates();
		this.GenerateAtolls();
	},
	GeneratePowers() {
		var i;
		var locs;

		//Arrays
		this.PowerOctagon = this.CalcPad.GetOctagonVertices(MAP.SIZE.POWER);
		this.ScaledPowerOctagon = ArrayUtils.Create(VERTICES.OCTAGON, Coordinate2D);
		this.ScaledPowerLocations = ArrayUtils.Create(POWER.COUNT, Coordinate2D);

		//Locations
		locs = this.CalcPad.GetOctagonVertices(MAP.RING.POWER);
		locs.forEach( function(power) {power.X+=(SCREEN.WIDTH/2); power.Y+=(SCREEN.HEIGHT/2);} );
		for (i=0;i<locs.length;++i)
			Powers[i].SetLocation(locs[PowerProfiles[i][POWER.PROFILE.LOCATION]-8]);
		Powers[i].SetLocation( { X: SCREEN.WIDTH/2, Y: SCREEN.HEIGHT/2 } );						//Tomcat location
	},
	GenerateAllieds() {
		var i, j;
		var ofsts;
		var iAllied;
		var loc;

		//Arrays
		this.AlliedOctagon = this.CalcPad.GetOctagonVertices(MAP.SIZE.ALLIED);
		this.ScaledAlliedOctagon = ArrayUtils.Create(VERTICES.OCTAGON, Coordinate2D);
		this.ScaledAlliedLocations = ArrayUtils.Create(ALLIED.COUNT, Coordinate2D);

		//Sash
		this.AlliedSash = ArrayUtils.Create(4, Coordinate2D);
		this.AlliedSash[0].Set(this.AlliedOctagon[0].X+2, this.AlliedOctagon[0].Y+2);
		this.AlliedSash[1].Set(this.AlliedOctagon[1].X-2, this.AlliedOctagon[1].Y-2);
		this.AlliedSash[2].Set(this.AlliedOctagon[4].X-2, this.AlliedOctagon[4].Y-2);
		this.AlliedSash[3].Set(this.AlliedOctagon[5].X+2, this.AlliedOctagon[5].Y+2);
		this.ScaledAlliedSash = ArrayUtils.Create(4, Coordinate2D);

		//Locations
		ofsts = this.CalcPad.GetPolygonVertices(POWER.SATELLITES, MAP.RING.ALLIED);
		loc = new Coordinate2D();
		iAllied = 0;
		for (i=0;i<POWER.COUNT;++i)
			for (j=0;j<POWER.SATELLITES;++j) {
				loc.Set(Powers[i].Location.X+ofsts[j].X, Powers[i].Location.Y+ofsts[j].Y);
				AlliedStates[iAllied].SetLocation(loc);
				++iAllied;
			}
	},
	GenerateCityStates() {
		var i, j;
		var ofst;
		var locs, ofsts;
		var iState;

		//Arrays
		this.CityStateOctagon = this.CalcPad.GetOctagonVertices(MAP.SIZE.CITySTATE);
		this.ScaledCityStateOctagon = ArrayUtils.Create(VERTICES.OCTAGON, Coordinate2D);
		this.ScaledCityStateLocations = ArrayUtils.Create(CITySTATE.COUNT, Coordinate2D);

		//Set central island location
		ofst = 2 * MAP.RING.CITySTATE;
		CityStates[0].SetLocation( { X: ofst, Y: ofst } );
		CityStates[1].SetLocation( { X: SCREEN.WIDTH-ofst, Y: ofst } );
		CityStates[2].SetLocation( { X: SCREEN.WIDTH-ofst, Y: SCREEN.HEIGHT-ofst } );
		CityStates[3].SetLocation( { X: ofst, Y: SCREEN.HEIGHT-ofst } );

		//Set surrounding island locations
		ofsts = new Array();
		/* */
		ofsts.push( { X: -MAP.RING.CITySTATE/2, Y: -MAP.RING.CITySTATE/2 } );
		ofsts.push( { X:  MAP.RING.CITySTATE/2, Y: -MAP.RING.CITySTATE/2 } );
		ofsts.push( { X:  MAP.RING.CITySTATE/2, Y:  MAP.RING.CITySTATE/2 } );
		ofsts.push( { X: -MAP.RING.CITySTATE/2, Y:  MAP.RING.CITySTATE/2 } );
		/* */
		/*
		ofsts.push( { X: -MAP.RING.CITySTATE, Y: -MAP.RING.CITySTATE } );
		ofsts.push( { X:  MAP.RING.CITySTATE, Y: -MAP.RING.CITySTATE } );
		ofsts.push( { X:  MAP.RING.CITySTATE, Y:  MAP.RING.CITySTATE } );
		ofsts.push( { X: -MAP.RING.CITySTATE, Y:  MAP.RING.CITySTATE } );
*/
		//Locations
		loc = new Coordinate2D();
		iState = CITySTATE.ARCHIPELAGO.COUNT;
		for (i=0;i<CITySTATE.ARCHIPELAGO.COUNT;++i)
			for (j=1;j<CITySTATE.ARCHIPELAGO.ISLANDS;++j) {
				loc.Set(CityStates[i].Location.X+ofsts[j-1].X, CityStates[i].Location.Y+ofsts[j-1].Y);
				CityStates[iState].SetLocation(loc);
				++iState;
		}
	},
	GenerateAtolls() {
		var i;
		var locs;

		locs = this.CalcPad.GetPolygonVertices(ATOLL.COUNT, MAP.RING.ATOLL);
		locs.forEach(function(loc){loc.X+=(SCREEN.WIDTH/2);loc.Y+=(SCREEN.HEIGHT/2);});
		for (i=0;i<ATOLL.COUNT;++i)
			Atolls[i].SetLocation(locs[i]);
	},
	SetScale(scale) {

		this.Scale = scale;

		//Scale octagons
		for (this.i=0;this.i<VERTICES.OCTAGON;++this.i) {
			this.ScaledPowerOctagon[this.i].Set(scale*this.PowerOctagon[this.i].X, scale*this.PowerOctagon[this.i].Y);
			this.ScaledAlliedOctagon[this.i].Set(scale*this.AlliedOctagon[this.i].X, scale*this.AlliedOctagon[this.i].Y);
			this.ScaledCityStateOctagon[this.i].Set(scale*this.CityStateOctagon[this.i].X, scale*this.CityStateOctagon[this.i].Y);
		}

		//Scale octagons
		for (this.i=0;this.i<this.AlliedSash.length;++this.i)
			this.ScaledAlliedSash[this.i].Set(scale*this.AlliedSash[this.i].X, scale*this.AlliedSash[this.i].Y);

		//Scale locations
		for (this.i=0;this.i<POWER.COUNT;++this.i)
			this.ScaledPowerLocations[this.i].Set(scale*Powers[this.i].Location.X, scale*Powers[this.i].Location.Y);
		for (this.i=0;this.i<ALLIED.COUNT;++this.i)
			this.ScaledAlliedLocations[this.i].Set(scale*AlliedStates[this.i].Location.X, scale*AlliedStates[this.i].Location.Y);
		for (this.i=0;this.i<CITySTATE.COUNT;++this.i)
			this.ScaledCityStateLocations[this.i].Set(scale*CityStates[this.i].Location.X, scale*CityStates[this.i].Location.Y);
	},
	DrawHalf(bScale) {

		if (bScale)
			this.SetScale(0.5);

		//Draw sea
		this.Screen.fillStyle = BLUE.SEA;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH/2, SCREEN.HEIGHT/2);

		//Draw nations
		this.DrawHalfPowers();
		this.DrawHalfAllieds();
		this.DrawHalfCityStates();
	},
	DrawScaled(scale) {

		//UNLOGGED - use ScreenRect

	},
	DrawHalfPowers(x, y) {

		for (this.i=0;this.i<POWER.COUNT;++this.i) {
			this.x = this.ScaledPowerLocations[this.i].X;
			this.y = this.ScaledPowerLocations[this.i].Y;
			this.GraphicsTool.DrawPolygon(this.x, this.y, this.ScaledPowerOctagon, PowerColours[this.i][0], 0);
		}
	},
	DrawHalfAllieds() {

		for (this.i=0;this.i<ALLIED.COUNT;++this.i) {
			this.x = this.ScaledAlliedLocations[this.i].X;
			this.y = this.ScaledAlliedLocations[this.i].Y;
			this.colour = DominionUtils.GetPrimaryColour(AlliedStates[this.i]);
			this.GraphicsTool.DrawPolygon(this.x, this.y, this.ScaledAlliedOctagon, this.colour, 0);
			this.colour = DominionUtils.GetSecondaryColour(AlliedStates[this.i]);
			this.GraphicsTool.DrawPolygon(this.x, this.y, this.ScaledAlliedSash, this.colour, 0);
		}
	},
	DrawHalfCityStates() {

		for (this.i=0;this.i<CITySTATE.COUNT;++this.i) {
			this.x = this.ScaledCityStateLocations[this.i].X;
			this.y = this.ScaledCityStateLocations[this.i].Y;
			this.GraphicsTool.DrawPolygon(this.x, this.y, this.ScaledCityStateOctagon, CityStateColours[this.i], 0);
		}
	}
};
