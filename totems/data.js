
//---------------------------------------
//---------- BITMAPS --------------------

var TollImages = [
   "TollSprites.png",
   "../modules/GenieSprites.png",
   "TollImages.png",
   "Testing.png",
   "design.png"		//TEMP
];
var IMAGeINDEX = {
   SPRITES:	 0,
   GENIeSPRITES: 1,
   IMAGES:	 2,
   TESTING:	 3,
   DESIGN:	 4	//TEMP
};

//----------------------------------------
//---------- CONTROLS --------------------

var TollControls = [
   ["StartButton", "620px", "575px"],
   ["ResetButton", "680px", "575px"],
   ["TestButton", "800px", "575px"]
];
var CONTROLS = {
   STARtBUTTON: 0,
   RESEtBUTTON: 1,
   TEStBUTTON:  2
};
var EVENT = {
   STARTBTN_CLCKD : 0,
   RESETBTN_CLCKD : 1,
   TEStBUTTOnCLICKED: 2
};

//-----------------------------------------
//---------- CORE DATA --------------------

var SCREEN = { WIDTH: 600, HEIGHT: 600, RECT: { COLOUR: "red", LW: 1 }, TILE: { C: 10, R: 10 } };
var INFoBOX = { WIDTH: 240, HEIGHT: 240 };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 320 };
var SCREEnRECT = { COLOUR: "red", LW: 1 };

//-----------------------------------------
//---------- GAME DATA --------------------

var MAP = { W: 7200, H: 7200, COLOUR: "rgb(223,159,127)", COLOUR1: GREEN.ONE, COLOUR2: "rgb(000,239,000)", TILE: { R: 120, C: 120, W: 60, H: 60 } };
var TILE = { W: 40, H: 40, EMPTY: 0, CANAL: 16, PRESIDIO: 32, VAULT: 64, MARKER: 128, MINEFIELD: 256, PATH: 2 };  //PATH REDUNDANT at the moment
var BATTLeFIELD = { TILE: { W: 40, H: 16, C: 14, R: 16 }, COLOUR: PAINT.FAWN };
var BATTLE = { STATE: { PAUSED: 0, MOVING: 1, FIRING: 2, EXPLODING: 3, PLAYER: 0, RIVAL: 4 } };
var STACK = { MAX: 16 };
var THEATRE = { LAND: { COLOUR: PAINT.FAWN,	    LINES: "rgb(223,159,127)" },
		SEA:  { COLOUR: "rgb(015,159,239)", LINES: "rgb(000,111,191)" },
		AIR:  { COLOUR: "rgb(095,223,223)", LINES: "rgb(063,175,255)" }  };
var PRESIDIO = { COUNT: 160, SIZE: 120, GAP: 120, PORT: 0x20, PORTS: 32, WATERFRONT: 64 };
var CANAL = { COLOUR: "rgb(000,175,159)" };
var CLAN = { COUNT: 8 };
var VAULT = { TILE: { W: 30, H: 20, C: 20, R: 30, COUNT: 600, LIGHT: 0, DARK: 1, HIDDEN: 2, MARKER: 4, PILLAR: 8, SWITChOFF: 16, SWITChON: 32 },
	      PILLARS: 100, SWITCHES: 50, COLOUR1: GREY.SILVER, COLOUR2: GREY.ASH, COUNT: 160 };
var UNIT = { SCOUT: 0, GUNNER: 1, BAZOOKER: 2, BAYONETTER: 3,
	     HOWITZER: 4, AV: 5, ROCKEtLAUNCHER: 6, LIGHtTANK: 7, MEDIUmTANK: 8, HEAVyTANK: 9, AAgUN: 10, MISSILeLAUNCHER: 11,
	     SUBMARINE: 12, FRIGATE: 13, CRUISER: 14, BATTLESHIP: 15,
	     HELICOPTER: 16, INTERCEPTOR: 17, FIGHTER: 18, BOMBER: 19,
	     COUNT: 20, SHIELD: 16, CHARGE: 3 };

//Colours
var ClanColours = [ [ "rgb(192,072,080)", "rgb(240,072,072)" ],
		    [ "rgb(248,144,088)", "rgb(248,100,136)" ],
		    [ "rgb(072,056,120)", "rgb(120,120,148)" ],
		    [ "rgb(144,168,248)", "rgb(166,224,248)" ],
		    [ "rgb(064,112,088)", "rgb(072,144,088)" ],
		    [ "rgb(120,200,104)", "rgb(168,232,120)" ],
		    [ "rgb(176,104,104)", "rgb(216,152,072)" ],		//Maroon + custard
		    [ "rgb(248,200,072)", "rgb(248,248,160)" ],
		    [ "rgb(223,223,223)", "rgb(195,195,195)" ]  ];

//--------------------------------------
//---------- IMAGES --------------------

//Testing
var TEST = { RANDOM: 0, GUNNER: 1, WATERWAYS: 2, SCOUTING: 3, PRESIDIO: 4, VAULT: 5, QUESTING: 6, SHIELD: 7 };
var TESTINgIMAGE = { L: 0, T: 0, W: 237, H: 284, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 73, H: 41 }, { L: 1, T: 43, W: 58, H: 54 }, { L: 1, T: 98, W: 58, H: 71 }, { L: 1, T: 170, W: 62, H: 75 },
		   { L: 60, T: 66, W: 58, H: 72 }, { L: 1, T: 246, W: 62, H: 37 }, { L: 75, T: 1, W: 43, H: 64 }, { L: 60, T: 139, W: 58, H: 30 } ];
var TestingDescriptions = [ [ "Random battle" ], [ "Infantry battle" ], [ "Waterway generation demo" ], [ "Scouting demo" ],
			    [ "Presidio drawing demo" ], [ "Vault navigation demo" ], [ "Questing path demo" ], [ "Shield depletion test" ]
			  ];
var PILLArTOpIMAGE = { L: 1, T: 1, W: 20, H: 9 };
var PILLArBASeIMAGE = { L: 1, T: 11, W: 16, H: 4 };
var PILLArMARKErIMAGE = { L: 22, T: 1, W: 20, H: 9 };
var SWITChMARKErIMAGE = { L: 22, T: 11, W: 20, H: 9 };

//---------------------------------------
//---------- SPRITES --------------------

//-- TROOPS --
var SCOUtSPRITE = { L: 1, T: 278, W: 19, H: 28, O: 1 };
var GUNNErSPRITE = { L: 1, T: 1, W: 17, H: 28, O: 1 };
var BAZOOKErSPRITE = { L: 1, T: 30, W: 23, H: 28, O: 1 };
var BAYONETTErSPRITE = { L: 1, T: 307, W: 15, H: 28, O: 1 };
var HORIZONTAlBAYONETTeSPRITE = { L: 288, T: 307, W: 24, H: 5 };
var VERTICAlBAYONETTeSPRITE = { L: 288, T: 313, W: 6, H: 18 };
var DIAGONAlBAYONETTeSPRITE = { L: 295, T: 313, W: 18, H: 18, O: 1 };
var COMMANDANtSPRITE = { L: 1, T: 336, W: 28, H: 28, O: 1 };

var JEEpSPRITE = { L: 1, T: 59, W: 38, H: 31, O: 1 };

//-- VEHICLES --
var LIGHtTANkSPRITE = { L: 1, T: 91, W: 28, H: 20, O: 1 };
var MEDIUmTANkSPRITE = { L: 1, T: 112, W: 33, H: 24, O: 1 };
var HEAVyTANkSPRITE = { L: 1, T: 137, W: 35, H: 25, O: 1 };
var AVsPRITE = { L: 1, T: 163, W: 36, H: 32, O: 1 };
var HOWITZErSPRITE = { L: 1, T: 196, W: 34, H: 26, O: 1 };
var ROCKEtLAUNCHErSPRITE = { L: 1, T: 223, W: 37, H: 27, O: 1 };
var AAgUnSPRITE = { L: 1, T: 251, W: 34, H: 26, O: 1 };
var MISSILeLAUNCHErSPRITE = { L: 1, T: 365, W: 37, H: 21, O: 1 };

//-- VESSELS --
var SUBMARINeSPRITE = { L: 1, T: 398, W: 36, H: 13, O: 1 };
var FRIGATeSPRITE = { L: 1, T: 412, W: 36, H: 21, O: 1 };
var CRUISErSPRITE = { L: 1, T: 434, W: 36, H: 26, O: 1 };
var BATTLESHIpSPRITE = { L: 1, T: 461, W: 37, H: 25, O: 1 };

//-- AIRCRAFT --
var FIGHTErSPRITE = { L: 1, T: 487, W: 38, H: 18, O: 1 };
var BOMBErSPRITE = { L: 1, T: 506, W: 37, H: 20, O: 1 };
var COPTErSPRITE = { L: 352, T: 487, W: 38, H: 29, O: 1 };
var INTERCEPTOrSPRITE = { L: 352, T: 517, W: 35, H: 19, O: 1 };

//-- PROJECTILES --
var BULLEtSPRITE = { L: 486, T: 1, W: 3, H: 3, O: 1 };
var MISSILeSPRITE = { L: 1, T: 387, W: 18, H: 10, O: 1 };

//--------------------------------------
//---------- AGENTS --------------------

var GUNNER = {  SPEED: 0.5, SELECTION: { SHAPE: SHAPE.RECTANGLE }, ANIMATION: { SEQUENCE: [0,1] }, BS: [ [ SHAPE.CIRCLE,    [7,-22,6] ],
									 [ SHAPE.RECTANGLE, [3,-18,8,18] ],
									 [ SHAPE.RECTANGLE, [11,-14,6,4] ] ] };
var BAZOOKER = {  SPEED: 0.5, SELECTION: { SHAPE: SHAPE.RECTANGLE }, ANIMATION: { SEQUENCE: [0,1] }, BS: [ [ SHAPE.CIRCLE,    [9,-22,6] ],
									   [ SHAPE.RECTANGLE, [5,-12,8,12] ],
									   [ SHAPE.RECTANGLE, [0,-19,22,6] ] ] };
var JEEP = {  SPEED: 1.0, SELECTION: { SHAPE: SHAPE.RECTANGLE }, ANIMATION: { SEQUENCE: [0,1] }, 
	      BP: [ [0,-8],[0,-19],[5,-31],[15,-31],[37,-22],[37,-7],[33,0],[7,0] ] };

//--------------------------------------
//---------- AGENTS --------------------

var EXPLOSIOnSPRITE = { L: 486, T: 5, W: 15, H: 15 };
