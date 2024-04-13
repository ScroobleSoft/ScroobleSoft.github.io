/*
 * IMPLEMENT: part pulsating, part radiating explosion of varied shapes, such as hex and octagon - can be extended to pentagon
 *	      and other polygon shapes
 */
//------------------------------------------------
//-------- ROTATING EXPLOSION --------------------  //UNTESTED
var RotatingExplosion = function() {
};
RotatingExplosion.prototype = new GenieExplosion();
/*
RotatingExplosion.prototype.Set = function(specs, sprite) {
   GenieExplosion.prototype.Set.call(this, specs, sprite);

   //Create three buffered images
};
*/
RotatingExplosion.prototype.Activate = function() {

   //UNLOGGED

   GenieFX.prototype.Activate.call(this);
};
RotatingExplosion.prototype.Update = function() {
   switch (this.State) {
      case 8:
	 this.Sprite.DrawCentred(this.Position.X, this.Position.Y);
	 break;
      case 7:
	 this.Sprite.DrawCentred(this.Position.X, this.Position.Y);
	 break;
      case 6:
	 this.Sprite.DrawFormCentred(0, this.Position.X, this.Position.Y);
	 break;
      case 5:
	 this.Sprite.DrawFormCentred(0, this.Position.X, this.Position.Y);
	 break;
      case 4:
	 this.Sprite.DrawFormCentred(1, this.Position.X, this.Position.Y);
	 break;
      case 3:
	 this.Sprite.DrawFormCentred(1, this.Position.X, this.Position.Y);
	 break;
      case 2:
	 this.Sprite.DrawFormCentred(2, this.Position.X, this.Position.Y);
	 break;
      case 1:
	 this.Sprite.DrawFormCentred(2, this.Position.X, this.Position.Y);
	 break;
   }

   --this.Extant;
   if (!this.Extant) {
      --this.State;
      if (this.State)
	 this.Extant = this.Specs ? this.Specs.F : EXPLOSION.ROTATING.F;
   }
};
