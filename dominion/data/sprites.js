
//-- SHIPS --

var GUnBOAtSPRITE = { L: 1, T: 49, W: 32, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X: 5, Y: -15, W: 22, H: 14 },
																		 { SHAPE: SHAPE.RECTANGLE, COLOUR: "cyan", LW: 0, X: 6, Y: -12, W:  8, H:  8 }  ] };
var MISSILeBOAtSPRITE = { L: 1, T: 67, W: 44, H: 16, GS: [ { SHAPE: SHAPE.RECTANGLE, COLOUR: "grey", LW: 0, X:  5, Y: -15, W: 34, H: 14 },
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
