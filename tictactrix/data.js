
//---------------------------------------
//---------- BITMAPS --------------------

var TacticalImages = [
	"TacticalSprites.png",
	"TacticalImages.png",
	"TacticalControls.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"units.png",
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

var TACTICAL = { UNIT: { FOV: 2 }, ASSET: { TILE: 0, STACK: 1, CITY: 2, PLATFORM: 3 } };
var CLAN = { COUNT: 8, NEUTRAL: 8 };
var CITY = { COUNT: { TOTAL: 160, COASTAL: 92, NAVAL: 32, PORTLESS: 128, INLAND: 68, AIR: 32 },
				 PRODUCTION: { TURNS: 3, TYPE: { NONE: -1, ARMY: 0, NAVY: 1, AIrFORCE: 2 } } };
var CityNames = [ "Alif","Bey","Pey","Thay","Tey","Sey","Jeem","Chey","Bari-Hey","Choti-Hey",
						"Khey","Dahl","Daal","Zal","Rey","Rhey","Zey","Xhey","Sien","Shien",
						"Swahd","Zwahd","Toai","Zoai","Ain","Ghain","Fey","Quaf","Kahf","Gahf",
						"Lahm","Meem","Nune","Wao","Yey","Bari-Yey","Hamzah","Zeyr","Zabar","Peysh",
						"Do-Chashmie-Hey","Gol-Hey","Chashm","Maddah","Mahmuz","Tahaji","Haruf","Harf","Ulta-Peysh","Maghnoona"
];
var PLATFORM = { COUNT: 8, PRODUCTION: { TURNS: 8 } };
var ISLAND = { TINY: 0, SMALL: 1, MEDIUM: 2, LARGE: 3, HUGE: 4, TYPES: 5,
				   SIZE: { TINY: 3, SMALL: 5, MEDIUM: 7, LARGE: 9, HUGE: 11 },
					CITIES: [ 1,5,12,17,28 ] };
var MAP = { W: 2000, H: 2000, INFO: { SCALE: INFoBOX.WIDTH/SCREEN.WIDTH },
				ISLANDS: { TINY: 10, SMALL: 8, MEDIUM: 4, LARGE: 2, HUGE: 1 },
				TILE: { C: 50, R: 50, W: 40, H: 40, SEA: 0, SHORE: 1, LAND: 2, SCREEN: { C: 10, R: 10 } },
				COLOUR: { LAND: "rgb(047,175,047)", SEA: "rgb(031,175,223)" } };
var STACK = { ACTION: { MOVE: 0, TRANSFER: 1, TELEPORT: 2, ATTACK: 3, CAPTURE: 4 }, UNITS: { MAX: 8 }, LAND: 0, SEA: 1, AIR: 2,
				  GOAL: { GARRISON: 0, EXPLORATION: 1, COMBAT: 2, CONQUEST: 3, TRANSFER: 4, TELEPORTATION: 5 } };		//TODO: ACION and GOAL may be REDUNDANT
var ConquerorNames = [ "Pasha Green", "Spahbed Blue", "Shogun Pink", "Marshall Purple", "Khagan Olive", "Czar Yellow", "Sardar Crimson", "Dux Orange",
							  "General Grey" ];
var UnitNames = [ "Gunner", "Bazooker", "Missiler", "Jeep", "Rocket Pod", "Missile Launcher", "Howitzer", "Artillery", "AV",
						"Swift Tank", "Hybrid Tank", "Mega Tank", "Frigate", "Cruiser", "Destroyer", "Battleship", "Fighter", "Bomber", "Strafer", "Helicopter" ];
var UnitTurns = [ 2,2,2, 3,3,3, 4,4,4, 4,4,4, 4,4,4,4, 4,4,4,4 ];

//---------------------------------------
//---------- CONTROLS -------------------

//--------------------------------------
//---------- IMAGES --------------------

var CITyOCTAGOnIMAGEs = { L: 1, T: 35, W: 70, H: 8, O: 2, C: 9, R: 1, PATCH: { W: 8, H: 8 } };
var PLATFORmIMAGEs = { L: 26, T: 47, W: 340, H: 36, O: 2, C: 9, R: 1, PATCH: { W: 36, H: 36 } };
var PAdIMAGEs = { L: 1, T: 136, W: 318, H: 38, O: 2, C: 8, R: 1, PATCH: { W: 38, H: 38 } };
var CLEArPAdIMAGEs = { L: 1, T: 176, W: 318, H: 38, O: 2, C: 8, R: 1, PATCH: { W: 38, H: 38 } };
var NoENTRyIMAGE = { L: 1, T: 45, W: 23, H: 23, O: { X: 8, Y: 8 } };

//---------------------------------
//---------- FX -------------------
