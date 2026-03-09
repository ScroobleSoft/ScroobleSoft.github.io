
//---------------------------------------------------
//---------- IMPERIAL CATAPHRACT --------------------
var ImperialCataphract = function() {
};
ImperialCataphract.prototype = new ImperialUnit();
ImperialCataphract.prototype.Set = function(cnvs, specs, unit) {
	ImperialUnit.prototype.Set.call(this, cnvs, specs, unit);

	this.Type = IMPERIAlUNIT.CATAPHRACT;
	this.SetData();
};
ImperialCataphract.prototype.SetData = function() {

	this.SpriteColours = [ [2,[1,1,2,0,0]], [12,[1,2]], [3,[1,1,2,0,0]], [13,[2,1]] ];
};
ImperialCataphract.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.L.X, this.ScreenCoords.Y+this.Specs.HORSE.L.Y, 0);		//TODO: set state
		LeftRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		SpearSprite.Draw(this.ScreenCoords.X+this.Specs.SPEAR.L.X, this.ScreenCoords.Y+this.Specs.SPEAR.L.Y);
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.L.X, this.ScreenCoords.Y+this.Specs.ARM.L.Y);
		LeftRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.L.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.L.Y, this.Satrapy.Index);
		LeftBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.L.X, this.ScreenCoords.Y+this.Specs.BOOTS.L.Y, this.Satrapy.Index);
	} else {
		RightHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.R.X, this.ScreenCoords.Y+this.Specs.HORSE.R.Y, 0);		//TODO: set state
		RightRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		SpearSprite.Draw(this.ScreenCoords.X+this.Specs.SPEAR.R.X, this.ScreenCoords.Y+this.Specs.SPEAR.R.Y);
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.R.X, this.ScreenCoords.Y+this.Specs.ARM.R.Y);
		RightRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.R.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.R.Y, this.Satrapy.Index);
		RightBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.R.X, this.ScreenCoords.Y+this.Specs.BOOTS.R.Y, this.Satrapy.Index);
	}
};
