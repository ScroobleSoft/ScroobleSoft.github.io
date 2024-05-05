
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

//-------------------------------------
//---------- CANVAS -------------------

var SCREEN = { WIDTH: 360, HEIGHT: 600 };

//---------------------------------------
//---------- CONTROLS -------------------

//Images
var LEXiPUShBUTTOnIMAGEs = { L: 1, T: 1, W: 322, H: 160, O: 2, C: 2, R: 1, PATCH: { W: 160, H: 160 } };
var CRACKLePUShBUTTOnIMAGE = { L: 1, T: 163, W: 150, H: 150 };
var SHUFFLePUShBUTTOnIMAGE = { L: 153, T: 163, W: 150, H: 150 };
var SPINDLePUShBUTTOnIMAGE = { L: 323, T: 2, W: 150, H: 150 };
var JIGGLePUShBUTTOnIMAGE = { L: 381, T: 154, W: 150, H: 150 };
var CROSSLePUShBUTTOnIMAGE = { L: 475, T: 2, W: 150, H: 150 };
var BUNDLePUShBUTTOnIMAGE = { L: 533, T: 154, W: 150, H: 150 };

//Push buttons
var CRACKLePUShBUTTON = { L: 10, T: 10, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var SHUFFLePUShBUTTON = { L: 190, T: 10, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var CROSSLePUShBUTTON = { L: 10, T: 210, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var JIGGLePUShBUTTON = { L: 190, T: 210, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var SPINDLePUShBUTTON = { L: 10, T: 410, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };
var BUNDLePUShBUTTON = { L: 190, T: 410, W: 160, H: 160, LW: 5, BACKGROUND: PAINT.SKY };

//Buttons
var HINtBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Hint", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var SOLVeBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Solve", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var RESTARtBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Restart", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var QUItBUTTON = { L: -1, T: -1, W: 60, H: 25, LW: 3, LABEL: "Quit", COLOUR: GREY.ASH, BACKGROUND: GREY.ASH, STYLE: BUTTON.STYLE.ROUNDED };
var INSTRUCTIONsBUTTON = { L: -1, T: -1, W: 120, H: 25, LW: 3, LABEL: "Instructions", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED };
var CROSSLeBUTTOnCORNErIMAGEs = { L: 305, T: 295, W: 18, H: 3, O: 2, R: 1, C: 4, PATCH: { W: 3, H: 3 } };


//Icons
var EXPANdICOnIMAGE = { L: 305, T: 235, W: 46, H: 18 };
var EXPANdICON = { L: -1, T: -1, W: 52, H: 24, LW: 3, COLOUR: GREY.LIGHT };
var CONTROLLErICOnIMAGE = { L: 305, T: 255, W: 63, H: 18 };
var CONTROLLErICON = { L: -1, T: -1, W: 69, H: 24, LW: 3, COLOUR: GREY.LIGHT };
var FULlSCREEnICOnIMAGE = { L: 305, T: 275, W: 68, H: 18 };
var FULlSCREEnICON = { L: -1, T: -1, W: 74, H: 24, LW: 3, COLOUR: GREY.LIGHT };

var LEXiCONTROLLER = { L: 368, T: 480, W: 272, H: 272, KEY: { O: 4 } };

//--------------------------------------
//---------- IMAGES --------------------

var SHUFFLeLETTErIMAGEs = { L: 1, T: 1, W: 308, H: 60, O: 4, C: 13, R: 2, PATCH: { W: 20, H: 28 } };
var SHUFFLeTILEIMAGEs = { L: 1, T: 63, W: 74, H: 36, O: 2, C: 2, R: 1, PATCH: { W: 36, H: 36 } };
var MEDIUmLETTErIMAGES = { L: 1, T: 235, W: 154, H: 30, O: 2, C: 13, R: 2, PATCH: { W: 10, H: 14 } };

//---------------------------------
//---------- FX -------------------

