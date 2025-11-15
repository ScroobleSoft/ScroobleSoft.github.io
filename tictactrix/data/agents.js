
var TACTICAlUNIT = { GUNNER: 0, BAZOOKER: 1, MISSILER: 2,
							JEEP: 3, ROCKEtPOD: 4, MISSILeLAUNCHER: 5, HOWITZER: 6, ARTILLERY: 7, AV: 8, SWIFtTANK: 9, HYBRIdTANK: 10, MEGaTANK: 11,
							FRIGATE: 12, CRUISER: 13, DESTROYER: 14, BATTLESHIP: 15, HELICOPTER: 16, STRAFER: 17, FIGHTER: 18, BOMBER: 19, TYPES: 20,
							TYPE: { LAND: 21, SEA: 22, AIR: 23 }, VARIETIES: { LAND: 12, SEA: 4, AIR: 4 }
};
var TROOPER = { SHIELD: 2, RELOAD: 4,
					 ARM: { E: { X: 4, Y: -8 }, W: { X:  7, Y: -8 } }, FEET: { E: { X: 3, Y: 3 }, W: { X: 2, Y: 3 } }, OFFSET: { X: 12, Y: 34 } };
var GUNNER = { POTENCY: "C-", GUN: { E: { X: 4, Y:  -6 }, W: { X: -2, Y: -6 } } };
var BAZOOKER = { POTENCY: "C", BAZOOKA: { E: { X: -3, Y: -8 }, W: { X: -4, Y: -8 } } };
var MISSILER = { POTENCY: "C+", LAUNCHER: { E: { X: -4, Y: -9 }, W: { X: 0, Y: -9 } } };
var JEEP = { POTENCY: "B-", WHEEL: { B: { X: 4, Y: 7 }, F: { X: 23, Y: 7 } } };
var ROCKEtPOD = { POTENCY: "B", WHEEL: { L: { X: 1, Y: 10 }, C: { X: 13, Y: 10 }, R: { X: 25, Y: 10 } } };
var MISSILeLAUNCHER = { POTENCY: "B+", WHEEL: { L: { X: 1, Y: 10 }, C: { X: 13, Y: 10 }, R: { X: 25, Y: 10 } } };
var HOWITZER = {};
var ARTILLERY = {};
var AV = {};
var SWIFtTANK = {};
var HYBRIdTANK = {};
var MEGaTANK = {};
var FRIGATE = {};
var CRUISER = {};
var DESTROYER = {};
var BATTLESHIP = {};
var HELICOPTER = {};
var STRAFER = {};
var FIGHTER = {};
var BOMBER = {};
