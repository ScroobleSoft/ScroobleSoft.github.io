
//-----------------------------------------------
//---------- IMPERIAL KNIGHT --------------------
var ImperialKnight = function() {
};
ImperialKnight.prototype = new ImperialUnit();
ImperialKnight.prototype.Set = function(cnvs, specs, unit) {
	ImperialUnit.prototype.Set.call(this, cnvs, specs, unit);

	this.Type = IMPERIAlUNIT.KNIGHT;
	this.SetData();
};
ImperialKnight.prototype.SetData = function() {

	this.SpriteColours = [ [2,[1,1,2,0,0]], [12,[1,2]], [3,[1,1,2,0,0]], [13,[2,1]] ];
};
ImperialKnight.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.L.X, this.ScreenCoords.Y+this.Specs.HORSE.L.Y, 0);		//TODO: set state
		LeftRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftLanceHiltSprite.Draw(this.ScreenCoords.X+this.Specs.LANCE.HILT.L.X, this.ScreenCoords.Y+this.Specs.LANCE.HILT.L.Y);
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.L.X, this.ScreenCoords.Y+this.Specs.ARM.L.Y);
		LeftLanceShaftSprite.Draw(this.ScreenCoords.X+this.Specs.LANCE.SHAFT.L.X, this.ScreenCoords.Y+this.Specs.LANCE.SHAFT.L.Y);
		LeftRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.L.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.L.Y, this.Satrapy.Index);
		LeftBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.L.X, this.ScreenCoords.Y+this.Specs.BOOTS.L.Y, this.Satrapy.Index);
	} else {
		RightHorseSprite.Draw(this.ScreenCoords.X+this.Specs.HORSE.R.X, this.ScreenCoords.Y+this.Specs.HORSE.R.Y, 0);		//TODO: set state
		RightRiderSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightLanceHiltSprite.Draw(this.ScreenCoords.X+this.Specs.LANCE.HILT.R.X, this.ScreenCoords.Y+this.Specs.LANCE.HILT.R.Y);
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.R.X, this.ScreenCoords.Y+this.Specs.ARM.R.Y);
		RightLanceShaftSprite.Draw(this.ScreenCoords.X+this.Specs.LANCE.SHAFT.R.X, this.ScreenCoords.Y+this.Specs.LANCE.SHAFT.R.Y);
		RightRiderLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightLeggingsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGGINGS.R.X, this.ScreenCoords.Y+this.Specs.LEGGINGS.R.Y, this.Satrapy.Index);
		RightBootsSprite.Draw(this.ScreenCoords.X+this.Specs.BOOTS.R.X, this.ScreenCoords.Y+this.Specs.BOOTS.R.Y, this.Satrapy.Index);
	}
};
