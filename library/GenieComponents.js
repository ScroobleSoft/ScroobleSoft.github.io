
var GameScape;
var NewGameButton, TutorialButton, DemoButton, MiniGamesButton;			//standard buttons
var DemoImage, TutorialImage, MiniGamesImage, TestingImage;					//image maps
var IntroView, DemoView, TutorialView, MiniGamesView, TestingView;		//views

//--------------------------------------------------
//---------- GENIE COMPONENTS ----------------------
var GenieComponents = function() {
};
GenieComponents.prototype = {
	Set() {

		this.SetData();

		this.CreateTools();
		this.CreateImages();
		this.CreateSprites();
		this.CreateControls();
		this.CreateAgents();
		this.CreateFX();
		this.CreateSounds();
		this.CreateObjects();
		this.CreateViews();
	},
	SetData() {
	},
	CreateTools() {
	},
	CreateImages() {

		//Image maps
		DemoImage = new GenieImageMap();
		TutorialImage = new GenieImageMap();
		MiniGamesImage = new GenieImageMap();
		TestingImage = new GenieImageMap();
		DemoImage.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.DEMO], DEMoIMAGE, DemoMap);
		TutorialImage.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.TUTORIAL], TUTORIAlIMAGE, TutorialMap);
		MiniGamesImage.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.MINiGAMES], MINiGAMEsIMAGE, MiniGamesMap);
		TestingImage.Set(GameScape.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);
	},
	CreateSprites() {
	},
	CreateControls() {

		//Standard buttons
		NewGameButton = new ImageButton();
		TutorialButton = new ImageButton();
		DemoButton = new ImageButton();
		MiniGamesButton = new ImageButton();
		NewGameButton.Set(GameScape.ZoomScape, NEwGAMeBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		TutorialButton.Set(GameScape.ZoomScape, TUTORIAlBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		DemoButton.Set(GameScape.ZoomScape, DEMoBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		MiniGamesButton.Set(GameScape.ZoomScape, MINiGAMEsBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
	},
	CreateAgents() {
	},
	CreateFX() {
	},
	CreateSounds() {
	},
	CreateObjects() {
	},
	CreateViews() {
	}
};
