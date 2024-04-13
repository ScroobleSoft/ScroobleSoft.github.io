
//TODO: character data will move to PersonData.js
var COMPLEXION = { PALE: "rgb(255,207,191)",    ROSY: "rgb(239,191,159)", LIGHT: "rgb(223,175,143)", MEDIUM: "rgb(207,143,111)",
		    TAN: "rgb(207,143,095)", SWARTHY: "rgb(175,111,063)",  DARK: "rgb(127,095,063)",  EBONY: "rgb(111,079,047)", COUNT: 8  };
var Complexions = [ COMPLEXION.PALE, COMPLEXION.ROSY,    COMPLEXION.LIGHT, COMPLEXION.MEDIUM,
		    COMPLEXION.TAN,  COMPLEXION.SWARTHY, COMPLEXION.DARK,  COMPLEXION.EBONY   ];
var HairColours = [ "rgb(236,094,028)", "rgb(187,063,001)", "rgb(149,062,019)", "rgb(099,039,000)",
		    "rgb(249,211,076)", "rgb(242,188,027)", "rgb(174,129,090)", "rgb(008,008,006)"  ];

//TODO: just in case, want to replace 'Complexions' with 'GenieComplexions' to avoid re-definitions in apps
var GenieComplexions = [ COMPLEXION.PALE, COMPLEXION.ROSY,    COMPLEXION.LIGHT, COMPLEXION.MEDIUM,
			 COMPLEXION.TAN,  COMPLEXION.SWARTHY, COMPLEXION.DARK,  COMPLEXION.EBONY   ];

//Letters
var LETTERs5x7IMAGEs = { L: 1, T: 216, W: 155, H: 7, O: 1, R: 1, C: 26, PATCH: { W: 5, H: 7 } };
var LETTERs10x14IMAGEs = { L: 1, T: 235, W: 155, H: 29, O: 2, R: 2, C: 13, PATCH: { W: 10, H: 14 } };
var LETTERs5x5IMAGEs = { L: 1, T: 267, W: 180, H: 5, O: 2, R: 1, C: 26, PATCH: { W: 5, H: 5 } };

//Numerals
var DIGITs12x13IMAGEs = { L: 46, T: 196, W: 129, H: 13, O: 2, R: 1, C: 10, PATCH: { W: 12, H: 13 } };
var DIGITs4x6IMAGEs = { L: 46, T: 209, W: 49, H: 6, O: 1, R: 1, C: 10, PATCH: { W: 4, H: 6 } };
var DIGITs6x10IMAGEs = { L: 1, T: 224, W: 69, H: 10, O: 1, R: 1, C: 26, PATCH: { W: 6, H: 10 } };
