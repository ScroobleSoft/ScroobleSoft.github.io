
var VIEW = { INTRO: { COLOUR: "rgb(141,191,255)",
							 BUTTON: { DAILY: { L: 275, T: 230, W: 100, H: 25, LW: 3, LABEL: "Play Daily", COLOUR: "blue",
																										 TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
										  RANDOM: { L: 275, T: 265, W: 100, H: 25, LW: 3, LABEL: "Play Random", COLOUR: "blue",
																										  TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED }
										},
							 TOUChBAR: { ATTACKERS: { L: 20, T: 40, W: 100, H: 250, O: 0, C: 1, R: 10, KEYS: 10, KEY: { W: 100, H: 25 },
															  FRAME: { IMAGE: { L: 189, T: 254, W: 100, H: 25 } },
															  ORIENT: ORIENTATION.VERTICAL, IMAGE: { L: 189, T: 2, W: 100, H: 250 } },
											 DEFENDERS: { L: 150, T: 40, W: 100, H: 250, O: 0, C: 1, R: 10, KEYS: 10, KEY: { W: 100, H: 25 },
															  FRAME: { IMAGE: { L: 189, T: 254, W: 100, H: 25 } },
															  ORIENT: ORIENTATION.VERTICAL, IMAGE: { L: 189, T: 2, W: 100, H: 250 } }
										  },
							 INFO: { COLOUR: "rgb(141,191,255)",
										GRID: { X: 15, Y: 75, CELL: { W: 30, H: 30, LW: 1 } },
										IMAGE: { CELL: { L: 189, T: 281, W: 32, H: 32 },
													SELECTION: { L: 223, T: 281, W: 30, H: 30 },
													DIGITS: { L: 1, T: 286, W: 98, H: 12, O: 2, C: 10, R: 1, PATCH: { W: 8, H: 12 } }
												 },
										TOUChBAR: { MONTH: { L: 15, T: 15, W: 211, H: 47, O: 1, C: 6, R: 2, KEYS: 12, KEY: { W: 34, H: 22 }, SELECT: -1,
																	COLOUR: { KEY: "white", SELECTION: "rgb(079,191,239)" },
																	ORIENT: ORIENTATION.BOTH, IMAGE: { L: 292, T: 2, W: 211, H: 47 } }
													 }
									 },
							 CONSOLE: { COLOUR: "rgb(141,191,255)"
										 }
						  },
				 DEMO: {
						 },
				 BATTALION: {
								},
				 BATTLE: { COLOUR: "rgb(141,191,255)",
							  CHECkBOX: { TERRAIN: { L: 675, T: 580, W: 15, H: 14, LABEL: "Enhance Terrain", BACKGROUND: GREY.LIGHT } },
							  ICOnPANEL: { REGIMENT: { L: 5, T: 540, W: 112, H: 56, C: 2, R: 1, LW: 3, ICONS: 2, ICON: { W: 56, H: 56 }, PRESS: 0,
																IMAGE: { L: 1, T: 1, W: 102, H: 50, O: 2, C: 2, R: 1, PATCH: { W: 50, H: 50 } }
															 }
											 },
							  INFO: { REGION: { C: 3, R: 3, W: 80, H: 60, COUNT: 9 },
										 IMAGE: { ARROWS: { L: 1, T: 53, W: 186, H: 254, O: 2, C: 1, R: 2, PATCH: { W: 186, H: 126 } }
												  }
									  },
							  CONSOLE: { IMAGE: { LABELS: { L: 2, T: 2, W: 224, H: 43, O: 1, C: 3, R: 3, PATCH: { W: 74, H: 10 } },
														 IMMORTAL: { L: 2, T: 37, W: 50, H: 8 },
														 TERRAIN: { L: 2, T: 50, W: 197, H: 43, O: 1, C: 3, R: 3, PATCH: { W: 65, H: 10 } },
														 STEPPE: { L: 2, T: 85, W: 39, H: 10 },
													  },
											 ICOnPANEL: { LABELS: { L: 148, T: 194, W: 92, H: 46, C: 2, R: 1, LW: 3, ICONS: 2, ICON: { W: 46, H: 46 }, PRESS: 0,
																			IMAGE: { L: 105, T: 2, W: 82, H: 40, O: 2, C: 2, R: 1, PATCH: { W: 40, H: 40 } }
																		 }
															}
										  }
							},
				 CLASH: { COLOUR: "rgb(141,191,255)",
							 C: 10, R: 10, W: 80, H: 60,
							 INFO: {
									 },
							 CONSOLE: {
										 }
							  },
				 SIM: { CLASH: { COLOUR: GREY.LIGHT,
									  BUTTON: { SIM: { L: 60, T: 360, W: 100, H: 25, LW: 3, LABEL: "Quick Sim", COLOUR: "blue",
																												TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
												   PLAY: { L: 240, T: 360, W: 100, H: 25, LW: 3, LABEL: "Play", COLOUR: "blue",
																												TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED },
												   ATTACK: { L: 150, T: 360, W: 100, H: 25, LW: 3, LABEL: "Attack", COLOUR: "blue",
																												TEXT: { COLOUR: "white" }, STYLE: BUTTON.STYLE.RAISED }
												 }
									},
						  SKIRMISH: {
						  },
						  MELEE: {
						  },
						  COMBAT: {
						  }
				 },
				 SQUAD: { COLOUR: "rgb(141,191,255)",
							 TILE: { C: 10, R: 10, W: 80, H: 60 }
						  },
				 SOLDIER: { COLOUR: "rgb(141,191,255)",
								C: 10, R: 10, W: 80, H: 60
							 },
				 MINiGAMES: {
								},
				 TESTING: {
							 },
				 TUTORIAL: {
							  }
};
