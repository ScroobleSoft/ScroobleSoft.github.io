
//-- ARMY --

var BATTLER = { LART: 0, MART: 1, HART: 2, JEEP: 3, HOWITZER: 4, AV: 5, MOBILeGUN: 6, ARTILLERY: 7, TANK: 8, ATW: 9, AAGUN: 10, TYPES: 11, BATTALION: 128 };

//-- NAVY --

var SHIP = { SUBMARINE: 0, GUnBOAT: 1, MISSILeBOAT: 2, FRIGATE: 3, DESTROYER: 4, CRUISER: 5, BATTLESHIP: 6, SMALlCARRIER: 7, CARRIER: 8, SUPErCARRIER: 9,
				 FLEET: 8, BOwOFFSET: { L: { X: 1, Y: -1 }, R: { X: 26, Y: -1 } } };

//-- AIR FORCE --

var JET = { BOMBER: 0, FIGHTER: 1, INTERCEPTOR: 2, INTERDICTOR: 3, STRAFER: 4, RECON: 5, REFUELLER: 6, TRANSPORT: 7, TYPES: 8, GRADES: 9, SQUADRON: 32,
				TRANSFORM: { METHOD: STATUS.TRANSFORM.InMETHOD, TYPE: SPRITeFORM.ROTATED+SPRITeFORM.SCALED }, ALIGN: ALIGNMENT.CENTRE };
var BOMBER = { SPEED: 1.0 };
var FIGHTER = { F1: 0, F2: 1, F3: 2, F4: 3, F5: 4, F6: 5, F7: 6, F8: 7, F9: 8, TYPES: 9,
					 SPEED: 1.0, MAX: { SHORtCANNONs: 1, LONgCANNONs: 1, FIREBRANDs: 4, SILKLIGHTs: 4, FLAREs: 4, CHAFFs: 4 },
					 HARDPOINTS: { SHORtCANNON: { X: 114, Y: 85 }, LONgCANNON: { X: 96, Y: 107 },
										FIREBRANDS: [ { X: 56, Y: 134 }, { X: 176, Y: 134 }, { X: 176, Y: 198 }, { X: 56, Y: 198 } ],	//in clockwise direction
										SILKLIGHTS: [ { X: 30, Y: 134 }, { X: 202, Y: 134 }, { X: 202, Y: 198 }, { X: 30, Y: 198 } ],	//starting NW
										FLARES:  	  [ { X: 94, Y: 179 }, { X: 94, Y: 204 }, { X: 94, Y: 229 }, { X: 94, Y: 254 } ],
										CHAFFS:	  [ { X: 124, Y: 179 }, { X: 124, Y: 204 }, { X: 124, Y: 229 }, { X: 124, Y: 254 } ] },
//					 DECALS: [ [-2,-26], [-2,-14],[-6,-8],[1,-8], [-7,9],[2,9],[-9,16],[-2,16],[4,16] ]
					 DECALS: [ [-35,31],[-27,36],[-19,41],[-11,45],[-2,47],[7,45],[15,41],[23,36],[31,31] ],
					 MAPPING: [ [4],[3,5],[3,4,5],[2,3,5,6],[2,3,4,5,6],[1,2,3,5,6,7],[1,2,3,4,5,6,7],[0,1,2,3,5,6,7,8],[0,1,2,3,4,5,6,7,8] ]
};

var FIREBRAND = { SPEED: 4.0, FIN: { L: { T: { X: 3, Y: -8 }, B: { X: 3, Y: 5 } }, R: { T: { X: 29, Y: -8 }, B: { X: 29, Y: 5 } } },
										WARHEAD: { L: { X: 38, Y: 0 }, R: { X: -10, Y: 0 } } };
var SILKLIGHT = { SPEED: 4.0, FIN: { L: { T: { X: 3, Y: -8 }, B: { X: 3, Y: 5 } }, R: { T: { X: 29, Y: -8 }, B: { X: 29, Y: 5 } } },
										WARHEAD: { L: { X: 38, Y: 0 }, R: { X: -10, Y: 0 } } };

var COUNTErMEASURE = { SPEED: 1.0, STATE: { DISPENSED: 0, STATIONED: 1 } };
var FLARE = { SPEED: 1.0 };
var CHAFF = { SPEED: 1.0 };
