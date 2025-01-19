
//---------------------------------------
//---------- BITMAPS --------------------

var ZFLImages = [
	"ZFLSprites.png",
	"ZFLImages.png",
	"ZFLControls.png",
	"ZFLTesting.png",
	"ZFLDemo.png",
	"ZFLTutorial.png",
	"MiniGames.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"scratch.png"
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
	GENIeCONTROLS: 8,
	SCRATCH:			9
};

//----------------------------------------
//---------- CONTROLS --------------------

var ZFLControls = [
	["StartButton", "620px", "575px"],
	["LoadButton",  "680px", "575px"],
	["SaveButton",  "740px", "575px"],
	["TestButton",  "820px", "575px"],
	["LeagueTextArea",	 "920px",  "10px" ],
	["RosterTextArea",	 "920px", "210px" ],
	["FreeAgentTextArea", "920px", "410px" ]
];
var CONTROLS = {
	STARtBUTTON: 0,
	LOAdBUTTON:  1,
	SAVeBUTTON:  2,
	TEStBUTTON:  3
};
var EVENT = {
	STARtBUTTOnCLICKED: 0,
	LOAdBUTTOnCLICKED:  1,
	SAVeBUTTOnCLICKED:  2,
	TEStBUTTOnCLICKED:  3
};

//-------------------------------------
//---------- SOUNDS -------------------

//----------------------------------------
//---------- CORE DATA -------------------

var ZFL = { TYPE: { RANDOM: 0, FEATURED: 1, DAILY: 2, WEEKLY: 3 },
				TURQUOISE: "rgb(063,191,223)", SKY: "rgb(063,191,223)" };

var SCREEN = { WIDTH: 600, HEIGHT: 600 };
var INFoBOX = { WIDTH: 300, HEIGHT: 240 };
var CONTROlPANEL = { WIDTH: 300, HEIGHT: 320 };

//----------------------------------------
//---------- GAME DATA -------------------

//Colours
var GRIDIROnCOLOUR = { LIVID: "rgb(127,159,207)", INDIGO: "rgb(079,127,207)" };
var TeamColours = [ [ "rgb(000,047,095)", "rgb(031,079,159)", "rgb(075,111,175)", "rgb(111,031,063)",
							 "rgb(159,031,047)", "rgb(207,015,031)", "rgb(239,093,015)", "rgb(015,095,095)",
							 "rgb(079,127,047)", "rgb(079,047,047)", "rgb(127,079,063)", "rgb(079,047,127)",
							 "rgb(175,015,079)", "rgb(143,079,159)", "rgb(031,159,095)", "rgb(239,079,111)"  ],
						  [ "rgb(191,191,207)", "rgb(175,191,223)", "rgb(255,207,000)", "rgb(207,127,015)",
							 "rgb(255,223,031)", "rgb(255,191,207)", "rgb(191,191,000)", "rgb(191,143,111)",
							 "rgb(239,239,063)", "rgb(239,175,191)", "rgb(191,179,223)", "rgb(031,159,191)",
							 "rgb(127,207,191)", "rgb(127,223,239)", "rgb(095,255,127)", "rgb(255,239,095)"  ]  ];
var InterfaceColours = [ BLUE.POWDER, "rgb(095,223,239)", "rgb(127,255,255)" ];
var RosterColours = [ "rgb(143,095,191)", "rgb(000,000,255)", "rgb(000,127,063)", "rgb(255,239,047)", "rgb(191,000,000)", "black" ];	//purple-blue-green-yellow-red
var ZFLComplexions = [ "rgb(255,194,140)", "rgb(244,198,174)", "rgb(227,175,135)", "rgb(244,171,154)",
							  "rgb(183,102,039)", "rgb(118,053,015)", "rgb(120,072,050)", "rgb(090,037,021)"  ];
var ZFLHairColours = [ "rgb(236,094,028)", "rgb(187,063,001)", "rgb(149,062,019)", "rgb(099,039,000)",
							  "rgb(249,211,076)", "rgb(242,188,027)", "rgb(174,129,090)", "rgb(008,008,006)"  ];
var ZFLEyeColours = [ "rgb(111,031,000)", "rgb(175,127,079)", "rgb(143,127,000)", "rgb(111,143,031)",		//dark brown, brown, hazel, dark green
							 "rgb(143,191,031)", "rgb(159,175,191)", "rgb(127,191,207)", "rgb(000,159,223)"  ];	//light green, grey-blue, light blue, blue

//Teams
var TEAM = { CITY: 0, NICkNAME: 1, COUNT: 32,
		  BUF: 0, MIA: 1, NE: 2, NYJ: 3, HOU: 4, IND: 5, JAX: 6, TEN: 7, BAL: 8, CIN: 9, CLE: 10, PIT: 11, DEN: 12, KC: 13, OAK: 14, SD: 15,
		  DAL: 16, NYG: 17, PHI: 18, WSH: 19, ATL: 20, CAR: 21, NO: 22, TB: 23, CHI: 24, DET: 25, GB: 26, MIN: 27, ARZ: 28, SEA: 29, SF: 30, STL: 31 };
var TeamNames = [ ["Buffalo", "Regals"], ["Miami", "Beachniks"], ["New England", "Freemen"], ["New York", "Libertines"],
					   ["Houston", "Amigos"], ["Indianapolis", "Highwaymen"], ["Jacksonville", "Casuals"], ["Tennessee", "Minstrels"],
					   ["Baltimore", "Charmers"], ["Cincinnati", "Strongmen"], ["Cleveland", "Progressives"], ["Pittsburgh", "Divines"],
					   ["Denver", "Mountaineers"], ["Kansas City", "Heartthrobs"], ["Oakland", "Romeos"], ["San Diego", "Vigilantes"],
					   ["Dallas", "Panorama"], ["New York", "Skyscrapers"], ["Philadelphia", "Comrades"], ["Washington", "Justices"],
					   ["Atlanta", "Sages"], ["Carolina", "Charlatans"], ["New Orleans", "Revellers"], ["Tampa Bay", "Eternals"],
					   ["Chicago", "Bruisers"], ["Detroit", "Drivers"], ["Green Bay", "Pioneers"], ["Minnesota", "Novas"],
					   ["Arizona", "Tycoons"], ["Seattle", "Samaritans"], ["San Francisco", "Vintners"], ["St. Louis", "Archons"] ];
var TeamAbbreviations = [ "BUF", "MIA", "NE", "NYJ", "HOU", "IND", "JAX", "TEN", "BAL", "CIN", "CLE", "PIT", "DEN", "KC", "OAK", "SD",
								  "DAL", "NYG", "PHI", "WSH", "ATL", "CAR", "NO", "TB", "CHI", "DET", "GB", "MIN", "ARZ", "SEA", "SF", "STL" ];
var LEAGUE = { TEAMS: 32, TYPES: 14,
					ZFL: 0, IFFL: 1, IMFL: 2, IZFL: 3, HOFL: 4, MOFL: 5, TTFL: 6, SBFL: 7, TWFL: 8, FWFL: 9, OCFL: 10, HBFL: 11, DHFL: 12, TWFL: 13 };
var SEASON = { GAMES: 16, DEADLINE: 8,
					STATE: { END: -8, START: -7, FAs: -6, TRADES: -5, DRAFT: -4, PROJECTS: -3, CAMP: -2, CUTS: -1, GAME: 0 } };
var DRAFT = { ROUNDS: 7, PROSPECTS: 366, NORMALS: 120, FRINGES: 105, ALTERNATES: 105, DIMENSIONALS: 36, PROJECTS: 80,
				  BATCH: { NORMAL: 0, FRINGE: 1, ALTERNATE: 2, DIMENSIONAL: 3 }, STATE: { INTRO: 0, PREVIEW: 1, START: 2 } };
var DraftOutcomes = [ "Disaster", "Poor", "Below Average", "Average", "Above Average", "Good", "Great", "Excellent" ];
var TrainingOutcomes = [ "Bust", "Disappointing", "Encouraging", "Brilliant" ];
var TRAINING = { METHODS: 3 };
var PLAY = { RECEIVERS: { MAX: 5 } };

//---------------------------------------
//---------- CONTROLS -------------------

var POSITIOnBArIMAGE = { L: 231, T: 137, W: 25, H: 188 };
var POSITIOnTOUChBAR = { L: 5, T: 20, W: 25, H: 188, O: 1, KEYS: 11, KEY: { W: 23, H: 16 }, SELECT: 0, ORIENT: ORIENTATION.VERTICAL };

//------------------------------------------
//---------- IMAGE MAPS --------------------

//Testing
var TEST = { NAME: 0, PROGRESSION: 1, SPRITES: 2, CURVE: 3 };
var TESTINgIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 58, H: 68 }, { L: 1, T: 70, W: 58, H: 70 }, { L: 1, T: 141, W: 58, H: 70 }, { L: 1, T: 212, W: 58, H: 68 } ];
var TestingDescriptions = [ [ "Name change experiment." ], [ "Average roster ratings over seasons." ], [ "Sprite drawing via buffer." ],
				 [ "Bell curve based grade improvements." ]
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

var DRAFtGRADeIMAGES = { L: 1, T: 1, W: 94, H: 15, C: 8, R: 1, O: 2, PATCH: { W: 12, H: 15 } };
var GRADeMARKsIMAGES = { L: 1, T: 18, W: 20, H: 9, C: 2, R: 1, O: 2, PATCH: { W: 9, H: 9 } };
var TYPeSYMBOlIMAGES = { L: 124, T: 19, W: 80, H: 9, C: 8, R: 1, O: 1, PATCH: { W: 9, H: 9 } };

//--------------------------------------
//---------- SPRITES -------------------

var VERTICAlFOOTBALlSPRITE = { W: 4, H: 7, GS: [ { SHAPE: SHAPE.ELLIPSE, COLOUR: "brown", W: 4, H: 7, LW: 0 },		//TODO: make these sprites once GenieEllipse
						 { SHAPE: SHAPE.ELLIPSE, COLOUR: "black", W: 4, H: 7, LW: 1 }  ] };	//	is implemented
var HORIZONTAlFOOTBALlSPRITE = { W: 7, H: 4, GS: [ { SHAPE: SHAPE.ELLIPSE, COLOUR: "brown", W: 7, H: 4, LW: 0 },
							{ SHAPE: SHAPE.ELLIPSE, COLOUR: "black", W: 7, H: 4, LW: 1 }  ] };

//Helmet
var LEFtSIDeHELMEtSPRITE = { L: 1, T: 1, W: 14, H: 13, C: 16, R: 2, O: 2 };
var RIGHtSIDeHELMEtSPRITE = { L: 1, T: 31, W: 14, H: 13, C: 16, R: 2, O: 2 };
var FRONtHELMEtSPRITE = { L: 1, T: 61, W: 14, H: 13, C: 16, R: 2, O: 2 };
var REVERSeHELMEtSPRITE = { L: 1, T: 89, W: 14, H: 13, C: 16, R: 2, O: 2 };

//Skin
var FACeCOMPLEXIOnSPRITE = { L: 1, T: 123, W: 9, H: 7, O: 2 };
var HANdSPRITE = { L: 1, T: 172, W: 3, H: 4, R: 2, C: 8, O: 2 };
var DOWNWARdHANdSPRITE = { L: 1, T: 184, W: 4, H: 3, R: 2, C: 8, O: 2 };

//Body
var GRIDDErSIDeSPRITE = { L: 1, T: 132, W: 11, H: 18, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "brown", X: 1, Y: -18, W: 9, H: 7, LW: 0 },		//face
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey",  X: 2, Y: -10, W: 7, H: 9, LW: 0 }  ] };		//jersey
var GRIDDErFRONtSPRITE = { L: 89, T: 123, W: 11, H: 18, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "brown", X: 1, Y: -18, W: 9, H: 7, LW: 0 },		//face
									{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey",  X: 1, Y: -10, W: 9, H: 9, LW: 0 }  ] };	//jersey

//Arm
var ARmSPRITE = { L: 1, T: 152, W: 5, H: 11, O: 2, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y: -11, W: 11, H: 3, LW: 0 } ] };
var RIGHtBENtARmSPRITE = { L: 47, T: 147, W: 9, H: 9, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y: -8, W: 3, H: 6, LW: 0 },			//bicep
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 2, Y: -4, W: 7, H: 3, LW: 0 }  ] };		//forearm
var LEFtBENtARmSPRITE = { L: 58, T: 147, W: 9, H: 9, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 5, Y: -8, W: 3, H: 6, LW: 0 },			//bicep
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 0, Y: -4, W: 7, H: 3, LW: 0 }  ] };		//forearm
var RIGHtBACkARmSPRITE = { L: 69, T: 147, W: 7, H: 7, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 2, Y: -6, W: 5, H: 3, LW: 0 },			//bicep
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -6, W: 2, H: 5, LW: 0 }  ] };		//forearm
var LEFtBACkARmSPRITE = { L: 78, T: 147, W: 7, H: 7, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 0, Y: -6, W: 5, H: 3, LW: 0 },			//bicep
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 4, Y: -6, W: 2, H: 5, LW: 0 }  ] };		//forearm
var SIDeARmSPRITE = { L: 19, T: 159, W: 4, H: 10, O: 2, GS: [ [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y: -9, W: 2, H: 9, LW: 0 } ],
									[ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y: -9, W: 2, H: 8, LW: 0 } ],
									[ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y: -9, W: 2, H: 7, LW: 0 } ]  ] };
var RIGHtCROOKEdARmSPRITE = { L: 37, T: 159, W: 9, H: 9 };
var LEFtCROOKEdARmSPRITE = { L: 48, T: 159, W: 9, H: 9 };
var HORIZONTAlARmSPRITE = { L: 59, T: 158, W: 11, H: 5, O: 2, C: 1, R: 2, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 0, Y: -4, W: 11, H: 3, LW: 0 } ] };
var DIAGONAlRIGHtARmSPRITE = { L: 72, T: 158, W: 8, H: 9 };
var DIAGONAlLEFtARmSPRITE = { L: 82, T: 158, W: 8, H: 9 };

//Leg
var RIGHtFRONtLEgSPRITE = { L: 14, T: 132, W: 8, H: 13, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -13, W: 5, H: 9, LW: 0 },		//leg
									{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -3, W: 6, H: 2, LW: 0 }  ] };		//shoe
var LEFtFRONtLEgSPRITE = { L: 24, T: 132, W: 8, H: 13, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 2, Y: -13, W: 5, H: 9, LW: 0 },		//leg
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -3, W: 6, H: 2, LW: 0 }  ] };		//shoe
var RIGHtBACkLEgSPRITE = { L: 34, T: 132, W: 9, H: 13, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -13, W: 4, H: 9, LW: 0 },		//leg
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 2, Y:  -3, W: 6, H: 2, LW: 0 }  ] };		//shoe
var LEFtBACkLEgSPRITE = { L: 45, T: 132, W: 9, H: 13, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 4, Y: -13, W: 4, H: 9, LW: 0 },		//leg
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -3, W: 6, H: 2, LW: 0 }  ] };		//shoe
var RIGHtBENtLEgSPRITE = { L: 15, T: 147, W: 14, H: 10, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 8, Y: -10, W: 5, H: 4, LW: 0 },		//thigh
									{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 5, Y:  -8, W: 7, H: 4, LW: 0 },		//shin
									{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 2, Y:  -7, W: 2, H: 6, LW: 0 }  ] };		//boot
var LEFtBENtLEgSPRITE = { L: 31, T: 147, W: 14, H: 10, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X:  1, Y: -10, W: 5, H: 4, LW: 0 },		//thigh
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X:  3, Y:  -8, W: 7, H: 4, LW: 0 },		//shin
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 11, Y:  -7, W: 2, H: 6, LW: 0 }  ] };		//boot

//Clothing
var LEFtLEGGINgSPRITE = { L: 102, T: 123, W: 10, H: 9, O: 2, C: 16, R: 2 };
var RIGHtLEGGINgSPRITE = { L: 102, T: 145, W: 10, H: 9, O: 2, C: 16, R: 2 };
var LEFtSLEEVeSPRITE = { L: 1, T: 172, W: 6, H: 8, O: 2, C: 16, R: 2 };
var RIGHtSLEEVeSPRITE = { L: 1, T: 192, W: 6, H: 8, O: 2, C: 16, R: 2 };
var LEFtELBOwSPRITE = { L: 129, T: 167, W: 7, H: 8, O: 2, C: 16, R: 2 };
var RIGHtELBOwSPRITE = { L: 129, T: 187, W: 7, H: 8, O: 2, C: 16, R: 2 };

var LETTErSPRITE = { L: 110, T: 144, W: 6, H: 9, O: 0, C: 26, R: 6 };
var ROUTeMARKErSPRITE = { L: 257, T: 1, W: 7, H: 7, O: 2 };

//--------------------------------------
//---------- AGENTS -------------------

var GRIDDER = { TYPES: 8, ALTERNATES: 7, DIMENSIONALS: 8, ANORMALS: 8, GRADES: 30, DRAFT: { ANORMALS: 141 },
					 INJURY: { MIN: 1, MAX: 4 }, POTENTIAL: { MIN: 1, MEDIAN: 8, MAX: 15 },
					 STATE: { PReSNAP: 0,
					 SNAPPING: 1, DROPPINgBACK: 2, SETTING: 3, THROWING: 4, WATCHING: 5, HANDINgOFF: 6,			//QB
					 ADVANCING: 10, HANdOFF: 11, CARRYING: 12, EVADING: 13,							//RB
					 RUNNING: 20, BREAKING: 21, WAITING: 22, GOINgDEEP: 23,							//WR
					 SEEKING: 30,												//TE
					 RISING: 40, BRACING: 41, BLOCKING: 42, DRIVING: 43, BEATEN: 44,					//OL
					 RISING: 50, BRACING: 51, RUSHING: 52, PLUGGING: 53, ENGAGED: 54, TACKLING: 55, BEATEN: 56,		//DL
					 BLITZING: 90, COVERING: 91, POSITIONING: 92, BREAKING: 93, TACKLING: 94, BEATEN: 95, INTERCEPTING: 96, BEATEN: 97 },
					 FORM: { STANDING: 0, STRIDING: 1, WINDINgUP: 5, RELEASING: 6, FOLLOwTHROUGH: 7, HAILING: 8, DRIVING: 9 },
					 ANIMATION: { SEQUENCE: [0,1,2,1,0,3,4,3], F: 10 },
					 TYPE: { NORMAL: 0, DIVISIONAL: 1, INJURED: 2, SPARKER: 3, SPECIAL: 4, TEMPERAMENTAL: 5, VERSATILE: 6, VOLATILE: 7, DIMENSIONAL: 8,
								PROJECT: 9, ALL: 0 },
					 YEARS: { ROOKIE: 0, IMPROVER: 4, DECLINER: 8, CAREER: 12 },
					 DIVISIONAL: { PROBABILITY: [12,80] }
};
var QB = { STATE: { }, TYPES: 4 };
var RB = { STATE: { }, TYPES: 6 };
var R = { OPEN: { COVERED: 0, HALF: 1, FULL: 2 } };
var WR = { STATE: { PReSNAP: 0, RUNNING: 20, BREAKING: 21, WAITING: 22, GOINgDEEP: 23 }, ANIMATION: { SEQUENCE: [0,1,2,1,0,3,4,3], F: 15 }, TYPES: 3 };
var TE = { STATE: { }, TYPES: 2 };
var OL = { STATE: { PReSNAP: 0, RISING: 40, BRACING: 41, BLOCKING: 42, DRIVING: 43, BEATEN: 44 }, ANIMATION: { SEQUENCE: [9,7,10,7] }, TYPES: 3 };
var DL = { STATE: { PReSNAP: 0, RISING: 50, BRACING: 51, RUSHING: 52, PLUGGING: 53, ENGAGED: 54, TACKLING: 55, BLOCKED: 56 },
		ANIMATION: { SEQUENCE: [9,7,10,7] } };
var DE = { TYPES: 4 };
var DT = { TYPES: 3 };
var LB = { };
var DB = { };
var S = { TYPES: 2 };
var CB = { STATE: { PReSNAP: 0, BLITZING: 90, COVERING: 91, POSITIONING: 92, BREAKING: 93, TACKLING: 94, BEATEN: 95, INTERCEPTING: 96, BEATEN: 97 },
		ANIMATION: { SEQUENCE: [0,1,2,1,0,3,4,3], F: 10 }, TYPES: 3 };

//---------------------------------
//---------- FX -------------------
