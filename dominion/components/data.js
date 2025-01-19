
DominionComponents.prototype.SetAirData = function() {  //UNLOGGED

	FIGHTErSPRITeOFFSETs = [ [11,-6],[3,-9],[1,-5],[-2,-7],[-2,-7],[-2,-5],[-2,-6],[-2,-6],[1,-5] ];
	JEtCOLOUrINDICEs = [ [ [], [] ],				//bomber
			[ [0,5,7], [1,2,3,4,6] ]			//fighter
				];
	LEFtFLAReOFFSETs = [ { X: 138, Y: 46 }, { X: 138, Y: 82 }, { X: 138, Y: 10 }, { X: 138, Y: 118 },
			{ X: 138, Y: 64 }, { X: 138, Y: 100 }, { X: 138, Y: 28 }, { X: 138, Y: 136 }  ];
	RIGHtFLAReOFFSETs = [ { X: 9, Y: 64 }, { X: 9, Y: 100 }, { X: 9, Y: 28 }, { X: 9, Y: 136 },
			 { X: 9, Y: 46 }, { X: 9, Y: 82 }, { X: 9, Y: 10 }, { X: 9, Y: 118 }  ];
	LEFtCHAFfOFFSETs = [ { X: 123, Y: 69 }, { X: 123, Y: 105 }, { X: 123, Y: 33 }, { X: 123, Y: 141 },
			{ X: 123, Y: 87 }, { X: 123, Y: 123 }, { X: 123, Y: 51 }, { X: 123, Y: 159 }  ];
	RIGHtCHAFfOFFSETs = [ { X: 24, Y: 64 }, { X: 24, Y: 100 }, { X: 24, Y: 28 }, { X: 24, Y: 136 },
			 { X: 24, Y: 46 }, { X: 24, Y: 82 }, { X: 24, Y: 10 }, { X: 24, Y: 118 }  ];

	FighterDistributions = [ [ 18,0,0,0, 0,0,0,0,0 ],		//Hornet
									 [  8,8,0,0, 0,0,0,0,0 ],		//Jaguar
									 [  7,1,7,0, 0,0,0,0,0 ],		//Falcon
									 [  6,1,1,6, 0,0,0,0,0 ],		//Vulcan
									 [  4,1,1,1, 1,4,0,0,0 ],		//Eagle
									 [  3,1,1,1, 1,1,3,0,0 ],		//Buccanear
									 [  2,1,1,1, 1,1,1,2,0 ],		//Phantom
									 [  1,1,1,1, 1,1,1,1,1 ],		//Mirage
									 [ 10,2,2,2,10,0,0,0,0 ]		//Tomcat
	];
};
DominionComponents.prototype.SetJetData = function() {  //UNLOGGED

	FIGHTER = Object.assign({}, JET, FIGHTER);
	BOMBER = Object.assign({}, JET, BOMBER);
};
