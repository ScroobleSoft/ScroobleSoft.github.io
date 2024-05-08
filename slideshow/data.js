
//---------------------------------------
//---------- BITMAPS --------------------

var SlideImages = [
	"SlideImages.png",
	"SlideControls.png",
	"thumbnails.png",
	"../library/GenieImages.png",
	"../library/GenieControls.png",
	"sale.png"
];
var IMAGeINDEX = {
	IMAGES:			0,
	CONTROLS:		1,
	THUMBNAILS:		2,
	GENIeIMAGES:	3,
	GENIeCONTROLS: 4,
	SALE:				5
};

//-------------------------------------
//---------- SOUNDS -------------------

var SlideSounds = [
	"soundtrack1.mp3",
	"soundtrack2.mp3",
	"soundtrack3.mp3",
	"soundtrack4.mp3"
];
var SOUNdINDEX = {
	SOUNDTRACK1: 0,
	SOUNDTRACK2: 1,
	SOUNDTRACK3: 2,
	SOUNDTRACK4: 3
};

//----------------------------------------
//---------- CONTROLS --------------------

//----------------------------------------
//---------- CORE DATA -------------------

var SCREEN = { WIDTH: 600, HEIGHT: 600 };
var INFoBOX = { WIDTH: 240, HEIGHT: 540 };
var CONTROlPANEL = { WIDTH: 240, HEIGHT: 60 };

//----------------------------------------
//---------- GAME DATA -------------------

var BATCH = { COUNT: 4, C: 2, R: 2 };
var Batches = [ { COUNT: 30, START: 0, END: 29 }, { COUNT: 30, START: 30, END: 59 }, { COUNT: 30, START: 60, END: 89 }, { COUNT: 28, START: 90, END: 117 } ];

//---------------------------------------
//---------- CONTROLS -------------------

//--------------------------------------
//---------- IMAGES --------------------

var Art = [ "paintings/1.jpg",   "paintings/2.jpg",   "paintings/3.jpg",   "paintings/4.jpg",   "paintings/5.jpg",   "paintings/6.jpg",
				"paintings/7.jpg",   "paintings/8.jpg",   "paintings/9.jpg",   "paintings/10.jpg",  "paintings/11.jpg",  "paintings/12.jpg",
				"paintings/13.jpg",  "paintings/14.jpg",  "paintings/15.jpg",  "paintings/16.jpg",  "paintings/17.jpg",  "paintings/18.jpg",
				"paintings/19.jpg",  "paintings/20.jpg",  "paintings/21.jpg",  "paintings/22.jpg",  "paintings/23.jpg",  "paintings/24.jpg",
				"paintings/25.jpg",  "paintings/26.jpg",  "paintings/27.jpg",  "paintings/28.jpg",  "paintings/29.jpg",  "paintings/30.jpg",
				"paintings/31.jpg",  "paintings/32.jpg",  "paintings/33.jpg",  "paintings/34.jpg",  "paintings/35.jpg",  "paintings/36.jpg",
				"paintings/37.jpg",  "paintings/38.jpg",  "paintings/39.jpg",  "paintings/40.jpg",  "paintings/41.jpg",  "paintings/37.jpg",
				"paintings/43.jpg",  "paintings/44.jpg",  "paintings/45.jpg",  "paintings/46.jpg",  "paintings/47.jpg",  "paintings/48.jpg",
				"paintings/49.jpg",  "paintings/50.jpg",  "paintings/51.jpg",  "paintings/52.jpg",  "paintings/53.jpg",  "paintings/54.jpg",
				"paintings/55.jpg",  "paintings/56.jpg",  "paintings/57.jpg",  "paintings/58.jpg",  "paintings/59.jpg",  "paintings/60.jpg",
				"paintings/61.jpg",  "paintings/62.jpg",  "paintings/63.jpg",  "paintings/64.jpg",  "paintings/65.jpg",  "paintings/66.jpg",
				"paintings/67.jpg",  "paintings/68.jpg",  "paintings/69.jpg",  "paintings/70.jpg",  "paintings/71.jpg",  "paintings/72.jpg",
				"paintings/73.jpg",  "paintings/74.jpg",  "paintings/75.jpg",  "paintings/76.jpg",  "paintings/77.jpg",  "paintings/78.jpg",
				"paintings/79.jpg",  "paintings/80.jpg",  "paintings/81.jpg",  "paintings/82.jpg",  "paintings/83.jpg",  "paintings/84.jpg",
				"paintings/85.jpg",  "paintings/86.jpg",  "paintings/87.jpg",  "paintings/88.jpg",  "paintings/89.jpg",  "paintings/90.jpg",
				"paintings/91.jpg",  "paintings/92.jpg",  "paintings/93.jpg",  "paintings/94.jpg",  "paintings/95.jpg",  "paintings/96.jpg",
				"paintings/97.jpg",  "paintings/98.jpg",  "paintings/99.jpg",  "paintings/100.jpg", "paintings/101.jpg", "paintings/102.jpg",
				"paintings/103.jpg", "paintings/104.jpg", "paintings/105.jpg", "paintings/106.jpg", "paintings/107.jpg", "paintings/108.jpg",
				"paintings/109.jpg", "paintings/110.jpg", "paintings/111.jpg", "paintings/112.jpg", "paintings/113.jpg", "paintings/114.jpg",
				"paintings/115.jpg", "paintings/116.jpg", "paintings/117.jpg", "paintings/118.jpg"
];

//--------------------------------------
//---------- SPRITES -------------------

var PUShBUTTOnIMAGE = { L: 2, T: 2, W: 90, H: 44, O: 2, R: 1, C: 2, PATCH: { W: 44, H: 44 } };

//-----------------------------------
//---------- VIEW -------------------

var VIEW = { GALLERY: { BATCH: { COUNT: 4, C: 2, R: 2 }, COLOUR: GREY.FAINT,
								BUTTON: { GALLERY: { L: 137, T: 215, W: 126, H: 126, O: 2, LW: 3, GAP: 200, SX: 96, SY: 2, STYLE: BUTTON.STYLE.RAISED }
										  },
								IMAGE: { BANNER: { L: 56, T: 36, W: 318, H: 136, X: 141, Y: 10 },
											MOSAIC: { L: 2, T: 174, W: 910, H: 136, X: 141, Y: 10, GAP: 196, O: 2, C: 4, R: 1, PATCH: { W: 226, H: 194 } }
										 }
							 },
				 THUMBNAIL: { C: 6, R: 5, OFFSET: { X: 5, Y: 50 }, GAP: { X: 100, Y: 100 }, COLOUR: PASTEL.OFfWHITE,
								  BUTTON: { START: { L: 210, T: 10, W: 180, H: 25, LW: 3, LABEL: "Click to Start Slideshow", TEXT: { COLOUR: "white" },
															COLOUR: "blue", STYLE: BUTTON.STYLE.RAISED
														 },
												BACK: { L: 240, T: 560, W: 120, H: 25, LW: 3, LABEL: "Back to Galleries", TEXT: { COLOUR: "white" },
															COLOUR: "blue", STYLE: BUTTON.STYLE.RAISED
														 }
											 },
								  IMAGE: { THUMBNAILS: { L: 2, T: 2, W: 1106, H: 278, O: 2, C: 12, R: 3, PATCH: { W: 90, H: 90 } }
											}
								},
				 SLIDeSHOW: { INFO: { THUMBNAIL: { L: 75, T: 2, GAP: 94, COUNT: 6 }, COLOUR: "rgb(236,210,142)"
										  },
								  CONSOLE: { COLOUR: "rgb(236,210,142)",
												 BUTTON: { GALLERIES: { L: 152, T: 1, W: 86, H: 58, LW: 3, SX: 2, SY: 82, STYLE: BUTTON.STYLE.RAISED }
															}
											  },
								  STATE: { ACTIVE: 0, PAUSED: 1 }, COLOUR: "rgb(236,210,142)",
								  BUTTON: { PAUSE: { L: 270, T: 543, W: 80, H: 25, LW: 3, LABEL: "Pause", COLOUR: "blue", TEXT: { COLOUR: "white" },
															STYLE: BUTTON.STYLE.RAISED }
											 },
								  PUShBUTTON: { PREVIOUS: { L: 20, T: 278, W: 44, H: 44, LW: 6, BACKGROUND: "rgb(236,210,142)",
																	 IMAGE: { L: 2, T: 48, W: 32, H: 32 } },
													 NEXT: { L: 535, T: 278, W: 44, H: 44, LW: 6, BACKGROUND: "rgb(236,210,142)",
																IMAGE: { L: 36, T: 48, W: 32, H: 32 }
															 }
												  },
								  TIMER: { L: 124, T: 28, F: 24, DOT: { COUNT: 10, L: 143, T: 31, GAP: 32 }, BACKGROUND: PASTEL.OFfWHITE,
											  IMAGE: { FRAME: { L: 2, T: 2, W: 352, H: 32 },
														  DOT: { L: 2, T: 36, W: 52, H: 26, O: 0, C: 2, R: 1, PATCH: { W: 26, H: 26 } }
														}
											}
								},
				 SALE: { COLOUR: GREY.LIGHT,
							IMAGE: { THUMBNAILS: { L: 3, T: 3, W: 486, H: 486, O: 3, C: 3, R: 3, PATCH: { W: 160, H: 160 } } },
						 },
				 DETAILS: { L: 0, T: 0, W: 600, H: 600, COLOUR: PAINT.SKY,
								BUTTON: { OK: { L: 500, T: 560, W: 50, H: 25, LW: 3, LABEL: "Ok", BACKGROUND: GREY.LIGHT, STYLE: BUTTON.STYLE.RAISED } }
							 }
};
