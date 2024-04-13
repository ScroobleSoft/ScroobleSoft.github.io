
//--------------------------------------------
//---------- GENIE CANNON --------------------  NOTE: cannot function unless part of an Asset (Agent or Structure)
var GenieCannon = function() {			
	var Laser, LaserDot, LaserTip;												//TODO: LaserTip basically LaserSpark?
	var Dots, DotsFired, DotElevation, DotColour, DotPosition;			//TODO: .DotColour to be replace by .LaserColour
	var LaserColour;
	var TipList;
	var Gap;

	var distance, percentage;
};
GenieCannon.prototype = new GenieWeapon();
GenieCannon.prototype.Set = function(specs, asst) {	//Specs: { RANGE: { MIN: 150, MAX: 250 }, POTENCY: 1, LOAD: 150, F: 45, LW: 3, OPACITY: 1.0 (default)
	GenieWeapon.prototype.Set.call(this, specs, asst);	//		 DOT: { R: 1.5, GAP: 2, H: -1, COLOUR: "", CHAIN: 5 } . . . 'COLOUR' and 'H' are optional

	this.Type = WEAPON.TYPE.TARGET;
	if (!this.Min || !this.Max) {
		this.Min = CANNON.RANGE.MIN;
		this.Max = CANNON.RANGE.MAX;
	}
	this.DotPosition = new Coordinate2D();
	this.Gap = new Coordinate2D();
};
GenieCannon.prototype.SetLists = function(lAmmo, lTip) {

	this.SetAmmoList(lAmmo);
	this.TipList = lTip;
};
GenieCannon.prototype.SetColour = function(colour) {

	this.LaserColour = colour;
};
GenieCannon.prototype.Update = function() {  //NOTE: called only if weapon is active
	GenieWeapon.prototype.Update.call(this);

	//TODO: have to add Line vs Dot possibility, chosen in specs

	if (this.State==WEAPON.STATE.FIRING) {
		for (this.i=0;this.i<this.Specs.DOT.CHAIN;++this.i) {
			this.LaserDot = this.AmmoList.Get();
			this.LaserDot.Activate(this.DotPosition, this.DotElevation, this.DotColour);
			++this.DotsFired;
			if (this.DotsFired==this.Dots) {
				this.LaserTip.SetPosition(this.DotPosition);
				this.State = WEAPON.STATE.ARMING;
				return;
			}
			this.DotPosition.X += this.Gap.X;
			this.DotPosition.Y += this.Gap.Y;
			this.DotElevation += this.Gradient * this.Specs.DOT.GAP;
		}
	}
};
GenieCannon.prototype.Fire = function() {
	GenieWeapon.prototype.Fire.call(this);

	//Calculate gaps between dots
	this.Dots = Math.round(this.Distance/this.Specs.DOT.GAP);		//NOTE: .Distance already calculated
	this.DotsFired = 0;
	this.DotColour = this.Asset.GetLaserColour();
	this.DotPosition.X = this.DischargePoint.X;
	this.DotPosition.Y = this.DischargePoint.Y;
	this.DotElevation = this.Specs.E || 0;
	this.Gap.X = this.Vector.X / this.Dots;
	this.Gap.Y = this.Vector.Y / this.Dots;

	//Attach tip to list
	this.LaserTip = this.TipList.Get();
	this.i = this.Asset.GetTipState();
	this.LaserTip.Activate(this.DischargePoint, this.Destination, this.Gradient, this.i, this.Asset);
};
GenieCannon.prototype.Zap = function() {  //TODO: could replace ::FIRE, all UNLOGGED
	GenieWeapon.prototype.Fire.call(this);

	this.Asset.GetZapPoint(this.DischargePoint);
	//-have to determine beam/dot here
	if (Game.View.Perspective) {

	//Calculate gaps between dots
	this.Dots = Math.round(this.Distance/this.Specs.DOT.GAP);		//NOTE: .Distance already calculated
	this.DotsFired = 0;
	this.DotColour = this.Asset.GetLaserColour();
	this.DotPosition.X = this.DischargePoint.X;
	this.DotPosition.Y = this.DischargePoint.Y;
	this.DotElevation = this.Specs.E || 0;
	this.Gap.X = this.Vector.X / this.Dots;
	this.Gap.Y = this.Vector.Y / this.Dots;

	//Attach tip to list
	this.LaserTip = this.TipList.Get();
	this.i = this.Asset.GetTipState();
	this.LaserTip.Activate(this.DischargePoint, this.Destination, this.Gradient, this.i, this.Asset);

	} else {
		this.Laser = this.Asset.LaserList.GetOpen();
		this.Laser.Activate(this.DischargePoint, this.Destination, this.Gradient, this.LaserColour, this.Specs.LW, this.Specs.OPACITY);
	}
};
/**************** everything below here either REDUNDANT or moved to Triggering/Sensitivity
	var Reticle, TriggerThreshold;

Specs = { COLOUR: "", LW: 3, OPACITY: 1.0, F: 90, RETICLE: true,
	  ARC: {  A: 45, COLOUR: "yellow", OPACITY: 0.5 },
	  RANGE: { MIN: -1, MAX: -1 }, ReLOAD: -1, POINTS: -1, POTENCY: -1, SOUND: -1 }

	this.LaserSpecs = { COLOUR: this.Specs.COLOUR, LW: this.Specs.LW, OPACITY: this.Specs.OPACITY };
	if (this.Specs.RETICLE) {
		this.Reticle = new GenieCircle();
		this.Reticle.Set(this.Asset.Screen || this.Asset.Sprite.Context);
	}
	this.DischargeData = { X: -1, Y: -1, Colour: "" };

GenieCannon.prototype.DrawReticle = function() {
		this.Distance = Utilities.GetDistance(this.Asset.Position, this.Asset.Target.Position);
		if (this.Distance<=this.Specs.RANGE.MAX) {  //check within range
	 this.coords.X = this.Asset.Target.ScreenCoords.X + this.Asset.Target.CentreOffset.X;	//WARNING!!! coords won't be
	 this.coords.Y = this.Asset.Target.ScreenCoords.Y + this.Asset.Target.CentreOffset.Y;	//  adjusted once GenieAgent is done
	 this.percentage = (1 - ((this.Distance-this.Specs.RANGE.MIN)/(this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)))*100;
	 if (this.percentage>100)
		 this.percentage = 100;
	 this.Reticle.DrawStaggered(this.coords.X, this.coords.Y, (this.Asset.Target.Sprite.Diagonal/2)+1, "red", 1, 8, this.percentage);
	 //ASSUMPTION: more of an expectation, that diagonals in all sprites will be pre-calculated
	//ISSUE: HARD-CODING!!! - need RETICLE.SEGMENTS, and maybe .COLOUR too
		}
};
GenieCannon.prototype.Fire = function(mode) {  //NOTE: 2 cases implemented - firing to mouse click, or at target

	//TODO: measure distance, calculate probability of success
	//TODO: need an accuracy field in specs to predict behaviour
	//TODO: 2 firing options - either fire only when fully charged, or fire a limited amount (proportional to charge)

	mode = mode || 0;
	this.distance = this.Specs.RANGE.MIN + this.Asset.Randomizer.GetNumberWithinRange(0, this.Specs.RANGE.MAX-this.Specs.RANGE.MIN);
	switch (mode) {  //NOTE: 3 ways to fire - threshold is triggered, mouse is clicked, or a firing key is pressed
		case WEAPON.FIRE.THRESHOLD:  //NOTE: in this case, .Distance is pre-calculated
	 this.dstntn.X = this.Asset.Position.X + ((this.distance/this.Distance)*(this.Asset.Target.Position.X-this.Asset.Position.X));
	 this.dstntn.Y = this.Asset.Position.Y + ((this.distance/this.Distance)*(this.Asset.Target.Position.Y-this.Asset.Position.Y));
	 break;
		case WEAPON.FIRE.MOUSE:
	 Mouse.GetClickCoordinates(this.dstn);
	 if (this.Asset.Perspective)
		 GeoUtils.PerspectiveAdjust(this.dstn, this.Asset.Perspective, REVERSE);
	 if (this.Asset.ScreenRect) {
		 this.dstntn.X += this.Asset.ScreenRect.L;
		 this.dstntn.Y += this.Asset.ScreenRect.T;
	 }
	 this.Distance = Utilities.GetDistance(this.Asset.Position, this.dstn);
	 if (this.Distance>this.Specs.RANGE.MAX) {
		 //TODO: nothing should happen, or else could have a tiny spark at the end of the gun indicating fizzled attempt
		 return;
	 } else if (this.Distance>=this.Specs.RANGE.MIN && this.distance<this.Distance) {
		 this.dstntn.X = this.Asset.Position.X + ((this.distance/this.Distance)*(this.dstntn.X-this.Asset.Position.X));
		 this.dstntn.Y = this.Asset.Position.Y + ((this.distance/this.Distance)*(this.dstntn.Y-this.Asset.Position.Y));
	 }
	 break;
		case WEAPON.FIRE.KEY:
	 //-have to get firing direction
	 break;
	}

	this.Asset.GetFiringPoint(this.coords);  //TODO: instead, get firing data, which includes determination of other unit/obstacle getting hit
						 //		  - obstacle should cause spark where laser hits (need spark indicator)
						 //		  - foe unit other than target should suffer impact
						 //		  - friendly unit should cause spark at firing point
						 //		  - correct coords have to be determined
						 //		  - need a pointer to a sparks list
	this.ProjectileList.Add(this.coords, this.dstntn, this.distance, this.Specs);
	this.State = WEAPON.STATE.ARMING;
	this.Load = 0;

	if (this.Specs.SOUND!==undefined)
		SoundFX[this.Specs.SOUND].Play();
};
//----------
//  TODO: want to simplify above, and one way to do that is to break ::Fire into ::Update and ::Fire
//----------

Update() {

	if (!this.Controller) {	//NOTE: all units under the influence of the Controller have to be manually triggered
		if (this.Asset.Target) {
	 //check if at or under trigger threshold, then fire
		} else {
	 //-scan for targets
	 //	this is complicated by
	 //	 .Direction or .Angle
	 //	 .FOV (could do scan, then check which units found are in FOV)
		}
		//-it isn't as simple as getting target and firing since have to turn towards it until it in Firing Arc
	}
};

	this.Laser = this.AmmoList.Get();
	this.Laser.Activate(this.FiringPoints[i], this.Destination, this.LaserSpecs);

	if (this.Destination.X==(this.Asset.Target.Position.X+this.Asset.Target.CentreOffset.X) &&
		this.Destination.Y==(this.Asset.Target.Position.Y+this.Asset.Target.CentreOffset.Y))
		this.Asset.Target.Hit(this.Specs.POTENCY);
	else
		if (this.FizzleList) {
	 this.Spark = this.FizzleList.Get();
	 this.Spark.Activate(this.Destination);
		}

	for (i=0;i<this.FiringPoints.length;++i) {
	}
*/
