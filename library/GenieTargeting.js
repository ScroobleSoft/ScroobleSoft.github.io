/*
 *  there is room for a graded targeting, such as a disc that fills up an 1/8th at a time, for example
 *  varying opacity can also be used in another form of targeting
 */
//-----------------------------------------------
//---------- GENIE TARGETING --------------------
var GenieTargeting = function() {
   var Specs;
   var ActiveUnit;
   var Target;
   var Reticle;
   var Distance, TargetRadius;

   var x, y, prcntg;
};
GenieTargeting.prototype = {
   Set(cntxt, specs) {

      this.Specs = specs;
      this.Reticle = new GenieCircle();
      this.Reticle.Set(cntxt, this.Specs);
   },
   SetUnit(unit) {

      this.ActiveUnit = unit;
   },
   SetTarget(trgt) {

      this.Target = trgt;
   },
   CheckInRange() {

      //Basic 1-dimensional check
      if (Math.abs(this.Target.Position.X-this.ActiveUnit.Position.X)>this.ActiveUnit.Weapon.Specs.RANGE.MAX)
	 return (false);
      if (Math.abs(this.Target.Position.Y-this.ActiveUnit.Position.Y)>this.ActiveUnit.Weapon.Specs.RANGE.MAX)
	 return (false);

      //Actual check
      this.Distance = SpaceUtils.GetDistance(this.ActiveUnit.Position, this.Target.Position);
      if (this.Distance>=this.ActiveUnit.Weapon.Specs.RANGE.MIN && this.Distance<this.ActiveUnit.Weapon.Specs.RANGE.MAX)
	 return (true);
      else
	 return (false);
   },
   DrawTriangles() {

      //UNLOGGED - can have 3 small ones that move towards combining into one

      if (!this.CheckInRange())
	 return;
   },
   DrawStaggeredCircle() {

      if (!this.CheckInRange())  //NOTE: .Distance has already been calculated
	 return;

      this.prcntg = (this.Distance-this.ActiveUnit.Weapon.Specs.RANGE.MIN) / (this.ActiveUnit.Weapon.Specs.RANGE.MAX-this.ActiveUnit.Weapon.Specs.RANGE.MIN);
      this.prcntg = 1 - this.prcntg;
      this.prcntg *= 100;
      this.TargetRadius = this.Target.GetRadius();
      this.x = this.Target.ScreenCoords.X + this.Target.CentreOffset.X;
      this.y = this.Target.ScreenCoords.Y + this.Target.CentreOffset.Y;
      this.Reticle.DrawStaggered(this.x, this.y, this.TargetRadius, this.Specs.COLOUR, 1, 8, this.prcntg);
   },
   DrawColouredDiamond() {

      //UNLOGGED

      if (!this.CheckInRange())
	 return;

      //-colour changes from green to red (actually, should be vice versa)
   }
};
