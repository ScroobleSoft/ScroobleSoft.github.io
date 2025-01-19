
var FORMATION = { OFF: { IfORM: 0, OFFSEtI: 1, SPLItBACK: 2, NoTE: 3, THREeWR: 4, TWoTE: 5, TWoHbACK: 6,
			 HbACK: 7, WINgT: 8, FOUrWR: 9, SPREAD: 10, FLHS: 11, ONeWR: 12, COUNT: 13 },
		  DEF: { MM43: 0, COVER2: 1, TAMPA2: 2, COVER3: 3, ZONE43: 4, MM34: 5, MM44: 6,
			 ZN34C2: 7, ZN34C3: 8, ZONE34: 9, TWoNT: 10, FIVeDL: 11, MM46: 12, COUNT: 13 } };  //NOTE: ZONE defense means blitz
var SYSTEM = { OFF: { NONE: 0, IfORM: 1, IfORmPASS: 2, IfORmRUN: 3, HYBRD: 4, MIX: 5, TWoTE: 6,
		      SPLItBACK: 7, THREeWR: 8, FOUrWR: 9, OFFSEtI: 10, HbACK: 11, DUAlHbACK: 12, WINgT: 13, COUNT: 13 },
	       DEF: { NONE: 0, MIX43: 1, MM43: 2, ZN43: 3, HYBRD: 4, MIX: 5, ZN34: 6,
		      TAMPA2: 7, MM34: 8, RAVEN43: 9, COVER3: 10, IR43: 11, MIX34: 12, BLTZ34: 13, COUNT: 13 } };
var Systems = [ [ "Customizable", "I-Formation", "I-Formation Passing", "I-Formation Running", "I-Formation, 3 WR Mix", "All Formations", "2 Tight-End",
		  "Split Back", "3 Wide Receivers", "4 Wide Receivers", "Offset-I Formation", "H-Back Formations", "Dual H-Back", "Wing-T Formation" ],
		[ "Customizable", "43 Zone/Man Mix", "43 Man-to-Man", "43 Zone", "43/34 Mix", "All Formations", "34 Zone",
		  "Tampa 2", "34 Man-to-Man", "Raven 43", "Cover 3", "43 Inside Rush", "34 Zone/Man Mix", "34 Blitz Heavy" ] ];
var SystemDescriptions = [ [ [ "All formations available", "All" ],
			     [ "Run-Pass balance", "HB" ],
			     [ "Medium passing", "Receiving TE" ],
			     [ "Inside running", "TB, FB, LG, RG" ],
			     [ "Medium to deep passing", "Pocket QB, FL, TE" ],
			     [ "All Formations", "C" ],
			     [ "Short passing", "BB, Blocking TE" ],
		  	     [ "Short passing", "Game Manager QB, HB" ],
			     [ "Medium to deep passing", "SB, Receiving TE" ],
			     [ "Short passing", "System QB, SE" ],
			     [ "Inside running", "SB, FB, RT" ],
			     [ "Vertical passing", "FB, TE, LT" ],
			     [ "Outside running", "SB, FB, TE" ],
			     [ "Outside running", "HB, FL" ] ],
			   [ [ "All formations available", "All" ],
			     [ "Light blitzing", "LDE" ],
			     [ "Moderate blitzing", "MC" ],
			     [ "Moderate blitzing", "ZC" ],
			     [ "Light blitzing", "TFE, NT" ],
			     [ "All Formations", "DT" ],
			     [ "Heavy blitzing", "DT, SLB, WLB, ZC" ],
			     [ "No blitzing", "OR, IR, ILB, SS" ],
			     [ "Moderate blitzing", "TFE, NT, OLB, MC" ],
			     [ "No blitzing", "ER, NT" ],
			     [ "Light blitzing", "FS" ],
			     [ "Light blitzing", "RDE, UT" ],
			     [ "Moderate blitzing", "TFE, NT, OLB" ],
			     [ "Heavy blitzing", "FS" ] ]
];

//--------------------------------------
//---------- DEPTHS --------------------

var OffFormationStarters = [ [1,2,2,1,5], [1,2,2,1,5], [1,2,2,1,5], [1,2,3,0,5], [1,1,3,1,5], [1,1,2,2,5],
									  [1,3,2,0,5], [1,2,2,1,5], [1,2,3,0,5], [1,1,4,0,5], [1,0,5,0,5], [1,2,0,2,5], [1,2,1,2,5]  ];
var DefFormationStarters = [ [2,2,3,2,2], [2,2,3,2,2], [2,2,3,2,2], [2,2,3,2,2], [2,2,3,2,2], [2,1,4,2,2],
									  [2,2,4,1,2], [2,1,4,2,2], [2,1,4,2,2], [0,3,4,2,2], [0,2,5,2,2], [2,3,2,2,2], [2,2,3,2,2]  ];
var OffPairs = [ [ [0,0],[1,0],[1,1],[2,0],[2,1],[3,0],[4,0],[4,1],[4,2],[4,3],[4,4] ],		//I-FORM . . . UNLOGGED
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ]
];
var DefPairs = [ [ [5,0],[5,1],[6,0],[6,1],[7,0],[7,1],[7,2],[8,0],[8,1],[9,0],[9,1] ],		//MM43 . . . UNLOGGED
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ],
					  [ ]
];
//NONE/I-FORM/I-FORM-P/I-FORM-R/HYBRD/MIX/2TE/SPLIT-BCK/3WR/4WR/OFFST/H-BCK/2H-BCK/WING-T
var OffSystemDepth = [ [2,4,5,3,8], [2,4,5,3,8], [2,4,5,3,8], [2,4,5,3,8], [2,4,6,2,8], [2,4,5,3,8], [2,3,5,4,8],     
							  [2,4,5,3,8], [2,3,6,3,8], [2,3,7,2,8], [2,4,5,3,8], [2,4,5,3,8], [2,4,4,4,8], [2,4,6,2,8]  ];
var DefSystemDepth = [ [4,4,6,4,4], [4,4,6,4,4], [4,4,6,4,4], [4,4,6,4,4], [4,4,6,4,4], [4,4,6,4,4], [4,2,8,4,4],
							  [4,4,7,4,3], [4,2,8,4,4], [4,2,8,4,4], [1,5,8,4,4], [2,4,8,4,4], [4,5,5,4,4], [4,4,6,4,4]  ];

//-----------------------------------------
//---------- POSITIONS --------------------

//TODO: these have to correlate to arrays above
var OffFormationPositions = [ [ "QB", "HB", "FB", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//I-FORM
			      [ "QB", "HB", "FB", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//OFFSET
			      [ "QB", "HB", "HB", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//SPLIT-BACK
			      [ "QB", "HB", "FB", "WR", "WR", "WR", "LT", "LG", "C", "RG", "RT" ],		//NO TE
			      [ "QB", "HB", "WR", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//3 WR
			      [ "QB", "HB", "WR", "WR", "TE", "TE", "LT", "LG", "C", "RG", "RT" ],		//2 TE
			      [ "QB", "HB", "HB", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//2 HB
			      [ "QB", "HB", "FB", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//H-BACK
			      [ "QB", "HB", "WR", "WR", "WR", "TE", "LT", "LG", "C", "RG", "RT" ],		//WING-T
			      [ "QB", "HB", "WR", "WR", "WR", "WR", "LT", "LG", "C", "RG", "RT" ],		//4 WR
			      [ "QB", "WR", "WR", "WR", "WR", "WR", "LT", "LG", "C", "RG", "RT" ],		//SPREAD
			      [ "QB", "HB", "HB", "FB", "TE", "TE", "LT", "LG", "C", "RG", "RT" ],		//FULL HOUSE
			      [ "QB", "HB", "FB", "WR", "TE", "TE", "LT", "LG", "C", "RG", "RT" ]   ];		//1 WR
var DefFormationPositions = [ [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//MM 43
			      [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//COVER2
			      [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//TAMPA2
			      [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//COVER3
			      [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//ZONE 43
			      [ "DE", "DE", "DT", "LB", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//ZONE 34 COVER 2
			      [ "DE", "DE", "DT", "LB", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//ZONE 34 COVER 3
			      [ "DE", "DE", "DT", "LB", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//ZONE 34
			      [ "DT", "DT", "LB", "LB", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ],		//2 NT
			      [ "DE", "DE", "DT", "DT", "DT", "LB", "LB", "FS", "SS", "CB", "CB" ],		//5 DL
			      [ "DE", "DE", "DT", "DT", "LB", "LB", "LB", "FS", "SS", "CB", "CB" ]  ];		//MM 46
