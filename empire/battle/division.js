
//-------------------------------------------------
//---------- IMPERIAL DIVISION --------------------  NOTE: used in engagement views
var ImperialDivision = function() {
	var Command;
	var Unit;
	var Position, Direction, Region;
	var ExtantFlag;
	var FlagBox, FlagTriangle, EllipseLeftBox, EllipseRightBox;			//for click detection

	var i, x, y, num;
};
ImperialDivision.prototype = {
	Set() {
		this.Position = new Coordinate2D();
		this.SetClickShapes();
	},
	SetCommand(cmmnd) {

		this.Command = cmmnd;
	},
	SetUnit(unit) {

		this.Unit = unit;
	},
	SetPosition(x, y) {

		this.Position.Set(x, y);
	},
	SetDirection(drctn) {

		this.Direction = drctn;
	},
	SetRegion(rgn) {

		if (this.Region)
			Battlefield.Regions[this.Region.C][this.Region.R].Division = null;
		this.Region = rgn;
		Battlefield.Regions[this.Region.C][this.Region.R].Division = this;
		this.Position.X = (BATTLeFIELD.REGION.W*(0.5*(this.Region.C+this.Region.R))) + (BATTLeFIELD.REGION.W/2);
		this.Position.Y = (SCREEN.HEIGHT/2) + (BATTLeFIELD.REGION.H*((this.Region.C-this.Region.R)/2));
	},
	SetClickShapes() {

		this.FlagBox = new GenieRect();
		this.FlagBox.W = 11;
		this.FlagBox.H = 17;
		this.FlagTriangle = [ { X: -1, Y: -1 }, { X: -1, Y: -1 }, { X: -1, Y: -1 } ];
		this.EllipseLeftBox = new GenieRect();
		this.EllipseLeftBox.W = 4;
		this.EllipseLeftBox.H = 8;
		this.EllipseRightBox = new GenieRect();
		this.EllipseRightBox.W = 4;
		this.EllipseRightBox.H = 8;
	},
	CheckExtant() {  //REDUNDANT?

		return (this.ExtantFlag);
	},
	Display(bUnit, opcty) {

		Graphics.Context.globalAlpha = opcty;

		if (bUnit)
			this.Draw();
		else {
			Graphics.DrawEllipse(this.Position.X, this.Position.Y, 27, 20, SatrapyColours[this.Command.Satrapy.Index][0], 0);			//HARD-CODING
			PennantSprite.Draw(this.Position.X, this.Position.Y);
			PennantsSprite.Draw(this.Position.X+PENNANT.X, this.Position.Y+PENNANT.Y, this.Command.Satrapy.Index);
			LetterSprite.Draw(this.Position.X+PENNANT.LETTER.X, this.Position.Y+PENNANT.LETTER.Y, this.Unit.Type);
			this.DisplayNumbers();
		}

		Graphics.Context.globalAlpha = 1.0;
	},
	DisplayNumbers() {

		//Write right to left (smallest digit to largest)
		this.num = this.Unit.GetSoldiers();
		for (this.i=3;this.i>=0;--this.i) {
			this.x = this.Position.X + PENNANT.NUMBER.X + (this.i*PENNANT.NUMBER.O);
			DigitsSprite.Draw(this.x, this.Position.Y+PENNANT.NUMBER.Y, this.num % 10);
			this.num = Math.floor(this.num/10);
		}
	},
	Draw() {

		UnitTypes[this.Unit.Type].SetDirection(this.Direction);
		UnitTypes[this.Unit.Type].SetSatrapy(this.Command.Satrapy);
		UnitTypes[this.Unit.Type].SetRegion(this.Region);
		UnitTypes[this.Unit.Type].SetPosition(this.Position);
		UnitTypes[this.Unit.Type].Draw();
	},
	CheckClicked(bFlag) {

		if (bFlag)
			return (this.CheckUnitClicked());
		else
			return (this.CheckFlagClicked());
	},
	CheckFlagClicked() {

		this.UpdateClickShapes();

		//Ellipses
		if (IntersectUtils.CheckPointCircle(Mouse.Click, this.Position, 10))
			return (true);
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.EllipseLeftBox))
			return (true);
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.EllipseRightBox))
			return (true);

		//Flag
		if (IntersectUtils.CheckPointBox(Mouse.Click, this.FlagBox))
			return (true);
		if (IntersectUtils.CheckPointSWTriangle(Mouse.Click, this.FlagTriangle))
			return (true);
	},
	UpdateClickShapes() {

		this.FlagBox.L = this.Position.X;
		this.FlagBox.T = this.Position.Y - PennantSprite.Specs.H;
		this.FlagTriangle = [ { X: this.Position.X+11, Y: this.Position.Y-PennantSprite.Specs.H },
									 { X: this.Position.X+28, Y: this.Position.Y+19-PennantSprite.Specs.H },
									 { X: this.Position.X+11, Y: this.Position.Y+19-PennantSprite.Specs.H } ];
		this.EllipseLeftBox.X = this.Position.X - 12;
		this.EllipseLeftBox.Y = this.Position.Y;
		this.EllipseRightBox.X = this.Position.X + 12;
		this.EllipseRightBox.Y = this.Position.Y;
	},
	CheckUnitClicked() {

		UnitTypes[this.Unit.Type].SetPosition(this.Position);

		return (UnitTypes[this.Unit.Type].CheckClicked());
	}
};
