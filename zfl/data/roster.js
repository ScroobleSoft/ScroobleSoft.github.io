
//-----------------------------------------
//---------- POSITIONS --------------------

var POSITION = { QB: 0, RB: 1, WR: 2, TE: 3, OL: 4, DE: 5, DT: 6, LB: 7, S: 8, CB: 9, COUNT: 10,
		 SQB: 00, MQB: 01, PQB: 02, GQB: 03, QBs:  4, DQB: 04,
		 SB:  10, TB:  11, HB:  12, PB:  13, FB:  14, RBs:  5, AB: 15,
		 FL:  20, SE:  21, PR:  22, SR:  23, WRs:  4, DR:  24,
		 RTE: 30, BTE: 31, TEs: 2,
		 LT:  40, LG:  41, C:   42, RG:  43, RT:  44, OLs:  5, MB:  45,
		 RDE: 50, LDE: 51, TFE: 52, DEs:  3, ER:  53,				//TFE- Three Four End
		 IR:  60, UT:  61, NT:  62, DTs:  3, MG:  63,
		 OLB: 70, SLB: 71, ILB: 72, WLB: 73, LBs:  4, BLB: 74,
		 FS:  80, SS:  81, Ss:   2, ES:  82,
		 CC:  90, ZC:  91, PC:  92, NC:  93, CBs:  4				//PC- Press Corner
};
var Positions = [ "QB", "RB", "WR", "TE", "OL", "DE", "DT", "LB", "S", "CB" ];
var SubPositions = [ [ "SYS", "MBL", "PKT", "GM", "DF" ],
		     [ "SB", "TB", "HB", "PB", "FB" ],
		     [ "FL", "SE", "PR", "SR", "DR" ],
		     [ "RCV", "BLK" ],
		     [ "LT", "LG", "C", "RG", "RT", "MB" ],
		     [ "RDE", "LDE", "TFE", "ER" ],
		     [ "IR", "UT", "NT", "MG" ],
		     [ "OLB", "SLB", "ILB", "WLB", "BLB" ],
		     [ "FS", "SS", "ES" ],
		     [ "CC", "ZC", "PC", "NC" ]
];
var PositionSwitches = [[1,8],[0,9],[0,3],[2,4],[3,6],[6,7],[4,5],[1,5],[7,9],[2,8]];
var PositionDistributions = [ [ 3,5,6,3,9,4,4,7,5,5 ],		//ZFL					make REDUNDANT
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//I-FORM . . . MIX43
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//I-FORM PASS . . . MM43
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//I-FORM RUN . . . ZN43
			      [ 3,4,7,3,9,4,3,8,5,5 ],		//HYBRD
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//MIX
			      [ 3,4,5,4,9,2,6,8,5,5 ],		//2TE . . . ZN34
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//SPLIT-BACK . . . TAMPA2
			      [ 3,4,7,3,9,4,2,8,5,6 ],		//3WR . . . MM34
			      [ 3,4,8,2,9,4,4,7,5,5 ],		//4WR . . . RAVEN43
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//OFFSET . . . COVER3
			      [ 3,5,6,3,9,4,4,7,5,5 ],		//H-BACK . . . IR43
			      [ 3,5,5,4,9,4,3,8,5,5 ],		//2H-BACK . . . MIX34
			      [ 3,5,7,2,9,4,3,8,5,5 ]		//WING-T . . . BLTZ34
];
var OffDefDistributions = [ [ [3,5,6,3,9], [3,5,6,3,9], [3,5,6,3,9], [3,5,6,3,9], [3,4,7,3,9], [3,5,6,3,9], [3,4,5,5,9],     //NONE/IFORM/IFORMP/IFORMR/HYBRD/MIX/2TE
			      [3,5,6,3,9], [3,4,7,3,9], [3,4,8,2,9], [3,5,6,3,9], [3,5,6,3,9], [3,5,5,4,9], [3,5,7,2,9]  ],  //SPLTBK/3WR/4WR/OFFST/H-BCK/2H-BCK/WNGT
			    [ [4,4,7,5,5], [4,4,7,5,5], [4,4,7,5,5], [4,4,7,5,5], [4,3,8,5,5], [4,4,7,5,5], [1,6,8,5,5],
			      [4,4,7,5,5], [4,2,8,5,6], [4,4,7,5,5], [4,4,7,5,5], [4,4,7,5,5], [4,3,8,5,5], [4,3,8,5,5]  ]
];
var StarterDistributions = [ [ [1,2,2,1,5], [1,2,2,1,5], [1,2,2,1,5], [1,2,2,1,5], [1,2,3,1,5], [1,2,2,1,5], [1,1,2,2,5],     //NONE/IFORM/IFORMP/IFORMR/HYBRD/MIX/2TE
  //used in roster	       [1,2,2,1,5], [1,1,3,1,5], [1,1,4,1,5], [1,2,2,1,5], [1,2,2,2,5], [1,3,2,2,5], [1,2,3,1,5]  ],  //SPLTBK/3WR/4WR/OFFST/H-BCK/2H-BCK/WNGT
  //generation		     [ [2,2,3,2,2], [2,2,3,2,2], [2,2,3,2,2], [2,2,3,2,2], [2,2,4,2,2], [2,2,3,2,2], [1,3,4,2,2],
			       [2,2,3,2,2], [2,1,4,2,3], [2,2,3,2,3], [2,2,3,2,2], [2,2,3,2,2], [2,1,4,2,2], [2,1,4,2,3]  ]
];
var GridderTypes = [ "", "Dvsnl", "Injrd", "Sprkr", "Specl", "Tmprl", "Vrstl", "Voltl", "Dmnsl", "Prjct" ];
var SYSTEM = { OFF: { IfORM: 0, IfORmPASS: 1, IfORmRUN: 2, HYBRD: 3, MIX: 4, TWoTE: 5, SPLItBACK: 6,
		      THREeWR: 7, FOUrWR: 8, OFFSEtI: 9, HbACK: 10, DUAlHbACK: 11, WINgT: 12, COUNT: 13 },
	       DEF: { MIX43: 0, MM43: 1, ZN43: 2, HYBRD: 3, MIX: 4, ZN34: 5, TAMPA2: 6,
		      MM34: 7, RAVEN43: 8, COVER3: 9, MM43: 10, MIX34: 11, ZN34SAFETY: 12 }  };
var ROSTER = { SLOTS: { MINIMUM: { QB: 2, RB: 3, WR: 4, TE: 2, OL: 7, DE: 3, DT: 3, LB: 6, S: 3, CB: 3, COUNT: 36 }, RANDOM: 10 },
	       QBs: 3, RBs: 5, WRs: 6, TEs: 3, OLs: 9, DEs: 4, DTs: 4, LBs: 7, Ss: 5, CBs: 5, SLOTS: 51,				//used for draft generation
	       DISTRIBUTION: { FIXED: 0, MINIMUM: 1, RANDOM: 2 }, COLOUR: "rgb(63,191,223)" };
var RosterSlots = [ 3, 5, 6, 3, 9, 4, 4, 7, 5, 5 ];  //by position, mostly for IfORM/43 . . . REDUNDANT?
var PRACTICeSQUAD = { SIZE: 8 };
var INJURY = { MAX: 20, CUMULATIVE: 140 };
