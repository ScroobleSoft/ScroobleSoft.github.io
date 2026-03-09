
//-----------------------------------------------
//---------- IMPERIAL AXEMAN --------------------
var ImperialAxeman = function() {
};
ImperialAxeman.prototype = new ImperialUnit();
ImperialAxeman.prototype.Set = function(specs, sprite, unit) {
	ImperialUnit.prototype.Set.call(this, specs, sprite, unit);

	this.Type = IMPERIAlUNIT.AXeMAN;
	this.SetData();
};
ImperialAxeman.prototype.SetData = function() {

	this.SpriteColours = [ [0,[1,1,2,0,0]], [8,[1,1,2]], [12,[1,2]], [4,[1,0]], [1,[1,1,2,0,0]], [9,[2,1,1]], [13,[2,1]], [5,[1,0]] ];
};
ImperialAxeman.prototype.Draw = function() {

	if (this.Direction==DIRECTION.NE) {
		LeftSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		LeftBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.L.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.L.Y);
		LeftStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.L.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.L.Y);
		LeftLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.L.X, this.ScreenCoords.Y+this.Specs.LEGS.L.Y);
		LeftCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.L.X, this.ScreenCoords.Y+this.Specs.CREST.L.Y, this.Satrapy.Index);
		AxeSprite.Draw(this.ScreenCoords.X+this.Specs.AXE.L.X, this.ScreenCoords.Y+this.Specs.AXE.L.Y);
	} else {
		RightSoldierSprite.Draw(this.ScreenCoords.X, this.ScreenCoords.Y);
		RightBentArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.BENT.R.X, this.ScreenCoords.Y+this.Specs.ARM.BENT.R.Y);
		RightStraightArmSprite.Draw(this.ScreenCoords.X+this.Specs.ARM.STRAIGHT.R.X, this.ScreenCoords.Y+this.Specs.ARM.STRAIGHT.R.Y);
		RightLegsSprite.Draw(this.ScreenCoords.X+this.Specs.LEGS.R.X, this.ScreenCoords.Y+this.Specs.LEGS.R.Y);
		RightCrestSprite.Draw(this.ScreenCoords.X+this.Specs.CREST.R.X, this.ScreenCoords.Y+this.Specs.CREST.R.Y, this.Satrapy.Index);
		AxeSprite.Draw(this.ScreenCoords.X+this.Specs.AXE.R.X, this.ScreenCoords.Y+this.Specs.AXE.R.Y);
	}
};
