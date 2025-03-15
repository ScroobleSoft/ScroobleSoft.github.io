
FootballComponents.prototype.CreateHairSprites = function() {

	//Footballers
	FrontHairSprite = new AnimatedSprite();
	BackHairSprite = new AnimatedSprite();
	LeftHairSprite = new AnimatedSprite();
	RightHairSprite = new AnimatedSprite();

	//Footballinas
	LeftPonyTailSprite = new AnimatedSprite();
	RightPonyTailSprite = new AnimatedSprite();
	LeftHighTailSprite = new AnimatedSprite();
	RightHighTailSprite = new AnimatedSprite();
	HairDoSprite = new AnimatedSprite();
	HairBunSprite = new AnimatedSprite();
	BackPonyTailSprite = new AnimatedSprite();
};
FootballComponents.prototype.SetHairSprites = function() {

	//Footballers
	FrontHairSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FRONtHAIrSPRITE);
	BackHairSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BACkHAIrSPRITE);
	LeftHairSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtHAIrSPRITE);
	RightHairSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtHAIrSPRITE);

	//Footballinas
	LeftPonyTailSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtPONyTAIlSPRITE);
	RightPonyTailSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtPONyTAIlSPRITE);
	LeftHighTailSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtHIGhTAIlSPRITE);
	RightHighTailSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtHIGhTAIlSPRITE);
	HairDoSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HAIrDoSPRITE);
	HairBunSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HAIrBUnSPRITE);
	BackPonyTailSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BACkPONyTAIlSPRITE);
};
