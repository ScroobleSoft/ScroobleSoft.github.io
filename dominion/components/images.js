
DominionComponents.prototype.CreateCannonImages = function() {

   ShortCannonImages = new GenieImage();
   LongCannonImages = new GenieImage();
   ShortCannonConsoleImages = new GenieImage();
   LongCannonConsoleImages = new GenieImage();
};
DominionComponents.prototype.SetCannonImages = function() {

   ShortCannonImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SHORtCANNOnIMAGEs);
   LongCannonImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], LONgCANNOnIMAGEs);
   ShortCannonConsoleImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SHORtCANNOnCONSOLeIMAGEs);
   LongCannonConsoleImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], LONgCANNOnCONSOLeIMAGEs);
};
DominionComponents.prototype.CreateMissileImages = function() {

   //UNLOGGED

   //AAMs
   AAMHorizontalShaftImages = new GenieImage();
   AAMVerticalShaftImages = new GenieImage();
   FirebrandHorizontalFinImages = new GenieImage();
   SilklightHorizontalFinImages = new GenieImage();
   FirebrandVerticalFinImages = new GenieImage();
   SilklightVerticalFinImages = new GenieImage();
   FirebrandHorizontalWarheadImages = new GenieImage();
   SilklightHorizontalWarheadImages = new GenieImage();
   FirebrandVerticalWarheadImage = new GenieImage();
   SilklightVerticalWarheadImage = new GenieImage();
};
DominionComponents.prototype.SetMissileImages = function() {

   //UNLOGGED

   //AAMs
   AAMHorizontalShaftImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], AAMhORIZONTAlSHAFtIMAGEs);
   AAMVerticalShaftImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], AAMvERTICAlSHAFtIMAGEs);
   FirebrandHorizontalFinImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdHORIZONTAlFInIMAGEs);
   SilklightHorizontalFinImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtHORIZONTAlFInIMAGEs);
   FirebrandVerticalFinImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdVERTICAlFInIMAGEs);
   SilklightVerticalFinImages.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtVERTICAlFInIMAGEs);
   FirebrandHorizontalWarheadImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdHORIZONTAlWARHEAdIMAGEs);
   SilklightHorizontalWarheadImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtHORIZONTAlWARHEAdIMAGEs);
   FirebrandVerticalWarheadImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FIREBRANdVERTICAlWARHEAdIMAGE);
   SilklightVerticalWarheadImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], SILKLIGHtVERTICAlWARHEAdIMAGE);
};
DominionComponents.prototype.CreateWardImages = function() {

   FlareImage = new GenieImage();
   ChaffImage = new GenieImage();
   FlareSymbolImage = new GenieImage();
   ChaffSymbolImage = new GenieImage();
};
DominionComponents.prototype.SetWardImages = function() {

   FlareImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FLAReIMAGE);
   ChaffImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], CHAFfIMAGE);
   FlareSymbolImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], FLAReSYMBOlIMAGE);
   ChaffSymbolImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.IMAGES], CHAFfSYMBOlIMAGE);
};
DominionComponents.prototype.CreateCharacterImages = function() {  //TODO: more face images, maybe hair and mouth also

	//Hair
	HairStyleImages = new GenieImage();
	HairDoImages = new GenieImage();
	LongHairImages = new GenieImage();

	//Eyes
	EyeBrowImages = new GenieImage();
	EyeImages = new GenieImage();
	HalfEyeImages = new GenieImage();
	ClosedEyeImages = new GenieImage();

	//Face
	FaceImages = new GenieImage();
	UrnFaceImages = new GenieImage();
	NoseImages = new GenieImage();
	MouthImages = new GenieImage();

	TieImages = new GenieImage();
};
DominionComponents.prototype.SetCharacterImages = function() {

	//Hair
	HairStyleImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], HAIrSTYLeIMAGEs);
	HairDoImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], HAIrDoIMAGEs);
	LongHairImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], LONgHAIrIMAGEs);

	//Face
	FaceImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], FACeIMAGEs);
	UrnFaceImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], URnFACeIMAGEs);
	NoseImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], NOSeIMAGEs);
	MouthImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], MOUThIMAGEs);

	//Eyes
	EyeBrowImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], EYEBROwIMAGEs);
	EyeImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], EYeIMAGEs);
	HalfEyeImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], HALfEYeIMAGEs);
	ClosedEyeImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], CLOSEdEYeIMAGEs);

	TieImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CHARACTERS], TIeIMAGEs);
};
