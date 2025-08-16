
DominionComponents.prototype.SetSpriteData = function() {

	BOMBErSPRITE		= Object.assign({}, BOMBErSPRITE, JEtSPRITE);
	FIGHTErSPRITE		= Object.assign({}, FIGHTErSPRITE, JEtSPRITE);
	INTERCEPTOrSPRITE	= Object.assign({}, INTERCEPTOrSPRITE, JEtSPRITE);
	INTERDICTOrSPRITE	= Object.assign({}, INTERDICTOrSPRITE, JEtSPRITE);
	RECOnSPRITE			= Object.assign({}, RECOnSPRITE, JEtSPRITE);
	REFUELLErSPRITE 	= Object.assign({}, REFUELLErSPRITE, JEtSPRITE);
	STRAFErSPRITE		= Object.assign({}, STRAFErSPRITE, JEtSPRITE);
	TRANSPORTErSPRITE	= Object.assign({}, TRANSPORTErSPRITE, JEtSPRITE);
};
DominionComponents.prototype.CreateShipSprites = function() {

	GunBoatSprite = new CompositeSprite();
	MissileBoatSprite = new CompositeSprite();
	FrigateSprite = new CompositeSprite();
	DestroyerSprite = new CompositeSprite();
	CruiserSprite = new CompositeSprite();
	BattleshipSprite = new CompositeSprite();
	EscortCarrierSprite = new CompositeSprite();
	LightCarrierSprite = new CompositeSprite();
	FleetCarrierSprite = new CompositeSprite();
	SuperCarrierSprite = new CompositeSprite();
	CarrierTowerSprite = new AnimatedSprite();
};
DominionComponents.prototype.SetShipSprites = function() {

	GunBoatSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GUnBOAtSPRITE, this.GraphicsTool);
	MissileBoatSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILeBOAtSPRITE, this.GraphicsTool);
	FrigateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FRIGATeSPRITE, this.GraphicsTool);
	DestroyerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DESTROYErSPRITE, this.GraphicsTool);
	CruiserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CRUISErSPRITE, this.GraphicsTool);
	BattleshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BATTLESHIpSPRITE, this.GraphicsTool);
	EscortCarrierSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ESCORtCARRIErSPRITE, this.GraphicsTool);
	LightCarrierSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LIGHtCARRIErSPRITE, this.GraphicsTool);
	FleetCarrierSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FLEEtCARRIErSPRITE, this.GraphicsTool);
	SuperCarrierSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SUPErCARRIErSPRITE, this.GraphicsTool);
	CarrierTowerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], CARRIErTOWErSPRITE);
};
DominionComponents.prototype.CreateJetSprites = function() {

	//Left sprites
	LeftBomberSprite = new GeometricSprite();
	LeftFighterSprite = new GeometricSprite();
	LeftInterceptorSprite = new GeometricSprite();
	LeftInterdictorSprite = new GeometricSprite();
	LeftReconSprite = new GeometricSprite();
	LeftRefuellerSprite = new GeometricSprite();
	LeftStraferSprite = new GeometricSprite();
	LeftTransporterSprite = new GeometricSprite();

	//Right sprites
	RightBomberSprite = new GeometricSprite();
	RightFighterSprite = new GeometricSprite();
	RightInterceptorSprite = new GeometricSprite();
	RightInterdictorSprite = new GeometricSprite();
	RightReconSprite = new GeometricSprite();
	RightRefuellerSprite = new GeometricSprite();
	RightStraferSprite = new GeometricSprite();
	RightTransporterSprite = new GeometricSprite();

	LeftJetSprites = [ LeftBomberSprite, LeftFighterSprite, LeftInterceptorSprite, LeftInterdictorSprite,
				LeftReconSprite, LeftRefuellerSprite, LeftStraferSprite, LeftTransporterSprite ];
	RightJetSprites = [ RightBomberSprite, RightFighterSprite, RightInterceptorSprite, RightInterdictorSprite,
				 RightReconSprite, RightRefuellerSprite, RightStraferSprite, RightTransporterSprite ];
};
DominionComponents.prototype.SetJetSprites = function() {

	//Left sprites
	LeftBomberSprite.Set(this.Screen, BOMBErSPRITE, this.CalcPad);
	LeftFighterSprite.Set(this.Screen, FIGHTErSPRITE, this.CalcPad);
	LeftInterceptorSprite.Set(this.Screen, INTERCEPTOrSPRITE, this.CalcPad);
	LeftInterdictorSprite.Set(this.Screen, INTERDICTOrSPRITE, this.CalcPad);
	LeftReconSprite.Set(this.Screen, RECOnSPRITE, this.CalcPad);
	LeftRefuellerSprite.Set(this.Screen, REFUELLErSPRITE, this.CalcPad);
	LeftStraferSprite.Set(this.Screen, STRAFErSPRITE, this.CalcPad);
	LeftTransporterSprite.Set(this.Screen, TRANSPORTErSPRITE, this.CalcPad);

	//Right sprites
	RightBomberSprite.Set(this.Screen, BOMBErSPRITE, this.CalcPad);
	RightFighterSprite.Set(this.Screen, FIGHTErSPRITE, this.CalcPad);
	RightInterceptorSprite.Set(this.Screen, INTERCEPTOrSPRITE, this.CalcPad);
	RightInterdictorSprite.Set(this.Screen, INTERDICTOrSPRITE, this.CalcPad);
	RightReconSprite.Set(this.Screen, RECOnSPRITE, this.CalcPad);
	RightRefuellerSprite.Set(this.Screen, REFUELLErSPRITE, this.CalcPad);
	RightStraferSprite.Set(this.Screen, STRAFErSPRITE, this.CalcPad);
	RightTransporterSprite.Set(this.Screen, TRANSPORTErSPRITE, this.CalcPad);
};
DominionComponents.prototype.CreateInfoJetSprites = function() {

	//UNLOGGED

	FighterInfoSprite = new GeometricSprite();
	FighterDecalSprite = new AnimatedSprite();
};
DominionComponents.prototype.SetInfoJetSprites = function() {

	//UNLOGGED

	FighterInfoSprite.Set(this.InfoBox, FIGHTErINFoSPRITE, this.CalcPad);
	FighterDecalSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FIGHTErDECAlSPRITE);
};
DominionComponents.prototype.CreateProjectileSprites = function() {

	//UNLOGGED

	FirebrandSprite = new CompositeSprite();
	SilklightSprite = new CompositeSprite();
	ICBMSprite = new AnimatedSprite();
	VapouriserSprite = new GenieSprite();
	VagabondSprite = new GenieSprite();
	VenomSprite = new GenieSprite();
};
DominionComponents.prototype.SetProjectileSprites = function() {

	//UNLOGGED

	FirebrandSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FIREBRANdSPRITE, this.CalcPad);
	SilklightSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SILKLIGHtSPRITE, this.CalcPad);
	ICBMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ICBMsPRITE);
	VapouriserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], VAPOURISErSPRITE);
	VagabondSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], VAGABONdSPRITE);
	VenomSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], VENOmSPRITE);
};
