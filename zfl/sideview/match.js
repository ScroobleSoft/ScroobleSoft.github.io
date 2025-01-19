/*
 *  25 secs per play, 144 plays in game
 *  12 possessions per team on average
 *  6.5% of all plays on aveage result in turnovers
 *  2 evaluations per play - checking for cumulative team win (off vs def) with even quality providing a 66.67% chance of success and yards gained equal to the
 *  number of match-ups won, and then a further addition of yards if the biggest play on offense trumps the biggest play on defense; the size of a big play
 *  is the number of consecutive die roll won by a player against his match-up
 */

var PLAySTATE = { PReSNAP: 0, PASS: { QBdROP: 1, QBsET: 2, THROWING: 3, THROWN: 4, CAUGHT: 5, INCOMPLETE: 6, POSSESSION: 7, TACKLED: 8, OVER: 9 },
					RUN:  { QBtURNING: 1, HANdOFF: 2, HANDEdOFF: 3, TACKLED: 4 } };
var SVIForm = [ [155,350],[70,350],[70,350],[155,535],[175,220],[175,380],[175,330],[170,340],[170,350],[170,360],[170,370],
		[200,325],[200,340],[200,360],[200,375],[300,320],[300,350],[300,380],[200,220],[400,315],[400,385],[200,535] ];
var RUnGAP = { LtLG: 0, LgRG: 1, RgRT: 2 };

var RedSideOnGridderSprite, BlueSideOnGridderSprite, FootballSprite;

//--------------------------------------------------
//---------- ZFL GAME SIDE VIEW --------------------
var ZFLGameSideView = function() {
	var Screen;
	var InfoBox;
	var GraphicsTool;
	var TextWriter;
	var Randomizer;
	var Frames;
	var State;
	var QuickSim;

	var Plays, Down, Yards, BigPlays;
	var Wins, OffBigPlay, DefBigPlay;
	var HomeOffBigPlays, HomeDefBigPlays, VisitorsOffBigPlays, VisitorsDefBigPlays;
	var HomeOffBurns, HomeDefBurns, VisitorsOffBurns, VisitorsDefBurns;

	var HomeTeam, VisitingTeam;
	var HomeOffRating, HomeDefRating;
	var VisitorsOffRating, VisitorsDefRating;
	var RealHomeOffRating, RealHomeDefRating, RealVisitorsOffRating, RealVisitorsDefRating;
	var HomeFGRange, HomeFieldPosition;
	var VisitorsFGRange, VisitorsFieldPosition;
	var PlayOff, PlayDef;
	var OffRating, DefRating;
	var OffPlayerRating, DefPlayerRating;
	var MatchUps, OffMatchUp, DefMatchUp;
	var Score, Time, Quarter;

	var Field;
	var Ball;		//coords
	var Offense;		//REDUNDANT right now
	var Defense;		//NOTE: it's Ok for these fields to be replicated in NFLTacticalView (to be renamed NFLGameTacticalView)
	var QB;

	var PassComplete, PassYards;		//TODO: can instead have Pass = { Complete: false, Yards: -1, Big: true }
	var TotalYards;
	var BigPlay;				//flag
	var LineOfScrimmage;			//yards

	//TEMP - pass play sequence
	var QBx, QBState;
	var FLpos, LCBpos, SEpos, RCBpos;
	var HBpos, FBpos, TEpos, WLBpos, MLBpos, SLBpos;
	var FSpos, SSpos;
	var PrimaryReceiver;
	var PassComplete;

	var i, x, y, fy;
};
ZFLGameSideView.prototype = {
	Set(cntxt, iBox, gTool, tWriter, rGenerator) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
		this.Randomizer = rGenerator;

		this.Field = new GridironSideViewField();
		this.Field.Set(this.Screen, this.GraphicsTool, this.TextWriter);
		this.Ball = new Coordinate2D();
		this.Offense = new Array(11);	//HARD-CODED
		this.QB = this.Offense[0];
		this.Defense = new Array(11);	//HARD-CODED

		this.Frames = 0;
		this.State = PLAySTATE.PReSNAP;
		this.Score = { Home: 0, Visitors: 0 };
		this.Time = 0;
		this.Down = 1;
		this.Yards = 10;
		this.LineOfScrimmage = 20;
		this.Plays = 0;
		this.BigPlays = 0;
		this.TotalYards = 0;
		this.Quarter = 1;

		this.MatchUps = [7,4,6,9,10,8,0,2,5,3,1];		//QB-S1, HB-LB1, FB-LB3, WR1-CB1, WR2-CB2, TE-S2, OL1-DE1, OL2-DT1, OL3-LB2, OL4-DT2, OL5-DE2

		//TEMP - pass play sequence
		this.QBx = 155;
		this.QBState = 0;
		this.FLpos = new Coordinate2D();
		this.FLpos.X = 155;
		this.FLpos.Y = 385;
		this.LCBpos = new Coordinate2D();
		this.LCBpos.X = 200;
		this.LCBpos.Y = 385;
		this.SEpos = new Coordinate2D();
		this.SEpos.X = 175;
		this.SEpos.Y = 70;
		this.RCBpos = new Coordinate2D();
		this.RCBpos.X = 200;
		this.RCBpos.Y = 70;
		this.HBpos = { X: 100, Y: 200 };
		this.FBpos = { X: 55, Y: 200 };
		this.TEpos = { X: 175, Y: 230 };
		this.WLBpos = { X: 300, Y: 170 };
		this.MLBpos = { X: 300, Y: 200 };
		this.SLBpos = { X: 300, Y: 230 };
		this.FSpos = { X: 400, Y: 165 };
		this.SSpos = { X: 400, Y: 235 };

		this.SetStatArrays();
		this.SetSprites();
	},
	Reset() {
		this.Plays = 0;
		this.Time = 0;
		this.Quarter = 0;
		this.Down = 0;
		this.Score.Home = 0;
		this.Score.Visitors = 0;
	},
	SetStatArrays() {

		//Create
		this.HomeOffBigPlays = new Array(OFFENSE.STARTERS);
		this.HomeDefBigPlays = new Array(DEFENSE.STARTERS);
		this.VisitorsOffBigPlays = new Array(OFFENSE.STARTERS);
		this.VisitorsDefBigPlays = new Array(DEFENSE.STARTERS);
		this.HomeOffBurns = new Array(OFFENSE.STARTERS);
		this.HomeDefBurns = new Array(DEFENSE.STARTERS);
		this.VisitorsOffBurns = new Array(OFFENSE.STARTERS);
		this.VisitorsDefBurns = new Array(DEFENSE.STARTERS);

		//Initialize
		for (indx=0;indx<OFFENSE.STARTERS;++indx) {
	 this.HomeOffBigPlays[indx] = 0;
	 this.HomeDefBigPlays[indx] = 0;
	 this.VisitorsOffBigPlays[indx] = 0;
	 this.VisitorsDefBigPlays[indx] = 0;
	 this.HomeOffBurns[indx] = 0;
	 this.HomeDefBurns[indx] = 0;
	 this.VisitorsOffBurns[indx] = 0;
	 this.VisitorsDefBurns[indx] = 0;
		}
	},
	SetSprites() {

		RedSideOnGridderSprite = new AnimatedSprite();
		RedSideOnGridderSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 229, T: 82, W: 23, H: 28, O: 1 } );
		BlueSideOnGridderSprite = new AnimatedSprite();
		BlueSideOnGridderSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 229, T: 121, W: 23, H: 28, O: 1 } );
		FootballSprite = new GenieSprite();
		FootballSprite.Set(this.Screen, ImageManager.Pics[IMAGeINDEX.SCRATCH], { L: 300, T: 162, W: 15, H: 8 } );
	},
	SetTeams(hTeam, vTeam) {
		var iTeam;
		var differential;

		//TODO: after setting teams, have to connect units to agents depending on who has possession
		//TODO: will need a method to re-set connections on change of possession

		//Set teams and starters
		this.HomeTeam = hTeam;
		this.VisitingTeam = vTeam;
		this.HomeTeam.SelectStarters();
		this.VisitingTeam.SelectStarters();
/* */
		this.OrganizeOLine();	//a TEMP fix to introduce C/G/T distinctions
		this.ShuffleOLine();	//same, for opponents
/* */
		this.PlayOff = this.HomeTeam.OffStarters;
		this.PlayDef = this.VisitingTeam.DefStarters;

		//Set ratings
		this.HomeOffRating = 0;
		this.HomeDefRating = 0;
		this.VisitorsOffRating = 0;
		this.VisitorsDefRating = 0;
		for (indx=0;indx<11;++indx) {
	 this.HomeOffRating += this.HomeTeam.OffStarters[indx].Quality;
	 this.HomeDefRating += this.HomeTeam.DefStarters[indx].Quality;
	 this.VisitorsOffRating += this.VisitingTeam.OffStarters[indx].Quality
	 this.VisitorsDefRating += this.VisitingTeam.DefStarters[indx].Quality;
		}

		//Adjust ratings to avoid lopsided scores - NEW!
		this.RealHomeOffRating = this.HomeOffRating;
		this.RealHomeDefRating = this.HomeDefRating;
		this.RealVisitorsOffRating = this.VisitorsOffRating;
		this.RealVisitorsDefRating = this.VisitorsDefRating;
		if (this.HomeOffRating>this.VisitorsDefRating) {
	 differential = this.HomeOffRating - this.VisitorsDefRating;
	 this.VisitorsDefRating += differential;
	 this.HomeDefRating += differential;
//	 if (this.HomeDefRating-this.VisitorsOffRating>66)
//		 this.HomeDefRating = this.VisitorsOffRating + 66;
		}
		if (this.VisitorsOffRating>this.HomeDefRating) {
	 differential = this.VisitorsOffRating - this.HomeDefRating;
	 this.HomeDefRating += differential;
	 this.VisitorsDefRating += differential;
//	 if (this.HomeOffRating<11)		//make sure rating isn't too low
//		 this.HomeOffRating = 11;
//	 if (this.VisitorsDefRating-this.HomeOffRating>66)
//		 this.VisitorsDefRating = this.HomeOffRating + 66;
		}
		if (this.VisitorsDefRating-this.HomeOffRating>66) {
/*
	 differential = this.VisitorsDefRating - this.HomeOffRating;
	 differential -= 66;
	 this.HomeOffRating -= differential;
	 this.HomeDefRating += differential;
	 if (this.HomeDefRating-this.VisitorsOffRating>66)
		 this.HomeDefRating = this.VisitorsOffRating + 66;
*/
	 this.VisitorsDefRating = this.HomeOffRating + 66;
		}
		if (this.HomeDefRating-this.VisitorsOffRating>66) {
/*
	 differential = this.HomeDefRating - this.VisitorsOffRating;
	 differential -= 66;
	 this.VisitorsOffRating -= differential;
	 this.VisitorsDefRating += differential;
	 if (this.VisitorsDefRating-this.HomeOffRating>66)
		 this.VisitorsDefRating = this.HomeOffRating + 66;
*/
	 this.HomeDefRating = this.VisitorsOffRating + 66;
		}

		this.OffRating = this.HomeOffRating;
		this.DefRating = this.VisitorsDefRating;

		this.EvaluateSpecialTeams();
		if (!this.QuickSim) {
	 this.ShowStarters();
	 this.DisplayTeamsInfo();
		}
	},
	ShuffleOLine() {  //NOTE: only applies to visiting team . . . also, 6-LT, 7-LG, 8-C, 9-RG, 10-RT
		var num2;

		//NOTE: this is a TEMP method to simulate C/G/T distinctions

		//First randomly pick C, swap it with first OL selected if not that already
		num = this.Randomizer.GetInRange(6,10);
		if (num!=8)
	 Utils.SwapElements(this.VisitingTeam.OffStarters, num, 8);

		//Pick T's among remaining 4 linemen
		num = this.Randomizer.GetInRange(6,9);
		if (num==8)	//skip C spot
	 num = 10;
		do {
	 num2 = this.Randomizer.GetInRange(6,9);
	 if (num2==8)
		 num2 = 10;
		} while (num2==num);

		//Swap them if necessary (so that better one plays LT)
		if (this.VisitingTeam.OffStarters[num].Quality>this.VisitingTeam.OffStarters[num2].Quality)
	 Utils.SwapValues(num, num2);

		//Make sure they are in the right place
		if (num!=6)
	 Utils.SwapElements(this.VisitingTeam.OffStarters, num, 6);
		if (num2!=10)
	 Utils.SwapElements(this.VisitingTeam.OffStarters, num2, 10);

		//Make sure LG is not worse than RG
		if (this.VisitingTeam.OffStarters[7].Quality>this.VisitingTeam.OffStarters[9].Quality)
	 Utils.SwapElements(this.VisitingTeam.OffStarters, 7, 9);
	},
	OrganizeOLine() {
		var order;
		var OLine;

//		order = [8,6,7,9,10];		//AFL uninjured
//		order = [6,7,9,10,8];		//BFL uninjured
//		order = [8,7,6,10,9];		//DFL uninjured
//		order = [8,6,7,9,10];		//CFL uninjured
//		order = [10,6,8,7,9];		//MFL uninjured
//		order = [10,6,7,8,9];		//TFL uninjured
//		order = [6,7,10,8,9];		//BCFL uninjured
//		order = [6,7,8,9,10];		//USFL uninjured
//		order = [7,6,9,10,8];		//XFL uninjured
//		order = [8,6,9,7,10];		//XSL uninjured
//		order = [6,7,10,8,9];		//XXL uninjured
//		order = [9,6,8,7,10];		//SFL uninjured
//		order = [6,8,9,10,7];		//QFL uninjured
//		order = [9,6,8,7,10];		//IFL uninjured
		order = [6,7,8,10,9];

		//Remove all O-linemen
		OLine = new Array();
		for (indx=0;indx<order.length;++indx)
	 OLine.unshift(this.HomeTeam.OffStarters.pop());

		//Put them back in the proper order
		for (indx=0;indx<order.length;++indx)
	 this.HomeTeam.OffStarters.push(OLine[order[indx]-6]);
		OLine.length = 0;
	},
	EvaluateSpecialTeams() {
		var i, j;
		var hOffSpecials, hDefSpecials, hFGSpecials; 
		var vOffSpecials, vDefSpecials, vFGSpecials;

		//Calculate uninjured special teams aces on each team
		hOffSpecials = 0;
		hDefSpecials = 0;
		vOffSpecials = 0;
		vDefSpecials = 0;
		hFGSpecials = 0;
		vFGSpecials = 0;
		for (i=0;i<POSITION.COUNT;++i) {
	 for (j=0;j<this.HomeTeam.Roster.Gridders[i].length;++j)
		 if (this.HomeTeam.Roster.Gridders[i][j].Status==GRIDDER.SPECIAL && !this.HomeTeam.Roster.Gridders[i][j].Injury) {
			 if (i==POSITION.RB || i==POSITION.WR || i==POSITION.TE)
		  ++hOffSpecials;
			 else if (i==POSITION.LB || i==POSITION.S || i==POSITION.CB)
		  ++hDefSpecials;
			 else if (i==POSITION.QB || i==POSITION.OL)
		  ++hFGSpecials;
			 else if (i==POSITION.DE || i==POSITION.DT)
		  --vFGSpecials;
		 }
	 for (j=0;j<this.VisitingTeam.Roster.Gridders[i].length;++j)
		 if (this.VisitingTeam.Roster.Gridders[i][j].Status==GRIDDER.SPECIAL && !this.VisitingTeam.Roster.Gridders[i][j].Injury) {
			 if (i==POSITION.RB || i==POSITION.WR || i==POSITION.TE)
		  ++vOffSpecials;
			 else if (i==POSITION.LB || i==POSITION.S || i==POSITION.CB)
		  ++vDefSpecials;
			 else if (i==POSITION.QB || i==POSITION.OL)
		  ++vFGSpecials;
			 else if (i==POSITION.DE || i==POSITION.DT)
		  --hFGSpecials;
		 }
		}

		//Set FG ranges
		this.HomeFGRange = 75 - (2*hFGSpecials);
		if (this.HomeFGRange<65)
	 this.HomeFGRange = 65;
		if (this.HomeFGRange>85)
	 this.HomeFGRange = 85;
		this.VisitorsFGRange = 75 - (2*vFGSpecials);
		if (this.VisitorsFGRange<65)
	 this.VisitorsFGRange = 65;
		if (this.VisitorsFGRange>85)
	 this.VisitorsFGRange = 85;

		//Set field positions
		this.HomeFieldPosition = 20 + 5*(hOffSpecials-vDefSpecials);
		if (this.HomeFieldPosition<10)
	 this.HomeFieldPosition = 10;
		if (this.HomeFieldPosition>30)
	 this.HomeFieldPosition = 30;
		this.VisitorsFieldPosition = 20 + 5*(vOffSpecials-hDefSpecials);
		if (this.VisitorsFieldPosition<10)
	 this.VisitorsFieldPosition = 10;
		if (this.VisitorsFieldPosition>30)
	 this.VisitorsFieldPosition = 30;
	},
	Play() {

		if (this.Plays==0 && League.GamesPlayed % 2)
	 this.ChangePossession();

		this.EvaluatePlayOutcome();
		if (!this.QuickSim)
	 this.RunPlay();
		else
	 this.EndPlay();
		++this.Plays;
		this.Time += 25;
		if (this.Time==900) {
	 ++this.Quarter;
	 this.Time = 0;
		}
		++this.Down;
	},
	EvaluatePlayOutcome() {

		//NOTE: decided on 80% success per play by taking 67% passes completed, and of course 100% on run plays with a 60-40 pass-run ratio
		//NOTE: on NOTE above, will try 75% because scoring is a bit high, but more alarmingly not enough FGs are leading to tied scores

		//TODO: for any dimensional players, pick their quality
/*
		for (indx=0;indx<11;++indx)
	 if (this.PlayOff[indx].Status & GRIDDER.DIMENSIONAL)
		 if (this.Randomizer.CheckBoolean())
			  = 0;
		 else
			  = 14;
*/
		this.PassComplete = (this.Randomizer.GetWinner(this.OffRating, 3*this.DefRating, INVERTED)==0)
		this.PassYards = 0;
		if (this.PassComplete) {
	 for (indx=0;indx<11;++indx)
		 if (this.Randomizer.GetWinner(this.PlayOff[indx].Quality, this.PlayDef[this.MatchUps[indx]].Quality, INVERTED)==0)
			 ++this.PassYards;
	 this.BigPlay = this.CheckBigPlay();
	 if (this.BigPlay>0) {
		 ++this.BigPlays;
		 this.PassYards += this.BigPlay;
	 }
		}
		this.TotalYards += this.PassYards;
	},
	CheckBigPlay() {

		this.BigPlay = false;

		//Check for big play on offense
		this.OffBigPlay = 0;
		this.OffMatchUp = 0;
		for (indx=0;indx<11;++indx) {
	 this.Wins = 0;
	 this.OffPlayerRating = this.PlayOff[indx].Quality;
	 this.DefPlayerRating = this.PlayDef[this.MatchUps[indx]].Quality;
	 num = Math.min(this.OffPlayerRating, this.DefPlayerRating);
	 this.OffPlayerRating -= num;
	 this.DefPlayerRating -= num;
	 while (this.Randomizer.GetWinner(this.OffPlayerRating+3, this.DefPlayerRating+3, INVERTED)==0)
		 ++this.Wins;
//	 this.OffBigPlay = Math.max(this.OffBigPlay, this.Wins);
	 if (this.Wins>this.OffBigPlay) {
		 this.OffMatchUp = indx;
		 this.OffBigPlay = this.Wins;
	 }
		}

		//See if it is cancelled out by a big play on defense
		this.DefBigPlay = 0;
		this.DefMatchUp = 0;
		for (indx=0;indx<11;++indx) {
	 this.Wins = 0;
	 this.OffPlayerRating = this.PlayOff[indx].Quality;
	 this.DefPlayerRating = this.PlayDef[this.MatchUps[indx]].Quality;
	 num = Math.min(this.OffPlayerRating, this.DefPlayerRating);
	 this.OffPlayerRating -= num;
	 this.DefPlayerRating -= num;
	 while (this.Randomizer.GetWinner(this.OffPlayerRating+3, this.DefPlayerRating+3, INVERTED)==1)
		 ++this.Wins;
//	 this.DefBigPlay = Math.max(this.DefBigPlay, this.Wins);
	 if (this.Wins>this.DefBigPlay) {
		 this.DefMatchUp = this.MatchUps[indx];
		 this.DefBigPlay = this.Wins;
	 }
		}

		//Update stats
		if (this.DefBigPlay>this.OffBigPlay) {
	 if (this.PlayOff===this.HomeTeam.OffStarters) {
		 ++this.VisitorsDefBigPlays[this.DefMatchUp];
		 ++this.HomeOffBurns[this.DefMatchUp];
	 } else {
		 ++this.HomeDefBigPlays[this.DefMatchUp];
		 ++this.VisitorsOffBurns[this.DefMatchUp];
	 }
		} else {
	 if (this.PlayOff===this.HomeTeam.OffStarters) {
		 ++this.HomeOffBigPlays[this.OffMatchUp];
		 ++this.VisitorsDefBurns[this.OffMatchUp];
	 } else {
		 ++this.VisitorsOffBigPlays[this.OffMatchUp];
		 ++this.HomeDefBurns[this.OffMatchUp];
	 }
		}

		return (this.OffBigPlay-this.DefBigPlay);
	},
	UpdateDrive() {

		this.LineOfScrimmage += this.PassYards;
		if (this.LineOfScrimmage>=100) {	  			//check if a TD
	 this.UpdateScore(7);
	 this.ChangePossession();
		} else {
	 if (this.Yards<=this.PassYards) {			//check if a first down
		 this.Down = 1;
		 this.Yards = 10;
	 } else if (this.Down==4) {				//check if in FG range
//		 if (this.LineOfScrimmage>=75)
//			 this.UpdateScore(3);
		 if (this.PlayOff===this.HomeTeam.OffStarters) {
			 if (this.LineOfScrimmage>=this.HomeFGRange) 
		  this.UpdateScore(3);
		 } else
			 if (this.LineOfScrimmage>=this.VisitorsFGRange) 
		  this.UpdateScore(3);
		 this.ChangePossession();
	 } else							//update down yardage
		 this.Yards -= this.PassYards;
		}
		if (!this.QuickSim)
	 this.UpdateScoreboard();

		//Check if game is over
		if (this.Plays==144) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 if (this.QuickSim) {
		 this.PostMatchUpdate();
		 return;
	 }
	 this.Screen.fillStyle = GREY.LIGHT;
	 this.Screen.fillRect(400, 525, 200, 75);
	 num = Math.round(this.TotalYards/15)/10;
	 this.TextWriter.Write("Yards per pass: "+num, 400, 560);
	 this.TextWriter.Write("Big plays: "+this.BigPlays, 400, 580);
//	 this.ShowFinalScore();
	 this.ShowBigPlays();
		}
	},
	UpdateScore(pnts) {
		if (this.PlayOff===this.HomeTeam.OffStarters)
	 this.Score.Home += pnts;
		else
	 this.Score.Visitors += pnts;
//		this.ChangePossession();
	},
	ShowBigPlays() {
		var i;

		this.AnimationFrameHandle = requestAnimationFrame(this.ShowBigPlays.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.Screen.fillStyle = GREY.LIGHT;
	 this.Screen.fillRect(0, 450, SCREEN.WIDTH, 150);
	 for (i=0;i<OFFENSE.STARTERS;++i) {
		 this.TextWriter.Write(OffFormationPositions[this.HomeTeam.OffFormation][i]+":", 5, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.HomeTeam.OffStarters[i].Name.Last, 25, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(Utilities.NumberToGrade(this.HomeTeam.OffStarters[i].Quality), 85, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.HomeOffBigPlays[i], 105, 450+(13*(i+1)), { FONT: "10px Arial" } );

		 this.TextWriter.Write(DefFormationPositions[this.HomeTeam.DefFormation][i]+":", 125, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.HomeTeam.DefStarters[i].Name.Last, 145, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(Utilities.NumberToGrade(this.HomeTeam.DefStarters[i].Quality), 205, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.HomeDefBigPlays[i], 225, 450+(13*(i+1)), { FONT: "10px Arial" } );

		 this.TextWriter.Write(OffFormationPositions[this.VisitingTeam.OffFormation][i]+":", 245, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.VisitingTeam.OffStarters[i].Name.Last, 265, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(Utilities.NumberToGrade(this.VisitingTeam.OffStarters[i].Quality), 325, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.VisitorsOffBigPlays[i], 345, 450+(13*(i+1)), { FONT: "10px Arial" } );

		 this.TextWriter.Write(DefFormationPositions[this.VisitingTeam.DefFormation][i]+":", 365, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.VisitingTeam.DefStarters[i].Name.Last, 385, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(Utilities.NumberToGrade(this.VisitingTeam.DefStarters[i].Quality), 445, 450+(13*(i+1)), { FONT: "10px Arial" } );
		 this.TextWriter.Write(this.VisitorsDefBigPlays[i], 465, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 }

	 this.PostMatchUpdate();
		}
	},
	ChangePossession() {
		if (this.PlayOff===this.HomeTeam.OffStarters) {
	 this.PlayOff = this.VisitingTeam.OffStarters;
	 this.PlayDef = this.HomeTeam.DefStarters;
	 this.OffRating = this.VisitorsOffRating;
	 this.DefRating = this.HomeDefRating;
	 this.LineOfScrimmage = this.VisitorsFieldPosition;
		} else {
	 this.PlayOff = this.HomeTeam.OffStarters;
	 this.PlayDef = this.VisitingTeam.DefStarters;
	 this.OffRating = this.HomeOffRating;
	 this.DefRating = this.VisitorsDefRating;
	 this.LineOfScrimmage = this.HomeFieldPosition;
		}
//		this.LineOfScrimmage = 20;
		this.Down = 1;
		this.Yards = 10;
	},
	PlayGame() {  //TEMP, kind of

		++GameSim.Drive;
		if (GameSim.Drive<=24) {
	 GameSim.QuarterTime += 150;
	 if (!((GameSim.Drive-1) % 6)) {
		 ++GameSim.Quarter;
		 GameSim.QuarterTime = 0;
	 }
	 GameSim.ConstructDrive();
	 this.Plays = 0;
//	 this.ExecuteDrive();

	 //Draw football showing possession
	 this.Screen.fillStyle = GREY.LIGHT;
	 this.Screen.fillRect(420, 465, 25, 30);
	 this.Screen.fillRect(520, 465, 25, 30);
	 if (GameSim.Drive % 2)		//odd drives are visitors
		 FootballSprite.Draw(520, 490);
	 else				//even drives are home
		 FootballSprite.Draw(420, 490);

	 //Write drive and yardage info
	 this.Screen.fillRect(400, 525, 200, 75);
	 this.TextWriter.Write("Quarter:	1	2	3	4", 405, 545, "bold 12px Arial");
	 this.GraphicsTool.DrawRectangle(445+(20*GameSim.Quarter), 530, 14, 18, "black", 1);
	 this.TextWriter.Write("Clock - "+(Math.floor(GameSim.QuarterTime/60)+":"+(GameSim.QuarterTime % 60)), 405, 565, "bold 12px Arial");

	 this.Yards = 0;
	 this.RunPassPlaySequence();
		} else {  //game over
	 this.Screen.fillStyle = GREY.LIGHT;
	 this.Screen.fillRect(400, 525, 200, 75);
	 this.TextWriter.Write("FINAL", 405, 545, "bold 14px Arial");
		}
	},
	SetIForm43DEF() {  //TEMP
		this.QB = HomeOffense[0];
	},
	RunPassPlaySequence() {  //now REDUNDANT

		this.AnimationFrameHandle = requestAnimationFrame(this.RunPassPlaySequence.bind(this));

		if (this.State==PLAySTATE.PASS.OVER) {
	 if (this.Frames==120) {
		 this.Frames = 0;
		 this.ResetPassPlaySequence();
		 ++this.Plays;
		 if (this.Plays==GameSim.DrivePlays.length) {
			 cancelAnimationFrame(this.AnimationFrameHandle);
			 if (GameSim.Drive % 2)
		  GameSim.VisitorsPoints += GameSim.Points;
			 else
		  GameSim.HomePoints += GameSim.Points;
			 this.UpdateScoreboard();
			 this.PlayGame();
		 } else
			 this.State = PLAySTATE.PReSNAP;
	 } else {
		 ++this.Frames;
		 return;
	 }
		} else if (this.Frames==60)
	 this.Frames = 0;

		this.Field.Draw(400+(20*this.Yards));
//		this.DrawFramework();
		this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 450, "black", 3);

		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.SEpos.X, this.SEpos.Y, 6);	//SE
		else
	 RedSideOnGridderSprite.Draw(this.SEpos.X, this.SEpos.Y);				//SE
		RedSideOnGridderSprite.Draw(175, 180);	//LT
		RedSideOnGridderSprite.Draw(175, 190);	//LG
		RedSideOnGridderSprite.Draw(175, 200);	//C
		RedSideOnGridderSprite.Draw(175, 210);	//RG
		RedSideOnGridderSprite.Draw(175, 220);	//LT
		RedSideOnGridderSprite.Draw(this.QBx, 200, this.QBState);	//QB
		RedSideOnGridderSprite.State = 0;
		if (this.State!=PLAySTATE.PReSNAP)
	 this.DrawBall();
		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.FLpos.X, this.FLpos.Y, 6);	//FL
		else
	 RedSideOnGridderSprite.Draw(this.FLpos.X, this.FLpos.Y);				//FL
		RedSideOnGridderSprite.Draw(this.HBpos.X, this.HBpos.Y);					//HB
		RedSideOnGridderSprite.Draw(this.FBpos.X, this.FBpos.Y);					//FB
		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.TEpos.X, this.TEpos.Y, 6);	//TE
		else
	 RedSideOnGridderSprite.Draw(this.TEpos.X, this.TEpos.Y);				//TE

		if (this.State==PLAySTATE.PASS.THROWN || this.State==PLAySTATE.PReSNAP)
	 BlueSideOnGridderSprite.Draw(this.RCBpos.X, this.RCBpos.Y);				//RCB
		else
	 BlueSideOnGridderSprite.Draw(this.RCBpos.X, this.RCBpos.Y, 6);	//RCB
		BlueSideOnGridderSprite.Draw(200, 175);	//DE
		BlueSideOnGridderSprite.Draw(200, 190);	//DT
		BlueSideOnGridderSprite.Draw(200, 210);	//DT
		BlueSideOnGridderSprite.Draw(200, 125);	//DE
		BlueSideOnGridderSprite.Draw(this.WLBpos.X, this.WLBpos.Y);				//WLB
		BlueSideOnGridderSprite.Draw(this.MLBpos.X, this.MLBpos.Y);				//MLB
		BlueSideOnGridderSprite.Draw(this.SLBpos.X, this.SLBpos.Y);				//SLB
		BlueSideOnGridderSprite.Draw(this.FSpos.X, this.FSpos.Y);					//FS
		BlueSideOnGridderSprite.Draw(this.SSpos.X, this.SSpos.Y);					//SS
		if (this.State==PLAySTATE.PASS.THROWN || this.State==PLAySTATE.PReSNAP)
	 BlueSideOnGridderSprite.Draw(this.LCBpos.X, this.LCBpos.Y);				//LCB
		else
	 BlueSideOnGridderSprite.Draw(this.LCBpos.X, this.LCBpos.Y, 6);	//LCB

		//Update play
		switch (this.State) {
	 case PLAySTATE.PReSNAP:
		 if (Mouse.CheckLeftClicked()) {
			 this.PrimaryReceiver = Utilities.GetRandomNumber(3);
			 this.PassComplete = GameSim.DrivePlays[this.Plays];
			 this.State = PLAySTATE.PASS.QBdROP;
		 }
		 break;
	 case PLAySTATE.PASS.QBdROP:
		 if (this.Frames==0) {
			 this.QBState = 1;
			 this.Ball.X = 5;
			 this.Ball.Y = -16;
		 } else if (this.Frames==15) {
			 this.QBState = 0;
			 this.Ball.X = 11;
			 this.Ball.Y = -14;
		 } else if (this.Frames==30) {
			 this.QBState = 2;
			 this.Ball.X = 19;
			 this.Ball.Y = -17;
		 } else if (this.Frames==45) {
			 this.QBState = 0;
			 this.Ball.X = 11;
			 this.Ball.Y = -14;
		 }
		 --this.QBx;
		 if (this.QBx==55) {
			 this.State = PLAySTATE.PASS.QBsET;
			 this.QBState = 0;
			 this.Ball.X = 12;
			 this.Ball.Y = -13;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 this.HBpos.Y += 0.5;
		 this.FBpos.Y -= 0.5;
		 break;
	 case PLAySTATE.PASS.QBsET:
		 if (this.Frames==15) {
			 this.State = PLAySTATE.PASS.THROWING;
			 this.Ball.X = 1;
			 this.Ball.Y = -20;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 break;
	 case PLAySTATE.PASS.THROWING:
		 if (this.Frames==0)
			 this.QBState = 4;
		 else if (this.Frames==15) {
			 this.QBState = 5;
			 this.Ball.X = 12;
			 this.Ball.Y = -32;
			 this.State = PLAySTATE.PASS.THROWN;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 break;
	 case PLAySTATE.PASS.THROWN:
		 this.QBState = 0;
		 if (this.PrimaryReceiver==1) {
			 this.Ball.X += 2;
			 this.Ball.Y -= 0.89;
		 } else if (this.PrimaryReceiver==2) {
			 this.Ball.X += 2;
			 this.Ball.Y += 0.3;
		 } else {
			 this.Ball.X += 2;
			 this.Ball.Y += 1.46;
		 }
		 if (this.PassComplete) {
			 if (this.Ball.X>280)
		  this.State = PLAySTATE.PASS.CAUGHT;
		 } else
			 if (this.Ball.X>340)
		  this.State = PLAySTATE.PASS.INCOMPLETE;
		 break;
	 case PLAySTATE.PASS.CAUGHT:
		 this.TextWriter.Write("Caught", 500, 300, { FONT: "bold 16px Arial", COLOUR: "darkgreen" } );
		 this.TextWriter.Write("for " + GameSim.DrivePlays[this.Plays] + " yards", 500, 325, { FONT: "16px Arial", COLOUR: "darkgreen" } );
		 this.Yards += GameSim.DrivePlays[this.Plays];
		 this.State = PLAySTATE.PASS.OVER;
		 break;
	 case PLAySTATE.PASS.INCOMPLETE:
		 this.TextWriter.Write("Incomplete", 500, 300, { FONT: "bold 16px Arial", COLOUR: "darkgreen" } );
		 this.State = PLAySTATE.PASS.OVER;
		 break;
/*
		 if (Mouse.CheckLeftClicked())
			 if (Mouse.CanvasId==CANVAS.PRIME) {
		  this.ResetPassPlaySequence();
		  this.State = PLAySTATE.PReSNAP;
			 }
*/
/* 4, CAUGHT: 5, HANDEdOFF: 6, POSSESSION: 7 }; */
		}
		++this.Frames;
	},
	ResetPassPlaySequence() {
		this.QBx = 155;
		this.QBState = 0;
		this.FLpos.X = 155;
		this.FLpos.Y = 385;
		this.LCBpos.X = 200;
		this.LCBpos.Y = 385;
		this.SEpos.X = 175;
		this.SEpos.Y = 70;
		this.RCBpos.X = 200;
		this.RCBpos.Y = 70;
		this.HBpos = { X: 100, Y: 200 };
		this.FBpos = { X: 55, Y: 200 };
		this.TEpos = { X: 175, Y: 230 };
		this.WLBpos = { X: 300, Y: 170 };
		this.MLBpos = { X: 300, Y: 200 };
		this.SLBpos = { X: 300, Y: 230 };
		this.FSpos = { X: 400, Y: 165 };
		this.SSpos = { X: 400, Y: 235 };
	},
	DrawFramework() {

		//UNLOGGED

		//TODO: in-between plays, mini-windows will be replaced by panel showing play-clock, play called, down and yardage,
		//		timeouts left, score

		//NOTE: 4 receivers shown - 4 most open ones, so could have a 'sliding' gallery depending on who is more open, 1st or 5th one
		//TODO: have inset in top-left corner of mini-window indicating player id (WR1/TE1/HB etc)
		//TODO: alter colour of frame using red-yellow-green spectrum depending on how open
		//TODO: QB pocket in Info Box, zoomed-un view, also colour-coded, so main window frame will not have colour alterations
		this.Screen.fillStyle = GREEN.TWO;
		this.Screen.fillRect(0, 0, SCREEN.WIDTH, 150);
		this.GraphicsTool.DrawRectangle(0, 150, SCREEN.WIDTH, SIDeVIEwNFLfIELD.WIDTH, "black", 3);
		for (this.i=0;this.i<4;++this.i)		//HARD-CODED
	 this.GraphicsTool.DrawRectangle(150*this.i, 0, 150, 150, "black", 3);
	},
	SetRunPlayers() {
		var i;
		var QB, HB, FB, WR, TE, OL;
		var DL, LB, CB, S;

		//Offense
		QB = new SideViewQB();
//		QB.Set( { X: 155, Y: 350 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		QB.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[0] = QB;
		HB = new SideViewHB();
//		HB.Set( { X: 70, Y: 350 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		HB.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[1] = HB;
		FB = new SideViewFB();
//		FB.Set( { X: 90, Y: 350 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		FB.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[2] = FB;
		WR = new SideViewWR();
//		WR.Set( { X: 155, Y: 535 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		WR.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[3] = WR;
		WR = new SideViewWR();
//		WR.Set( { X: 175, Y: 220 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		WR.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[4] = WR;
		TE = new SideViewTE();
//		TE.Set( { X: 175, Y: 370 }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
		TE.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
		this.Offense[5] = TE;
		for (i=6;i<11;++i) {
	 OL = new SideViewOL();
//	 OL.Set( { X: 175, Y: 330+(10*(i-6)) }, null, null, { SPEED: 0.5 }, RedSideOnGridderSprite);
	 OL.Set( { SPEED: 0.5 }, RedSideOnGridderSprite);
	 this.Offense[i] = OL;
		}

		//Defense
		for (i=0;i<4;++i) {
	 DL = new SideViewDL();
//	 DL.Set( { X: 200, Y: 325+(15*i) }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);
	 DL.Set( { SPEED: 0.5 }, BlueSideOnGridderSprite);
	 this.Defense[i] = DL;
		}
		for (i=4;i<7;++i) {
	 LB = new SideViewLB();
//	 LB.Set( { X: 300, Y: 320+(30*(i-4)) }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);
	 LB.Set( { SPEED: 0.5 }, BlueSideOnGridderSprite);
	 this.Defense[i] = LB;
		}
/*
		for (i=7;i<11;++i) {
	 DB = new SideViewDB();
	 this.Defense[i] = DB;
		}
		this.Defense[7].Set( { X: 200, Y: 220 }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);  //RCB
		this.Defense[10].Set( { X: 200, Y: 535 }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);  //LCB
		this.Defense[8].Set( { X: 400, Y: 315 }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);  //FS
		this.Defense[9].Set( { X: 400, Y: 385 }, null, null, { SPEED: 0.5 }, BlueSideOnGridderSprite);  //SS
*/
		CB = new SideViewCB();
		CB.Set( { SPEED: 0.5 }, BlueSideOnGridderSprite);
		this.Defense[7] = CB;
		for (i=8;i<10;++i) {
	 S = new SideViewS();
	 S.Set( { SPEED: 0.5 }, BlueSideOnGridderSprite);
	 this.Defense[i] = S;
		}
		CB = new SideViewCB();
		CB.Set( { SPEED: 0.5 }, BlueSideOnGridderSprite);
		this.Defense[10] = CB;

		this.ResetRunPlay();
	},
	ResetRunPlay() {
		var i;

		for (i=0;i<SVIForm.length;++i) {
	 this.Offense[i].SetPosition( { X: SVIForm[i][0], Y: SVIForm[i][1] } );
	 this.Defense[i+11].SetPosition( { X: SVIForm[i+11][0], Y: SVIForm[i+11][1] } );
		}
	},
	DrawBall() {
		this.GraphicsTool.DrawEllipse(this.QBx+this.Ball.X, 200+this.Ball.Y, 7, 4, "brown", 0);
		this.GraphicsTool.DrawEllipse(this.QBx+this.Ball.X, 200+this.Ball.Y, 7, 4, "black", 1);
	},
	ShowStarters() {  //TEMP
		var i;

		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(0, 450, SCREEN.WIDTH, 150);
		for (i=0;i<OFFENSE.STARTERS;++i) {
	 this.TextWriter.Write(OffFormationPositions[this.HomeTeam.OffFormation][i]+":", 5, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(this.HomeTeam.OffStarters[i].Name.Last, 25, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(this.HomeTeam.OffStarters[i].Quality), 85, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(DefFormationPositions[this.HomeTeam.DefFormation][i]+":", 105, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(this.HomeTeam.DefStarters[i].Name.Last, 125, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(this.HomeTeam.DefStarters[i].Quality), 185, 450+(13*(i+1)), { FONT: "10px Arial" } );

	 this.TextWriter.Write(OffFormationPositions[this.VisitingTeam.OffFormation][i]+":", 205, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(this.VisitingTeam.OffStarters[i].Name.Last, 225, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(this.VisitingTeam.OffStarters[i].Quality), 285, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(DefFormationPositions[this.VisitingTeam.DefFormation][i]+":", 305, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(this.VisitingTeam.DefStarters[i].Name.Last, 325, 450+(13*(i+1)), { FONT: "10px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(this.VisitingTeam.DefStarters[i].Quality), 385, 450+(13*(i+1)), { FONT: "10px Arial" } );
		}
	},
	DisplayTeamsInfo() {  //TEMP
		var fnt;

		fnt = { FONT: "bold 14px Arial" };
		this.TextWriter.Write(TeamNames[this.HomeTeam.Index][0], 405, 465, fnt);
		this.TextWriter.Write(TeamNames[this.VisitingTeam.Index][0], 505, 465, fnt);
		this.UpdateScoreboard();
		fnt = { FONT: "12px Arial" };
		this.TextWriter.Write("Home Off: "+Utilities.NumberToGrade(Math.round(this.RealHomeOffRating/OFFENSE.STARTERS)), 405, 505, fnt);
		this.TextWriter.Write("Home Def: "+Utilities.NumberToGrade(Math.round(this.RealHomeDefRating/DEFENSE.STARTERS)), 405, 520, fnt);
		this.TextWriter.Write("Visitor Off: "+Utilities.NumberToGrade(Math.round(this.RealVisitorsOffRating/OFFENSE.STARTERS)), 505, 505, fnt);
		this.TextWriter.Write("Visitor Def: "+Utilities.NumberToGrade(Math.round(this.RealVisitorsDefRating/DEFENSE.STARTERS)), 505, 520, fnt);

		//TEMP - display adjusted ratings
		this.TextWriter.Write(Utilities.NumberToGrade(Math.round(this.HomeOffRating/OFFENSE.STARTERS)), 540, 580, fnt);
		this.TextWriter.Write(Utilities.NumberToGrade(Math.round(this.HomeDefRating/DEFENSE.STARTERS)), 540, 595, fnt);
		this.TextWriter.Write(Utilities.NumberToGrade(Math.round(this.VisitorsOffRating/OFFENSE.STARTERS)), 570, 580, fnt);
		this.TextWriter.Write(Utilities.NumberToGrade(Math.round(this.VisitorsDefRating/DEFENSE.STARTERS)), 570, 595, fnt);
	},
	UpdateScoreboard() {

		//Score
		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(400, 475, 200, 20);
		this.TextWriter.Write(this.Score.Home, 480, 490, { FONT: "bold 14px Arial" } );
		this.TextWriter.Write(this.Score.Visitors, 580, 490, { FONT: "bold 14px Arial" } );
		if (this.PlayOff===this.HomeTeam.OffStarters)
	 FootballSprite.Draw(420, 490);
		else
	 FootballSprite.Draw(520, 490);

		//Progress
		this.Screen.fillStyle = GREY.LIGHT;
		this.Screen.fillRect(400, 525, 200, 75);
		this.TextWriter.Write("Quarter:	1	2	3	4", 405, 545, "bold 12px Arial");
		this.GraphicsTool.DrawRectangle(445+(20*this.Quarter), 530, 14, 18, "black", 1);
		this.TextWriter.Write("Clock - "+(Math.floor(this.Time/60)+":"+(this.Time % 60)), 405, 565, "bold 12px Arial");
		this.TextWriter.Write("Down: "+this.Down+" Distance: "+this.Yards, 405, 585, { FONT: "12px Arial" } );
	},
	RunPlay() {  //NOTE: this is essentially a re-write of .RunPassPlaySequence() for .Play()

		//UNLOGGED - shouldn't be logged since will replace .RunPassPlaySequence()

		this.AnimationFrameHandle = requestAnimationFrame(this.RunPlay.bind(this));

		if (this.State!=PLAySTATE.PASS.OVER) {
	 this.Field.Draw(20*this.LineOfScrimmage);
	 this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, 450, "black", 3);
	 this.DrawSprites();
	 this.UpdatePlay();
		} else {
	 ++this.Frames;
	 if (this.Frames==120) {
		 cancelAnimationFrame(this.AnimationFrameHandle);
		 this.State = PLAySTATE.PReSNAP;
		 this.Play();
	 }
		}
	},
	DrawSprites() {  //TODO: becomes loggable once .RunPassPlaySequence() is discarded
		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.SEpos.X, this.SEpos.Y, 6);	//SE
		else
	 RedSideOnGridderSprite.Draw(this.SEpos.X, this.SEpos.Y);				//SE
		RedSideOnGridderSprite.Draw(175, 180);	//LT
		RedSideOnGridderSprite.Draw(175, 190);	//LG
		RedSideOnGridderSprite.Draw(175, 200);	//C
		RedSideOnGridderSprite.Draw(175, 210);	//RG
		RedSideOnGridderSprite.Draw(175, 220);	//LT
		RedSideOnGridderSprite.Draw(this.QBx, 200, this.QBState);	//QB
		RedSideOnGridderSprite.State = 0;
		if (this.State!=PLAySTATE.PReSNAP)
	 this.DrawBall();
		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.FLpos.X, this.FLpos.Y, 6);	//FL
		else
	 RedSideOnGridderSprite.Draw(this.FLpos.X, this.FLpos.Y);				//FL
		RedSideOnGridderSprite.Draw(this.HBpos.X, this.HBpos.Y);					//HB
		RedSideOnGridderSprite.Draw(this.FBpos.X, this.FBpos.Y);					//FB
		if (this.State==PLAySTATE.PASS.THROWN)
	 RedSideOnGridderSprite.Draw(this.TEpos.X, this.TEpos.Y, 6);	//TE
		else
	 RedSideOnGridderSprite.Draw(this.TEpos.X, this.TEpos.Y);				//TE

		if (this.State==PLAySTATE.PASS.THROWN || this.State==PLAySTATE.PReSNAP)
	 BlueSideOnGridderSprite.Draw(this.RCBpos.X, this.RCBpos.Y);				//RCB
		else
	 BlueSideOnGridderSprite.Draw(this.RCBpos.X, this.RCBpos.Y, 6);	//RCB
		BlueSideOnGridderSprite.Draw(200, 175);	//DE
		BlueSideOnGridderSprite.Draw(200, 190);	//DT
		BlueSideOnGridderSprite.Draw(200, 210);	//DT
		BlueSideOnGridderSprite.Draw(200, 125);	//DE
		BlueSideOnGridderSprite.Draw(this.WLBpos.X, this.WLBpos.Y);				//WLB
		BlueSideOnGridderSprite.Draw(this.MLBpos.X, this.MLBpos.Y);				//MLB
		BlueSideOnGridderSprite.Draw(this.SLBpos.X, this.SLBpos.Y);				//SLB
		BlueSideOnGridderSprite.Draw(this.FSpos.X, this.FSpos.Y);					//FS
		BlueSideOnGridderSprite.Draw(this.SSpos.X, this.SSpos.Y);					//SS
		if (this.State==PLAySTATE.PASS.THROWN || this.State==PLAySTATE.PReSNAP)
	 BlueSideOnGridderSprite.Draw(this.LCBpos.X, this.LCBpos.Y);				//LCB
		else
	 BlueSideOnGridderSprite.Draw(this.LCBpos.X, this.LCBpos.Y, 6);	//LCB
	},
	UpdatePlay() {  //TODO: becomes loggable once .RunPassPlaySequence() is discarded

		switch (this.State) {
	 case PLAySTATE.PReSNAP:
//		 if (Mouse.CheckLeftClicked()) {
			 this.PrimaryReceiver = Utilities.GetRandomNumber(3);
			 this.State = PLAySTATE.PASS.QBdROP;
			 this.Frames = 0;
//		 }
		 break;
	 case PLAySTATE.PASS.QBdROP:
		 if (this.Frames==0) {
			 this.QBState = 1;
			 this.Ball.X = 5;
			 this.Ball.Y = -16;
		 } else if (this.Frames==15) {
			 this.QBState = 0;
			 this.Ball.X = 11;
			 this.Ball.Y = -14;
		 } else if (this.Frames==30) {
			 this.QBState = 2;
			 this.Ball.X = 19;
			 this.Ball.Y = -17;
		 } else if (this.Frames==45) {
			 this.QBState = 0;
			 this.Ball.X = 11;
			 this.Ball.Y = -14;
		 }
		 --this.QBx;
		 if (this.QBx==55) {
			 this.State = PLAySTATE.PASS.QBsET;
			 this.Frames = 0;
			 this.QBState = 0;
			 this.Ball.X = 12;
			 this.Ball.Y = -13;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 this.HBpos.Y += 0.5;
		 this.FBpos.Y -= 0.5;
		 break;
	 case PLAySTATE.PASS.QBsET:
		 if (this.Frames==15) {
			 this.State = PLAySTATE.PASS.THROWING;
			 this.Frames = 0;
			 this.Ball.X = 1;
			 this.Ball.Y = -20;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 break;
	 case PLAySTATE.PASS.THROWING:
		 if (this.Frames==0)
			 this.QBState = 4;
		 else if (this.Frames==15) {
			 this.QBState = 5;
			 this.Ball.X = 12;
			 this.Ball.Y = -32;
			 this.State = PLAySTATE.PASS.THROWN;
			 this.Frames = 0;
		 }
		 ++this.SEpos.X;
		 ++this.RCBpos.X;
		 ++this.FLpos.X;
		 ++this.LCBpos.X;
		 ++this.TEpos.X;
		 break;
	 case PLAySTATE.PASS.THROWN:
		 this.QBState = 0;
		 if (this.PrimaryReceiver==1) {
			 this.Ball.X += 2;
			 this.Ball.Y -= 0.89;
		 } else if (this.PrimaryReceiver==2) {
			 this.Ball.X += 2;
			 this.Ball.Y += 0.3;
		 } else {
			 this.Ball.X += 2;
			 this.Ball.Y += 1.46;
		 }
		 if (this.PassComplete) {
			 if (this.Ball.X>280)
		  this.State = PLAySTATE.PASS.CAUGHT;
		 } else
			 if (this.Ball.X>340)
		  this.State = PLAySTATE.PASS.INCOMPLETE;
		 break;
	 case PLAySTATE.PASS.CAUGHT:
		 this.TextWriter.Write("Caught", 500, 300, { FONT: "bold 16px Arial", COLOUR: "darkgreen" } );
		 this.TextWriter.Write("for " + this.PassYards + " yards", 500, 325, { FONT: "16px Arial", COLOUR: "darkgreen" } );
		 this.EndPlay();
		 break;
	 case PLAySTATE.PASS.INCOMPLETE:
		 this.TextWriter.Write("Incomplete", 500, 300, { FONT: "bold 16px Arial", COLOUR: "darkgreen" } );
		 this.EndPlay();
		 break;
/*
	 case PLAySTATE.PASS.OVER:
		 this.State = PLAySTATE.PReSNAP;
		 this.Play();
		 return;
*/
		}
		++this.Frames;
	 if (this.Frames==60)		//meant for QB animation which rotates every 60 secs
		 this.Frames = 0;
	},
	EndPlay() {
		this.State = PLAySTATE.PASS.OVER;
		this.Frames = 0;
		this.ResetPassPlaySequence();
		this.UpdateDrive();
	},
	PostMatchUpdate() {
		var iTeams, aMatchUps;			//both arrays are of size 30
		var nHomeQuality, nVisitorsQuality;

		//Update record of teams in match
		if (this.Score.Home>this.Score.Visitors) {
	 ++this.HomeTeam.Record.W;
	 ++this.VisitingTeam.Record.L;
		} else if (this.Score.Home<this.Score.Visitors) {
	 ++this.HomeTeam.Record.L;
	 ++this.VisitingTeam.Record.W;
		} else {
	 ++this.HomeTeam.Record.T;
	 ++this.VisitingTeam.Record.T;
		}
		this.HomeTeam.Record.Scored += this.Score.Home;
		this.HomeTeam.Record.Conceded += this.Score.Visitors;
		this.AwayTeam.Record.Scored += this.Score.Visitors;
		this.AwayTeam.Record.Conceded += this.Score.Home;

		//Generate league match-ups
		iTeams = new Array();
		for (indx=0;indx<LEAGUE.TEAMS;++indx)
	 if (indx!=this.HomeTeam.Index && indx!=this.VisitingTeam.Index)
		 iTeams.push(indx);
		aMatchUps = new Array(LEAGUE.TEAMS-2);
		this.Randomizer.GetUniqueIndices(aMatchUps, LEAGUE.TEAMS-2, LEAGUE.TEAMS-2);

		//Simulate remaining games and update records
		for (indx=0;indx<aMatchUps.length;indx+=2) {
	 nHomeQuality = Teams[iTeams[aMatchUps[indx]]].Roster.GetCumulativeQuality();
	 nVisitorsQuality = Teams[iTeams[aMatchUps[indx+1]]].Roster.GetCumulativeQuality();
	 num = this.GetWinningTeam(nHomeQuality, nVisitorsQuality);
	 if (num==0) {
		 ++Teams[iTeams[aMatchUps[indx]]].Record.W;
		 ++Teams[iTeams[aMatchUps[indx+1]]].Record.L;
	 } else if (num==1) {
		 ++Teams[iTeams[aMatchUps[indx]]].Record.L;
		 ++Teams[iTeams[aMatchUps[indx+1]]].Record.W;
	 } else {
		 ++Teams[iTeams[aMatchUps[indx]]].Record.T;
		 ++Teams[iTeams[aMatchUps[indx+1]]].Record.T;
	 }
		}

		Teams.forEach(function(team){team.UpdatePostMatch();});
		++League.GamesPlayed;
		if (League.GamesPlayed==SEASON.GAMES) {
	 ++League.Season;
	 League.GamesPlayed = GAMeSTATE.ENdSEASON;
	 Teams.forEach(function(team){team.Roster.EraseInjuries();});
		}

		this.AwaitScoreBoardPrompt();
	},
	GetWinningTeam(hTeam, vTeam) {
		var hWins, vWins;

		hWins = 0;
		vWins = 0;
		for (this.i=0;this.i<144;++this.i)
			if (this.Randomizer.GetWinner(hTeam, vTeam, INVERTED)==0)
		 ++hWins;
			else
		 ++vWins;

		if (hWins>vWins)
			return (0);
		else if (vWins>hWins)
			return (1);
		else
			return (2);
	},
	AwaitScoreBoardPrompt() {

		this.AnimationFrameHandle = requestAnimationFrame(this.AwaitScoreBoardPrompt.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.ShowScore();
		}
	},
	ShowScore() {

		//UNLOGGED - TEMP

		var scoreboard = new ZFLScoreboard();
		scoreboard.Set(this.Screen, this.TextWriter, this.Randomizer);
		scoreboard.SetTeams(this.HomeTeam, this.VisitingTeam);
		scoreboard.SetGame(this);
		scoreboard.ShowFinal();
		League.Dump();

		this.PollTeamView();
	},
	PollTeamView() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollTeamView.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 TeamView.Open();
	 TeamView.Update();
		}
	}
};
