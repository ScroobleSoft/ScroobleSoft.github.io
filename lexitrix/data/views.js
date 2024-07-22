
var MAIN = { COLOUR: PAINT.SKY };
var CRACKLE = { COLOUR: GREY.ASH,
					 OPTION: { L: 80, T: 80, W: 200, H: 180, COLOUR: "rgb(191,191,255)",
								},
					 INSTRUCTIONS: { L: 30, T: 150, W: 300, H: 300, COLOUR: { BACKGROUND: "rgb(255,207,111)", FRAME: "rgb(239,159,031)" },
										},
					 TYPES: { L: 105, T: 120, W: 100, H: 90, GAP: 15, SELECT: 0, ORIENT: ORIENTATION.VERTICAL, BACKGROUND: "rgb(191,191,255)",
								 OPTIONS: [ "5-letter word", "6-letter word", "7-letter word", "random" ] },
					 BUTTON: { OK: { L: 150, T: 225, W: 60, H: 20, LW: 2, LABEL: "Ok", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.SHALLOW },
								  ERASE: { L: 40, T: 385, W: 60, H: 25, LW: 3, LABEL: "Erase", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED },
								  INSTRUCTIONS: { L: 120, T: 385, W: 120, H: 25, LW: 3, LABEL: "Instructions", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED },
								  INSTRUCtOK: { L: 150, T: 405, W: 60, H: 20, LW: 2, LABEL: "Ok", COLOUR: "rgb(239,159,031)", STYLE: BUTTON.STYLE.SHALLOW },
								  SUBMIT: { L: 260, T: 385, W: 60, H: 25, LW: 3, LABEL: "Submit", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED },
								  HINT: { L: 18, T: 530 },
								  SOLVE: { L: 106, T: 530 },
								  RESTART: { L: 194, T: 530 },
								  QUIT: { L: 282, T: 530 }
								 },
					 ICON: { EXPAND: { L: 65, T: 565 },
								FULlSCREEN: { L: 231, T: 565 },
							 },
					 ATTEMPTS: { X: 120, Y: 10, W: 120, H: 30, LABEL: { TEXT: "Attempts:", X: 140, Y: 30 }, COUNT: { X: 205, Y: 30 }, COLOUR: GREY.LIGHT
								  },
					 SECTION: { FRAME: { W: 41, H: 41 }, W: 37, H: 37, COLOUR: GREY.LIGHT,
								 },
					 LEDGER: { X: 80, Y: 50, COLOUR: { CORRECT: "rgb(000,255,000)", CLOSE: "rgb(255,255,111)", WRONG: "rgb(255,111,095)" }
							   },
					 SUBMISSION: { X: 80, Y: 335, COLOUR: { BACKGROUND: "white", SELECTION: PAINT.SKY }
									 },
					 KEYBOARD: { X: 20, Y: 420, W: 320, H: 96, ROWS: 3, KEY: { W: 32, H: 32	}
								  },
					 IMAGE: { LETTERS: { L: 1, T: 144, W: 308, H: 61, O: 4, C: 13, R: 2, PATCH: { W: 20, H: 28 } },
								 SECTION: { L: 69, T: 101, W: 41, H: 41 },
								 KEY: { BUTTONS: { L: 1, T: 101, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } },
										  LETTERS: { L: 111, T: 63, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } }
										},
								 INSTRUCTIONS: { L: 2, T: 253, W: 197, H: 41 },
								 TILES: { L: 201, T: 253, W: 127, H: 41, O: 2, C: 3, R: 1, PATCH: { W: 41, H: 41 } },
							  }
};
var SHUFFLE = { COLOUR: GREY.SILVER,
					 INSTRUCTIONS: { L: 30, T: 120, W: 300, H: 360, COLOUR: { BACKGROUND: "rgb(111,207,239)", FRAME: "rgb(015,191,223)" }
										},
					 STATE: { STATIC: 0, DOWNED: 1, MOVING: 2, UPPED: 3, TOUCHED: 4, DRAGGING: 5, LIFTED: 6, ENGAGED: 7, RESET: 8,
								 CONTROLLER: { INACTIVE: 0, CLICKED: 1, TRANSFERRING: 2, SWITCH: 3 } },
					 BOARD: { L: 54, T: 100, W: 252, H: 252,
								 BORDER: { L: 18, T: 64, W: 324, H: 324, LW: 36, COLOUR: GREY.MEDIUM },
								 TILE: { W: 36, H: 36, C: 7, R: 7,
											COLOUR: { INNER: "rgb(191,191,255)", OUTER: "rgb(127,127,255)",
														 CORRECT: "rgb(127,175,079)", CLOSE: "rgb(255,207,079)", WRONG: "rgb(255,079,047)" },
											STATUS: { NEUTRAL: 0, WRONG: 1, CLOSE: 2, CORRECT: 3 },
											STATE: { NORMAL: 0, DOWNED: 1 }
										 }
							  },
					 PANEL: { L: { MOVES: 18, SHUFFLES: 130, HINTS: 242 }, T: 12, W: 100, H: 40, COLOUR: GREY.MEDIUM },
					 BUTTON: { SHUFFLE: { L: 162, T: 208, W: 36, H: 36, LW: 2, SX: 305, SY: 163, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.KEyPAD,
												 OUTLINE: { L: 305, T: 197, W: 36, H: 36, O: 2, C: 2, R: 1, PATCH: { W: 36, H: 36 } } },
								  HINT: { L: 18, T: 436 },
								  SOLVE: { L: 106, T: 436 },
								  RESTART: { L: 196, T: 436 },
								  QUIT: { L: 282, T: 436 },
								  INSTRUCTIONS: { L: 111, T: 399 },
								  INSTRUCtOK: { L: 150, T: 450, W: 60, H: 20, LW: 2, LABEL: "Ok", COLOUR: "rgb(015,191,223)", STYLE: BUTTON.STYLE.SHALLOW },
								 },
					 ICON: { EXPAND: { L: 18, T: 399 },
								FULlSCREEN: { L: 268, T: 399 }
							 },
					 IMAGE: { INSTRUCTIONS: { L: 344, T: 2, W: 258, H: 127, O: 2, C: 2, R: 1, PATCH: { W: 127, H: 127 } },
								 TILES: { L: 376, T: 131, W: 112, H: 36, O: 2, C: 3, R: 1, PATCH: { W: 36, H: 36 } }
							  }
};
var SPINDLE = { COLOUR: "rgb(143,111,239)", TYPE: { DAILY: 0, ELEVEN: 1, NINE: 2, SEVEN: 3, RANDOM: 4, MINUTE: 5 }, MILLISECONDS: 1717521288033,
					 IMAGE: { INTRO: { L: 181, T: 2, W: 280, H: 224, X: 40, Y: 40 } },
					 BUTTON: { HINT: { L: 4, T: 510, W: 60, H: 25, LW: 3, LABEL: "Hint", STYLE: BUTTON.STYLE.ROUNDED,
											 COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } },
								  SOLVE: { L: 4, T: 540, W: 60, H: 25, LW: 3, LABEL: "Solve", STYLE: BUTTON.STYLE.ROUNDED,
											  COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } },
								  RESET: { L: 4, T: 570, W: 60, H: 25, LW: 3, LABEL: "Reset", STYLE: BUTTON.STYLE.ROUNDED,
											  COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } },
								  RESTART: { L: 296, T: 510, W: 60, H: 25, LW: 3, LABEL: "Restart", STYLE: BUTTON.STYLE.ROUNDED,
												 COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } },
								  QUIT: { L: 296, T: 540, W: 60, H: 25, LW: 3, LABEL: "Quit", STYLE: BUTTON.STYLE.ROUNDED,
											 COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } },
								  HELP: { L: 296, T: 570, W: 60, H: 25, LW: 3, LABEL: "Help", STYLE: BUTTON.STYLE.ROUNDED,
											 COLOUR: "rgb(079,000,159)", BACKGROUND: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } }
								},
					 LEDGER: { CELL: { COLOUR: "rgb(207,207,255)", TYPE: { SPINE: 0, ROW: 1 },
											 STATUS: { CLEAR: 0, FILLED: 1, WRONG: 2, SOLVED: 3 },
											 SPINE: { COUNT: 11, L: 158, T: 10, W: 41, H: 41, O: { X: 10, Y: 6 } },
											 ROW: { COUNT: 88, L: 34, R: 197, T: 14, GAP: 39, W: 33, H: 33, C: 4, O: { X: 9, Y: 6 } },
										  },
								  IMAGE: { CELL: { LARGE: { L: 750, T: 252, W: 41, H: 41 },
														 SMALL: { L: 793, T: 252, W: 33, H: 33 }  },
											  SELECTION: { LARGE: { L: 642, T: 288, W: 37, H: 37 },
																SMALL: { L: 681, T: 288, W: 29, H: 29 }  },
											  LETTERS: { LARGE: { L: 2, T: 296, W: 620, H: 28, O: 4, C: 26, R: 1, PATCH: { W: 20, H: 28 } },
															 SMALL: { L: 85, T: 206, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } }
														  }
											}
								},
					 KEYBOARD: { ROW: { TOP: { X: 100, Y: 470, KEYS: 5 },
											  LOWER: { X: 68, Y: 502, KEYS: 7, COUNT: 3 }
											},
									 KEY: { COUNT: 26, W: 32, H: 32, LW: 3, O: { X: 0, Y: 0 },
											  STATE: { UnPRESSED: 0, CLICKED: 1, PRESSED: 2 } },
									 IMAGE: { KEY: { BUTTONS: { L: 518, T: 234, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } } } }
								  },
					 OPTIONS: { COLOUR: "rgb(143,111,239)",
									BUTTON: { DAILY: { L: 97, T: 57, W: 166, H: 46, LW: 3, LABEL: "Daily", STYLE: BUTTON.STYLE.RAISED,
															 COLOUR: "rgb(079,000,159)", TEXT: { COLOUR: "rgb(255,223,255)" } },
												 ELEVEN: { L: 97, T: 137, W: 166, H: 46, LW: 3, LABEL: "Eleven", STYLE: BUTTON.STYLE.RAISED,
															  COLOUR: "rgb(079,000,159)", TEXT: { COLOUR: "rgb(255,223,255)" } },
												 NINE: { L: 97, T: 217, W: 166, H: 46, LW: 3, LABEL: "Nine", STYLE: BUTTON.STYLE.RAISED,
															COLOUR: "rgb(079,000,159)", TEXT: { COLOUR: "rgb(255,223,255)" } },
												 SEVEN: { L: 97, T: 297, W: 166, H: 46, LW: 3, LABEL: "Seven", STYLE: BUTTON.STYLE.RAISED,
															 COLOUR: "rgb(079,000,159)", TEXT: { COLOUR: "rgb(255,223,255)" } },
												 MINUTE: { L: 97, T: 377, W: 166, H: 46, LW: 3, LABEL: "Minute", STYLE: BUTTON.STYLE.RAISED,
															  COLOUR: "rgb(079,000,159)", TEXT: { COLOUR: "rgb(255,223,255)" } }
											  }
								 },
					 HELP: { L: 40, T: 40, W: 280, H: 480, COLOUR: "rgb(255,223,255)",
								IMAGE: { LEDGER: { L: 463, T: 2, W: 103, H: 151, X: 55, Y: 90 },
											UnSELECTED: { L: 463, T: 155, W: 29, H: 29, X: 55, Y: 255 },
											SELECTED: { L: 494, T: 155, W: 29, H: 29, X: 90, Y: 255 },
											CORRECT: { L: 525, T: 155, W: 29, H: 29, X: 55, Y: 345 },
											WRONG: { L: 463, T: 186, W: 29, H: 29, X: 55, Y: 425 },
											KEY: { L: 494, T: 186, W: 32, H: 32, X: 55, Y: 300 }
										 },
								BUTTON: { OK: { L: 160, T: 475, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.RAISED,
													 BACKGROUND: "rgb(255,223,255)", COLOUR: "rgb(143,111,239)", TEXT: { COLOUR: "rgb(255,223,255)" } }
										  }
							 }
};
var JIGGLE = { };
var CROSSLE = { COLOUR: "yellow", TYPE: { DAILY: 0, NUMBERED: 1, SYMMETRICAL: 2, ASYMMETRIC: 3 }, MILLISECONDS: 1713028537517,
					 IMAGE: { INTRO: { L: 604, T: 2, W: 280, H: 248, X: 40, Y: 81 } },
					 ICON: { VOWELS: { L:  25, T: 520, W: 140, H: 25, LW: 3, IMAGE: { L: 549, T: 306, W: 134, H: 19 }, BACKGROUND: "yellow" },
								BORDER: { L: 195, T: 520, W: 140, H: 25, LW: 3, IMAGE: { L: 685, T: 170, W: 134, H: 19 }, BACKGROUND: "yellow" }  },
					 BUTTON: { INSTRUCTIONS: { L: 20, T: 560, W: 100, H: 25, LW: 3, LABEL: "Instructions", STYLE: BUTTON.STYLE.ROUNDED,
														COLOUR: "black", BACKGROUND: "yellow", TEXT: { COLOUR: "white" } },
								  SOLVE: { L: 140, T: 560, W: 60, H: 25, LW: 3, LABEL: "Solve", STYLE: BUTTON.STYLE.ROUNDED,
											  COLOUR: "black", BACKGROUND: "yellow", TEXT: { COLOUR: "white" } },
								  RESTART: { L: 210, T: 560, W: 60, H: 25, LW: 3, LABEL: "Restart", STYLE: BUTTON.STYLE.ROUNDED,
												 COLOUR: "black", BACKGROUND: "yellow", TEXT: { COLOUR: "white" } },
								  QUIT: { L: 280, T: 560, W: 60, H: 25, LW: 3, LABEL: "Quit", STYLE: BUTTON.STYLE.ROUNDED,
											 COLOUR: "black", BACKGROUND: "yellow", TEXT: { COLOUR: "white" } }
								},
					 BOARD: { L: 20, T: 45, W: 320, H: 320, COLOUR: "white", STATE: { NORMAL: 0, CLICKED: 1, WAITING: 2, DOUBLeCLICKED: 3 },
								 CELL: { COUNT: 121, W: 29, H: 29, C: 11, R: 11, OFFSET: { X: 10, Y: 8 } },
								 IMAGE: { CELL: { L: 330, T: 230, W: 30, H: 30 },
											 SELECTED: { L: 330, T: 262, W: 28, H: 28 }
										  }
							  },
					 KEYBOARD: { X: 2, Y: 400, ROWS: [ 0,10,19 ], OFFSETS: [ 0,18,54 ],
									 KEY: { COUNT: 26, W: 32, H: 32, LW: 3, GAP: 4,
											  STATE: { UnPRESSED: 0, CLICKED: 1, SINGLeCLICKED: 2, DOUBLeCLICKED: 3, PRESSED: 4 } },
									 IMAGE: { KEY: { BUTTONS: { L: 490, T: 131, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } },
														  LETTERS: { L: 368, T: 187, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } },
														  PRESSED: { L: 362, T: 234, W: 154, H: 30, O: 2, C: 13, R: 2, PATCH: { W: 10, H: 14 } }
														},
											  }
								  },
					 OPTIONS: { COLOUR: "yellow",
									BUTTON: { DAILY: { L: 97, T: 57, W: 166, H: 46, LW: 3, SX: 685, SY: 2, STYLE: BUTTON.STYLE.RAISED },
												 NUMBERED: { L: 97, T: 137, W: 166, H: 46, LW: 3, SX: 685, SY: 44, STYLE: BUTTON.STYLE.RAISED },
												 SYMMETRICAL: { L: 97, T: 217, W: 166, H: 46, LW: 3, SX: 685, SY: 86, STYLE: BUTTON.STYLE.RAISED },
												 ASYMMETRIC: { L: 97, T: 297, W: 166, H: 46, LW: 3, SX: 685, SY: 128, STYLE: BUTTON.STYLE.RAISED },
												 DIFFICULTY: { COUNT: 6, L: 100, T: 60, W: 160, H: 40, O: 2, LW: 3,
																	SX: 847, SY: 2, STYLE: BUTTON.STYLE.RAISED, GAP: 80 },
												 OK: { L: 140, T: 420, W: 80, H: 30, LW: 3, SX: 685, SY: 192, STYLE: BUTTON.STYLE.RAISED }
											  },
									IMAGE: { CELL: { L: 604, T: 252, W: 36, H: 36 },
												SELECTION: { L: 642, T: 252, W: 106, H: 34, O: 2, C: 3, R: 1, PATCH: { W: 34, H: 34 } }
											 },
									NUMBERS: { X: 4, Y: 60, C: 10, R: 10, W: 36, H: 36, OX: 15, OY: 13, O: [ 0,4,7,11 ] }
								 },
					 INSTRUCTIONS: { L: 20, T: 20, W: 320, H: 520, COLOUR: PAINT.SKY,
										  IMAGE: { EMPTY: { L: 1, T: 1, W: 88, H: 88, X: 242, Y: 66 },
													  KEY: { L: 120, T: 91, W: 32, H: 32, X: 30, Y: 119 },
													  FAINT: { L: 91, T: 1, W: 88, H: 88, X: 242, Y: 175 },
													  SOLID: { L: 120, T: 125, W: 30, H: 30, X: 199, Y: 231 },
													  ALL: { L: 1, T: 91, W: 117, H: 117, X: 213, Y: 279 },
													  INCORRECT: { L: 120, T: 157, W: 30, H: 30, X: 228, Y: 410 },
													  CLEAR: { L: 120, T: 189, W: 30, H: 30, X: 228, Y: 454 }
													},
										  BUTTON: { OK: { L: 160, T: 500, W: 40, H: 25, LW: 3, LABEL: "Ok", BACKGROUND: GREY.LIGHT, STYLE: BUTTON.STYLE.RAISED } }
										}
};
var BUNDLE = {	COLOUR: "rgb(143,223,255)",
					BOARD: { L: -1, T: -1, W: -1, H: -1,
								COLUMN: { L: 38, T: 38, W: 283, H: 284, TILE: { W: 48, H: 48 }, COLOUR: GREY.MEDIUM },
								ROW: { L: 85, T: 42, TILE: { W: 40, H: 40 }, GAP: 8, COLOUR: GREY.MEDIUM },
								COLOUR: { CORRECT: "rgb(143,000,000)", INCORRECT: "rgb(031,079,047)" }
							 }
};
