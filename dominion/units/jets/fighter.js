/*
 *  there is no overlap in WEAPON RANGEs right now, which can be re-thought later
 *  TODO: will be re-written since right now it is simply copied from Dominion Old
 */
//------------------------------------------------
//---------- DOMINION FIGHTER --------------------
var DominionFighter = function() {
	var FighterType, SpriteIndex;		//.SpriteIndex is for decals
	var Theatre;
	var Landscape;	//pointer to buffer used in some theatres

	//Arsenal
/*
	var ShortCannon;	//NOTE: one of 3 types, as for long cannon, missiles, drones, bombs (destructiveness)
	var LongCannon;	//  and maybe even rockets (range)
	var Firebrands, Silklights;
	var Flares, Chaffs;
*/
	//Projectile
	var Laser, Shell;
	var Firebrand, Silklight;
	var Flares, Chaffs;

	//Projectile list
	var LaserList, ShellList;
	var FirebrandList, SilklightList;
	var FlareList, ChaffList;

	//everything below can be REDUNDANT
	var Afterburner, FuelPod, Aileron, Booster, Rotator;		//TODO: replace with .Enhancement
	var Shield, Blazebolts, Bombs, Rockets, Drone;		//TODO: replace with .Bonus
	var TinySprite;
	var TacticalPolygon;
	var MiniMapCircle;
};
DominionFighter.prototype = new DominionJet();
DominionFighter.prototype.Set = function(specs, sprite, drctn) {
	DominionJet.prototype.Set.call(this, specs, sprite, drctn);

	this.Type = JET.FIGHTER;

	if (this.Specs.TYPE)
		this.SetType(this.Specs.TYPE);
	if (this.Specs.NATION)
		this.SetNation(this.Specs.NATION);
	if (this.Specs.ARSENAL)
		this.SetArsenal(this.Specs.ARSENAL);

//	this.TacticalPolygon = new GeniePolygon();
//	this.MiniMapCircle = new GenieCircle();

	this.Angle = 0;
};
DominionFighter.prototype.SetExtraLinks = function(lList, aList, fList, sList, dList, cList) {  //l- list, a- ammo (shell), f- firebrand,
												//s- silklight, d- decoy (flare), c- chaff
	this.LaserList = lList;
	this.ShellList = aList;
	this.FirebrandList = fList;
	this.SilklightList = sList;
	this.FlareList = dList;
	this.ChaffList = cList;
};
DominionFighter.prototype.SetNation = function(ntn) {
	DominionJet.prototype.SetNation.call(this, ntn);

	if (ntn.Type==NATION.POWER)
		this.SpriteIndex = ntn.Index;
	else
		this.SpriteIndex = ntn.AssociatedIndex;
};
DominionFighter.prototype.SetGrade = function(grade) {
	var flares, chaffs;

	//UNLOGGED - this method will be expanded to include enhanced (and maybe bonus) weapons, likely with additional argument

	switch (grade) {
		case 0:
	 this.Arsenal = 0x00001;			//short cannon
	 this.Hardpoints = 0x00001;
	 break;
		case 1:
	 this.Arsenal = 0x00003;			//short + long cannon
	 this.Hardpoints = 0x00003;
	 break;
		case 2:
	 this.Arsenal = 0x00013;			//short + long cannon + 1 firebrand
	 this.Hardpoints = 0x00013;
	 break;
		case 3:
	 this.Arsenal = 0x00113;			//short + long cannon + 1 firebrand + 1 silklight
	 this.Hardpoints = 0x00113;
	 break;
		case 4:
	 this.Arsenal = 0x01113;			//short + long cannon + 1 firebrand + 1 silklight + 1 flare
	 this.Hardpoints = 0x01113;
	 break;
		case 5:
	 this.Arsenal = 0x11113;			//short + long cannon + 1 firebrand + 1 silklight + 1 flare + 1 chaff
	 this.Hardpoints = 0x11113;
	 break;
		case 6:
	 this.Arsenal = 0x22223;			//short + long cannon + 2 firebrands + 2 silklights + 2 flares + 2 chaffs
	 this.Hardpoints = 0x33333;
	 break;
		case 7:
	 this.Arsenal = 0x33333;			//short + long cannon + 3 firebrands + 3 silklights + 3 flares + 3 chaffs
	 this.Hardpoints = 0x77773;
	 break;
		case 8:
	 this.Arsenal = 0x44443;			//short + long cannon + 4 firebrands + 4 silklights + 4 flares + 4 chaffs
	 this.Hardpoints = 0xFFFF3;
	 break;
	}

	flares = BitUtils.GetBits(this.Arsenal, 7, 4);
	chaffs = BitUtils.GetBits(this.Arsenal, 11, 8);
	if (flares)
		this.Flares = new Array(flares);
	if (chaffs)
		this.Chaffs = new Array(chaffs);
};
DominionFighter.prototype.SetFighterType = function(fType) {
	var arsnl;

	//UNLOGGED

	this.FighterType = fType;
	return;

	//TODO: set arsenal here, either in .Arsenal field, or local var arsenal
	switch (type) {
		case FIGHTER.TYPE.F2:
	 arsnl = 0x1;
	 break;
		case FIGHTER.TYPE.F3:
	 arsnl = 0x11;
	 break;
		case FIGHTER.TYPE.F4:
	 arsnl = 0x111;
	 break;
		case FIGHTER.TYPE.F5:
	 arsnl = 0x4111;
	 break;
		case FIGHTER.TYPE.F6:
	 arsnl = 0x44111;
	 break;
		case FIGHTER.TYPE.F7:
	 arsnl = 0x88221;
	 break;
		case FIGHTER.TYPE.F8:
	 arsnl = 0xBB331;
	 break;
		case FIGHTER.TYPE.F9:
	 arsnl = 0xFF441;
	 break;
	}

	//TODO: create arsenal here in a series of if's
	if (arsnl & 0x1) {
//	 this.LongCannon = new GenieCannon();
//	 this.LongCannon.Set();  TO BE DONE (use specs from somewhere)
	}
};
/*
DominionFighter.prototype.GetArsenalInfo = function() {
	//ISSUE: is this even needed anymore?
	var bInfo, mInfo;

	bInfo = this.ShortCannon + (4*this.LongCannon) + (16*this.Flares) + (128*this.Chaff);
	bInfo += (1024*this.AfterBurner) + (4096*this.FuelPod) + (16394*this.Shield);
	bInfo += (0x10000*this.Bombs) + (0x40000*this.Rockets) + (0x100000*this.Drone);
	bInfo += (0x400000*this.Aileron) + (0x800000*this.Booster) + (0x1000000*this.Rotator);
	mInfo = 0;
	for (this.i=0;this.i<4;++this.i) {
		mInfo += this.Firebrands[this.i]*Math.pow(2, 2*this.i);
		mInfo += this.Silklights[this.i]*Math.pow(2, 2*this.i)*0x100;
		mInfo += this.Blazebolts[this.i]*Math.pow(2, 2*this.i)*0x10000;
	}

	return ( { basic: bInfo, missiles: mInfo } );  //NOTE: not the most efficient approach garbage collection-wise
};
*/
DominionFighter.prototype.SetPosition = function(pos) {  //REDUNDANT?
	DominionUnit.prototype.SetPosition.call(this, pos);

	//UNLOGGED

	//TODO: set RadarPolygon
};
DominionFighter.prototype.Update = function() {

	//UNLOGGED

	//TEMP all below (for temp dogfight theatre)
	if (this.Direction==DIRECTION.E)
		this.Position.X += 2.0;
	if (this.Direction==DIRECTION.W)
		this.Position.X -= 2.0;

	//TODO: update RadarPolygon by a fraction of 2.0, maybe 0.5 or 0.67
};
/*
DominionFighter.prototype.Draw = function() {

	//UNLOGGED

	if (!this.Theatre) {
		this.RotationBuffer.DrawRotated(this.Sprite, null, null, this.Position.X, this.Position.Y, this.Angle);
		return;
	}

	switch (this.Theatre) {
		case THEATRE.LANdAIR:	//NOTE: could be same as THEATRE.LAND
	 //iso view, switch to air similar to dogfight theatre except only 1 octagon wide
	 break;
		case THEATRE.LANdSEA:
	 //side-view (no switch to air)
	 break;
		case THEATRE.SEaAIR:	//NOTE: could be same as THEATRE.SEA
	 //tiniest sprite version in top-down view
	 break;
		case THEATRE.DOgFIGHT:
	 //600x600 main
	 this.x = this.Position.X;
	 this.y = this.Position.Y;
	 this.Position.X = -1;
	 this.Position.Y = -1;
	 this.DrawLarge();
	 this.Position.X = -1;
	 this.Position.Y = -1;
	 this.DrawTiny();
	 this.Position.X = this.x;
	 this.Position.Y = this.y;
	 if (this.Selected)
		 this.DisplayArsenal();
	 break;
		case THEATRE.AIrMISSION:
	 //750x450 main
	 if (this.Selected)
		 this.DrawLarge();
	 this.DrawTiny();
	 this.TacticalPolygon.X = (this.Position.X/4) - (16*Math.floor(this.Index/2));
	 this.TacticalPolygon.Y = 450 + 12 + (16*(this.Index % 2));
	 this.DrawRadar();
	 if (this.Selected)
		 this.DisplayArsenal();
	 break;
		case THEATRE.RAID:
	 //can use mission, however once a wave is past a squadron, may have to land the squadron or allow control of multiple ones
	 break;
		//NOTE: (no champions)
		default:  //TEMP
//	 this.AdjustSpriteOffsets();
	 this.RotationBuffer.DrawRotated(this.Sprite, null, null, this.Position.X, this.Position.Y, this.Angle);
//	 this.ResetSpriteOffsets();
	 if (this.Selected)
		 this.DisplayArsenal();
	 break;
	}
};
*/
DominionFighter.prototype.DrawSprites = function(state, x, y) {
	GenieAgent.prototype.DrawSprites.call(this, state, x, y);

	for (this.i=0;this.i<(this.FighterType+1);++this.i) {
		this.x = x + this.Specs.DECALS[this.Specs.MAPPING[this.FighterType][this.i]][0];
		this.y = y + this.Specs.DECALS[this.Specs.MAPPING[this.FighterType][this.i]][1];
		FighterDecalSprite.Draw(this.x, this.y, this.SpriteIndex);
	}
};
DominionFighter.prototype.AdjustSpriteOffsets = function() {

	for (this.i=0;this.i<4;this.i+=2) {
		this.Sprite.Specs.GS[this.i][3][0] += FighterSpriteOffsets[this.NationIndex][0];
		this.Sprite.Specs.GS[this.i][3][1] += FighterSpriteOffsets[this.NationIndex][1];
		this.Sprite.Specs.GS[this.i+1][3][0] -= FighterSpriteOffsets[this.NationIndex][0];
		this.Sprite.Specs.GS[this.i+1][3][1] += FighterSpriteOffsets[this.NationIndex][1];
	}
};
DominionFighter.prototype.ResetSpriteOffsets = function() {
	for (this.i=0;this.i<4;this.i+=2) {
		this.Sprite.Specs.GS[this.i][3][0] -= FighterSpriteOffsets[this.NationIndex][0];
		this.Sprite.Specs.GS[this.i][3][1] -= FighterSpriteOffsets[this.NationIndex][1];
		this.Sprite.Specs.GS[this.i+1][3][0] += FighterSpriteOffsets[this.NationIndex][0];
		this.Sprite.Specs.GS[this.i+1][3][1] -= FighterSpriteOffsets[this.NationIndex][1];
	}
};
DominionFighter.prototype.DrawLarge = function() {

	//UNLOGGED

	this.x = this.Position.X;
	this.y = this.Position.Y;
	this.Position.X = 75;	//HARD-CODING
	if (this.Direction==DIRECTION.E)
		this.Position.Y = 225;
	else
		this.Position.Y = 375;

	this.SetNation(this.NationIndex);
	DominionPlane.prototype.Draw.call(this);

	this.Position.X = this.x;
	this.Position.Y = this.y;
};
DominionFighter.prototype.DrawTiny = function() {

	//UNLOGGED

	this.TinySprite.Draw(this.Position.X, this.Position.Y);

};
DominionFighter.prototype.DrawRadar = function() {

	//UNLOGGED - NOTE: applicable so far to Dogfight theatre

	this.TacticalPolygon.QuickDraw();
};
