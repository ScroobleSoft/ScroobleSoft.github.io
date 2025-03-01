
//---------------------------------------
//---------- BITMAPS --------------------

var LexiImages = [
	"LexiImages.png",
	"LexiControls.png",
	"Instructions.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png"
];
var IMAGeINDEX = {
	IMAGES:			0,
	CONTROLS:		1,
	INSTRUCTIONS:	2,
	GENIeIMAGES:	3,
	GENIeCONTROLS: 4
};

//-------------------------------------
//---------- SOUNDS -------------------

//----------------------------------------
//---------- CORE DATA -------------------

var SCREEN = { WIDTH: 360, HEIGHT: 600 };
var LEXI = { SHAMROCK: "rgb(000,143,063)", JADE: "rgb(095,207,063)", LIME: "rgb(191,255,047)", SCARLET: "rgb(255,000,000)",								//SADDLE
				 MAROON: "rgb(159,047,000)", RED: "rgb(207,000,000)", ORANGE: "rgb(239,095,015)", GOLD: "rgb(255,191,031)", YELLOW: "rgb(255,239,111)"
};

//---------------------------------------
//---------- CONTROLS -------------------

//Images
var LEXiPUShBUTTOnIMAGEs = { L: 1, T: 1, W: 322, H: 160, O: 2, C: 2, R: 1, PATCH: { W: 160, H: 160 } };
var CRACKLePUShBUTTOnIMAGE = { L: 1, T: 163, W: 150, H: 150 };
var SHUFFLePUShBUTTOnIMAGE = { L: 153, T: 163, W: 150, H: 150 };
var CROSSLePUShBUTTOnIMAGE = { L: 475, T: 2, W: 150, H: 150 };
var TURTLePUShBUTTOnIMAGE = { L: 533, T: 154, W: 150, H: 150 };
var SPINDLePUShBUTTOnIMAGE = { L: 323, T: 2, W: 150, H: 150 };
var FIDDLePUShBUTTOnIMAGE = { L: 381, T: 154, W: 150, H: 150 };

//Push buttons
var CRACKLePUShBUTTON = { L:  10, T:  10, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var SHUFFLePUShBUTTON = { L: 190, T:  10, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var CROSSLePUShBUTTON = { L:  10, T: 210, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var TURTLePUShBUTTON =  { L: 190, T: 210, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var SPINDLePUShBUTTON = { L:  10, T: 410, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var FIDDLePUShBUTTON =  { L: 190, T: 410, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };

//Buttons
var HINtBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Hint", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var SOLVeBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Solve", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var RESTARtBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Restart", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var QUItBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Quit", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var INSTRUCTIONsBUTTON = { L: -1, T: -1, W: 120, H: 25, LW: 3, LABEL: "Instructions", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED };
var CROSSLeBUTTOnCORNErIMAGEs = { L: 305, T: 295, W: 18, H: 3, O: 2, R: 1, C: 4, PATCH: { W: 3, H: 3 } };

//Icons
var GREyICOnCORNErIMAGEs = { L: 325, T: 295, W: 38, H: 3, O: 2, R: 1, C: 8, PATCH: { W: 3, H: 3 } };
var EXPANdICOnIMAGE = { L: 305, T: 235, W: 46, H: 18 };
var EXPANdICON = { L: -1, T: -1, W: 52, H: 24, LW: 3, COLOUR: GREY.LIGHT };
var CONTROLLErICOnIMAGE = { L: 305, T: 255, W: 63, H: 18 };
var CONTROLLErICON = { L: -1, T: -1, W: 69, H: 24, LW: 3, COLOUR: GREY.LIGHT };
var FULlSCREEnICOnIMAGE = { L: 305, T: 275, W: 68, H: 18 };
var FULlSCREEnICON = { L: -1, T: -1, W: 74, H: 24, LW: 3, COLOUR: GREY.LIGHT };

var LEXiKEYBOARD = { ROWS: [ 0,10,19 ], OFFSETS: [ 0,18,54 ],
							KEY: { COUNT: 26, W: 32, H: 32, O: { UnPRESSED: { X: 8, Y: 6 }, PRESSED: { X: 5, Y: 2 } }, LW: 3, GAP: 4,
									 STATE: { UnPRESSED: 0, CLICKED: 1, SINGLeCLICKED: 2, DOUBLeCLICKED: 3, PRESSED: 4 } },
							IMAGE: { KEY: { BUTTONS: { L: 490, T: 131, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } },
												 LETTERS: { L: 368, T: 187, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } },
												 PRESSED: { L: 362, T: 234, W: 154, H: 30, O: 2, C: 13, R: 2, PATCH: { W: 10, H: 14 } }
											  }
									 }
};
var LEXiCONTROLLER = { L: 368, T: 480, W: 272, H: 272, KEY: { O: 4 } };

//--------------------------------------
//---------- IMAGES --------------------

var SHUFFLeLETTErIMAGEs = { L: 1, T: 1, W: 308, H: 60, O: 4, C: 13, R: 2, PATCH: { W: 20, H: 28 } };
var SHUFFLeTILEIMAGEs = { L: 1, T: 63, W: 74, H: 36, O: 2, C: 2, R: 1, PATCH: { W: 36, H: 36 } };
var MEDIUmLETTErIMAGES = { L: 1, T: 235, W: 154, H: 30, O: 2, C: 13, R: 2, PATCH: { W: 10, H: 14 } };
var KEyBUTTOnIMAGES = { L: 490, T: 131, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } };
var KEyLETTErIMAGES = { L: 368, T: 187, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } };
var KEyPRESSEdIMAGES = { L: 362, T: 234, W: 154, H: 30, O: 2, C: 13, R: 2, PATCH: { W: 10, H: 14 } };

//---------------------------------
//---------- FX -------------------
