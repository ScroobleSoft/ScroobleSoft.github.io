
var INTRO = { BUTTON: { FEATURED: { L: 12, T: 12, W: 90, H: 90, LW: 3, SX: 258, SY: 151, STYLE: BUTTON.STYLE.RAISED },
								DAILY: { L: 12, T: 115, W: 90, H: 90, LW: 3, SX: 344, SY: 151, STYLE: BUTTON.STYLE.RAISED },
								WEEKLY: { L: 12, T: 218, W: 90, H: 90, LW: 3, SX: 430, SY: 151, STYLE: BUTTON.STYLE.RAISED }
							 }
};

var VIEW = { INTRO: { COLOUR: InterfaceColours[0],
							 INFO: { COLOUR: InterfaceColours[1],
										RADIO: { PLAyMODE: { L: 105, T: 185, W: 92, H: 10, GAP: 35, ORIENT: ORIENTATION.HORIZONTAL, SELECT: 0,
																	OPTIONS: [ "Play", "Drive" ], BACKGROUND: InterfaceColours[1] }
												 },
										CHECkBOX: { AUToPLAY: { L: 10, T: 184, W: 15, H: 14, LABEL: "Auto Play", BACKGROUND: InterfaceColours[1] } },
										BUTTON: { SCRAMBLE: { L: 60, T: 210, W: 75, H: 25, LW: 3, COLOUR: GREY.SILVER, LABEL: "Scramble",
																	 STYLE: BUTTON.STYLE.RAISED, BACKGROUND: InterfaceColours[1] },
													 EDIT: { L: 140, T: 210, W: 55, H: 25, LW: 3, COLOUR: GREY.SILVER, LABEL: "Edit",
																STYLE: BUTTON.STYLE.RAISED, BACKGROUND: InterfaceColours[1] }
												  }
									 },
							 CONSOLE: { COLOUR: InterfaceColours[2],
											BUTTON: { NEW: { L: 48, T: 5, W: 100, H: 30, LW: 3, SX: 620, SY: 2, STYLE: BUTTON.STYLE.RAISED },
														 DAILY: { L: 100, T: 105, W: 90, H: 30, LW: 3, SX: 344, SY: 179, STYLE: BUTTON.STYLE.RAISED },
														 FEATURED: { L: 100, T: 205, W: 90, H: 30, LW: 3, SX: 258, SY: 179, STYLE: BUTTON.STYLE.RAISED }
													  }
										 }
						  },
				 DRAFT: { PREVIEW: { PAGES: 4, COLUMNS: 3, C: 3, R: 32, Y: 48, CW: 200, RH: 16, PAGE: { ITEMS: 96 } },
							 STATE: { INTRO: 0, NEEDS: 1, SELECTION: 2, AUTO: 3, PROJECTS: 4, CAMP: 5 },
							 TOUChBAR: { ROUND: { L: 400, T: 540, W: 169, H: 25, KEYS: 7, KEY: { W: 23, H: 23 }, SELECT: 0, ORIENT: ORIENTATION.HORIZONTAL,
														 IMAGE: { L: 1, T: 285, W: 169, H: 25 }, COLOUR: { KEY: "white" }, BACKGROUND: GREY.ASH },
											 POSITION: { L: 479, T: 565, W: 121, H: 35, KEYS: 10, KEY: { W: 23, H: 16 }, SELECT: -1, C: 5, R: 2, NULL: true,
															 IMAGE: { L: 117, T: 350, W: 121, H: 35 }, COLOUR: { KEY: "white" }, BACKGROUND: InterfaceColours[0] }
										  },
							 CHECkBOX: { AUToSELECT: { L: 405, T: 580, W: 15, H: 14, LABEL: "Auto", BACKGROUND: GREY.ASH } },
							 BUTTON: { AUToSELECT: { L: 456, T: 570, W: 50, H: 25, LW: 3, LABEL: "Start", COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" },
															 STYLE: BUTTON.STYLE.RAISED, BACKGROUND: GREY.ASH },
										  SELECT: { L: 512, T: 570, W: 52, H: 25, LW: 3, LABEL: "Select", COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" },
										  				STYLE: BUTTON.STYLE.RAISED, BACKGROUND: GREY.ASH },
										  TRADeUP: { L: 517, T: 1, W: 32, H: 22, LW: 2, LABEL: "Up", STYLE: BUTTON.STYLE.SHALLOW,
														 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, BACKGROUND: GREY.ASH },
										  TRADeDOWN: { L: 551, T: 1, W: 48, H: 22, LW: 2, LABEL: "Down", STYLE: BUTTON.STYLE.SHALLOW,
															COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, BACKGROUND: GREY.ASH },
										  PREVIOUS: { L: 520, T: 2, SX: 117, SY: 312, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED,
														  BACKGROUND: InterfaceColours[0] },
										  NEXT: { L: 560, T: 2, SX: 151, SY: 312, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED,
														  BACKGROUND: InterfaceColours[0] }
										},
							 IMAGE: { SLOT: { L: 1, T: 31, W: 192, H: 17 },
										 LEGEND: { L: 2, T: 51, W: 80, H: 9, C: 8, R: 1, O: 1, PATCH: { W: 9, H: 9 } },
										 PROJECT: { L: 183, T: 1, W: 4, H: 6 },
										 PROJECtLEGEND: { L: 1, T: 326, W: 57, H: 12, X: 137, Y: 387 },
										 MARKER: { L: 85, T: 50, W: 12, H: 10 },  //REDUNDANT?
										 GRID: { L: 110, T: 272, W: 125, H: 76, X: 268, Y: 320 }
									  },
							 IMAGeMAP: { SPEED: { L: 195, T: 31, W: 25, H: 49, X: 572, Y: 545 } },
							 INFO: { COLOUR: ZFL.INDIGO,
										IMAGeMAP: { SPEED: { L: 135, T: 83, W: 49, H: 25, X: 147, Y: 212 } },
										CHECkBOX: { AUToSELECT: { L: 5, T: 192, W: 15, H: 14, LABEL: "Auto", BACKGROUND: GREY.ASH } },
										BUTTON: { AUToSELECT: { L: 60, T: 185, W: 55, H: 25, LW: 3, LABEL: "Start", COLOUR: BLUE.INDIGO,
																		TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
													 SELECT: { L: 125, T: 185, W: 55, H: 25, LW: 3, LABEL: "Select", COLOUR: BLUE.INDIGO,
																  TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
													 TRADeUP: { L: 45, T: 215, W: 48, H: 22, LW: 2, LABEL: "Up", STYLE: BUTTON.STYLE.SHALLOW,
																 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, BACKGROUND: ZFL.TURQUOISE },
													 TRADeDOWN: { L: 95, T: 215, W: 48, H: 22, LW: 2, LABEL: "Down", STYLE: BUTTON.STYLE.SHALLOW,
																	COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, BACKGROUND: ZFL.TURQUOISE },
													 ACCELERATE: { L: 147, T: 215, W: 25, H: 25, LW: 2, SX: 1, SY: 408, STYLE: BUTTON.STYLE.SHALLOW },
													 DECELERATE: { L: 172, T: 215, W: 25, H: 25, LW: 2, SX: 24, SY: 408, STYLE: BUTTON.STYLE.SHALLOW }
												},
									 },
							 CONSOLE: { COLOUR: InterfaceColours[2], PROSPECTS: { L: 4, T: 64, W: 188, H: 150, SLOT: { H: 15 } }, ITEMS: 10,
											IMAGE: { ALL: { L: 612, T: 480, W: 36, H: 36, X: 5, Y: 13 },
														POSITION: { L: 650, T: 480, W: 24, H: 24 },
														PAGE: { L: 676, T: 480, W: 18, H: 18 },
														SYMBOLS: { L: 2, T: 51, W: 80, H: 9, O: 1, C: 8, R: 1, PATCH: { W: 9, H: 9 } }
													 },
											BUTTON: { PREVIEW: { L: 20, T: 110, W: 120, H: 100, LW: 3, SX: 490, SY: 237, STYLE: BUTTON.STYLE.RAISED,
																		BACKGROUND: InterfaceColours[2] },
														 NEEDS: { L: 160, T: 110, W: 120, H: 100, LW: 3, SX: 628, SY: 41, STYLE: BUTTON.STYLE.RAISED,
																	 BACKGROUND: InterfaceColours[2]	},
														 START: { L: 160, T: 110, W: 120, H: 100, LW: 3, SX: 490, SY: 333, STYLE: BUTTON.STYLE.RAISED,
																	 BACKGROUND: InterfaceColours[2]	},
														 PROJECTS: { L: 20, T: 110, SX: 606, SY: 237, W: 120, H: 100, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																		 BACKGROUND: InterfaceColours[2], MOBILE: { L: 38, T: 40, H: 60, SX: 606, SY: 257 } },
														 CAMP: { L: 160, T: 110, SX: 606, SY: 333, W: 120, H: 100, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																	BACKGROUND: InterfaceColours[2], MOBILE: { L: 38, T: 140, H: 60, SX: 606, SY: 365 } },
														 ALL: { L: 2, T: 10, W: 42, H: 42, LW: 3, C: 5, R: 2, SX: 574, SY: 480, X: 5, Y: 13, STYLE: BUTTON.STYLE.RAISED },
														 POSITIONS: { L: 46, T: 2, W: 30, H: 30, LW: 3, O: 1, C: 5, R: 2, SX: 574, SY: 429, STYLE: BUTTON.STYLE.RAISED },
														 PAGES: { L: 2, T: 218, W: 22, H: 22, LW: 2, O: 1, C: 8, R: 2, SX: 269, SY: 496, STYLE: BUTTON.STYLE.SHALLOW,
																	 BACKGROUND: BLUE.INDIGO }
													  },
											PAGINATION: { PROSPECT: { L: 5, T: 25, W: 290, H: 208, C: 14, R: 3, ITEM: { H: 15, COUNT: 10, COLOUR: "", MAX: 366 },
																			  COLOUR: { PAGE: ZFL.TURQUOISE, STRIP: "white", SELECTION: GREY.SILVER, BACKGROUND: BLUE.INDIGO },
																			  IMAGE: { L: 1, T: 453, W: 267, H: 58 }, PAGE: { W: 270, H: 150 } }
															},
											TOUChBAR: { PROSPECT: { L: 1, T: 255, W: 298, H: 64, KEYS: 12, KEY: { W: 98, H: 20 }, C: 3, R: 3, SELECT: 0,
																			IMAGE: { L: 274, T: 430, W: 298, H: 64 }, COLOUR: { KEY: "white" } },
															POSITION: { L: 5, T: 5, W: 265, H: 18, KEYS: 11, KEY: { W: 23, H: 16 }, C: 11, R: 1, SELECT: 0,
																			ORIENT: ORIENTATION.HORIZONTAL, IMAGE: { L: 5, T: 433, W: 265, H: 18 }, COLOUR: { KEY: "white" } }
														 }
										 },
							 CAMP: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400, MOBILE: { L: 0, T: 0 },
										BUTTON: { CAUTIOUS: { L: 150, T: 260, W: 80, H: 80, LW: 3, LABEL: "Cautious", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																	 BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 50, T: 160 } },
													 BALANCED: { L: 260, T: 260, W: 80, H: 80, LW: 3, LABEL: "Balanced", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																	 BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 160, T: 160 } },
													 INTENSE: { L: 370, T: 260, W: 80, H: 80, LW: 3, LABEL: "Intense", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																	BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 270, T: 160 } },
													 OK: { L: 270, T: 460, W: 60, H: 30, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
															 BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 330, T: 360 } }
												  },
										IMAGE: { OUTCOME: { L: 1, T: 83, W: 108, H: 227, X: 46, Y: 320, MOBILE: { X: 20, Y: 169 } },
													MARKER: { L: 111, T: 83, W: 22, H: 18, O: 2, C: 2, R: 1, PATCH: { W: 10, H: 18 } }
												 }
									 },
							 PROJECTS: { COLOUR: InterfaceColours[1], L: 100, T: 200, W: 400, H: 200, MOBILE: { L: 0, T: 100 },
											 BUTTON: { YES: { L: 200, T: 300, W: 80, H: 40, LW: 3, LABEL: "Yes", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																	BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 100, T: 220 } },
														  NO: { L: 320, T: 300, W: 80, H: 40, LW: 3, LABEL: "No", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																  BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 220, T: 220 } },
														  OK: { L: 280, T: 360, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
																  BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 180, T: 265 } }
														}
										  },
							 TRADeUP: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400, BUTTONS: 2,
											RADIO: { PICKS: { L: 110, T: 135, W: 148, H: 11, GAP: 7, ORIENT: ORIENTATION.VERTICAL, SELECT: 0, OPTIONS: [ ],
																	BACKGROUND: InterfaceColours[1] }
													 },
											BUTTON: { CANCEL: { L: 240, T: 460, W: 60, H: 25, LW: 3, LABEL: "Cancel", STYLE: BUTTON.STYLE.RAISED,
																	  COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														 OK: { L: 320, T: 460, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.RAISED,
																 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
													}
										 },
							 TRADeDOWN: { COLOUR: InterfaceColours[1], L: 200, T: 200, W: 200, H: 150, BUTTONS: 2, MOBILE: { L: 100, T: 125 },
											  BUTTON: { CANCEL: { L: 240, T: 315, W: 60, H: 25, LW: 3, LABEL: "Cancel", STYLE: BUTTON.STYLE.RAISED,
																		 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, MOBILE: { L: 140, T: 240 } },
															OK: { L: 320, T: 315, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.RAISED,
																	COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, MOBILE: { L: 220, T: 240 } }
														 }
											}
						  },
				 EXIT: { COLOUR: InterfaceColours[2],
							BUTTON: { EXIT: { L: 114, T: 178, W: 80, H: 60, LW: 3, SX: 21, SY: 332, STYLE: BUTTON.STYLE.RAISED }
									  }
						 },
				 FREeAGENCY: { COLUMN: { COUNT: 30 }, ENTRIES: 1232,
									COLOUR: { BORDER: "rgb(079,127,047)", PANES: "rgb(191,207,031)", CONSOLE: "rgb(063,175,000)" }
								 },
				 GRIDDER: { COLOUR: ZFL.TURQUOISE, L: 92, T: 0, W: 200, H: 240, STATE: { TRADE: 0, PREVIEW: 1, DRAFT: 2, SEASON: 3, END: 4 },
								MODE: { ROSTER: 0, DRAFT: 1 },
								BUTTON: { DEMOTE: { L: 100, T: 155, W: 60, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Demote", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
											 CUT: { L: 175, T: 155, W: 45, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Cut", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
											 TRADE: { L: 240, T: 155, W: 50, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Trade", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
											 MARK: { L: 175, T: 155, W: 60, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Mark", STYLE: BUTTON.STYLE.RAISED,
														TEXT: { COLOUR: "white" }, BACKGROUND: ZFL.TURQUOISE },
											 UnMARK: { L: 240, T: 155, W: 80, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Unmark", STYLE: BUTTON.STYLE.RAISED,
														  TEXT: { COLOUR: "white" }, BACKGROUND: ZFL.TURQUOISE },
											 CANCEL: { L: 100, T: 185, W: 50, H: 20, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Cancel", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE }
										  },
								RADIO: { TRADE: { L: 235, T: 185, W: 11, H: 26, GAP: 4, ORIENT: ORIENTATION.VERTICAL, OPTIONS: [ "Player", "Pick" ],
														SELECT: 0, BACKGROUND: ZFL.TURQUOISE } },
								IMAGE: { EYE: { L: 23, T: 18, W: 14, H: 6, O: 2, R: 1, C: 2, PATCH: { W: 12, H: 6 } },
											PUPIL: { L: 51, T: 18, W: 62, H: 4, O: 2, R: 1, C: 8, PATCH: { W: 6, H: 4 } },
											NOSE: { L: 115, T: 18, W: 6, H: 10 },
											MOUTH: { L: 101, T: 24, W: 12, H: 4 }
										 }
							 },
				 LEAGUE: { COLOUR: InterfaceColours[0],
							  LABEL: { PHONE: { X: 5, Y: 15 }, TABLET: { TDFC: { X: 35, Y: 35 }, SMFC: { X: 35, Y: 315 } } },
							  IMAGE: { HELMET: { R: 2, C: 16, W: 32, H: 32, O: 2 } },
							  BUTTON: { TEAM: { L: 35, T: 50, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED, C: 4, PHONE: { L: 10, T: 45, C: 3, O: 130 } } },
							  ICOnPANEL: { CONFERENCE: { L: 280, T: 8, W: 112, H: 24, C: 2, R: 1, LW: 3, ICONS: 2, ICON: { W: 56, H: 24 }, PRESS: 0,
																  IMAGE: { L: 516, T: 2, W: 102, H: 18, O: 2, C: 2, R: 1, PATCH: { W: 50, H: 18 } } }
											 },
							  INFO: { COLOUR: InterfaceColours[1] },
							  CONSOLE: { COLOUR: InterfaceColours[2],
											 TOUChBAR: { LEAGUE: { L: 10, T: 30, W: 44, H: 211, KEYS: 14, KEY: { W: 42, H: 14 }, SELECT: 0,
																		  ORIENT: ORIENTATION.VERTICAL, IMAGE: { L: 185, T: 137, W: 44, H: 211 } },
															 DIFFICULTY: { L: 60, T: 270, W: 193, H: 25, O: 1, KEYS: 8, KEY: { W: 23, H: 23 }, SELECT: 7,
																				ORIENT: ORIENTATION.HORIZONTAL, IMAGE: { L: 327, T: 28, W: 193, H: 25 } }
														  },
											 RADIO: { GAMeOPTIONs: { L: 110, T: 30, W: 11, H: 41, GAP: 4, ORIENT: ORIENTATION.VERTICAL, SELECT: 2,
																			 OPTIONS: [ "Fixed", "Minimum", "Random" ] } }
										  }
							},
				 MARKED: { COLOUR: InterfaceColours[1], L: 50, T: 50, W: 300, H: 300,		//TODO:: only phone parameters for now
							  BUTTON: { OK: { L: 180, T: 315, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
													COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
										 }
							},
				 MATCH: { STATS: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400, MOBILE: { L: 0, T: 0 },
										 BUTTON: { OK: { L: 280, T: 360, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED, COLOUR: BLUE.INDIGO,
															  BACKGROUND: InterfaceColours[1], TEXT: { COLOUR: "white" }, MOBILE: { L: 180, T: 265 } }
													},
										 INFO: { COLOUR: InterfaceColours[1] },
										 CONSOLE: { COLOUR: InterfaceColours[2],
														BUTTON: { EXIT: { L: 114, T: 178, W: 80, H: 60, LW: 3, SX: 21, SY: 332, STYLE: BUTTON.STYLE.RAISED }
																  }
													 }
									  },
							 INFO: { COLOUR: InterfaceColours[1]
									 },
							 CONSOLE: { COLOUR: InterfaceColours[2]
										 }
						  },
				 MATChUPs: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400, MOBILE: { L: 0, T: 0 },
								 IMAGE: { TEAM: { L: 237, T: 275, W: 38, H: 19 },
											 PLAYER: { L: 237, T: 296, W: 43, H: 19 },
											 RATING: { L: 237, T: 317, W: 44, H: 19 },
											 DIFFERENTIAL: { L: 237, T: 338, W: 24, H: 19 },
											 SELECTION: { L: 1, T: 379, W: 196, H: 17 },
											 DeSELECTION: { L: 1, T: 398, W: 196, H: 17 }
										  }
							  },
				 PRIORITIES: { COLOUR: InterfaceColours[1], STATE: { UNCLICKED: 0, CLICKED: 1 },
									SLOTS: 36, SLOT: { X: 2, Y: 2, W: 32, H: 32, C: 6, R: 6, GAP: -1, LABEL: { X: 3, Y: 11 } },
									IMAGE: { LABELS: { L: 111, T: 171, W: 107, H: 98, O: 1, C: 4, R: 9, PATCH: { W: 26, H: 10 } },
												UNPRESSED: { L: 194, T: 102, W: 32, H: 32 },
												PRESSED: { L: 194, T: 136, W: 32, H: 32 }
											 },
									BUTTON: { EXIT: { L: 48, T: 200, W: 100, H: 35, LW: 3, LABEL: "Exit", STYLE: BUTTON.STYLE.RAISED,
															COLOUR: ZFL.STEEL, TEXT: { COLOUR: "white" } }
											  }
								 },
				 PROSPECTS: { COLOUR: ZFL.TURQUOISE, PAGES: 8, COLUMNS: 2, COLUMN: { ENTRIES: 25 }, ENTRIES: 50, ENTRY: { L1: 5, L2: 205, T: 13, H: 16 },
								  IMAGE: { SYMBOLS: { L: 111, T: 109, W: 80, H: 59, C: 8, R: 6, O: 1, PATCH: { W: 9, H: 9 } },
											  MARKER: { L: 85, T: 50, W: 10, H: 10 },
											  VOLATILE: { L: 189, T: 1, W: 5, H: 7 }
											},
								  CONSOLE: { COLOUR: ZFL.TURQUOISE,
												 IMAGE: { ALL: { X: 5, Y: 53 },
															 LEGEND: { L: 1, T: 350, W: 193, H: 27, X: 1, Y: 156 }
														  },
												 BUTTON: { PREVIOUS: { L: 118, T: 2, SX: 117, SY: 312, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																			  BACKGROUND: ZFL.TURQUOISE },
															  NEXT: { L: 156, T: 2, SX: 151, SY: 312, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																		 BACKGROUND: ZFL.TURQUOISE },
															  MARKED: { L: 9, T: 191, W: 84, H: 40, LW: 3, SX: 628, SY: 137, STYLE: BUTTON.STYLE.RAISED },
															  START: { L: 103, T: 191, W: 84, H: 40, LW: 3, SX: 154, SY: 387, STYLE: BUTTON.STYLE.RAISED },
															  ALL: { L: 2, T: 50, W: 42, H: 42, LW: 3, C: 5, R: 2, SX: 574, SY: 480, STYLE: BUTTON.STYLE.RAISED },
															  POSITIONS: { L: 46, T: 42, W: 30, H: 30, LW: 3, O: 1, C: 5, R: 2, SX: 574, SY: 429,
																				STYLE: BUTTON.STYLE.RAISED },
															}
											 }
								},
				 RETIREMENT: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400,
									BUTTON: { OK: { L: 280, T: 460, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
														 BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
											  }
								 },
				 ROSTER: { COLOUR: BLUE.POWDER, STATE: { PReSEASON: 0, PReDRAFT: 1, SEASON: 2 }, PHONE: { SLOTS: 25 },
							  ICOnPANEL: { OFFDEF: { L: 314, T: 5, W: 82, H: 25, C: 2, R: 1, LW: 3, ICONS: 2, ICON: { W: 41, H: 25 }, PRESS: 0,
																  IMAGE: { L: 117, T: 387, W: 35, H: 40, O: 2, C: 1, R: 2, PATCH: { W: 35, H: 19 } } }
											 },
							  BUTTON: { POSITIONS: { L: -1, T: -1, W: 30, H: 18, LW: 2, COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, LABEL: "",
															 STYLE: BUTTON.STYLE.SHALLOW, BACKGROUND: BLUE.POWDER },
											UP: { L: 296, T: 336, W: 34, H: 32, LW: 3, SX: 690, SY: 181, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: BLUE.POWDER },
											DOWN: { L: 296, T: 368, W: 34, H: 32, LW: 3, SX: 690, SY: 209, STYLE: BUTTON.STYLE.RAISED, BACKGROUND: BLUE.POWDER }
										 },
							  TRADE: { COLOUR: BLUE.INDIGO,
										  PAGINATION: { TARGETS: { L: 5, T: 30, W: 260, H: 250, C: 10, R: 1, ITEM: { H: 15, COUNT: 15, COLOUR: "", MAX: 150 },
																			COLOUR: { PAGE: ZFL.TURQUOISE, STRIP: "white", SELECTION: GREY.SILVER, BACKGROUND: BLUE.INDIGO },
																			IMAGE: { L: 273, T: 1, W: 241, H: 25, PATCH: { W: 23, H: 23 } }, PAGE: { W: 260, H: 225 } }
														  },
										  TOUCHBAR: { POSITION: { L: 270, T: 30, W: 25, H: 171, KEYS: 11, KEY: { W: 23, H: 16 }, COLOUR: { KEY: "white" },
																		  SELECT: 0, ORIENT: ORIENTATION.VERTICAL, IMAGE: { L: 231, T: 154, W: 25, H: 171 } }
														},
										  BUTTON: { CANCEL: { L: 160, T: 290, W: 60, H: 25, LW: 3, LABEL: "Cancel", STYLE: BUTTON.STYLE.RAISED,
																	 COLOUR: ZFL.TURQUOISE, TEXT: { COLOUR: BLUE.INDIGO } },
														OK: { L: 230, T: 290, W: 60, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.RAISED,
																COLOUR: ZFL.TURQUOISE, TEXT: { COLOUR: BLUE.INDIGO } }
													 }
										}
							},
				 SEASON: { COLOUR: PASTEL.OFfWHITE, STATE: { MATCH: 0, NEXT: 1 },
							  INFO: { COLOUR: InterfaceColours[1],
										 IMAGE: { SELECTION: { L: 237, T: 257, W: 49, H: 16 } }
									  },
							  CONSOLE: { COLOUR: InterfaceColours[2],
											 RADIO: { SIM: { L: 130, T: 121, W: 62, H: 88, GAP: 7, ORIENT: ORIENTATION.VERTICAL, SELECT: 3,
																  OPTIONS: [ "Plays", "Drive", "Quarter", "Match" ], BACKGROUND: InterfaceColours[2] }
													  },
											 BUTTON: { PLAY: { L: 130, T: 194, W: 60, H: 42, LW: 3, SX: 722, SY: 137, STYLE: BUTTON.STYLE.RAISED },
														  NEXT: { L: 130, T: 194, W: 60, H: 42, LW: 3, SX: 722, SY: 175, STYLE: BUTTON.STYLE.RAISED },
														  EXIT: { L: 5, T: 210, W: 50, H: 25, LW: 3, LABEL: "Exit", STYLE: BUTTON.STYLE.RAISED,
																					 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														  HELP: { L: 60, T: 210, W: 50, H: 25, LW: 3, LABEL: "Help", STYLE: BUTTON.STYLE.RAISED,
																					 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														  MATChUPs: { L: 107, T: 83, W: 80, H: 25, LW: 3, LABEL: "Match-Ups", STYLE: BUTTON.STYLE.RAISED,
																					 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														  STATS: { L: 137, T: 82, W: 50, H: 25, LW: 3, LABEL: "Stats", STYLE: BUTTON.STYLE.RAISED,
																					 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
														},
											 GAUGE: { QUARTER: { L: 15, T: 118, W: 110, H: 20, COLOUR: "red", ORIENTATION: ORIENTATION.HORIZONTAL, GAP: 23 }
													  }
										  }
							},
				 SQUAD: { T: 0, L: 0, W: CONTROlPANEL.WIDTH, H: 160, COLOUR: "blue",
							 IMAGE: { SYMBOLS: { L: 97, T: 50, W: 90, H: 11, O: 1, C: 9, R: 1, PATCH: { W: 9, H: 9 } },
										 PROJECT: { L: 1, T: 312, W: 58, H: 12, X: 6, Y: 146 }
									  },
							 BUTTON: { FAs: { L: 0, T: 186, W: 98, H: 54, LW: 3, SX: 284, SY: 99, STYLE: BUTTON.STYLE.RAISED },
										  SEASON: { L: 98, T: 186, W: 98, H: 54, SX: 400, SY: 89, LW: 3, STYLE: BUTTON.STYLE.RAISED },
										  SIGN: { L: 0, T: 163, W: 98, H: 77, LW: 3, SX: 385, SY: 344, STYLE: BUTTON.STYLE.RAISED },
										  DRAFT: { L: 98, T: 163, W: 98, H: 77, SX: 269, SY: 249, LW: 3, STYLE: BUTTON.STYLE.RAISED },
										  WAIVER: { L: 0, T: 163, W: 98, H: 77, LW: 3, SX: 269, SY: 344, STYLE: BUTTON.STYLE.RAISED },
										  MATCH: { L: 0, T: 163, W: 98, H: 77, LW: 3, SX: 386, SY: 249, STYLE: BUTTON.STYLE.RAISED }
										}
						  },
				 TABLE: { L: 30, T: 40, W: 540, H: 540, COLUMN: { W: 135, H: 540, ENTRIES: 36 }, ENTRY: { H: 15 } },
				 TEAM: { SUB: { INFO: 0, ROSTER: 1, TRANSACTIONS: 2, PLAYBOOK: 3, OPPONENT: 4, LEAGUE: 5 },
							INFO: { COLOUR: InterfaceColours[1],
									  ICONS: { SECTION: { L: 5, T: 5, W: 86, H: 144, LW: 3, ICONS: 6, ICON: { W: 80, H: 18 }, R: 6, C: 1, PRESS: 1,
																 IMAGE: { L: 103, T: 137, W: 80, H: 113, O: 2, R: 6, C: 1, PATCH: { W: 80, H: 18 } }
															  }
												},
									},
							CONSOLE: { COLOUR: InterfaceColours[2],
										  BUTTON: { PENDINgFAs: { L: 20, T: 200, W: 120, H: 100, LW: 3, SX: 273, SY: 55, STYLE: BUTTON.STYLE.RAISED },
														STARtSEASON: { L: 160, T: 200, W: 120, H: 100, LW: 3, SX: 389, SY: 55, STYLE: BUTTON.STYLE.RAISED },
														DRAFT: { L: 160, T: 200, W: 120, H: 100, LW: 3, SX: 258, SY: 237, STYLE: BUTTON.STYLE.RAISED },
														MATCH: { L: 20, T: 200, W: 120, H: 100, LW: 3, SX: 374, SY: 237, STYLE: BUTTON.STYLE.RAISED },
														WAIVER: { L: 160, T: 200, W: 120, H: 100, LW: 3, SX: 258, SY: 333, STYLE: BUTTON.STYLE.RAISED },
														FA: { L: 20, T: 200, W: 120, H: 100, LW: 3, SX: 374, SY: 333, STYLE: BUTTON.STYLE.RAISED }
													 }
										}
						 },
				 PENDING: { COLUMN: { COUNT: 8 }, ENTRIES: 288, COLOUR: { BORDER: "rgb(000,159,095)", PANES: "rgb(047,191,000)", CONSOLE: "rgb(255,239,000)" } },
				 TEAmFAs: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400,
								BUTTON: { OK: { L: 280, T: 460, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
														 BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
										  }
							 }
};
