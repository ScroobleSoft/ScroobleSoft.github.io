
SolarComponents.prototype.CreateCreditImages = function() {

	TitleImage = new GenieImage();
	PicatrixImage = new GenieImage();
	ByImage = new GenieImage();
	ScrooblesoftImage = new GenieImage();
	TrixsterImage = new GenieImage();
	SoundImage = new GenieImage();
};
SolarComponents.prototype.SetCreditImages = function() {

	TitleImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], TITLeIMAGE);
	PicatrixImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PICATRIxIMAGE);
	ByImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], ByIMAGE);
	ScrooblesoftImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SCROOBLESOFtIMAGE);
	TrixsterImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], TRIXSTErIMAGE);
	SoundImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SOUNdIMAGE);
};
