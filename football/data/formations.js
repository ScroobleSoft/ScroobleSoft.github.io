
var FORMATION = { NONE: -1, F541: 0, F532: 1, F442: 2, F4312: 3, F4231: 4, F4141: 5, F4222: 6, F433: 7, F361: 8, F352: 9, F343: 10, F3313: 11, TYPES: 12 };
var Formations = [
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.ACB,POSITION.CB,POSITION.LB, POSITION.RM,POSITION.CM,POSITION.CM,POSITION.LM, POSITION.CF ],			//541
	[ POSITION.GK, POSITION.RWB,POSITION.RCB,POSITION.CB,POSITION.LCB,POSITION.LWB, POSITION.RCM,POSITION.DM,POSITION.LCM, POSITION.S,POSITION.S ],		//532 
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.CB,POSITION.LB, POSITION.RM,POSITION.CM,POSITION.CM,POSITION.LM, POSITION.S,POSITION.S ],				//442
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.CB,POSITION.LB, POSITION.RCM,POSITION.DM,POSITION.CAM,POSITION.LCM, POSITION.S,POSITION.S ],			//4312
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.CB,POSITION.LB, POSITION.RAM,POSITION.CM,POSITION.CAM,POSITION.CM,POSITION.LAM, POSITION.CF ],		//4231
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.CB,POSITION.LB, POSITION.RAM,POSITION.AM,POSITION.DM,POSITION.AM,POSITION.LAM, POSITION.CF ],		//4141
	[ POSITION.GK, POSITION.RB,POSITION.CB,POSITION.CB,POSITION.LB, POSITION.RAM,POSITION.CM,POSITION.CM,POSITION.LAM, POSITION.S,POSITION.S ],			//4222
	[ POSITION.GK, POSITION.RWB,POSITION.CB,POSITION.CB,POSITION.LWB, POSITION.RCM,POSITION.DM,POSITION.LCM, POSITION.RW,POSITION.S,POSITION.LW ],		//433
	[ POSITION.GK, POSITION.RCB,POSITION.CB,POSITION.LCB, POSITION.RM,POSITION.CM,POSITION.DM,POSITION.CAM,POSITION.CM,POSITION.LM, POSITION.CF ],		//361
	[ POSITION.GK, POSITION.RCB,POSITION.CB,POSITION.LCB, POSITION.RM,POSITION.CM,POSITION.DM,POSITION.CM,POSITION.LM, POSITION.S,POSITION.S ],			//352
	[ POSITION.GK, POSITION.RCB,POSITION.CB,POSITION.LCB, POSITION.RM,POSITION.CM,POSITION.CM,POSITION.LM, POSITION.RF,POSITION.CF,POSITION.LF ],		//343
	[ POSITION.GK, POSITION.RCB,POSITION.CB,POSITION.LCB, POSITION.RCM,POSITION.DM,POSITION.CAM,POSITION.LCM, POSITION.RW,POSITION.CF,POSITION.LW ]		//3313
];
var PositionOffsets = [ [ 0,0,0,1,0,0,0,1,0,0,1 ],	//5-4-1
								[ 0,0,1,0,0,0,0,1,0,1,0 ],	//5-3-2
								[ 0,0,1,0,0,0,1,0,0,1,0 ],	//4-4-2
								[ 0,0,1,0,0,0,0,0,0,1,0 ],	//4-3-1-2
								[ 0,0,1,0,0,0,0,0,0,0,1 ],	//4-2-3-1
								[ 0,0,1,0,0,0,0,0,0,0,1 ],	//4-1-4-1
								[ 0,0,1,0,0,0,0,0,0,1,0 ],	//4-2-2-2
								[ 0,0,1,0,0,0,0,0,0,0,1 ],	//4-3-3
								[ 0,0,1,0,0,1,0,0,0,0,1 ],	//3-6-1
								[ 0,0,1,0,1,0,0,0,1,1,0 ],	//3-5-2
								[ 0,0,1,0,0,1,0,0,0,0,1 ],	//3-4-3
								[ 0,0,1,0,0,0,0,0,0,0,1 ]	//3-3-1-3
];
var PositionZones = [ [ [-1,-1],[-1,-1] ],																												//GK
							 [ [0,6],[0,5] ], [ [1,6],[2,6] ], [ [0,5],[0,4] ], [ [0,2],[0,4] ],													//RB-RWB-RCB-CB
							 [ [1,3],[0,3] ], [ [0,1],[0,2] ], [ [0,0],[0,1] ], [ [1,0],[2,0] ],													//ACB-LCB-LB-LWB
							 [ [3,6],[3,5] ], [ [4,6],[4,5] ], [ [3,5],[3,4] ], [ [2,3],[3,3] ], [ [3,2],[3,4] ],							//RM-RAM-RCM-DM-CM
							 [ [4,3],[5,3] ], [ [4,2],[4,4] ], [ [3,1],[3,2] ], [ [3,1],[3,2] ], [ [4,0],[4,1] ],							//CAM-AM-LCM-LM-LAM
							 [ [5,6],[5,5] ], [ [5,5],[5,4] ], [ [5,3],[6,3] ], [ [6,2],[6,4] ], [ [5,1],[5,2] ], [ [5,0],[5,1] ]		//RW-RF-CF-S-LF-LW
];
var FormationZones = [ [ [-1,-1],[0,6],[0,4],[1,3],[0,2],[0,0], [3,6],[3,4],[3,2],[3,0], [6,3] ],		//5-4-1
							  [ [-1,-1],[1,6],[0,5],[0,3],[0,1],[1,0], [3,5],[3,3],[3,1], [6,2],[6,4] ],		//5-3-2
							  [ [-1,-1],[0,6],[0,4],[0,2],[0,0], [3,6],[3,4],[3,2],[3,0], [6,2],[6,4] ],		//4-4-2
							  [ [-1,-1],[0,6],[0,4],[0,2],[0,0], [3,6],[2,3],[4,3],[3,0], [6,2],[6,4] ],		//4-3-1-2
							  [ [-1,-1],[0,6],[0,4],[0,2],[0,0], [4,6],[2,2],[4,3],[2,4],[4,0], [6,3] ],		//4-2-3-1
							  [ [-1,-1],[0,6],[0,4],[1,3],[0,2],[0,0], [3,6],[3,4],[3,2],[3,0], [6,3] ],		//4-1-4-1
							  [ [-1,-1],[1,6],[0,4],[0,2],[1,0], [4,6],[3,4],[3,2],[4,0], [6,4],[6,2] ],		//4-2-2-2
							  [ [-1,-1],[1,6],[0,4],[0,2],[1,0], [3,5],[2,3],[3,1], [5,6],[6,3],[5,0] ],		//4-3-3
							  [ [-1,-1],[0,5],[0,3],[0,1], [3,6],[3,4],[2,3],[4,3],[3,2],[3,0], [6,3] ],		//3-6-1
							  [ [-1,-1],[0,5],[0,3],[0,1], [3,6],[3,4],[2,3],[3,2],[3,0], [6,2],[6,4] ],		//3-5-2
							  [ [-1,-1],[0,5],[0,3],[0,1], [3,6],[3,4],[3,2],[3,0], [5,5],[6,3],[5,1] ],		//3-4-3
							  [ [-1,-1],[0,5],[0,3],[0,1], [3,6],[2,3],[4,3],[3,0], [5,6],[6,3],[5,0] ]		//3-3-1-3
];
var FormationNames = [ "5-4-1", "5-3-2", "4-4-2", "4-3-1-2", "4-2-3-1", "4-1-4-1", "4-2-2-2", "4-3-3", "3-6-1", "3-5-2", "3-4-3", "3-3-1-3" ];
/* REDUNDANT at the moment
var MatchUps = [ [ P.LW,P.LF,P.LAM,P.S,P.LM],	//RB
];
*/
var P = { GK: 0, RB: 1, RWB: 2, RCB: 3, CB: 4, ACB: 5, LCB: 6, LB: 7, LWB: 8,
			 RM: 9, RAM: 10, RCM: 11, DM: 12, CM: 13, CAM: 14, AM: 15, LCM: 16, LM: 17, LAM: 18,
			 RW: 19, RF: 20, CF: 21, S: 22, LF: 23, LW: 24, TYPES: 25
};
var FormationUnits = [ [ [1,2,3,4,5],[6,7,8,9],[10] ],	//5-4-1 . . . D-M-A
							  [ [1,2,3,4,5],[6,7,8],[9,10] ],	//5-3-2
							  [ [1,2,3,4],[5,6,7,8],[9,10] ],	//4-4-2
							  [ [1,2,3,4],[5,6,7,8],[9,10] ],	//4-3-1-2
							  [ [1,2,3,4],[5,6,7,8,9],[10] ],	//4-2-3-1
							  [ [1,2,3,4],[5,6,7,8,9],[10] ],	//4-1-4-1
							  [ [1,2,3,4],[5,6,7,8],[9,10] ],	//4-2-2-2
							  [ [1,2,3,4],[5,6,7],[8,9,10] ],	//4-3-3
							  [ [1,2,3],[4,5,6,7,8,9],[10] ],	//3-6-1
							  [ [1,2,3],[4,5,6,7,8,9],[10] ],	//3-5-2
							  [ [1,2,3],[4,5,6,7],[8,9,10] ],	//3-4-3
							  [ [1,2,3],[4,5,6,7],[8,9,10] ] 	//3-3-1-3
];
var ZoneUnits = [ [ [1,6],[2,3,4,7,8,10],[5,9] ],	//5-4-1 . . . R-C-L
						[ [1,2,6],[3,7,9,10],[4,5,8] ],	//5-3-2
						[ [1,5],[2,3,6,7,9,10],[4,8] ],	//4-4-2
						[ [1],[2,3,5,6,7,8,9,10],[4] ],	//4-3-1-2
						[ [1,5],[2,3,6,7,8,10],[4,9] ],	//4-2-3-1
						[ [1,5],[2,3,6,7,8,10],[4,9] ],	//4-1-4-1
						[ [1,5],[2,3,6,7,9,10],[4,8] ],	//4-2-2-2
						[ [1,5,8],[2,3,6,9],[4,7,10] ],	//4-3-3
						[ [1,4],[2,5,6,7,8,10],[3,9] ],	//3-6-1
						[ [1,4],[2,5,6,7,8,10],[3,8] ],	//3-5-2
						[ [1,4,8],[2,5,6,9],[3,7,10] ],	//3-4-3
						[ [1,4,8],[2,5,6,9],[3,7,10] ] 	//3-3-1-3
];
