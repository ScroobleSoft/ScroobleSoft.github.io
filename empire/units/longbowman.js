
//---------------------------------------------------
//---------- IMPERIAL LONGBOWMAN --------------------
var ImperialLongbowman = function() {
};
ImperialLongbowman.prototype = new ImperialUnit();
ImperialLongbowman.prototype.Set = function(cnvs, specs, unit) {
	ImperialUnit.prototype.Set.call(this, cnvs, specs, unit);

	this.Type = IMPERIAlUNIT.LONgBOwMAN;
	this.SetData();
};
ImperialLongbowman.prototype.SetData = function() {

	this.SpriteColours = [ [0,[1,1,2,0,0]], [10,[1,1,2]], [12,[1,2]], [4,[1,0]], [1,[1,1,2,0,0]], [11,[2,1,1]], [13,[2,1]], [5,[1,0]] ];
};
ImperialLongbowman.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.L.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.L.Y);
		LeftLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		LeftLongbowSprite.Draw(this.ScreenCoords.X+this.Specs.LONGBOW.L.X, this.ScreenCoords.Y+this.Specs.LONGBOW.L.Y);
		LeftCockedArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.COCKED.L.X, this.ScreenCoords.Y+this.Specs.ARM.COCKED.L.Y);
	} else {
		RightSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.R.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.R.Y);
		RightLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		RightLongbowSprite.Draw(this.ScreenCoords.X+this.Specs.LONGBOW.R.X, this.ScreenCoords.Y+this.Specs.LONGBOW.R.Y);
		RightCockedArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.COCKED.R.X, this.ScreenCoords.Y+this.Specs.ARM.COCKED.R.Y);
	}
};
