/*
 *  pellets will spray
 *  number of pellets expelled will vary, as well sepration between them (rate of burst fire) and potency of each, along with the usual range/re-arm dynamic
 */
//--------------------------------------------
//---------- GENIE PELTER --------------------
var GeniePelter = function() {
   var Pellet;
   var Pellets;
   var Frames;
   var Gap;
};
GeniePelter.prototype = new GenieWeapon();
GeniePelter.prototype.Set = function(specs, agnt) {
   GenieWeapon.prototype.Set.call(this, specs, agnt);
/*
      if (this.Specs.SIGHT)
	 this.Sight = SpriteList[SPRITeLIST.ROCKEtSIGHtSPRITE];

      this.coords = new Coordinate2D();
*/
   this.Pellets = this.Specs.COUNT;
   this.Gap = this.Specs.GAP;
};
/*
GeniePelter.prototype.DrawSight = function() {

      //Determine size of sight (in terms of gaps), draw if within range
      this.Distance = Utilities.GetDistance(this.Agent.Position, this.Agent.Target.Position);
      if (this.Distance>=this.Specs.ROCKET.MIN && this.Distance<=this.Specs.ROCKET.MAX) {
	 this.Gap = this.Specs.GAP.MIN;
	 this.Gap += (this.Distance/(this.Specs.MAX-this.Specs.MIN))*(this.Specs.GAP.MAX-this.Specs.GAP.MIN);
	 this.Gap = Math.round(this.Gap/2);
*/
/*
      this.Rocket.MarkerGap = Math.round(((((this.distance-this.Specs.ROCKET.MIN)/(this.Specs.ROCKET.MAX-this.Specs.ROCKET.MIN))*(this.Specs.ROCKET.SIGHT.MAxOFFSET-this.Specs.ROCKET.SIGHT.OFFSET)) + this.Specs.ROCKET.SIGHT.OFFSET)/2);
*/
/*
	 //Draw the sight
	 this.coords.X = this.Agent.Target.ScreenCoords.X + this.Agent.Target.CentreOffset.X;
	 this.coords.Y = this.Agent.Target.ScreenCoords.Y + this.Agent.Target.CentreOffset.Y;
	 this.Sight.Draw(this.coords.X-this.Gap, this.coords.Y-this.Gap, 0);
	 this.Sight.Draw(this.coords.X+this.Gap, this.coords.Y-this.Gap, 1);
	 this.Sight.Draw(this.coords.X+this.Gap, this.coords.Y+this.Gap, 2);
	 this.Sight.Draw(this.coords.X-this.Gap, this.coords.Y+this.Gap, 3);
      }
};
*/
GeniePelter.prototype.Pelt = function() {  //NOTE: this activates firing, which continues in ::Update
   GenieWeapon.prototype.Fire.call(this);

   this.State = WEAPON.STATE.FIRING;
   for (this.i=0;this.i<this.FiringPoints.length;++this.i) {
      this.Pellet = this.ProjectileList.Get();
      this.Pellet.Activate(this.FiringPoints[this.i], this.Destination, this.Specs);
   }
};
GeniePelter.prototype.Update = function() {

   if (this.State==WEAPON.STATE.FIRING) {
      --this.Gap;
      if (!this.Gap) {
	 this.Pelt();
	 --this.Pellets;
	 this.Gap = this.Specs.GAP;
	 if (!this.Pellets) {
	    this.State = WEAPON.STATE.ReCHARGING;
	    this.Pellets = this.Specs.COUNT;
	 }
      }
   }
};
