
//--------------------------------------------------
//---------- DOMINION WORLD MAP --------------------
var DominionWorldMap = function() {
	var Mode;
	var BelligerenceSpectrum;
	var SelectionFlag, SelectedNation;

	var i, x, y, info, pop;		//scratch variables
};
DominionWorldMap.prototype = new DominionMap();
DominionWorldMap.prototype.Set = function(cntxt, iBox, cPanel, gTool, cPad, tWriter) {
	DominionMap.prototype.Set.call(this, cntxt, iBox, cPanel, gTool, cPad, tWriter);

	this.SelectionFlag = true;
	this.Mode = MAP.MODE.NORMAL;
	this.AlliedSash = ArrayUtils.Create(4, Coordinate2D);
	this.Generate();
};
DominionWorldMap.prototype.SelectNation = function(nation) {

	this.SelectedNation = nation;
};
DominionWorldMap.prototype.ActivateSelection = function() {

	this.SelectionFlag = true;
};
DominionWorldMap.prototype.Generate = function() {

	this.GeneratePowers();
	this.GenerateAllieds();
	this.GenerateCityStates();
	this.GenerateAtolls();
	this.GenerateSpectrum();
};
DominionWorldMap.prototype.GeneratePowers = function() {

	this.PowerOctagon = new GenieOctagon();
	this.PowerOctagon.Set(this.Screen, this.CalcPad, { SIZE: MAP.SIZE.POWER, LW: 0 } );
};
DominionWorldMap.prototype.GenerateAllieds = function() {

	this.AlliedOctagon = new GenieOctagon();
	this.AlliedOctagon.Set(this.Screen, this.CalcPad, { SIZE: MAP.SIZE.ALLIED, LW: 0 } );

	//Sash
	this.AlliedSash[0].Set(this.AlliedOctagon.Vertices[0].X+2, this.AlliedOctagon.Vertices[0].Y+2);
	this.AlliedSash[1].Set(this.AlliedOctagon.Vertices[1].X-2, this.AlliedOctagon.Vertices[1].Y-2);
	this.AlliedSash[2].Set(this.AlliedOctagon.Vertices[4].X-2, this.AlliedOctagon.Vertices[4].Y-2);
	this.AlliedSash[3].Set(this.AlliedOctagon.Vertices[5].X+2, this.AlliedOctagon.Vertices[5].Y+2);
};
DominionWorldMap.prototype.GenerateCityStates = function() {

	this.CityStateOctagon = new GenieOctagon();
	this.CityStateOctagon.Set(this.Screen, this.CalcPad, { SIZE: MAP.SIZE.CITySTATE, LW: 0 } );
};
DominionWorldMap.prototype.GenerateAtolls = function() {

	this.AtollOctagon = new GenieOctagon();
	this.AtollOctagon.Set(this.Screen, this.CalcPad, { SIZE: MAP.SIZE.ATOLL, LW: 0 } );
};
DominionWorldMap.prototype.GenerateSpectrum = function() {
	var i;
	var hSpctrm, cSpctrm;	//h- hot, c- cool

	//Generate colours
	cSpctrm = new GenieSpectrum();
	cSpctrm.Set("rgb(000,223,000)", "rgb(255,255,000)", 4);
	hSpctrm = new GenieSpectrum();
	hSpctrm.Set("rgb(255,255,000)", "rgb(223,000,000)", 5);

	//Assign selected colours
	this.BelligerenceSpectrum = new Array(POWER.COUNT);
	for (i=0;i<BELLIGERENCE.TYPES/2;++i) {
		this.BelligerenceSpectrum[i] = cSpctrm.Colours[i];
		this.BelligerenceSpectrum[(BELLIGERENCE.TYPES/2)+i] = hSpctrm.Colours[i+1];
	}
};
DominionWorldMap.prototype.Draw = function() {

	//Draw sea
	this.Screen.fillStyle = BLUE.SEA;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	//Draw landforms
	this.DrawPowers();
	this.DrawAlliedStates();
	this.DrawCityStates();
	this.DrawAtolls();
};
DominionWorldMap.prototype.DrawPowers = function() {

	for (this.i=0;this.i<POWER.COUNT;++this.i) {
		this.PowerOctagon.Colour = PowerColours[this.i][0];
		this.PowerOctagon.Draw(Powers[this.i].Location.X, Powers[this.i].Location.Y);
		if (this.SelectionFlag)
			if (this.SelectedNation)
				if (Powers[this.i]===this.SelectedNation)
					this.GraphicsTool.DrawPolygon(Powers[this.i].Location.X, Powers[this.i].Location.Y, this.PowerOctagon.Vertices, "white", 3);
		this.x = Powers[this.i].Location.X - Math.round(StringUtils.GetWidth(PowerNames[this.i], "bold 12px Arial", this.Screen)/2);
		this.TextWriter.Write(PowerNames[this.i], this.x, Powers[this.i].Location.Y+5, { COLOUR: PowerColours[this.i][1], FONT: "bold 12px Arial" } );
	}
};
DominionWorldMap.prototype.DrawAlliedStates = function() {

	for (this.i=0;this.i<ALLIED.COUNT;++this.i) {
		this.AlliedOctagon.Colour = AlliedStates[this.i].PrimaryColour;
		this.AlliedOctagon.Draw(AlliedStates[this.i].Location.X, AlliedStates[this.i].Location.Y);
		this.GraphicsTool.DrawPolygon(AlliedStates[this.i].Location.X, AlliedStates[this.i].Location.Y, this.AlliedSash, AlliedStates[this.i].SecondaryColour, 0);
		if (this.SelectionFlag)
			if (this.SelectedNation)
				if (AlliedStates[this.i]===this.SelectedNation)
					this.GraphicsTool.DrawPolygon(AlliedStates[this.i].Location.X, AlliedStates[this.i].Location.Y, this.AlliedOctagon.Vertices, "white", 2);
		if (AlliedStates[this.i].Alliance) {
			this.x = Math.round(AlliedStates[this.i].Location.X);
			this.y = Math.round(AlliedStates[this.i].Location.Y);
			WorldMapFlagSprite.Draw(this.x, this.y, AlliedStates[this.i].Alliance.Power.Index);
		}
	}
};
DominionWorldMap.prototype.DrawCityStates = function() {

	for (this.i=0;this.i<CITySTATE.COUNT;++this.i) {
		this.CityStateOctagon.Colour = CityStateColours[this.i];
		this.CityStateOctagon.Draw(CityStates[this.i].Location.X, CityStates[this.i].Location.Y);
		if (this.SelectionFlag)
			if (this.SelectedNation)
				if (CityStates[this.i]===this.SelectedNation)
					this.GraphicsTool.DrawPolygon(CityStates[this.i].Location.X, CityStates[this.i].Location.Y, this.CityStateOctagon.Vertices, "white", 1);
	}
};
DominionWorldMap.prototype.DrawAtolls = function() {

	for (this.i=0;this.i<ATOLL.COUNT;++this.i) {
		this.AtollOctagon.Colour = "white";
		this.AtollOctagon.Draw(Atolls[this.i].Location.X, Atolls[this.i].Location.Y);
	}
};
DominionWorldMap.prototype.CheckNationClicked = function() {
	var i;
	var r;

	this.SelectedNation = null;
	for (i=0;i<POWER.COUNT;++i)
		if (SpaceUtils.CheckPointInCircle(Mouse.Click, Powers[i].Location, MAP.SIZE.POWER/2)) {
			this.SelectedNation = Powers[i];
			return;
		}

	for (i=0;i<ALLIED.COUNT;++i)
		if (SpaceUtils.CheckPointInCircle(Mouse.Click, AlliedStates[i].Location, MAP.SIZE.ALLIED/2)) {
			this.SelectedNation = AlliedStates[i];
			return;
		}

	r = MAP.SIZE.CITySTATE / 2;
	if (Game.CheckMobile())
		r += 5;
	for (i=0;i<CITySTATE.COUNT;++i) {
		if (SpaceUtils.CheckPointInCircle(Mouse.Click, CityStates[i].Location, r)) {
			this.SelectedNation = CityStates[i];
			return;
		}
	}
};
