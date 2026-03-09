
//-----------------------------------------------------
//---------- IMPERIAL HORSE ARCHER --------------------
var ImperialHorseArcher = function() {
};
ImperialHorseArcher.prototype = new ImperialUnit();
ImperialHorseArcher.prototype.Set = function(cnvs, specs, unit) {
	ImperialUnit.prototype.Set.call(this, cnvs, specs, unit);

	this.Type = IMPERIAlUNIT.HORSeARCHER;
	this.SetData();
};
ImperialHorseArcher.prototype.SetData = function() {

	this.SpriteColours = [ [2,[1,1,2,0,0]], [12,[1,2]], [3,[1,1,2,0,0]], [13,[2,1]] ];
};
ImperialHorseArcher.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.L.X, this.ScreenCoords.Y+this.Specs.HORSE.L.Y, 0);		//TODO: set state
		LeftStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.L.X, this.ScreenCoords.Y+this.Specs.ARM.L.Y);
		LeftRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftHorsebowSprite.Draw(this.ScreenCoords.X+this.Specs.BOW.L.X, this.ScreenCoords.Y+this.Specs.BOW.L.Y);
		LeftLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.L.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.L.Y, this.Satrapy.Index);
		LeftBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.L.X, this.ScreenCoords.Y+this.Specs.BOOTS.L.Y, this.Satrapy.Index);
	} else {
		RightRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.R.X, this.ScreenCoords.Y+this.Specs.HORSE.R.Y, 0);		//TODO: set state
		RightStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.R.X, this.ScreenCoords.Y+this.Specs.ARM.R.Y);
		RightRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightHorsebowSprite.Draw(this.ScreenCoords.X+this.Specs.BOW.R.X, this.ScreenCoords.Y+this.Specs.BOW.R.Y);
		RightLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.R.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.R.Y, this.Satrapy.Index);
		RightBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.R.X, this.ScreenCoords.Y+this.Specs.BOOTS.R.Y, this.Satrapy.Index);
	}
};
