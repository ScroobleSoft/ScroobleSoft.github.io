
var STATE = { MOTION: { STATIONARY: 0, ADVANCING: 1, REVERSING: 2, PATHING: 3, TURNING: 4, PLOTTING: 5,
								AVOIDING: 6, YIELDING: 7, LEFtSTEPPING: 8, RIGHtSTEPPING: 9, DECONGESTING: 10,
								HPARABOLIC: 11, VPARABOLIC: 12, HVPARABOLIC: 13, PATROLLING: 14, TRACKING: 15,
								CONTROLLER: 16, FIZZLING: 17 },  																	//FIZZLING REDUNDANT?
								AVOIDANCE: { CENTERING: 0, ALIGNING: 1, POLLING: 2, SLIDING: 3 } };
var AgentState = function() { var Motion; };
var STATUS = { NONE: 0, EXTANT: 1, VISIBLE: 2, SELECTED: 4,
					TRANSFORM: { DIRECT: 16, SPRITeBUFFER: 32, TRANsBUFFER: 64, InMETHOD: 128 },
					KEYSTROKE: { DISCRETE: 256, CONTINUOUS: 512 } };
  //-GROUPED can be added to indicate unit is part of selected group; also possible: indicators as to how sprite forms are handled rotation/direction wise
  //-another behaviour that can be described is reversing speed and turning behaviour (i.e. 90degs etc.)
  // * 'Targeted' becomes another property for Agents, stored in .Status
  //bits 30-23 will likely be used to indicate side agent belongs to (still leaving 16 bits to be used): 
var STANCE = { INERT: 0, PASSIVE: 1, CAUTIOUS: 2, DEFENSIVE: 3, BALANCED: 4, AGGRESSIVE: 5, HOSTILE: 6, RECKLESS: 7, BERSERK: 8, TYPES: 9 };
var StanceTargetRange = [ 100, 80, 60, 40, 20 ];  //%
var FACING = { T: 0, TR: 1, R: 2, BR: 3, B: 4, BL: 5, L: 6, TL: 7 };
var PARABOLIC = { NONE: 0, HORIZONTAL: 1, VERTICAL: 2, BOTH: 3 };								//REDUNDANT
var SELECTION = { SHAPE: SHAPE.CIRCLE, COLOUR: "yellow", THICKNESS: 3, OPACITY: 0.5 };
var DEXTERITY = { NEUTRAL: 0, RIGHT: 1, LEFT: 2, BOTH: 3 };
var GENDER = { UNSPECIFIED: 0, BOY: 1, GIRL: 2, MALE: 1, FEMALE: 2 };
var ACTIVePACK = { NONE: 0, LOCATION: 1, SELECTION: 2, TRACKING: 5 };  //NOTE: will re-number when more full (REDUNDANT?)
var CONTROLLER = { SLIDE: 0, CARDINAL: 1, TANK: 2 };
var LOCATIOnPACK = { NONE: 0, BOTTOmLEFtOFFSET: 1, CENTReOFFSET: 2, BOUNDINgBOX: 4, MOVeBOX: 8, FOOTPRINT: 16, ALL: 0x1F };  //hopefully REDUNDANT
var TRACkPACK = { NONE: 0, FOLLOWERS: 1, INTERCEPTORS: 2 };
var TRACkMODE = { NONE: 0, FOLLOWING: 1, INTERCEPTING: 2, ANTICIPATING: 3 };  //NOTE: ANTICIPATING is for future
	// implementation where an attempt is made to guess where NPC is headed based on its behaviour and characteristics;
	// actually, this has opened up some possbilities, such as in GJ Mazetrix tracker game, where NPC could keep a
	// linked list of previous three steps, and if they are linear, it could extrapolate to where quarry is headed
var TURN = { MODE: { INSTANT: 0, SPIN: 1, DIRECTION: 2 }, IMAGE: { STATIC: 0, STATE: 1, FORM: 2, TRANSFORM: 4 } };
var MOTION = { STATIONARY: 0, FOLLOWING: 1, INTERCEPTING: 2, PATH: 3 };  //NOTE: PATH indicates segmented route
var TRACKERS = { NONE: 0, FOLLOWERS: 1, INTERCEPTORS: 2 };  //REDUNDANT (used by GJ PYRAMID)
var ANIMATION = { F: 15 };
