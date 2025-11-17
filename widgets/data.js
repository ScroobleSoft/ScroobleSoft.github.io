
//---------------------------------------
//---------- BITMAPS --------------------

var GalleryImages = [
   "GallerySprites.png",
   "../modules/GenieSprites.png",
   "GalleryImages.png",
   "../modules/GenieImages.png",
   "GalleryDemo.png",
   "MiniGames.png",
   "GalleryTesting.png",
	"scratch.png",
	"facility.png"
];
var IMAGeINDEX = {
   SPRITES: 	  0,
   GENIeSPRITES: 1,
   IMAGES:		  2,
   GENIeIMAGES:  3,
   DEMO:			  4,
   MINiGAMES:	  5,
   TESTING:		  6,
	SCRATCH:		  7,
	FACILITY:	  8
};

//----------------------------------------
//---------- CONTROLS --------------------

var GalleryControls = [
   ["StartButton", "820px",  "615px"],
   ["LoadButton",  "880px",  "615px"],
   ["SaveButton",  "940px",  "615px"],
   ["TestButton",  "1000px", "615px"]
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

//-------------------------------------------
//---------- CANVAS DATA --------------------

var SCREEN = { WIDTH: 800, HEIGHT: 600, MOBILE: { W: 400, H: 400 } };
var INFoBOX = { WIDTH: 240, HEIGHT: 240, MOBILE: { W: 240, H: 240 } };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 360, MOBILE: { W: 156, H: 240 } };

//-----------------------------------------
//---------- GAME DATA --------------------

//Industrialists
var INDUSTRIALIST = { COUNT: 8 };
var FACILITY = { COUNT: 64 };

//------------------------------------------
//---------- IMAGE MAPS --------------------

//Testing
var TEST = { NAVIGATION: 0, DISINTEGRATION: 1, INTERSECTION: 2, FACILITY: 3, MASTERMIND: 4 };
var TESTINgIMAGE = { L: 0, T: 0, W: 237, H: 291, X: 20, Y: 20 };
var TestingMap = [ { L: 1, T: 1, W: 58, H: 50 }, { L: 1, T: 52, W: 58, H: 60 }, { L: 1, T: 113, W: 58, H: 85 }, { L: 1, T: 199, W: 58, H: 71 },
		   { L: 60, T: 1, W: 58, H: 54 } ];
var TestingDescriptions = [ [ "WIMP navigation test" ], [ "WIMP disintegration demo" ], [ "Intersection traffic test" ], [ "Facility design experiment" ],
			    [ "NERD hacking demo" ] ];
//Demo
var DEMO = { FINAL: 0 };
var DEMoIMAGE = { L: 0, T: 0, W: 237, H: 285, X: 20, Y: 20 };
var DemoMap = [ { L:  1, T: 1, W: 58, H: 77 } ];
var DemoDescriptions = [ [ "Capture the final cloche." ] ];

//Mini-games
var MINiGAME = { FINAL: 0 };
var MINiGAMEsIMAGE = { L: 0, T: 0, W: 237, H: 285, X: 20, Y: 20 };
var MiniGamesMap = [ { L:  1, T: 1, W: 58, H: 77 } ];
var MiniGameDescriptions = [ [ "Capture the final cloche." ] ];

//---------------------------------------
//---------- IMAGES ---------------------

//-- LIQUEFIER --

var LIQUEFIErIMAGE = { L: 1, T: 1, W: 1070, H: 128, R: 1, C: 9, PATCH: { W: 118, H: 128 } };
var SLIDINgDOOrIMAGE = { L: 1, T: 227, W: 20, H: 41, O: 1 };
var LIQUEFIErINTERIOrIMAGE = { L: 379, T: 227, W: 20, H: 41, O: 1 };

var POWErSTATIOnIMAGE = { L: 1, T: 130, W: 530, H: 96, R: 1, C: 9, PATCH: { W: 58, H: 96 } };
var SHEdIMAGE = { L: 1, T: 1, W: 1070, H: 128, R: 1, C: 9, PATCH: { W: 118, H: 128 } };
var PORTAlPILLArIMAGE = { L: 1072, T: 1, W: 154, H: 91, R: 2, C: 5, PATCH: { W: 30, H: 45 } };

//---------------------------------------
//---------- SPRITES --------------------

var WIMPsPRITE = { L: 1, T: 206, W: 35, H: 34, O: 1, S: 8, R: 9, C: 8 };
var WIMPcASTOrSPRITE = { L: 289, T: 206, W: 7, H: 7, O: 1 };

//-----

var ROBOtSPRITE = { L: 1, T: 1, W: 36, H: 30, GS: [ [SHAPE.RECTANGLE, "grey", 0, [1,-23,2,4] ],
						    [SHAPE.RECTANGLE, "grey", 0, [1,-14,2,4] ],
						    [SHAPE.RECTANGLE, "grey", 0, [8,-25,20,5] ],
						    [SHAPE.RECTANGLE, "grey", 0, [33,-20,2,4] ],
						    [SHAPE.RECTANGLE, "grey", 0, [33,-11,2,4] ] ]
};

//-- WEAPONS --
var IOnORbSPRITE = { L: 1, T: 32, W: 19, H: 19 };
var PERCUTTErSPRITE = { L: 38, T: 1, W: 14, H: 7 };
var PERCUTTErDIScSPRITE = { L: 21, T: 32, W: 10, H: 10 };

//----------------------------------
//---------- FX --------------------

var FXlISTs = { EXPLOSIONS: 0 };	//NOTE: EXPLOSIONS will likely eventually be different types

//--------------------------------------
//---------- AGENTS --------------------

var WIMP = { SPEED: 0.5, ANIMATION: { SEQUENCE: [0,1,2,1] }, EXPLOSION: FXlISTs.EXPLOSIONS };
