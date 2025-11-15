
//-------------------------------------------
//---------- GENIE AGENT --------------------
var GenieAgent = function() {
	var Specs, Sprite;
	var Unit, Target;
	var Form;			//Type-Value pairs will be useful, so FLIPPED-orientation / SCALED-scale / ROTATED - angle etc
	var AttachedSprites, PreAttachedSprites;
	var Angle;
	var Peak, Elevation;		//.Peak is actually the height of the agent

	//Location, movement and collision
	var ScreenRect;
	var Tile, ScreenCoords;
	var BottomLeftOffset, CentreOffset, SpriteOffset;		//coordinates
	var BoundingBox, Footprint, MoveBox;						//for screen clicks, collisions and avoidance respectively
	var BoundingRectangles, BoundingCircles;					//used optionally in collision detection
	var Steps, MaxSteps;

	//State
	var Frames;			//used occasionally, such as for timed motion interspersed with pauses
	var State;
	var Status;			//indicates if unit is EXTANT, VISIBLE; also SELECTED and (TODO) KEYSTROKE 'discreteness'
	var Stance;			//aggessiveness in percentage

	//Links
	var InfoBox, ControlPanel;
	var GraphicsTool, TextWriter, CalcPad;
	var Randomizer;
	var Space, Buffer;
	var Controller;
	var Agent;			//NOTE: pointer to parent if there is one

	//RTS
/*
	var Foes, Comrades;		//can be arrays or array of arrays, or maybe redundant with a pointer to GenieSpace
*/
	var Side;
	var Terrain;		//REDUNDANT? object Map is assumed to exist
	var Path, PathNode, PathFinding;

	//Behaviour packs
	var Animation;
	var Turning;			//all variables in this section
	var Avoidance;
	var Vision;			// are pointers to structures
	var Tracking;		// which may be in GenieTypes (TODO) . . . TODO: tracking possibly moved elsewhere
	var Sensitivity;		// OR, better yet, could try making these inline creations

	//Weaponry - NOTE: additional weapons will be declared in derived classes, although methods for some will exist in this class
	var Targeting;		//REDUNDANT?
	var Cannon, RocketPod, ShellArtillery, RocketLauncher;
	var PulseEmitter, PelletPelter, DroneDeployer, DiscDispatcher;
	var Shield, Explosion;

	var i, j, x, y, angle, distance, coords, rct, state, info;		//scratch variables - NOTE: some have to be instantiated in derived classes
};
GenieAgent.prototype = new MobileObject();
GenieAgent.prototype.Set = function(specs, sprite) {
	MobileObject.prototype.Set.call(this);

	this.Specs = specs;
	if (this.Specs) {
		this.Speed = this.Specs.SPEED || 0;
		if (this.Specs.X && this.Specs.Y) {
			this.Position.X = this.Specs.X;
			this.Position.Y = this.Specs.Y;
		}
	}

	this.Sprite = sprite;

	this.State = new AgentState();
	this.State.Motion = STATE.MOTION.STATIONARY;
	this.Status = 0;
	this.PathNode = -1;

	this.ScreenCoords = new Coordinate2D();

	this.SetAlignmentOffsets();
	this.SetBoundingBox();
	this.SetFootprint();
	this.SetTiled();

	if (this.Specs) {
		this.SetTransform();
		if (this.Specs.PEAK)
			this.SetPeak();
		this.ActivatePacks();
		if (GAME.TILES)							//make REDUNDANT
			this.Tile = new GenieTile();
	}
};
GenieAgent.prototype.SetTransform = function() {

	if (this.Specs.TRANSFORM) {
		this.Status += this.Specs.TRANSFORM.METHOD;
		this.Form = { Type: this.Specs.TRANSFORM.TYPE };
		if (this.Status==STATUS.TRANSFORM.InMETHOD) {
			if (this.Form.Type & SPRITeFORM.SCALED || this.Form.Type & SPRITeFORM.FLIPPED)
				this.Scale = new Coordinate2D();
		} else
			switch (this.Form.Type) {
				 case SPRITeFORM.ROTATED:
					 this.Form.Angle = 0;
					 break;
				 case SPRITeFORM.FLIPPED:
					 this.Form.Orientation = 0;
					 break;
				 case SPRITeFORM.SCALED:
					 this.Form.Scale = 1.0;
					 break;
			}
	}
};
GenieAgent.prototype.SetSprite = function(sprite) {

	this.Sprite = sprite;
};
GenieAgent.prototype.MakeSpecsUnique = function() {	//NOTE: this will be used for enhanced units
	this.Specs = Object.assign({}, this.Specs);		//UNTESTED!
};
GenieAgent.prototype.SwitchContext = function(cntxt) {

	if (this.Context)
		this.Context = cntxt;
	if (this.Sprite)
		this.Sprite.Context = cntxt;

	if (this.AttachedSprites)
		for (this.i=0;this.i<this.AttachedSprites.length;++this.i)
	 this.AttachedSprites[this.i].Context = cntxt;
	if (this.PreAttachedSprites)
		for (this.i=0;this.i<this.PreAttachedSprites.length;++this.i)
	 this.PreAttachedSprites[this.i].Context = cntxt;
};
GenieAgent.prototype.SetAlignmentOffsets = function() {
	var x, y;	//NOTE: these are scaling factors

	//Position offsets
	x = 0;
	y = 0;
	if (this.Specs)
		switch (this.Specs.ALIGN) {	//TODO: only implementing a few cases for now
	 case ALIGNMENT.TOpLEFT:
		 y += 1;
		 break;
	 case ALIGNMENT.BOTTOmCENTRE:
		 x -= 0.5;
		 break;
	 case ALIGNMENT.CENTRE:
		 x -= 0.5;
		 y += 0.5;
		 break;
	 }
	this.BottomLeftOffset = new Coordinate2D();
	this.CentreOffset = new Coordinate2D();
	if (this.Sprite) {
		this.BottomLeftOffset.Set(x*this.Sprite.Specs.W, y*this.Sprite.Specs.W);
		this.CentreOffset.Set((x+0.5)*this.Sprite.Specs.W, (y-0.5)*this.Sprite.Specs.H);
	} else {
		this.BottomLeftOffset.Set(x*this.Specs.W, y*this.Specs.W);
		this.CentreOffset.Set((x+0.5)*this.Specs.W, (y-0.5)*this.Specs.H);
	}

	//Sprite drawing offsets
	if (this.Sprite) {
		switch (this.Sprite.Specs.ALIGN) {	//NOTE: was this.Sprite.Specs.DrawStart
	 case ALIGNMENT.TOpLEFT:		//NOTE: not sure if there will ever be more than 3 cases
		 y -= 1;
		 break;
	 case ALIGNMENT.BOTTOmCENTRE:
		 x += 0.5;
		 break;
	 case ALIGNMENT.CENTRE:
		 x += 0.5;
		 y -= 0.5;
		 break;
		}
		if (x || y) {
	 this.SpriteOffset = new Coordinate2D();
	 this.SpriteOffset.X = x*this.Sprite.Specs.W;
	 this.SpriteOffset.Y = y*this.Sprite.Specs.H;
		}
	}
};
GenieAgent.prototype.SetBoundingBox = function() {

	this.BoundingBox = new GenieRect();

	if (this.Specs)
		if (this.Specs.BB) {						//square
			this.BoundingBox.W = this.Specs.BB;
			this.BoundingBox.H = this.Specs.BB;
			return;
		} else if (this.Specs.BR) {			//rectangle
			this.BoundingBox.W = this.Specs.BR.W;
			this.BoundingBox.H = this.Specs.BR.H;
			return;
		} else if (this.Specs.BC) {			//circle
			this.BoundingBox.W = 2 * this.Specs.BC;
			this.BoundingBox.H = 2 * this.Specs.BC;
			return;
		}
		if (this.Specs.W) {
			this.BoundingBox.W = this.Specs.W;
			this.BoundingBox.H = this.Specs.H;
			return;
		}

	if (this.Sprite)
		if (this.Sprite.Specs) {
			this.BoundingBox.W = this.Sprite.Specs.W;
			this.BoundingBox.H = this.Sprite.Specs.H;
		}
};
GenieAgent.prototype.SetFootprint = function() {

	this.Footprint = new GenieRect();

	if (this.Specs) {
		if (this.Specs.FOOTPRINT) {

			//Width
			if (this.Specs.FOOTPRINT.W)
				this.Footprint.W = this.Specs.FOOTPRINT.W;
			else
				this.Footprint.W = this.Specs.W || this.Sprite.Specs.W;	//NOTE: not checking if there is a sprite since w/o one .W will be specified

			//Breadth
			if (this.Specs.FOOTPRINT.B)
				this.Footprint.H = this.Specs.FOOTPRINT.B;			//NOTE: .H refers to breadth on the ground
			else
				this.Footprint.H = this.Specs.B || this.Footprint.W;
		} else {  //NOTE: without a .Sprite, there could be errors - this should be rectified in design
			this.Footprint.W = this.Specs.W || this.Sprite.Specs.W;
			this.Footprint.H = this.Specs.B || this.Footprint.W;
		}
	} else {  //NOTE: without a .Sprite, there could be errors - this should be rectified in design
		this.Footprint.W = this.Sprite.Specs.W;
		this.Footprint.H = this.Footprint.W;
	}
};
GenieAgent.prototype.SetPeak = function() {

	if (this.Specs.PEAK===true)
		this.Peak = this.Sprite.Specs.H;
	else
		this.Peak = this.Specs.PEAK;
};
GenieAgent.prototype.SetTerrain = function(trrn) {

	this.Terrain = trrn;
};
GenieAgent.prototype.SetTiled = function() {  //enable tiling if necessary
	var game;

	game = typeof Game;
	if (game!="undefined")
		if (Game.CheckTiled())
			this.Tile = new GenieTile();
};		
GenieAgent.prototype.SetTile = function(c, r) {

	this.Tile.Set(c, r);
	if (this.Terrain) {
		this.Position.X = this.Tile.C * this.Terrain.Specs.TILE.W;
		this.Position.Y = this.Tile.R * this.Terrain.Specs.TILE.H;
		if (this.Specs.OFFSET) {
			this.Position.X += this.Specs.OFFSET.X;
			this.Position.Y += this.Specs.OFFSET.Y;
		}
	}
};
GenieAgent.prototype.SetAmmoList = function(lAmmo) {

	this.Weapon.SetAmmoList(lAmmo);
};
GenieAgent.prototype.SetLists = function(lAmmo, lTips) {  //NOTE: for Cannon

	this.Weapon.SetLists(lAmmo, lTips);
};
GenieAgent.prototype.ActivatePacks = function() {

	//Behaviour
	if (this.Specs.SELECTION) {
//		this.SetSelection();	TEMP disabled
	}
	if (this.Specs.TURN)
		this.SetTurning();
	if (this.Specs.AVOIDANCE)
		this.SetAvoidance();
	if (this.Specs.ANIMATION)
		this.SetAnimation();
	if (this.Specs.SENSITIVITY)
		this.SetSensitivity();
	if (this.Specs.TRACKING)
		this.SetTracking();
	if (this.Specs.TARGETING)
		this.SetTargeting();
	if (this.Specs.EXPLOSION)				//REDUNDANT? only need to call ::Explode, but might need to save link to correct explosion list
		this.SetExplosion();

	//TODO: might move below to an ::ActivateWeapons METHOD

	//Weapons
	if (this.Specs.CANNON) {
		this.Cannon = new GenieCannon();
		this.Cannon.Set(this.Specs.CANNON, this);
	}
	if (this.Specs.POD) {
		this.RocketPod = new GenieRocketPod();
		this.RocketPod.Set(this.Specs.POD, this);
	}

//	if (this.Specs.SHIELD)
//		this.ActivateShieldPack();
	if (this.Specs.PELTER) {
		this.PelletPelter = new GeniePelter();
		this.PelletPelter.Set(this.Specs.PELTER, this);
	}
};
GenieAgent.prototype.SetAngle = function(angl) {

	this.Angle = angl;
};
GenieAgent.prototype.SetScale = function(scl) {

	this.Scale.Set(scl.X, scl.Y);
};
GenieAgent.prototype.Select = function() {

	this.Status |= STATUS.SELECTED;
};
GenieAgent.prototype.DeSelect = function() {

	this.Status -= STATUS.SELECTED;
};
GenieAgent.prototype.CheckSelected = function() {

	return (this.Status & STATUS.SELECTED);
};
GenieAgent.prototype.SetExtant = function() {

	this.Status |= STATUS.EXTANT;
};
GenieAgent.prototype.UnsetExtant = function() {

	this.Status -= STATUS.EXTANT;
};
GenieAgent.prototype.CheckExtant = function() {

	return (this.Status & STATUS.EXTANT);
};
GenieAgent.prototype.SetVisible = function() {

	this.Status |= STATUS.VISIBLE;
};
GenieAgent.prototype.UnsetVisible = function() {

	this.Status -= STATUS.VISIBLE;
};
GenieAgent.prototype.CheckVisible = function() {

	return (this.Status & STATUS.VISIBLE);
};
