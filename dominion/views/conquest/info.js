/*
 *		NOTE: doubles as scorecard and close-up of fighter
 */
//-----------------------------------------------------------
//---------- DOMINION CONQUEST INFO VIEW --------------------
var DominionConquestInfoView = function() {
	var FighterSymbolImages, SelectionImage;
	var FighterSelected;
	var SelectionLocation, NumbersLocation, SymbolRect;
	var SpriteContext;

	var i, x, y, num;
};
DominionConquestInfoView.prototype = new GenieSubView();
DominionConquestInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.FighterSelected = 0;
	this.SetStructs();
};
DominionConquestInfoView.prototype.SetControls = function() {

	//UNLOGGED - probably none

};
DominionConquestInfoView.prototype.SetImages = function() {

	this.FighterSymbolImages = new GenieImage();
	this.FighterSymbolImages.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SYMBOLS);
	this.SelectionImage = new GenieImage();
	this.SelectionImage.Set(this.Context, ImageManager.Pics[IMAGeINDEX.IMAGES], this.Specs.IMAGE.SELECTION);
};
DominionConquestInfoView.prototype.SetStructs = function() {

	this.SelectionLocation = new Coordinate2D();
	this.SelectionLocation.Set(0,0);
	this.NumbersLocation = new Coordinate2D();
	this.SymbolRect = new GenieRect();
};
DominionConquestInfoView.prototype.Update = function() {

	if (Mouse.CheckLeftClicked(CANVAS.ZOOM)) {
		this.num = this.GetFighterIndex();
		if (this.num!=-1)
			if (this.num!=this.FighterSelected) {
				this.DrawSelectionSquare(this.num);
				this.FighterSelected = this.num;
				this.GraphicsTool.SetContext(this.Context);
				this.GraphicsTool.DrawRectangle(45, 0, 150, 180, this.Specs.COLOUR, 0);
				this.GraphicsTool.DrawRectangle(0, 180, 240, 60, this.Specs.COLOUR, 0);
				this.GraphicsTool.RestoreContext();
				this.DrawFighter();
			}
	}
};
DominionConquestInfoView.prototype.UpdateTotals = function() {  //UNLOGGED

	this.GraphicsTool.SetContext(this.Context);

	//Attack
	this.GraphicsTool.DrawRectangle(35, 167, 15, 12, this.Specs.COLOUR, 0);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.AttackCurrent/10), 36, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.AttackCurrent % 10, 36, 168);

	//Defence
	this.GraphicsTool.DrawRectangle(197, 167, 15, 12, this.Specs.COLOUR, 0);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.DefenceCurrent/10), 198, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.DefenceCurrent % 10, 205, 168);

	this.GraphicsTool.ResetContext();
};
DominionConquestInfoView.prototype.Draw = function() {  //UNLOGGED

	this.DrawSymbols();
	this.DrawSelectionSquare();
	this.DisplayFighterNumbers();
	this.DisplayTotals();
	this.DrawFighter();
};
DominionConquestInfoView.prototype.DrawSymbols = function() {
	var i;

	//Left
	for (i=0;i<FIGHTER.TYPES;++i) {
		this.FighterSymbolImages.DrawPatchNumber(10*this.MainView.AttackingNation.Index, 3, 3+(18*i));
		this.FighterSymbolImages.DrawPatchNumber(this.MainView.AttackingNation.Index+1+(10*i), 15, 3+(18*i));
	}

	//Right
	for (i=0;i<FIGHTER.TYPES;++i) {
		if (this.MainView.DefendingNation.Type==NATION.POWER) {		//Powers
			this.FighterSymbolImages.DrawPatchNumber(10*this.MainView.DefendingNation.Index, 215, 3+(18*i));
			this.FighterSymbolImages.DrawPatchNumber(this.MainView.DefendingNation.Index+1+(10*i), 227, 3+(18*i));
		} else {																		//Allied States
			this.FighterSymbolImages.DrawPatchNumber(10*this.MainView.DefendingNation.AssociatedIndex, 215, 3+(18*i));
			this.FighterSymbolImages.DrawPatchNumber(this.MainView.DefendingNation.AssociatedIndex+1+(10*i), 227, 3+(18*i));
		}
	}
};
DominionConquestInfoView.prototype.DrawSelectionSquare = function(iFghtr) {

	if (iFghtr==undefined)
		iFghtr = this.FighterSelected;

	function DetermineLocation(iJet, pnt) {

		if (iJet<FIGHTER.TYPES)
			pnt.X = 0;
		else
			pnt.X = 211;
		pnt.Y = 18 * (iJet % FIGHTER.TYPES);
	}

	DetermineLocation(this.FighterSelected, this.SelectionLocation);
	this.SelectionImage.DrawPatchNumber(1, this.SelectionLocation.X, this.SelectionLocation.Y);

	DetermineLocation(iFghtr, this.SelectionLocation);
	this.SelectionImage.DrawPatchNumber(0, this.SelectionLocation.X, this.SelectionLocation.Y);
};
DominionConquestInfoView.prototype.DisplayFighterNumbers = function() {
	var i;

	for (i=0;i<FIGHTER.TYPES;++i) {
		this.DisplayFighterNumber(i, ATTACK);
		this.DisplayFighterNumber(i);
	}
};
DominionConquestInfoView.prototype.DisplayFighterNumber = function(iFghtr, bAttck) {

	this.DetermineNumbersLocation(iFghtr, bAttck);
	this.GraphicsTool.SetContext(this.Context);
	this.GraphicsTool.DrawRectangle(this.NumbersLocation.X, this.NumbersLocation.Y, 14, 13, this.Specs.COLOUR, 0);
	this.GraphicsTool.ResetContext();
	this.TextWriter.SetContext(this.Context);
	if (bAttck) {
		ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.AttackNumbers[iFghtr]/10), this.NumbersLocation.X, this.NumbersLocation.Y+3);
		ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.AttackNumbers[iFghtr] % 10, this.NumbersLocation.X+7, this.NumbersLocation.Y+3);
	} else {
		ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.DefenceNumbers[iFghtr]/10), this.NumbersLocation.X, this.NumbersLocation.Y+3);
		ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.DefenceNumbers[iFghtr] % 10, this.NumbersLocation.X+7, this.NumbersLocation.Y+3);
	}
	this.TextWriter.ResetContext();
};
DominionConquestInfoView.prototype.DisplayTotals = function() {

	this.GraphicsTool.SetContext(this.Context);

	//Attack
	this.GraphicsTool.DrawRectangle(28, 163, 15, 2, "black", 1);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.AttackStart/10), 6, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.AttackStart % 10, 13, 168);
	this.GraphicsTool.DrawRectangle(23, 170, 2, 2, "black", 1);
	this.GraphicsTool.DrawRectangle(23, 174, 2, 2, "black", 1);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.AttackCurrent/10), 29, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.AttackCurrent % 10, 36, 168);

	//Defence
	this.GraphicsTool.DrawRectangle(197, 163, 15, 2, "black", 1);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.DefenceCurrent/10), 198, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.DefenceCurrent % 10, 205, 168);
	this.GraphicsTool.DrawRectangle(215, 170, 2, 2, "black", 1);
	this.GraphicsTool.DrawRectangle(215, 174, 2, 2, "black", 1);
	ArverniDigitImages.DrawPatchNumber(Math.floor(this.MainView.AirConquest.DefenceStart/10), 221, 168);
	ArverniDigitImages.DrawPatchNumber(this.MainView.AirConquest.DefenceStart % 10, 228, 168);

	this.GraphicsTool.ResetContext();
};
DominionConquestInfoView.prototype.GetFighterIndex = function() {

	for (this.i=0;this.i<2*FIGHTER.TYPES;++this.i) {
		if (this.i<FIGHTER.TYPES)
			this.SymbolRect.L = 3;
		else
			this.SymbolRect.L = 211;
		this.SymbolRect.T = 3 + (18*(this.i % FIGHTER.TYPES));
		this.SymbolRect.W = (2*this.Specs.IMAGE.SYMBOLS.PATCH.W) + 2;
		this.SymbolRect.H = this.Specs.IMAGE.SYMBOLS.PATCH.H;
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.SymbolRect))
			return (this.i);
	}

	return (-1);
};
DominionConquestInfoView.prototype.DrawFighter = function() {

	FighterDecalSprite.SetContext(this.Context);
	if (this.FighterSelected<FIGHTER.TYPES) {
		this.SpriteContext = LeftFighterSprite.Context;
		LeftFighterSprite.SetContext(this.Context);
		LeftFighters[this.FighterSelected].SetNation(this.MainView.AttackingNation);
		LeftFighters[this.FighterSelected].SetAngle(0);
		LeftFighters[this.FighterSelected].SetScale( { X: 1, Y: 1 } );
		LeftFighters[this.FighterSelected].SetPosition( { X: 120, Y: 105 } );
		LeftFighters[this.FighterSelected].Draw();
		LeftFighterSprite.SetContext(this.SpriteContext);
		this.DisplayArsenal(LeftFighters[this.FighterSelected], ATTACK);
	} else {
		this.SpriteContext = RightFighterSprite.Context;
		RightFighterSprite.SetContext(this.Context);
		RightFighters[this.FighterSelected].SetNation(this.MainView.DefendingNation);
		RightFighters[this.FighterSelected-FIGHTER.TYPES].SetAngle(0);
		RightFighters[this.FighterSelected-FIGHTER.TYPES].SetScale( { X: 1, Y: 1 } );
		RightFighters[this.FighterSelected].SetPosition( { X: 120, Y: 105 } );
		RightFighters[this.FighterSelected].Draw();
		RightFighterSprite.SetContext(this.SpriteContext);
		this.DisplayArsenal(RightFighters[this.FighterSelected]);
	}	
	FighterDecalSprite.SetContext(this.SpriteContext);
};
DominionConquestInfoView.prototype.DisplayArsenal = function(fghtr, bAttck) {
	var num;
	var state;

	//Weapons
	state = fghtr.SpriteIndex;
	if (bAttck)
		state += 10;
	ShortCannonImages.DrawPatchNumber(state, 93, 155);
	if (this.FighterType!=FIGHTER.F1)
		LongCannonImages.DrawPatchNumber(state, 88, 175);
	if (this.FighterType>=FIGHTER.F3)
		this.DisplayFirebrand(state, 9, 200, ATTACK);
	if (this.FighterType>=FIGHTER.F4)
		this.DisplaySilklight(state, 9, 220, ATTACK);
	if (this.FighterType>=FIGHTER.F7) {
		num = fghtr.FighterIndex - FIGHTER.F5;
		for (i=1;i<num;++i) {
			this.DisplayFirebrand(state, 9+(58*i), 200, ATTACK);
			this.DisplaySilklight(state, 9+(58*i), 220, ATTACK);
		}
	}

	//Wards
	if (this.FighterType>=FIGHTER.F5)
		FlareImage.Draw(72, 40);
	if (this.FighterType>=FIGHTER.F6)
		ChaffImage.Draw(72, 10);
	if (this.FighterType>=FIGHTER.F7) {
		num = fghtr.FighterIndex - FIGHTER.F5;
		for (i=i;i<num;++i) {
			FlareImage.Draw(72+(24*i), 40);
			ChaffImage.Draw(72+(24*i), 10);
		}
	}
};
DominionConquestInfoView.prototype.DisplayFirebrand = function(nPtch, x, y, bAttck) {

	AAMHorizontalShaftImages.DrawPatchNumber(nPtch, x, y);
	if (bAttck) {
		FirebrandHorizontalFinImages.DrawPatchNumber(nPtch, x+FIREBRAND.FIN.L.T.X, y+FIREBRAND.FIN.L.T.Y);
		FirebrandHorizontalFinImages.DrawPatchNumber(nPtch, x+FIREBRAND.FIN.L.B.X, y+FIREBRAND.FIN.L.B.Y);
		FirebrandHorizontalWarheadImages.DrawPatchNumber(nPtch, x+FIREBRAND.WARHEAD.L.X, y+FIREBRAND.WARHEAD.L.Y);
	} else {
		FirebrandHorizontalFinImages.DrawPatchNumber(nPtch, x+FIREBRAND.FIN.R.T.X, y+FIREBRAND.FIN.R.T.Y);
		FirebrandHorizontalFinImages.DrawPatchNumber(nPtch, x+FIREBRAND.FIN.R.B.X, y+FIREBRAND.FIN.R.B.Y);
		FirebrandHorizontalWarheadImages.DrawPatchNumber(nPtch, x+FIREBRAND.WARHEAD.R.X, y+FIREBRAND.WARHEAD.R.Y);
	}
};
DominionConquestInfoView.prototype.DisplaySilklight = function(nPtch, x, y, bAttck) {

	AAMHorizontalShaftImages.DrawPatchNumber(nPtch, x, y);
	if (bAttck) {
		SilklightHorizontalFinImages.DrawPatchNumber(nPtch, x+SILKLIGHT.FIN.L.T.X, y+SILKLIGHT.FIN.L.T.Y);
		SilklightHorizontalFinImages.DrawPatchNumber(nPtch, x+SILKLIGHT.FIN.L.B.X, y+SILKLIGHT.FIN.L.B.Y);
		SilklightHorizontalWarheadImages.DrawPatchNumber(nPtch, x+SILKLIGHT.WARHEAD.L.X, y+SILKLIGHT.WARHEAD.L.Y);
	} else {
		SilklightHorizontalFinImages.DrawPatchNumber(nPtch, x+SILKLIGHT.FIN.R.T.X, y+SILKLIGHT.FIN.R.T.Y);
		SilklightHorizontalFinImages.DrawPatchNumber(nPtch, x+SILKLIGHT.FIN.R.B.X, y+SILKLIGHT.FIN.R.B.Y);
		SilklightHorizontalWarheadImages.DrawPatchNumber(nPtch, x+SILKLIGHT.WARHEAD.R.X, y+SILKLIGHT.WARHEAD.R.Y);
	}
};
DominionConquestInfoView.prototype.DetermineNumbersLocation = function(iFghtr, bAttck) {

	if (bAttck)
		this.NumbersLocation.X = 29;
	else
		this.NumbersLocation.X = 198;
	this.NumbersLocation.Y = 3 + (18*iFghtr);
};
