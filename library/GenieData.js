
var GAME = { PLATFORM: { PHONE: 0x1, TABLET: 0x2, PC: 0x4 }, SCREEN: { EXPANDED: 0x8, FULL: 0x10 }, STATE: {PAUSED: 0x20 },
				 CONTROLLER: { KEYBOARD: 0x40, MOUSE: 0x80, TOUCHSCREEN: 0x100, TRACKPAD: 0x200 }, FLEXIBLE: 0x400,  		//NOTE: Flexible refers to HelpDeck
				 FOgOfWAR: 0x800, TILED: 0x1000, SELECTIONS: 0x2000 };
var CANVAS = { NONE: 0, PRIME: 1, ZOOM: 2, CONSOLE: 3, TICKER: 4, HELP: 5 };
var FRAMES = { FULL: 0, HALF: 1 };
var AXIS = { X: 0, Y: 1, BOTH: 2 };
var ASSET = { AGENT: 0, STRUCTURE: 1, FEATURE: 2 };
var GRADE = { Aplus: 0, A: 1, Aminus: 2, Bplus: 3, B: 4, Bminus: 5, Cplus: 6, C: 7, Cminus: 8, Dplus: 9, D: 10, Dminus: 11,
				  Eplus: 12, E: 13, Eminus: 14, Fplus: 15, F: 16, Fminus: 17, Gplus: 18, G: 19, Gminus: 20, Hplus: 21, H: 22, Hminus: 23,
				  Iplus: 24, I: 25, Iminus: 26, Jplus: 27, J: 28, Jminus: 29, Kplus: 30, BAND: { A: 0, B: 1, C: 2, D: 3, E: 4 } };
var FONT = { STYLE: { NONE: 0, BOLD: 1, ITALICS: 2, UNDERLINED: 4, OVERLINED: 8, LINeTHROUGH: 16 },
				 DEFAULT: "14px Arial" };
var TEXT = { FONT: "14px Arial", COLOUR: "black" };
var CONTROL = { ID: 0, LEFT: 1, TOP: 2 };

var CapitalLetters = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
var CapitalConsonants = "BCDFGHJKLMNPQRSTVWXYZ";
var Vowels = [ "a", "e", "i", "o", "u" ];
var VowelString = "aeiou";
var Consonants = [ "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z" ];
var ConsonantString = "bcdfghjklmnpqrstvwxyz";
var Alphabet = "abcdefghijklmnopqrstuvwxyz";
var DescendingLetters = "gjpqy";

var YEAR = { WEEKS: 52, DAYS: { COMMON: 365, LEAP: 366 } };
var Day = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
var Month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
