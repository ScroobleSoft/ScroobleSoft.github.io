
//----------------------------------------
//---------- GENIE FX --------------------
var GenieFX = function() {	//Specs = { S: -1, F: -1, W: -1, H: -1 } . . . NOTE: W and H are needed for on-screen checks
	var GraphicsTool, CalcPad;
	var ScreenRect;
	var Specs;
	var States, State, Frames;
	var Sprite, SpriteState, SparkSprite;
	var Colour;
	var Position, Elevation, ScreenCoords;
	var Extant, Visible;
};
GenieFX.prototype = {
	Set(specs, sprite, sSprite, gTool, cPad, sRect) {

		this.Specs = specs;
		if (this.Specs) {
			this.States = this.Specs.S || FX.S;
			this.Frames = this.Specs.F || FX.F;
			this.Colour = this.Specs.COLOUR;
		} else {
			this.States = FX.S;
			this.Frames = FX.F;
		}
		this.Sprite = sprite;
		this.SparkSprite = sSprite;
		this.Position = new Coordinate2D();
		this.ScreenCoords = new Coordinate2D();

		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.ScreenRect = sRect;
	},
	CheckOnScreen() {

		if (this.Sprite)
			return (SpaceUtils.CheckPointInBox(this.Position, this.ScreenRect, this.Sprite.Specs.W/2));
		else
			return (SpaceUtils.CheckPointInBox(this.Position, this.ScreenRect));
	},
	CheckExtant() {

		return (this.Extant);
	},
	CheckVisible() {

		return (this.Visible);
	},
	Activate(pos, elvtn, colour, state) {

		this.Position.Set(pos.X, pos.Y);
		if (elvtn)
			this.Elevation = elvtn;
		if (colour)
			this.Colour = colour;
		if (state)
			this.SpriteState = state;
		else
			this.SpriteState = 0;
		this.Extant = this.Frames;
		this.State = 0;
	},
	DetermineScreenCoords() {

		this.ScreenCoords.Set(this.Position.X, this.Position.Y);
		if (this.ScreenRect) {
			this.ScreenCoords.X -= this.ScreenRect.L;
			this.ScreenCoords.Y -= this.ScreenRect.T;
		}

		if (this.Specs.PERSPECTIVE)
			GeoUtils.PerspectiveAdjust(this.ScreenCoords, this.Specs.PERSPECTIVE);
	},
	Draw() {

		this.DetermineScreenCoords();
		if (this.Elevation)
			this.Sprite.DrawCentred(this.ScreenCoords.X, this.ScreenCoords.Y-this.Elevation, this.SpriteState);
		else
			this.Sprite.DrawCentred(this.ScreenCoords.X, this.ScreenCoords.Y, this.SpriteState);
	},
	Update() {

		--this.Extant;
		if (!this.Extant) {
			++this.State;
			if (this.State!=this.States)
				this.Extant = this.Frames;
			else
				this.State = 0;
		}
/*
		if (this.CheckOnScreen())
			this.Visible = true;
		else
			this.Visible = false;
*/
	}
};
