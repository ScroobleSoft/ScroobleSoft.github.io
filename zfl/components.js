
//--------------------------------------
//---------- OBJECTS -------------------

var ZFLScape, ZFLGraphics, ZFLCalcPad, ZFLText, ZFLRandomizer, Controller;				//library
var League, Teams, PlayerTeam;																		//teams
var Draft, DraftPreview, FreeAgency;																//players
var SideViewField;
var Intro, Demo, Tutorial, MiniGames;																//sim
var Testing, GridironUtils;																			//tools

var SideViewGame;  //TEMP

//-----------------------------------
//---------- DATA -------------------

const Milliseconds = -1;

var FeaturedIndex, DailyIndex, WeeklyIndex;
var LastNames;
var RouteVelocities;
var SubPositions, DimensionalPositions, DimensionalMapping, PositionDistribution;
var DraftValueDistribution, DraftBatchDistribution, RosterGradeDistribution;

//---------------------------------------
//---------- CONTROLS -------------------

var NewGameButton, TutorialButton, DemoButton, MiniGamesButton;									//standard
var IconCornersImage, ShallowCornerImages, RaisedCornerImages, RoundedCornerImages,			//images
	 RadioOptionImage, CheckBoxImage, DropListButtonImage;

var LeagueTouchBar, PositionTouchBar;

//Draft preview
var DraftPreviewButton, PreviewOptions, PreviewAlternates;

var LeagueDataArea, RosterDataArea, FADataArea;		//Info

//-------------------------------------
//---------- IMAGES -------------------

var DemoImage, TutorialImage, MiniGamesImage, TestingImage;			//Image Maps
var DraftGradeImages, GradeMarksImages, TypeSymbolImages;

//--------------------------------------
//---------- SPRITES -------------------

var LeftSideHelmetSprite, RightSideHelmetSprite, FrontHelmetSprite, ReverseHelmetSprite;
var FaceComplexionSprite, HandSprite, DownwardHandSprite;
var GridderSideSprite, GridderFrontSprite;
var ArmSprite, RightBentArmSprite, LefBentArmSprite, RightBackArmSprite, LeftBackArmSprite;
var SideArmSprite, RightCrookedArmSprite, LeftCrookedArmSprite, HorizontalArmSprite, DiagonalRightArmSprite, DiagonalLeftArmSprite;
var RightFrontLegSprite, LeftFrontLegSprite, RightBackLegSprite, LeftBackLegSprite, RightBentLegSprite, LeftBentLegSprite;
var LeftLeggingSprite, RightLeggingSprite, LeftSleeveSprite, RightSleeveSprite, LeftElbowSprite, RightElbowSprite;
var VerticalFootballSprite, HorizontalFootballSprite;
var LetterSprite, RouteMarkerSprite;
var LeftGridderSprite, RightGridderSprite, LeftOLSprite, RightOLSprite;

//-------------------------------------
//---------- AGENTS -------------------

var HomeSideViewQB, HomeSideViewRBs, HomeSideViewWRs, HomeSideViewTEs, HomeSideViewOLs;
var HomeSideViewDEs, HomeSideViewDTs, HomeSideViewLBs, HomeSideViewSs, HomeSideViewCBs;
var VisitorSideViewQB, VisitorSideViewRBs, VisitorSideViewWRs, VisitorSideViewTEs, VisitorSideViewOLs;
var VisitorSideViewDEs, VisitorSideViewDTs, VisitorSideViewLBs, VisitorSideViewSs, VisitorSideViewCBs;

//---------------------------------
//---------- FX -------------------

//-------------------------------------
//---------- SOUNDS -------------------

//-------------------------------------
//---------- VIEWS -------------------

var LeagueView, LeagueInfoView, LeagueConsoleView;
var TeamView, TeamInfoView, TeamConsoleView;
var RosterNestedView, TradeConsoleView, GridderNestedView, PracticeSquadNestedView, RetirementDialogView;
var FreeAgencyView, PendingFreeAgentsView;
var DraftView, TradeUpOptionView, TradeDownOptionView, ProjectDialogView, CampDialogView;

//--------------------------------------------------
//---------- GRIDIRON COMPONENTS -------------------
var GridironComponents = function() {
	var Interface;
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool, CalcPad, TextWriter;
	var Randomizer;
	var Controller;
};
GridironComponents.prototype = {
	Set(intrfc, gTool, cPad, tWriter, rGenerator, sRect, cntrllr) {
		this.Interface = intrfc;
		this.Screen = this.Interface.PrimeScape.Context;
		this.InfoBox = this.Interface.ZoomScape.Context;
		this.ControlPanel = this.Interface.Console.Context;
		this.GraphicsTool = gTool;
		this.CalcPad = cPad;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;
		this.ScreenRect = sRect;
		this.Controller = cntrllr;

		this.SetData();

		this.CreateCoreObjects();
		this.CreateSimObjects();
		this.CreateTools();
		this.CreateControls();
		this.CreateImageMaps();
		this.CreateImages();
		this.CreateViews();
		this.CreateSprites();
		this.CreateAgents();
		this.CreateSounds();

		this.SetCoreObjects();
		this.SetSimObjects();
		this.SetTools();
		this.SetControls();
		this.SetImageMaps();
		this.SetImages();
		this.SetViews();
		this.SetSprites();
		this.SetAgents();
		this.SetSounds();
	},
	SetData() {

		//UNLOGGED

		LastNames = [ QBNames, RBNames, WRNames, TENames, OLNames, DENames, DTNames, LBNames, SNames, CBNames ];

		RouteVelocities = [ [ [1,-0.5],[ 1,0],[ 1, 0.5],[0,-0.5],[0, 0.5]	],
								  [ [-1,0.5],[-1,0],[-1,-0.5],[0, 0.5],[0,-0.5] ]  ];

		SubPositionTypes = [ POSITION.QBs, POSITION.RBs, POSITION.WRs, POSITION.TEs, POSITION.OLs,
				POSITION.DEs, POSITION.DTs, POSITION.LBs, POSITION.Ss,  POSITION.CBs  ];			//NOTE: excludes Dimensionals
		DimensionalPositions = [ POSITION.GQB, POSITION.SB, POSITION.DR, POSITION.RG, POSITION.ER, POSITION.MG, POSITION.BLB, POSITION.ES ];
		DimensionalMapping = [ POSITION.QB, POSITION.RB, POSITION.WR, POSITION.OL, POSITION.DE, POSITION.DT, POSITION.LB, POSITION.S ];
		PositionDistribution = [ ROSTER.QBs, ROSTER.RBs, ROSTER.WRs, ROSTER.TEs, ROSTER.OLs, ROSTER.DEs, ROSTER.DTs, ROSTER.LBs, ROSTER.Ss, ROSTER.CBs ];  //for draft
		PositionsSwitches = [ [1,8],[0,9],[0,3],[2,4],[3,6],[6,7],[4,5],[1,5],[7,9],[2,8] ];
		RosterGradeDistribution = [ 1,2,3,4,5 ];
		DraftValueDistribution = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15 ];
		DraftBatchDistribution = [ DRAFT.NORMALS, DRAFT.FRINGES, DRAFT.ALTERNATES, DRAFT.DIMENSIONALS ];
	},
	CreateCoreObjects() {

		//UNLOGGED

		League = new GridironLeague();
		Teams = new GenieArray();
		Draft = new GridironDraft();
		FreeAgency = new GridironFreeAgency();
		SideViewField = new GridironSideViewField();
	},
	SetCoreObjects() {

		//UNLOGGED

		League.Set(this.Randomizer);
		Teams.Set(TEAM.COUNT, GridironTeam, INDEXED, this.Randomizer);
		Draft.Set(this.Randomizer);
		FreeAgency.Set();

		SideViewField.Set(this.Screen, this.GraphicsTool, this.TextWriter);
	},
	CreateSimObjects() {

		//UNLOGGED

		Intro = new GridironIntro();
//		Demo = new GridironDemo();
//		Tutorial = new GridironTutorial();
//		MiniGames = new GridironMiniGames();
	},
	SetSimObjects() {

		//UNLOGGED

		Intro.Set(this.Interface, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
//		Demo.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
//		Tutorial.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
//		MiniGames.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
	},
	CreateTools() {

		//UNLOGGED

		Testing = new ZFLTesting();
		GridironUtils = new GridironUtilities();
	},
	SetTools() {

		//UNLOGGED

		Testing.Set(this.Screen, this.InfoBox, this.ControlPanel, this.GraphicsTool, this.TextWriter, this.Randomizer, this.ScreenRect);
		GridironUtils.Set(this.Randomizer);
	},
	CreateControls() {

		//UNLOGGED

		//Standard buttons
		NewGameButton = new ImageButton();
		TutorialButton = new ImageButton();
		DemoButton = new ImageButton();
		MiniGamesButton = new ImageButton();

		//Images
		IconCornersImage = new GenieImage();
		ShallowCornerImages = new GenieImage();
		RaisedCornerImages = new GenieImage();
		RoundedCornerImages = new GenieImage();
		RadioOptionImage = new GenieImage();
		CheckBoxImage = new GenieImage();
		DropListButtonImage = new GenieImage();

		PositionTouchBar = new GenieTouchBar();

		DraftPreviewButton = new TextButton();

		//Info
		LeagueDataArea = new GenieTextArea();
		RosterDataArea = new GenieTextArea();
		FADataArea = new GenieTextArea();
	},
	SetControls() {

		//UNLOGGED

		//Standard buttons
		NewGameButton.Set(this.Interface.ZoomScape, NEwGAMeBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		TutorialButton.Set(this.Interface.ZoomScape, TUTORIAlBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		DemoButton.Set(this.Interface.ZoomScape, DEMoBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);
		MiniGamesButton.Set(this.Interface.ZoomScape, MINiGAMEsBUTTOnIMAGE, ImageManager.Pics[IMAGeINDEX.GENIeIMAGES]);

		//Images
		IconCornersImage.Set(this.InfoBox, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ICOnCORNErIMAGEs);
		ShallowCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], SHALLOwBUTTOnCORNErIMAGEs);
		RaisedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RAISEdBUTTOnCORNErIMAGEs);
		RoundedCornerImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], ROUNDEdBUTTOnCORNErIMAGEs);
		RadioOptionImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], RADIoCONTROlIMAGE);
		CheckBoxImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], CHECkBOxIMAGE);
		DropListButtonImage.Set(this.ControlPanel, ImageManager.Pics[IMAGeINDEX.GENIeCONTROLS], DROpLIStBUTTOnIMAGE);

		PositionTouchBar.Set(this.Interface.Console, POSITIOnTOUChBAR, POSITIOnBArIMAGE);

		DraftPreviewButton.Set(this.Interface.Console, DRAFtPREVIEwBUTTON);
		DraftPreviewButton.SetLinks(null, this.TextWriter);

		//Text areas
		LeagueDataArea.Set("LeagueTextArea");
		RosterDataArea.Set("RosterTextArea");
		FADataArea.Set("FreeAgentTextArea");
	},
	CreateImageMaps() {

		//UNLOGGED

		DemoImage = new GenieImageMap();
		TutorialImage = new GenieImageMap();
		MiniGamesImage = new GenieImageMap();
		TestingImage = new GenieImageMap();
	},
	SetImageMaps() {

		//UNLOGGED

		DemoImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.DEMO], DEMoIMAGE, DemoMap);
		TutorialImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TUTORIAL], TUTORIAlIMAGE, TutorialMap);
		MiniGamesImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.MINiGAMES], MINiGAMEsIMAGE, MiniGamesMap);
		TestingImage.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.TESTING], TESTINgIMAGE, TestingMap);
	},
	CreateImages() {

		//UNLOGGED

		DraftGradeImages = new GenieImage();
		GradeMarksImages = new GenieImage();
		TypeSymbolImages = new GenieImage();
	},
	SetImages() {

		//UNLOGGED

		DraftGradeImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], DRAFtGRADeIMAGES);
		GradeMarksImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], GRADeMARKsIMAGES);
		TypeSymbolImages.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.IMAGES], TYPeSYMBOlIMAGES);
	},
	CreateSprites() {

		//UNLOGGED

		//Helmet
		LeftSideHelmetSprite = new AnimatedSprite();
		RightSideHelmetSprite = new AnimatedSprite();
		FrontHelmetSprite = new AnimatedSprite();
		ReverseHelmetSprite = new AnimatedSprite();

		//Skin
		HandSprite = new AnimatedSprite();
		DownwardHandSprite = new AnimatedSprite();
		FaceComplexionSprite = new AnimatedSprite();

		//Body
		GridderSideSprite = new CompositeSprite();
		GridderFrontSprite = new CompositeSprite();

		//Arm
		ArmSprite = new AnimatedCompositeSprite();
		RightBentArmSprite = new CompositeSprite();
		LefBentArmSprite = new CompositeSprite();
		RightBackArmSprite = new CompositeSprite();
		LeftBackArmSprite = new CompositeSprite();
		SideArmSprite = new AnimatedCompositeSprite();
		RightCrookedArmSprite = new GenieSprite();
		LeftCrookedArmSprite = new GenieSprite();
		HorizontalArmSprite = new AnimatedCompositeSprite();
		DiagonalRightArmSprite = new GenieSprite();
		DiagonalLeftArmSprite = new GenieSprite();

		//Leg
		RightFrontLegSprite = new CompositeSprite();
		LeftFrontLegSprite = new CompositeSprite();
		RightBackLegSprite = new CompositeSprite();
		LeftBackLegSprite = new CompositeSprite();
		RightBentLegSprite = new CompositeSprite();
		LeftBentLegSprite = new CompositeSprite();

		//Ball
		VerticalFootballSprite = new GeometricSprite();
		HorizontalFootballSprite = new GeometricSprite();

		//Clothing
		LeftLeggingSprite = new AnimatedSprite();
		RightLeggingSprite = new AnimatedSprite();
		LeftSleeveSprite = new AnimatedSprite();
		RightSleeveSprite = new AnimatedSprite();
		LeftElbowSprite = new AnimatedSprite();
		RightElbowSprite = new AnimatedSprite();

		//Misc
		LetterSprite = new AnimatedSprite();
		RouteMarkerSprite = new AnimatedSprite();

		//TEMP
		LeftGridderSprite = new AnimatedSprite();
		RightGridderSprite = new AnimatedSprite();
		LeftOLSprite = new GenieSprite();
		RightOLSprite = new GenieSprite();
	},
	SetSprites() {

		//UNLOGGED

		//Helmet
		LeftSideHelmetSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtSIDeHELMEtSPRITE);
		RightSideHelmetSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtSIDeHELMEtSPRITE);
		FrontHelmetSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FRONtHELMEtSPRITE);
		ReverseHelmetSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], REVERSeHELMEtSPRITE);

		//Skin
		FaceComplexionSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], FACeCOMPLEXIOnSPRITE);
		HandSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HANdSPRITE);
		DownwardHandSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DOWNWARdHANdSPRITE);

		//Body
		GridderSideSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GRIDDErSIDeSPRITE, this.GraphicsTool);
		GridderFrontSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], GRIDDErFRONtSPRITE, this.GraphicsTool);

		//Arm
		ArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ARmSPRITE, this.GraphicsTool);
		RightBentArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBENtARmSPRITE, this.GraphicsTool);
		LefBentArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBENtARmSPRITE, this.GraphicsTool);
		RightBackArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBACkARmSPRITE, this.GraphicsTool);
		LeftBackArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBACkARmSPRITE, this.GraphicsTool);
		SideArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], SIDeARmSPRITE, this.GraphicsTool);
		RightCrookedArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtCROOKEdARmSPRITE);
		LeftCrookedArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtCROOKEdARmSPRITE);
		HorizontalArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], HORIZONTAlARmSPRITE, this.GraphicsTool);
		DiagonalRightArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DIAGONAlRIGHtARmSPRITE);
		DiagonalLeftArmSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], DIAGONAlLEFtARmSPRITE);

		//Leg
		RightFrontLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtFRONtLEgSPRITE, this.GraphicsTool);
		LeftFrontLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtFRONtLEgSPRITE, this.GraphicsTool);
		RightBackLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBACkLEgSPRITE, this.GraphicsTool);
		LeftBackLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBACkLEgSPRITE, this.GraphicsTool);
		RightBentLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtBENtLEgSPRITE, this.GraphicsTool);
		LeftBentLegSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtBENtLEgSPRITE, this.GraphicsTool);

		//Clothing
		LeftLeggingSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtLEGGINgSPRITE);
		RightLeggingSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtLEGGINgSPRITE);
		LeftSleeveSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtSLEEVeSPRITE);
		RightSleeveSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtSLEEVeSPRITE);
		LeftElbowSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LEFtELBOwSPRITE);
		RightElbowSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], RIGHtELBOwSPRITE);

		//Ball
		VerticalFootballSprite.Set(this.Screen, VERTICAlFOOTBALlSPRITE, this.GraphicsTool);
		HorizontalFootballSprite.Set(this.Screen, HORIZONTAlFOOTBALlSPRITE, this.GraphicsTool);

		//Misc
		LetterSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], LETTErSPRITE);
		RouteMarkerSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SPRITES], ROUTeMARKErSPRITE);

		//TEMP
		LeftGridderSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 1, W: 24, H: 38, C: 11, R: 2, O: 2 } );
		RightGridderSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 287, T: 1, W: 24, H: 38, C: 11, R: 2, O: 2 } );
		LeftOLSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 1, T: 88, W: 32, H: 27 } );
		RightOLSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 35, T: 88, W: 32, H: 27 } );
	},
	CreateAgents() {

		//UNLOGGED

		this.CreateHomeGridders();
		this.CreateVisitorGridders();
	},
	SetAgents() {

		//UNLOGGED

		this.SetHomeGridders();
		this.SetVisitorGridders();
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

		LeagueView = new GridironLeagueView();
		LeagueInfoView = new GridironLeagueInfoView();
		LeagueConsoleView = new GridironLeagueConsoleView();

		TeamView = new GridironTeamView();
		TeamInfoView = new GridironTeamInfoView();
		TeamConsoleView = new GridironTeamConsoleView();

		//Gridder
		RosterNestedView = new GridironRosterNestedView();
		TradeConsoleView = new GridironTradeConsoleView();
		GridderNestedView = new ZFLGridderInfoView();
		PracticeSquadNestedView = new GridironPracticeSquadConsoleView();
		RetirementDialogView = new GridironRetirementDialogView();

		//FAs
		PendingFAsView = new PendingFreeAgentsView();
		FreeAgencyView = new GridironFreeAgencyView();

		//Draft
		DraftPreview = new GridironDraftPreview();
		DraftView = new GridironDraftView();
		DraftInfoView = new GridironDraftInfoView();
		DraftConsoleView = new GridironDraftConsoleView();
		TradeUpOptionView = new GridironTradeUpOptionView();
		TradeDownOptionView = new GridironTradeDownOptionView();
		ProjectDialogView = new GridironProjectsDialogView();
		CampDialogView = new TrainingCampDialogView();

		//TEMP
		SideViewGame = new ZFLGameSideView();
	},
	SetViews() {

		//UNLOGGED

		//League
		LeagueView.Set(this.Interface.PrimeScape, VIEW.LEAGUE, this.GraphicsTool, this.TextWriter, this.Randomizer);
		LeagueInfoView.Set(this.Interface.ZoomScape, VIEW.LEAGUE.INFO, LeagueView, this.TextWriter);
		LeagueConsoleView.Set(this.Interface.Console, VIEW.LEAGUE.CONSOLE, LeagueView, this.GraphicsTool, this.TextWriter, this.Randomizer);
		LeagueView.SetSubViews(LeagueInfoView, LeagueConsoleView);

		//Team
		TeamView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
		TeamView.Set(this.Interface.PrimeScape, VIEW.TEAM);
		TeamInfoView.Set(this.Interface.ZoomScape, VIEW.TEAM.INFO, TeamView, this.GraphicsTool);
		TeamConsoleView.Set(this.Interface.Console, VIEW.TEAM.CONSOLE, TeamView);
		TeamView.SetSubViews(TeamInfoView, TeamConsoleView);

		//Roster
		RosterNestedView.SetLinks(this.GraphicsTool, this.TextWriter);
		RosterNestedView.Set(this.Interface.PrimeScape, VIEW.ROSTER, TeamView);
		TradeConsoleView.SetLinks(null, this.TextWriter);
		TradeConsoleView.Set(this.Interface.Console, VIEW.ROSTER.TRADE, TeamView);
		GridderNestedView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
		GridderNestedView.Set(this.Interface.ZoomScape, VIEW.GRIDDER, TeamInfoView);
		PracticeSquadNestedView.Set(this.Interface.Console, VIEW.SQUAD, TeamConsoleView);
		PracticeSquadNestedView.SetLinks(null, this.TextWriter);
		RetirementDialogView.SetLinks(this.GraphicsTool, this.TextWriter);
		RetirementDialogView.Set(this.Interface.PrimeScape, VIEW.RETIREMENT, TeamView);

		//FAs
		PendingFAsView.Set(this.Interface.PrimeScape, VIEW.PENDING, this.GraphicsTool, this.TextWriter);
		PendingFAsView.SetSubScapes(null, this.Interface.Console);
		FreeAgencyView.Set(this.Interface.PrimeScape, VIEW.FREeAGENCY, this.GraphicsTool, this.TextWriter);
		FreeAgencyView.SetSubScapes(null, this.Interface.Console);
		FreeAgencyView.SetFreeAgency(FreeAgency);

		//Draft
		DraftPreview.Set(this.Interface.PrimeScape, VIEW.DRAFT.PREVIEW, this.GraphicsTool, this.TextWriter);
		DraftPreview.SetSubScapes(null, this.Interface.Console);
//		DraftPreview.SetSubViews(DraftInfoView, DraftConsoleView);
		DraftView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
		DraftView.Set(this.Interface.PrimeScape, VIEW.DRAFT);
		DraftInfoView.Set(this.Interface.ZoomScape, VIEW.DRAFT.INFO, DraftView);
		DraftInfoView.SetLinks(null, this.TextWriter);
		DraftConsoleView.SetLinks(this.GraphicsTool, this.TextWriter);
		DraftConsoleView.Set(this.Interface.Console, VIEW.DRAFT.CONSOLE, DraftView);
		TradeUpOptionView.SetLinks(null, this.TextWriter);
		TradeUpOptionView.Set(this.Interface.PrimeScape, VIEW.DRAFT.TRADeUP, DraftView);
		TradeDownOptionView.SetLinks(null, this.TextWriter);
		TradeDownOptionView.Set(this.Interface.PrimeScape, VIEW.DRAFT.TRADeDOWN, DraftView);
		DraftView.SetSubViews(DraftInfoView, DraftConsoleView);
		DraftView.SetDraft(Draft);
		ProjectDialogView.SetLinks(this.GraphicsTool, this.TextWriter);
		ProjectDialogView.Set(this.Interface.PrimeScape, VIEW.DRAFT.PROJECTS, DraftView);
		CampDialogView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
		CampDialogView.Set(this.Interface.PrimeScape, VIEW.DRAFT.CAMP, DraftView);

		//TEMP
		SideViewGame.Set(this.Screen, this.InfoBox, this.GraphicsTool, this.TextWriter, this.Randomizer);
	}
};
