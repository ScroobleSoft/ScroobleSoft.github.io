
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
	"bitmaps/Guide.png",
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
	GUIDE:			11,
	SCRATCH:			12
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

var DOMINION = { GAME: { RANDOM: 0, DAILY: 1, FREeFORM: 2, MULTiCHOICE: 4, SURVIVAL: 8 }, DATE: "2025-08-05",
					  COLOUR: { CITySTATE: "rgb(175,175,255)",
									FOOD: "rgb(223,239,143)", ENTERTAINMENT: "rgb(209,255,095)", ARMS: "rgb(255,175,175)", LAVENOIL: "rgb(175,143,207)",
									BONDS: "rgb(255,239,239)", MEDICINE: "rgb(159,255,255)", GOODS: "rgb(191,223,239)", SURVEILLANCE: "rgb(255,223,111)",
									OFFICE: { WOOD: "rgb(063,015,000)", EDGE: "rgb(031,000,000)", DOOR: { PANEL: GREY.SILVER } }, LINK: "rgb(047,079,175)",
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
					  TURNS: { SHORT: 40, MEDIUM: 70, LONG: 100 }, VOTES: { SHORT: 20, MEDIUM: 35, LONG: 50 }, FORTNIGHTS: 100, YEARS: 4
};
var SITUATION = { OFFER: 0, PROPOSAL: 1, INVESTMENT: 2, BONDS: 3, AID: 4, CONQUEST: 5, PEACEKEEPING: 6, DISASTER: 7,							//Common -		40%
						INTRIGUE: 8, PACT: 9, PURCHASE: 10, TREATY: 11, SOVEREIGNITY: 12, AUCTION: 13, DRAFT: 14, SATELLITE: 15,					//Occasional - 30%
						BLOCKADE: 16, CHAMPIONS: 17, DOGFIGHT: 18, HUNTING: 19, ICBM: 20, INTERDICTION: 21, SABOTAGE: 22, STRIKE: 23,			//Unusual -		20%
						OIL: 24, CULT: 25, INTERVENTION: 26, SPLINTERING: 27, SECESSION: 28, ACCESSION: 29, DISSIDENT: 30,	COUP: 31,			//Rare -			10%
						COUP: 32,
						TYPES: { COMMON: 0, OCCASIONAL: 1, UNUSUAL: 2, RARE: 3 }, BANDS: 4, BAND: { SLOTS: 8, COMMON: 8, OCCASIONAL: 16, UNUSUAL: 24, RARE: 32 } };
var Situations = [ "Alliance offer", "Alliance proposal", "Investment", "Bonds", "Research grant", "Conquest", "Peacekeeping mission", "Disaster assistance",
						 "Internal interference", "Defence Pact", "Nation purchase", "Treaty", "Sovereignity claim", "Auction", "Draft", "Satellite hacking",
						 "Port blockade", "Champions' challenge", "Dogfight contest", "Hunting pirates", "ICBM", "Interdiction", "Sabotage", "Air strike",
						 "Oil discovery", "Cult threat", "Intervention", "Allied splintering", "Seceding province", "Dissident refuge", "Peacekeeping mission" ];
var BONDS = { TYPES: 10 };
var OIL = { INDIGOIL: 0, LAPISOIL: 1, COBALOIL: 2, CERULOIL: 3, AZUROIL: 4, MAGENOIL: 5, BOYSENOIL: 6, PAISLIOIL: 7, TYPES: 8 };
var Oils = [ "Indigoil", "Lapisoil", "Cobaloil", "Ceruloil", "Azuroil", "Magenoil", "Boysenoil", "Paislioil" ];
var NewspaperTitles = [ "Chronicle", "Courant", "Bugle", "Dispatch", "Echo", "Examiner", "Gazette", "Guardian", "Herald", "Independent",
								"Journal", "Mercury", "Metro", "Phoenix", "Post", "Record", "Standard", "Times", "Tribune", "Voice"
];
var Profanities = [ "sineP", "gin", "noroM", "renoB", "cuf", "kuf", "quf", "gaf", "par", "cid", "kid", "tit", "muc", "gav", "coc", "koc", "qoc",
						  "cok", "kok", "qok", "qoc", "qok", "qoq", "naruQ" ];
						//"cixoT"?

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
