
//---------------------------------------------
//---------- IMPERIAL UNIT --------------------
var ImperialUnit = function() {
	var Type
	var Satrapy;
	var SpriteColours;
	var Complexion;
	var Region;
	var BoundingRectangle, BoundingTriangle, BoundingCircleCentre;

	var i, j, k, sprite;
};
ImperialUnit.prototype = new GenieAgent();
ImperialUnit.prototype.Set = function(specs, sprite, type) {
	GenieAgent.prototype.Set.call(this, specs, sprite);

	this.SetType(type);
	this.Complexion = Complexions[Randomizer.GetIndex(Complexions.length)];
	this.BoundingRectangle = new GenieRect();
	this.BoundingTriangle = [ { X: -1, Y: -1 }, { X: -1, Y: -1 }, { X: -1, Y: -1 } ];
	this.BoundingCircleCentre = new Coordinate2D();
};
ImperialUnit.prototype.SetDirection = function(drctn) {

	this.Direction = drctn;
};
ImperialUnit.prototype.SetSatrapy = function(strpy) {

	this.Satrapy = strpy;
	this.SetColours(this.Satrapy);
};
ImperialUnit.prototype.SetType = function(type) {  //UNLOGGED - REDUNDANT

	this.Type = type;
};
ImperialUnit.prototype.SetRegion = function(rgn) {

	this.Region = rgn;
};
ImperialUnit.prototype.SetColours = function(strpy) {

	for (this.i=0;this.i<this.SpriteColours.length;++this.i)
		for (this.j=0;this.j<this.SpriteColours[this.i][1].length;++this.j) {
			this.sprite = BattlefieldSprites[this.SpriteColours[this.i][0]];
			if (this.SpriteColours[this.i][1][this.j]==2)		//complexion
				this.sprite.Shapes[this.j].Colour = this.Complexion;
			else
				this.sprite.Shapes[this.j].Colour = SatrapyColours[this.Satrapy.Index][this.SpriteColours[this.i][1][this.j]];
		}
};
ImperialUnit.prototype.DetermineScreenCoords = function() {
	GenieAgent.prototype.DetermineScreenCoords.call(this);

	if (this.Direction==DIRECTION.NE)
		this.ScreenCoords.X -= 10;
	else
		this.ScreenCoords.X -= 3;

	if (this.CheckInfantry())
		this.ScreenCoords.Y -= 3;
	else {
		this.ScreenCoords.X += 1;
		this.ScreenCoords.Y -= 16;
	}

	if (Battlefield.CheckUpland(this.Region))
		this.ScreenCoords.Y -= 4;
};
ImperialUnit.prototype.CheckClicked = function() {
	var i;
	var specs;

	if (this.Direction==DIRECTION.NE)
		specs = this.Specs.BS.L;
	else
		specs = this.Specs.BS.R;

	for (i=0;i<specs.length;++i) {
		switch (specs[i].SHAPE) {
			case SHAPE.RECTANGLE:
				this.BoundingRectangle.Set(this.ScreenCoords.X+specs[i].L, this.ScreenCoords.Y+specs[i].T, specs[i].W, specs[i].H);
				if (IntersectUtils.CheckPointBox(Mouse.Click, this.BoundingRectangle))
					return (true);
				break;
			case SHAPE.TRIANGLE:
				if (specs[i].DIRECTION==DIRECTION.SW) {
					this.BoundingTriangle[0].X = this.ScreenCoords.X + specs[i].X;
					this.BoundingTriangle[0].Y = this.ScreenCoords.Y + specs[i].Y;
					this.BoundingTriangle[1].X = this.ScreenCoords.X + specs[i].X + specs[i].SIZE;
					this.BoundingTriangle[1].Y = this.ScreenCoords.Y + specs[i].Y + specs[i].SIZE;
					this.BoundingTriangle[2].X = this.ScreenCoords.X + specs[i].X;
					this.BoundingTriangle[2].Y = this.ScreenCoords.Y + specs[i].Y + specs[i].SIZE;
				} else {  //SE
					this.BoundingTriangle[0].X = this.ScreenCoords.X + specs[i].X;
					this.BoundingTriangle[0].Y = this.ScreenCoords.Y + specs[i].Y;
					this.BoundingTriangle[1].X = this.ScreenCoords.X + specs[i].X;
					this.BoundingTriangle[1].Y = this.ScreenCoords.Y + specs[i].Y + specs[i].SIZE;
					this.BoundingTriangle[2].X = this.ScreenCoords.X + specs[i].X - specs[i].SIZE;
					this.BoundingTriangle[2].Y = this.ScreenCoords.Y + specs[i].Y + specs[i].SIZE;
				}
				if (IntersectUtils.CheckPointBox(Mouse.Click, this.BoundingTriangle))
					return (true);
				break;
			case SHAPE.CIRCLE:
				this.BoundingCircleCentre.Set(this.ScreenCoords.X+specs[i].X, this.ScreenCoords.Y+specs[i].Y);
				if (IntersectUtils.CheckPointCircle(Mouse.Click, this.BoundingCircleCentre, specs[i].RDS))
					return (true);
				break;
		}
	}
};
ImperialUnit.prototype.CheckInfantry = function() {

	if ( this.Type<=IMPERIAlUNIT.LONgBOwMAN || ( this.Type>=IMPERIAlUNIT.AXeMAN && this.Type<=IMPERIAlUNIT.PIKeMAN ) )
		return (true)
};
ImperialUnit.prototype.CheckCavalry = function() {

	if ( this.Type==IMPERIAlUNIT.HORSeARCHER || this.Type>=IMPERIAlUNIT.MACeMAN )
		return (true);
};
