
//------------------------------------------------
//---------- GENIE ROCKET POD --------------------
var GenieRocketPod = function() {
   var Sight;
   var Rocket;
   var Gap;			//between sight sprite corners
/*
   if (this.Cannon.Charge==this.Cannon.FULlCHARGE)
      if (Utilities.GetDistance(this.Position, this.Target.Position)<20*this.Stance)
	 this.FireCannon();
   //NOTE: reticle can be drawn here, depending on mission, charge etc
*/
};
GenieRocketPod.prototype = new GenieWeapon();
GenieRocketPod.prototype.Set = function(specs, agnt) {
   GenieWeapon.prototype.Set.call(this, specs, agnt);

   if (this.Specs.SIGHT)
      this.Sight = SpriteList[SPRITeLIST.ROCKEtSIGHtSPRITE];
};
GenieRocketPod.prototype.DrawSight = function() {

      //Determine size of sight (in terms of gaps), draw if within range
      this.Distance = Utilities.GetDistance(this.Asset.Position, this.Asset.Target.Position);
      if (this.Distance>=this.Specs.ROCKET.MIN && this.Distance<=this.Specs.ROCKET.MAX) {
	 this.Gap = this.Specs.GAP.MIN;
	 this.Gap += (this.Distance/(this.Specs.MAX-this.Specs.MIN))*(this.Specs.GAP.MAX-this.Specs.GAP.MIN);
	 this.Gap = Math.round(this.Gap/2);
/*
      this.Rocket.MarkerGap = Math.round(((((this.distance-this.Specs.ROCKET.MIN)/(this.Specs.ROCKET.MAX-this.Specs.ROCKET.MIN))*(this.Specs.ROCKET.SIGHT.MAxOFFSET-this.Specs.ROCKET.SIGHT.OFFSET)) + this.Specs.ROCKET.SIGHT.OFFSET)/2);
*/
	 //Draw the sight
	 this.coords.X = this.Asset.Target.ScreenCoords.X + this.Asset.Target.CentreOffset.X;
	 this.coords.Y = this.Asset.Target.ScreenCoords.Y + this.Asset.Target.CentreOffset.Y;
	 this.Sight.Draw(this.coords.X-this.Gap, this.coords.Y-this.Gap, 0);
	 this.Sight.Draw(this.coords.X+this.Gap, this.coords.Y-this.Gap, 1);
	 this.Sight.Draw(this.coords.X+this.Gap, this.coords.Y+this.Gap, 2);
	 this.Sight.Draw(this.coords.X-this.Gap, this.coords.Y+this.Gap, 3);
      }
};
GenieRocketPod.prototype.Fire = function() {
//   var rocket;

   //UNLOGGED

   //calculate probability of success
   //-fire and draw explosion if hit (or subtract resiliency points)
   //-if miss, pick one of 4 points
   //get a laser from list
   //activate using pos and target dstn
   //see if anything else is hit

      this.Rocket = this.ProjectileList.GetOpen();
      this.distance = this.Specs.RANGE.MIN + this.Asset.Randomizer.GetNumberWithinRange(0, (this.Specs.RANGE.MAX-this.Specs.RANGE.MIN)-1);
/* this part starting here is repeated from GenieCannon */
      if (this.Asset.Target) {
	 coords.X = this.Asset.Position.X + ((this.distance/this.Distance)*(this.Asset.Target.Position.X-this.Asset.Position.X));
	 coords.Y = this.Asset.Position.Y + ((this.distance/this.Distance)*(this.Asset.Target.Position.Y-this.Asset.Position.Y));
      } else {
	 Mouse.GetClickCoordinates(this.coords);
	 if (this.Asset.Perspective)
	    GeoUtils.PerspectiveAdjust(this.coords, this.Asset.Perspective, REVERSE);
	 this.Distance = Utilities.GetDistance(this.Asset.Position, this.coords);
	 coords.X = this.Asset.Position.X + ((this.distance/this.Distance)*(this.coords.X-this.Asset.Position.X));
	 coords.Y = this.Asset.Position.Y + ((this.distance/this.Distance)*(this.coords.Y-this.Asset.Position.Y));
      }
/* */
      this.Rocket.Release(this.Asset.Position, coords, this.Asset);
      this.State = WEAPON.STATE.ARMING;
      this.Load = 0;
      //ISSUE: should pass positions, not screen coords, to measure collision detection, adjust there for perspective
};
