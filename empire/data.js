
//---------------------------------------
//---------- BITMAPS --------------------

var Images = [
	"Sprites.png",
	"Images.png",
	"Controls.png",
	"Testing.png",
	"Demo.png",
	"Tutorial.png",
	"MiniGames.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png"
];
var IMAGeINDEX = {
	SPRITES:			0,
	IMAGES:			1,
	CONTROLS:		2,
	TESTING:			3,
	DEMO:				4,
	TUTORIAL:		5,
	MINiGAMES:		6,
	GENIeIMAGES:	7,
	GENIeCONTROLS:	8
};

//----------------------------------------
//---------- CONTROLS --------------------

var Controls = [
	["StartButton",		 "820px", "575px"],
	["LoadButton",			 "880px", "575px"],
	["SaveButton",			 "940px", "575px"],
	["TestButton",			"1000px", "575px"],
	["ExpandButton", 		 "820px", "605px"],
	["FullScreenButton",	 "900px", "605px"]
];
var CONTROLS = {
	STARtBUTTON:		0,
	LOAdBUTTON:			1,
	SAVeBUTTON:			2,
	TEStBUTTON:			3,
	EXPANdBUTTON:		4,
	FULlSCREEnBUTTON: 5
};
var EVENT = {
	STARtBUTTOnCLICKED:		 0,
	LOAdBUTTOnCLICKED:		 1,
	SAVeBUTTOnCLICKED:		 2,
	TEStBUTTOnCLICKED:		 3,
	EXPANdBUTTOnCLICKED:		 4,
	FULlSCREEnBUTTOnCLICKED: 5
};

//-------------------------------------
//---------- SOUNDS -------------------

//----------------------------------------
//---------- CORE DATA -------------------

var SCREEN = { WIDTH: 800, HEIGHT: 600, MOBILE: { W: 400, H: 300 } };
var INFoBOX = { WIDTH: 240, HEIGHT: 320, MOBILE: { W: 240, H: 320 } };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 240, MOBILE: { W: 156, H: 320 } };

//----------------------------------------
//---------- GAME DATA -------------------

var SATRAPY = { ASSYRIA: 0, LYDIA: 1, SCYTHIA: 2, BACTRIA: 3, CILICIA: 4, GEDROSIA: 5, CARMANIA: 6, BABYLONIA: 7, GANDHARA: 8, KEMET: 9,
					 COUNT: 10 };
var SatrapyNames = [ "Assyria", "Lydia", "Scythia", "Bactria", "Cilicia", "Gedrosia", "Carmania", "Babylonia", "Gandhara", "Kemet" ];
var Cities = [ [ "Assur", "Nimrud", "Nineveh", "Harran", "Arbela", "Arrapkha", "Tilbarsip", "Carchemish", "Sabata", "Sittace" ],				//Assyria
					[ "Sardis", "Silandus", "Tripolis", "Antiochia", "Charax", "Gordus", "Heraclea", "Hyrcanis", "Larisa", "Nais" ],				//Lydia
					[ "Neapolis", "Kamenskoe", "Bilsk", "Kubana", "Pontica", "Sarmatia", "Taurica", "Hylaia", "Sindica", "Alania" ],				//Scythia
					[ "Balkh", "Margiana", "Turan", "Cyreschata", "Jaxartes", "Sogdiana", "Drapsaka", "Aornos", "Traxiane", "Varvaliz" ],		//Bactria
					[ "Mallos", "Anchiale", "Illubri", "Tarsus", "Augusta", "Retjenu", "Kawa", "Pitura", "Lamos", "Ura" ],							//Cilicia
					[ "Pura", "Harappa", "Nausharo", "Chanhudaro", "Mehrgarh", "Kotbala", "Pathani", "Pirak", "Sokhta", "Sutkagan" ],				//Gedrosia
					[ "Susa", "Persepolis", "Jarun", "Anshan", "Kabnak", "Awan", "Mahan", "Shiragan", "Spahan", "Bam" ],								//Carmania
					[ "Uruk", "Lagash", "Nippur", "Sippar", "Ur", "Kish", "Larsa", "Opis", "Mari", "Isin" ],												//Babylonia
					[ "Taxila", "Pushkalavati", "Kapisa", "Hund", "Purusapura", "Sagala", "Jibin", "Chukhsa", "Aornos", "Oddiyana" ],				//Gandhara
					[ "Memphis", "Luxor", "Thebes", "Iunu", "Amarna", "Abydos", "Djanut", "Faiyum", "Thonis", "Nubt" ]									//Kemet
];
var BATTLeFIELD = { W: 800, H: 800, REGION: { C: 20, R: 20, W: 40, H: 30 }, REGIONS: { TOTAL: 400, CENTRAL: 240, CLEAR: { R: 4 } },
						  MOBILE: { W: 400, H: 400, REGION: { C: 10, R: 10, W: 40, H: 30 }, REGIONS: { TOTAL: 100, CENTRAL: 60, CLEAR: { R: 2 } } },
						  COLOUR: { LIGHT: "rgb(095,255,000)", MEDIUM: "rgb(091,191,000)", DARK: "rgb(063,127,000)" } };
var TERRAIN = { STEPPE: 0, LOwLAND: { DESERT: 1, FOREST: 2, HILLS: 3 }, PLAIN: { DESERT: 4, FOREST: 5, HILLS: 6 },
									UpLAND: { DESERT: 7, FOREST: 8, HILLS: 9 }, TYPES: 9, ELEVATION: { LOwLAND: 0, PLAIN: 1, UpLAND: 2 },
					 GRASS: { DARK: GREEN.FIVE, MEDIUM: GREEN.THREE, LIGHT: GREEN.ONE },
					 SAND: { DARK: BROWN.THREE, MEDIUM: BROWN.TWO, LIGHT: BROWN.ONE },
					 REGIONS: 9
};
var Terrains = [ "Steppe", "Low Desert", "Low Forest", "Dunes",
									"Desert Plain", "Forrested Plain", "Hills",
									"High Desert", "Forrested Highlands", "Mountains"
];
var ARMY = { COMMAND: { REGIMENTS: 40, MOBILE: { REGIMENTS: 20 } },
				 REGIMENT: { BATTALIONS: 10, SOLDIERS: 1000 },
				 BATTALION: { SQUADS: 10, SOLDIERS: 100 },
				 SQUAD: { SOLDIERS: 10 } };
var ENGAGMENT = { DIVISIONS: { MIN: 20, MAX: 80 } };
var IMPERIAlUNIT = { ARCHER: 0, LONgBOwMAN: 1, HORSeARCHER: 2,
							AXeMAN: 3, SWORDsMAN: 4, PIKeMAN: 5,
							MACeMAN: 6, CATAPHRACT: 7, KNIGHT: 8,
							IMMORTAL: 9, TYPES: 10 };
var SatrapyColours = [ [ "rgb(095,031,159)", "rgb(159,127,223)" ],		//purple
							  [ "rgb(047,079,159)", "rgb(127,127,127)" ],		//indigo
							  [ "rgb(031,159,191)", "rgb(095,223,255)" ],		//aqua
							  [ "rgb(111,159,111)", "rgb(207,223,047)" ],		//olive
							  [ "rgb(207,159,000)", "rgb(255,255,063)" ],		//gold
							  [ "rgb(175,063,255)", "rgb(207,159,255)" ],		//magenta
							  [ "rgb(255,095,255)", "rgb(255,207,223)" ],		//pink
							  [ "rgb(095,127,159)", "rgb(143,175,239)" ],		//livid
							  [ "rgb(000,159,127)", "rgb(000,223,175)" ]			//emerald
];
var PENNANT = { X: 2, Y: -27, LETTER: { X: 4, Y: -31 }, NUMBER: { X: 4, Y: -16, O: 7 } };

//---------------------------------------
//---------- CONTROLS -------------------

//------------------------------------------
//---------- IMAGE MAPS --------------------

//Testing
var TEST = { ONE: 0, TWO: 1 };
var TESTINgIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 58, H: 72 }, { L: 1, T: 74, W: 58, H: 71 } ];
var TestingDescriptions = [ [ "Test One" ], [ "Test Two" ]
			  ];
//Demo
var DEMO = { ONE: 0, TWO: 1 };
var DEMoIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var DemoMap = [ { L: 1, T: 1, W: 58, H: 72 }, { L: 1, T: 74, W: 58, H: 71 } ];
var DemoDescriptions = [ [ "Demo One" ], [ "Demo Two" ]
			  ];
//Tutorial
var TUTORIAL = { GENERAL: 0, TWO: 1 };
var TUTORIAlIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var TutorialMap = [ { L: 1, T: 1, W: 58, H: 72 }, { L: 1, T: 74, W: 58, H: 71 } ];
var TutorialDescriptions = [ [ "General" ], [ "Tutorial Two" ]
			  ];
//Mini Games
var MINiGAME = { ONE: 0, TWO: 1 };
var MINiGAMEsIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var MiniGamesMap = [ { L: 1, T: 1, W: 58, H: 72 }, { L: 1, T: 74, W: 58, H: 71 } ];
var MiniGameDescriptions = [ [ "Mini Game One" ], [ "Mini Game Two" ]
];

//--------------------------------------
//---------- IMAGES --------------------

//--------------------------------------
//---------- SPRITES -------------------

var HILlSPRITE = { L: 1, T: 1, W: 13, H: 11, C: 3, R: 3, O: 2 };
var TREeSPRITE = { L: 1, T: 40, W: 13, H: 22, O: 2 };
var PENNANtSPRITE = { L: 1, T: 64, W: 28, H: 45, O: 2 };
var PENNANTsSPRITE = { L: 146, T: 29, W: 25, H: 17, C: 2, R: 5, O: 2 };
var LETTErSPRITE = { L: 47, T: 30, W: 9, H: 8, C: 9, R: 10, O: 2 };
var DIGITsSPRITE = { L: 1, T: 130, W: 6, H: 8, C: 10, R: 1, O: 2 };

//---------------------------------
//---------- FX -------------------
