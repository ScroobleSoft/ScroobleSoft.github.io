/* 
 *  NOTE: this class is mainly for .Activate, checking if at destination, possibly fizzling . . . also collision cheking may be different
 */
//------------------------------------------------
//---------- GENIE AMMUNITION --------------------
var GenieAmmunition = function() {
   var Weapon;
   var Potency;				//NOTE: this field exists for enhanced units
   var ComradeArrays, FoeArrays;
};
GenieAmmunition.prototype = new GenieProjectile();
GenieAmmunition.prototype.Set = function(specs, sprite) {
   GenieProjectile.prototype.Set.call(this, specs, sprite);

   this.ComradeArrays = new Array();
   this.FoeArrays = new Array();
   this.Potency = this.Specs.POTENCY;
};
GenieAmmunition.prototype.Activate = function(pos, dstn, wpn) {

   this.SetPosition(pos);
   this.SetDestination(dstn);
   this.Weapon = wpn;
   this.SetExtant();
   this.State.Motion = STATE.MOTION.ADVANCING;
};
/*
    in ::Update, once it is noted that this.State.Motion==STATE.MOTION.STATIONARY, it would mean the ammo has expired without colliding, so likely a fizzle
    should be depicted
*/
GenieAmmunition.prototype.AddTargetArrays = function() {
   var i;

   //UNLOGGED

   for (i=2;i<arguments.length;++i)
      this.TargetArrays.push(arguments[i]);
};
GenieAmmunition.prototype.CheckFoesCollision = function() {

   //UNLOGGED

   for (this.i=0;this.i<this.FoeArrays.length;++this.i)
      for (this.j=0;this.j<this.FoeArrays[this.i].length;++this.j)
	 if (this.CheckCollision(this.FoeArrays[this.i][this.j])) {
	    this.FoeArrays[this.i][this.j].Hit(this.Potency);
	    return;
	 }
};
GenieAmmunition.prototype.CheckAssetsCollision = function() {

   //UNLOGGED

   for (this.i=0;this.i<this.FoeArrays.length;++this.i)
      for (this.j=0;this.j<this.FoeArrays[this.i].length;++this.j)
	 if (this.CheckCollision(this.FoeArrays[this.i][this.j])) {
	    this.FoeArrays[this.i][this.j].Hit(this.Potency);
	    return;
	 }
};
GenieAmmunition.prototype.Draw = function() {  //NOTE: this exists in order to draw right sprite state

   this.DetermineScreenCoords();
   this.DetermineState();
   this.Sprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y, this.state);
};
GenieAmmunition.prototype.DetermineState = function() {

   //Check state
   if (this.Animation)
      this.state = this.Animation.State;
   else
      this.state = 0;

   //Adjust for number of sides in the game
   if (this.Specs.SIDES)
      this.state += this.Specs.SIDES * this.Weapon.Asset.GetOwnerIndex();
};
