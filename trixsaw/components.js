
//-------------------------------------------
//---------- MAIN OBJECTS -------------------

var SawScape, SawGraphics, SawCalcPad, SawText, SawRandomizer, Controller;		//library
		//core
var Intro, Demo, Tutorial, MiniGames;		//sim
var Testing;		//tools

//-----------------------------------
//---------- DATA -------------------

//---------------------------------------
//---------- CONTROLS -------------------

//-------------------------------------
//---------- IMAGES -------------------

var PuzzleImage;  //UNLOGGED
var CrossImage;  //UNLOGGED

//--------------------------------------
//---------- SPRITES -------------------

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var IntroView;

//---------------------------------------------
//---------- SAW COMPONENTS -------------------
var SawComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var Controller;
};
SawComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect, cntrllr) {
		this.Interface = intrfc;
		this.Screen = this.Interface.Screen;
		this.InfoBox = this.Interface.InfoBox;
		this.ControlPanel = this.Interface.ControlPanel;
		this.Ticker = this.Interface.TickerTape;
		this.Tabloid = this.Interface.Tabloid;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.Controller = cntrllr;

		this.SetData();

		this.CreateTools();
		this.CreateControls();
		this.CreateImages();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateSounds();
		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateViews();

		this.SetTools();
		this.SetControls();
		this.SetImages();
		this.SetSprites();
		this.SetAgents();
		this.SetSounds();
		this.SetCoreObjects();
		this.SetSimObjects();
		this.SetViews();
	},
	SetData() {
	},
	CreateCoreObjects() {
	},
	SetCoreObjects() {
	},
	CreateSimObjects() {

		//UNLOGGED

	},
	SetSimObjects() {

		//UNLOGGED

	},
	CreateTools() {

		//UNLOGGED

	},
	SetTools() {

		//UNLOGGED

	},
	CreateViews() {

		//UNLOGGED

	},
	SetViews() {

		//UNLOGGED

	},
	CreateControls() {

		//UNLOGGED

	},
	SetControls() {

		//UNLOGGED

	},
	CreateImages() {  //UNLOGGED

		PuzzleImage = new GenieImage();
		CrossImage = new GenieImage();
	},
	SetImages() {  //UNLOGGED

		PuzzleImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.PUZZLE], { L: 0, T: 0, W: 360, H: 360, X: 0, Y: 0 } );
		CrossImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], { L: 2, T: 2, W: 60, H: 60 } );
	},
	CreateSprites() {
	},
	SetSprites() {
	},
	CreateAgents() {
	},
	SetAgents() {
	},
	CreateFX() {
	},
	SetFX() {
	},
	CreateSounds() {
	},
	SetSounds() {
	},
	CreateViews() {  //UNLOGGED

		IntroView = new TrixsawIntroView();
	},
	SetViews() {  //UNLOGGED

		IntroView.Set(this.Interface.PrimeScape, VIEW.INTRO);
	}
};
