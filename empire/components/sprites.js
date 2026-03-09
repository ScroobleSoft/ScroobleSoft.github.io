
EmpireComponents.prototype.CreateTerrainSprites = function() {

	HillSprite = new AnimatedSprite();
	HillSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HILlSPRITE);
	TreeSprite = new AnimatedSprite();
	TreeSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], TREeSPRITE);
	PennantSprite = new GenieSprite();
	PennantSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PENNANtSPRITE);
	PennantsSprite = new AnimatedSprite();
	PennantsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], PENNANTsSPRITE);
	LetterSprite = new AnimatedSprite();
	LetterSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LETTErSPRITE);
	DigitsSprite = new AnimatedSprite();
	DigitsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DIGITsSPRITE);
};
EmpireComponents.prototype.CreateSoldierSprites = function() {

	LeftSoldierSprite = new CompositeSprite();
	LeftSoldierSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtSOLDIErSPRITE);
	RightSoldierSprite = new CompositeSprite();
	RightSoldierSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtSOLDIErSPRITE);
	LeftRiderSprite = new CompositeSprite();
	LeftRiderSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtRIDErSPRITE);
	RightRiderSprite = new CompositeSprite();
	RightRiderSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtRIDErSPRITE);
	LeftLegsSprite = new CompositeSprite();
	LeftLegsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLEGsSPRITE);
	RightLegsSprite = new CompositeSprite();
	RightLegsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLEGsSPRITE);
	LeftRiderLegsSprite = new GenieSprite();
	LeftRiderLegsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtRIDErLEGsSPRITE);
	RightRiderLegsSprite = new GenieSprite();
	RightRiderLegsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtRIDErLEGsSPRITE);
};
EmpireComponents.prototype.CreateArmSprites = function() {

	LeftBentArmSprite = new CompositeSprite();
	LeftBentArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBENtARmSPRITE);
	RightBentArmSprite = new CompositeSprite();
	RightBentArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBENtARmSPRITE);
	LeftCockedArmSprite = new CompositeSprite();
	LeftCockedArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtCOCKEdARmSPRITE);
	RightCockedArmSprite = new CompositeSprite();
	RightCockedArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtCOCKEdARmSPRITE);
	LeftStraightArmSprite = new CompositeSprite();
	LeftStraightArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtSTRAIGHtARmSPRITE);
	RightStraightArmSprite = new CompositeSprite();
	RightStraightArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtSTRAIGHtARmSPRITE);
	LeftCrouchedArmSprite = new CompositeSprite();
	LeftCrouchedArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtCROUCHEdARmSPRITE);
	RightCrouchedArmSprite = new CompositeSprite();
	RightCrouchedArmSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtCROUCHEdARmSPRITE);
};
EmpireComponents.prototype.CreateArcherySprites = function() {

	LeftCrossbowSprite = new GenieSprite();
	LeftCrossbowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtCROSSBOwSPRITE);
	RightCrossbowSprite = new GenieSprite();
	RightCrossbowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtCROSSBOwSPRITE);
	LeftLongbowSprite = new GenieSprite();
	LeftLongbowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLONGBOwSPRITE);
	RightLongbowSprite = new GenieSprite();
	RightLongbowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLONGBOwSPRITE);
	LeftHorsebowSprite = new GenieSprite();
	LeftHorsebowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtHORSEBOwSPRITE);
	RightHorsebowSprite = new GenieSprite();
	RightHorsebowSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtHORSEBOwSPRITE);
};
EmpireComponents.prototype.CreateInfantrySprites = function() {

	AxeSprite = new GenieSprite();
	AxeSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], AXeSPRITE);
	UpSwordSprite = new GenieSprite();
	UpSwordSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], UpSWORdSPRITE);
	DownSwordSprite = new GenieSprite();
	DownSwordSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DOWnSWORdSPRITE);
	LeftPikeSprite = new GenieSprite();
	LeftPikeSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtPIKeSPRITE);
	RightPikeSprite = new GenieSprite();
	RightPikeSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtPIKESPRITE);
};
EmpireComponents.prototype.CreateCavalrySprites = function() {

	LeftMaceSprite = new GenieSprite();
	LeftMaceSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtMACeSPRITE);
	RightMaceSprite = new GenieSprite();
	RightMaceSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtMACeSPRITE);
	SpearSprite = new GenieSprite();
	SpearSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SPEArSPRITE);
	LeftLanceHiltSprite = new GenieSprite();
	LeftLanceHiltSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLANCeHILtSPRITE);
	LeftLanceShaftSprite = new GenieSprite();
	LeftLanceShaftSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLANCeSHAFtSPRITE);
	RightLanceHiltSprite = new GenieSprite();
	RightLanceHiltSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLANCeHILtSPRITE);
	RightLanceShaftSprite = new GenieSprite();
	RightLanceShaftSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLANCeSHAFtSPRITE);
};
EmpireComponents.prototype.CreateColouringSprites = function() {

	LeftCrestSprite = new AnimatedSprite();
	LeftCrestSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtCREStSPRITE);
	RightCrestSprite = new AnimatedSprite();
	RightCrestSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtCREStSPRITE);
	LeftLeggingsSprite = new AnimatedSprite();
	LeftLeggingsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLEGGINGsSPRITE);
	RightLeggingsSprite = new AnimatedSprite();
	RightLeggingsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLEGGINGsSPRITE);
	LeftBootsSprite = new AnimatedSprite();
	LeftBootsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBOOtSPRITE);
	RightBootsSprite = new AnimatedSprite();
	RightBootsSprite.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBOOtSPRITE);
};
