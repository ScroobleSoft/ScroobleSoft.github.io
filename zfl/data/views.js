
var INTRO = { BUTTON: { FEATURED: { L: 12, T: 12, W: 90, H: 90, LW: 3, SX: 258, SY: 151, STYLE: BUTTON.STYLE.RAISED },
								DAILY: { L: 12, T: 115, W: 90, H: 90, LW: 3, SX: 344, SY: 151, STYLE: BUTTON.STYLE.RAISED },
								WEEKLY: { L: 12, T: 218, W: 90, H: 90, LW: 3, SX: 430, SY: 151, STYLE: BUTTON.STYLE.RAISED }
							 }
};

var VIEW = { LEAGUE: { COLOUR: InterfaceColours[0],
							  IMAGE: { HELMET: { R: 2, C: 16, W: 32, H: 32, O: 2 } },
							  BUTTON: { TEAM: { L: 35, T: 50, W: 38, H: 38, LW: 3, STYLE: BUTTON.STYLE.RAISED, C: 4 } },
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
				 ROSTER: { COLOUR: BLUE.POWDER,
							  BUTTON: { POSITIONS: { L: -1, T: -1, W: 30, H: 18, LW: 2, COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" }, LABEL: "",
															 STYLE: BUTTON.STYLE.SHALLOW, BACKGROUND: BLUE.POWDER } },
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
				 RETIREMENT: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400,
									BUTTON: { OK: { L: 280, T: 460, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
														 BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
											  }
								 },
				 TABLE: { L: 30, T: 40, W: 540, H: 540, COLUMN: { W: 135, H: 540, ENTRIES: 36 }, ENTRY: { H: 15 } },
				 PENDING: { COLUMN: { COUNT: 8 }, ENTRIES: 288, COLOUR: { BORDER: "rgb(000,159,095)", PANES: "rgb(047,191,000)", CONSOLE: "rgb(255,239,000)" } },
				 DRAFT: { PREVIEW: { PAGES: 4, COLUMNS: 3, C: 3, R: 32, Y: 48, CW: 200, RH: 16, PAGE: { ITEMS: 96 } },
							 STATE: { INTRO: 0, PREVIEW: 1, SELECTION: 2, PROJECTS: 3, CAMP: 4 },
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
										 MARKER: { L: 85, T: 50, W: 12, H: 10 }
									  },
							 IMAGeMAP: { SPEED: { L: 195, T: 31, W: 25, H: 49, X: 572, Y: 545 } },
							 INFO: { COLOUR: ZFL.TURQUOISE },
							 CONSOLE: { COLOUR: InterfaceColours[2],
											BUTTON: { PREVIEW: { L: 20, T: 110, W: 120, H: 100, LW: 3, SX: 490, SY: 237, STYLE: BUTTON.STYLE.RAISED,
																		BACKGROUND: InterfaceColours[2] },
														 START: { L: 160, T: 110, W: 120, H: 100, LW: 3, SX: 490, SY: 333, STYLE: BUTTON.STYLE.RAISED,
																	 BACKGROUND: InterfaceColours[2]	},
														 PROJECTS: { L: 20, T: 110, SX: 606, SY: 237, W: 120, H: 100, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																		 BACKGROUND: InterfaceColours[2] },
														 CAMP: { L: 160, T: 110, SX: 606, SY: 333, W: 120, H: 100, LW: 3, STYLE: BUTTON.STYLE.RAISED,
																	BACKGROUND: InterfaceColours[2] }
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
							 TRADeDOWN: { COLOUR: InterfaceColours[1], L: 200, T: 200, W: 200, H: 150, BUTTONS: 2,
											  BUTTON: { CANCEL: { L: 240, T: 315, W: 60, H: 25, LW: 3, LABEL: "Cancel", STYLE: BUTTON.STYLE.RAISED,
																		 COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
															OK: { L: 320, T: 315, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.RAISED,
																	COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
														 }
											},
							 PROJECTS: { COLOUR: InterfaceColours[1], L: 100, T: 200, W: 400, H: 200,
											 BUTTON: { YES: { L: 200, T: 300, W: 80, H: 40, LW: 3, LABEL: "Yes", STYLE: BUTTON.STYLE.ROUNDED,
																	BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														  NO: { L: 320, T: 300, W: 80, H: 40, LW: 3, LABEL: "No", STYLE: BUTTON.STYLE.ROUNDED,
																  BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
														  OK: { L: 280, T: 360, W: 40, H: 25, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
																  BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
														}
										  },
							 CAMP: { COLOUR: InterfaceColours[1], L: 100, T: 100, W: 400, H: 400,
										BUTTON: { CAUTIOUS: { L: 150, T: 260, W: 80, H: 80, LW: 3, LABEL: "Cautious", STYLE: BUTTON.STYLE.ROUNDED,
																	BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
													 BALANCED: { L: 260, T: 260, W: 80, H: 80, LW: 3, LABEL: "Balanced", STYLE: BUTTON.STYLE.ROUNDED,
																	 BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
													 INTENSE: { L: 370, T: 260, W: 80, H: 80, LW: 3, LABEL: "Intense", STYLE: BUTTON.STYLE.ROUNDED,
																	BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } },
													 OK: { L: 270, T: 560, W: 60, H: 30, LW: 3, LABEL: "Ok", STYLE: BUTTON.STYLE.ROUNDED,
															 BACKGROUND: InterfaceColours[1], COLOUR: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
												  },
										IMAGE: { OUTCOME: { L: 1, T: 83, W: 108, H: 227, X: 46, Y: 320 },
													MARKER: { L: 111, T: 83, W: 22, H: 18, O: 2, C: 2, R: 1, PATCH: { W: 10, H: 18 } }
												 }
									 }
						  },
				 FREeAGENCY: { COLUMN: { COUNT: 30 }, ENTRIES: 1232,
									COLOUR: { BORDER: "rgb(079,127,047)", PANES: "rgb(191,207,031)", CONSOLE: "rgb(063,175,000)" }
								 },
				 GRIDDER: { L: 92, T: 0, W: 205, H: 240, COLOUR: ZFL.TURQUOISE,
								MODE: { ROSTER: 0, DRAFT: 1 },
								BUTTON: { DEMOTE: { L: 100, T: 155, W: 60, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Demote", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
											 CUT: { L: 175, T: 155, W: 45, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Cut", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
											 TRADE: { L: 240, T: 155, W: 50, H: 25, LW: 3, COLOUR: BLUE.INDIGO, LABEL: "Trade", TEXT: { COLOUR: "white" },
														  STYLE: BUTTON.STYLE.RAISED, BACKGROUND: ZFL.TURQUOISE },
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
				 SQUAD: { T: 0, L: 0, W: CONTROlPANEL.WIDTH, H: 160, COLOUR: "blue"
						  }
};
