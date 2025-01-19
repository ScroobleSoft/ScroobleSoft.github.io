
var VIEW = { GLOBAL: { INFO: { GAZETTEER: 0, DIPLOMACY: 1, VOTES: 2, RESERVES: 3, BUDGET: 4, CASH: 5, ARMS: 6, EVENTS: 7, TYPES: 8  },
							  STATE: { NATIONS: 0, FORCES: 1, INFLUENCE: 2, SURVEILLANCE: 3 },
							  MApCONTROlIMAGEs: { L: 2, T: 126, W: 154, H: 70, O: 2, C: 2, R: 4, PATCH: { W: 76, H: 16 } },
							  MApOPTIOnCONTROLs: { L: 0, T: 0, OPTIONS: 4, OPTION: 0 }
							},
				 GAZETTEER: { COLOUR: GREY.SILVER },
				 VOTES: { COLOUR: GREY.SILVER, STATE: { POWERS: 0, ALLIANCES: 1, ALLY: 2 },
							 IMAGE: { LABELS: { L: 944, T: 2, W: 63, H: 158, O: 4, C: 1, R: 9, PATCH: { W: 63, H: 14 } } },
							 BUTTON: { PREVIOUS: { L: 170, T: 210, W: 65, H: 25, LW: 3, LABEL: "Previous", COLOUR: GREY.MEDIUM, STYLE: BUTTON.STYLE.RAISED },
										  MAIN: { L: 100, T: 210, W: 65, H: 25, LW: 3, LABEL: "Main", COLOUR: GREY.MEDIUM, STYLE: BUTTON.STYLE.RAISED }
										},
							 BArCHART: { ALLIANCE: { L: 70, T: 5, W: 150, H: 190, BAR: { H: 20, COUNT: 9 }, GAP: 1, ORIENT: ORIENTATION.HORIZONTAL } }
						  },
				 BUDGET: { COLOUR: "slateblue",
							  IMAGE: { DIGITS: { L: 725, T: 268, W: 98, H: 13, O: 2, C: 10, R: 1, PATCH: { W: 8, H: 13 } }
										},
							  PUShBUTTON: { COUNT: 8,
												 PLUS: { L: 156, T: 6, W: 32, H: 25, LW: 5, O: 0,
															IMAGE: { L: 2, T: 230, W: 22, H: 15 } },
												 MINUS: { L: 189, T: 6, W: 32, H: 25, LW: 5, O: 0,
															IMAGE: { L: 26, T: 230, W: 22, H: 15 } },
												 IMAGE: { L: 118, T: 198, W: 32, H: 52, O: 2, C: 1, R: 2, PATCH: { W: 32, H: 25 } }
											  }
							},
				 RESERVES: { COLOUR: GREY.SILVER, STATE: { INVENTORY: 0, POWERS: 1 },
								 BArCHART: { INVENTORY: { L: 50, T: 5, W: 160, H: 200, BAR: { H: 40, COUNT: 4 }, GAP: 8, ORIENT: ORIENTATION.HORIZONTAL },
												 COMMODITIES: { L: 65, T: 5, W: 145, H: 164, BAR: { H: 16, COUNT: 9 }, GAP: 2, ORIENT: ORIENTATION.HORIZONTAL }
											  },
								 TOUChBAR: { COMMODITIES: { L: 2, T: 175, W: 235, H: 26, O: 3, KEYS: 4, KEY: { W: 55, H: 20 }, SELECT: 0,
																	 COLOUR: { KEY: CityStateColours[CITySTATE.COUNT], SELECTION: "slateblue" },
																	 ORIENT: ORIENTATION.HORIZONTAL, IMAGE: { L: 152, T: 217, W: 235, H: 26 } }
											  },
								 BUTTON: { INVENTORY: { L: 50, T: 210, W: 90, H: 25, LW: 3, LABEL: "Inventory", COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" },
																STYLE: BUTTON.STYLE.RAISED },
											  COMMODITIES: { L: 145, T: 210, W: 90, H: 25, LW: 3, LABEL: "Commodities", COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" },
																  STYLE: BUTTON.STYLE.RAISED }
											}											  
							  },
				 DIPLOMACY: { },
				 CASH: { COLOUR: GREY.SILVER, STATE: { CASH: 0, INVESTMENTS: 1, CREDIT: 2 },
							BArCHART: { CASH: { L: 70, T: 5, W: 140, H: 200, BAR: { H: 20, COUNT: 9 }, GAP: 2, ORIENT: ORIENTATION.HORIZONTAL },
											INVESTMENTS: { L: 60, T: 0, W: 155, H: 163, BAR: { H: 5, COUNT: 20 }, GAP: 3, ORIENT: ORIENTATION.HORIZONTAL,
																COLOURS: CityStateColours },
											CREDIT: { L: 65, T: 5, W: 145, H: 145, BAR: { H: 15, COUNT: 9 }, GAP: 1, ORIENT: ORIENTATION.HORIZONTAL }
										 },			 
							TOUChBAR: { POWERS: { L: 70, T: 175, W: 169, H: 43, O: 1, C: 3, R: 3, KEYS: 9, KEY: { W: 55, H: 13 }, SELECT: 0,
														 COLOUR: { KEY: CityStateColours[CITySTATE.COUNT], SELECTION: "slateblue" },
														 ORIENT: ORIENTATION.MIXED, IMAGE: { L: 308, T: 1, W: 169, H: 43 } },
											CITySTATES: { L: 20, T: 155, W: 217, H: 61, O: 1, C: 4, R: 5, KEYS: 20, KEY: { W: 53, H: 11 }, SELECT: 0,
															  COLOUR: { KEY: CityStateColours[CITySTATE.COUNT], SELECTION: "slateblue" },
															  ORIENT: ORIENTATION.MIXED, IMAGE: { L: 308, T: 46, W: 217, H: 61 } }
										 },
							BUTTON: { CASH: { L: 0, T: 220, W: 80, H: 20, LW: 3, LABEL: "Cash", COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" },
													STYLE: BUTTON.STYLE.RAISED },
										 INVESTMENTS: { L: 80, T: 220, W: 80, H: 20, LW: 3, LABEL: "Portfolio", COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" },
													STYLE: BUTTON.STYLE.RAISED },
										 CREDIT: { L: 160, T: 220, W: 80, H: 20, LW: 3, LABEL: "Credit", COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" },
													STYLE: BUTTON.STYLE.RAISED }
									  },
							IMAGE: { LABELS: { L: 1009, T: 2, W: 53, H: 164, X: 0, Y: 0 }
									 }
						 },
				 ARMS: { },
				 EVENTS: { },
				 ACTION: { COLOUR: GREY.SILVER,
							  IMAGE: { TURN: { L: 732, T: 18, W: 29, H: 10, O: -1, C: 4, R: 1, PATCH: { W: 8, H: 10, COUNT: 4 },
													 X: 224, Y: 115, MOBILE: { X: 99, Y: 227 } },
										  TURnDIGITs: { L: 766, T: 18, W: 80, H: 10, O: 0, C: 10, R: 1, PATCH: { W: 8, H: 10 },
															 X: 232, Y: 125, MOBILE: { X: 131, Y: 227 } },
										  INFoICONs: { L: 282, T: 2, W: 24, H: 199, O: 1, C: 1, R: 8, PATCH: { W: 24, H: 24 } },
										  EXPANSIOnBUTTONs: { L: 226, T: 2, W: 54, H: 199, C: 1, R: 8, O: 1, PATCH: { W: 54, H: 24 } },
										  BEVEL: { INFO: { L: 2, T: 198, W: 62, H: 30, O: 2, C: 2, R: 1, PATCH: { W: 30, H: 30 } },
													  EXPANSION: { L: 158, T: 153, W: 60, H: 62, C: 1, R: 2, O: 2, PATCH: { W: 60, H: 30 } }
													}
										},
							  ICON: { ADVISOR: { L: 0, T: 100, W: 56, H: 56, LW: 3, IMAGE: { L: 59, T: 69, W: 50, H: 50 } },
										 MAP: { L: 56, T: 100, W: 56, H: 56, LW: 3, IMAGE: { L: 111, T: 69, W: 50, H: 50 } },
										 OFFICE: { L: 112, T: 100, W: 56, H: 56, LW: 3, IMAGE: { L: 163, T: 69, W: 50, H: 50 } }
									  },
							  BUTTON: { TURN: { L: 168, T: 100, W: 56, H: 56, LW: 3, SX: 66, SY: 198, STYLE: BUTTON.STYLE.RAISED }
										 },
							  ICOnPANEL: { INFO: { L: 0, T: 0, W: 240, H: 30, LW: 3, R: 1, C: 8, ICONS: 8, ICON: { W: 30, H: 30 }, PRESS: 0 }
											 },
							  BUTTOnPANEL: { EXPANSION: { L: 0, T: 35, W: 240, H: 60, C: 4, R: 2, LW: 3, BUTTON: { W: 60, H: 30 } }
												},
							  MOBILE: { ICON: { ADVISOR: { L: 100, T: 0, W: 56, H: 56, LW: 3 },
													  MAP: { L: 100, T: 56, W: 56, H: 56, LW: 3 },
													  OFFICE: { L: 100, T: 112, W: 56, H: 56, LW: 3 }
													},
											BUTTON: { TURN: { L: 100, T: 168, W: 56, H: 56, LW: 3, SX: 66, SY: 198, STYLE: BUTTON.STYLE.RAISED }
													  },
											ICOnPANEL: { INFO: { L: 0, T: 0, W: 30, H: 240, LW: 3, R: 8, C: 1, ICONS: 8, ICON: { W: 30, H: 30 }, PRESS: 0 }
														  },
										   BUTTOnPANEL: { EXPANSION: { L: 35, T: 0, W: 60, H: 240, C: 1, R: 8, LW: 3, BUTTON: { W: 60, H: 30 } }
															 }
										 }
							},
				 MAP: { STATE: { SCANNING: 0, SELECTED: 1 } },
				 ALLIANCeSELECTION: { L: 140, T: 90, W: 360, H: 465, SLOT: { W: 136, H: 86, C: 2, R: 4 } },
				 CONQUEST: { COLOUR: PAINT.SKY, PHASE: { AIR: 0, SEA: 1, LAND: 2, CONQUERED: 3, DEFENDED: 4, SURRENDERED: 5, WITHDRAWN: 6 },
								 INFO: { COLOUR: GREY.SILVER,
											IMAGE: { SYMBOLS: { L: 505, T: 79, W: 118, H: 133, O: 2, C: 10, R: 9, PATCH: { W: 10, H: 13 } },
														SELECTION: { L: 848, T: 18, W: 58, H: 19, O: 2, C: 2, R: 1, PATCH: { W: 28, H: 19 } }
													 }
										 },
								 CONSOLE: { COLOUR: GREY.SILVER,
												BUTTON: { ATTACK: { L: 18, T: 120, W: 120, H: 25, LW: 3, LABEL: "Attack", STYLE: BUTTON.STYLE.RAISED,
																		  COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" } },
															 WITHDRAW: { L: 18, T: 160, W: 120, H: 25, LW: 3, LABEL: "Withdraw", STYLE: BUTTON.STYLE.RAISED, 
																			 COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" } },
															 INSTANT: { L: 18, T: 200, W: 120, H: 25, LW: 3, LABEL: "Instant", STYLE: BUTTON.STYLE.RAISED, 
																			COLOUR: GREY.MEDIUM, TEXT: { COLOUR: "white" } }
														  }
											 }
							  },
				 PURCHASE: { },
				 GRANT: { },
				 INVESTMENT: { },
				 PACT: { },
				 TREATY: { },
				 INTRIGUE: { },
				 MISSION: { COLOUR: "rgb(255,159,191)",
								PUShBUTTON: { MISSION: { COUNT: 8, L: -1, T: -1, W: 92, H: 52, LW: 6, BACKGROUND: "white",
																 IMAGE: { L: 2, T: 282, W: 80, H: 40, O: 1, C: 4, R: 2 } }
												},
								IMAGE: { LABEL: { L: 329, T: 297, W: 120, H: 22, O: 1, C: 4, R: 2, PATCH: { W: 120, H: 22 } },
											EDGE: { L: 308, T: 109, W: 106, H: 81, O: 1, C: 1, R: 2, PATCH: { W: 92, H: 52 } }
										 }
							 }
};

var ALLIANCE = { COLOUR: GREY.LIGHT,
					  MISSION: { L: 5, T: 407, W: 110, H: 110, O: 5, C: 4, R: 2, LW: 3, TITLE: 87 }
/*
					 STATE: { STATIC: 0, DOWNED: 1, MOVING: 2, UPPED: 3, TOUCHED: 4, DRAGGING: 5, LIFTED: 6, RESET: 7,
								 CONTROLLER: { INACTIVE: 0, CLICKED: 1, TRANSFERRING: 2, SWITCH: 3 } },
					 BOARD: { L: 72, T: 100, W: 252, H: 252,
								 BORDER: { L: 36, T: 64, W: 324, H: 324, LW: 36, COLOUR: GREY.MEDIUM },
								 TILE: { W: 36, H: 36, C: 7, R: 7,
											COLOUR: { INNER: "rgb(191,191,255)", OUTER: "rgb(127,127,255)",
														 CORRECT: "rgb(127,175,079)", CLOSE: "rgb(255,207,079)", WRONG: "rgb(255,079,047)" },
											STATUS: { NEUTRAL: 0, WRONG: 1, CLOSE: 2, CORRECT: 3 },
											STATE: { NORMAL: 0, DOWNED: 1 }
										 }
							  },
					 PANEL: { L: { MOVES: 36, SHUFFLES: 148, HINTS: 260 }, T: 12, W: 100, H: 40, COLOUR: GREY.MEDIUM },
					 BUTTON: { SHUFFLE: { L: 180, T: 208, W: 36, H: 36, LW: 2, SX: 305, SY: 163, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.KEyPAD,
												 OUTLINE: { L: 305, T: 197, W: 36, H: 36, O: 2, C: 2, R: 1, PATCH: { W: 36, H: 36 } } },
								  HINT: { L: 36, T: 436, W: 60, H: 25, LW: 3, LABEL: "Hint", COLOUR: GREY.ASH, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.ROUNDED },
								  SOLVE: { L: 124, T: 436, W: 60, H: 25, LW: 3, LABEL: "Solve", COLOUR: GREY.ASH, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.ROUNDED },
								  RESTART: { L: 212, T: 436, W: 60, H: 25, LW: 3, LABEL: "Restart", COLOUR: GREY.ASH, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.ROUNDED },
								  QUIT: { L: 300, T: 436, W: 60, H: 25, LW: 3, LABEL: "Quit", COLOUR: GREY.ASH, BACKGROUND: GREY.SILVER, STYLE: BUTTON.STYLE.ROUNDED },
								  INSTRUCTIONS: { L: 129, T: 399, W: 120, H: 25, LW: 3, LABEL: "Instructions", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED }
								 },
					 ICON: { EXPAND: { L: 36, T: 399, W: 52, H: 24, LW: 3, COLOUR: GREY.LIGHT,
								IMAGE: { L: 305, T: 235, W: 46, H: 18 } },
								CONTROLLER: { L: 291, T: 399, W: 69, H: 24, LW: 3, COLOUR: GREY.LIGHT,
								IMAGE: { L: 305, T: 255, W: 63, H: 18 }
							 }
					 }
*/
};
var OFFICE = {};
var RELATIONS = {
};
