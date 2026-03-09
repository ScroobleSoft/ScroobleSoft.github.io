
//-----------------------------------------------
//---------- BATTLE REGIMENT --------------------
var BattleRegiment = function() {
	var Regiment;
	var Direction, Region;
	var DrawMethods;
	var FlagBox, FlagTriangle, EllipseLeftBox, EllipseRightBox;
	var LeftArcherSprite, LeftLongbowmanSprite, LeftHorseArcherSprite, LeftAxemanSprite, LeftSwordsmanSprite,
		 LeftPikemanSprite, LeftMacemanSprite, LeftCataphractSprite, LeftKnightSprite, LeftImmortalSprite;						//TEMP
	var RightArcherSprite, RightLongbowmanSprite, RightHorseArcherSprite, RightAxemanSprite, RightSwordsmanSprite,
		 RightPikemanSprite, RightMacemanSprite, RightCataphractSprite, RightKnightSprite, RightImmortalSprite;				//TEMP

	var i, num;
};
BattleRegiment.prototype = new ImperialUnit();
BattleRegiment.prototype.Set = function(specs, sprite) {
	ImperialUnit.prototype.Set.call(this, specs, sprite);

	this.Region = new GenieTile();
	this.SetData();
	this.CreateSprites();		//TEMP
};
BattleRegiment.prototype.SetData = function() {

	this.DrawMethods = [ this.DrawArcher.bind(this), this.DrawLongbowman.bind(this), this.DrawHorseArcher.bind(this),
								this.DrawAxeman.bind(this), this.DrawSwordsman.bind(this), this.DrawPikeman.bind(this),
								this.DrawMaceman.bind(this), this.DrawCataphract.bind(this), this.DrawKnight.bind(this),
								this.DrawImmortal.bind(this)
	];
};
BattleRegiment.prototype.SetDirection = function(drctn) {

	this.Direction = drctn;
};
BattleRegiment.prototype.SetRegion = function(rgn) {

/**/	this.Region = rgn;
//	this.Region.Set(c, r);
//	this.Position.X = (BATTLeFIELD.REGION.W*(0.5*(c+r))) + (BATTLeFIELD.REGION.W/2);
//	this.Position.Y = (SCREEN.HEIGHT/2) + (BATTLeFIELD.REGION.H*((c-r)/2));
/**/	this.Position.X = (BATTLeFIELD.REGION.W*(0.5*(rgn.C+rgn.R))) + (BATTLeFIELD.REGION.W/2);
/**/	this.Position.Y = (SCREEN.HEIGHT/2) + (BATTLeFIELD.REGION.H*((rgn.C-rgn.R)/2));
};
BattleRegiment.prototype.SetRegiment = function(rgmnt) {

	this.Regiment = rgmnt;
};
BattleRegiment.prototype.SetColours = function(strpy) {  //UNLOGGED - DUMMY FUNCTION (to prevent crash)
};
BattleRegiment.prototype.SetCollisionShapes = function() {

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
};
BattleRegiment.prototype.CreateSprites = function() {		//TEMP . . . UNLOGGED

	this.LeftArcherSprite = new AnimatedSprite();
	this.LeftArcherSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 1, W: 39, H: 36, O: 2 } );
	this.LeftLongbowmanSprite = new AnimatedSprite();
	this.LeftLongbowmanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 39, W: 30, H: 36, O: 2 } );
	this.LeftHorseArcherSprite = new AnimatedSprite();
	this.LeftHorseArcherSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 77, W: 36, H: 43, O: 2 } );
	this.LeftAxemanSprite = new AnimatedSprite();
	this.LeftAxemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 122, W: 30, H: 31, O: 2 } );
	this.LeftSwordsmanSprite = new AnimatedSprite();
	this.LeftSwordsmanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 155, W: 20, H: 36, O: 2 } );
	this.LeftPikemanSprite = new AnimatedSprite();
	this.LeftPikemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 193, W: 47, H: 36, O: 2 } );
	this.LeftMacemanSprite = new AnimatedSprite();
	this.LeftMacemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 269, W: 36, H: 43, O: 2 } );
	this.LeftCataphractSprite = new AnimatedSprite();
	this.LeftCataphractSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 314, W: 36, H: 46, O: 2 } );
	this.LeftKnightSprite = new AnimatedSprite();
	this.LeftKnightSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 362, W: 43, H: 43, O: 2 } );
	this.LeftImmortalSprite = new AnimatedSprite();
	this.LeftImmortalSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 407, W: 43, H: 43, O: 2 } );

	this.RightArcherSprite = new AnimatedSprite();
	this.RightArcherSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 411, T: 1, W: 39, H: 36, O: 2 } );
	this.RightLongbowmanSprite = new AnimatedSprite();
	this.RightLongbowmanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 321, T: 39, W: 30, H: 36, O: 2 } );
	this.RightHorseArcherSprite = new AnimatedSprite();
	this.RightHorseArcherSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 381, T: 77, W: 36, H: 43, O: 2 } );
	this.RightAxemanSprite = new AnimatedSprite();
	this.RightAxemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 321, T: 122, W: 30, H: 31, O: 2 } );
	this.RightSwordsmanSprite = new AnimatedSprite();
	this.RightSwordsmanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 221, T: 155, W: 20, H: 36, O: 2 } );
	this.RightPikemanSprite = new AnimatedSprite();
	this.RightPikemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 231, W: 47, H: 36, O: 2 } );
	this.RightMacemanSprite = new AnimatedSprite();
	this.RightMacemanSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 381, T: 269, W: 36, H: 43, O: 2 } );
	this.RightCataphractSprite = new AnimatedSprite();
	this.RightCataphractSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 381, T: 314, W: 36, H: 46, O: 2 } );
	this.RightKnightSprite = new AnimatedSprite();
	this.RightKnightSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 452, T: 362, W: 43, H: 43, O: 2 } );
	this.RightImmortalSprite = new AnimatedSprite();
	this.RightImmortalSprite.Set(this.Sprite.Context, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 452, T: 407, W: 43, H: 43, O: 2 } );
};
BattleRegiment.prototype.Draw = function() {  //TODO: only battle view implemented

//	this.DrawMethods[this.Regiment.Type]();

	UnitTypes[this.Regiment.Type].SetDirection(this.Direction);
	if (this.Direction==DIRECTION.NE)
		UnitTypes[this.Regiment.Type].SetSatrapy(BattleView.LeftCommand.Satrapy);
	else
		UnitTypes[this.Regiment.Type].SetSatrapy(BattleView.RightCommand.Satrapy);
/**/	UnitTypes[this.Regiment.Type].SetRegion(this.Region);
//	UnitTypes[this.Regiment.Type].SetPosition( { X: this.Position.X+20, Y: this.Position.Y-15 } );
	UnitTypes[this.Regiment.Type].SetPosition( { X: this.Position.X, Y: this.Position.Y } );
	UnitTypes[this.Regiment.Type].Draw();
};
BattleRegiment.prototype.Display = function(bUnit, opcty) {  //TODO: only battle view implemented

	Graphics.Context.globalAlpha = opcty;

	if (bUnit)
		this.Draw();
	else {
		Graphics.DrawEllipse(this.Position.X, this.Position.Y, 27, 20, SatrapyColours[this.Satrapy.Index][0], 0);
		PennantSprite.Draw(this.Position.X, this.Position.Y);
		PennantsSprite.Draw(this.Position.X+this.Specs.PENNANT.X, this.Position.Y+this.Specs.PENNANT.Y, this.Satrapy.Index);
		LetterSprite.Draw(this.Position.X+this.Specs.PENNANT.LETTER.X, this.Position.Y+this.Specs.PENNANT.LETTER.Y, this.Regiment.Type);
		this.DisplayNumbers();
	}

	Graphics.Context.globalAlpha = 1.0;
};
BattleRegiment.prototype.DisplayNumbers = function() {

	//Write right to left (smallest digit to largest)
	this.num = this.Regiment.GetSoldiers();
	for (this.i=3;this.i>=0;--this.i) {
		this.x = this.Position.X + this.Specs.PENNANT.NUMBER.X + (this.i*this.Specs.PENNANT.NUMBER.O);
		DigitsSprite.Draw(this.x, this.Position.Y+this.Specs.PENNANT.NUMBER.Y, this.num % 10);
		this.num = Math.floor(this.num/10);
	}
};
BattleRegiment.prototype.DrawArcher = function() {  //UNLOGGED
/*
	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftArcherSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightArcherSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
*/
	Archer.SetDirection(this.Direction);
	if (this.Direction==DIRECTION.NE)
		Archer.SetSatrapy(BattleView.LeftCommand.Satrapy);
	else
		Archer.SetSatrapy(BattleView.RightCommand.Satrapy);
	Archer.SetPosition( { X: this.Position.X-20, Y: this.Position.Y-20 } );
	Archer.Draw();
};
BattleRegiment.prototype.DrawLongbowman = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftLongbowmanSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightLongbowmanSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawHorseArcher = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftHorseArcherSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightHorseArcherSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawAxeman = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftAxemanSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightAxemanSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawSwordsman = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftSwordsmanSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightSwordsmanSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawPikeman = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftPikemanSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightPikemanSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawMaceman = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftMacemanSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightMacemanSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawCataphract = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftCataphractSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightCataphractSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawKnight = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftKnightSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightKnightSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.DrawImmortal = function() {  //UNLOGGED

	//TEMP
	if (this.Direction==DIRECTION.NE)
		this.LeftImmortalSprite.Draw(this.Position.X-20, this.Position.Y, this.Satrapy.Index);
	else
		this.RightImmortalSprite.Draw(this.Position.X-20, this.Position.Y, SATRAPY.COUNT-(this.Satrapy.Index+1));
};
BattleRegiment.prototype.UpdateCollisionShapes = function() {

	this.FlagBox.L = this.Position.X;
	this.FlagBox.T = this.Position.Y - PennantSprite.Specs.H;
	this.FlagTriangle = [ { X: this.Position.X+11, Y: this.Position.Y-PennantSprite.Specs.H },
								 { X: this.Position.X+28, Y: this.Position.Y+19-PennantSprite.Specs.H },
								 { X: this.Position.X+11, Y: this.Position.Y+19-PennantSprite.Specs.H } ];
	this.EllipseLeftBox.X = this.Position.X - 12;
	this.EllipseLeftBox.Y = this.Position.Y;
	this.EllipseRightBox.X = this.Position.X + 12;
	this.EllipseRightBox.Y = this.Position.Y;
};
BattleRegiment.prototype.CheckClicked = function() {

	if (this.MainView.RegimentFlag)
		return (this.CheckFlagClicked());
	else
		return (this.CheckUnitClicked());
};
BattleRegiment.prototype.CheckFlagClicked = function() {

	//Ellipses
	if (IntersectUtils.CheckPointCircle(Mouse.Click, this.Position, 10))
		return (true);
	if (IntersectUtils.CheckPointBox(Mouse.Click, this.EllipseLeftBox))
		return (true);
	if (IntersectUtils.CheckPointBox(Mouse.Click, this.EllipseRightBox))
		return (true);

	//Flag
	this.UpdateCollisionShapes();
	if (IntersectUtils.CheckPointBox(Mouse.Click, this.FlagBox))
		return (true);
	if (IntersectUtils.CheckPointSWTriangle(Mouse.Click, this.FlagTriangle))
		return (true);
};
BattleRegiment.prototype.CheckUnitClicked = function() {  //UNLOGGED
};
