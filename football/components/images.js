
FootballComponents.prototype.CreateFootballerImages = function() {

	HairImages = new GenieImage();
	PupilImages = new GenieImage();
	HairDoImages = new GenieImage();
	FootballerFaceImages = new GenieImage();
	RoundFaceImages = new GenieImage();
	BangsImages = new GenieImage();
	MaleMonolidImages = new GenieImage();
	FemaleMonolidImages = new GenieImage();
};
FootballComponents.prototype.SetFootballerImages = function() {

	HairImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], HAIrIMAGEs);
	PupilImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], PUPIlIMAGEs);
	HairDoImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], HAIrDoIMAGEs);
	FootballerFaceImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FOOTBALLErFACeIMAGEs);
	RoundFaceImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], ROUNdFACeIMAGEs);
	BangsImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], BANGsIMAGEs);
	MaleMonolidImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], MALeMONOLIdIMAGEs);
	FemaleMonolidImages.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.IMAGES], FEMALeMONOLIdIMAGEs);
};
