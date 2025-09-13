
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
DominionComponents.prototype.CreateTrooperSprites = function() {

	LeftTrooperSprite = new CompositeSprite();
	RightTrooperSprite = new CompositeSprite();
	LeftGunArmSprite = new GenieSprite();
	RightGunArmSprite = new GenieSprite();
	LeftGrenadierArmSprite = new GenieSprite();
	RightGrenadierArmSprite = new GenieSprite();
	LeftBazookerArmSprite = new GenieSprite();
	RightBazookerArmSprite = new GenieSprite();
	GrenadeSprite = new CompositeSprite();
	LeftBazookaSprite = new CompositeSprite();
	RightBazookaSprite = new CompositeSprite();
};
DominionComponents.prototype.SetTrooperSprites = function() {

	LeftTrooperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtTROOPErSPRITE, this.GraphicsTool);
	RightTrooperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtTROOPErSPRITE, this.GraphicsTool);
	LeftGunArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtGUnARmSPRITE);
	RightGunArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtGUnARmSPRITE);
	LeftGrenadierArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtGRENADIErARmSPRITE);
	RightGrenadierArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtGRENADIErARmSPRITE);
	LeftBazookerArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBAZOOKErARmSPRITE);
	RightBazookerArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBAZOOKErARmSPRITE);
	GrenadeSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GRENADeSPRITE, this.GraphicsTool);
	LeftBazookaSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBAZOOKaSPRITE, this.GraphicsTool);
	RightBazookaSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBAZOOKaSPRITE, this.GraphicsTool);
};
DominionComponents.prototype.CreateLightCombatantSprites = function() {  //UNLOGGED

	LeftHowitzerSprite = new AnimatedSprite();
	RightHowitzerSprite = new AnimatedSprite();
	JeepSprite = new CompositeSprite();
	APCSprite = new CompositeSprite();
	SmallBarrelSprite = new GenieSprite();
	LeftJeepGunSprite = new GenieSprite();
	RightJeepGunSprite = new GenieSprite();
};
DominionComponents.prototype.SetLightCombatantSprites = function() {  //UNLOGGED

	LeftHowitzerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtHOWITZErSPRITE);
	RightHowitzerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtHOWITZErSPRITE);
	JeepSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], JEEpSPRITE, this.GraphicsTool);
	APCSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], APCsPRITE, this.GraphicsTool);
	SmallBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SMALLlBARRElSPRITE);
	LeftJeepGunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtJEEpGUnSPRITE);
	RightJeepGunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtJEEpGUnSPRITE);
};
DominionComponents.prototype.CreateMediumCombatantSprites = function() {  //UNLOGGED

	AVSprite = new CompositeSprite();
	ArtillerySprite = new CompositeSprite();
	IFVSprite = new CompositeSprite();
	LeftAVCannonSprite = new GenieSprite();
	RightAVCannonSprite = new GenieSprite();
	LeftBarrelSprite = new AnimatedSprite();
	RightBarrelSprite = new AnimatedSprite();
};
DominionComponents.prototype.SetMediumCombatantSprites = function() {  //UNLOGGED

	AVSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], AVsPRITE, this.GraphicsTool);
	ArtillerySprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ARTILLERySPRITE, this.GraphicsTool);
	IFVSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], IFVsPRITE, this.GraphicsTool);
	LeftAVCannonSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtAVcANNOnSPRITE);
	RightAVCannonSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtAVcANNOnSPRITE);
	LeftBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBARRElSPRITE);
	RightBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBARRElSPRITE);
};
DominionComponents.prototype.CreateHeavyCombatantSprites = function() {  //UNLOGGED

	MobileGunSprite = new CompositeSprite();
	LeftTruckSprite = new CompositeSprite();
	RightTruckSprite = new CompositeSprite();
	TankSprite = new CompositeSprite();
	TankHutchSprite = new CompositeSprite();
	LargeBarrelSprite = new GenieSprite();
};
DominionComponents.prototype.SetHeavyCombatantSprites = function() {  //UNLOGGED

	MobileGunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MOBILeGUnSPRITE, this.GraphicsTool);
	LeftTruckSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtTRUCkSPRITE, this.GraphicsTool);
	RightTruckSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtTRUCkSPRITE, this.GraphicsTool);
	TankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TANkSPRITE, this.GraphicsTool);
	TankHutchSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TANkHUTChSPRITE, this.GraphicsTool);
	LargeBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeBARRElSPRITE);
};
DominionComponents.prototype.CreateDefenceCombatantSprites = function() {  //UNLOGGED

	ATWSprite = new CompositeSprite();
	LeftATMSprite = new CompositeSprite();
	RightATMSprite = new CompositeSprite();
	AAGunSprite = new CompositeSprite();
	LeftLCGSprite = new AnimatedSprite();
	RightLCGSprite = new AnimatedSprite();
	LeftLCGBarrelSprite = new CompositeSprite();
	RightLCGBarrelSprite = new CompositeSprite();
};
DominionComponents.prototype.SetDefenceCombatantSprites = function() {  //UNLOGGED

	ATWSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ATWsPRITE, this.GraphicsTool);
	LeftATMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtATMsPRITE, this.GraphicsTool);
	RightATMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtATMsPRITE, this.GraphicsTool);
	AAGunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], AAGUnSPRITE, this.GraphicsTool);
	LeftLCGSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLCGsPRITE);
	RightLCGSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLCGsPRITE);
	LeftLCGBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLCGbARRElSPRITE, this.GraphicsTool);
	RightLCGBarrelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLCGbARRElSPRITE, this.GraphicsTool);
};
DominionComponents.prototype.CreateMissileSprites = function() {  //UNLOGGED

	MissilePadSprite = new CompositeSprite();
	SAMSprite = new CompositeSprite();
	LeftSSMSprite = new AnimatedSprite();
	RightSSMSprite = new AnimatedSprite();
};
DominionComponents.prototype.SetMissileSprites = function() {  //UNLOGGED

	MissilePadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MISSILePAdSPRITE, this.GraphicsTool);
	SAMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SAMsPRITE, this.GraphicsTool);
	LeftSSMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtSSMsPRITE);
	RightSSMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtSSMsPRITE);
};
DominionComponents.prototype.CreateWheelSprites = function() {  //UNLOGGED

	LargeWheelSprite = new AnimatedCompositeSprite();
	MediumWheelSprite = new AnimatedCompositeSprite();
	SmallWheelSprite = new AnimatedCompositeSprite();
	TreadSprite = new AnimatedCompositeSprite();
};
DominionComponents.prototype.SetWheelSprites = function() {  //UNLOGGED

	LargeWheelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeWHEElSPRITE, this.GraphicsTool);
	MediumWheelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MEDIUmWHEElSPRITE, this.GraphicsTool);
	SmallWheelSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SMALlWHEElSPRITE, this.GraphicsTool);
	TreadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TREAdSPRITE, this.GraphicsTool);
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
