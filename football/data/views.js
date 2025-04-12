
var VIEW = { LEAGUE: { COLOUR: PAINT.SKY,
							  BUTTON: { ROTATINgBALL: { W: 96, H: 96, LW: 3, SX: 539, SY: 198, STYLE: BUTTON.STYLE.RAISED },
										   TROPHY: { W: 66, H: 66, LW: 3, SX: 1, SY: 1, STYLE: BUTTON.STYLE.RAISED },
											RETURN: { L: 660, T: 6, W: 72, H: 24, LW: 2, LABEL: "Return", STYLE: BUTTON.STYLE.SHALLOW,
														 COLOUR: PAINT.SKY, BACKGROUND: BLUE.INDIGO, TEXT: { COLOUR: "white" } }
										 },
							  INFO: { COLOUR: PAINT.SKY,
										 IMAGE: { OPTIONS: { L: 1, T: 264, W: 342, H: 56, O: 2, C: 4, R: 1, PATCH: { W: 84, H: 56 }, PATCHES: 4 },
													 SELECTION: { L: 345, T: 255, W: 182, H: 62, O: 2, C: 2, R: 1, PATCH: { W: 90, H: 62 } }
												  }
									  },
							  CONSOLE: { COLOUR: PAINT.SKY,
											 BUTTON: { MATCH: { L: 2, T: 202, W: 152, H: 36, LW: 3, SX: 311, SY: 181, STYLE: BUTTON.STYLE.RAISED },  //REDUNDANT?
														  HELP: { L: 4, T: 194, W: 72, H: 44, LW: 3, SX: 529, SY: 292, STYLE: BUTTON.STYLE.RAISED },
														  PAST: { L: 80, T: 194, W: 72, H: 44, LW: 3, SX: 529, SY: 252, STYLE: BUTTON.STYLE.RAISED }
														}
										  }
							},
				 TEAM: { TABS: { L: 400, T: 0, W: 387, H: 20, TABS: 8, TAB: [ 59,107,153,211,259,316,356,387 ], PAGE: { W: 400, H: 580 },
									  FORMATION: 0, TRAINING: 1, TACTICS: 2, TRANSFERS: 3, FIXTURES: 4, OPPONENT: 5, TABLES: 6, STATS: 7,
									  COLOURS: [ FOOTBALL.TAB.COLOUR.BLUE, FOOTBALL.TAB.COLOUR.TURQUOISE, FOOTBALL.TAB.COLOUR.CERULEAN, FOOTBALL.TAB.COLOUR.LIVID,
													 FOOTBALL.TAB.COLOUR.VIOLET, FOOTBALL.TAB.COLOUR.MAGENTA, FOOTBALL.TAB.COLOUR.ORCHID, FOOTBALL.TAB.COLOUR.PURPLE ] },
							IMAGE: { TABS: { L: 1, T: 1, W: 393, H: 20 } },
							INFO: { COLOUR: BLUE.POWDER,
									  ICOnPANEL: { SYMBOLS: { L: 200, T: 5, W: 19, H: 40, LW: 3, R: 2, C: 1, ICONS: 2, ICON: { W: 19, H: 20 }, PRESS: 0,
																	  IMAGE: { L: 205, T: 301, W: 30, H: 15, O: 2, C: 2, R: 1, PATCH: { W: 14, H: 15 } },
																	  BEVEL: { L: 205, T: 318, W: 40, H: 20, O: 2, C: 2, R: 1, PATCH: { W: 19, H: 20 } }
																	}
													 },
									  SECTION: { L: 5, T: 5, W: 190, H: 175 }, FRAME: { L: 15, T: 15, W: 70, H: 65 }, MUGSHOT: { L: 20, T: 20, W: 60, H: 55 },
									  FOOTBALLER: { FACE: { X: 35, Y: 34 }, HAIR: { X: 33, Y: 25 }, PUPIL: { R: { X: 42, Y: 44 }, L: { X: 55, Y: 44 } },
														 SHIRT: [ { X: 39, Y: 63 }, { X: 59, Y: 63 }, { X: 79, Y: 75 }, { X: 20, Y: 75 } ],
														 MONOLID: { R: { X: 41, Y: 42 }, L: { X: 54, Y: 42 } }
													  },
									  FOOTBALLINA: { FACE: { X: 35, Y: 35 }, PUPIL: { R: { X: 42, Y: 44 }, L: { X: 54, Y: 44 } },
														  HAIR: { BUN: { X: 36, Y: 27 }, BANG: { R: { X: 34, Y: 33 }, L: { X: 62, Y: 33 } } },
														  SHIRT: [ { X: 40, Y: 60 }, { X: 61, Y: 60 }, { X: 79, Y: 75 }, { X: 20, Y: 75 } ],
														  MONOLID: { R: { X: 40, Y: 42 }, L: { X: 53, Y: 42 } }
														},
									  NAME: { FIRST: { X: 88, Y: 27 }, LAST: { X: 88, Y: 45 } },
									  POSITION: { X: 88, Y: 67 }, QUALITY: { X: 138, Y: 67 }, AGE: { X: 168, Y: 67 },
									  BIRTH: { HEADING: { X: 15, Y: 95 }, X: 85, Y: 95 },
//										 TYPE: { HEADING: { X: 90, Y: 90 }, X: 90, Y: 110 }, DESIGNATION: { HEADING: { X: 140, Y: 90 }, X: 140, Y: 110 },
									  POTENTIAL: { LABEL: { X: 15, Y: 110 }, X: 70, Y: 110 }, VARIATION: { LABEL: { X: 100, Y: 110 }, X: 155, Y: 110 },
									  PRICE: { LABEL: { X: 15, Y: 125 }, X: 55, Y: 125 }, WAGES: { LABEL: { X: 100, Y: 125 }, X: 150, Y: 125 },
									  STATS: { LABEL: { X: 15, Y: 140 }, X: 50, Y: 140 },
									  INJURY: { LABEL: { X: 15, Y: 155 }, X: 75, Y: 155 }
									},
							CONSOLE: { COLOUR: BLUE.AZURE,
										  BUTTOnPANEL: { TAB: { L: 0, T: 0, W: 156, H: 200, C: 2, R: 5, LW: 3, BUTTON: { W: 78, H: 40 },
																		IMAGE: { L: 311, T: 1, W: 146, H: 78, C: 2, R: 5, O: 2, PATCH: { W: 72, H: 34 } },
																		TEAM: 0, YOUTH: 1, FORMATION: 2, TACTICS: 3, TRAINING: 4, TRANSFERS: 5, 
																		OPPONENT: 6, FIXTURES: 7, TABLES: 8, STATS: 9 }
															},
										  BUTTON: { MATCH: { L: 2, T: 202, W: 152, H: 36, LW: 3, SX: 311, SY: 181, STYLE: BUTTON.STYLE.RAISED }
													 },
										  IMAGE: { BEVEL: { L: 311, T: 213, W: 162, H: 40, O: 2, C: 2, R: 1, PATCH: { W: 78, H: 40 } }
													}
										}
						 },
				 SQUAD: { COLOUR: BLUE.POWDER, L: 0, T: 0, W: 400, H: 547,
							 BUTTON: { POSITION: { L: -1, T: -1, W: 21, H: 19, O: 2, LW: 3, SX: 1, SY: 249, COUNT: 4, STYLE: BUTTON.STYLE.RAISED }
										},
							 CONSOLE: { COLOUR: BLUE.POWDER,
										   BUTTOnPANEL: { TAB: { L: 0, T: 0, W: 156, H: 200, C: 2, R: 5, LW: 3, BUTTON: { W: 78, H: 40 },
																		 IMAGE: { L: 311, T: 1, W: 146, H: 78, C: 2, R: 5, O: 2, PATCH: { W: 72, H: 34 } },
																		 TEAM: 0, YOUTH: 1, FORMATION: 2, TACTICS: 3, TRAINING: 4, TRANSFERS: 5, 
																		 OPPONENT: 6, FIXTURES: 7, TABLES: 8, STATS: 9 }
															},
										   BUTTON: { MATCH: { L: 2, T: 202, W: 152, H: 36, LW: 3, SX: 311, SY: 181, STYLE: BUTTON.STYLE.RAISED }
													  },
											IMAGE: { BEVEL: { L: 311, T: 213, W: 162, H: 40, O: 2, C: 2, R: 1, PATCH: { W: 78, H: 40 } }
													 }
										}
						  },
				 FORMATION: { ICOnPANEL: { FORMATION: { L: 446, T: 458, W: 304, H: 78, C: 4, R: 3, LW: 3, ICONS: 12, ICON: { W: 76, H: 26 },
																	 IMAGE: { L: 109, T: 61, W: 286, H: 64, O: 2, R: 3, C: 4, PATCH: { W: 70, H: 20 } }
																  }
												 },
								  INFO: { COLOUR: BLUE.POWDER
										  },
								  CONSOLE: { COLOUR: BLUE.POWDER,
												 ICOnPANEL: { FORMATION: { L: 2, T: 2, W: 152, H: 156, C: 2, R: 5, LW: 3, ICONS: 12, ICON: { W: 76, H: 26 },
																					IMAGE: { L: 109, T: 61, W: 286, H: 64, O: 2, R: 3, C: 4, PATCH: { W: 70, H: 20 } }
																				 }
																},
												 BUTTON: { AUToSELECT: {  L: 5, T: 165, W: 80, H: 25, LW: 3, LABEL: "Auto Select", STYLE: BUTTON.STYLE.RAISED },
															  SUBS: {  L: 110, T: 165, W: 40, H: 25, LW: 3, LABEL: "Subs", STYLE: BUTTON.STYLE.RAISED },
															  EXIT: { L: 80, T: 194, W: 72, H: 44, LW: 3, SX: 470, SY: 212, STYLE: BUTTON.STYLE.RAISED }
															}
								  }
								},
				 TRAINING: { CONSOLE: { BUTTON: { TRAIN: { L: 100, T: 275, W: 100, H: 100, LW: 2, SX: 636, SY: 99, STYLE: BUTTON.STYLE.SHALLOW }
														  }
											 }
							  },
				 TABLES: { COLOUR: "rgb(000,159,111)", COLOURS: { BUTTON: "rgb(223,239,047)" },
							  IMAGE: { HEADING: { L: 1, T: 34, W: 150, H: 20 }
										},
							  INFO: { },
							  CONSOLE: { COLOUR: "rgb(223,239,047)",
											 ICOnPANEL: { COMPETITION: { L: 15, T: 15, W: 126, H: 150, C: 1, R: 5, LW: 3, ICONS: 5, ICON: { W: 126, H: 32 }, PRESS: 0,
																				  IMAGE: { L: 734, T: 1, W: 120, H: 138, O: 2, R: 5, C: 1, PATCH: { W: 120, H: 26 } }
																				}
															},
											 BUTTON: { EXIT: { L: 80, T: 194, W: 72, H: 44, LW: 3, SX: 538, SY: 212, STYLE: BUTTON.STYLE.RAISED }
														}
										  }
							},
				 TACTICS: {	CONSOLE: { BUTTON: { KICkOFF: { L: 100, T: 275, W: 100, H: 100, LW: 2, SX: 636, SY: 1, STYLE: BUTTON.STYLE.SHALLOW }
														 }
											}
							 },
				 TRANSFERS: { COLOUR: "rgb(239,217,239)", TEXT: "rgb(159,031,159)", SELECTION: "rgb(207,175,223)", OFFSET: 12,
								  FRAME: { L: 0, T: 0, W: 189, H: 380, LW: 2 },
								  BUTTON: { SELL: { L: 147, T: 380, W: 41, H: 19, LW: 3, SX: 168, SY: 316, STYLE: BUTTON.STYLE.RAISED },
												BUY: { L: 355, T: 380, W: 41, H: 19, LW: 3, SX: 168, SY: 301, STYLE: BUTTON.STYLE.RAISED }
											 },
								  SPInCONTROL: { L: 413, T: 55, W: 16, H: 25, O: 17, COUNT: 5,
													  IMAGE: { BUTTON: { L: 222, T: 22, W: 54, H: 10, O: 2, C: 4, R: 1, PATCH: { W: 12, H: 10 },
																				BACKGROUND: "rgb(175,143,191)"},
																  PAD: { L: 222, T: 34, W: 16, H: 25 }
																}
													},
								  PAGINATION: { SPECS: { PATCH: { W: 14, H: 14 }, BACKGROUND: FOOTBALL.TAB.COLOUR.LIVID,
																 COLOUR: { PAGE: FOOTBALL.TAB.COLOUR.TURQUOISE, STRIP: "white", SELECTION: FOOTBALL.TAB.COLOUR.BLUE }
															  },
													 IMAGE: { ALL: { L: 227, T: 202, W: 151, H: 46 },
																 POSITION: { L: 240, T: 34, W: 151, H: 16 }
															  },
													 ALL: { L: 410, T: 90, W: 155, H: 500, ITEM: { H: 15, COUNT: 30, MAX: 900 }, R: 3, C: 10 },
													 G: { L: 605, T: 90, W: 155, H: 78, ITEM: { H: 15, COUNT: 4, MAX: 40 } },
													 D: { L: 605, T: 175, W: 155, H: 138, ITEM: { H: 15, COUNT: 8, MAX: 80 } },
													 M: { L: 605, T: 320, W: 155, H: 153, ITEM: { H: 15, COUNT: 9, MAX: 90 } },
													 A: { L: 605, T: 483, W: 155, H: 108, ITEM: { H: 15, COUNT: 6, MAX: 60 } },
													 MOBILE: { L: 195, T: 1, W: 200, H: 366, ITEM: { H: 14, COUNT: 25, MAX: 250 },
																  COLOUR: { FRAME: "rgb(159,031,159)", PAGE: "rgb(239,217,239)", BACKGROUND: "rgb(239,217,239)",
																				STRIP: "white", SELECTION: "rgb(207,175,223)" },
																  IMAGE: { L: 176, T: 342, W: 151, H: 16, O: 1, PATCH: { W: 14, H: 14 } } }
												  },
								  TOUChBAR: { SPECS: { COLOUR: { KEY: "white", SELECTION: "rgb(207,175,223)" }
															},
												  DESIGNATION: { L: 565, T: 30, W: 229, H: 49, KEYS: 23, KEY: { W: 75, H: 15 }, MULTI: true,
																	  SELECT: [ 0,1,2,3,4,5,6,7,8 ], ORIENT: ORIENTATION.MIXED,
																	  IMAGE: { L: 167, T: 250, W: 229, H: 49 }
																	},
												  ALL: { L: 570, T: 143, W: 28, H: 301, KEYS: 23, KEY: { W: 26, H: 11 }, MULTI: true,
															SELECT: [ 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22 ], ORIENT: ORIENTATION.VERTICAL,
															IMAGE: { L: 508, T: 1, W: 28, H: 301 }
														 },
												  D: { L: 765, T: 175, W: 28, H: 97, KEYS: 8, KEY: { W: 26, H: 11 }, MULTI: true,
														 SELECT: [ 0,1,2,3,4,5,6,7 ], ORIENT: ORIENTATION.VERTICAL,
														 IMAGE: { L: 167, T: 127, W: 28, H: 97 }
													  },
												  M: { L: 765, T: 321, W: 28, H: 121, KEYS: 9, KEY: { W: 26, H: 11 }, MULTI: true,
														 SELECT: [ 0,1,2,3,4,5,6,7,8 ], ORIENT: ORIENTATION.VERTICAL,
														 IMAGE: { L: 197, T: 127, W: 28, H: 121 }
													  },
												  A: { L: 765, T: 483, W: 28, H: 73, KEYS: 5, KEY: { W: 26, H: 11 }, MULTI: true,
														 SELECT: [ 0,1,2,3,4 ], ORIENT: ORIENTATION.VERTICAL,
														 IMAGE: { L: 227, T: 127, W: 28, H: 73 }
													  },
												  ALlGROUP: { L: 570, T: 90, W: 28, H: 49, KEYS: 4, KEY: { W: 26, H: 11 }, ORIENT: ORIENTATION.VERTICAL,
																  IMAGE: { L: 257, T: 127, W: 28, H: 49 }, MULTI: false, SELECT: 0
																},
												  AREA: { KEY: { W: 9, H: 11 }, KEYS: 3, MULTI: false, ORIENT: ORIENTATION.HORIZONTAL, SELECT: [0],
															 IMAGE: { L: 257, T: 178, W: 31, H: 13 }
														  },
												  AREaD: { L: 764, T: 276, W: 31, H: 13 },
												  AREaM: { L: 764, T: 446, W: 31, H: 13 },
												  AREaA: { L: 764, T: 559, W: 31, H: 13 }
												},
								  CONSOLE: { COLOUR: "rgb(239,217,239)",
												 BUTTON: { BUY: { L: 0, T: 285, W: 100, H: 100, LW: 2, SX: 538, SY: 1, STYLE: BUTTON.STYLE.SHALLOW },
															  SELL: { L: 100, T: 285, W: 100, H: 100, LW: 2, SX: 538, SY: 99, STYLE: BUTTON.STYLE.SHALLOW },
															  EXIT: { L: 80, T: 194, W: 72, H: 44, LW: 3, SX: 398, SY: 262, STYLE: BUTTON.STYLE.RAISED }
															},
												 ICOnPANEL: { PRICE: { L: 2, T: 166, W: 75, H: 72, C: 1, R: 4, LW: 2, ICONS: 4, ICON: { W: 75, H: 18 }, PRESS: 3,
																			  IMAGE: { L: 94, T: 287, W: 71, H: 62, O: 2, R: 4, C: 1, PATCH: { W: 71, H: 14 } },
																			  BEVEL: { L: 2, T: 351, W: 152, H: 18, O: 2, C: 2, R: 1, PATCH: { W: 75, H: 18 } }
																			}
																},
												 TOUChBAR: { POSITION: { L: 0, T: 0, W: 156, H: 111, KEYS: 25, O: 1, C: 5, R: 5, ORIENT: ORIENTATION.MIXED, 
																				 KEY: { W: 30, H: 21 }, IMAGE: { L: 459, T: 1, W: 156, H: 111 }, MULTI: false
																			  },
																 UNIT: { L: 0, T: 115, W: 156, H: 23, KEYS: 5, KEY: { W: 30, H: 21 }, ORIENT: ORIENTATION.HORIZONTAL,
																			IMAGE: { L: 459, T: 114, W: 156, H: 23 }, MULTI: false, SELECT: 0
																		 },
																 GRADE: { L: 0, T: 141, W: 157, H: 23, KEYS: 6, KEY: { W: 25, H: 21 }, ORIENT: ORIENTATION.HORIZONTAL,
																			 IMAGE: { L: 459, T: 139, W: 157, H: 23 }, MULTI: false, SELECT: 0
																		  }
															  }
											  }
								},
				 FIXTURES: { COLOUR: FOOTBALL.TAB.COLOUR.VIOLET, TEXT: FOOTBALL.TAB.COLOUR.PURPLE, HIGHLIGHT: FOOTBALL.TAB.COLOUR.LIVID,
								 L: 400, T: 20, W: 400, H: 380,
								 IMAGE: { LEAGUeSYMBOL: { L: 226, T: 156, W: 12, H: 12 },
											 DIAMONdCUpSYMBOL: { L: 257, T: 146, W: 18, H: 15 },
											 EMERALdCUpSYMBOL: { L: 277, T: 146, W: 18, H: 15 },
											 RUByCUpSYMBOL: { L: 297, T: 146, W: 18, H: 15 },
											 SAPPHIReCUpSYMBOL: { L: 317, T: 146, W: 18, H: 15 }
										  },
								 ICOnPANEL: { TOGGLE: { L: 280, T: 1, W: 108, H: 22, LW: 3, ICONS: 2, ICON: { W: 54, H: 22 }, C: 2, R: 1, PRESS: 0,
																IMAGE: { L: 287, T: 127, W: 98, H: 16, O: 2, R: 1, C: 2, PATCH: { W: 48, H: 16 } } }
												},
								 INFO: { COLOUR: FOOTBALL.TAB.COLOUR.VIOLET,
											ICOnPANEL: { FIXTURES: { L: 89, T: 20, W: 62, H: 199, LW: 3, ICONS: 8, ICON: { W: 62, H: 22 }, C: 1, R: 8, PRESS: 0,
																			 IMAGE: { L: 109, T: 127, W: 56, H: 158, O: 2, R: 8, C: 1, PATCH: { W: 56, H: 18 } } }
														  }
										 }
							  },
				 OPPONENT: { COLOUR: BLUE.POWDER,
								 TEXT: { COLOUR: "rgb(207,223,239)" },
								 IMAGE: { ARROW: { L: 279, T: 87, W: 13, H: 12 }
										  },
								 BUTTOnPANEL: { OPPONENT: { L: 420, T: 40, W: 112, H: 323, C: 1, R: 20, BUTTON: { W: 112, H: 17 }, OFFSETS: { X: 3, Y: 3 },
																	 IMAGE: { BUTTON: { L: 108, T: 22, W: 112, H: 35, O: 1, R: 2, C: 1, PATCH: { W: 112, H: 17 } },
																				 NAME: { L: 400, T: 2, W: 106, H: 239, O: 2, R: 20, C: 1, PATCH: { W: 106, H: 11 } }
																			  }
																  }
												  }
							  },
				 STATS: {
						  },
				 HIGHLIGHTS: { COLOUR: GREY.FAINT,
									IMAGE: { PENALTY: { L: 1, T: 171, W: 366, H: 235, X: 17, Y: 30 },
												MARK: { L: 255, T: 163, W: 1, H: 4 }
											 },
									INFO: { COLOUR: GREY.FAINT,
											  BUTTON: { INSTANT: {  L: 5, T: 210, W: 70, H: 25, LW: 3, LABEL: "Instant", STYLE: BUTTON.STYLE.RAISED },
															SUBSTITUTION: {  L: 80, T: 210, W: 90, H: 25, LW: 3, LABEL: "Substitution", STYLE: BUTTON.STYLE.RAISED },
															PAUSE: {  L: 175, T: 210, W: 60, H: 25, LW: 3, LABEL: "Pause", STYLE: BUTTON.STYLE.RAISED }
														 }
											},
									CONSOLE: { COLOUR: GREY.FAINT,
												  ICOnPANEL: { FORMATION: { L: 0, T: 0, W: 70, H: 240, C: 1, R: 12, LW: 3, ICONS: 12, ICON: { W: 70, H: 20 },
																					 IMAGE: { L: 111, T: 63, W: 282, H: 60, O: 6, R: 3, C: 4, PATCH: { W: 66, H: 16 } },
																					 BEVEL: { L: 290, T: 145, W: 70, H: 42, O: 2, C: 1, R: 2, PATCH: { W: 70, H: 20 } }
																				  }
																 }
												}
								 }
};
