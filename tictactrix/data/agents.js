
var TACTICAlUNIT = { GUNNER: 0, BAZOOKER: 1, MISSILER: 2,
							JEEP: 3, ROCKEtPOD: 4, MISSILeLAUNCHER: 5, HOWITZER: 6, ARTILLERY: 7, AV: 8, SWIFtTANK: 9, HYBRIdTANK: 10, MEGaTANK: 11,
							FRIGATE: 12, CRUISER: 13, DESTROYER: 14, BATTLESHIP: 15, HELICOPTER: 16, STRAFER: 17, FIGHTER: 18, BOMBER: 19, TYPES: 20,
							TYPE: { LAND: 21, SEA: 22, AIR: 23 }, VARIETIES: { LAND: 12, SEA: 4, AIR: 4, PORTLESS: 16 }
};
var ARMyUNIT = { ANIMATION: true };
var TROOPER = { SHIELD: 2, RELOAD: 4,
					 ARM: { E: { X: 4, Y: -8 }, W: { X:  7, Y: -8 } }, BOOTS: { E: { X: 3, Y: 3 }, W: { X: 2, Y: 3 } }, OFFSET: { X: 12, Y: 34 }, S: 1 };
var GUNNER = { POTENCY: "D-", GUN: { E: { X: 4, Y:  -6 }, W: { X: -2, Y: -6 } } };
var BAZOOKER = { POTENCY: "D", BAZOOKA: { E: { X: -3, Y: -8 }, W: { X: -4, Y: -8 } } };
var MISSILER = { POTENCY: "D+", LAUNCHER: { E: { X: -4, Y: -9 }, W: { X: 0, Y: -9 } } };
var JEEP = { POTENCY: "C-", WHEEL: { B: { X: 4, Y: 5 }, F: { X: 23, Y: 5 } }, OFFSET: { X: 1, Y: 32 }, S: 4,
																				GUN: { E: { X: 24, Y: -12 }, W: { X: 2, Y: -12 } } };
var ROCKEtPOD = { POTENCY: "C", WHEEL: { L: { X: 1, Y: 9 }, C: { X: 13, Y: 9 }, R: { X: 25, Y: 9 } }, OFFSET: { X: 1, Y: 28 }, S: 4,
																												PODs: { E: { X: 22, Y: -9 }, W: { X: 3, Y: -9 } } };
var MISSILeLAUNCHER = { POTENCY: "C+", WHEEL: { L: { X: 1, Y: 9 }, C: { X: 13, Y: 9 }, R: { X: 25, Y: 9 } }, OFFSET: { X: 1, Y: 28 }, S: 4,
																													MISSILE: { E: { X: 20, Y: -10 }, W: { X: 0, Y: -10 } } };
var HOWITZER = { POTENCY: "B-", TREAD: { E: { X: -4, Y: 6 }, W: { X: 7, Y: 6 } }, OFFSET: { X: 3, Y: 31 }, S: 3,
																				BARREL: { E: { X: 18, Y: -3 }, W: { X: -11, Y: -3 } } };
var ARTILLERY = { POTENCY: "B", TREAD: { E: { X: -4, Y: 6 }, W: { X: -1, Y: 6 } }, OFFSET: { X: 2, Y: 31 }, S: 3,
		BARREL: { B: { E: { X: 15, Y: -9 }, W: { X: 21, Y: -9 } }, F: { E: { X: -3, Y: -9 }, W: { X: 3, Y: -9 } } } };
var AV = { POTENCY: "B+", TREAD: { X: -2, Y: 6 }, OFFSET: { X: 1, Y: 31 }, S: 3,
		BARREL: { T: { E: { X: 20, Y: -13 }, W: { X: 6, Y: -8 } }, B: { E: { X: 25, Y: -13 }, W: { X: 1, Y: -8 } } } };
var SWIFtTANK = { POTENCY: "A-", TRACK: { X: 0, Y: 7 }, OFFSET: { X: 6, Y: 30 }, S: 4,
											BARREL: { E: { X: 24, Y: -14 }, W: { X: 1, Y: -14 } } };
var HYBRIdTANK = { POTENCY: "A", TRACK: { X: -1, Y: 7 }, OFFSET: { X: 2, Y: 30 }, S: 4,
		BARREL: { T: { E: { X: 16, Y: -13 }, W: { X: 6, Y: -13 } }, B: { E: { X: 19, Y: -8 }, W: { X: 1, Y: -8 } } } };
var MEGaTANK = { POTENCY: "A+", TRACK: { E: { X: 0, Y: 7 }, W: { X: 5, Y: 7 } }, OFFSET: { X: 2, Y: 30 }, S: 3,
																				BARREL: { E: { X: 20, Y: -11 }, W: { X: -5, Y: -11 } } };
var FRIGATE = { OFFSET: { X: 2, Y: 37 }, BARREL: { E: { X: 24, Y: -14 }, W: { X: 1, Y: -14 } } };
var CRUISER = { OFFSET: { X: 2, Y: 37 }, BARREL: { B: { E: { X: 12, Y: -13 }, W: { X: 26, Y: -13 } }, F: { E: { X: -2, Y: -13 }, W: { X: 19, Y: -13 } } } };
var DESTROYER = { OFFSET: { X: 2, Y: 37 },
		BARRELS: { B: { E: { X: 21, Y: -19 }, W: { X: 0, Y: -19 } }, F: { E: { X: 28, Y: -14 }, W: { X: 7, Y: -14 } } } };
var BATTLESHIP = { OFFSET: { X: 1, Y: 37 }, BARRELS: { T: { E: { X: 22, Y: -22 }, W: { X: 7, Y: -22 } }, B: { E: { X: 12, Y: -13 }, W: { X: -2, Y: -13 } },
		F: { E: { X: 31, Y: -13 }, W: { X: 17, Y: -13 } } } };
var HELICOPTER = { OFFSET: { X: 1, Y: 37 },
		PROPELLER: { B: { E: { X: 12, Y: -29 }, W: { X: 4, Y: 7 } }, F: { E: { X: 24, Y: -29 }, W: { X: 16, Y: 7 } } } };
var STRAFER = { OFFSET: { X: 1, Y: 37 }, CANNOn: { S: { E: { X: 1, Y: 1 }, W: { X: 26, Y: 1 } }, L: { E: { X: 6, Y: 3 }, W: { X: 1, Y: 3 } } } };
var FIGHTER = { OFFSET: { X: 1, Y: 37 }, MISSILE: { E: { X: 10, Y: 4 }, W: { X: 13, Y: 4 } } };
var BOMBER = { OFFSET: { X: 1, Y: 37 }, BOMB: { E: { X: 26, Y: 0 }, W: { X: 3, Y: 0 } } };
