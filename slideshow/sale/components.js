
//-------------------------------------------
//---------- MAIN OBJECTS -------------------

var SliderScape, SliderGraphics, SliderText, SliderRandomizer;		//library

//-----------------------------------
//---------- DATA -------------------

var Paintings;

//---------------------------------------
//---------- CONTROLS -------------------

var RaisedCornerImages, RoundedCornerImages;		//images

//-------------------------------------
//---------- IMAGES -------------------

//--------------------------------------
//---------- SPRITES -------------------

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------
//---------- VIEWS -------------------

var SaleView, DetailsView;

//-----------------------------------------------
//---------- SLIDE COMPONENTS -------------------
var SlideComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, TextWriter, Randomizer;
};
SlideComponents.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator) {
		this.Interface = intrfc;
		this.Screen = this.Interface.Screen;
		this.InfoBox = this.Interface.InfoBox;
		this.ControlPanel = this.Interface.ControlPanel;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;

		this.CreateControls();
		this.CreateImageMaps();
		this.CreateImages();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateSounds();
		this.CreateCoreObjects();
		this.CreateViews();

		this.SetControls();
		this.SetImageMaps();
		this.SetImages();
		this.SetSprites();
		this.SetAgents();
		this.SetSounds();
		this.SetCoreObjects();
		this.SetViews();
	},
	CreateCoreObjects() {
	},
	SetCoreObjects() {
	},
	CreateControls() {

		//Images
		RaisedCornerImages = new GenieImage();
		RoundedCornerImages = new GenieImage();
	},
	SetControls() {

		//Images
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
		RoundedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ROUNDEdBUTTOnCORNErIMAGEs);
	},
	CreateImageMaps() {
	},
	SetImageMaps() {
	},
	CreateImages() {
	},
	SetImages() {
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
	CreateViews() {

		SaleView = new SaleGalleryView();
		DetailsView = new SlideshowDetailsView();
	},
	SetViews() {

		SaleView.Set(this.Interface.PrimeScape, VIEW.SALE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		DetailsView.Set(this.Interface.PrimeScape, VIEW.DETAILS, SaleView, this.GraphicsTool, this.TextWriter);
	}
};
