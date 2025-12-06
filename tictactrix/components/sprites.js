
TacticalComponents.prototype.CreateTrooperSprites = function() {

	EastTrooperSprite = new AnimatedSprite();
	WestTrooperSprite = new AnimatedSprite();
	FeetSprite = new AnimatedSprite();
	RightArmSprite = new GenieSprite();
	LeftArmSprite = new GenieSprite();
};
TacticalComponents.prototype.SetTrooperSprites = function() {

	EastTrooperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStTROOPErSPRITE);
	WestTrooperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStTROOPErSPRITE);
	FeetSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FEEtSPRITE);
	RightArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtARmSPRITE);
	LeftArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtARmSPRITE);
};
TacticalComponents.prototype.CreateWeaponSprites = function() {

	EastRifleSprite = new GenieSprite();
	WestRifleSprite = new GenieSprite();
	EastBazookaSprite = new GenieSprite();
	WestBazookaSprite = new GenieSprite();
	EastLauncherSprite = new GenieSprite();
	WestLauncherSprite = new GenieSprite();
};
TacticalComponents.prototype.SetWeaponSprites = function() {

	EastRifleSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStRIFLeSPRITE);
	WestRifleSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStRIFLeSPRITE);
	EastBazookaSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStBAZOOKaSPRITE);
	WestBazookaSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStBAZOOKaSPRITE);
	EastLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStLAUNCHErSPRITE);
	WestLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStLAUNCHErSPRITE);
};
TacticalComponents.prototype.CreateLightVehicleSprites = function() {

	EastJeepSprite = new AnimatedSprite();
	WestJeepSprite = new AnimatedSprite();
	EastRocketPodSprite = new AnimatedSprite();
	WestRocketPodSprite = new AnimatedSprite();
	EastMissileLauncherSprite = new AnimatedSprite();
	WestMissileLauncherSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetLightVehicleSprites = function() {

	EastJeepSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStJEEpSPRITE);
	WestJeepSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStJEEpSPRITE);
	EastRocketPodSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStROCKEtPOdSPRITE);
	WestRocketPodSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStROCKEtPOdSPRITE);
	EastMissileLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStMISSILeLAUNChSPRITE);
	WestMissileLauncherSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStMISSILeLAUNChSPRITE);
};
TacticalComponents.prototype.CreateMediumVehicleSprites = function() {

	EastHowitzerSprite = new AnimatedSprite();
	WestHowitzerSprite = new AnimatedSprite();
	EastArtillerySprite = new AnimatedSprite();
	WestArtillerySprite = new AnimatedSprite();
	EastAVSprite = new AnimatedSprite();
	WestAVSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetMediumVehicleSprites = function() {

	EastHowitzerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStHOWITZErSPRITE);
	WestHowitzerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStHOWITZErSPRITE);
	EastArtillerySprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStARTILLERySPRITE);
	WestArtillerySprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStARTILLERySPRITE);
	EastAVSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStAVsPRITE);
	WestAVSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStAVsPRITE);
};
TacticalComponents.prototype.CreateHeavyVehicleSprites = function() {

	EastSwiftTankSprite = new AnimatedSprite();
	WestSwiftTankSprite = new AnimatedSprite();
	EastHybridTankSprite = new AnimatedSprite();
	WestHybridTankSprite = new AnimatedSprite();
	EastMegaTankSprite = new AnimatedSprite();
	WestMegaTankSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetHeavyVehicleSprites = function() {

	EastSwiftTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStSWIFtTANkSPRITE);
	WestSwiftTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStSWIFtTANkSPRITE);
	EastHybridTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStHYBRIdTANkSPRITE);
	WestHybridTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStHYBRIdTANkSPRITE);
	EastMegaTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStMEGaTANkSPRITE);
	WestMegaTankSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStMEGaTANkSPRITE);
};
TacticalComponents.prototype.CreateUndercarriageSprites = function() {

	TireSprite = new AnimatedSprite();
	SmallTreadSprite = new AnimatedSprite();
	MediumTreadSprite = new AnimatedSprite();
	LargeTreadSprite = new AnimatedSprite();
	SwiftTrackSprite = new AnimatedSprite();
	HybridTrackSprite = new AnimatedSprite();
	MegaTrackSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetUndercarriageSprites = function() {

	TireSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TIReSPRITE);
	SmallTreadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SMALlTREAdSPRITE);
	MediumTreadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MEDIUmTREAdSPRITE);
	LargeTreadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LARGeTREAdSPRITE);
	SwiftTrackSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SWIFtTRACkSPRITE);
	HybridTrackSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HYBRIdTRACkSPRITE);
	MegaTrackSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MEGaTRACkSPRITE);
};
TacticalComponents.prototype.CreateShipSprites = function() {

	EastFrigateSprite = new AnimatedSprite();
	WestFrigateSprite = new AnimatedSprite();
	EastCruiserSprite = new AnimatedSprite();
	WestCruiserSprite = new AnimatedSprite();
	EastDestroyerSprite = new AnimatedSprite();
	WestDestroyerSprite = new AnimatedSprite();
	EastBattleshipSprite = new AnimatedSprite();
	WestBattleshipSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetShipSprites = function() {

	EastFrigateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStFRIGATeSPRITE);
	WestFrigateSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStFRIGATeSPRITE);
	EastCruiserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStCRUISErSPRITE);
	WestCruiserSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStCRUISErSPRITE);
	EastDestroyerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStDESTROYErSPRITE);
	WestDestroyerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStDESTROYErSPRITE);
	EastBattleshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStBATTLESHIpSPRITE);
	WestBattleshipSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStBATTLESHIpSPRITE);
};
TacticalComponents.prototype.CreateJetSprites = function() {

	EastFighterSprite = new AnimatedSprite();
	WestFighterSprite = new AnimatedSprite();
	EastBomberSprite = new AnimatedSprite();
	WestBomberSprite = new AnimatedSprite();
	EastStraferSprite = new AnimatedSprite();
	WestStraferSprite = new AnimatedSprite();
	EastHelicopterSprite = new AnimatedSprite();
	WestHelicopterSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetJetSprites = function() {

	EastFighterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStFIGHTErSPRITE);
	WestFighterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStFIGHTErSPRITE);
	EastBomberSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStBOMBErSPRITE);
	WestBomberSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStBOMBErSPRITE);
	EastStraferSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStSTRAFErSPRITE);
	WestStraferSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStSTRAFErSPRITE);
	EastHelicopterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStHELICOPTErSPRITE);
	WestHelicopterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStHELICOPTErSPRITE);
};
TacticalComponents.prototype.CreateMiniAmmoSprites = function() {

	BulletSprite = new AnimatedSprite();
	ShellSprite = new AnimatedSprite();
	EastMissileHeadSprite = new AnimatedSprite();
	WestMissileHeadSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetMiniAmmoSprites = function() {

	BulletSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BULLEtSPRITE);
	ShellSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SHELlSPRITE);
	EastMissileHeadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStMISSILeHEAdSPRITE);
	WestMissileHeadSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStMISSILeHEAdSPRITE);
};
TacticalComponents.prototype.CreateLargeAmmoSprites = function() {

	EastAAMSprite = new AnimatedSprite();
	WestAAMSprite = new AnimatedSprite();
	EastBombSprite = new AnimatedSprite();
	WestBombSprite = new AnimatedSprite();
	EastMissileSprite = new AnimatedSprite();
	WestMissileSprite = new AnimatedSprite();
	MineSprite = new AnimatedSprite();
};
TacticalComponents.prototype.SetLargeAmmoSprites = function() {

	EastAAMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStAAMsPRITE);
	WestAAMSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStAAMsPRITE);
	EastBombSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStBOMbSPRITE);
	WestBombSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStBOMbSPRITE);
	EastMissileSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], EAStMISSILeSPRITE);
	WestMissileSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], WEStMISSILeSPRITE);
	MineSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], MINeSPRITE);
};
