
//--------------------------------------
//---------- OBJECTS -------------------

var LexiScape, LexiGraphics, LexiText, LexiRandomizer, Controller;			//library

//------------------------------------
//---------- TOOLS -------------------

//---------------------------------------
//---------- CONTROLS -------------------

var GamePushButtonImages;
var ShufflePushButtonImage, CracklePushButtonImage, SpindlePushButtonImage, JigglePushButtonImage, CrosslePushButtonImage, BundlePushButtonImage;
var ShufflePushButton, CracklePushButton, SpindlePushButton, JigglePushButton, CrosslePushButton, BundlePushButton;
var ShallowCornerImages, RaisedCornerImages, RoundedCornerImages, CrossleButtonCornerImages;
var HintButton, SolveButton, RestartButton, QuitButton, InstructionsButton;																		//common buttons
var IconCornerImages, ExpandIconImage, ExpandIcon, ControllerIconImage, ControllerIcon, FullScreenIconImage, FullScreenIcon;		//icons
var MobileControlImages, MobileControlEdgeImages, MobileController;  //UNLOGGED

//-------------------------------------
//---------- IMAGES -------------------

var ShuffleTileImages, ShuffleLetterImages;
var UpperCaseLetterImages;

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var MainView;
var CrackleView, ShuffleView, SpindleView, JiggleView, BundleView;
var CrossleView, CrossleOptionsView;

//----------------------------------------------
//---------- LEXI COMPONENTS -------------------
var LexiComponents = function() {
	var Interface;
	var Screen;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var Controller;
};
LexiComponents.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator, sRect, cntrllr) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;

		this.SetData();

		this.CreateCoreObjects();
		this.CreateTools();
		this.CreateControls();
		this.CreateImages();
		this.CreateViews();
		this.CreateSounds();
		this.CreateViews();

		this.SetCoreObjects();
		this.SetTools();
		this.SetControls();
		this.SetImages();
		this.SetViews();
		this.SetSounds();
		this.SetViews();
	},
	SetData() {
	},
	CreateCoreObjects() {
	},
	SetCoreObjects() {
	},
	CreateTools() {

		//UNLOGGED

	},
	SetTools() {

		//UNLOGGED

	},
	CreateControls() {

		this.CreateCornerImages();
		this.CreatePushButtons();
		this.CreateButtons();
		this.CreateIcons();

		//On-screen controller
		MobileControlImages = new GenieImage();
		MobileControlEdgeImages = new GenieImage();
		MobileController = new MobileGameController();
	},
	SetControls() {

		this.SetCornerImages();
		this.SetPushButtons();
		this.SetButtons();
		this.SetIcons();

		//On-screen controller
		MobileControlImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], MOBILeCONTROlIMAGEs);
		MobileControlEdgeImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], MOBILeCONTROlEDGeIMAGEs);
		MobileController.Set(this.Interface.PrimeScape, LEXiCONTROLLER, MobileControlImages, MobileControlEdgeImages);
	},
	CreateImages() {

		//UNLOGGED

		ShuffleTileImages = new GenieImage();
		ShuffleLetterImages = new GenieImage();
		UpperCaseLetterImages = new GenieImage();
	},
	SetImages() {

		//UNLOGGED

		ShuffleTileImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SHUFFLeTILEIMAGEs);
		ShuffleLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SHUFFLeLETTErIMAGEs);
		UpperCaseLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], MEDIUmLETTErIMAGES);
	},
	CreateFX() {
	},
	SetFX() {
	},
	CreateSounds() {
	},
	SetSounds() {
	},
	CreateViews() {

		//UNLOGGED

		MainView = new GenieMainView();

		CrackleView = new GenieCrackleView();
		ShuffleView = new GenieShuffleView();
		SpindleView = new GenieSpindleView();
		JiggleView  = new GenieJiggleView();

		CrossleView  = new LexiCrossleView();
		CrossleOptionsView = new LexiCrossleOptionsView();

		BundleView  = new GenieBundleView();
	},
	SetViews() {

		//UNLOGGED

		MainView.Set(this.Interface.PrimeScape, MAIN, this.TextWriter);

		CrackleView.Set(this.Interface.PrimeScape, CRACKLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		ShuffleView.Set(this.Interface.PrimeScape, SHUFFLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		SpindleView.Set(this.Interface.PrimeScape, SPINDLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		JiggleView.Set(this.Interface.PrimeScape, JIGGLE, this.GraphicsTool, this.TextWriter, this.Randomizer);

		CrossleView.Set(this.Interface.PrimeScape, CROSSLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		CrossleOptionsView.Set(this.Interface.PrimeScape, CROSSLE.OPTIONS, this.TextWriter);

		BundleView.Set(this.Interface.PrimeScape, BUNDLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
	}
};
