
//-------------------------------------------
//---------- MAIN OBJECTS -------------------

var SliderScape, SliderGraphics, SliderText, SliderRandomizer;		//library
var Intro;		//sim

//-----------------------------------
//---------- DATA -------------------

var Paintings;

//---------------------------------------
//---------- CONTROLS -------------------

var RaisedCornerImages, RoundedCornerImages, PushButtonImage;		//images

//-------------------------------------
//---------- IMAGES -------------------

//--------------------------------------
//---------- SPRITES -------------------

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

var Soundtrack1, Soundtrack2, Soundtrack3, Soundtrack4, Soundtracks;

//------------------------------------
//---------- VIEWS -------------------

var GalleryView, ThumbnailView, SlideView, SaleView, DetailsView;
var SlideInfoView, SlideConsoleView;

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

		this.SetData();

		this.CreateTools();
		this.CreateControls();
		this.CreateImageMaps();
		this.CreateImages();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateSounds();
		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateViews();

		this.SetTools();
		this.SetControls();
		this.SetImageMaps();
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

		Intro = new SlideIntro();
	},
	SetSimObjects() {

		//UNLOGGED

		Intro.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
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

		//Images
		RaisedCornerImages = new GenieImage();
		RoundedCornerImages = new GenieImage();
		PushButtonImage = new GenieImage();
	},
	SetControls() {

		//UNLOGGED

		//Images
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
		RoundedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ROUNDEdBUTTOnCORNErIMAGEs);
		PushButtonImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], PUShBUTTOnIMAGE);
	},
	CreateImageMaps() {

		//UNLOGGED

	},
	SetImageMaps() {

		//UNLOGGED

	},
	CreateImages() {

		//UNLOGGED

	},
	SetImages() {

		//UNLOGGED

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

		Soundtrack1 = new GenieSound();
		Soundtrack2 = new GenieSound();
		Soundtrack3 = new GenieSound();
		Soundtrack4 = new GenieSound();
	},
	SetSounds() {

		Soundtrack1.Set(SlideSounds[SOUNdINDEX.SOUNDTRACK1]);
		Soundtrack2.Set(SlideSounds[SOUNdINDEX.SOUNDTRACK2]);
		Soundtrack3.Set(SlideSounds[SOUNdINDEX.SOUNDTRACK3]);
		Soundtrack4.Set(SlideSounds[SOUNdINDEX.SOUNDTRACK4]);
		Soundtracks = [ Soundtrack1, Soundtrack2, Soundtrack3, Soundtrack4 ];
	},
	CreateViews() {

		//UNLOGGED

		GalleryView = new ImageGalleryView();
		ThumbnailView = new SlideThumbnailView();
		SlideView = new SlideShowView();
		SlideInfoView = new SlideshowInfoView();
		SlideConsoleView = new SlideshowConsoleView();
		SaleView = new SaleGalleryView();
		DetailsView = new SlideshowDetailsView();
	},
	SetViews() {

		//UNLOGGED

		GalleryView.Set(this.Interface.PrimeScape, VIEW.GALLERY, this.GraphicsTool, this.TextWriter);
		ThumbnailView.Set(this.Interface.PrimeScape, VIEW.THUMBNAIL, this.TextWriter);
		SlideView.Set(this.Interface.PrimeScape, VIEW.SLIDeSHOW, this.GraphicsTool, this.TextWriter);
		SlideInfoView.Set(this.Interface.ZoomScape, VIEW.SLIDeSHOW.INFO);
		SlideConsoleView.Set(this.Interface.Console, VIEW.SLIDeSHOW.CONSOLE);
		SlideView.SetSubViews(SlideInfoView, SlideConsoleView);
		SaleView.Set(this.Interface.PrimeScape, VIEW.SALE, this.GraphicsTool, this.TextWriter);
		DetailsView.Set(this.Interface.PrimeScape, VIEW.DETAILS, SaleView, this.GraphicsTool, this.TextWriter);
	}
};
