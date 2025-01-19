
//--------------------------------------------
//---------- DOMINION JET --------------------
var DominionJet = function() {
	var Type;
	var Arsenal, Hardpoints;		//both fields are bit-packed, the latter is needed to manage fuselage display
	var PolygonSides;
	var PrimaryColour, SecondaryColour;

	var dstntn;	//scratch variables
};
DominionJet.prototype = new DominionUnit();
DominionJet.prototype.Set = function(specs, sprite, drctn) {
	DominionUnit.prototype.Set.call(this, specs, sprite);

	this.Direction = drctn;
	this.Angle = 0;

	this.dstntn = new Coordinate2D();
};
DominionJet.prototype.SetNation = function(nation) {	//TODO: at the moment, this applies only to powers
	DominionUnit.prototype.SetNation.call(this, nation);

	this.PolygonSides = DominionUtils.GetJetPolygonSides(this.Nation);
	this.ResetSpriteSides(this.PolygonSides);
	this.PrimaryColour = DominionUtils.GetPrimaryColour(this.Nation);
	this.SecondaryColour = DominionUtils.GetSecondaryColour(this.Nation);
	this.ReColour();
};
DominionJet.prototype.ResetSpriteSides = function(sides) {

	this.Sprite.Shapes.forEach(function(shape){shape.ResetSides(sides);});
};
/*
DominionJet.prototype.Draw = function() {

	//UNLOGGED

	//TODO: form depends on view/theatre/pane

//	GenieAgent.prototype.Draw.call(this);
	this.Sprite.Angle = this.Angle;
	this.Sprite.DrawTransformed(this.ScreenCoords.X, this.ScreenCoords.Y);

	//TODO: draw shield, depending on view/theatre
	//TODO: draw plume
};
*/
DominionJet.prototype.DrawOrdnance = function() {

	//UNLOGGED

	this.DrawMissiles();
	this.DrawLaser();
	this.DrawShells();
	this.DrawCounterMeasures();
};
DominionJet.prototype.DrawMissiles = function() {

	//UNLOGGED
/* TODO: this only draws outgoing missiles, not incoming ones
	//Firebrand
	if (this.Direction==DIRECTION.E) {
		if ( (this.Firebrand.Position.X-this.Position.X) < 16 )
	 this.Firebrand.DrawInset();
	} else {
		if ( (this.Position.X-this.Firebrand.Position.X) < 16 )
	 this.Firebrand.DrawInset();
	}
*/
};
DominionJet.prototype.DrawLaser = function() {

	//UNLOGGED

};
DominionJet.prototype.DrawShells = function() {

	//UNLOGGED

};
DominionJet.prototype.DrawCounterMeasures = function() {

	//Chaffs
	for (this.i=0;this.i<this.Specs.MAX.CHAFFs;++this.i)
		if (this.Chaffs[this.i])
	 this.Chaffs[this.i].Draw();

	//Flares
	for (this.i=0;this.i<this.Specs.MAX.FLAREs;++this.i)
		if (this.Flares[this.i])
	 this.Flares[this.i].Draw();
};
DominionJet.prototype.UpdateCounterMeasures = function() {

	//Chaffs
	for (this.i=0;this.i<this.Specs.MAX.CHAFFs;++this.i)
		if (this.Chaffs[this.i])
	 this.Chaffs[this.i].Update();

	//Flares
	for (this.i=0;this.i<this.Specs.MAX.FLAREs;++this.i)
		if (this.Flares[this.i])
	 this.Flares[this.i].Update();
};
DominionJet.prototype.DisplayHardpoints = function() {

	//UNLOGGED

	this.DisplayFuselage();

	//Cannons
	if (this.Hardpoints & Math.pow(2,0))
		ShortCannonConsoleImages.DrawPatchNumber(this.PrimaryIndex, this.Specs.HARDPOINTS.SHORtCANNON.X, this.Specs.HARDPOINTS.SHORtCANNON.Y);
	if (this.Hardpoints & Math.pow(2,1))
		LongCannonConsoleImages.DrawPatchNumber(this.PrimaryIndex, this.Specs.HARDPOINTS.LONgCANNON.X, this.Specs.HARDPOINTS.LONgCANNON.Y);

	//Missiles
	for (this.i=0;this.i<this.Specs.MAX.FIREBRANDs;++this.i)
		if (this.Hardpoints & Math.pow(2, this.i+4))
	 this.DisplayFirebrand(this.Specs.HARDPOINTS.FIREBRANDS[this.i].X, this.Specs.HARDPOINTS.FIREBRANDS[this.i].Y);
	for (this.i=0;this.i<this.Specs.MAX.SILKLIGHTs;++this.i)
		if (this.Hardpoints & Math.pow(2, this.i+8))
	 this.DisplaySilklight(this.Specs.HARDPOINTS.SILKLIGHTS[this.i].X, this.Specs.HARDPOINTS.SILKLIGHTS[this.i].Y);

	//Counter-measures
	for (this.i=0;this.i<this.Specs.MAX.FLAREs;++this.i)
		if (this.Hardpoints & Math.pow(2, this.i+12))
	 FlareImage.Draw(this.Specs.HARDPOINTS.FLARES[this.i].X, this.Specs.HARDPOINTS.FLARES[this.i].Y);
	for (this.i=0;this.i<this.Specs.MAX.CHAFFs;++this.i)
		if (this.Hardpoints & Math.pow(2, this.i+16))
	 ChaffImage.Draw(this.Specs.HARDPOINTS.CHAFFS[this.i].X, this.Specs.HARDPOINTS.CHAFFS[this.i].Y);

	//-bombs/ASMs/ANMs etc.
};
DominionJet.prototype.DisplayFuselage = function() {
	var vChassis;	//v- vertices

	//Control Panel background
	this.ControlPanel.fillStyle = CityStateColours[CITySTATE.COUNT];
	this.ControlPanel.fillRect(0, 60, CONTROlPANEL.WIDTH, 240);

	this.GraphicsTool.SwitchContext(this.ControlPanel);

	//Draw plane underside
	vChassis = this.CalcPad.GetPolygonVertices(this.PolygonSides, 232);
	this.GraphicsTool.DrawPolygon(CONTROlPANEL.WIDTH/2, CONTROlPANEL.HEIGHT/2, vChassis, this.PrimaryColour, 0);
	this.GraphicsTool.DrawPolygon(CONTROlPANEL.WIDTH/2, CONTROlPANEL.HEIGHT/2, vChassis, this.SecondaryColour, 2);
	this.GraphicsTool.DrawCircle(CONTROlPANEL.WIDTH/2, CONTROlPANEL.HEIGHT/2, 232, GREY.MEDIUM, 1);
	this.GraphicsTool.DrawCircle((CONTROlPANEL.WIDTH/2)+1, (CONTROlPANEL.HEIGHT/2)+1, 232, "white", 1);

	//Draw cannons - ISSUE: circle won't fit for diamonds, so either has to be reduced to a 40px radius, or be drawn filled-in with third colour, or chassis enlarged
	this.GraphicsTool.DrawCircle(120, 125, 50, this.SecondaryColour, 1);

	this.GraphicsTool.RestoreContext();
};
DominionJet.prototype.DisplayFirebrand = function(x, y) {
	var sIndex;		//s- secondary

	sIndex = DominionUtils.GetSecondaryIndex(this.Nation);
	AAMVerticalShaftImages.DrawPatchNumber(sIndex, x, y);
	FirebrandVerticalWarheadImage.Draw(x, y-10);
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex, x-5, y+2);		//top left
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex, x-5, y+15);		//middle left
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex, x-5, y+28);		//bottom left
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex+10, x+8, y+2);		//top right
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex+10, x+8, y+15);		//middle right
	FirebrandVerticalFinImages.DrawPatchNumber(sIndex+10, x+8, y+28);		//bottom right
};
DominionJet.prototype.DisplaySilklight = function(x, y) {
	var sIndex;		//s- secondary

	sIndex = DominionUtils.GetSecondaryIndex(this.Nation);
	AAMVerticalShaftImages.DrawPatchNumber(sIndex, x, y);
	SilklightVerticalWarheadImage.Draw(x, y-10);
	SilklightVerticalFinImages.DrawPatchNumber(sIndex, x-5, y+2);		//top left
	SilklightVerticalFinImages.DrawPatchNumber(sIndex, x-5, y+29);		//bottom left
	SilklightVerticalFinImages.DrawPatchNumber(sIndex+10, x+8, y+2);		//top right
	SilklightVerticalFinImages.DrawPatchNumber(sIndex+10, x+8, y+29);		//bottom right
};
DominionJet.prototype.ReColour = function() {

	for (this.i=0;this.i<JEtCOLOUrINDICEs[this.Type][0].length;++this.i)
		this.Sprite.Shapes[JEtCOLOUrINDICEs[this.Type][0][this.i]].Colour = this.PrimaryColour;
	for (this.i=0;this.i<JEtCOLOUrINDICEs[this.Type][1].length;++this.i)
		this.Sprite.Shapes[JEtCOLOUrINDICEs[this.Type][1][this.i]].Colour = this.SecondaryColour;
};
DominionJet.prototype.DrawPlume = function() {

	//UNLOGGED

};
DominionJet.prototype.UpdateArsenal = function() {  //NOTE: called whenever fuselage in Control Panel is clicked

	//UNLOGGED

	//Cannons
	if (BitUtils.CheckBit(this.Hardpoints, 0))
		if (SpaceUtils.CheckPointInArea(Mouse.Click, this.Specs.HARDPOINTS.SHORtCANNON, 12, 64)) {
	 this.FireShortCannon();
	 return;
		} else if (SpaceUtils.CheckPointInArea(Mouse.Click, this.Specs.HARDPOINTS.LONgCANNON, 48, 54) && Mouse.Click.Y>=this.Specs.HARDPOINTS.LONgCANNON.Y) {
	 if (BitUtils.CheckBit(this.Hardpoints, 1)) {
		 this.FireLongCannon();
		 return;
	 }
		}

	//Missiles
	for (this.i=0;this.i<this.Specs.MAX.FIREBRANDs;++this.i) {
		if (BitUtils.CheckBit(this.Hardpoints, this.i+4))
	 if (SpaceUtils.CheckPointInRect(Mouse.Click, this.Specs.HARDPOINTS.FIREBRANDS[this.i].X-5, this.Specs.HARDPOINTS.FIREBRANDS[this.i].Y-10, 18, 48)) {
		 this.LaunchFirebrand(this.i);
				return;
	 }
	}
	for (this.i=0;this.i<this.Specs.MAX.SILKLIGHTs;++this.i) {
		if (BitUtils.CheckBit(this.Hardpoints, this.i+8))
	 if (SpaceUtils.CheckPointInRect(Mouse.Click, this.Specs.HARDPOINTS.SILKLIGHTS[this.i].X-5, this.Specs.HARDPOINTS.SILKLIGHTS[this.i].Y-10, 18, 48)) {
		 this.LaunchSilklight(this.i);
				return;
	 }
	}

	//Counter-measures
	for (this.i=0;this.i<this.Specs.MAX.FLAREs;++this.i) {
		if (BitUtils.CheckBit(this.Hardpoints, this.i+12)) {
	 this.coords.Set(this.Specs.HARDPOINTS.FLARES[this.i].X+11, this.Specs.HARDPOINTS.FLARES[this.i].Y+11);
	 if (SpaceUtils.CheckPointInCircle(Mouse.Click, this.coords, 11)) {
		 this.DispenseFlare(this.i);
				return;
	 }
		}
	}
	for (this.i=0;this.i<this.Specs.MAX.CHAFFs;++this.i) {
		if (BitUtils.CheckBit(this.Hardpoints, this.i+16)) {
	 this.coords.Set(this.Specs.HARDPOINTS.CHAFFS[this.i].X+11, this.Specs.HARDPOINTS.CHAFFS[this.i].Y+11);
	 if (SpaceUtils.CheckPointInCircle(Mouse.Click, this.coords, 11)) {
		 this.DispenseChaff(this.i);
				return;
	 }
		}
	}

	//-additional weapons
};
DominionJet.prototype.FireShortCannon = function() {

	//UNLOGGED

};
DominionJet.prototype.FireLongCannon = function() {

	//UNLOGGED

};
DominionJet.prototype.LaunchFirebrand = function(iFrbrnd) {

	this.Hardpoints = BitUtils.RemoveBit(this.Hardpoints, iFrbrnd+4);
	this.Arsenal = BitUtils.DecrementBits(this.Arsenal, 7, 4);
	this.Firebrand = this.FirebrandList.Get();
	this.Firebrand.Activate(this.Position, this.Target.Position, this, this.Direction, this.PrimaryColour);
	this.DisplayHardpoints();
};
DominionJet.prototype.LaunchSilklight = function(iSlklt) {

	this.Hardpoints = BitUtils.RemoveBit(this.Hardpoints, iSlklt+8);
	this.Arsenal = BitUtils.DecrementBits(this.Arsenal, 11, 8);
	this.Silklight = this.SilklightList.Get();
	this.Silklight.Activate(this.Position, this.Target.Position, this, this.Direction, this.PrimaryColour);
	this.DisplayHardpoints();
};
DominionJet.prototype.DispenseFlare = function(iFlr) {

	this.Hardpoints = BitUtils.RemoveBit(this.Hardpoints, iFlr+12);
	this.Arsenal = BitUtils.DecrementBits(this.Arsenal, 15, 12);
	this.Flares[iFlr] = this.FlareList.Get();
	if (this.Direction==DIRECTION.E) {
		this.coords.Set(THEATRE.AIR.POSITION.L.X, THEATRE.AIR.POSITION.L.Y);
		this.dstntn.Set(THEATRE.AIR.INSET.L.X+LEFtFLAReOFFSETs[iFlr].X, THEATRE.AIR.INSET.L.Y+LEFtFLAReOFFSETs[iFlr].Y);
	} else {
		this.coords.Set(THEATRE.AIR.POSITION.R.X, THEATRE.AIR.POSITION.R.Y);
		this.dstntn.Set(THEATRE.AIR.INSET.R.X+RIGHtFLAReOFFSETs[iFlr].X, THEATRE.AIR.INSET.R.Y+RIGHtFLAReOFFSETs[iFlr].Y);
	}
	this.Flares[iFlr].Activate(this.coords, this.dstntn);
	this.DisplayHardpoints();
};
DominionJet.prototype.DispenseChaff = function(iChff) {

	this.Hardpoints = BitUtils.RemoveBit(this.Hardpoints, iChff+16);
	this.Arsenal = BitUtils.DecrementBits(this.Arsenal, 19, 16);
	this.Chaffs[iChff] = this.ChaffList.Get();
	if (this.Direction==DIRECTION.E) {
		this.coords.Set(THEATRE.AIR.POSITION.L.X, THEATRE.AIR.POSITION.L.Y);
		this.dstntn.Set(THEATRE.AIR.INSET.L.X+LEFtCHAFfOFFSETs[iChff].X, THEATRE.AIR.INSET.L.Y+LEFtCHAFfOFFSETs[iChff].Y);
	} else {
		this.coords.Set(THEATRE.AIR.POSITION.R.X, THEATRE.AIR.POSITION.R.Y);
		this.dstntn.Set(THEATRE.AIR.INSET.R.X+RIGHtCHAFfOFFSETs[iChff].X, THEATRE.AIR.INSET.R.Y+RIGHtCHAFfOFFSETs[iChff].Y);
	}
	this.Chaffs[iChff].Activate(this.coords, this.dstntn);
	this.DisplayHardpoints();
};
