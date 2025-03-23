
LexiComponents.prototype.CreateCornerImages = function() {

	ShallowCornerImages = new GenieImage();
	RaisedCornerImages = new GenieImage();
	RoundedCornerImages = new GenieImage();
	IconCornerImages = new GenieImage();
	CrossleButtonCornerImages = new GenieImage();
	GamePushButtonImages = new GenieImage();
	GreyIconCornerImages = new GenieImage();
};
LexiComponents.prototype.SetCornerImages = function() {

	ShallowCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], SHALLOwBUTTOnCORNErIMAGEs);
	RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
	RoundedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ROUNDEdBUTTOnCORNErIMAGEs);
	IconCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ICOnCORNErIMAGEs);
	CrossleButtonCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], CROSSLeBUTTOnCORNErIMAGEs);
	GamePushButtonImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], LEXiPUShBUTTOnIMAGEs);
	GreyIconCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], GREyICOnCORNErIMAGEs);
};
LexiComponents.prototype.CreatePushButtons = function() {

	//Images
	ShufflePushButtonImage = new GenieImage();
	CracklePushButtonImage = new GenieImage();
	CrosslePushButtonImage = new GenieImage();
	TurtlePushButtonImage = new GenieImage();
	SpindlePushButtonImage = new GenieImage();
	FiddlePushButtonImage = new GenieImage();

	//Buttons
	ShufflePushButton = new GeniePushButton();
	CracklePushButton = new GeniePushButton();
	CrosslePushButton = new GeniePushButton();
	TurtlePushButton = new GeniePushButton();
	SpindlePushButton = new GeniePushButton();
	FiddlePushButton = new GeniePushButton();
};
LexiComponents.prototype.SetPushButtons = function() {

	//Images
	ShufflePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], SHUFFLePUShBUTTOnIMAGE);
	CracklePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], CRACKLePUShBUTTOnIMAGE);
	CrosslePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], CROSSLePUShBUTTOnIMAGE);
	TurtlePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], TURTLePUShBUTTOnIMAGE);
	SpindlePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], SPINDLePUShBUTTOnIMAGE);
	FiddlePushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], FIDDLePUShBUTTOnIMAGE);

	//Buttons
	ShufflePushButton.Set(this.Interface.PrimeScape, SHUFFLePUShBUTTON, ShufflePushButtonImage, GamePushButtonImages);
	ShufflePushButton.SetEdgePics(GamePushButtonImages);
	CracklePushButton.Set(this.Interface.PrimeScape, CRACKLePUShBUTTON, CracklePushButtonImage, GamePushButtonImages);
	CracklePushButton.SetEdgePics(GamePushButtonImages);
	CrosslePushButton.Set(this.Interface.PrimeScape, CROSSLePUShBUTTON, CrosslePushButtonImage, GamePushButtonImages);
	CrosslePushButton.SetEdgePics(GamePushButtonImages);
	TurtlePushButton.Set(this.Interface.PrimeScape, TURTLePUShBUTTON, TurtlePushButtonImage, GamePushButtonImages);
	TurtlePushButton.SetEdgePics(GamePushButtonImages);
	SpindlePushButton.Set(this.Interface.PrimeScape, SPINDLePUShBUTTON, SpindlePushButtonImage, GamePushButtonImages);
	SpindlePushButton.SetEdgePics(GamePushButtonImages);
	FiddlePushButton.Set(this.Interface.PrimeScape, FIDDLePUShBUTTON, FiddlePushButtonImage, GamePushButtonImages);
	FiddlePushButton.SetEdgePics(GamePushButtonImages);
};
LexiComponents.prototype.CreateButtons = function() {

	HintButton = new TextButton();
	SolveButton = new TextButton();
	RestartButton = new TextButton();
	QuitButton = new TextButton();

	InstructionsButton = new TextButton();
};
LexiComponents.prototype.SetButtons = function() {

	HintButton.Set(this.Interface.PrimeScape, HINtBUTTON, this.TextWriter);
	HintButton.SetCornersPic(RoundedCornerImages);
	SolveButton.Set(this.Interface.PrimeScape, SOLVeBUTTON, this.TextWriter);
	SolveButton.SetCornersPic(RoundedCornerImages);
	RestartButton.Set(this.Interface.PrimeScape, RESTARtBUTTON, this.TextWriter);
	RestartButton.SetCornersPic(RoundedCornerImages);
	QuitButton.Set(this.Interface.PrimeScape, QUItBUTTON, this.TextWriter);
	QuitButton.SetCornersPic(RoundedCornerImages);

	InstructionsButton.Set(this.Interface.PrimeScape, INSTRUCTIONsBUTTON, this.TextWriter);
	InstructionsButton.SetCornersPic(RaisedCornerImages);
};
LexiComponents.prototype.CreateIcons = function() {

	ExpandIconImage = new GenieImage();
	ExpandIcon = new GenieIcon();
	ControllerIconImage = new GenieImage();
	ControllerIcon = new GenieIcon();
	FullScreenIconImage = new GenieImage();
	FullScreenIcon = new GenieIcon();
};
LexiComponents.prototype.SetIcons = function() {

	ExpandIconImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], EXPANdICOnIMAGE);
	ExpandIcon.Set(this.Interface.PrimeScape, EXPANdICON, ExpandIconImage);
	ExpandIcon.SetCornersPic(IconCornerImages);
	ControllerIconImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], CONTROLLErICOnIMAGE);
	ControllerIcon.Set(this.Interface.PrimeScape, CONTROLLErICON, ControllerIconImage);
	ControllerIcon.SetCornersPic(IconCornerImages);
	FullScreenIconImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], FULlSCREEnICOnIMAGE);
	FullScreenIcon.Set(this.Interface.PrimeScape, FULlSCREEnICON, FullScreenIconImage);
	FullScreenIcon.SetCornersPic(IconCornerImages);
};
