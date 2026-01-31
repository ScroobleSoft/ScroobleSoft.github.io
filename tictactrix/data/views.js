
var VIEW = { INTRO: { COLOUR: PAINT.SKY,
							 BUTTON: { DAILY: { L: 150, T: 155, W: 100, H: 25, LW: 3, LABEL: "Play Daily", COLOUR: MAP.COLOUR.SEA,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										  RANDOM: { L: 150, T: 195, W: 100, H: 25, LW: 3, LABEL: "Play Random", COLOUR: MAP.COLOUR.SEA,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										  GUIDE: { L: 120, T: 235, W: 160, H: 25, LW: 3, LABEL: "Quick Start Guide", COLOUR: PAINT.SKY,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED }
										},
							 CHECkBOX: { FOG: { L: 120, T: 275, W: 15, H: 14, LABEL: "Fog of War", BACKGROUND: MAP.COLOUR.LAND }
										  }
						  },
				 CITY: { COLOUR: GREY.LIGHT,
							IMAGE: { NAME: { L: 324, T: 29, W: 38, H: 12, X: 2, Y: 2 },
										PRODUCTION: { L: 285, T: 1, W: 76, H: 12, X: 2, Y: 26 },
										TURNS: { L: 285, T: 15, W: 71, H: 12, X: 2, Y: 93 },
										CLAN: { L: 285, T: 29, W: 37, H: 12, X: 2, Y: 107 },
										GARRISON: { L: 283, T: 85, W: 62, H: 12, X: 2, Y: 121 },
										LABELS: { L: 1, T: 85, W: 280, H: 49, O: 2, C: 3, R: 3, PATCH: { W: 92, H: 15 } }
									 }
						 },
				 COMBAT: { COLOUR: GREY.LIGHT
							},
				 DAILY: {
						  },
				 DOCS: { COLOUR: MAP.COLOUR.LAND,
							BUTTON: { HELP: { L: 23, T: 30, W: 100, H: 25, LW: 3, LABEL: "Help", COLOUR: MAP.COLOUR.SEA,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										 GUIDE: { L: 23, T: 85, W: 100, H: 25, LW: 3, LABEL: "Guide", COLOUR: MAP.COLOUR.SEA,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										 FAQS: { L: 23, T: 140, W: 100, H: 25, LW: 3, LABEL: "FAQs", COLOUR: MAP.COLOUR.SEA,
																										TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										 UNITS: { L: 23, T: 195, W: 100, H: 25, LW: 3, LABEL: "Units", COLOUR: MAP.COLOUR.SEA,
									 																	TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED }
									  }
						 },
				 FAQ: { COLOUR: GREY.LIGHT,
						  INFO: { },
						  CONSOLE: { }
						},
				 GUIDE: { COLOUR: GREY.LIGHT,
							 INFO: { },
							 CONSOLE: { }
						  },
				 HELP: { COLOUR: GREY.LIGHT,
							INFO: { },
							CONSOLE: { }
						 },
				 MAP: { TILE: { W: 8, H: 8 }
						},
				 OPTIONS: {
								CHECkBOX: { CITY: {  },
												STACK: { },
												PLATFORM: { }
											 },
							 },
				 PLAY: { PADDING: 2,
							TILE: { W: 40, H: 40, C: 10, R: 10 },
							IMAGE: { CITY: { L: 1, T: 1, W: 242, H: 32, O: 1, C: 9, R: 1, PATCH: { W: 26, H: 32 }, OFFSET: { X: 7, Y: 4 } },
										DIGITS: { L: 91, T: 35, W: 70, H: 10, O: 2, C: 10, R: 1, PATCH: { W: 6, H: 10 }, OFFSET: { X: 31, Y: 3 } },
										SELECTION: { L: 245, T: 1, W: 38, H: 38 }
									 },
							INFO: { TILE: { W: 5, H: 5 }
									}
						 },
				 TELEPORT: {
							  },
				 TRANSFER: { COLOUR: GREY.LIGHT,
								 BUTTON: { OK: { L: 130, T: 370, W: 60, H: 25, LW: 3, LABEL: "Ok", COLOUR: MAP.COLOUR.SEA,
																														TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
											  CANCEL: { L: 210, T: 370, W: 60, H: 25, LW: 3, LABEL: "Cancel", COLOUR: PAINT.SKY,
																														TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED }
											}
							  },
				 TUTORIAL: { COLOUR: GREY.LIGHT,
								 BUTTON: { TUTORIAL: { L: 69, T: 52, W: 102, H: 42, LW: 3, SX: 98, SY: 31, STYLE: BUTTON.STYLE.RAISED },
											  DEMO: { L: 69, T: 146, W: 102, H: 42, LW: 3, SX: 1, SY: 129, STYLE: BUTTON.STYLE.RAISED }
											}
							  },
				 UNITS: {
							INFO: { },
							CONSOLE: { }
						 }
};
