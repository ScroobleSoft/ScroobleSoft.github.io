
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
