
var POSITION = { GK: 0, RB: 1, RWB: 2, RCB: 3, CB: 4, ACB: 5, LCB: 6, LB: 7, LWB: 8,
					  RM: 9, RAM: 10, RCM: 11, DM: 12, CM: 13, CAM: 14, AM: 15, LCM: 16, LM: 17, LAM: 18,
					  RW: 19, RF: 20, CF: 21, S: 22, LF: 23, LW: 24, TYPES: 25,
					  CATEGORIES : { FB: 0, CH: 1, AB: 2, HM: 3, MF: 4, OM: 5, W: 6, F: 7, CS: 8 }				//O - offensive
};
var P = { GK: 0, RB: 1, RWB: 2, RCB: 3, CB: 4, ACB: 5, LCB: 6, LB: 7, LWB: 8,
			 RM: 9, RAM: 10, RCM: 11, DM: 12, CM: 13, CAM: 14, AM: 15, LCM: 16, LM: 17, LAM: 18,
			 RW: 19, RF: 20, CF: 21, S: 22, LF: 23, LW: 24, TYPES: 25
};
var Positions = [ "GK", "RB", "RWB", "RCB", "CB", "ACB", "LCB", "LB", "LWB",
						"RM", "RAM", "RCM", "DM", "CM", "CAM", "AM", "LCM", "LM", "LAM",
						"RW", "RF", "CF", "S", "LF", "LW"
];
var PositionGroups = [ "G", "D", "M", "A" ];
var PositionPriorities = [];
var PositionGoals = [ 28,21,14,35,21,7,5,4,3 ];		//by Category
/*
var PositionReplacements = [ [],		//GK
			     [0,0,0,1,2,2,1,1,1,2,1,2,2,3,2,2,3,3,4,5,4,4],	//RB
			     [0,0,1,2,1,2,2,1,1,1,2,2,2,2,3,3,3,3,4,5,4,4],	//RWB
			     [],
			     [],
			     []
];
*/
/*
var SwitchPenalties = [ [],	//GK
			[],	//RB
			[],
			[],
			[]
];
*/
var SQUAD = { SIZE: 27, TYPES: 4, SUbPOSITIONS: 5, CATEGORY: { G: 0, D: 1, M: 2, A: 3 }, GROUPS: 4,		//TODO: make .TYPES REDUNDANT
				  SLOTS: { G: 3, D: 8, M: 10, A: 6,
		        GK: 3, RB: 2, CB: 4, LB: 2, RM: 2, DM: 1, CM: 2, AM: 1, LM: 2, RW: 1, S: 4, LW: 1 } };		//NOTE: used in Formation View
var SquadDistribution = [ 6, 2,2,2,2,2,2,2,2, 2,2,2,2,2,2,2,2,2,2, 1,3,2,4,3,1 ];
