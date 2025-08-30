
var VIEW = { CURRENT: { GLOBAL: 0, OFFICE: 1, ASSETS: -1, BONDS: -1, FORCES: -1, INVESTMENT: -1, MISSION: -1, SOLICITATION: -1 },
				 GLOBAL: { INFO: { GAZETTEER: 0, DIPLOMACY: 1, VOTES: 2, RESERVES: 3, BUDGET: 4, CASH: 5, ARMS: 6, EVENTS: 7, TYPES: 8  },
							  STATE: { NATIONS: 0, FORCES: 1, INFLUENCE: 2, SURVEILLANCE: 3 },
							  MApCONTROlIMAGEs: { L: 2, T: 126, W: 154, H: 70, O: 2, C: 2, R: 4, PATCH: { W: 76, H: 16 } },
							  MApOPTIOnCONTROLs: { L: 0, T: 0, OPTIONS: 4, OPTION: 0 }
							},
				 INTRO: { COLOUR: "slateblue", L: 80, T: 65, W: 240, H: 270, STATE: { OPEN: 0, START: 1, INFO: 2, CHARACTER: 3, PAST: 4 },
							 BUTTON: { DAILY: { L: 120, T: 175, W: 160, H: 25, LW: 3, LABEL: "Daily Multiple-Choice", COLOUR: "rgb(079,191,239)",
																																						STYLE: BUTTON.STYLE.RAISED },
										  FREeFORM: { L: 95, T: 215, W: 100, H: 25, LW: 3, LABEL: "Free Form", COLOUR: "rgb(079,191,239)",
																																		STYLE: BUTTON.STYLE.RAISED },
										  MULTiCHOICE: { L: 205, T: 215, W: 100, H: 25, LW: 3, LABEL: "Multi-Choice", COLOUR: "rgb(079,191,239)",
																																		STYLE: BUTTON.STYLE.RAISED },
										  SURVIVAL: { L: 150, T: 255, W: 100, H: 25, LW: 3, LABEL: "Management", COLOUR: "rgb(079,191,239)",
																																		STYLE: BUTTON.STYLE.RAISED },
										  INFO: { L: 140, T: 295, W: 120, H: 25, LW: 3, LABEL: "More info . . . ", COLOUR: "rgb(079,191,239)",
																																										STYLE: BUTTON.STYLE.RAISED },
										  PLAY: { L: 95, T: 315, W: 60, H: 25, LW: 3, LABEL: "Play", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  PICkMALE: { L: 60, T: 195, W: 60, H: 25, LW: 3, LABEL: "Pick", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  MODIFyMALE: { L: 130, T: 195, W: 60, H: 25, LW: 3, LABEL: "Modify...", COLOUR: "rgb(079,191,239)",
																																										STYLE: BUTTON.STYLE.RAISED },
										  PICkFEMALE: { L: 210, T: 195, W: 60, H: 25, LW: 3, LABEL: "Pick", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  MODIFyFEMALE: { L: 280, T: 195, W: 60, H: 25, LW: 3, LABEL: "Modify...", COLOUR: "rgb(079,191,239)",
																																										STYLE: BUTTON.STYLE.RAISED },
										  SHORT: { L: 130,T: 250,W: 100,H: 25,LW: 3, LABEL: "Play Short", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  MEDIUM: { L: 130,T: 280,W: 100,H: 25,LW: 3, LABEL: "Play Medium", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  LONG: { L: 130, T: 310, W: 100, H: 25, LW: 3, LABEL: "Play Long", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  PAST: { L: 82, T: 300, W: 80, H: 25, LW: 3, LABEL: "Past . . .", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  OK: { L: 110, T: 310, W: 60, H: 25, LW: 3, LABEL: "OK", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED },
										  CANCEL: { L: 230, T: 310, W: 60, H: 25, LW: 3, LABEL: "Cancel", COLOUR: "rgb(079,191,239)", STYLE: BUTTON.STYLE.RAISED }
										}
							},
				 ALLIANCE: { COLOUR: GREY.LIGHT, MISSION: { L: 5, T: 407, W: 110, H: 110, O: 5, C: 4, R: 2, LW: 3, TITLE: 87 } },
				 ASSETS: { COLOUR: DOMINION.COLOUR.CITySTATE, TEXT: { COLOUR: "rgb(079,079,175)" },
							  BUTTON: { SELL: { L: 150, T: 51, W: 37, H: 18, LW: 3, SX: 177, SY: 121, STYLE: BUTTON.STYLE.RAISED, GAP: 20 },
										   CASH: { SX: 177, SY: 135 },
											FORCES: { L: 5, T: 370, W: 95, H: 25, LW: 3, LABEL: "Forces...", COLOUR: PAINT.SKY, STYLE: BUTTON.STYLE.RAISED },
											INVESTMENTS: { L: 105, T: 370, W: 100, H: 25, LW: 3, LABEL: "Investments...", COLOUR: PAINT.SKY,
																																		STYLE: BUTTON.STYLE.RAISED },
											BONDS: { L: 210, T: 370, W: 90, H: 25, LW: 3, LABEL: "Bonds...", COLOUR: PAINT.SKY, STYLE: BUTTON.STYLE.RAISED },
											CLOSE: { L: 305, T: 370, W: 90, H: 25, LW: 3, LABEL: "Close", COLOUR: PAINT.SKY, STYLE: BUTTON.STYLE.RAISED }
										 },
							  CHECkBOX: { ALWAYS: { L: 200, T: 53, W: 15, H: 14, LABEL: "", BACKGROUND: DOMINION.COLOUR.CITySTATE, GAP: 20 }
											}
							},
				 BONDS: { COLOUR: DOMINION.COLOUR.BONDS
						  },
				 CHOICE: { COLOUR: DOMINION.COLOUR.YELLOW,
							  BUTTON: { ACCEPT: { L: 40, T: 160, W: 60, H: 25, LW: 3, LABEL: "Accept", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED },
										   DECLINE: {  L: 140, T: 160, W: 60, H: 25, LW: 3, LABEL: "Decline", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED },
											OTHER: { L: 5, T: 370, W: 95, H: 25, LW: 3, LABEL: "Other", COLOUR: DOMINION.COLOUR.VIRIDIAN, STYLE: BUTTON.STYLE.RAISED },
											YES: { L: 105, T: 370, W: 100, H: 25, LW: 3, LABEL: "Yes", COLOUR: DOMINION.COLOUR.VIRIDIAN, STYLE: BUTTON.STYLE.RAISED },
											NO: { L: 210, T: 370, W: 90, H: 25, LW: 3, LABEL: "No", COLOUR: DOMINION.COLOUR.VIRIDIAN, STYLE: BUTTON.STYLE.RAISED },
											PROPOSE: { L: 40, T: 160, W: 60, H: 25, LW: 3, LABEL: "Propose", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED },
											INVEST: { L: 40, T: 160, W: 60, H: 25, LW: 3, LABEL: "Invest", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED },
											PURCHASE: { L: 40, T: 160, W: 60, H: 25, LW: 3, LABEL: "Purchase", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED },
											PASS: { L: 140, T: 160, W: 60, H: 25, LW: 3, LABEL: "Pass", COLOUR: DOMINION.COLOUR.VIRIDIAN,
																											TEXT: { COLOUR: "rgb(255,239,000)" }, STYLE: BUTTON.STYLE.RAISED }
										 }
							},
				 FORCES: {
						   },
				 GAZETTEER: { COLOUR: GREY.SILVER,
								  IMAGE: { PLUS: { L: 344, T: 141, W: 14, H: 14 },
											  MINUS: { L: 360, T: 141, W: 14, H: 14 },
											}
								},
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
				 AID: { },
				 INVESTMENT: { COLOUR: "rgb(000,175,255)", GAP: 17, C: { X: { CITySTATE: 5, PERCENT: 80, RINGIT: 110, POWER: 255, CREDIT: 330 } },
									PUShBUTTON: { PLUS: { COUNT: 20, L: 170, T: 28, W: 17, H: 17, O: 0, LW: 3, BACKGROUND: "rgb(000,175,255)",
																 IMAGE: { L: 479, T: 1, W: 11, H: 11 } },
													  MINUS: { COUNT: 20, L: 195, T: 28, W: 17, H: 17, O: 0, LW: 3, BACKGROUND: "rgb(000,175,255)",
																  IMAGE: { L: 492, T: 1, W: 11, H: 11 } },
													  WITHDRAW: { COUNT: 20, L: 220, T: 28, W: 17, H: 17, O: 0, LW: 3, BACKGROUND: "rgb(000,175,255)",
																	  IMAGE: { L: 505, T: 1, W: 11, H: 11 } },
													  SELECtPLUS: { L: 3, T: 372, W: 25, H: 25, O: 0, LW: 7, BACKGROUND: "rgb(000,175,255)",
																		 IMAGE: { L: 479, T: 1, W: 11, H: 11 } },
													  SELECtMINUS: { L: 37, T: 372, W: 25, H: 25, O: 0, LW: 7, BACKGROUND: "rgb(000,175,255)",
																		  IMAGE: { L: 492, T: 1, W: 11, H: 11 } },
													  SELECtWITHDRAW: { L: 71, T: 372, W: 25, H: 25, O: 0, LW: 7, BACKGROUND: "rgb(000,175,255)",
																			  IMAGE: { L: 505, T: 1, W: 11, H: 11 } },
													  IMAGE: { L: 479, T: 14, W: 36, H: 19, O: 2, C: 2, R: 1, PATCH: { W: 17, H: 17 } },
													  SELECtIMAGE: { L: 402, T: 109, W: 52, H: 25, O: 2, C: 2, R: 1, PATCH: { W: 25, H: 25 } }
													},
									BUTTON: { ASSETS: { L: 315, T: 370, W: 80, H: 25, LW: 3, LABEL: "Assets . . .", TEXT: { COLOUR: "rgb(063,095,175)" },
									STYLE: BUTTON.STYLE.RAISED },
											  }
								 },
				 TREATY: { },
				 PACT: { },
				 INTRIGUE: { },
				 MISSION: { COLOUR: "rgb(255,159,191)",
								PUShBUTTON: { MISSION: { COUNT: 8, L: -1, T: -1, W: 92, H: 52, LW: 6, BACKGROUND: "rgb(255,159,191)",
																 IMAGE: { L: 2, T: 282, W: 80, H: 40, O: 1, C: 4, R: 2 } }
												},
								IMAGE: { LABEL: { L: 329, T: 297, W: 120, H: 22, O: 1, C: 4, R: 2, PATCH: { W: 120, H: 22 } },
											EDGE: { L: 308, T: 109, W: 106, H: 81, O: 1, C: 1, R: 2, PATCH: { W: 92, H: 52 } }
										 }
							 },
				 OFFICE: { COLOUR: "",
							  IMAGE: { FORTNIGHT: { L: 308, T: 41, W: 61, H: 8, X: 19, Y: 36 },
										  WEEK: { L: 308, T: 51, W: 29, H: 8, X: 35, Y: 36 }
										},
							  WALL: { H: 400, MOBILE: { H: 250 } }, CARPET: { T: 400, H: 240, MOBILE: { T: 250, H: 150 } },
							  DOOR: { L: 582, T: 122, W: 131, H: 253, MOBILE: { L: 300, T: 80, W: 90, H: 170 } },
							  DOOrPANEL: { L: 600, T: 150, W: 90, H: 65, R: 20, MOBILE: { L: 315, T: 100, W: 60, H: 45, R: 15 } },
							  KNOB: { X: 550, Y: 260, R: 10, MOBILE: { X: 315, Y: 175, R: 7 } },
							  DESK: { X: -50, Y: 390, W: { T: 360, B: 500 }, H: 70, COLOUR: { WOOD: "rgb(063,015,000)", EDGE: "rgb(031,000,000)" } },
							  BANK: { L: 100, T: 40, W: 191, H: 191, LW: 3, MONITOR: { COUNT: 8, L: 11, T: 11, W: 50, H: 50, LW: 3, RDS: 3, C: 3, R: 3, GAP: 9 } },
							  CABINET: { L: 165, T: 165, W: 115, H: 230, ROOF: 30, DRAWER: { COUNT: 3, GAP: 5, W: 105, H: 70},
																												HANDLE: { L: 40, T: 15, W: 25, H: 10 },
											 MOBILE: { L: 10, T: 110, W: 80, H: 150, ROOF: 20, DRAWER: { GAP: 3, W: 74, H: 45 }, HANDLE: { L: 27, T: 9, W: 20, H: 7 } },
											 COLOUR: { BODY: GREY.SILVER, HANDLE: GREY.ASH }
										  },
							  CALCULATOR: { L: 365, T: 545, MOBILE: { L: 140, T: 358 }, IMAGE: { L: 144, T: 55, W: 47, H: 23 } },
							  CALENDAR: { L: 180, T: 50, W: 85, H: 60, BAND: 12, MOBILE: { L: 15, T: 32, W: 70, H: 49, BAND: 14 },
											  IMAGE: { DIGITS: { L: 308, T: 80, W: 138, H: 15, O: 2, C: 10, R: 1, PATCH: { W: 12, H: 15 } },
														  COLON: { L: 371, T: 41, W: 3, H: 8, X: 48, Y: 55 },
														  DAY: { X: 53, Y: 55 }, GAP: 14,
														  WEEK: { X: 30, Y: 55 },
														  FORTNIGHT: { X: 20, Y: 55 },
														}
											},
							  CHART: { X: -1, Y: -1, MOBILE: { X: -1, Y: -1 }, IMAGE: { } },
							  CLOCK: { X: 500, Y: 60, SIZE: 30, HOURS: 12, MINUTES: 60, SECONDS: 60, MOBILE: { X: 345, Y: 55, SIZE: 20 } },
							  FOLDERS: { X: 295, Y: 440, GAP: 20, MOBILE: { X: 125, Y: 260 }, STATE: { FILED: 0, PULLING: 1, PULLED: 2, FILING: 3 },
											 IMAGE: { L: 237, T: 1, W: 43, H: 92, LETTERS: { L: 1, T: 93, W: 207, H: 5, O: 1, C: 26, R: 1, PATCH: { W: 7, H: 5 } } },
											 WITHDRAWN: -12, F: 15 },
							  GLOBE: { X: 500, Y: 445, R: 28, MOBILE: { X: 320, Y: 255, R: 28 }, IMAGE: { L: 388, T: 1, W: 60, H: 77 } },
							  LAPTOP: { L: 180, T: 435, W: 94, H: 91, MOBILE: { L: 20, T: 262 }, IMAGE: { L: 1, T: 1, W: 94, H: 91 } },
							  NEWSPAPERS: { L: 160, T: 530, W: 106, H: 38, MOBILE: { L: 5, T: 355 }, IMAGE: { L: 281, T: 1, W: 106, H: 38 } },
							  PDA: { L: 575, T: 525, W: 47, H: 32, MOBILE: { L: 221, T: 352 }, IMAGE: { L: 96, T: 55, W: 47, H: 32 } },
							  PHONE: { L: 670, T: 515, W: 139, H: 53, MOBILE: { L: 330, T: 330 }, 
										  IMAGE: { L: 96, T: 1, W: 139, H: 53, O: 1, C: 2, R: 1, PATCH: { W: 69, H: 53 } } },
							  REMOTE: { L: 670, T: 515, W: 24, H: 56, MOBILE: { L: 300, T: 331 }, 
											IMAGE: { L: 282, T: 41, W: 24, H: 56 } },
							  INFO: { COLOUR: DOMINION.COLOUR.YELLOW
									  }
							},
				 TURN: { COLOUR: "rgb(111,175,255)", TEXT: "rgb(111,000,127)", MUGSHOT: "rgb(223,223,191)",
							PHASE: { INVESTMENT: 0, PASSIVE: 1, ACTIVE: 2 },
							BUTTON: { OFFER: { L: 18, T: 180, W: 120, H: 25, LW: 3, LABEL: "See Offer...", COLOUR: "rgb(111,000,127)",
																									TEXT: { COLOUR: "rgb(111,175,255)" }, STYLE: BUTTON.STYLE.RAISED },
										 START: { L: 18, T: 180, W: 120, H: 25, LW: 3, LABEL: "Start Week...", COLOUR: "rgb(111,000,127)",
																									TEXT: { COLOUR: "rgb(111,175,255)" }, STYLE: BUTTON.STYLE.RAISED },
										 ADVICE: { L: 5, T: 210, W: 70, H: 25, LW: 3, LABEL: "Advice...", COLOUR: "rgb(111,000,127)",
																									TEXT: { COLOUR: "rgb(111,175,255)" }, STYLE: BUTTON.STYLE.RAISED },
										 HELP: { L: 81, T: 210, W: 70, H: 25, LW: 3, LABEL: "Help...", COLOUR: "rgb(111,000,127)",
																									TEXT: { COLOUR: "rgb(111,175,255)" }, STYLE: BUTTON.STYLE.RAISED }
									  },
							IMAGE: { TURN: { L: 328, T: 345, W: 50, H: 15, X: 2, Y: 2 },
										DIGITS: { L: 380, T: 345, W: 129, H: 15, O: 2, C: 10, R: 1, PATCH: { W: 12, H: 15 }, GAP: 14,
																										DAILY: { X: 56, Y: 2 }, CHOICE: { X: 63, Y: 7 } },
										WEEK: { L: 511, T: 345, W: 52, H: 15, X: 7, Y: 7 },
										FORTNIGHT: { L: 565, T: 345, W: 115, H: 15, X: 2, Y: 2 }
									 }
						 },
				 SOLICITATION: { STATE: { CLICKABLE: 0, OFFERED: 1 },
									  INFO: { COLOUR: "rgb(091,191,255)", STATE: { INFO: 0, OFFER: 1, ACKNOWLEDGEMENT: 2, RIVALS: 3 },
												 TEXT: "rgb(015,047,095)", MUGSHOT: "rgb(223,223,255)",
												 BUTTON: { VOTES: { L: 3, T: 210, W: 75, H: 25, LW: 3, LABEL: "Votes", COLOUR: "rgb(095,015,063)",
																										TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  DIPLOMACY: { L: 82, T: 210, W: 75, H: 25, LW: 3, LABEL: "Diplomacy", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  INVENTORY: { L: 161, T: 210, W: 75, H: 25, LW: 3, LABEL: "Inventory", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  ACCEPT: { L: 145, T: 90, W: 60, H: 25, LW: 3, LABEL: "Accept", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  DECLINE: { L: 145, T: 125, W: 60, H: 25, LW: 3, LABEL: "Decline", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  CONTINUE: { L: 155, T: 190, W: 80, H: 25, LW: 3, LABEL: "Continue", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED },
															  CLOSE: { L: 175, T: 190, W: 60, H: 25, LW: 3, LABEL: "Close", COLOUR: "rgb(095,015,063)",
																												TEXT: { COLOUR: "rgb(239,143,143)" }, STYLE: BUTTON.STYLE.RAISED }
															}
											  }
									}
};
var RELATIONS = {
};
