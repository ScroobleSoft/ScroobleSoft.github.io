
//-------------------------------------------
//---------- GENIE SHELL --------------------  NOTE: cannot function unless part of an Agent
var GenieShell = function() {
   var Agent;
   var Specs;
   var ShellList;
   var State;
   var TriggerThreshold;
   var Distance;		//between agent and target
//   var Quality;		//rating reflects degree of inaccuracy, so less is better
//   var Laser;
   var BullsEye;

   var coords, distance, percentage;
};
GenieShell.prototype = {
   Set(specs, agnt) {
      this.Specs = specs;
      this.Agent = agnt;
      this.LaserList = FXLists[this.Specs.LIST];
      if (this.Specs.BullsEye) {
	 this.BullsEye = new GenieCircle();
	 this.BullsEye.Set(this.Agent.Sprite.Context);
      }

      this.coords = new Coordinate2D();
   },
   Activate() {

      //UNLOGGED

      if (this.Charge==(this.Specs.CHARGE || CANNON.CHARGE))
	 this.State = WEAPON.STATE.ARMED;
      else
	 this.State = WEAPON.STATE.ReARMING;
   },
   DeActivate() {

      //UNLOGGED

      this.State = WEAPON.STATE.INACTIVE;
   },
   GenerateTriggerThreshold() {

      //UNLOGGED - UNTESTED . . . NOTE: absolutely expecting a RANGE: "{ MAX: xx, MIN: xx }" to be supplied
/*
      var min, range;

      if (this.Agent.Stance) {
	 range = Math.round((this.Specs.MAX-this.Specs.MIN)/STANCE.TYPES);  //NOTE: STANCE.TYPES can be re-defined per app
	 min = this.Specs.MIN + ((this.Agent.Stance-1)*range);
	 this.Activated = min + Utilities.GetRandomNumber(range);
      } else
	 this.Activated = this.Specs.MIN + Utilities.GetRandomNumber(this.Specs.MAX-this.Specs.MIN);
*/
      if (this.Agent.Stance)
	 this.TriggerThreshold = this.Specs.RANGE.MIN + (this.Agent.Stance*((this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)/100));
      else
	 this.TriggerThreshold = this.Specs.RANGE.MIN + this.Agent.Randomizer(0, (this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)-1);
   },
   Update() {

      //UNLOGGED

      switch (this.State) {  //ASSUMPTION: will only be called if weapon is activated
	 case WEAPON.STATE.ARMED:
	    if (this.Agent.Target) {
	       this.Distance = Utilities.GetDistance(this.Agent.Position, this.Agent.Target.Position);
	       if (this.Distance<=this.TriggerThreshold)
		  this.Fire();
	       }
	    break;
	 case WEAPON.STATE.ARMING:
	    ++this.Charge;
	    if (this.Charge==(this.Specs.CHARGE || CANNON.CHARGE) )
	        this.State = WEAPON.STATE.ARMED;
	    break;
      }
   },
   DrawBullsEye() {
/*
      this.Distance = Utilities.GetDistance(this.Agent.Position, this.Agent.Target.Position);
      if (this.Distance<=this.Specs.RANGE.MAX) {  //check within range
	 this.coords.X = (SCREEN.WIDTH/2) + this.Agent.Target.ScreenCoords.X + this.Agent.Target.CentreOffset.X;	//WARNING!!! coords won't be
	 this.coords.Y = (SCREEN.HEIGHT/2) + this.Agent.Target.ScreenCoords.Y + this.Agent.Target.CentreOffset.Y;	//  adjusted once GenieAgent is done
	 this.percentage = (1 - ((this.Distance-this.Specs.RANGE.MIN)/(this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)))*100;
	 if (this.percentage>100)
	    this.percentage = 100;
	 this.Reticle.DrawStaggered(this.coords.X, this.coords.Y, (this.Agent.Target.Sprite.Diagonal/2)+1, "red", 1, 8, this.percentage);
	 //ASSUMPTION: more of an expectation, that diagonals in all sprites will be pre-calculated
	//ISSUE: HARD-CODING!!! - need RETICLE.SEGMENTS, and maybe .COLOUR too
      }
*/
   },
   Launch() {

      //UNLOGGED
/*
      //TODO: measure distance, calculate probability of success
      //TODO: need an accuracy field in specs to predict ehaviour

      //OPEN: 2 firing options - either fire only when fully charged, or fire a limited amount (proportional to charge)

      this.Laser = this.LaserList.GetOpen();
//      x = (this.Agent.Target.Position.X-this.Accuracy) + (Utilities.GetRandomNumber(2*Accuracy));
//      y = (this.Agent.Target.Position.Y-this.Accuracy) + (Utilities.GetRandomNumber(2*Accuracy));
      this.distance = this.Specs.RANGE.MIN + this.Agent.Randomizer(0, (this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)-1);
      coords.X = this.Agent.ScreenCoords.X + (this.distance/this.Distance)*(this.Agent.Target.ScreenCoords.X-this.Agent.ScreenCoords.X);
      coords.Y = this.Agent.ScreenCoords.Y + (this.distance/this.Distance)*(this.Agent.Target.ScreenCoords.Y-this.Agent.ScreenCoords.Y);
      this.Laser.Activate(this.Agent.ScreenCoords, this.coords, this);	//NOTE: 'this' is mostly for later use
      //ISSUE: should pass positions, not screen coords, to measure collision detection, adjust there for perspective
   }
*/
};
