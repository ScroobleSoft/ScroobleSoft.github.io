
var ORIENTATION = { HORIZONTAL: 0, VERTICAL: 1, LANDSCAPE: 0, PORTRAIT: 1 };
var SHAPE = { NONE: 0, POINT: 1, LINE: 2, ARC: 3, CIRCLE: 4, ELLIPSE: 5, TRIANGLE: 6, RECTANGLE: 7, DIAMOND: 8, PENTAGON: 9, HEXAGON: 10, OCTAGON: 11,
				  POLYGON: 12, IRREGULAR: 13 };  //NOTE: PENTAGON, HEXAGON and OCTAGON are to be specified if POLYGON is pointy-top in first case,
															//		  flat-top in latter 2
															//NOTE: 'NONE' is useful for Geometric Sprites if a dummy field is needed
var SIDES = { QUAD: 4, DIAMOND: 4, HEXAGON: 6, OCTAGON: 8 };	//TEMP - until transition is complete
var VERTICES = { QUAD: 4, DIAMOND: 4, HEXAGON: 6, OCTAGON: 8 };
var STYLE = { WIReFRAME: 1, SOLID: 2, BAsRELIEF: 3, ISOMETRIC: 4 };
var HEX = { FLAtTOP: 0, POINTyTOP: 1 };

var PERSPECTIVE = { TOpDOWN: 0, SIDeVIEW: 1, BIRDsEYE: 2, ISOMETRIC: 3, SEMiISOMETRIC: 4, OVErHEAdISOMETRIC: 5, CUSTOM: 6 };
var SIDeVIEW = { DEFAULtELEVATION: 30 };
var ANGLE = { RIGHT: 90, ISOMETRIC: 45, SEMiISOMETRIC: 22.5 };
