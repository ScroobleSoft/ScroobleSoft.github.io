
//--------------------------------------------------
//---------- IMPERIAL SWORDSMAN --------------------
var ImperialSwordsman = function() {
};
ImperialSwordsman.prototype = new ImperialUnit();
ImperialSwordsman.prototype.Set = function(specs, sprite, unit) {
	ImperialUnit.prototype.Set.call(this, specs, sprite, unit);

	this.Type = IMPERIAlUNIT.SWORDsMAN;
	this.SetData();
};
ImperialSwordsman.prototype.SetData = function() {

	this.SpriteColours = [ [0,[1,1,2,0,0]], [8,[1,1,2]], [4,[1,0]], [1,[1,1,2,0,0]], [9,[2,1,1]], [5,[1,0]] ];
};
ImperialSwordsman.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.L.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.L.Y);
		LeftLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		UpSwordSprite.Draw(this.ScreenCoords.X+this.Specs.SWORD.L.X, this.ScreenCoords.Y+this.Specs.SWORD.L.Y);
	} else {
		RightSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.R.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.R.Y);
		RightLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		UpSwordSprite.Draw(this.ScreenCoords.X+this.Specs.SWORD.R.X, this.ScreenCoords.Y+this.Specs.SWORD.R.Y);
	}
};
