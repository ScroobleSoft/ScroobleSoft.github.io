
var TACTICAlUNIT = { GUNNER: 0, BAZOOKER: 1, MISSILER: 2,
							JEEP: 3, ROCKEtPOD: 4, MISSILeLAUNCHER: 5, HOWITZER: 6, ARTILLERY: 7, AV: 8, SWIFtTANK: 9, HYBRIdTANK: 10, MEGaTANK: 11,
							FRIGATE: 12, CRUISER: 13, DESTROYER: 14, BATTLESHIP: 15, HELICOPTER: 16, STRAFER: 17, FIGHTER: 18, BOMBER: 19, TYPES: 20,
							TYPE: { LAND: 21, SEA: 22, AIR: 23 }, VARIETIES: { LAND: 12, SEA: 4, AIR: 4, PORTLESS: 16 }
};
var TROOPER = { SHIELD: 2, RELOAD: 4,
					 ARM: { E: { X: 4, Y: -8 }, W: { X:  7, Y: -8 } }, FEET: { E: { X: 3, Y: 3 }, W: { X: 2, Y: 3 } }, OFFSET: { X: 12, Y: 34 } };
var GUNNER = { POTENCY: "D-", GUN: { E: { X: 4, Y:  -6 }, W: { X: -2, Y: -6 } } };
var BAZOOKER = { POTENCY: "D", BAZOOKA: { E: { X: -3, Y: -8 }, W: { X: -4, Y: -8 } } };
var MISSILER = { POTENCY: "D+", LAUNCHER: { E: { X: -4, Y: -9 }, W: { X: 0, Y: -9 } } };
var JEEP = { POTENCY: "C-", WHEEL: { B: { X: 4, Y: 5 }, F: { X: 23, Y: 5 } }, OFFSET: { X: 1, Y: 32 } };
var ROCKEtPOD = { POTENCY: "C", WHEEL: { L: { X: 1, Y: 9 }, C: { X: 13, Y: 9 }, R: { X: 25, Y: 9 } }, OFFSET: { X: 1, Y: 28 } };
var MISSILeLAUNCHER = { POTENCY: "C+", WHEEL: { L: { X: 1, Y: 9 }, C: { X: 13, Y: 9 }, R: { X: 25, Y: 9 } }, OFFSET: { X: 1, Y: 28 } };
var HOWITZER = { POTENCY: "B-", TREAD: { E: { X: -4, Y: 6 }, W: { X: 7, Y: 6 } }, OFFSET: { X: 3, Y: 31 } };
var ARTILLERY = { POTENCY: "B", TREAD: { E: { X: -4, Y: 6 }, W: { X: -1, Y: 6 } }, OFFSET: { X: 2, Y: 31 } };
var AV = { POTENCY: "B+", TREAD: { X: -2, Y: 6 }, OFFSET: { X: 1, Y: 31 } };
var SWIFtTANK = { POTENCY: "A-", TRACK: { X: 0, Y: 7 }, OFFSET: { X: 6, Y: 30 } };
var HYBRIdTANK = { POTENCY: "A", TRACK: { X: -1, Y: 7 }, OFFSET: { X: 2, Y: 30 } };
var MEGaTANK = { POTENCY: "A+", TRACK: { E: { X: 0, Y: 7 }, W: { X: 5, Y: 7 } }, OFFSET: { X: 2, Y: 30 } };
var FRIGATE = { OFFSET: { X: 2, Y: 37 } };
var CRUISER = { OFFSET: { X: 2, Y: 37 } };
var DESTROYER = { OFFSET: { X: 2, Y: 37 } };
var BATTLESHIP = { OFFSET: { X: 1, Y: 37 } };
var HELICOPTER = { OFFSET: { X: 1, Y: 37 } };
var STRAFER = { OFFSET: { X: 1, Y: 37 } };
var FIGHTER = { OFFSET: { X: 1, Y: 37 } };
var BOMBER = { OFFSET: { X: 1, Y: 37 } };
