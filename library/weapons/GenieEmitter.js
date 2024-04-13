//NOTE: for STATE, ACTIVATED but not CHARGED means charging
/*
 *  TODO: there needs to be a revision since there should be only one reticle structure that all cannons link to, rather than each cannon having its own
 */
//---------------------------------------------
//---------- GENIE EMITTER --------------------  NOTE: cannot function unless part of an Agent, or another entity with certain links
var GeniePulseEmitter = function() {
   var FocusArc;
   var Charge;			//in frames
   var TriggerThreshold;
   var Distance;		//between agent and target
//   var Quality;		//rating reflects degree of inaccuracy, so less is better
   var FocusArcAngle;

   var distance, percentage;
};
GeniePulseEmitter.prototype = new GenieWeapon();
GeniePulseEmitter.prototype.Set = function(specs, agnt) {
   GenieWeapon.prototype.Set.call(this, specs, agnt);
/*
   if (this.Specs.FOCUS) {
      this.Reticle = new GenieCircle();
      this.Reticle.Set(this.Agent.Screen || this.Agent.Sprite.Context);
   }
*/
   this.FocusArcAngle = 0;
};
GeniePulseEmitter.prototype.Update = function() {
   //-this is merely for focus arc angle incrementation, so only 1 or 2 lines will likely be needed (or 3 or 4)
};
GeniePulseEmitter.prototype.DrawFocusArcs = function() {

   //UNLOGGED
/*
      this.Distance = Utilities.GetDistance(this.Agent.Position, this.Agent.Target.Position);
      if (this.Distance<=this.Specs.RANGE.MAX) {  //check within range
	 this.coords.X = this.Agent.Target.ScreenCoords.X + this.Agent.Target.CentreOffset.X;	//WARNING!!! coords won't be
	 this.coords.Y = this.Agent.Target.ScreenCoords.Y + this.Agent.Target.CentreOffset.Y;	//  adjusted once GenieAgent is done
	 this.percentage = (1 - ((this.Distance-this.Specs.RANGE.MIN)/(this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)))*100;
	 if (this.percentage>100)
	    this.percentage = 100;
	 this.Reticle.DrawStaggered(this.coords.X, this.coords.Y, (this.Agent.Target.Sprite.Diagonal/2)+1, "red", 1, 8, this.percentage);
	 //ASSUMPTION: more of an expectation, that diagonals in all sprites will be pre-calculated
	//ISSUE: HARD-CODING!!! - need RETICLE.SEGMENTS, and maybe .COLOUR too
      }
*/
};
GeniePulseEmitter.prototype.Emit = function(mode) {  //NOTE: 2 cases implemented - firing to mouse click, or at target

   //UNLOGGED
/*
   //TODO: measure distance, calculate probability of success
   //TODO: need an accuracy field in specs to predict behaviour
   //TODO: 2 firing options - either fire only when fully charged, or fire a limited amount (proportional to charge)

   mode = mode || 0;
   this.distance = this.Specs.RANGE.MIN + this.Agent.Randomizer.GetNumberWithinRange(0, (this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)-1);
   switch (mode) {  //NOTE: 3 ways to fire - threshold is triggered, mouse is clicked, or a firing key is pressed
      case WEAPON.FIRE.THRESHOLD:  //NOTE: in this case, .Distance is pre-calculated
	 this.dstn.X = this.Agent.Position.X + ((this.distance/this.Distance)*(this.Agent.Target.Position.X-this.Agent.Position.X));
	 this.dstn.Y = this.Agent.Position.Y + ((this.distance/this.Distance)*(this.Agent.Target.Position.Y-this.Agent.Position.Y));
	 break;
      case WEAPON.FIRE.MOUSE:
	 Mouse.GetClickCoordinates(this.coords);
	 if (this.Agent.Perspective)
	    GeoUtils.PerspectiveAdjust(this.coords, this.Agent.Perspective, REVERSE);
	 this.Distance = Utilities.GetDistance(this.Agent.Position, this.coords);
	 this.dstn.X = this.Agent.Position.X + ((this.distance/this.Distance)*(this.coords.X-this.Agent.Position.X));
	 this.dstn.Y = this.Agent.Position.Y + ((this.distance/this.Distance)*(this.coords.Y-this.Agent.Position.Y));
	 break;
      case WEAPON.FIRE.KEY:
	 //-have to get firing direction
	 break;
   }

   this.Agent.GetFiringPoint(this, this.coords);
   this.ProjectileList.Add(this.Agent.Position, this.dstn, this.distance, this.Specs);
   this.State = WEAPON.STATE.ARMING;
   this.Load = 0;

   if (this.Specs.SOUND!==undefined)
      SoundFX[this.Specs.SOUND].Play();
*/
};
