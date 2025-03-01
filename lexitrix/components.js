
//--------------------------------------
//---------- OBJECTS -------------------

var LexiScape, LexiGraphics, LexiText, LexiRandomizer, Controller;			//library
var ScreenKeyboard;

//-----------------------------------
//---------- DATA -------------------

var Solutions;		//crossle
var FiveLetterWords, SixLetterWords, NineLetterWords;
var FiveDistribution, SixDistribution, NineDistribution;

//------------------------------------
//---------- TOOLS -------------------

//---------------------------------------
//---------- CONTROLS -------------------

var GamePushButtonImages;
var ShufflePushButtonImage, CracklePushButtonImage, SpindlePushButtonImage, FiddlePushButtonImage, CrosslePushButtonImage, TurtlePushButtonImage;
var ShufflePushButton, CracklePushButton, CrosslePushButton, TurtlePushButton, SpindlePushButton, FiddlePushButton;
var ShallowCornerImages, RaisedCornerImages, RoundedCornerImages, CrossleButtonCornerImages;
var HintButton, SolveButton, RestartButton, QuitButton, InstructionsButton;																		//common buttons
var IconCornerImages, ExpandIconImage, ExpandIcon, ControllerIconImage, ControllerIcon, FullScreenIconImage, FullScreenIcon;		//icons
var MobileControlImages, MobileControlEdgeImages, MobileController;  //UNLOGGED
var GreyIconCornerImages;

//-------------------------------------
//---------- IMAGES -------------------

var ShuffleTileImages, ShuffleLetterImages;
var UpperCaseLetterImages, MediumDigitImages;
var KeyLetterImages, PressedLetterImages;	//UNLOGGED

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var MainView;
var CrackleView, ShuffleView, BundleView;
var CrossleView, CrossleOptionsView, CrossleInstructionsView;
var SpindleView, SpindleOptionsView, SpindleHelpView;
var TurtleView, TurtleOptionsView, TurtleStashView, TurtleGuideDialog, TurtleInstructionView;
var FiddleView, FiddleOptionsView, FiddleStashView, FiddleGuideDialog, FiddleInstructionView;

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
      var i;

		//UNLOGGED

		Solutions = Solutions0.concat(Solutions100, Solutions200, Solutions300);

		//Word arrays
		FiveLetterWords = [ Words5a, Words5b, Words5c, Words5d, Words5e, Words5f, Words5g, Words5h, Words5i, Words5j, Words5k, Words5l, Words5m,
								  Words5n, Words5o, Words5p, Words5q, Words5r, Words5s, Words5t, Words5u, Words5v, Words5w, Words5y, Words5z ];
//		for (i=0;i<FiveLetterWords.length;++i)  will do this in CROSSLE, not TURTLE
//			FiveLetterWords[i] = FiveLetterWords[i].concat(SupplementaryWords5a[i]);
		SixLetterWords = [ Words6a, Words6b, Words6c, Words6d, Words6e, Words6f, Words6g, Words6h, Words6i, Words6j, Words6k, Words6l, Words6m,
								 Words6n, Words6o, Words6p, Words6q, Words6r, Words6s, Words6t, Words6u, Words6v, Words6w, Words6y, Words6z ];
		NineLetterWords = [ Words9a, Words9b, Words9c, Words9d, Words9e, Words9f, Words9g, Words9h, Words9i, Words9j, Words9k, Words9l, Words9m,
								  Words9n, Words9o, Words9p, Words9q, Words9r, Words9s, Words9t, Words9u, Words9v, Words9w, Words9y, Words9z ];

		//Word distributions
		FiveDistribution = new Array(FiveLetterWords.length);
		for (i=0;i<FiveDistribution.length;++i)
			FiveDistribution[i] = FiveLetterWords[i].length;
		SixDistribution = new Array(SixLetterWords.length);
		for (i=0;i<SixDistribution.length;++i)
			SixDistribution[i] = SixLetterWords[i].length;
		NineDistribution = new Array(NineLetterWords.length);
		for (i=0;i<NineDistribution.length;++i)
			NineDistribution[i] = NineLetterWords[i].length;
	},
	CreateCoreObjects() {  //UNLOGGED

		ScreenKeyboard = new LexiKeyboard();
	},
	SetCoreObjects() {  //UNLOGGED

		ScreenKeyboard.Set(LEXiKEYBOARD, this.Screen);
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
		MediumDigitImages = new GenieImage();
		KeyLetterImages = new GenieImage();
		PressedLetterImages = new GenieImage();
	},
	SetImages() {

		//UNLOGGED

		ShuffleTileImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SHUFFLeTILEIMAGEs);
		ShuffleLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SHUFFLeLETTErIMAGEs);
		UpperCaseLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], MEDIUmLETTErIMAGES);
		MediumDigitImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES], MEDIUmDIGITsIMAGE);
		KeyLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], KEyLETTErIMAGES);
		PressedLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], KEyPRESSEdIMAGES);
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
		FiddleView  = new LexiFiddleView();

		CrossleView  = new LexiCrossleView();
		CrossleOptionsView = new LexiCrossleOptionsView();
		CrossleInstructionsView = new LexiCrossleInstructionView();

		SpindleView = new LexiSpindleView();
		SpindleOptionsView = new LexiSpindleOptionsView();
		SpindleHelpView = new LexiSpindleHelpView();

		this.CreateTurtleViews();
		this.CreateFiddleViews();

		BundleView  = new GenieBundleView();
	},
	SetViews() {

		//UNLOGGED

		MainView.Set(this.Interface.PrimeScape, MAIN, this.TextWriter);

		CrackleView.Set(this.Interface.PrimeScape, CRACKLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		ShuffleView.Set(this.Interface.PrimeScape, SHUFFLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		FiddleView.SetLinks(null, null, this.Randomizer);
		FiddleView.Set(this.Interface.PrimeScape, FIDDLE);

		CrossleView.Set(this.Interface.PrimeScape, CROSSLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		CrossleOptionsView.Set(this.Interface.PrimeScape, CROSSLE.OPTIONS, this.GraphicsTool, this.TextWriter);
		CrossleInstructionsView.Set(this.Interface.PrimeScape, CROSSLE.INSTRUCTIONS, CrossleView, this.GraphicsTool, this.TextWriter);

		SpindleView.Set(this.Interface.PrimeScape, SPINDLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		SpindleOptionsView.Set(this.Interface.PrimeScape, SPINDLE.OPTIONS, this.TextWriter);
		SpindleHelpView.Set(this.Interface.PrimeScape, SPINDLE.HELP, SpindleView, this.GraphicsTool, this.TextWriter);

		this.SetTurtleViews();
		this.SetFiddleViews();

		BundleView.Set(this.Interface.PrimeScape, BUNDLE, this.GraphicsTool, this.TextWriter, this.Randomizer);
	}
};
