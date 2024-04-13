
//--------------------------------------------  Specs = { RANGE: { MIN: -1, MAX: -1 }, LOAD: -1, INCREMENT: 1, POINTS: -1, TYPE: TYPE: TYPE.AIM.XXX,
//---------- GENIE WEAPON --------------------				 POTENCY: -1, SOUND: -1 }
var GenieWeapon = function() {
	var Specs;
	var Asset;											//pointer to weapon owner
	var Type;											//aiming strategy (targeted point/straight ahead, etc.)
	var Min, Max;
	var State;
	var AmmoList;
	var Load, Rate;									//.Load same as charge
	var Accuracy, TriggerThreshold;				//REDUNDANT and to be moved, respectively (possibly)
	var Distance, Vector, Range, Gradient;		//.Distance weapon release and target (or spot), .Gradient the elevation differential from target midpoint
	var Destination;									//target centre
	var DischargePoint;								//offset locations where ammo will be fired from

	var i, coords, dstnc, dstntn;		//scratch variables - some should be REDUNDANT when triggering is moved out
};
GenieWeapon.prototype = {
	Set(specs, asst) {
		this.Specs = specs;
		this.Asset = asst;
		this.Type = this.Specs.TYPE || WEAPON.TYPE.BLAST;					//TODO: fairly sure that BLAST will be default, but not 100% sure
		if (this.Specs.RANGE) {
			this.Min = this.Specs.RANGE.MIN;
			this.Max = this.Specs.RANGE.MAX;
		}
		this.Load = this.Specs.LOAD || WEAPON.LOAD;
		this.Rate = this.Specs.INCREMENT || WEAPON.INCREMENT;
		this.State = WEAPON.STATE.ARMED;
		this.Accuracy = 0;
		this.SetCoords();

		this.dstntn = new Coordinate2D();
		this.coords = new Coordinate2D();
	},
	SetCoords() {

		this.DischargePoint = new Coordinate2D();
		this.Destination = new Coordinate2D();
		this.Vector = new Coordinate2D();
	},
	SetAmmoList(lAmmo) {

		this.AmmoList = lAmmo;
	},
	Activate() {  //???

		if (this.Load==(this.Specs.LOAD || WEAPON.LOAD))
			this.State = WEAPON.STATE.ARMED;
		else
			this.State = WEAPON.STATE.ReARMING;
		this.GenerateTriggerThreshold();
	},
	DeActivate() {

		this.State = WEAPON.STATE.INACTIVE;
	},
	GenerateTriggerThreshold() {  //NOTE: absolutely expecting a RANGE: "{ MAX: xx, MIN: xx }" to be supplied

		if (this.Asset.Stance)
	 this.TriggerThreshold = this.Specs.RANGE.MIN + (this.Asset.Stance*((this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)/100));
		else
	 this.TriggerThreshold = this.Specs.RANGE.MIN + this.Asset.Randomizer.GetNumberWithinRange(0, (this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)-1);
	},
	Update() {

		switch (this.State) {  //ASSUMPTION: will only be called if weapon is activated
			case WEAPON.STATE.ARMED:
				if (this.Asset.Target) {
					this.Distance = Utilities.GetDistance(this.Asset.Position, this.Asset.Target.Position);
					if (this.Distance<=this.TriggerThreshold)
						this.Fire();
				}
				break;
			case WEAPON.STATE.ARMING:
				this.Load += this.Increment;
				if (this.Load==(this.Specs.LOAD || WEAPON.LOAD))
					this.State = WEAPON.STATE.ARMED;
				break;
		}
	},
	DetermineTargetDistance() {

		this.coords.X = this.Asset.Position.X + this.Asset.CentreOffset.X;
		this.coords.Y = this.Asset.Position.Y + this.Asset.CentreOffset.Y;
		if (this.Asset.Target.Position) {
	 this.dstntn.X = this.Asset.Target.Position.X + this.Asset.Target.CentreOffset.X;
	 this.dstntn.Y = this.Asset.Target.Position.Y + this.Asset.Target.CentreOffset.Y;
	 this.Distance = SpaceUtils.GetDistance(this.coords, this.dstntn);
		} else
	 this.Distance = SpaceUtils.GetDistance(this.coords, this.Asset.Target);
	},
	DetermineDestination(pnt) {

		if (this.Type!=WEAPON.TYPE.BLAST)
	 if (!this.Distance)
		 this.DetermineTargetDistance();

		switch (this.Type) {
	 case WEAPON.TYPE.BLAST:
		 this.GetBlastDestination();
		 break;
	 case WEAPON.TYPE.DIRECTION:
		 this.GetDirectionalDestination();
		 break;
	 case WEAPON.TYPE.TARGET:
		 this.GetTargetedDestination();
		 break;
	 case WEAPON.TYPE.SPOT:
		 this.GetSpotDestination();
		 break;
	 case WEAPON.TYPE.TRACK:
		 this.GetTrackedDestination();
		 break;
		}
	},
	GetBlastDestination() {

		//UNLOGGED

	},
	GetDirectionalDestination() {

		this.Distance = this.Asset.Randomizer.GetInRange((this.Specs.RANGE.MIN+this.Specs.RANGE.MAX)/2, this.Specs.RANGE.MAX);
		this.Destination.X = this.Asset.Position.X + this.Distance*Math.sin(Utilities.DegreesToRadians(this.Asset.Angle));
		this.Destination.Y = this.Asset.Position.Y - this.Distance*Math.cos(Utilities.DegreesToRadians(this.Asset.Angle));
	},
	GetTargetedDestination() {
		var cCentre;  //c- coords
		var brdth;

		//Distance, projectile vector
		if (this.Specs.PERSPECTIVE)
			brdth = this.Asset.Target.Specs.B | this.Asset.Target.CentreOffset.X;
		else
			brdth = this.Asset.Target.CentreOffset.Y;
		cCentre = { X: this.Asset.Target.Position.X+this.Asset.Target.CentreOffset.X, Y: this.Asset.Target.Position.Y+brdth };
		this.Distance = SpaceUtils.GetDistance(this.DischargePoint, cCentre);
		this.Range = this.Asset.Randomizer.GetInRange(this.Specs.Min, this.Specs.Max);
		this.Vector.X = cCentre.X - this.DischargePoint.X;
		this.Vector.Y = cCentre.Y - this.DischargePoint.Y;

		//Check if target is hit, adjust destination if not
		if (this.Range<this.Distance) {
			this.Vector.X *= this.Range / this.Distance;
			this.Vector.Y *= this.Range / this.Distance;
			this.Distance = this.Range;
			this.Destination.X = this.DischargePoint.X + this.Vector.X;
			this.Destination.Y = this.DischargePoint.Y + this.Vector.Y;
		} else {
			this.Destination.X = cCentre.X;
			this.Destination.Y = cCentre.Y;
		}

		//Gradient
		if (this.Specs.E)		//check if weapon has an elevation
			this.Gradient = (this.Asset.Target.GetMidpoint()-this.Specs.E) / this.Distance;
/*
		//Check if target is hit
		this.dstnc = this.Asset.Randomizer.GetInRange((this.Specs.RANGE.MIN+this.Specs.RANGE.MAX)/2, this.Specs.RANGE.MAX);
		if (this.Distance<=(this.Specs.RANGE.MIN+this.Specs.RANGE.MAX)/2 || this.Accuracy>this.Distance || this.dstnc>this.Distance) {  //3 hit options
	 this.Destination.X = this.Asset.Target.Position.X + this.Asset.Target.CentreOffset.X;
	 this.Destination.Y = this.Asset.Target.Position.Y + this.Asset.Target.CentreOffset.Y;
		} else {
	 this.Destination.X = this.Asset.Position.X + this.Asset.Target.CentreOffset.X;
	 this.Destination.X += ((this.dstnc/this.Distance)*(this.Asset.Target.Position.X-this.Asset.Position.X));
	 this.Destination.Y = this.Asset.Position.Y + this.Asset.Target.CentreOffset.Y;
	 this.Destination.Y += ((this.dstnc/this.Distance)*(this.Asset.Target.Position.Y-this.Asset.Position.Y));
		}
*/
	},
	GetSpotDestination() {

		this.dstnc = this.Asset.Randomizer.GetInRange((this.Specs.RANGE.MIN+this.Specs.RANGE.MAX)/2, this.Specs.RANGE.MAX);
		if (this.dstnc>=this.Distance) {
	 this.Destination.X = this.Asset.Target.X;
	 this.Destination.Y = this.Asset.Target.Y;
		} else {
	 this.Destination.X = this.Asset.Position.X + ((this.dstnc/this.Distance)*(this.Asset.Target.X-this.Asset.Position.X));
	 this.Destination.Y = this.Asset.Position.Y + ((this.dstnc/this.Distance)*(this.Asset.Target.Y-this.Asset.Position.Y));
		}
	},
	GetTrackedDestination() {

		this.Destination.X = this.Asset.Target.Position.X;
		this.Destination.Y = this.Asset.Target.Position.Y;
	},
	CheckFire() {  //NOTE: mostly for AI units, checking whether target is in range (and maybe if there are friendlies in the way . . . TODO)

		//UNLOGGED

		if (!this.Distance)
	 this.DetermineTargetDistance();

		//TODO: check units in between, friend and foe

		return (this.Distance>=this.Specs.RANGE.MIN && this.Distance<=this.Specs.RANGE.MAX);
	},
	Fire(pnt) {  //pnt is target location

		this.Asset.GetDischargePoint(this.DischargePoint);
		this.DetermineDestination(pnt);
		this.Load = 0;
		this.State = WEAPON.STATE.FIRING;

		if (this.Asset.CheckVisible())
	 if (this.Specs.SOUND)
		 SoundFX[this.Specs.SOUND].Play();
	},
	GetSuccessProbability() {  //returns range from 0 to 1 . . . unused, so probably REDUNDANT
		var success, steps, threshold;

		//TODO: have to decide if this is needed (has already been implemented in GenieCannon)

		if (distance<this.Specs.MIN || distance>this.Specs.MAX)	
	 return (0);
		else {
	 success = distance/maxRange-minRange;
	 if (!this.Specs.SEGMENTS)
		 return (success);
	 else {
		 steps = 1/this.Specs.SEGMENTS;
		 threshold = 1;
		 while (threshold>success)
			  threshold -= steps;
		 return (threshold);
	 }
		}
	},
	CheckCharged() {

		return (this.State==WEAPON.STATE.ARMED);
	}
};
