
//--DATA--

var SPRITeFORM = { ORIGINAL: 0, FLIPPED: 1, ROTATED: 2, SCALED: 4, COLOURED: 8, ENSHADOWED: 16, SKEW: 32 };
var FLIPPED = { FALSE: 0, HORIZONTAL: 1, VERTICAL: 2, BOTH: 3 };
var ROTATED = { DEG0: 0, DEG90: 1, DEG180: 2, DEG270: 3 };
var SHAPeSPEC = { SHAPE: 0, COLOUR: 1, WIREFRAME: 2, DIMENSIONS: 3, STYLE: 4 };
var COLLISION = { BOUNDINgBOX: 0, VERTExInBOX: 1, BOUNDINgCIRCLES: 2 };
var ALIGNMENT = { BOTTOmLEFT: 0, BOTTOmCENTRE: 1, BOTTOmRIGHT: 2, CENTReLEFT: 3, CENTRE: 4, CENTReRIGHT: 5, TOpLEFT: 6, TOpCENTRE: 7, TOpRIGHT: 8,
				 BOTTOmCENTER: 1, CENTErLEFT: 3, CENTER: 4, CENTErRIGHT: 5, TOpCENTER: 7, };  //TODO: eliminate CENTRE everywhere

//--SPECS--

var GENIeSPARkSPRITE = { L: 1, T: 1, W: 7, H: 7, O: 1, S: 3 };
var GENIeBULLEtSPRITE = { L: 1, T: 9, W: 3, H: 3 };
var GENIeEXPLOSIOnSPRITE = { L: 20, T: 13, W: 34, H: 34, TI: [ { Form: SPRITeFORM.SCALED, Scale: 0.75 },
							       { Form: SPRITeFORM.SCALED, Scale: 0.5 }   ] };
var SMALlEXPLOSIOnSPRITE = { L: 56, T: 13, W: 20, H: 20 };
var ROTATINgEXPLOSIOnSPRITE = { L: 1, T: 13, W: 18, H: 18, TI: [ { Form: SPRITeFORM.SCALED,  Scale: 1.0 },
								 { Form: SPRITeFORM.SCALED,  Scale: 0.75 },
							         { Form: SPRITeFORM.SCALED,  Scale: 0.5  },
								 { Form: SPRITeFORM.ROTATED, Angle:  90 },
								 { Form: SPRITeFORM.ROTATED, Angle: 180 },
								 { Form: SPRITeFORM.ROTATED, Angle: 270 }   ] };
var GENIeROCKEtSPRITE = { L: 1, T: 48, W: 9, H: 7, O: 1 };
var GENIeROCKEtSPRITE1 = { W: 5, H: 7, GS: [ [ SHAPE.LINE,     "black", 1, [0.5,-3,0.5,2]   ],
					     [ SHAPE.LINE,     "black", 1, [-0.5,-2,-0.5,2] ],
					     [ SHAPE.LINE,     "black", 1, [1.5,-2,1.5,2]   ],
					     [ SHAPE.LINE, GREY.SILVER, 1, [0.5,-2,0.5,2]   ],
//					     [ SHAPE.LINE,     "black", 1, [-1.5,2.5,2.5,2.5]   ]  ] };
					     [ SHAPE.LINE,     "black", 1, [-2,2.5,3,2.5]   ]  ] };
var ROCKEtSIGHtSPRITE = { L: 26, T: 1, W: 9, H: 9, O: 1 };
var NoENTRySPRITE = { L: 1, T: 32, W: 11, H: 11 };
