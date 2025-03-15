
//---------------------------------------
//---------- BITMAPS --------------------

var FootieImages = [
	"pitch.png",
	"logos.png",
	"FootballSprites.png",
	"FootballImages.png",
	"FootballControls.png",
	"MobileControls.png",
	"../library/GenieControls.png",
	"Testing.png",
	"FootballDemo.png",
	"FootballTutorial.png",
	"MiniGames.png",
	"../library/GenieImages.png",
	"scratch.png",
	"OldSprites.png"
];
var IMAGeINDEX = {
	PITCH:			0,
	TEAmLOGOS:		1,
	SPRITES:			2,
	IMAGES:			3,
	CONTROLS:		4,
	MOBILE:			5,
	GENIeCONTROLS:	6,
	TESTING:			7,
	DEMO:				8,
	TUTORIAL:		9,
	MINiGAMES:		10,
	GENIeIMAGES:	11,
	SCRATCH:			12,
	OLdSPRITES:		13
};

//---------------------------------------------
//---------- HTML CONTROLS --------------------

var FootieControls = [
	["StartButton",	 "815px", "615px"],
	["LoadButton",		 "865px", "615px"],
	["SaveButton",		 "915px", "615px"],
	["TestButton",		 "965px", "615px"],
	["LeagueTextArea", "1020px",  "10px"],
	["SquadTextArea",  "1020px", "160px"],
	["YouthTextArea",  "1020px", "310px"],
	["ExtraTextArea",  "1020px", "460px"]
];
var CONTROLS = {
	STARtBUTTON:		0,
	LOAdBUTTON:		1,
	SAVeBUTTON:		2,
	TEStBUTTON:		3,
	LEAGUeTEXtAREA: 4,
	SQUAdTEXtAREA:  5,
	YOUThTEXtAREA:  6,
	EXTRaTEXtAREA:  7
};
var EVENT = {
	STARtBUTTOnCLICKED: 0,
	LOAdBUTTOnCLICKED:  1,
	SAVeBUTTOnCLICKED:  2,
	TEStBUTTOnCLICKED:  3
};

//----------------------------------
//--------- GAME -------------------

var FOOTBALL = { SEEDS: { FEATURED: { A: 2100114973, B: 782639988 }, DAILY: { A: 449308668, B: 1777126055 }, WEEKLY: { A: 489690561, B: 1447373687 } },
					  TYPE: { FEATURED: 0, DAILY: 1, WEEKLY: 2, RANDOM: 3, CUSTOM: 4, EPL: 5 },
					  GRADE: { K: 31 },
					  TAB: { COLOUR: { BLUE: "rgb(031,095,239)", TURQUOISE: "rgb(000,175,239)", CERULEAN: "rgb(000,207,239)", LIVID: "rgb(207,223,239)",
											 VIOLET: "rgb(159,159,207)", MAGENTA: "rgb(207,175,239)", ORCHID: "rgb(175,143,191)", PURPLE: "rgb(143,095,159)"
										  }
							 }
};

//------------------------------------
//--------- CANVAS -------------------

var SCREEN = { WIDTH: 800, HEIGHT: 600, MOBILE: { W: 400, H: 400 } };
var INFoBOX = { WIDTH: 200, HEIGHT: 200, MOBILE: { W: 240, H: 240 } };
var CONTROlPANEL = { WIDTH: 200, HEIGHT: 400, MOBILE: { W: 156, H: 240 } };

//----------------------------------
//--------- CORE -------------------

var LEAGUE = { TEAMS: 20, PREMIERESHIP: { TEAMS: 20 }, CHAMPIONSHIP: { TEAMS: 24 }, ONE: { TEAMS: 24 }, TWO: { TEAMS: 24 }, WEEKS: 38, FIXTURES: 10 };
var LEAGUES = { TEAMS: 92 };
//var CUP = { STATE: { PReSTART: 0, ROUNdROBIN: 1, KNOCKOUT: 2 }, DIAMOND: { TEAMS: 20 }, EMERALD: { TEAMS: 44 }, RUBY: { TEAMS: 68 }, SAPPHIRE: { TEAMS: 92 } };
var CUP = { TEAMS: { DIAMOND: 32, EMERALD: 64, SAPPHIRE: 128 } };
var FIXTURES = { SEASON: 0, NEXT10: 1, LEAGUE: 2, CUPS: 3, DIAMOND: 4, EMERALD: 5, SAPPHIRE: 6 };
var BUDGET = { ZERO: 0, RANDOM: 1, ATTENDANCE: 2 };
var GAMeTYPE = { PReSET: 0, RANDOM: 1, PRECISE: 2 };
var YOUTH = { PLAYERS: 18, GAMES: 79 };
var STYLE = { BALANCED: 0, SHORtPASSING: 1, FALSe9: 2, TOTAL: 3, WINgPLAY: 4, LONgBALL: 5, INDIVIDUAL: 6, COUNT: 7 };
var MANAGER = { STYLE: { SUPPORTIVE: 0, FIRM: 1, HANDsOFF: 2, PARTICIPATORY: 3 } };
var TRAINING = { INTENSITY: { LIGHT: 0, EXTRA: 1, HEAVY: 2, EXTREME: 3 } };

var SIDeVIEwFOOTBALlPITCH = { WIDTH: 1600, HEIGHT: 400 };
var PITCH = { L: 1600, B: 1080, FArTOUCHLINE: { W: 1140, B: 360 }, H: 35,						//.H is image offset from top of screen, equal to sprite height
				  COLOUR: "rgb(000,207,000)",
				  SIDeVIEW: { W: 1600, B: 1080, L: 5, T: 35, H: 360, ZONE: { W: 100, H: 120 },
				  TOUChLINE: { FAR: { L: { X: 235, Y: 35 }, R: { X: 1365, Y: 35 } }, NEAR: { L: { X: 5, Y: 395 }, R: { X: 1595, Y: 395 } } } } };

//Teams
//var TeamNames = [ "Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Ipswich", 
//		 	"Leicester", "Liverpool", "Manchester City", "Manchester Utd", "Newcastle", "Nottingham Forest", "Southampton", "Tottenham", "West Ham", "Wolves" ];
var TeamData = [ [5,60], [9,11], [19,28], [16,21], [1,42], [14,25], [7,39], [5,20], [12,32], [4,53],	//NOTE: position, attendance
		 [3,54], [6,75], [1,51], [8,31], [13,27], [15,21], [2,32], [17,21], [10,24], [11,57] ];
var ClubNames = [ "Highbury", "Trinity", "Dean Court", "Griffin Park", "Goldstone", "Stamford", "Selhurst", "Goodison", "Craven Cottage", "Portman",
						"Filbert", "Anfield", "Maine", "Trafford", "St. James", "West Bridgford", "Dell", "White Hart", "Upton", "Molineux" ];
var ClubNickNames = [ "Harriers", "Gazelles", "Wanderers", "Terriers", "Steeds",	"Swifts", "Rovers", "Colts", "Fawns", "Rangers",
							 "Mariners", "Ramblers", "Jackals", "Royals", "Deacons", "Vikings", "Stallions", "Sabercats", "Hawks", "Rhinos" ];
var DomesticClubNames = [ "St. Andrew", "Ewood", "Ashton", "Sophia", "Highfield", "Kirklees", "Boothferry", "Turf Moor",
								  "Elland", "Kenilworth", "Riverside", "Bermondsey", "Carrow", "Home Park", "Deepdale", "Loftus",
								  "Millmoor", "Hillsborough", "Bramall", "Britannia", "Roker", "Vetch", "Vicarage", "Hawthorns",
								  "Oakwell", "Bloomfield", "Burnden", "Horfield", "Eton Park", "Abbey", "Brunton", "Valley",
								  "Whaddon", "Pride Park", "St. Sidwell", "Highbury", "Bribsane", "Sincil", "Sixfields", "Grenoble",
								  "London", "Fratton", "Vale Park", "Elm Park", "Meadow", "Broadhall", "Robin Park", "Adams Park",
								  "Crown", "Plough Lane", "Furness", "Valley Parade", "Maldon", "Broadfield", "Gresty", "Lakeside",
								  "Nailsworth", "Priestfield", "Blundell", "Wetherby", "Field Mill", "Bletchley", "Christie Park", "Rodney Parade",
								  "Meadow Lane", "Moor Lane", "Edgeley Park", "Gander Green", "Wilthsire", "Prenton Park", "Bescot", "Dee Valley",
								  "Hampshire", "Moss Lane", "Canons Park", "Hertfordshire", "Hayes Lane", "Whittington Park", "Chigwell", "Surrey",
								  "Silverlake", "Shay Syke", "Tyne", "Berkshire", "Bourne Parke", "Nottingham", "Royton", "Damson",
								  "Essex", "Glanford", "Plainmoor", "Ruislip", "Kingfield", "Spotland", "Huish Park", "Huntington",
								  "Wesham", "Somerset", "Wellington", "Cressing", "Derbyshire", "Melbourne", "Oxfordshire", "Theobalds Lane",
								  "Northumberland", "Hardenhuish Park", "Lincolnshire", "Canvey" ];
var DomesticNickNames = [ "City", "Utd", "Town", "Athletic", "Celtic", "Victoria", "Argyle", "Vale", "Albion", "Sporting", "Hamlet", "Dynamo" ];
var OverseasLeagues = [ "Iberian", "Teutonic", "Latic", "Gallic" ];
var PeripheralLeagues = [ "Dutch", "Portuguese", "Brazilian", "Mexican", "American", "Argentinian", "Turkish", "Russian", "Swiss", "Ukrainian",
								  "Greek", "Belgian", "Chinese", "Hibernian", "Australian", "Czech", "Balkan", "Austrian", "Gulf", "Nordic",
								  "Malay", "Pacific Rim", "Baltic", "Saharan", "Cape", "Atlantic", "Polynesian", "Caribbean", "Celtic", "Caledonian" ];
var Newspapers = [ "Islington Post Intelligencer", "Birmingham Star Phoenix", "Bournemouth Examiner", "Brentford Voice", "Brighton Mercury News",
						 "Burnley Herald", "Chelsea Sun-Times", "Croydon Tribune", "Croxteth Chronicle", "Fulham Dispatch",
						 "Mersey Gazette", "Manchester Courant", "Newton Heath Union Tribune", "Newcastle Statesman", "Luton Times-Picayune",
						 "Nottingham Star Tribune", "Sheffield Free Press", "Tottenham Metro", "Wolverhampton Standard", "Stratford Vindicator"
];

//-- PLAYERS --

var PLAYER = { TYPES: 8, TYPE: { NORMAL: 0, BRITTLE: 1, INSPIRATIONAL: 2, OVERSEAS: 3, SPARKER: 4, TEMPERAMENTAL: 5, VERSATILE: 6, VOLATILE: 7 },
			 STATE: { HEADING: 11 }, HAIR: { FRONT: { X: 5, Y: -30 }, LEFT: { X: 5, Y: -26 }, BACK: { X: 5, Y: -23 }, RIGHT: { X: 5, Y: -26 } } };  //TBD: REDUNDANT
var FOOTBALLER = { SERVICE: { YOUTH: 0, EXPERIENCED: 1, SEASONED: 2, VETERAN: 3, WArHORSE: 4 },
						 AGE: { MIN: 18, YOUTH: 21, EXPERIENCED: 25, SEASONED: 29, VETERAN: 33, WArHORSE: 37 }, TYPES: 8,
						 NAME: { FIRST: 0, FEMALE: 1, LAST: 2, OVERSEAS: 3, DOMESTIC: 4, PERIPHERAL: 5, SEMiPRO: 6, PRODIGY: 7 },
						 TYPE: { NORMAL: 0, BRITTLE: 1, INSPIRATIONAL: 2, SPECIALIST: 3, SPARKER: 4, TEMPERAMENTAL: 5, UNDISCIPLINED: 6, VERSATILE: 7, VOLATILE: 8, COUNT: 9 },
						 DESIGNATION: { LEAGUE: 0, LAGGARD: 1, OVERSEAS: 2, DOMESTIC: 3, PERIPHERAL: 4, YOUTH: 5, SEMiPRO: 6, PRODIGY: 7, CHRONIC: 8, COUNT: 9 },
						 POTENTIAL: { MIN: 1, MAX: 20 },
						 HAIR: { FRONT: { X: 5, Y: -30 }, LEFT: { X: 5, Y: -26 }, BACK: { X: 5, Y: -23 }, RIGHT: { X: 5, Y: -26 } },
						 BIT: { GENDER: 4, PONyTAIL: 5, INJURY: 6, STRICKEN: 7, TRANSFERRED: 8, TRANSFERRABLE: 9, NATURALIZED: 10, MATURED: 11, MONOLID: 10,
								  GAMES: 0xFE000 } };
var PLAYERS = { OUTFIELD: 10, TOTAL: 11 };  //TODO: maybe TEMP
var PlayerTypes = [ "Normal", "Brittle", "Inspirational", "Sparker", "Specalist", "Temperamental", "Undisciplined", "Versatile", "Volatile" ];
var Designations = [ "League", "Laggard", "Overseas", "Domestic", "Peripheral", "Youth", "Semi-Pro", "Prodigy", "Chronic" ];
var TRANSFERS = { POOL: { TOTAL: 904, LEAGUE: 320, FRINGE: 600, OVERSEAS: 100, DOMESTIC: 100, PERIPHERAL: 100, YOUTH: 100, SEMiPRO: 100, PRODIGY: 100 },
		  ALL: 0, G: 1, D: 2, M: 3, A: 4, TARGETS: { ALL: 900, G: 40, D: 80, M: 90, A: 60 } };
var TypeSymbols = [ "", "…", "‡", "º", "*", "†", "^", "±" ];  //REDUNDANT
var SLOT = { GK: 3, D: 8, M: 8, A: 6, RB: 4, RWB: 5, CB: 9, LB: 10, LWB: 11, RM: 13, DM: 14, CM: 16, AM: 17, LM: 19, RW: 20, SF: 21, S: 23, BF: 24, LW: 25 };
var FORM = { TERRIBLE: 0, POOR: 1, NORMAL: 2, GOOD: 3, EXCELLENT: 4 };  //TODO: might use SOLID rather than NORMAL
var LeaguePlayers = [ ArsenalPlayers, BournemouthPlayers, BrightonPlayers, BurnleyPlayers, ChelseaPlayers, CrystalPalacePlayers,
				EvertonPlayers, HuddersfieldPlayers, LeicesterPlayers, LiverpoolPlayers, ManchesterCityPlayers,
				ManchesterUtdPlayers, NewcastlePlayers, SouthamptonPlayers, StokePlayers, SwanseaPlayers,
				TottenhamPlayers, WatfordPlayers, WBAPlayers, WestHamPlayers ];

//-- MATCH --

var MATCH = { PLAYERS: 11, SUBS: 7, MINUTES: 90, SIM: { CYCLE: { UNIT: 0, ZONAL: 1, MATChUP: 2 }, RESULT: { TURNOVER: 0, MISS: 1, SAVE: 2, GOAL: 3 } } };
var POSSESSION = { NONE: 0 , HOME: 1, AWAY: 2 };	//NOTE: 'NONE' before kickoff
//var MatchUps = [ [1,8],[2,10],[3,9],[4,5],[5,4],[6,7],[7,6],[8,1],[9,3],[10,2]  ];  //NOTE: 10 combos

var Managers = [ "TomatoSauce McGinty", "PruneSauce McGuirk", "PearSauce McGough", "OrangeSauce McGloin", "TartarSauce McGraw",
		 "RaisinSauce McGill", "AppleSauce McGee", "TunaSauce McGarrett", "CarrotSauce McGorry", "OnionSauce McGann",
		 "Johnny Appleseed", "Jimmy Turnipseed", "Jerry Cabbageseed", "Jeffrey Parsleyseed", "Jesse Carrotseed",
		 "Timmy Bananaman", "Tommy Mangoman", "Terry Guavaman", "Tony Melonman", "Teddy Grapeman"	 ];
var SelectionSlots = [ [0,1,2], [3,4], [5,6,7], [6,7,8], [9,10],	//NOTE: TEMP, for 442
				 [4,11,12], [13,14,15,16], [14,15,16,17], [9,18,19],
				 [20,21,22], [22,23,24] ];

//----------------------------------------
//---------- CONTROLS --------------------

//----------------------------------------
//--------- IMAGE MAPS -------------------

//Testing
var TEST = { ISOMETRIC: 0, BIRDsEYE: 1, STRIKER: 2, DRIBBLING: 3, ANIMATION: 4, WING: 5, PITCH: 6, GEOMETRIC: 7, SMUDGING: 8, PARABOLIC: 9, FORMATIONS: 10,
		  FIXTURES: 11, MATChUPS: 12, SPRITES: 13, KITS: 14, POSSESSION: 15, CONFORMANCE: 16, DIRECTIONAL: 17, NAMES: 18, RANDOM: 19 };
var TESTINgIMAGE = { L: 0, T: 0, W: 297, H: 277, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 93, H: 59 }, { L: 1, T: 61, W: 52, H: 52 }, { L: 1, T: 114, W: 52, H: 51 }, { L: 1, T: 166, W: 52, H: 60 },
			{ L: 1, T: 227, W: 58, H: 49 }, { L: 54, T: 61, W: 64, H: 114 }, { L: 95, T: 1, W: 98, H: 40 }, { L: 95, T: 42, W: 98, H: 18 },
			{ L: 54, T: 176, W: 64, H: 67 }, { L: 119, T: 61, W: 117, H: 84 }, { L: 60, T: 244, W: 58, H: 32 }, { L: 194, T: 1, W: 42, H: 59 },
			{ L: 119, T: 146, W: 58, H: 51 }, { L: 178, T: 146, W: 58, H: 51 }, { L: 119, T: 198, W: 58, H: 49 }, { L: 119, T: 248, W: 58, H: 28 },
			{ L: 178, T: 198, W: 58, H: 78 }, { L: 237, T: 1, W: 59, H: 69 }, { L: 237, T: 71, W: 59, H: 60 }, { L: 237, T: 132, W: 59, H: 69 } ];
var TestingDescriptions = [ [ "Isometric Pitch Display" ], [ "Bird's Eye Match View" ], [ "Striker Mini-Game" ], [ "Dribbling demo" ],
				 [ "Animation Side-On Demo" ], [ "Wing play simulation" ], [ "New side-view pitch test" ], [ "Geometrically generated pitch" ],
				 [ "Fractional position smudging exam" ], [ "Curving crosses and free-kicks" ], [ "Formation positions on pitch"],
				 [ "One half season's fixtures" ], [ "Cross-formation match-ups" ], [ "Sprite gallery" ], [ "Resolving kit colour clashes" ],
				 [ "Possession calculations." ], [ "Formation-play conformance test." ], [ "Side-view agent movement." ], [ "Duplicate name check." ],
				 [ "Randomizer repetition test." ]
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

//------------------------------------
//--------- IMAGES -------------------

var PITChIMAGE = { L: 0, T: 0, W: 400, H: 600 };
var ROTATINgBALlIMAGE = { L: 2, T: 264, W: 80, H: 80 };
var ACRONYmIMAGEs = { L: 1, T: 1, W: 232, H: 31, O: 2, R: 3, C: 9, PATCH: { W: 24, H: 9 } };
var TYPeSYMBOlIMAGEs = { L: 1, T: 156, W: 110, H: 13, O: 2, C: 8, R: 1, PATCH: { W: 12, H: 13 } };
var DESIGNATIOnSYMBOlIMAGEs = { L: 113, T: 156, W: 110, H: 13, O: 2, C: 8, R: 1, PATCH: { W: 12, H: 13 } };
var ARROwIMAGEs = { L: 265, T: 87, W: 12, H: 10, O: 2, C: 2, R: 1, PATCH: { W: 5, H: 10 } };

var HAIrIMAGEs = { L: 1, T: 56, W: 294, H: 21, O: 2, R: 1, C: 8, PATCH: { W: 35, H: 21 } };
var FOOTBALLErFACeIMAGEs = { L: 1, T: 79, W: 262, H: 29, O: 2, R: 1, C: 8, PATCH: { W: 31, H: 29 } };
var PUPIlIMAGEs = { L: 265, T: 79, W: 22, H: 6, O: 2, R: 2, C: 4, PATCH: { W: 4, H: 2 } };
var HAIrDoIMAGEs = { L: 1, T: 110, W: 238, H: 14, O: 2, R: 1, C: 8, PATCH: { W: 28, H: 14 } };
var ROUNdFACeIMAGEs = { L: 1, T: 126, W: 254, H: 28, O: 2, R: 1, C: 8, PATCH: { W: 30, H: 28 } };
var BANGsIMAGEs = { L: 235, T: 1, W: 94, H: 30, O: 2, R: 1, C: 16, PATCH: { W: 4, H: 30 } };
var MALeMONOLIdIMAGEs = { L: 153, T: 50, W: 62, H: 4, O: 2, R: 1, C: 8, PATCH: { W: 6, H: 4 } };
var FEMALeMONOLIdIMAGEs = { L: 217, T: 50, W: 142, H: 4, O: 2, R: 1, C: 16, PATCH: { W: 7, H: 4 } };

var SMALlLETTErIMAGEs = { L: 153, T: 43, W: 179, H: 5, O: 2, C: 26, R: 1, PATCH: { W: 5, H: 5 } };
var MEDIUmLETTErIMAGEs = { L: 153, T: 34, W: 155, H: 7, O: 1, C: 26, R: 1, PATCH: { W: 5, H: 7 } };
var PLUsIMAGE = { L: 310, T: 34, W: 5, H: 5 };
var MINUsIMAGE = { L: 317, T: 34, W: 5, H: 1 };

var FEeDIGItIMAGEs = { L: 241, T: 110, W: 98, H: 10, O: 2, C: 10, R: 1, PATCH: { W: 8, H: 10 } };
var FEeDISPLAyIMAGE = { L: 257, T: 122, W: 90, H: 22, X: 410, Y: 30 };

var INJUREdIMAGE = { L: 240, T: 156, W: 13, H: 13 };

//-------------------------------------
//--------- SPRITES -------------------

var ISOPITCH = { LX: 0, LY: 384, TX: 768, TY: 0, RX: 1280, RY: 256, BX: 512, BY: 640, COLOUR: "rgb(0, 207, 0)", PBOXRATIOV: .1875, PBOXRATIOH: 0.3333, GBOXRATIOV: 0.1675, GBOXRATIOH: 0.1111, PENSPOT: 0.1, CCRADIUS: 0.0825, CARADIUS: 0.01 };

//Sprite data
var SAMI = {	W: 121,	H: 229	};
var MUSTI = {  W: 130,	H: 235 };
var WESLEY = {  W: 128,	H: 238 };

var PCORNER = {
	ATTACKER1_X : 0,
	ATTACKER1_Y : 0,
	ATTACKER2_X : 0,
	ATTACKER2_Y : 0,
	ATTACKER3_X : 0,
	ATTACKER4_X : 0,
	DEFENDER1_X : 0,
	DEFENDER1_Y : 0,
	DEFENDER2_X : 0,
	DEFENDER3_X : 0,
	DEFENDER4_X : 0,
	KEEPER_X	 : 0,
	KEEPER_Y	 : 0
};

//--------------------------------------
//---------- AGENTS --------------------

var SIDeVIEwFOOTBALLER = { SPEED: 2.0, ANIMATION: { SEQUENCE: [0,1,2,1,0,3,4,3,0] }, PERSPECTIVE: PERSPECTIVE.BIRDsEYE,
									HAIR: { FRONT: { X: 5, Y: -30 }, LEFT: { X: 5, Y: -26 }, BACK: { X: 5, Y: -23 }, RIGHT: { X: 5, Y: -26 } },
									PONyTAIL: { LEFT: { X: 2, Y: -29 }, RIGHT: { X: -1, Y: -1 } }, BUN: { X: 8, Y: -35 } };
var SIDeOnKEEPER = { SPEED: 1.0, ANIMATION: true, PERSPECTIVE: PERSPECTIVE.BIRDsEYE };
var TOpDOWnFOOTBALLER = { SPEED: 2.0, HAIR: { X: 5, Y: -30 } };
var ISOMETRIcFOOTBALLER = { SPEED: 2.0 };

//-------------------------------------
//---------- VIEWS --------------------

var TEAmVIEW = { TAB: { ACADEMY: 0, FORMATION: 1, OPPONENT: 2, FIXTURES: 3, INJURIES: 4, STATS: 5, TRANSFERS: 6, TABLES: 7 } };
var FORMATIOnVIEW = { L: 400, T: 20, W: 360, H: 340 };
var TABLeVIEW = { COLOUR: { PANEL: "rgb(223,239,047)", TEXT: "rgb(031,127,079)" } };
