/*
 *  TODO: will not be GenieGunshot, and will Blast
 */
//--------------------------------------------
//---------- GENIE GUNSHOT --------------------
var GenieGunShot = function() {	//NOTE: different from laser in that it continues past point click till obstacle hit, so will
   var GraphicsTool;		// likely need a reference to gamespace
   var Destination;
   var Bullets;			//bullets are dots (points), pellets are sprites
   var Distance;
   var XIncrement, YIncrement;
   var Segment;
};
GenieGunShot.prototype = new GenieFX();
GenieGunShot.prototype.Set = function(specs, sprite, gTool) {
   GenieFX.prototype.Set.call(this, specs, sprite);

   this.GraphicsTool = gTool;
   this.Destination  = new Coordinate2D();
};
GenieGunShot.prototype.Clone = function(shot) {
   this.Set(shot.Specs, shot.Sprite, shot.GraphicsTool);
};
GenieGunShot.prototype.Activate = function(pos, dst) {
   GenieExplosion.prototype.Activate.call(this, pos);

   this.Destination.X = dst.X;
   this.Destination.Y = dst.Y;
   this.Extant = this.Specs.F;
   this.Distance = Utilities.GetDistance(this.Distance, this.Position);
   this.XIncrement = (this.Destination.X-this.Position.X)/this.Distance;
   this.YIncrement = (this.Destination.Y-this.Position.Y)/this.Distance;
   this.Segment = this.Distance/this.Specs.F;
};
GenieGunShot.prototype.Draw = function() {

   //ISSUE: below has to be reviewed and corrected with changes made

   var i;
   var increment;
   var x, y;

   if (this.Sprite && !this.Bullets)  //check size of bullets
      increment = 5;		//ISSUE: HARD-CODED!! Should perhaps be specified in Set
   else
      increment = 3;
   for (i=(this.Duration-this.Extant)*this.Segment;i<this.Distance;i+=increment) {
//      x = Math.round(this.X + this.XIncrement*i);
//      y = Math.round(this.Y + this.YIncrement*i);
      x = this.X + this.XIncrement*i;
      y = this.Y + this.YIncrement*i;
      if (this.Sprite && !this.Bullets)
	 this.Sprite.DrawCentred(x, y);
      else
	 this.GraphicsTool.GOL.G2D.DrawPoint(x, y, this.Colour);
   }
   --this.Extant;
};
