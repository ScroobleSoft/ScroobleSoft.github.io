
//-- OPTIONS --

var GAMeRADIoOPTIONs = { L: 5, T: 20, W: 119, H: 43, GAP: 4, ORIENT: ORIENTATION.VERTICAL,
								 OPTIONS: [ "Pre-set squads", "Random squads", "Precise positions" ], SELECT: 0 };
var BUDGEtRADIoOPTIONs = { L: 5, T: 120, W: 121, H: 41, GAP: 4, ORIENT: ORIENTATION.VERTICAL,
								 OPTIONS: [ "all zero", "random amounts", "attendance based" ], SELECT: 0 };
var SUBsCHECkBOX = { L: 740, T: 580, W: 15, H: 14, LABEL: "Subs" };
var OPPONENtCHECkBOX = { L: 640, T: 580, W: 15, H: 14, LABEL: "Show Opponent" };

//-- BUTTONS --

var TEAmBUTTON = { W: 117, H: 117 };
var AUToSELECtBUTTON = { L: 420, T: 575, W: 100, H: 20, LW: 2, LABEL: "Auto Select",
								 COLOUR: "rgb(031,095,239)", TEXT: { COLOUR: "rgb(000,207,239)" } };
var CLEArSELECTIONsBUTTON = { L: 540, T: 575, W: 60, H: 20, LW: 2, LABEL: "Clear",
								 COLOUR: "rgb(031,095,239)", TEXT: { COLOUR: "rgb(000,207,239)" } };
var FEATUREdBUTTOnIMAGE = { L: 0, T: 0, W: 94, H: 94, LW: 2, SX: 638, SY: 197 };
var DAILyBUTTOnIMAGE = { L: 0, T: 100, W: 94, H: 94, LW: 2, SX: 638, SY: 197 };
var WEEKLyBUTTOnIMAGE = { L: 0, T: 200, W: 94, H: 94, LW: 2, SX: 638, SY: 197 };
var RANDOmBUTTOnIMAGE = { L: 0, T: 300, W: 94, H: 94, LW: 2, SX: 638, SY: 197 };

//-- PANELS --

var FIXTUReICOnIMAGEs = { L: 109, T: 127, W: 56, H: 158, O: 2, R: 8, C: 1, PATCH: { W: 56, H: 18 } };
var FIXTUREsICOnPANEL = { L: 735, T: 398, W: 62, H: 144, ICONS: 8, ICON: { W: 56, H: 18 }, C: 1, R: 8, PRESS: 0 };
