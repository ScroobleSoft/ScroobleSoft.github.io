
//-----------------------------------------------
//---------- IMPERIAL ARCHER --------------------
var ImperialArcher = function() {
};
ImperialArcher.prototype = new ImperialUnit();
ImperialArcher.prototype.Set = function(specs, sprite, unit) {
	ImperialUnit.prototype.Set.call(this, specs, sprite, unit);

	this.Type = IMPERIAlUNIT.ARCHER;
	this.SetData();
};
ImperialArcher.prototype.SetData = function() {

	this.SpriteColours = [ [0,[1,1,2,0,0]], [8,[1,1,2]], [4,[1,0]], [1,[1,1,2,0,0]], [9,[2,1,1]], [5,[1,0]] ];
};
ImperialArcher.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.L.X, this.ScreenCoords.Y+this.Specs.ARM.L.Y);
		LeftLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftCrossbowSprite.Draw(this.ScreenCoords.X+this.Specs.CROSSBOW.L.X, this.ScreenCoords.Y+this.Specs.CROSSBOW.L.Y);
	} else {
		RightSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.R.X, this.ScreenCoords.Y+this.Specs.ARM.R.Y);
		RightLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightCrossbowSprite.Draw(this.ScreenCoords.X+this.Specs.CROSSBOW.R.X, this.ScreenCoords.Y+this.Specs.CROSSBOW.R.Y);
	}
};
