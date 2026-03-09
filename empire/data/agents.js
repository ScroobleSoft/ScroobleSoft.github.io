
var REGIMENT = { PENNANT: { X: 2, Y: -27, LETTER: { X: 4, Y: -31 }, NUMBER: { X: 4, Y: -16, O: 7 } } };
var ARCHER = { ARM: { L: { X: 7, Y: -3 }, R: { X: -4, Y: -3 } }, LEGS: { L: { X: 5, Y: 13 }, R: { X: -2, Y: 13 } },
					CREST: { L: { X: 1, Y: -16 }, R: { X: 3, Y: -16 } }, CROSSBOW: { L: { X: 16, Y: 1 }, R: { X: -19, Y: 1 } },
					BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -20, W: 4, H: 4 },
								  { SHAPE: SHAPE.RECTANGLE, L: 4, T: -21, W: 11, H: 35 },
								  { SHAPE: SHAPE.CIRCLE, RDS: 5, X: 19, Y: -4 } ],
							R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
								  { SHAPE: SHAPE.RECTANGLE, L: 0, T: -21, W: 11, H: 35 },
								  { SHAPE: SHAPE.CIRCLE, RDS: 5, X: -10, Y: -4 } ] }
};
var LONGBOWMAN = { ARM: { COCKED: { L: { X: 2, Y: -5 }, R: { X: 1, Y: -5 } }, STRAIGHT: { L: { X: 11, Y: -7 }, R: { X: -9, Y: -7 } } },
						 LEGS: { L: { X: 5, Y: 13 }, R: { X: -2, Y: 13 } },
						 CREST: { L: { X: 1, Y: -16 }, R: { X: 3, Y: -16 } }, LONGBOW: { L: { X: 9, Y: 2 }, R: { X: -16, Y: 2 } },
						 BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -20, W: 4, H: 4 },
										{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -21, W: 11, H: 35 },
										{ SHAPE: SHAPE.CIRCLE, RDS: 8, X: 14, Y: -6 } ],
								 R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
										{ SHAPE: SHAPE.RECTANGLE, L: 0, T: -21, W: 11, H: 35 },
										{ SHAPE: SHAPE.CIRCLE, RDS: 8, X: -6, Y: -6 } ] }
};
var HORSeARCHER = { ARM: { L: { X: 7, Y: -5 }, R: { X: -5, Y: -5 } }, LEGS: { L: { X: 4, Y: 15 }, R: { X: -3, Y: 15 } },
						  CREST: { L: { X: 1, Y: -15 }, R: { X: 3, Y: -15 } }, BOW: { L: { X: 17, Y: 2 }, R: { X: -18, Y: 2 } },
						  LEGGINGS: { L: { X: 5, Y: 11 }, R: { X: -2, Y: 11 } }, BOOTS: { L: { X: 5, Y: 14 }, R: { X: 3, Y: 14 } },
						  HORSE: { L: { X: -8, Y: 22 }, R: { X: -18, Y: 22 } },
						  BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -19, W: 4, H: 4 },
										 { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },
										 { SHAPE: SHAPE.RECTANGLE, L: -1, T: 0, W: 21, H: 22 },
										 { SHAPE: SHAPE.RECTANGLE, L: -6, T: 8, W: 4, H: 7 },
										 { SHAPE: SHAPE.RECTANGLE, L: 16, T: -1, W: 11, H: 8 },
										 { SHAPE: SHAPE.CIRCLE, RDS: 8, X: 19, Y: -6 } ],
								  R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
										 { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },
										 { SHAPE: SHAPE.RECTANGLE, L: -7, T: 0, W: 21, H: 22 },
										 { SHAPE: SHAPE.RECTANGLE, L: -14, T: 8, W: 4, H: 7 },
										 { SHAPE: SHAPE.RECTANGLE, L: -18, T: -1, W: 11, H: 8 },
										 { SHAPE: SHAPE.CIRCLE, RDS: -7, X: 19, Y: -6 } ] }
};
var AXEMAN = { ARM: { BENT: { L: { X: 7, Y: -3 }, R: { X: -4, Y: -3 } }, STRAIGHT: { L: { X: 10, Y: -5 }, R: { X: -8, Y: -5 } } },
					LEGS: { L: { X: 5, Y: 13 }, R: { X: -2, Y: 13 } },
					CREST: { L: { X: 1, Y: -16 }, R: { X: 3, Y: -16 } }, AXE: { L: { X: 13, Y: -4 }, R: { X: -9, Y: -4 } },
					BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -20, W: 4, H: 4 },
								  { SHAPE: SHAPE.RECTANGLE, L: 4, T: -21, W: 11, H: 35 },
								  { SHAPE: SHAPE.RECTANGLE, L: 13, T: -16, W: 9, H: 13 } ],
							R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
								  { SHAPE: SHAPE.RECTANGLE, L: 0, T: -21, W: 11, H: 35 },
								  { SHAPE: SHAPE.RECTANGLE, L: -9, T: -16, W: 9, H: 13 } ] }
};
var SWORDSMAN = { ARM: { BENT: { L: { X: 7, Y: -3 }, R: { X: -4, Y: -3 } }, STRAIGHT: { L: { X: 10, Y: -5 }, R: { X: -8, Y: -5 } } },
						LEGS: { L: { X: 5, Y: 13 }, R: { X: -2, Y: 13 } },
						CREST: { L: { X: 1, Y: -16 }, R: { X: 3, Y: -16 } }, SWORD: { L: { X: 14, Y: -4 }, R: { X: -8, Y: -4 } },
						BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -20, W: 4, H: 4 },
									  { SHAPE: SHAPE.RECTANGLE, L: 4, T: -21, W: 11, H: 35 },
									  { SHAPE: SHAPE.RECTANGLE, L: 15, T: -21, W: 5, H: 18 } ],
								R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
									  { SHAPE: SHAPE.RECTANGLE, L: 0, T: -21, W: 11, H: 35 },
									  { SHAPE: SHAPE.RECTANGLE, L: -7, T: -21, W: 5, H: 18 } ] }
};
var PIKEMAN = { ARM: { CROUCHED: { L: { X: 3, Y: -3 }, R: { X: -1, Y: -3 } }, STRAIGHT: { L: { X: 9, Y: -3 }, R: { X: -9, Y: -3 } } },
					 LEGS: { L: { X: 5, Y: 13 }, R: { X: -2, Y: 13 } },
					 CREST: { L: { X: 1, Y: -16 }, R: { X: 3, Y: -16 } }, PIKE: { L: { X: 1, Y: -5 }, R: { X: -28, Y: -5 } },
					 BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -20, W: 4, H: 4 },
									{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -21, W: 11, H: 35 },
									{ SHAPE: SHAPE.RECTANGLE, L: -3, T: -8, W: 40, H: 6 } ],
							 R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
									{ SHAPE: SHAPE.RECTANGLE, L: 0, T: -21, W: 11, H: 35 },
									{ SHAPE: SHAPE.RECTANGLE, L: -28, T: -8, W: 40, H: 6 } ] }
};
var MACEMAN = { ARM: { BENT: { L: { X: 7, Y: -2 }, R: { X: -4, Y: -2 } }, STRAIGHT: { L: { X: 10, Y: -6 }, R: { X: -8, Y: -6 } } },
					 LEGS: { L: { X: 4, Y: 15 }, R: { X: -3, Y: 15 } },
					 CREST: { L: { X: 1, Y: -15 }, R: { X: 3, Y: -15 } }, MACE: { L: { X: 20, Y: 3 }, R: { X: -25, Y: 3 } },
					 LEGGINGS: { L: { X: 5, Y: 11 }, R: { X: -2, Y: 11 } }, BOOTS: { L: { X: 5, Y: 14 }, R: { X: 3, Y: 14 } },
					 HORSE: { L: { X: -8, Y: 22 }, R: { X: -18, Y: 22 } },
					 BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -19, W: 4, H: 4 },
									{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },
									{ SHAPE: SHAPE.RECTANGLE, L: -1, T: 0, W: 21, H: 22 },
									{ SHAPE: SHAPE.RECTANGLE, L: -6, T: 8, W: 4, H: 7 },
									{ SHAPE: SHAPE.RECTANGLE, L: 9, T: -8, W: 24, H: 15 } ],			//horse head and mace
							 R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },
									{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },
									{ SHAPE: SHAPE.RECTANGLE, L: -7, T: 0, W: 21, H: 22 },
									{ SHAPE: SHAPE.RECTANGLE, L: -14, T: 8, W: 4, H: 7 },
									{ SHAPE: SHAPE.RECTANGLE, L: -24, T: -8, W: 24, H: 15 } ] }
};
var CATAPHRACT = { ARM: { L: { X: 7, Y: -2 }, R: { X: -4, Y: -2 } }, LEGS: { L: { X: 4, Y: 15 }, R: { X: -3, Y: 15 } },
						 CREST: { L: { X: 1, Y: -15 }, R: { X: 3, Y: -15 } }, SPEAR: { L: { X: 14, Y: -2 }, R: { X: -6, Y: -2 } },
						 LEGGINGS: { L: { X: 5, Y: 11 }, R: { X: -2, Y: 11 } }, BOOTS: { L: { X: 5, Y: 14 }, R: { X: 3, Y: 14 } },
						 HORSE: { L: { X: -8, Y: 22 }, R: { X: -18, Y: 22 } },
						 BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -19, W: 4, H: 4 },											//crest
										{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },										//soldier
										{ SHAPE: SHAPE.RECTANGLE, L: -1, T: 0, W: 21, H: 22 },										//horse
										{ SHAPE: SHAPE.RECTANGLE, L: -6, T: 8, W: 4, H: 7 },											//tail
										{ SHAPE: SHAPE.RECTANGLE, L: 18, T: -2, W: 5, H: 17 },										//neck
										{ SHAPE: SHAPE.RECTANGLE, L: 14, T: -25, W: 4, H: 23 },										//spear
										{ SHAPE: SHAPE.TRIANGLE, X: 18, Y: -4, SIZE: 10, DIRECTION: DIRECTION.SW } ],			//horse head
								 R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },											//crest
										{ SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },										//soldier
										{ SHAPE: SHAPE.RECTANGLE, L: -7, T: 0, W: 21, H: 22 },										//horse
										{ SHAPE: SHAPE.RECTANGLE, L: -14, T: 8, W: 4, H: 7 },											//tail
										{ SHAPE: SHAPE.RECTANGLE, L: -10, T: -2, W: 5, H: 17 },										//neck
										{ SHAPE: SHAPE.RECTANGLE, L: -5, T: -25, W: 4, H: 23 },										//spear
										{ SHAPE: SHAPE.TRIANGLE, L: -21, T: -4, SIZE: 10, DIRECTION: DIRECTION.SE } ] }		//horse head
};
var KNIGHT = { ARM: { L: { X: 7, Y: -2 }, R: { X: -4, Y: -2 } }, LEGS: { L: { X: 4, Y: 15 }, R: { X: -3, Y: 15 } },
					CREST: { L: { X: 1, Y: -15 }, R: { X: 3, Y: -15 } },
					LANCE: { HILT: { L: { X: 1, Y: -2 }, R: { X: -1, Y: -2 } }, SHAFT: { L: { X: 14, Y: -1 }, R: { X: -25, Y: -1 } } },
					LEGGINGS: { L: { X: 5, Y: 11 }, R: { X: -2, Y: 11 } }, BOOTS: { L: { X: 5, Y: 14 }, R: { X: 3, Y: 14 } },
					HORSE: { L: { X: -8, Y: 22 }, R: { X: -18, Y: 22 } },
					BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -19, W: 4, H: 4 },												//crest
								  { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },											//soldier
								  { SHAPE: SHAPE.RECTANGLE, L: -1, T: 0, W: 21, H: 22 },												//horse
								  { SHAPE: SHAPE.RECTANGLE, L: -6, T: 8, W: 4, H: 7 },												//tail
								  { SHAPE: SHAPE.RECTANGLE, L: 18, T: -2, W: 5, H: 17 },												//neck
								  { SHAPE: SHAPE.RECTANGLE, L: 1, T: -4, W: 37, H: 3 },												//lance
								  { SHAPE: SHAPE.TRIANGLE, X: 18, Y: -4, SIZE: 10, DIRECTION: DIRECTION.SW } ],				//horse head
							R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },												//crest
								  { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },											//soldier
								  { SHAPE: SHAPE.RECTANGLE, L: -7, T: 0, W: 21, H: 22 },												//horse
								  { SHAPE: SHAPE.RECTANGLE, L: -14, T: 8, W: 4, H: 7 },												//tail
								  { SHAPE: SHAPE.RECTANGLE, L: -10, T: -2, W: 5, H: 17 },											//neck
								  { SHAPE: SHAPE.RECTANGLE, L: -25, T: -4, W: 4, H: 23 },											//lance
								  { SHAPE: SHAPE.TRIANGLE, L: -21, T: -4, SIZE: 10, DIRECTION: DIRECTION.SE } ] }			//horse head
};
var IMMORTAL = { ARM: { BENT: { L: { X: 7, Y: -2 }, R: { X: -4, Y: -2 } }, STRAIGHT: { L: { X: 10, Y: -6 }, R: { X: -8, Y: -6 } } },
					  LEGS: { L: { X: 4, Y: 15 }, R: { X: -3, Y: 15 } }, CREST: { L: { X: 1, Y: -15 }, R: { X: 3, Y: -15 } },
					  LANCE: { HILT: { L: { X: 1, Y: -2 }, R: { X: -1, Y: -2 } }, SHAFT: { L: { X: 14, Y: -1 }, R: { X: -25, Y: -1 } } },
					  SPEAR: { L: { X: 19, Y: -4 }, R: { X: -11, Y: -4 } }, SWORD: { L: { X: 4, Y: 19 }, R: { X: 2, Y: 19 } },
					  LEGGINGS: { L: { X: 5, Y: 11 }, R: { X: -2, Y: 11 } }, BOOTS: { L: { X: 5, Y: 14 }, R: { X: 3, Y: 14 } },
					  HORSE: { L: { X: -8, Y: 22 }, R: { X: -18, Y: 22 } },
					  BS: { L: [ { SHAPE: SHAPE.RECTANGLE, L: 0, T: -19, W: 4, H: 4 },											//crest
									 { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },											//soldier
									 { SHAPE: SHAPE.RECTANGLE, L: -1, T: 0, W: 21, H: 22 },											//horse
									 { SHAPE: SHAPE.RECTANGLE, L: -6, T: 8, W: 4, H: 7 },												//tail
									 { SHAPE: SHAPE.RECTANGLE, L: 18, T: -2, W: 5, H: 17 },											//neck
									 { SHAPE: SHAPE.RECTANGLE, L: 14, T: -25, W: 4, H: 23 },											//spear
									 { SHAPE: SHAPE.RECTANGLE, L: 1, T: -4, W: 37, H: 3 },											//lance
									 { SHAPE: SHAPE.TRIANGLE, X: 18, Y: -4, SIZE: 10, DIRECTION: DIRECTION.SW } ],			//horse head
							  R: [ { SHAPE: SHAPE.RECTANGLE, L: 9, T: -20, W: 4, H: 4 },											//crest
									 { SHAPE: SHAPE.RECTANGLE, L: 4, T: -20, W: 11, H: 21 },											//soldier
									 { SHAPE: SHAPE.RECTANGLE, L: -7, T: 0, W: 21, H: 22 },											//horse
									 { SHAPE: SHAPE.RECTANGLE, L: -14, T: 8, W: 4, H: 7 },											//tail
									 { SHAPE: SHAPE.RECTANGLE, L: -10, T: -2, W: 5, H: 17 },											//neck
									 { SHAPE: SHAPE.RECTANGLE, L: -5, T: -25, W: 4, H: 23 },											//spear
									 { SHAPE: SHAPE.RECTANGLE, L: -25, T: -4, W: 4, H: 23 },											//lance
									 { SHAPE: SHAPE.TRIANGLE, L: -21, T: -4, SIZE: 10, DIRECTION: DIRECTION.SE } ] }			//horse head
};
