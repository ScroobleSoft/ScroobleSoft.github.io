
//------------------------------------------------
//---------- IMPERIAL PIKEMAN --------------------
var ImperialPikeman = function() {
};
ImperialPikeman.prototype = new ImperialUnit();
ImperialPikeman.prototype.Set = function(specs, sprite, unit) {
	ImperialUnit.prototype.Set.call(this, specs, sprite, unit);

	this.Type = IMPERIAlUNIT.PIKeMAN;
	this.SetData();
};
ImperialPikeman.prototype.SetData = function() {

	this.SpriteColours = [ [0,[1,1,2,0,0]], [12,[1,2]], [14,[1,1,1,2]], [4,[1,0]], [1,[1,1,2,0,0]], [13,[2,1]], [15,[2,1,1,1]], [5,[1,0]] ];
};
ImperialPikeman.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.L.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.L.Y);
		LeftPikeSprite.Draw(this.ScreenCoords.X+this.Specs.PIKE.L.X, this.ScreenCoords.Y+this.Specs.PIKE.L.Y);
		LeftCrouchedArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.CROUCHED.L.X, this.ScreenCoords.Y+this.Specs.ARM.CROUCHED.L.Y);
		LeftLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
	} else {
		RightSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.R.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.R.Y);
		RightPikeSprite.Draw(this.ScreenCoords.X+this.Specs.PIKE.R.X, this.ScreenCoords.Y+this.Specs.PIKE.R.Y);
		RightCrouchedArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.CROUCHED.R.X, this.ScreenCoords.Y+this.Specs.ARM.CROUCHED.R.Y);
		RightLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
	}
};
