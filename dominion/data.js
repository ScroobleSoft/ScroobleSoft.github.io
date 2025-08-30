
//---------------------------------------
//---------- BITMAPS --------------------

var DominionImages = [
	"DominionSprites.png",
	"DominionImages.png",
	"DominionControls.png",
	"bitmaps/OfficeImages.png",
	"bitmaps/Characters.png",
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
	OFFICE:			3,
	CHARACTERS:		4,
	TESTING:			5,
	DEMO:				6,
	TUTORIAL:		7,
	MINiGAMES:		8,
	GENIeIMAGES:	9,
	GENIeCONTROLS: 10,
	SCRATCH:			11
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

//----------------------------------------
//---------- GAME DATA -------------------

const ATTACK = true;

var DOMINION = { GAME: { DAILY: 0, FREeFORM: 1, MULTiCHOICE: 2, SURVIVAL: 3 }, DATE: "2025-08-05",
					  COLOUR: { CITySTATE: "rgb(175,175,255)",
									FOOD: "rgb(223,239,143)", ENTERTAINMENT: "rgb(209,255,095)", ARMS: "rgb(255,175,175)", LAVENOIL: "rgb(175,143,207)",
									BONDS: "rgb(255,239,239)", MEDICINE: "rgb(159,255,255)", GOODS: "rgb(191,223,239)", SURVEILLANCE: "rgb(255,223,111)",
									OFFICE: { WOOD: "rgb(063,015,000)", EDGE: "rgb(031,000,000)", DOOR: { PANEL: GREY.SILVER } },
									VIRIDIAN: "rgb(000,127,063)", YELLOW: "rgb(255,239,000)"
								 },
					  CHARACTER: { STATE: { QUIET: 0, TALKING: 1 },
										FACE: { M: { X: 19, Y: 8 }, F: { X: 19, Y: 3 } }, HAIR: { M: -6, F: 0, LONG: { X: 13, Y: 34 } },
										EYEBROW: { L: { X: 14, Y: 19 }, R: { X: 35, Y: 19 } }, NOSE: { X: 27, Y: 32 },
										MOUTH: { X: 24, Y: 47, STATE: { CLOSED: 0, OPEN: 1 } },
										EYE: { L: { X: 13, Y: 23 }, R: { X: 34, Y: 23 }, STATE: { OPEN: 0, CLOSING: 1, CLOSED: 2, OPENING: 3 } },
										TIE: { X: 43, Y: 70 },
										BITS: { GENDER: 0, HAIR: { S: 3, E: 1 }, FACE: { S: 6, E: 4 }, EYES: { S: 12, E: 7 }, NOSE: { S: 15, E: 13 } }
												//TODO: more bits needed for different face and hair types
									 },
					  TURNS: { SHORT: 17, MEDIUM: 34, LONG: 51 }, FORTNIGHTS: 100
};
var SITUATION = { OFFER: 0, PROPOSAL: 1, INVESTMENT: 2, BOND: 3, INTRIGUE: 4, MISSION: 5, BLOCKADE: 6, INVASION: 7, TYPES: 8,					//Standard
						OIL: 8, CULT: 9, SOVEREIGNITY: 10, INTERVENTION: 11, SPLINTERING: 12, SECESSION: 13, ACCESSION: 14, DISSIDENT: 15 };		//Rare
var BONDS = { TYPES: 10 };
var OIL = { INDIGOIL: 0, LAPISOIL: 1, COBALOIL: 2, CERULOIL: 3, AZUROIL: 4, MAGENOIL: 5, BOYSENOIL: 6, PAISLIOIL: 7, TYPES: 8 };
var Oils = [ "Indigoil", "Lapisoil", "Cobaloil", "Ceruloil", "Azuroil", "Magenoil", "Boysenoil", "Paislioil" ];
var NewspaperTitles = [ "Chronicle", "Courant", "Bugle", "Dispatch", "Echo", "Examiner", "Gazette", "Guardian", "Herald", "Independent",
								"Journal", "Mercury", "Metro", "Phoenix", "Post", "Record", "Standard", "Times", "Tribune", "Voice"
];
var Profanities = [ "sineP", "gin", "noroM", "renoB", "kuf", "cuf", "gaf", "par", "cid", "kid", "tit", "muc", "gav" ];

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
var ALLIEdLABElIMAGEs = { L: 1, T: 367, W: 566, H: 142, O: 4, C: 8, R: 9, PATCH: { W: 69, H: 14 } };

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
