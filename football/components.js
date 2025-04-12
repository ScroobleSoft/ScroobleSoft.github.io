
//-------------------------------------------
//------------ OBJECTS ----------------------

var FootieScape, FootieGraphics, FootieText, FootieController, FootieRandomizer, Controller;						//library
var Teams, TeamSelected, League, LeagueTable, SideViewPitch, IsoPitch, Match, Managers, TransferPool;			//core
var QuickSim, MatchUpSim, Scoreboard;	//TEMP?
var Intro, Demo, Tutorial, MiniGames;									//sim

//-----------------------------------------
//------------ TOOLS ----------------------

var Testing;
var TransformBuffer;
var Mapper;
var FootUtils;

//Scratch variables
var indx, strng, coords, coord2, info, colour;

//-----------------------------------------
//------------ DATA -----------------------

const HomeFlag = true;

var SideViewScale;	//REDUNDANT
var KitMatchUps;
var TypeDifferentials;

var SVhALFWAyLINE, SVcENTReSPOT, SVfArTOUChLINE, SVnEArTOUChLINE, SVpENALTyBOX, SVpENALTySPOT, SVgOAlBOX, SVgOAlFRAME;
var ReColourData;
var NameLists, NameListSizes;

//---------------------------------------------
//------------ CONTROLS -----------------------

//Buttons
var TransferListButton, PromoteButton;

//Images
var ButtonCornerImages, ShallowCornerImages, RaisedCornerImages, IconCornerImages;	//REDUNDANT: IconCornerImages only in FixturesSubView, created there
var RadioOptionImage;

//Info
var LeagueDataArea, SquadDataArea, YouthDataArea, ExtraDataArea;

//Panels

//Views
var NewGameButton, TutorialButton, DemoButton, MiniGamesButton,																	//Intro
	 FeaturedGameButton, DailyGameButton, WeeklyGameButton, RandomGameButton;
var GameRadioOptions, BudgetRadioOptions, GameOptionsButton, TeamButtons, RotatingBallButtons;							//League	 
var PositionButtons;									//Team
var CheckBoxImage, SubsCheckBox, OpponentCheckBox, AutoSelectButton, ClearSelectionsButton;	//Formation

//-----------------------------------------------
//------------ IMAGE MAPS -----------------------

var TestingImage;

//-------------------------------------------
//------------ IMAGES -----------------------

var PitchImage;
var RotatingBallImage;
var AcronymImages;
var TypeSymbolImages, DesignationSymbolImages, ArrowImages;
var FeeDigitImages, FeeDisplayImage;

var FootballerFaceImages, HairImages, PupilImages, MaleMonolidImages;					//Male
var HairDoImages, RoundFaceImages, BangsImages, FemaleMonolidImages;						//Female
var SmallLetterImages, MediumLetterImages, PlusImage, MinusImage;
var InjuredImage;

//--------------------------------------------
//------------ SPRITES -----------------------

var BlueFootballerSprite, RedFootballerSprite, BlueSideOnSprite, RedSideOnSprite;	//REDUNDANT, eventually

var FrontFootballerSprite, BackFootballerSprite, LeftFootballerSprite, RightFootballerSprite;
var FrontHairSprite, BackHairSprite, LeftHairSprite, RightHairSprite, LeftPonyTailSprite, RightPonyTailSprite,
	 LeftHighTailSprite, RightHighTailSprite, HairDoSprite, HairBunSprite, BackPonyTailSprite;
var LeftKeeperSprite, RightKeeperSprite;
var GoalpostSprite, FootballSprite;
var GoalSprite;					//REDUNDANT, DE-LOG

//-------------------------------------------
//------------ AGENTS -----------------------

var Football;
var HomeGoalkeeper;
var AwayGoalkeeper;
var HomeOutfieldPlayers;	//will be made REDUNDANT
var AwayOutfieldPlayers;	//  "  "	"	  "
var HomePlayers;		//will be used instead
var AwayPlayers;		//  "  "	"	  "

//**** NEW ****
var HomeTopDownPlayers, AwayTopDownPlayers;
var HomeSideViewPlayers, AwaySideViewPlayers;
var HomeIsometricPlayers, AwayIsometricPlayers;

//--------------------------------------------
//------------ VIEWS -----------------------

var LeagueView, LeagueInfoView, LeagueConsoleView;
var TeamView, TeamInfoView, TeamConsoleView;
var SquadView, SquadConsoleView;
var YouthView;
var FormationSubView, FormationInfoView, FormationConsoleView;
var FixturesSubView, FixturesInfoView;
var OpponentSubView, OpponentInfoView, TransferSubView;
var TableSubView, TableConsoleView;
var TacticsSubView, TrainingSubView, StatsSubView;
var MatchSideView, HighlightsView, HighlightsInfoView, HighlightsConsoleView;

//--------------------------------------------------------
//------------ FOOTBALL COMPONENTS -----------------------
var FootballComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, TextWriter;
	var Randomizer;
	var ScreenRect;
//	var DuelSpace;
	var FXLists;
	var ZOrderIndex;

	var i, y;
};
FootballComponents.prototype = {
	Set(intrfc, gTool, tWriter, rGenerator, sRect) {

		this.Interface = intrfc;
		this.Screen = this.Interface.Screen;
		this.InfoBox = this.Interface.InfoBox;
		this.ControlPanel = this.Interface.ControlPanel;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
//		this.DuelSpace = dSpace;
		this.ScreenRect = sRect;

		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateTools();
		this.CreateControls();
		this.CreateImageMaps();
		this.CreateImages();
		this.CreateSprites();
//		this.CreateFXLists();
		this.CreateAgents();
		this.CreateViews();

		this.SetData();

		this.SetCoreObjects();
		this.SetSimObjects();
		this.SetTools();
		this.SetControls();
		this.SetImageMaps();
		this.SetImages();
		this.SetSprites();
//		this.SetFXLists();
		this.SetAgents();
		this.SetViews();
	},
	SetData() {

		//UNLOGGED

		KitMatchUps = [
	[ [0,1,2],[1,0,2],[1,0,2],[0,1,2],[0,1,2],[1,0,2],[2,0,1],[2,1,0],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,1,2],[2,1,0],[2,1,0],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,0,2] ],
	[ [1,0,2],[0,1,2],[1,0,2],[0,1,2],[0,1,2],[1,0,2],[2,1,0],[1,2,0],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,2,1],[0,1,2] ],
	[ [1,0,2],[1,0,2],[0,1,2],[0,1,2],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[2,1,0],[0,1,2],[1,0,2],[1,0,2],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,1,2] ],
	[ [0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[1,0,2],[0,1,2],[0,1,2],[0,1,2],[2,1,0],[1,2,0],[1,0,2],[2,1,0],[2,1,0],[2,0,1],[2,1,0],[1,2,0],[1,2,0],[2,1,0] ],
	[ [0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,2,1],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2],[0,1,2] ],
	[ [1,2,0],[1,2,0],[1,2,0],[0,1,2],[0,2,1],[0,1,2],[1,0,2],[2,1,0],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2] ],
	[ [2,0,1],[2,0,1],[1,2,0],[0,1,2],[0,1,2],[2,0,1],[0,1,2],[1,0,2],[2,1,0],[2,0,1],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,0,1],[2,0,1],[1,0,2] ],
	[ [1,0,2],[1,2,0],[1,2,0],[0,1,2],[0,2,1],[1,0,2],[1,0,2],[1,2,0],[2,1,0],[1,2,0],[1,2,0],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,1,0],[2,1,0],[1,2,0],[1,2,0],[0,2,1] ],
	[ [1,2,0],[2,0,1],[1,0,2],[0,1,2],[1,0,2],[1,0,2],[2,0,1],[1,0,2],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,0,1],[2,0,1],[1,0,2] ],
	[ [2,0,1],[2,0,1],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[2,0,1],[1,0,2],[2,1,0],[0,1,2],[1,0,2],[0,1,2],[1,0,2],[0,1,2],[0,1,2],[1,0,2],[1,0,2],[2,0,1],[2,0,1],[1,0,2] ],
	[ [1,2,0],[1,0,2],[1,0,2],[0,1,2],[0,2,1],[1,2,0],[1,2,0],[2,1,0],[1,0,2],[1,0,2],[0,1,2],[1,2,0],[1,0,2],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,2,0],[1,2,0],[2,0,1] ],
	[ [1,2,0],[1,0,2],[1,0,2],[1,0,2],[0,2,1],[2,0,1],[1,2,0],[2,0,1],[2,0,1],[1,0,2],[2,1,0],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[2,0,1],[2,1,0],[1,2,0],[1,2,0],[2,0,1] ],
	[ [1,0,2],[1,0,2],[0,1,2],[0,2,1],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,1,2],[2,0,1],[0,1,2],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,2,0] ],
	[ [1,0,2],[1,0,2],[1,0,2],[0,2,1],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,2,1],[0,1,2],[2,0,1],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,2,0] ],
	[ [1,0,2],[1,0,2],[1,0,2],[0,2,1],[0,1,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[0,2,1],[0,2,1],[0,1,2],[1,0,2],[1,0,2],[1,2,0],[1,0,2],[1,2,0] ],
	[ [1,2,0],[1,0,2],[1,0,2],[2,1,0],[0,1,2],[2,0,1],[1,0,2],[2,1,0],[1,0,2],[1,0,2],[2,0,1],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,1,0],[1,0,2],[1,2,0],[2,0,1] ],
	[ [1,2,0],[1,0,2],[1,0,2],[1,2,0],[0,2,1],[2,0,1],[1,0,2],[2,0,1],[1,0,2],[1,0,2],[2,0,1],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,0,1],[1,0,2],[1,0,2],[1,2,0],[2,0,1] ],
	[ [2,0,1],[2,0,1],[1,2,0],[0,1,2],[0,1,2],[2,1,0],[2,0,1],[2,1,0],[2,1,0],[0,2,1],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[1,0,2],[2,1,0],[2,1,0],[0,1,2],[2,0,1],[2,0,1] ],
	[ [2,0,1],[2,0,1],[0,1,2],[1,0,2],[0,1,2],[1,0,2],[2,0,1],[2,0,1],[2,1,0],[0,2,1],[1,2,0],[1,2,0],[1,0,2],[1,0,2],[1,0,2],[2,1,0],[1,2,0],[2,0,1],[0,1,2],[2,0,1] ],
	[ [1,2,0],[0,2,1],[1,0,2],[0,1,2],[0,2,1],[1,2,0],[1,2,0],[2,0,1],[2,1,0],[1,0,2],[1,2,0],[2,0,1],[2,1,0],[2,1,0],[2,1,0],[2,0,1],[1,2,0],[1,2,0],[1,2,0],[0,1,2] ]
		];

		NameLists = [ FirstNames, FemaleNames, LastNames, OverseasNames, DomesticNames, PeripheralNames, SemiProNames, ProdigyNames ];
		NameListSizes = [ 1415,1821,1142,331,249,843,881,216 ];
		TypeDifferentials = [ 0,3,-3,-2,-1,0,2,0,1 ];

		this.SetSideViewData();
	},
	CreateCoreObjects() {

		//UNLOGGED

		Teams = new AgentArray();
		League = new FootballLeague();
		IsoPitch = new FootballPitch();
		SideViewPitch = new SideViewFootballPitch();
		Match = new FootballMatch();
		Managers = new GenieArray();
		TransferPool = new FootballTransferPool();
		LeagueTable = new PremierLeagueTable();

		//Match simulations
		QuickSim = new FootballMatchSimulation();
		MatchUpSim = new MatchUpSimulation();		//REDUNDANT at the moment
		Scoreboard = new MatchScoreboard();
	},
	SetCoreObjects() {
		var i;

		//UNLOGGED

		Teams.Set(LEAGUE.TEAMS, FootballTeam, INDEXED, this.Randomizer);
		League.Set(this.Randomizer);
		IsoPitch.Set(this.Interface);
		SideViewPitch.Set(this.Screen, this.GraphicsTool, this.ScreenRect);
		Match.Set(this.Randomizer);
		Managers.Set(LEAGUE.TEAMS, FootballManager, INDEXED);
		TransferPool.Set(this.Randomizer);
		LeagueTable.Set();

		//Match simulations
		QuickSim.Set(this.Randomizer);
//		MatchUpSim.Set(this.Randomizer);  REDUNDANT at the moment, crashes anyway
		Scoreboard.Set();
	},
	CreateSimObjects() {

		Intro = new FootballIntro();
		Demo = new FootballDemo();
		Tutorial = new FootballTutorial();
		MiniGames = new FootballMiniGames();
	},
	SetSimObjects() {

		Intro.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		Demo.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		Tutorial.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		MiniGames.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
	},
	CreateTools() {

		//UNLOGGED

		Testing = new FootballTesting();
		TransformBuffer = new GenieBuffer();
		Mapper = new PitchCoordinateMapper();
		FootUtils = new FootballUtilities();

		//Scratch variables
		coords = new Coordinate2D();
		coords2 = new Coordinate2D();
	},
	SetTools() {

		//UNLOGGED

		TransformBuffer.Set(null, TRANSFORMABLE);
		Mapper.Set(this.ScreenRect);
		Testing.Set(this.Screen, this.InfoBox, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		FootUtils.Set(this.ScreenRect);
	},
	CreateControls() {

		this.CreateIntroControls();

		//Buttons
		GameOptionsButton = new TextButton();
		TeamButtons = ArrayUtils.Create(LEAGUE.TEAMS, ImageButton);
		TransferListButton = new TextButton();
		PromoteButton = new TextButton();
		PositionButtons = ArrayUtils.Create(SQUAD.GROUPS, TextButton);

		//Options
		RadioOptionImage = new GenieImage();
		GameRadioOptions = new GenieRadioControls();
		BudgetRadioOptions = new GenieRadioControls();
		CheckBoxImage = new GenieImage();

		//Icon panels
		IconCornerImages = new GenieImage();
		ButtonCornerImages = new GenieImage();
		ShallowCornerImages = new GenieImage();
		RaisedCornerImages = new GenieImage();

		//Info
		LeagueDataArea = new GenieTextArea();
		SquadDataArea = new GenieTextArea();
		YouthDataArea = new GenieTextArea();
		ExtraDataArea = new GenieTextArea();

		this.CreateFormationControls();
	},
	SetControls() {
		var i;
		var l, t;
		var sx, sy;
		var specs;

		this.SetIntroControls();

		//League club logo buttons
		for (i=0;i<LEAGUE.TEAMS;++i) {
			l = 40 + (150*(i % 5));
			t = 50 + (125*Math.floor(i/5));
			sx = 1 + (120*(i % 5));
			sy = 1 + (120*Math.floor(i/5));
			specs = { L: l, T: t, W: TEAmBUTTON.W, H: TEAmBUTTON.H, LW: 2, SX: sx, SY: sy };
			TeamButtons[i].Set(this.Interface.PrimeScape, specs, ImageManager.Pics[IMAGeINDEX.TEAmLOGOS]);
		}

		//Buttons
		GameOptionsButton.Set(this.Interface.Console, { L: 90, T: 150, W: 140, H: 20, LABEL: "More Options . . ." }, this.TextWriter);
		TransferListButton.Set(this.Interface.Console, { L: 5, T: 180, W: 120, H: 20, LABEL: "Transfer List" }, this.TextWriter);
		PromoteButton.Set(this.Interface.Console, { L: 5, T: 5, W: 80, H: 20, LABEL: "Promote" }, this.TextWriter);
		for (i=0;i<SQUAD.GROUPS;++i)  //NOTE: L and T have to be set dynamically before drawing
			PositionButtons[i].Set(this.Interface.PrimeScape, { W: 28, H: 14, LW: 2, LABEL: PositionGroups[i] }, this.TextWriter);

		ButtonCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], SHALLOwBUTTOnCORNErIMAGEs);  //TODO: BUTTOnCORNErIMAGEs is REDUNDANT
		ShallowCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], SHALLOwBUTTOnCORNErIMAGEs);
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);

		//Options
		RadioOptionImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RADIoCONTROlIMAGE);
		GameRadioOptions.Set(this.Interface.Console, GAMeRADIoOPTIONs, RadioOptionImage);
		GameRadioOptions.SetLinks(null, this.TextWriter);
		BudgetRadioOptions.Set(this.Interface.Console, BUDGEtRADIoOPTIONs, RadioOptionImage);
		BudgetRadioOptions.SetLinks(null, this.TextWriter);
		CheckBoxImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);

		//Icon panels
		IconCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ICOnCORNErIMAGEs);

		//Info
		LeagueDataArea.Set("LeagueTextArea");
		SquadDataArea.Set("SquadTextArea");
		YouthDataArea.Set("YouthTextArea");
		ExtraDataArea.Set("ExtraTextArea");

		this.SetFormationControls();
	},
	CreateImageMaps() {

		//UNLOGGED

		TestingImage = new GenieImageMap();
	},
	SetImageMaps() {

		//UNLOGGED

		TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);
	},
	CreateImages() {

		PitchImage = new GenieImage();
		RotatingBallImage = new GenieImage();
		AcronymImages = new GenieImage();
		TypeSymbolImages = new GenieImage();
		DesignationSymbolImages = new GenieImage();
		ArrowImages = new GenieImage();

		this.CreateFootballerImages();

		SmallLetterImages = new GenieImage();
		MediumLetterImages = new GenieImage();
		PlusImage = new GenieImage();
		MinusImage = new GenieImage();

		InjuredImage = new GenieImage();

		FeeDigitImages = new GenieImage();				//TODO: move to TransferView
		FeeDisplayImage = new GenieImage();				//TODO: move to TransferView
	},
	SetImages() {

		PitchImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.PITCH], PITChIMAGE);
		RotatingBallImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.CONTROLS], ROTATINgBALlIMAGE);
		AcronymImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], ACRONYmIMAGEs);
		TypeSymbolImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], TYPeSYMBOlIMAGEs);
		DesignationSymbolImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], DESIGNATIOnSYMBOlIMAGEs);
		ArrowImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], ARROwIMAGEs);

		this.SetFootballerImages();

		SmallLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], SMALlLETTErIMAGEs);
		MediumLetterImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], MEDIUmLETTErIMAGEs);
		PlusImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], PLUsIMAGE);
		MinusImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], MINUsIMAGE);

		InjuredImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], INJUREdIMAGE);

		FeeDigitImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], FEeDIGItIMAGEs);
		FeeDisplayImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], FEeDISPLAyIMAGE);
	},
	CreateSprites() {

		//REDUNDANT
		BlueFootballerSprite = new GenieSprite();
		RedFootballerSprite = new GenieSprite();
		BlueSideOnSprite = new AnimatedSprite();
		RedSideOnSprite = new AnimatedSprite();

		//Outfield players
		FrontFootballerSprite = new AnimatedCompositeSprite();
		BackFootballerSprite = new AnimatedCompositeSprite();
		LeftFootballerSprite = new AnimatedCompositeSprite();
		RightFootballerSprite = new AnimatedCompositeSprite();

		//Keepers
		LeftKeeperSprite = new AnimatedCompositeSprite();
		RightKeeperSprite = new AnimatedCompositeSprite();

		this.CreateHairSprites();

		//Other
		GoalpostSprite = new GenieSprite();
		FootballSprite = new GeometricSprite();

		GoalSprite = new GenieSprite();
	},
	SetSprites() {

		//REDUNDANT
		BlueFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.OLdSPRITES], BLUeFOOTBALLErSPRITE);
		RedFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.OLdSPRITES], REdFOOTBALLErSPRITE);
		BlueSideOnSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.OLdSPRITES], BLUeSIDeOnSPRITE);
		RedSideOnSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.OLdSPRITES], REdSIDeOnSPRITE);

		//Outfield players
		FrontFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FRONtFOOTBALLErSPRITE, this.CalcPad);
		BackFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], BACkFOOTBALLErSPRITE, this.CalcPad);
		LeftFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtFOOTBALLErSPRITE, this.CalcPad);
		RightFootballerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtFOOTBALLErSPRITE, this.CalcPad);

		//Keepers
		LeftKeeperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtKEEPErSPRITE, this.CalcPad);
		RightKeeperSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtKEEPErSPRITE, this.CalcPad);

		this.SetHairSprites();

		//Other
		GoalpostSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GOALPOStSPRITE);
		FootballSprite.Set(this.Screen, FOOTBALlSPRITE, this.CalcPad);

		GoalSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.OLdSPRITES], GOAlSPRITE);
	},
	CreateAgents() {

		Football = new GenieAgent();
		HomeGoalkeeper = new FootballMatchKeeper();
		AwayGoalkeeper = new FootballMatchKeeper();
		HomeOutfieldPlayers = ArrayUtils.Create(PLAYERS.OUTFIELD, FootballMatchPlayer);
		AwayOutfieldPlayers = ArrayUtils.Create(PLAYERS.OUTFIELD, FootballMatchPlayer);
		HomePlayers = new AgentArray();
		AwayPlayers = new AgentArray();

		//**** NEW ****

		HomeTopDownPlayers = new AgentArray();
		AwayTopDownPlayers = new AgentArray();
		HomeSideViewPlayers = new AgentArray();
		AwaySideViewPlayers = new AgentArray();
		HomeIsometricPlayers = new AgentArray();
		AwayIsometricPlayers = new AgentArray();
	},
	SetAgents() {
		var i;

		//LOGGED

		var HomeSidePositions = [ { X: 140, Y: 205 },
										  { X: 405, Y: 100 },  { X: 372, Y: 160 }, { X: 338, Y: 235 }, { X: 305, Y: 325 },
										  { X: 750, Y: 60 },	{ X: 750, Y: 145 }, { X: 750, Y: 250 }, { X: 750, Y: 375 },
										  { X: 1135, Y: 160 }, { X: 1160, Y: 265 } ];
		var AwaySidePositions = ArrayUtils.Create(PLAYERS.OUTFIELD+1, Coordinate2D);
		for (i=0;i<AwaySidePositions.length;++i) {
			AwaySidePositions[i].X = SIDeVIEwFOOTBALlPITCH.WIDTH - (HomeSidePositions[i].X+RightFootballerSprite.Width);
			AwaySidePositions[i].Y = HomeSidePositions[i].Y;
		}

		Football.Set( { SPEED: 1.0 }, FootballSprite);
		HomeGoalkeeper.Set( { SPEED: 0.5 }, LeftKeeperSprite);	//TEMP for side-view
		HomeGoalkeeper.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer, Mapper);
		HomeGoalkeeper.SetPosition(HomeSidePositions[0]);
		HomeGoalkeeper.SetDirection(DIRECTION.E);
		AwayGoalkeeper.Set( { SPEED: 0.5 }, RightKeeperSprite);	//TEMP for side-view
		AwayGoalkeeper.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer, Mapper);
		AwayGoalkeeper.SetPosition(AwaySidePositions[0]);
		AwayGoalkeeper.SetDirection(DIRECTION.W);
/* REDUNDANT
		for (i=1;i<=PLAYERS.OUTFIELD;++i) {
	 HomeOutfieldPlayers[i-1].Set( { SPEED: 0.5 }, RedSideOnSprite);	//TEMP
	 HomeOutfieldPlayers[i-1].SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
	 HomeOutfieldPlayers[i-1].SetPosition(HomeSidePositions[i]);
	 HomeOutfieldPlayers[i-1].SetDirection(DIRECTION.E);
	 AwayOutfieldPlayers[i-1].Set( { SPEED: 0.5 }, BlueSideOnSprite);	//TEMP
	 AwayOutfieldPlayers[i-1].SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
	 AwayOutfieldPlayers[i-1].SetPosition(AwaySidePositions[i]);
	 AwayOutfieldPlayers[i-1].SetDirection(DIRECTION.W);
		}
*/
		//TODO: above will become REDUNDANT, below will be used instead
		HomePlayers.Set(10, FootballMatchPlayer, null, SIDeVIEwFOOTBALLER, LeftFootballerSprite);
		HomePlayers.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
		HomePlayers.forEach(function(plyr){plyr.Direction = DIRECTION.E;plyr.Home = true;});		//should be REDUNDANT
		AwayPlayers.Set(10, FootballMatchPlayer, null, SIDeVIEwFOOTBALLER, RightFootballerSprite);
		AwayPlayers.SetLinks(this.TextWriter, this.Randomizer, TransformBuffer);
		AwayPlayers.forEach(function(plyr){plyr.Direction = DIRECTION.W;plyr.Home = false;});		//should be REDUNDANT

		//**** NEW ****

//		HomeTopDownPlayers.Set();
//		AwayTopDownPlayers;
		HomeTopDownPlayers.Set(PLAYERS.OUTFIELD, TopDownFootballer, null, TOpDOWnFOOTBALLER, FrontFootballerSprite);
		AwayTopDownPlayers.Set(PLAYERS.OUTFIELD, TopDownFootballer, null, TOpDOWnFOOTBALLER, FrontFootballerSprite);
		this.SetSideViewPlayers();
//		this.CreateIsometricPlayers();
//		HomeIsometricPlayers
//		AwayIsometricPlayers;
	},
	CreateViews() {

		//UNLOGGED

		this.CreateLeagueViews();
		TeamView = new FootballTeamView();
		TeamInfoView = new FootballTeamInfoView();
		if (Game.CheckMobile())
			TeamConsoleView = new FootballTeamConsoleView();

		SquadView = new FootballSquadView();
		if (Game.CheckMobile())
			SquadConsoleView = new FootballSquadConsoleView();

		YouthView = new YouthTeamView();

		FormationSubView = new FootballFormationSubView();
		FormationInfoView = new FootballFormationInfoView();
		FormationConsoleView = new FootballFormationConsoleView();

		FixturesSubView = new FootballFixturesSubView();
		FixturesInfoView = new FootballFixturesInfoView();

		OpponentSubView = new FootballOpponentSubView();
		if (Game.CheckMobile())
			OpponentInfoView = new FootballOpponentInfoView();
	
		MatchSideView = new FootballMatchSideView();

		TableSubView = new FootballTableSubView();
		TableConsoleView = new FootballTableConsoleView();

		TransferSubView = new FootballTransferSubView();
		TransferConsoleView = new FootballTransferConsoleView();

		TacticsSubView = new FootballTacticsSubView();
		TrainingSubView = new FootballTrainingSubView();
		StatsSubView = new FootballStatsSubView();
	},
	SetViews() {

		//UNLOGGED

		this.SetLeagueViews();
		this.SetTeamViews();
		this.SetSquadViews();
		this.SetFormationViews();
		this.SetTransferViews();
		this.SetOpponentViews();
		this.SetFixturesViews();
		this.SetHighlightsViews();
		this.SetTableViews();

		YouthView.Set(this.Screen, this.GraphicsTool, this.TextWriter);
		MatchSideView.Set(this.Screen, this.GraphicsTool, this.Randomizer);

		TacticsSubView.Set(this.Interface.PrimeScape, VIEW.TACTICS, TeamView);
		TrainingSubView.Set(this.Interface.PrimeScape, VIEW.TRAINING, TeamView);
		StatsSubView.Set(this.Interface.PrimeScape, VIEW.STATS, TeamView);
	}
};
