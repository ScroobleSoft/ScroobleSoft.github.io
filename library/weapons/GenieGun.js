/*
 *  UNLOGGED
 */
//-----------------------------------------
//---------- GENIE GUN --------------------
var GenieGun = function() {			
   var Crosshairs;
   var TriggerThreshold;
   var Bullet;
   var Sprite;

   var distance, percentage;
};
GenieGun.prototype = new GenieWeapon();
GenieGun.prototype.Set = function(specs, asst) {	//Specs = { COLOUR: "", LW: 3, OPACITY: 1.0, F: 90, RETICLE: true,
							//	    ARC: {  A: 45, COLOUR: "yellow", OPACITY: 0.5 },
   GenieWeapon.prototype.Set.call(this, specs, asst);	//  RANGE: { MIN: -1, MAX: -1 }, ReLOAD: -1, POINTS: -1, POTENCY: -1, SOUND: -1, LIST: FXlISTs.LASERS,
							//						FIZZLES: FXlISTs.SPARKS, BLOCKS: FXlISTs.BLOCKS };
   this.Type = WEAPON.TYPE.TARGET;
   this.LaserSpecs = { COLOUR: this.Specs.COLOUR, LW: this.Specs.LW, OPACITY: this.Specs.OPACITY };
   if (this.Specs.RETICLE) {
      this.Reticle = new GenieCircle();
      this.Reticle.Set(this.Asset.Screen || this.Asset.Sprite.Context);
   }
   this.DischargeData = { X: -1, Y: -1, SpriteState: -1 };
};
GenieGun.prototype.Shoot = function(mode) {  //NOTE: 2 cases implemented - firing to mouse click, or at target

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

   this.Asset.GetDischargeData(this.DischargeData);
   this.ProjectileList.Add(this.coords, this.dstntn, this.distance, this.Specs);
   this.State = WEAPON.STATE.ARMING;
   this.Load = 0;

   if (this.Specs.SOUND!==undefined)
      SoundFX[this.Specs.SOUND].Play();
};
//----------
//  TODO: want to simplify above, and one way to do that is to break ::Fire into ::Update and ::Fire
//----------
GenieGun.prototype.Update = function() {  //NOTE: called only if weapon is active
   GenieWeapon.prototype.Update.call(this);

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
GenieGun.prototype.Shoot = function() {  //TODO: used in GJ STRATEGIC, will replace actual fire
   GenieWeapon.prototype.Fire.call(this);

   var i;

   if (this.Destination.X==(this.Asset.Target.Position.X+this.Asset.Target.CentreOffset.X) &&
		this.Destination.Y==(this.Asset.Target.Position.Y+this.Asset.Target.CentreOffset.Y))
      this.Asset.Target.Hit(this.Specs.POTENCY);
   else
      if (this.FizzleList) {
	 this.Spark = this.FizzleList.Get();
	 this.Spark.Activate(this.Destination);
      }

   for (i=0;i<this.FiringPoints.length;++i) {
      this.Laser = this.ProjectileList.Get();
      this.Laser.Activate(this.FiringPoints[i], this.Destination, this.LaserSpecs);
   }
};
