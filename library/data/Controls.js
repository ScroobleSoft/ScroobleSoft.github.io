
//-- BUTTONS --

var SHALLOwBUTTOnCORNErIMAGEs = { L: 2, T: 30, W: 14, H: 2, O: 2, R: 1, C: 4, PATCH: { W: 2, H: 2 } };
var RAISEdBUTTOnCORNErIMAGEs = { L: 18, T: 30, W: 18, H: 3, O: 2, R: 1, C: 4, PATCH: { W: 3, H: 3 } };
var ROUNDEdBUTTOnCORNErIMAGEs = { L: 2, T: 35, W: 38, H: 3, O: 2, R: 1, C: 8, PATCH: { W: 3, H: 3 } };

var BUTTON = { STYLE: { PLAIN: 0, SHALLOW: 1, RAISED: 2, ROUNDED: 3, KEyPAD: 4, OCTAGONAL: 5 },
					STATE: { DISABLED: 0, ENABLED: 1, PUSHED: 2 }, ANIMATED: { F: 15, TOGGLED: false } };

var NEwGAMeBUTTON =   { L:   8, T:  18, W: 96, H: 64, COLOUR: BLUE.INDIGO, LABEL: "New Game",   TEXT: { COLOUR: "white", FONT: "18px Arial" } };
var TUTORIAlBUTTON =  { L: 124, T:  18, W: 96, H: 64, COLOUR: BLUE.INDIGO, LABEL: "Tutorial",   TEXT: { COLOUR: "white", FONT: "18px Arial" } };
var DEMoBUTTON =      { L:   8, T: 101, W: 96, H: 64, COLOUR: BLUE.INDIGO, LABEL: "Demo",       TEXT: { COLOUR: "white", FONT: "18px Arial" } };
var MINiGAMEsBUTTON = { L: 124, T: 101, W: 96, H: 64, COLOUR: BLUE.INDIGO, LABEL: "Mini-Games", TEXT: { COLOUR: "white", FONT: "18px Arial" } };

//-- ICONS--

var ICOnCORNErIMAGEs = { L: 2, T: 40, W: 38, H: 3, O: 2, R: 1, C: 8, PATCH: { W: 3, H: 3 } };
var ICON = { COLOUR: { MAIN: GREY.ASH, LIGHT: GREY.LIGHT, DARK: GREY.DARK } };

//-- OPTIONS --

var RADIoCONTROlIMAGE = { L: 79, T: 16, W: 23, H: 11, O: 1, R: 1, C: 2, PATCH: { W: 11, H: 11 } };
var RADIoCONTROlUnCHECKEdIMAGE = { L: 53, T: 16, W: 12, H: 12 };	//TODO: make REDUNDANT
var RADIoCONTROlCHECKEdIMAGE = { L: 66, T: 16, W: 12, H: 12 };		//TODO: make REDUNDANT
var CHECkBOxCHECKEdIMAGE = { L: 97, T: 1, W: 15, H: 14 };		//TODO: replace this and one below with one specs entry
var CHECkBOxUnCHECKEdIMAGE = { L: 113, T: 1, W: 15, H: 14 };
var CHECkBOxIMAGE = { L: 97, T: 1, W: 15, H: 14, O: 1, R: 1, C: 2, PATCH: { W: 15, H: 14 } };
var DROpLIStBUTTOnIMAGE = { L: 1, T: 28, W: 23, H: 21, O: 1, R: 1, C: 2, PATCH: { W: 23, H: 21 } };
var SCROLlBArARROWsIMAGE = { L: 1, T: 71, W: 79, H: 17, O: 1, R: 1, C: 4, PATCH: { W: 19, H: 17 } };
var SCROLlBArTHUMbIMAGE = { L: 81, T: 71, W: 19, H: 11, O: 1, R: 3, C: 1, PATCH: { W: 19, H: 3 } };
var PAGeNUMBERsIMAGE = { L: 1, T: 50, W: 229, H: 20 };
var SCROLLER = { W: 72, H: 52, GAP: 38, BUTTON: { W: 72, H: 17 }, INDEX: { O: { X: 2, Y: 19 }, W: 68, H: 17, LW: 1, COLOUR: "black" } };
var SCROLLErBUTTOnIMAGEs = { L: 182, T: 283, W: 72, H: 74, O: 2, C: 1, R: 4, PATCH: { W: 72, H: 17 }, BACKGROUND: GREY.LIGHT };

var RADIoCONTROlSPRITE = { L: 53, T: 16, W: 12, H: 12, O: 1, S: 2 };

//-- MOBILE CONTROLLER --

var MOBILeCONTROlIMAGEs = { L: 2, T: 84, W: 196, H: 196, O: 2, R: 3, C: 3, PATCH: { W: 64, H: 64 } };
var MOBILeCONTROlEDGeIMAGEs = { L: 2, T: 282, W: 178, H: 88, O: 2, R: 1, C: 2, PATCH: { W: 88, H: 88 } };
var MOBILeCONTROLLER = { BUTTONS: 9, KEY: { L: -1, T: -1, W: 88, H: 88, LW: 12, C: 3, R: 3 } };

//-- GUI --

var DROpDOWnLIST = { FIELD: { W: 100, H: 23 }, BUTTON: { W: 23, H: 21 }, ENTRY: { H: 15 } };
var LIStBOX = { COLOUR: { SELECTION: GREY.MEDIUM, PAGE: "rgb(000,175,239)" } };
var GENIeRADIoCONTROL = { SX: 79, SY: 16, W: 11, H: 11, O: 1 };		//TODO: this and below
var GENIeCHECkBOX = { L: 79, T: 16, W: 11, H: 11, O: 1 };		//	maybe REDUNDANT
var PAGINATION = { PATCH: { W: 18, H: 18, }, COLOUR: { STRIP: "rgb(175,191,191)", SELECTION: "rgb(127,127,127)", PAGE: "rgb(000,175,239)" } };
var TOUChBAR = { COLOUR: { KEY: "rgb(175,191,191)", SELECTION: "rgb(063,191,223)" } };			 
var TABS = { COLOUR: { TAB: "lightgray", PAGE: "white" } };
var SPInCONTROlBUTTOnIMAGEs = { L: 102, T: 72, W: 54, H: 10, O: 2, C: 4, R: 1, PATCH: { W: 12, H: 10 } };

var SLIDER = { BOOKENDT: 1, BOOKENDL: 1, BOOKENDW: 7, BOOKENDH: 25, RANGET: 1, RANGEL: 9, RANGEW: 7, RANGEH: 25, THUMBT: 1, THUMBL: 17, THUMBW: 8, THUMBH: 15, TICKT: 1, TICKL: 26, TICKW: 1, TICKH: 5 };

//var TABS = { W: 60, H: 20, COLOUR: "lightgray", PAGeCOLOUR: "white", OUTLINeCOLOUR: "gray", ROwHEIGHT: 20 };
var SCROLlUpARROwIMAGE = { L: 1, T: 1, W: 11, H: 11 };
var SCROLlDOWnARROwIMAGE = { L: 13, T: 1, W: 11, H: 11 };

//-- WIDGETS --

var DIGItBUTTONsIMAGE = { L: 101, T: 71, W: 51, H: 10, O: 1, C: 4, R: 1, PATCH: { W: 12, H: 10 } };

//TODO: DASHBOARD AND TICKER both may seem REDUNDANT, but TICKER had been removed, but is needed in GenieTicker, so dilemma needs to be resolved
var DASHBOARD = { COLOUR: { BACKGROUND: "red", FRAME: "black", TEXT: "white" }, STATE: { PAUSED: 0, SCROLLING: 1, FLASHING: 2 }, F: 1 };
var TICKER = { COLOUR: { BACKGROUND: "red", FRAME: "black", TEXT: "white" }, STATE: { PAUSED: 0, SCROLLING: 1, FLASHING: 2 }, F: 1 };
var DECK = { STATE: { STATIC: 0, SCROLLING: 1, PAUSED: 2 }, F: 180 };  //.F is for paused state
