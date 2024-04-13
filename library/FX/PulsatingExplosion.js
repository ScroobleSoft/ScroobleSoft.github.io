
//---------------------------------------------------
//---------- PULSATING EXPLOSION --------------------
var PulsatingExplosion = function() {};
PulsatingExplosion.prototype = new GenieFX();
PulsatingExplosion.prototype.Activate = function(pos) {
   GenieFX.prototype.Activate.call(this, pos);

   this.State = this.Specs ? this.Specs.S : PULSATINgEXPLOSION.S;
   this.Extant = this.Specs ? this.Specs.F : PULSATINgEXPLOSION.F;
};
PulsatingExplosion.prototype.Update = function() {
   switch (this.State) {
      case 6:
	 this.Sprite.DrawFormCentred(1, this.Position.X, this.Position.Y);
	 break;
      case 5:
	 this.Sprite.DrawFormCentred(0, this.Position.X, this.Position.Y);
	 break;
      case 4:
	 this.Sprite.DrawCentred(this.Position.X, this.Position.Y);
	 break;
      case 3:
	 this.Sprite.DrawCentred(this.Position.X, this.Position.Y);
	 break;
      case 2:
	 this.Sprite.DrawFormCentred(0, this.Position.X, this.Position.Y);
	 break;
      case 1:
	 this.Sprite.DrawFormCentred(1, this.Position.X, this.Position.Y);
	 break;
   }

   --this.Extant;
   if (!this.Extant) {
      --this.State;
      if (this.State)
	 this.Extant = this.Specs ? this.Specs.F : PULSATINgEXPLOSION.F;
   }
};
