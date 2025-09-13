
//-- TROOPERS --

var LEFtTROOPErSPRITE = { L: 219, T: 2, W: 8, H: 19,
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -18, W: 5, H: 5 },				//head
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 2, Y: -10, W: 3, H: 4 },				//torso
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 2, Y:  -5, W: 2, H: 2 },				//legs
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 2, Y:  -3, W: 5, H: 2 }  ] };			//boots
var RIGHtTROOPErSPRITE = { L: 229, T: 2, W: 8, H: 19,
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 2, Y: -18, W: 5, H: 5 },				//head
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 3, Y: -10, W: 3, H: 4 },				//torso
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 3, Y:  -5, W: 2, H: 2 },				//legs
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y:  -3, W: 5, H: 2 }  ] };			//boots
var GRENADeSPRITE = { L: 306, T: 11, W: 4, H: 4,
							 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "gold", LW: 0, X: 1, Y: -3, W: 2, H: 2 } ] };
var LEFtBAZOOKaSPRITE = { L: 292, T: 9, W: 12, H: 3,
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "gold", LW: 0, X: 2, Y: -2, W: 9, H: 1 } ] };
var RIGHtBAZOOKaSPRITE = { L: 292, T: 14, W: 12, H: 3,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "gold", LW: 0, X: 1, Y: -2, W: 9, H: 1 } ] };
var LEFtGUnARmSPRITE = { L: 239, T: 2, W: 9, H: 5 };
var RIGHtGUnARmSPRITE = { L: 239, T: 9, W: 9, H: 5 };
var LEFtGRENADIErARmSPRITE = { L: 239, T: 16, W: 2, H: 2 };
var RIGHtGRENADIErARmSPRITE = { L: 243, T: 16, W: 2, H: 2 };
var LEFtBAZOOKErARmSPRITE = { L: 251, T: 2, W: 5, H: 3 };
var RIGHtBAZOOKErARmSPRITE = { L: 258, T: 2, W: 5, H: 3 };

//-- LIGHT ARMY UNITS --

var LEFtHOWITZErSPRITE = { L: 219, T: 23, W: 11, H: 12, O: 2, C: 9, R: 1 };
var RIGHtHOWITZErSPRITE = { L: 219, T: 37, W: 11, H: 12, O: 2, C: 9, R: 1 };
var JEEpSPRITE = { L: 209, T: 51, W: 24, H: 9,
						 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -8, W: 22, H: 7 } ] };
var APCsPRITE = { L: 235, T: 51, W: 20, H: 15,
						GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X:  6, Y: -14, W:  8, H: 4 },				//turret
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  1, Y:  -7, W:  2, H: 6 },				//left armour
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  2, Y:  -9, W: 14, H: 8 },				//body
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 17, Y:  -7, W:  2, H: 6 }  ] };			//right armour
var SMALLlBARRElSPRITE = { L: 265, T: 2, W: 4, H: 2 };
var LEFtJEEpGUnSPRITE = { L: 251, T: 7, W: 21, H: 7 };
var RIGHtJEEpGUnSPRITE = { L: 251, T: 13, W: 21, H: 7 };

//-- MEDIUM ARMY UNITS --

var AVsPRITE = { L: 277, T: 51, W: 24, H: 11,
					  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -10, W: 22, H: 9 } ] };
var ARTILLERySPRITE = { L: 257, T: 51, W: 18, H: 9,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -8, W: 16, H: 7 } ] };
var IFVsPRITE = { L: 303, T: 51, W: 24, H: 15,
						GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 7, Y: -14, W: 10, H: 4 },					//turret
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 3, Y:  -9, W: 18, H: 2 },					//top armour
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y:  -7, W: 22, H: 4 },					//middle armour
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 3, Y:  -3, W: 18, H: 2 }  ] };			//bottom armour
var LEFtAVcANNOnSPRITE = { L: 274, T: 2, W: 11, H: 5,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -4, W: 8, H: 2 },				//barrel
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 3, Y: -1, W: 2, H: 1 }  ] };			//stand
var RIGHtAVcANNOnSPRITE = { L: 287, T: 2, W: 11, H: 5,
									 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 2, Y: -4, W: 8, H: 2 },				//barrel
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 6, Y: -1, W: 2, H: 1 }  ] };		//stand
var LEFtBARRElSPRITE = { L: 208, T: 91, W: 8, H: 6, O: 2 };
var RIGHtBARRElSPRITE = { L: 208, T: 99, W: 8, H: 6, O: 2 };

//-- HEAVY ARMY UNITS --

var MOBILeGUnSPRITE = { L: 295, T: 133, W: 24, H: 11,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -10, W: 22, H: 9 } ] };
var LEFtTRUCkSPRITE = { L: 208, T: 68, W: 24, H: 13,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 16, Y: -12, W: 10, H: 4 },				//cabin
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 18, Y: -10, W:  3, H: 3 },				//window
										{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  1, Y:  -6, W: 22, H: 5 }  ] };			//bed
var RIGHtTRUCkSPRITE = { L: 234, T: 68, W: 24, H: 13,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -12, W: 10, H: 4 },				//cabin
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 3, Y: -10, W:  3, H: 3 },				//window
										 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y:  -6, W: 22, H: 5 }  ] };			//bed
var TANkSPRITE = { L: 260, T: 70, W: 24, H: 10,
					    GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -9, W: 22, H: 8 } ] };
var TANkHUTChSPRITE = { L: 260, T: 62, W: 16, H: 6,
								GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -5, W: 14, H: 5 } ] };
var LARGeBARRElSPRITE = { L: 300, T: 2, W: 6, H: 2 };

//-- LAND DEFENCE UNITS --

var ATWsPRITE = { L: 306, T: 68, W: 14, H: 7,
						GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -5, W: 12, H: 4 } ] };
var LEFtATMsPRITE = { L: 208, T: 83, W: 14, H: 4,
							 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 2, Y: -3, W: 11, H: 2 } ] };
var RIGHtATMsPRITE = { L: 224, T: 83, W: 14, H: 4,
							  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -3, W: 11, H: 2 } ] };
var AAGUnSPRITE = { L: 286, T: 64, W: 18, H: 21,
						  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 8, Y: -20, W:  2, H: 6 },					//barrel
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 4, Y: -12, W: 10, H: 6 },					//body
								  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y:  -5, W: 16, H: 4 }  ] };			//base
var LEFtLCGsPRITE = { L: 217, T: 133, W: 24, H: 18, O: 2, C: 3, R: 3 };
var RIGHtLCGsPRITE = { L: 226, T: 193, W: 24, H: 18, O: 2, C: 3, R: 3 };
var LEFtLCGbARRElSPRITE = { L: 306, T: 93, W: 13, H: 5,
									 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 0, Y: -4, W: 12, H: 3 } ] };
var RIGHtLCGbARRElSPRITE = { L: 306, T: 100, W: 13, H: 5,
									  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -4, W: 12, H: 3 } ] };

//-- MISSILE --

var MISSILePAdSPRITE = { L: 240, T: 83, W: 26, H: 6,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -5, W: 24, H: 4 } ] };
var SAMsPRITE = { L: 298, T: 91, W: 6, H: 14,
						GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 2, Y: -13, W: 2, H: 11 } ] };
var LEFtSSMsPRITE = { L: 210, T: 107, W: 11, H: 11, O: 2 };
var RIGHtSSMsPRITE = { L: 210, T: 120, W: 11, H: 11, O: 2 };

//-- WHEELS --

var LARGeWHEElSPRITE = { L: 308, T: 2, W: 7, H: 7, O: 2,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -6, W: 5, H: 5 } ] };
var MEDIUmWHEElSPRITE = { L: 306, T: 77, W: 6, H: 6, O: 2, C: 2, R: 2,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -5, W: 4, H: 4 } ] };
var SMALlWHEElSPRITE = { L: 312, T: 11, W: 5, H: 5, O: 2,
								 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -4, W: 3, H: 3 } ] };
var TREAdSPRITE = { L: 209, T: 62, W: 4, H: 4, O: 2,
						  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 1, Y: -3, W: 2, H: 2 } ] };

//-- SHIPS --

var GUnBOAtSPRITE = { L: 1, T: 49, W: 32, H: 16,
							 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 5, Y: -15, W: 22, H: 14 },
									 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 6, Y: -12, W:  8, H:  8 }  ] };
var MISSILeBOAtSPRITE = { L: 1, T: 67, W: 44, H: 16, 
								  GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  5, Y: -15, W: 34, H: 14 },
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X:  6, Y: -12, W:  8, H:  8 },
										  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 19, Y: -12, W:  8, H:  8 }  ] };
var FRIGATeSPRITE = { L: 1, T: 85, W: 56, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 5, Y: -15, W: 46, H: 14 },
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 6, Y: -12, W: 8, H: 8 },
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 19, Y: -12, W: 8, H: 8 },
								 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 32, Y: -12, W: 8, H: 8 }  ] };
var DESTROYErSPRITE = { L: 1, T: 103, W: 68, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  5, Y: -15, W: 58, H: 14 },
							  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X:  6, Y: -12, W:  8, H:  8 },
							  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 19, Y: -12, W:  8, H:  8 },
							  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 32, Y: -12, W:  8, H:  8 },
							  { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 45, Y: -12, W:  8, H:  8 }  ] };
var CRUISErSPRITE = { L: 1, T: 121, W: 80, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  5, Y: -15, W: 70, H: 14 },
							{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X:  6, Y: -12, W:  8, H:  8 },
							{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 19, Y: -12, W:  8, H:  8 },
							{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 32, Y: -12, W:  8, H:  8 },
							{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 45, Y: -12, W:  8, H:  8 },
							{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 58, Y: -12, W:  8, H:  8 }  ] };
var BATTLESHIpSPRITE = { L: 1, T: 139, W: 92, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  5, Y: -15, W: 82, H: 14 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X:  6, Y: -12, W:  8, H:  8 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 19, Y: -12, W:  8, H:  8 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 32, Y: -12, W:  8, H:  8 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 45, Y: -12, W:  8, H:  8 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 58, Y: -12, W:  8, H:  8 },
								{ SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 71, Y: -12, W:  8, H:  8 }  ] };
var ESCORtCARRIErSPRITE = { L: 95, T: 108, W: 113, H: 39,
									 GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   1, Y: -35, W:   2, H: 31 },			//left trapezoid
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   3, Y: -37, W:   2, H: 33 },
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   5, Y: -39, W: 103, H: 37 },			//centre
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 108, Y: -37, W:   2, H: 33 },			//right trapezoid
											 { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 110, Y: -35, W:   2, H: 31 }  ] };
var LIGHtCARRIErSPRITE = { L: 71, T: 67, W: 135, H: 39,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   1, Y: -35, W:   2, H: 31 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   3, Y: -37, W:   2, H: 33 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   5, Y: -39, W: 125, H: 37 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 130, Y: -37, W:   2, H: 33 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 132, Y: -35, W:   2, H: 31 }  ] };
var FLEEtCARRIErSPRITE = { L: 1, T: 257, W: 157, H: 39,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:   1, Y: -35, W:   2, H: 31 },			//left trapezoid
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:	3, Y: -37, W:   2, H: 33 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:	5, Y: -39, W: 147, H: 37 },			//centre
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 152, Y: -37, W:   2, H: 33 },			//right trapezoid
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 154, Y: -35, W:   2, H: 31 }  ] };
var SUPErCARRIErSPRITE = { L: 1, T: 288, W: 179, H: 39,
									GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:	1, Y: -35, W:   2, H: 31 },			//left trapezoid
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:	3, Y: -37, W:   2, H: 33 },
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:	5, Y: -39, W: 169, H: 37 },			//centre
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 174, Y: -37, W:   2, H: 33 },			//right trapezoid
											{ SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 176, Y: -35, W:   2, H: 31 }  ] };
var CARRIErTOWErSPRITE = { L: 160, T: 247, W: 20, H: 10, O: 2, C: 3, R: 3 };

//-- JETs --

var JEtSPRITE = { W: 150, H: 75, ALIGN: ALIGNMENT.CENTRE };
var BOMBErSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	 0, Y:	0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//chassis
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	 0, Y:	0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//N nested
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	 0, Y:	0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//E nested
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	 0, Y:	0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//S nested
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	 0, Y:	0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//W nested
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//left wing
									{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
									{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//right wing
									{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};
var FIGHTErSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	  0, Y:	 0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	  0, Y: -25, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//top nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	  0, Y:  -9, SIZE: 16, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//middle nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	  0, Y:  15, SIZE: 24, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//bottom nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};
var INTERCEPTOrSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y:	  0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y: -24, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//nested 1
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:  -8, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//nested 2
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:	  8, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//nested 3
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:  24, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//nested 4
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};
var INTERDICTOrSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y: -19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left front
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y: -19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },	// wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left rear
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },	// wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y: -19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right front
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y: -19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },	// wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right rear
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },	// wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y:	0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:	0, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//medium nested
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y:	0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]	//small nested
};
var RECOnSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y: 0, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//left wing
								  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y: 0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
								  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y: 0, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//right wing
								  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y: 0, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
								  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y: 0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },		//chassis
								  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y: 0, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]		//nested
};
var REFUELLErSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y:	   0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:  -12, SIZE: 12, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//N nested
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  12, Y:	0, SIZE: 12, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//E nested
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:   12, SIZE: 12, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//S nested
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -12, Y:	0, SIZE: 12, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//W nested
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left wing
										{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
										{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right wing
										{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};
var STRAFErSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	  0, Y:	 0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	  0, Y: -16, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//N nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  16, Y:  16, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//E nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -16, Y:  16, SIZE:  8, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//W nested
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y: -19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left front wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y: -19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left rear wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y: -19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right front wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y: -19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
									 { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right rear wing
									 { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};
var TRANSPORTErSPRITE = { GS: [ { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:	0, Y:	  0, SIZE: 75, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//chassis
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y: -16, SIZE: 16, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//top nested
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:	0, Y:  16, SIZE: 16, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//bottom nested
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//left wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF },
										  { SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  56, Y:  19, SIZE: 36, SIDES: 3, STYLE: STYLE.BAsRELIEF },	//right wing
										  { SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  56, Y:  19, SIZE: 18, SIDES: 3, STYLE: STYLE.BAsRELIEF }  ]
};

//-- INFO JETs --

var FIGHTErINFoSPRITE = { GS: [	{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -6, Y: -10, SIZE: 10, SIDES: 3 },	//top wing
				{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -6, Y: -10, SIZE:  5, SIDES: 3 },
				{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -6, Y:  10, SIZE: 10, SIDES: 3 },	//bottom wing
				{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X: -6, Y:  10, SIZE:  5, SIDES: 3 },
				{ SHAPE: SHAPE.POLYGON, COLOUR: "grey", LW: 0, X:  0, Y:	0, SIZE: 20, SIDES: 3 },	//chassis
				{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X: -5, Y:	0, SIZE:  6, SIDES: 3 },	//left nested
				{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  3, Y:	0, SIZE:  4, SIDES: 3 },	//middle nested
				{ SHAPE: SHAPE.POLYGON, COLOUR: "cyan", LW: 0, X:  8, Y:	0, SIZE:  2, SIDES: 3 }  ]	//right nested
};
var FIGHTErDECAlSPRITE = { L: 18, T: 157, W: 5, H: 5, O: 2 };

//-- WEAPONs and WARDs --

var FIREBRANdSPRITE = { L: 1, T: 25, W: 16, H: 6, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -4, W: 14, H: 2 } ] };
var SILKLIGHtSPRITE = { L: 19, T: 25, W: 16, H: 6, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 1, Y: -4, W: 14, H: 2 } ] };
var VAPOURISErSPRITE = { L: 141, T: 2, W: 14, H: 21 };
var VAGABONdSPRITE = { L: 157, T: 2, W: 16, H: 25 };
var VENOmSPRITE = { L: 157, T: 29, W: 18, H: 29 };

var FLAReSPRITE = { L: 1, T: 33, W: 13, H: 13 };
var CHAFfSPRITE = { L: 16, T: 33, W: 13, H: 13 };

//-- MISSILE BASE --

var JAMMErSPRITE = { L: 2, T: 203, W: 20, H: 20, O: 2, C: 9, R: 2 };
var MISSILePAdSPRITE = { L: 177, T: 2, W: 40, H: 30 };
var JAMMErPAdSPRITE = { L: 177, T: 34, W: 30, H: 30 };

//-- MISC --

var WORLdMApFLAgSPRITE = { L: 1, T: 1, W: 12, H: 22, O: 2 };
