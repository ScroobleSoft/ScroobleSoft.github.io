
var MOUSE = { LEFTBUTTON: 0, RIGHTBUTTON: 2, LEFtBUTTON: 0, RIGHtBUTTON: 2 };
var GAMePAD = { NONE: 0, ARROWS: 1, WASD: 2, NUMERIC: 4, MOUSE: 8, TOUChSCREEN: 16 };
var KEY = { LEFT: 0, UP: 1, RIGHT: 2, DOWN: 3, CLICkLEFT: 4, CLICkRIGHT: 5, COUNT: 6 };
//var ARROwPAD = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, CLICkLEFT: 45, CLICkRIGHT: 46 };
var ARROwPAD = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, CLICkLEFT: 188, CLICkRIGHT: 190 };
var ArrowPadKeys = [ ARROwPAD.LEFT, ARROwPAD.UP, ARROwPAD.RIGHT, ARROwPAD.DOWN, ARROwPAD.CLICkLEFT, ARROwPAD.CLICkRIGHT ]; 
var WASdPAD =  { LEFT: 65, UP: 87, RIGHT: 68, DOWN: 83, CLICkLEFT: 81, CLICkRIGHT: 69 };
var WASdPadKeys = [ WASdPAD.LEFT, WASdPAD.UP, WASdPAD.RIGHT, WASdPAD.DOWN, WASdPAD.CLICkLEFT, WASdPAD.CLICkRIGHT ]; 
var NUMERIcPAD =  { LEFT: 100, UP: 104, RIGHT: 102, DOWN: 98, TOpLEFT: 103, TOpRIGHT: 105, BOTTOmLEFT: 97, BOTTOmRIGHT: 99 };
var NumericPadKeys = [ NUMERIcPAD.LEFT, NUMERIcPAD.UP, NUMERIcPAD.RIGHT, NUMERIcPAD.DOWN, NUMERIcPAD.TOpLEFT, NUMERIcPAD.TOpRIGHT, NUMERIcPAD.BOTTOmLEFT, NUMERIcPAD.BOTTOmRIGHT ]; 
var KEyPRESS = { CONTINUOUS: 0, SINGLeFIRE: 1 };
var KEySTATE = { READY: 0, PRESSED: 1, FIRED: 2 };