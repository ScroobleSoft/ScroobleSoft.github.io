
//------------------------------------------------
//---------- GENIE EXPLOSION ---------------------
var GenieExplosion = function() {
};
GenieExplosion.prototype = new GenieFX();
GenieExplosion.prototype.Activate = function() {
	GenieFX.prototype.Activate.call(this);

	this.State = 0;
	this.Extant = this.Extant || EXPLOSION.F;
};
GenieExplosion.prototype.Draw = function() {

	this.Sprite.DrawCentred(this.Position.X, this.Position.Y, this.State);
};
GenieExplosion.prototype.Update = function() {

	--this.Extant;
	if (!this.Extant) {
		++this.State;
		if (this.State!=this.Sprite.S)
			this.Extant = this.Specs ? this.Specs.F : EXPLOSION.F;
	}
};
