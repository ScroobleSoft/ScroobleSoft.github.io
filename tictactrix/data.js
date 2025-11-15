
//---------------------------------------
//---------- BITMAPS --------------------

var TacticalImages = [
	"TacticalSprites.png",
	"TacticalImages.png",
	"TacticalControls.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"design.png",
	"design/MockUp1.png"
];
var IMAGeINDEX = {
	SPRITES:			0,
	IMAGES:			1,
	CONTROLS:		2,
	GENIeIMAGES:	3,
	GENIeCONTROLS:	4,
	DESIGN:			5,
	MOCKUP1:			6
};

//-------------------------------------
//---------- SOUNDS -------------------

//----------------------------------------
//---------- CORE DATA -------------------

var SCREEN = { WIDTH: 400, HEIGHT: 400 };
var INFoBOX = { WIDTH: 250, HEIGHT: 250 };
var CONTROlPANEL = { WIDTH: 146, HEIGHT: 250 };

//----------------------------------------
//---------- GAME DATA -------------------

var TACTICAL = { UNIT: { FOV: 2 } };
var CLAN = { COUNT: 8, NEUTRAL: 8 };
var CITY = { COUNT: { TOTAL: 160, COASTAL: 92, NAVAL: 32, PORTLESS: 128, INLAND: 68, AIR: 32 },
				 PRODUCTION: { TURNS: 3, TYPE: { ARMY: 0, NAVY: 1, AIrFORCE: 2 } } };
var ISLAND = { TINY: 0, SMALL: 1, MEDIUM: 2, LARGE: 3, HUGE: 4, TYPES: 5,
				   SIZE: { TINY: 3, SMALL: 5, MEDIUM: 7, LARGE: 9, HUGE: 11 },
					CITIES: [ 1,5,12,17,28 ] };
var MAP = { W: 2000, H: 2000, ISLANDS: { TINY: 10, SMALL: 8, MEDIUM: 4, LARGE: 2, HUGE: 1 },
				TILE: { C: 50, R: 50, W: 40, H: 40, SHORE: 0, SEA: 1, LAND: 2, SCREEN: { C: 10, R: 10 } },
				COLOUR: { LAND: "rgb(047,175,047)", SEA: "rgb(031,175,223)" } };
var STACK = { ACTION: { MOVE: 0, TRANSFER: 1, TELEPORT: 2, ATTACK: 3, CAPTURE: 4 } };
var ConquerorNames = [ "Pasha Green", "Spahbed Blue", "Shogun Pink", "Marshall Purple", "Khagan Olive", "Czar Yellow", "Sardar Crimson", "Dux Orange",
							  "General Grey" ];

//---------------------------------------
//---------- CONTROLS -------------------

//--------------------------------------
//---------- IMAGES --------------------

var CITyOCTAGOnIMAGEs = { L: 1, T: 35, W: 70, H: 8, O: 2, C: 9, R: 1, PATCH: { W: 8, H: 8 } };

//--------------------------------------
//---------- SPRITES -------------------

//Troopers
var EAStTROOPErSPRITE = { L: 1, T: 1, W: 15, H: 25, O: 2 };
var WEStTROOPErSPRITE = { L: 1, T: 28, W: 15, H: 28, O: 2 };
var FEEtSPRITE = { L: 1, T: 55, W: 10, H: 3, O: 2 };
var RIGHtARmSPRITE = { L: 137, T: 1, W: 5, H: 3 };
var LEFtARmSPRITE = { L: 137, T: 6, W: 5, H: 3 };

//Weapons
var EAStRIFLeSPRITE = { L: 144, T: 1, W: 13, H: 5 };
var WEStRIFLeSPRITE = { L: 144, T: 8, W: 13, H: 5 };
var EAStBAZOOKaSPRITE = { L: 137, T: 15, W: 22, H: 8 };
var WEStBAZOOKaSPRITE = { L: 137, T: 25, W: 22, H: 8 };
var EAStLAUNCHErSPRITE = { L: 137, T: 35, W: 20, H: 9 };
var WEStLAUNCHErSPRITE = { L: 137, T: 46, W: 20, H: 9 };

//Light vehicles
var EAStJEEpSPRITE = { L: 1, T: 74, W: 38, H: 26, O: 2 };
var WEStJEEpSPRITE = { L: 321, T: 74, W: 38, H: 26, O: 2 };
var EAStROCKEtPOdSPRITE = { L: 1, T: 102, W: 37, H: 23, O: 2 };
var WEStROCKEtPOdSPRITE = { L: 313, T: 102, W: 37, H: 23, O: 2 };
var EAStMISSILeLAUNChSPRITE = { L: 1, T: 127, W: 37, H: 23, O: 2 };
var WEStMISSILeLAUNChSPRITE = { L: 313, T: 127, W: 37, H: 23, O: 2 };

//Medium vehicles
var EAStHOWITZErSPRITE = { L: 1, T: 152, W: 31, H: 18, O: 2 };
var WEStHOWITZErSPRITE = { L: 1, T: 265, W: 31, H: 18, O: 2 };
var EAStARTILLERySPRITE = { L: 1, T: 192, W: 34, H: 27, O: 2 };
var WEStARTILLERySPRITE = { L: 1, T: 265, W: 34, H: 27, O: 2 };
var EAStAVsPRITE = { L: 1, T: 221, W: 28, H: 16, O: 2 };
var WEStAVsPRITE = { L: 1, T: 289, W: 28, H: 16, O: 2 };

//---------------------------------
//---------- FX -------------------
