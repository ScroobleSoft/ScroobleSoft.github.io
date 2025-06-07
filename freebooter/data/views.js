
var VIEW = { INTRO: { INFO: { },
							 CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
											BUTTON: { DAILY: { L: 2, T: 194, W: 75, H: 44, LW: 3, SX: 45, SY: 29, STYLE: BUTTON.STYLE.RAISED },
														 RANDOM: { L: 79, T: 194, W: 75, H: 44, LW: 3, SX: 45, SY: 69, STYLE: BUTTON.STYLE.RAISED }
													  }
										 }
						  },
				 COCKPIT: { VIEW: { FRONT: 0, RIGHT: 1, BACK: 2, LEFT: 3, TOP: 4, BOTTOM: 5, CARGO: 6, COUNT: 7 },
								INFO: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
										  IMAGE: { VIEWS: { L: 342, T: 2, W: 144, H: 144, X: 6, Y: 48 },
													  VERTICAlVIEWS: { L: 73, T: 106, W: 144, H: 36 },
													  SELECTION: { FRONT: { L: 72, T: 145, W: 144, H: 37, X: 6, Y: 48 },
																		RIGHT: { L: 258, T: 106, W: 37, H: 144, X: 107, Y: 48 },
																		BACK: { L: 72, T: 184, W: 144, H: 37, X: 6, Y: 155 },
																		LEFT: { L: 219, T: 106, W: 37, H: 144, X: 6, Y: 48 }
																	 },
													  LABEL: { TOP: { L: 1, T: 154, W: 46, H: 9, O: 2, C: 2, R: 1, PATCH: { W: 22, H: 9 } },
																  BOTTOM: { L: 1, T: 165, W: 45, H: 20, O: 2, C: 1, R: 2, PATCH: { W: 45, H: 9 } },
																  FRONT: { L: 1, T: 187, W: 38, H: 9, X: 59, Y: 62 },
																  RIGHT: { L: 49, T: 154, W: 7, H: 53, X: 128, Y: 98 },
																  BACK: { L: 1, T: 198, W: 31, H: 9, X: 62, Y: 174 },
																  LEFT: { L: 58, T: 154, W: 7, H: 42, X: 21, Y: 104 },
																  CARGO: { L: 1, T: 209, W: 39, H: 9, X: 58, Y: 115 }
																}
													},
										  BUTTON: {	PILOTS: { },
														HELP: { L: 157, T: 102, W: 75, H: 44, LW: 3, SX: 2, SY: 191, STYLE: BUTTON.STYLE.RAISED },
														OPTIONS: { L: 157, T: 146, W: 75, H: 44, LW: 3, SX: 2, SY: 151, STYLE: BUTTON.STYLE.RAISED },
														EXIT: { L: 157, T: 190, W: 75, H: 44, LW: 3, SX: 144, SY: 311, STYLE: BUTTON.STYLE.RAISED }
													 }
										},
							   CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
											  BUTTON: { EXIT: { L: 2, T: 210, W: 60, H: 25, LW: 3, SX: 76, SY: 320, STYLE: BUTTON.STYLE.RAISED },
															PROGRESS: { L: 2, T: 210, W: 75, H: 25, LW: 3, SX: 73, SY: 242, STYLE: BUTTON.STYLE.RAISED }
														 },
											  BUTTOnPANEL: { TASKS: { L: 106, T: 0, W: 48, H: 240, C: 1, R: 8, LW: 3, BUTTON: { W: 48, H: 30 },
																			  IMAGE: { L: 1, T: 29, W: 42, H: 206, C: 1, R: 8, O: 2, PATCH: { W: 42, H: 24 } } },
																},
											  IMAGE: { BEVEL: { L: 1, T: 237, W: 97, H: 30, O: 1, C: 2, R: 1, PATCH: { W: 48, H: 30 } }
														}
											}
							 },
				 COURIER: {
								INFO: { },
								CONSOLE: { },
							 },
				 DOCKED: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
							  ACTION: { JUMP: 0, TRADE: 1, COURIER: 2, MISSION: 3, DOCKING: 4, HACKING: 5, ROAMING: 6, VOYAGE: 7 },
							  IMAGE: { BEVEL: { L: 73, T: 111, W: 286, H: 92, O: 2, C: 2, R: 1, PATCH: { W: 142, H: 92 } }
										},
							  BUTTOnPANEL: { ACTIONS: { L: 5, T: 25, W: 284, H: 368, C: 2, R: 4, LW: 3,
																 BUTTON: { W: 142, H: 92 }, OFFSETS: { X: 0, Y: 0 },
																 IMAGE: { L: 371, T: 1, W: 274, H: 354, C: 2, R: 4, O: 2, PATCH: { W: 136, H: 86 } } }
												},
							  BUTTON: { QUIT: { L: 320, T: 349, W: 75, H: 44, LW: 3, SX: 144, SY: 311, STYLE: BUTTON.STYLE.RAISED },
											HELP: { L: 320, T: 300, W: 75, H: 44, LW: 3, SX: 2, SY: 191, STYLE: BUTTON.STYLE.RAISED },
											OPTIONS: { L: 320, T: 251, W: 75, H: 44, LW: 3, SX: 2, SY: 151, STYLE: BUTTON.STYLE.RAISED },
											CARGO: { L: 320, T: 25, W: 75, H: 44, LW: 3, SX: 2, SY: 231, STYLE: BUTTON.STYLE.RAISED },
											PILOTS: { L: 320, T: 74, W: 75, H: 44, LW: 3, SX: 2, SY: 271, STYLE: BUTTON.STYLE.RAISED },
											ARSENAL: { L: 320, T: 123, W: 75, H: 44, LW: 3, SX: 73, SY: 271, STYLE: BUTTON.STYLE.RAISED }
										 },
							  INFO: { },
							  CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID }
							},
				 DOCKING: { COLOUR: "black", SHIPS: 8
							 },
				 JUMP: {
							INFO: { },
							CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
										  BUTTON: { JUMP: { L: 1, T: 1, W: 75, H: 44, LW: 3, SX: 144, SY: 271, STYLE: BUTTON.STYLE.RAISED },
														DOCK: { L: 78, T: 1, W: 75, H: 44, LW: 3, SX: 2, SY: 311, STYLE: BUTTON.STYLE.RAISED },
														HELP: { L: 1, T: 195, W: 75, H: 44, LW: 3, SX: 2, SY: 191, STYLE: BUTTON.STYLE.RAISED },
														OPTIONS: { L: 78, T: 195, W: 75, H: 44, LW: 3, SX: 2, SY: 151, STYLE: BUTTON.STYLE.RAISED }
													 }
										}
						 },
				 TRADE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
							 IMAGE: { SIDE: { L: 53, T: 106, W: 18, H: 26, O: 2, C: 4, R: 1, PATCH: { W: 3, H: 26 }, GAP: 384 }
									  },
							 BUTTON: { DOCK: { L: 322, T: 353, W: 75, H: 44, LW: 3, SX: 2, SY: 311, STYLE: BUTTON.STYLE.RAISED }
										},
							 INFO: { },
							 CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
											IMAGE: { SHIP: { L: 1, T: 220, W: 24, H: 13 },
														STATION: { L: 27, T: 220, W: 25, H: 25 }
													 },
											BUTTON: { LAUNCH: { L: 79, T: 208, W: 75, H: 30, LW: 3, SX: 2, SY: 118, STYLE: BUTTON.STYLE.RAISED }
													  }
									    }
							},
				 VOYAGE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID, STATE: { LAUNCHING: 0, JUMPING: 1, TRAVELLING: 2 },
							  TASK: { WORDS: 0, PIRATES: 1, BOUNTY: 2, MINING: 3, ORBS: 4, SOCIAL: 5, SHIPS: 6, CLEAR: 7 },
							  INFO: { },
							  CONSOLE: { }
							},
				 WORDS: { CELL: { STATE: { CLEAR: 0, INCORRECT: 1, CLOSE: 2, CORRECT: 3 } }, 
							 INFO: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
										GRID: { CELLS: 25, C: 5, R: 5, W: 41, H: 41, LW: 2 },
										IMAGE: { LETTERS: { L: 61, T: 2, W: 308, H: 60, O: 4, C: 13, R: 2, PATCH: { W: 20, H: 28 } },
													CELL: { L: 328, T: 205, W: 41, H: 41 },
													SUbCELL: { L: 328, T: 248, W: 37, H: 37 },
													SELECTION: { L: 328, T: 287, W: 33, H: 33 }
												 }
									  },
							 CONSOLE: { COLOUR: SOLArCOLOUR.COCKPIT.LIVID,
											IMAGE: { BUTTON: { L: 294, T: 64, W: 66, H: 32, O: 2, C: 2, R: 1, PATCH: { W: 32, H: 32 } },
														LETTERS: { L: 61, T: 64, W: 231, H: 45, O: 3, C: 13, R: 2, PATCH: { W: 15, H: 21 } }
													 },
											 BUTTON: { EXIT: { L: 98, T: 208, W: 58, H: 32, LW: 3, SX: 1, SY: 1, STYLE: BUTTON.STYLE.RAISED }
														}
										  }
							}
};
