
//---------------------------------------
//---------- BITMAPS --------------------

var DominionImages = [
	"DominionSprites.png",
	"DominionImages.png",
	"DominionControls.png",
	"DominionTesting.png",
	"DominionDemo.png",
	"DominionTutorial.png",
	"MiniGames.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"Scratch.png"
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

//-------------------------------------
//---------- SOUNDS -------------------

//------------------------------------------
//---------- CANVAS DATA -------------------

var SCREEN = { WIDTH: 640, HEIGHT: 640, MOBILE: { W: 400, H: 400 } };
var INFoBOX = { WIDTH: 240, HEIGHT: 444, MOBILE: { W: 240, H: 240 } };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 156, MOBILE: { W: 156, H: 240 } };
var TICKER = { WIDTH: 640, HEIGHT: 30 };
var TABLOID = { WIDTH: 240, HEIGHT: 675 };
var SCREEnRECT = { COLOUR: "red", LW: 1 };
var MOBILE = { SCALE: SCREEN.MOBILE.W/SCREEN.WIDTH };
//var MAP = { W: 1800, H: 1800 };						//TODO: this will be editable, not constant

//--------------------------------------
//---------- COLOURS -------------------

//----------------------------------------
//---------- GAME DATA -------------------

const ATTACK = true;
var EXPANSION = { PURCHASE: 0, BENEFICENCE: 1, INVESTING: 2, PACT: 3, SUBVERSION: 4, TREATY: 5, MISSION: 6, CONQUEST: 7, METHODS: 8 };
var MISSION = { SABOTAGE: 0, AIrMISSION: 1, BLOCKADE: 2, CHAMPIONS: 3, INTERDICTION: 4, ICBM: 5, DOGFIGHT: 6, HUNTING: 7, TYPES: 8 };
var NewspaperTitles = [ "Chronicle", "Courant", "Bugle", "Dispatch", "Echo", "Examiner", "Gazette", "Guardian", "Herald", "Independent",
								"Journal", "Mercury", "Metro", "Phoenix", "Post", "Record", "Standard", "Times", "Tribune", "Voice"
];

//---------------------------------------
//---------- CONTROLS -------------------

var ALLIANCeCANCElBUTTON = { L: 280, T: 510, W: 80, H: 25, LABEL: "Cancel", BACKGROUND: "lightgrey", TEXT: { COLOUR: "blue" } };
var ALLIANCeBUTTON = { L: 5, T: 325, W: 110, H: 25, LABEL: "Initiate Alliance", BACKGROUND: "lightgrey", TEXT: { COLOUR: "blue" } };
var TURnBUTTON = { L: 125, T: 325, W: 110, H: 25, LABEL: "Run Fortnight 0", BACKGROUND: "lightgrey", TEXT: { COLOUR: "blue" } };

var NEWsCAROUSEL = { L: 5, T: 5, W: 230, H: 600, COLOUR: { FRAME: "black", BACKGROUND: GREY.LIGHT }, LW: { FRAME: 3, SEPARATOR: 1 }, SPACING: 15,
						   TITLE: { FONT: "bold 14px Arial" }, TEXT: { FONT: "12px Arial" }, GAP: { X: 3, Y: 5 },	F: 180, CLEAR: true };

var SCAnMODeCHECkBOX = { L: 5, T: 250, W: 15, H: 14, LABEL: "Scan Mode" };

var JEtACCURACyMETER = { L: 20, T: 300, W: 200, H: 20, COLOUR: "red", ORIENTATION: ORIENTATION.HORIZONTAL };
var STEpBUTTON = { L: 180, T: 330, W: 50, H: 25, LABEL: "Step", BACKGROUND: "lightgrey", TEXT: { COLOUR: "blue" } };

var ALLIANCeIMAGE = { X: 180, Y: 130, L: 1, T: 49, W: 281, H: 359, SLOT: { C: 2, R: 4, W: 140, H: 90 } };
var MISSIONsIMAGE = { X: 180, Y: 130, L: 284, T: 49, W: 281, H: 359, SLOT: { C: 2, R: 4, W: 140, H: 90 } };

//--------------------------------------
//---------- IMAGES --------------------

var POWErLABElIMAGEs = { L: 944, T: 2, W: 63, H: 158, O: 4, C: 1, R: 9, PATCH: { W: 63, H: 14 } };

//Image Panels
var MINISTRyPANElIMAGE = { L: 505, T: 79, W: 109, H: 187 };
var MINISTRyIMAGePANEL = { L: -1, T: -1, W: 109, H: 187, C: 1, R: 8, PANEL: { W: 109, H: 23 } };

//
var MISSIOnIMAGEs = { L: 838, T: 79, W: 104, H: 174, O: 2, C: 1, R: 8, PATCH: { W: 104, H: 20 } };
var DIPLOMACyPOWERsIMAGE = { L: 944, T: 2, W: 63, H: 158 };
var DIPLOMACyHEADINGsIMAGE = { L: 732, T: 2, W: 158, H: 14 };
var BELLIGERENCeLEGENdIMAGE = { L: 661, T: 45, W: 224, H: 32 };
var ALLIANCeMARKErIMAGE = { L: 327, T: 141, W: 15, H: 15 };

//--------------------------------------
//---------- SPRITES -------------------

var SHIpBOwSPRITE = { L: 37, T: 25, W: 4, H: 12, O: 2, C: 10, R: 3 };
var SHIpOUTLINeSPRITE = { L: 1, T: 157, W: 4, H: 4, O: 2, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 0, Y: -3, W: 4, H: 2 } ] };
var SHIpHULlSPRITE = { L: 13, T: 157, W: 3, H: 4, O: 2, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 0, Y: -3, W: 3, H: 2 } ] };

var ICBMsPRITE = { L: 2, T: 169, W: 22, H: 32, O: 2 };

//---------------------------------
//---------- FX -------------------
