
//------------------------------------------------
//---------- IMPERIAL MACEMAN --------------------
var ImperialMaceman = function() {
};
ImperialMaceman.prototype = new ImperialUnit();
ImperialMaceman.prototype.Set = function(cnvs, specs, unit) {
	ImperialUnit.prototype.Set.call(this, cnvs, specs, unit);

	this.SetData();
};
ImperialMaceman.prototype.SetData = function() {

	this.Type = IMPERIAlUNIT.MACeMAN;
	this.SpriteColours = [ [2,[1,1,2,0,0]], [12,[1,2]], [8,[1,1,2]], [3,[1,1,2,0,0]], [13,[2,1]], [9,[2,1,1]] ];
};
ImperialMaceman.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.L.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.L.Y);
		LeftRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.L.X, this.ScreenCoords.Y+this.Specs.HORSE.L.Y, 0);		//TODO: set state
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.L.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.L.Y);
		LeftRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftMaceSprite.Draw(this.ScreenCoords.X+this.Specs.MACE.L.X, this.ScreenCoords.Y+this.Specs.MACE.L.Y);
		LeftLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.L.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.L.Y, this.Satrapy.Index);
		LeftBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.L.X, this.ScreenCoords.Y+this.Specs.BOOTS.L.Y, this.Satrapy.Index);
	} else {
		RightStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.R.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.R.Y);
		RightRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.R.X, this.ScreenCoords.Y+this.Specs.HORSE.R.Y, 0);		//TODO: set state
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.R.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.R.Y);
		RightRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightMaceSprite.Draw(this.ScreenCoords.X+this.Specs.MACE.R.X, this.ScreenCoords.Y+this.Specs.MACE.R.Y);
		RightLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.R.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.R.Y, this.Satrapy.Index);
		RightBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.R.X, this.ScreenCoords.Y+this.Specs.BOOTS.R.Y, this.Satrapy.Index);
	}
};
