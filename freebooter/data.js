
//---------------------------------------
//---------- BITMAPS --------------------

var SolarImages = [
	"SolarSprites.png",
	"../modules/GenieSprites.png",
	"SolarImages.png",
	"SolarControls.png",
	"MobileControls.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"Testing.png",
	"MiniGames.png"
];
var IMAGeINDEX = {
	SPRITES:			0,
	GENIeSPRITES:	1,
	IMAGES:			2,
	CONTROLS:		3,
	MOBILE:			4,
	GENIeIMAGES:	5,
	GENIeCONTROLS:	6,
	TESTING:			7,
	MINiGAMES:		8
};

//------------------------------------
//---------- HTML --------------------

var SolarControls = [
	["StartButton", "620px", "575px"],
	["LoadButton",  "680px", "575px"],
	["SaveButton",  "740px", "575px"],
	["TestButton",  "800px", "575px"]
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

//--------------------------------------
//---------- CANVAS --------------------

var SCREEN = { WIDTH: 600, HEIGHT: 600, MOBILE: { W: 400, H: 400 } };
var INFoBOX = { WIDTH: 240, HEIGHT: 240, MOBILE: { W: 240, H: 240 } };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 320, MOBILE: { W: 156, H: 240 } };
var TICKER = { WIDTH: 600, HEIGHT: 30 };
var TABLOID = { WIDTH: -1, HEIGHT: -1 };

//--------------------------------------------
//---------- GENERAL DATA --------------------

var PILOT = { COUNT: 8 };
var DASHBOARD = { PLANETS: 0, DOCKING: 1, MISSIONS: 2, PIRATES: 3, ASTEROIDS: 4, FREELANCERS: 5, FRIENDS: 6, STATIONS: 7, TRADE: 8, STARLANES: 9,
		  CORPS: 10, COMMUNICATIONS: 11, BUTTONS: 12 };  //no TV right now

var ELITE = { STARS: 100, BUFFER: { WIDTH: 800, HEIGHT: 400 } };
var ELITeVIEW = { PLANEtVIEW: 0, FP3D: 1, TOpDOWN: 2, LAUNCHING: 3 };	//NOTE: don't need one for docking (use FP3D)
var STATION = { COUNT: { TOTAL: 4096, PLANET: 64 } };
var SOLArDOCKINgSTATION = { MInSIDES: 8, MAxSIDES: 16, SIZE: 250, ENTRANCE: { SIDES: 4, SIZE: 65 },
									 STATE: { SPINNING: 0, EXPANDING: 1, CONTRACTING: 2, OPENING: 3, CLOSING: 4 } };
var ELITeSHIP = { MAxALTITUDE: 5, WEAPON: { NONE: 0, TACkCANNON: 1, PInCANNON: 2, PIKeCANNON: 3, MINiMISSILE: 5, MEDIAlMISSILE: 5, HYPErMISSILE: 6 } };  //NOTE: altitude in miles
var COCKPIT = { L: 0, T: 0, W: 600, H: 600, PANEL: { COUNT: 12 }, DASHBOARD: {} };
var ChannelLengths = [ 540, 523, 511, 503, 499 ];
var VOYAGE = { OFFERS: 8 };
var CARGO = { TYPES: 8 };
var Cargo = [ "food", "fuel", "electronics", "ceramics", "collectibles", "antiques", "toys", "comics" ];

//------------------------------------------
//---------- IMAGE MAPS --------------------

var TEST = { PIRATES: 0, MISSIONS: 1, WEAPONS: 2, DOCKING: 3, LAUNCHING: 4, SHIPS: 5, MISSION: 6, TRACKPAD: 7, ORBS: 8 };
var TESTINgIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 58, H: 72 }, { L: 1, T: 74, W: 58, H: 66 }, { L: 1, T: 141, W: 58, H: 69 }, { L: 1, T: 211, W: 58, H: 71 },
						 { L: 60, T: 1, W: 58, H: 71 }, { L: 60, T: 73, W: 58, H: 71 }, { L: 60, T: 145, W: 58, H: 68 }, { L: 119, T: 1, W: 58, H: 77 },
						 { L: 60, T: 214, W: 58, H: 63 }
];
var TestingDescriptions = [ [ "Hunting pirates" ], [ "Mission selection tryout" ], [ "Weapons test" ], [ "Docking demo" ], [ "Launching from dock" ],
									 [ "Experimental ship designs" ], [ "Random mission generation" ], [ "Trackpad operation for mobiles." ],
									 [ "Buffered space orbs." ]
];

var MINiGAME = { PIRATES: 0 };
var MINiGAMEsIMAGE = { L: 0, T: 0, W: 237, H: 285, X: 20, Y: 20 };
var MiniGamesMap = [ { L:  1, T: 1, W: 58, H: 68 } ];
var MiniGameDescriptions = [ [ "Pirate battle." ] ];

//--------------------------------------
//---------- IMAGES --------------------

var CRATeIMAGE = { L: 1, T: 252, W: 398, H: 40, O: 2, C: 8, R: 1, PATCH: { W: 48, H: 40 } };
var STATIOnCHUTeIMAGE = { L: 1, T: 1, W: 58, H: 99 };

//----------------------------------
//---------- FX --------------------

var ELITeFXlISTs = { LASERS: 0, MISSILES: 1, EXPLOSIONS: 2 };

//-------------------------------------
//---------- SOUNDS -------------------

var SolarSounds = [
	"sounds/soundtrack.wav",
	"sounds/laser.mp3",
	"sounds/explosion.wav",
	"sounds/engine.mp3"
];
var SOUNdINDEX = {
	SOUNDTRACK: 0,
	LASER:		1,
	EXPLOSION:  2,
	ENGINE:		3
};

//--------------------------------------
//---------- AGENTS --------------------

var ELITeSHIP = { SPEED: 0.5, ALIGN: ALIGNMENT.CENTRE, SELECTION: null };
var BLUeKRAItSHIP = { CANNON: { MAX: 250, MIN: 150, COLOUR: "grey", LIST: ELITeFXlISTs.LASERS }, STATE: { WHOLE: 0, HALF: 1 } };
var TACkCANNON = { };
var PInCANNON = { };
var PIKeCANNON = { };
/*
var BVRuNIT = { SPEED: 0.5, ALIGN: ALIGNMENT.CENTRE, PHASES: 2,
		SELECTION: null,
//		SHIELD: { STRENGTH: -1 },
		EXPLOSION: { LIST: BVRfXlISTs.EXPLOSIONS }
};
var BVRgUNNER = { X: 8, Y: 0, CANNON: { MAX: 250, MIN: 150, COLOUR: "grey", LIST: BVRfXlISTs.LASERS } };
var BVRgRENADIER = { SHELL: { LIST: BVRfXlISTs.SHELLS } };
var BVRbAZOOKER = { ROCKET: { COLOUR: GREY.SILVER, ReLOAD: 180, SPEED: 20, LIST: BVRfXlISTs.ROCKETS, SPRITE: BVRsPRITeLIST.ROCKEtSIGHtSPRITE } };
*/

var BlueKraitVertices = [ { X: 15, Y: 15 }, { X: 45, Y: 0 }, { X: 15, Y: -15 }, { X: -15, Y: -15 }, { X: -45, Y: 0 }, { X: -15, Y: 15 } ];
