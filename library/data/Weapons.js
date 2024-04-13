
var WEAPON = { STATE: { INACTIVE: 0, ARMED: 1, FIRING: 2, ARMING: 3 }, FIRE: { THRESHOLD: 0, MOUSE: 1, KEY: 2 },	//NOTE: 'FIRING' for Pellets, Rockets etc.
					LOAD: 90, INCREMENT: 1, TYPE: { BLAST: 1, DIRECTION: 2, TARGET: 3, SPOT: 4, TRACK: 5 } };
var TARGETING = { NONE: 0, SHOT: 1, SHELL: 2, ROCKET: 4, MISSILE: 8, TYPES: 4 };  //REDUNDANT
var CANNON = { RANGE: { MIN: 150, MAX: 250 }, ARC: { A: 45, COLOUR: "yellow", OPACITY: 0.5 }, W: 3, COLOUR: "grey", F: 90, LOAD: 90 };
var ROCKET = { ReLOAD: 180, GAP: { MIN: 8, MAX: 18 }, STATE: { INACTIVE: 0, RELEASED: 1, EXPLODING: 2, IMPLODING: 3 } };
var MISSILE = { LOCkCOLOUR: { GREEN: "rgb(0,255,0)", RED: "rgb(255,0,0)" } };

//----------------------------------
//---------- FX --------------------

var FX = { F: 60, S: 1 };
var PLUME = { DORMANT: 0, EXPANDING: 1, STABLE: 2, CONTRACTING: 3 };
var EXPLOSION = { F: 45, ROTATING: { S: 8, F: 10 }, PULSATING: { S: 6, F: 15 }, GRID: { S: 2, F: 60, COLOUR: { BODY: "yellow", OUTLINE: "orange" } },
								 RING: { RDS: 12 } };
var LASER = { COLOUR: BLUE.TURQUOISE, LW: 3, DOT: { R: 1.5 }, OPACITY: 1.0, DECREMENT: 0.01, TYPE: { BEAM: 0, DOT: 1 } };
var SPARK = { S: 6, F: 10 };
