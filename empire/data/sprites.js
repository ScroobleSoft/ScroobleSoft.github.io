
//Soldier
var LEFtSOLDIErSPRITE = { L: 199, T: 1, W: 13, H: 22,
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -17, W: 5, H: 4, LW: 0 },				//helmet
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -13, W: 2, H: 2, LW: 0 },
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 8, Y: -13, W: 3, H: 2, LW: 0 },				//face
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 6, Y: -11, W: 5, H: 2, LW: 0 },				//shoulders
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 5, Y:  -9, W: 7, H: 8, LW: 0 }  ]				//vest
};
var RIGHtSOLDIErSPRITE = { L: 214, T: 1, W: 13, H: 22,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 2, Y: -17, W: 5, H: 4, LW: 0 },				//helmet
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 5, Y: -13, W: 2, H: 2, LW: 0 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 2, Y: -13, W: 3, H: 2, LW: 0 },				//face
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 2, Y: -11, W: 5, H: 2, LW: 0 },				//shoulders
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -9, W: 7, H: 8, LW: 0 }  ]			//vest
};
var LEFtRIDErSPRITE = { L: 229, T: 1, W: 13, H: 21,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -16, W: 5, H: 4, LW: 0 },					//helmet
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -12, W: 2, H: 2, LW: 0 },
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 8, Y: -12, W: 3, H: 2, LW: 0 },					//face
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 6, Y: -10, W: 5, H: 2, LW: 0 },					//shoulders
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 5, Y:  -8, W: 7, H: 7, LW: 0 }  ]				//vest
};
var RIGHtRIDErSPRITE = { L: 244, T: 1, W: 13, H: 21,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 2, Y: -16, W: 5, H: 4, LW: 0 },					//helmet
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 5, Y: -12, W: 2, H: 2, LW: 0 },
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 2, Y: -12, W: 3, H: 2, LW: 0 },					//face
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 2, Y: -10, W: 5, H: 2, LW: 0 },					//shoulders
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -8, W: 7, H: 7, LW: 0 }  ]				//vest
};

//Legs
var LEFtLEGsSPRITE = { L: 200, T: 25, W: 10, H: 13,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -13, W: 5, H: 9, LW: 0 },					//legs
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -3, W: 8, H: 2, LW: 0 }  ]				//boots
};
var RIGHtLEGsSPRITE = { L: 212, T: 25, W: 10, H: 13,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 4, Y: -13, W: 5, H: 9, LW: 0 },					//legs
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", X: 1, Y:  -3, W: 8, H: 2, LW: 0 }  ]				//boots
};
var LEFtRIDErLEGsSPRITE = { L: 224, T: 25, W: 12, H: 15 };
var RIGHtRIDErLEGsSPRITE =  { L: 238, T: 25, W: 12, H: 15 };

//Arms
var LEFtBENtARmSPRITE = { L: 81, T: 130, W: 10, H: 6,
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -5, W: 2, H: 4, LW: 0 },					//bicep
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -2, W: 4, H: 1, LW: 0 },					//forearm
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 8, Y: -2, W: 1, H: 1, LW: 0 }  ]				//hand
};
var RIGHtBENtARmSPRITE = { L: 93, T: 130, W: 10, H: 6,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 1, Y: -2, W: 1, H: 1, LW: 0 },				//hand
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -2, W: 4, H: 1, LW: 0 },				//forearm
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 7, Y: -5, W: 2, H: 4, LW: 0 }  ]				//bicep
};
var LEFtCOCKEdARmSPRITE = { L: 105, T: 130, W: 10, H: 5,
									 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -4, W: 3, H: 3, LW: 0 },				//shoulder
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 4, Y: -2, W: 3, H: 1, LW: 0 },				//forearm
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 8, Y: -2, W: 1, H: 1, LW: 0 }  ]			//hand
};
var RIGHtCOCKEdARmSPRITE = { L: 117, T: 130, W: 10, H: 5,
									  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 1, Y: -2, W: 1, H: 1, LW: 0 },				//hand
											  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -2, W: 3, H: 1, LW: 0 },				//forearm
											  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -4, W: 3, H: 3, LW: 0 }  ]			//shoulder
};
var LEFtSTRAIGHtARmSPRITE = { L: 129, T: 130, W: 11, H: 3,
										GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -2, W: 7, H: 1, LW: 0 },			//arm
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 9, Y: -2, W: 1, H: 1, LW: 0 }  ]			//hand
};
var RIGHtSTRAIGHtARmSPRITE = { L: 142, T: 130, W: 11, H: 3,
										 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 1, Y: -2, W: 1, H: 1, LW: 0 },			//hand
												 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -2, W: 7, H: 1, LW: 0 }  ]		//arm
};
var LEFtCROUCHEdARmSPRITE = { L: 155, T: 127, W: 11, H: 8,
										GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -7, W: 2, H: 2, LW: 0 },			//shoulder
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -5, W: 3, H: 3, LW: 0 },			//bicep
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 1, Y: -3, W: 7, H: 2, LW: 0 },			//forearm
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 9, Y: -2, W: 1, H: 1, LW: 0 }  ]			//hand
};
var RIGHtCROUCHEdARmSPRITE = { L: 168, T: 127, W: 11, H: 8,
										GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "pink", X: 1, Y: -2, W: 1, H: 1, LW: 0 },			//hand
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 3, Y: -2, W: 7, H: 1, LW: 0 },			//forearm
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 7, Y: -5, W: 3, H: 3, LW: 0 },			//bicep
												{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", X: 6, Y: -7, W: 2, H: 2, LW: 0 }  ]			//shoulder
};

//Archery
var LEFtCROSSBOwSPRITE = { L: 207, T: 54, W: 16, H: 11 };
var RIGHtCROSSBOwSPRITE = { L: 207, T: 67, W: 16, H: 11 };
var LEFtLONGBOwSPRITE = { L: 200, T: 81, W: 20, H: 17 };
var RIGHtLONGBOwSPRITE = { L: 222, T: 81, W: 20, H: 17 };
var LEFtHORSEBOwSPRITE = { L: 200, T: 114, W: 14, H: 17 };
var RIGHtHORSEBOwSPRITE = { L: 216, T: 114, W: 14, H: 17 };

//Melee weapons
var AXeSPRITE = { L: 166, T: 1, W: 9, H: 13 };
var UpSWORdSPRITE = { L: 177, T: 1, W: 7, H: 18 };
var DOWnSWORdSPRITE = { L: 186, T: 1, W: 7, H: 18 };
var LEFtPIKeSPRITE = { L: 200, T: 42, W: 40, H: 4 };
var RIGHtPIKESPRITE = { L: 200, T: 48, W: 40, H: 4 };

//Cavalry weapons
var LEFtMACeSPRITE = { L: 225, T: 54, W: 17, H: 12 };
var RIGHtMACeSPRITE = { L: 225, T: 67, W: 17, H: 12 };
var SPEArSPRITE = { L: 200, T: 54, W: 5, H: 24 };
var LEFtLANCeHILtSPRITE = { L: 200, T: 101, W: 13, H: 3 };
var LEFtLANCeSHAFtSPRITE = { L: 215, T: 100, W: 24, H: 5 };
var RIGHtLANCeHILtSPRITE = { L: 226, T: 108, W: 13, H: 3 };
var RIGHtLANCeSHAFtSPRITE = { L: 200, T: 107, W: 24, H: 5 };

var LEFtHORSeSPRITE = { L: 1, T: 166, W: 39, H: 26, O: 2 };
var RIGHtHORSeSPRITE = { L: 124, T: 166, W: 39, H: 26, O: 2 };

//Colouring
var LEFtCREStSPRITE = { L: 1, T: 140, W: 9, H: 5, O: 2 };
var RIGHtCREStSPRITE = { L: 111, T: 140, W: 9, H: 5, O: 2 };
var LEFtLEGGINGsSPRITE = { L: 1, T: 147, W: 10, H: 11, O: 2 };
var RIGHtLEGGINGsSPRITE = { L: 120, T: 147, W: 10, H: 11, O: 2 };
var LEFtBOOtSPRITE = { L: 1, T: 160, W: 5, H: 4, O: 2 };
var RIGHtBOOtSPRITE = { L: 71, T: 160, W: 5, H: 4, O: 2 };
