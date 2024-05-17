
//---------------------------------------
//---------- BITMAPS --------------------

var SlideImages = [
	"SlideControls.png",
	"../library/GenieControls.png",
	"sale/sale.png"
];
var IMAGeINDEX = {
	CONTROLS:		0,
	GENIeCONTROLS: 1,
	SALE:				2
};

//----------------------------------------
//---------- CONTROLS --------------------

//----------------------------------------
//---------- CORE DATA -------------------

var SCREEN = { WIDTH: 360, HEIGHT: 600 };

//----------------------------------------
//---------- GAME DATA -------------------

//---------------------------------------
//---------- CONTROLS -------------------

//--------------------------------------
//---------- IMAGES --------------------

var Art = [ "paintings/125.jpg", "paintings/112.jpg", "paintings/113.jpg", "paintings/114.jpg", "paintings/115.jpg", "paintings/116.jpg",
				"paintings/122.jpg", "paintings/118.jpg", "paintings/119.jpg", "paintings/120.jpg",	"paintings/121.jpg", "paintings/123.jpg",
				"paintings/124.jpg", "paintings/111.jpg"
];

//--------------------------------------
//---------- SPRITES -------------------

//-----------------------------------
//---------- VIEW -------------------

var VIEW = { SALE: { COLOUR: PASTEL.OFfWHITE, PICS: 14, PAGE: { COUNT: 3, PICS: 6 },
							BUTTON: { MORE: { L: 295, T: 10, W: 55, H: 31, SX: 84, SY: 124, LW: 3, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: PASTEL.OFfWHITE },
										 BACK: { L: 240, T: 10, W: 49, H: 31, SX: 135, SY: 124, LW: 3, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: PASTEL.OFfWHITE }
									  },
							IMAGE: { THUMBNAILS: { L: 3, T: 3, W: 486, H: 649, O: 3, C: 3, R: 4, PATCH: { W: 160, H: 160 } } },
						 },
				 DETAILS: { L: 0, T: 0, W: 360, H: 600, COLOUR: PAINT.SKY,
								BUTTON: { OK: { L: 290, T: 560, W: 50, H: 35, LW: 3, LABEL: "Ok", BACKGROUND: PAINT.SKY, STYLE: BUTTON.STYLE.RAISED } }
							 }
};
