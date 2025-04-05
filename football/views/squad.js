/*
 *		TODO: don't need .X in slots since there is only 1 column
 *		TODO: this should be called a sub-view 
 */
//---------------------------------------------------
//---------- FOOTBALL SQUAD VIEW --------------------
var FootballSquadView = function() {
	var Team, Squad;
	var PositionButtons;   //UNLOGGED

	var Player, PlayerSelected;
	var SlotClicked;
	var Indent;
	var Slots, SelectedSlot, SlotRect, SlotHeight;	//.SelectedSlot is an index

	var PlayersSold;	//maybe TEMP
	var TeamIndices;
	var TransferTargets;
	var Player;
	var NumberOfTargets;

	var i, num, colour;
};
FootballSquadView.prototype = new GenieNestedView();
FootballSquadView.prototype.Set = function(cnvs, specs, pView) {
	GenieNestedView.prototype.Set.call(this, cnvs, specs, pView);

	//TEMP
	this.InfoBox = FootieScape.InfoBox;

	if (Game.CheckMobile()) {
		this.Indent = 15;
		this.SlotHeight = 14;
	} else {
		this.Indent = 0;
		this.SlotHeight = 15;
	}
	this.SlotRect = { L: -1, T: -1, W: 380, H: this.SlotHeight };		//used to check for slot clicked
	this.SelectedSlot = 0;

	//TODO: see how many of these are needed
		this.PlayersSold = new Array();
		this.TransferTargets = new Array(10);
		this.TeamIndices = new Array(LEAGUE.TEAMS);
};
FootballSquadView.prototype.SetControls = function() {
	var i;
	var sx;
	var specs;

	this.PositionButtons = new Array(this.Specs.BUTTON.POSITION.COUNT);
	for (i=0;i<this.Specs.BUTTON.POSITION.COUNT;++i) {
		if (Game.CheckMobile()) {
			this.PositionButtons[i] = new ImageButton();
			sx = this.Specs.BUTTON.POSITION.SX + ((15+this.Specs.BUTTON.POSITION.O)*i);
			specs = { W: this.Specs.BUTTON.POSITION.W, H: this.Specs.BUTTON.POSITION.H, SX: sx, SY: this.Specs.BUTTON.POSITION.SY,
						 LW: this.Specs.BUTTON.POSITION.LW, STYLE: this.Specs.BUTTON.POSITION.STYLE };
			this.PositionButtons[i].Set(this.Canvas, specs, ImageManager.Pics[IMAGeINDEX.MOBILE]);
			this.PositionButtons[i].SetCornersPic(RaisedCornerImages);
		} else {
		}
		this.Controls.push(this.PositionButtons[i]);
	}
};
FootballSquadView.prototype.ShowControls = function() {  //UNLOGGED - eventually REDUNDANT

	if (Game.CheckMobile())
		this.PositionButtons.forEach(function(btn) {btn.Show();});
};
FootballSquadView.prototype.SetSquad = function(sqd) {

	this.Squad = sqd;
	this.Slots = ArrayUtils.Create(this.Squad.Players.length, function() { var X, Y, Player; } );
};
FootballSquadView.prototype.Open = function() {  //at the moment, REDUNDANT
	GenieNestedView.prototype.Open.call(this);

		//TEST
//		this.GraphicsTool.DrawSection(410, 410, 350, 150, "Transfer List", "black", null, this.TextWriter);
//		this.DumpSquad();
};
FootballSquadView.prototype.Update = function() {  //LOGGED, unused as of now, but may be needed later

//		if (Mouse.CheckLeftClicked()) {  //TODO: will change - method only called on Mouse click, so don't have to check for click
//		}
};
FootballSquadView.prototype.Draw = function() {  //UNLOGGED

	this.DrawSections();
	this.DisplayPlayers();
	if (!Game.CheckMobile())
		this.DisplayLegends();
};
FootballSquadView.prototype.SelectSlot = function(table, sNumber) {  //s- slot; table can be SQUAD, YOUTH, TRANSFErLISTED etc . . . UNLOGGED
};
FootballSquadView.prototype.DisplayTeamInfo = function() {

		//TEMP
		var i;
		var aRatings;
		var grade;

		this.InfoBox.fillStyle = BLUE.POWDER;
		this.InfoBox.fillRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);

		this.TextWriter.SwitchContext(CANVAS.ZOOM);

		this.TextWriter.Write(ClubNames[0]+" "+ClubNickNames[0], 5, 20, { FONT: "12px Arial", COLOUR: "black" } );
		aRatings = new Array(LEAGUE.TEAMS);
		for (i=0;i<LEAGUE.TEAMS;++i)
			aRatings[i] = { Index: i, Squad: Teams[i].Squad.GetRating() };
		grade = Utils.NumberToGrade(Math.round(aRatings[0].Squad));
		this.TextWriter.Write("Squad Quality: "+grade, 5, 40);
		aRatings.sort(function(a, b) {return a.Squad-b.Squad;});
		for (i=0;i<LEAGUE.TEAMS;++i)
			if (aRatings[i].Index==0)
				break;
		this.TextWriter.Write("League Ranking: " + (i+1), 5, 55);
		grade = 0;
		for (i=0;i<LEAGUE.TEAMS;++i)
			grade += aRatings[i].Squad;
		grade = Utils.NumberToGrade(Math.round(grade/LEAGUE.TEAMS));
		this.TextWriter.Write("League Average: "+grade, 5, 70);

		this.TextWriter.Write("Wage Bill: " + Teams[0].Squad.GetWageBill(), 5, 85);

		this.SimSeason();

		this.TextWriter.RestoreContext();

/*
		quality = 0;
		for (i=0;i<LEAGUE.TEAMS;++i)
	 quality += Teams[i].Squad.GetWageBill();
		this.TextWriter.Write("Average Wage Bill = " + Math.round(quality/LEAGUE.TEAMS), 160, 560);
*/
};
FootballSquadView.prototype.SimSeason = function() {
		var i, j;
		var hRtng, aRtng;
		var aPnts, aRtngs;

		//UNLOGGED - totally TEMP

		this.Randomizer.GenerateSeeds();

		aRtngs = new Array(LEAGUE.TEAMS);
		aPnts = Utils.CreateArray(LEAGUE.TEAMS, function() {var Index, Points;} );
		for (i=0;i<LEAGUE.TEAMS;++i) {
			aRtngs[i] = Teams[i].Squad.GetRating();
			aPnts[i].Index = i;
			aPnts[i].Points = 0;
		}

		for (i=0;i<LEAGUE.TEAMS;++i)
			for (j=0;j<LEAGUE.TEAMS;++j) {
				if (i==j)
					continue;
				hRtng = Math.round((100*aRtngs[i])-500);
				aRtng = Math.round((100*aRtngs[j])-500);
				if (this.Randomizer.GetWinner(hRtng, aRtng, INVERTED)==0)
					++aPnts[i].Points;
				else
					++aPnts[j].Points;
			}

		aPnts.sort(function(a,b) {return b.Points-a.Points;});
		for (i=0;i<aPnts.length;++i)
			if (aPnts[i].Index==0)
				break;
		this.TextWriter.Write("League Position: " + (i+1), 5, 100);
};
FootballSquadView.prototype.DisplayYouthTeam = function() {
		var i;

		//LOGGED . . . can be UNLOGGED when SquadView is done

		this.Context.clearRect(200, 0, 200, SCREEN.HEIGHT);		//HARD-CODED
		for (i=0;i<this.Team.YouthTeam.Players.length;++i) {
	 this.TextWriter.Write(this.Team.YouthTeam.Players[i].Name.Last, 200, (20*(i+1))+5);
	 this.TextWriter.Write(Utils.NumberToGrade(this.Team.YouthTeam.Players[i].Quality), 350, (20*(i+1))+5);
		}
	},
FootballSquadView.prototype.OperateFormationSelection = function() {

		//LOGGED

		this.AnimationFrameHandle = requestAnimationFrame(this.OperateFormationSelection.bind(this));

//		this.Context.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.Context.clearRect(0, 0, 400, SCREEN.HEIGHT);
		this.Context.clearRect(400, 0, 400, 400);

		//Formation/team selection
		Pitch.DrawPatch(400, 20, 0, 200, 360, 340);	//HARD-CODED
		this.GraphicsTool.DrawRectangle(400, 20, 360, 340, "black", 4);
		this.DisplayPlayersInfo();

		if (Mouse.CheckLeftClicked())
	 if (SpaceUtils.CheckPointInBox(Mouse.GetClickCoordinates(), { L: 10, T: 0, W: 350, H: SCREEN.HEIGHT } ))
		 this.PlayerSelected = this.Squad.Players[Math.floor((Mouse.ClickY-5)/20)];
	 else {
		 //check if formation view is clicked on, process accordingly (attach player to position)
	 }

		if (SellButton.CheckClicked()) {
	 this.PlayersSold.push(this.PlayerSelected);
	 TeamSelected.Budget += this.PlayerSelected.GetPrice();
	 this.Squad.Players[this.PlayerSelected.Index] = null;
		}
		this.TextWriter.Write("Budget: "+TeamSelected.Budget, 10, 600);

		if (BuyButton.CheckClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.AwaitSlotClick();
		}

		//calculate gaps between defenders based on their number in formation, same with M's and A's, draw
		//for now, can click on position on formation, then on player to put him there
};
FootballSquadView.prototype.AwaitSlotClick = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.AwaitSlotClick.bind(this));

		if (Mouse.CheckLeftClicked()) {
	 cancelAnimationFrame(this.AnimationFrameHandle);
	 this.SlotClicked = Math.floor((Mouse.ClickY-5)/20);
	 this.Randomizer.GetUniqueIndices(this.TeamIndices, LEAGUE.TEAMS, LEAGUE.TEAMS);
	 this.NumberOfTargets = 0;
	 for (this.i=0;this.i<LEAGUE.TEAMS;++this.i) {
		 if (this.TeamIndices[this.i]==0)
			 continue;
		 this.Player = Teams[this.TeamIndices[this.i]].Squad.Players[this.SlotClicked];
		 if (this.Player.GetPrice()<=TeamSelected.Budget) {
			 this.TransferTargets[this.NumberOfTargets] = this.Player;
			 this.TextWriter.Write(ClubNames[this.TeamIndices[this.i]], 400, 400+(20*this.NumberOfTargets));

			 //TODO: below to be done by modified WritePlayerInfo

			 this.TextWriter.Write(this.Player.Name.Last, 510, 400+(20*this.NumberOfTargets));
			 this.TextWriter.Write(this.Player.Age, 610, 400+(20*this.NumberOfTargets));
			 this.TextWriter.Write(Utils.NumberToGrade(this.Player.Quality), 640, 400+(20*this.NumberOfTargets));
			 this.TextWriter.Write(this.Player.GetPrice(), 670, 400+(20*this.NumberOfTargets));
			 ++this.NumberOfTargets;
			 if (this.NumberOfTargets==10)
		  break;
		 }
	 }

	 this.PollTargetSelection();
		}
};
FootballSquadView.prototype.PollTargetSelection = function() {

		this.AnimationFrameHandle = requestAnimationFrame(this.PollTargetSelection.bind(this));

		if (Mouse.CheckLeftClicked()) {
			cancelAnimationFrame(this.AnimationFrameHandle);
			this.SlotClicked = Math.floor((Mouse.ClickY-380)/20);
			this.Player = this.TransferTargets[this.SlotClicked];
			TeamSelected.Squad.Players[this.Player.Index] = this.Player;
			this.DisplayPlayersInfo();
		}
};
FootballSquadView.prototype.PromoteYouthPlayer = function() {
		//if player is going to be in F- to F+ range, it will be really hard to play them and improve them
		//maybe should have cup competitions mid-week that can be used to improve young players, every week, but elimination should
		// be costly; sim only, like USM98, but that would either rule out substitutions, or some script can be set depending on
		// score/situations with priority ratings given to the players
};
/* NOTE: everything below stays, a lot of above could go */
FootballSquadView.prototype.DrawSections = function() {	//NOTE: this also sets slot positions
	var i, j;
	var y;
	var nSlot;

	y = 0;
	nSlot = 0;
	for (i=0;i<SQUAD.GROUPS;++i) {
		if (Game.CheckMobile())
			y += 2;
		else
			y += 25;
		this.DrawBasReliefSection(y, this.Squad.PositionGroups[i].length, i);
		if (Game.CheckMobile())
			y += 3;
		else
			y += 10;
		for (j=0;j<this.Squad.PositionGroups[i].length;++j) {
			this.Slots[nSlot].X = 10;
			this.Slots[nSlot].Y = y;
			this.Slots[nSlot].Player = this.Squad.PositionGroups[i][j];
//			this.DisplayPlayerInfo(this.Slots[nSlot].Player);
			++nSlot;
			y += this.SlotHeight;
		}
//		y += 10;
	}
};
FootballSquadView.prototype.DrawBasReliefSection = function(y, nSlots, iBtn) {
	//NOTE: 25px(2px) top, bottom and between sections, 10px top and bottom within sections, so 15px(/14px-mobile) per player (395/25, 20px free)

	//Divider box
	if (Game.CheckMobile()) {
		this.GraphicsTool.DrawRectangle(this.Indent+5, y, 390-this.Indent, (nSlots*this.SlotHeight)+3, GREY.MEDIUM, 1);
		this.GraphicsTool.DrawRectangle(this.Indent+5+1, y+1, 390-this.Indent, (nSlots*this.SlotHeight)+3, "white", 1);
	} else {
		this.GraphicsTool.DrawRectangle(this.Indent+5, y, 390-this.Indent, (nSlots*this.SlotHeight)+10, GREY.MEDIUM, 1);
		this.GraphicsTool.DrawRectangle(this.Indent+5+1, y+1, 390-this.Indent, (nSlots*this.SlotHeight)+10, "white", 1);
	}

		//Button
	if (Game.CheckMobile()) {					//TODO: phase out position buttons
		this.PositionButtons[iBtn].Specs.L = 0;
		this.PositionButtons[iBtn].Specs.T = y;
	} else {
		PositionButtons[iBtn].Specs.L = 15;
		PositionButtons[iBtn].Specs.T = y - 10;
	}
	if (!Game.CheckMobile())
		PositionButtons[iBtn].Show();
};
FootballSquadView.prototype.DisplayPlayers = function() {

	for (this.i=0;this.i<this.Squad.Players.length;++this.i) {
		this.Player = this.Slots[this.i].Player;
		this.DisplayPlayerInfo(this.Slots[this.i].X+5, this.Slots[this.i].Y+10, this.i==this.SelectedSlot);
		if (this.i==this.SelectedSlot)
			this.ParentView.InfoView.Draw();
	}
};
FootballSquadView.prototype.DisplayPlayerInfo = function(x, y, bSlctd) {

		//Determine colour
		if (this.Player.Quality<15)
			this.colour = SquadColours[Math.floor(this.Player.Quality/3)];
		else
			this.colour = "black";
		if (bSlctd) {
			if (Game.CheckMobile())
				this.GraphicsTool.DrawRectangle(10+this.Indent, y-11, 380-this.Indent, 15, this.colour, 0);
			else
				this.GraphicsTool.DrawRectangle(10, y-11, 380, 16, this.colour, 0);
			this.colour = (this.Player.Quality>GRADE.Dminus) ? "black" : "white";
		}

		if (Game.CheckMobile())
			x += this.Indent;

		//Name, age and position
		if (this.Player.CheckStricken())
			this.TextWriter.Write("††", x, y, { FONT: "12px Arial", COLOUR: this.colour } );
		if (this.Player.CheckInjured())
			this.TextWriter.Write(" †", x, y, { FONT: "12px Arial", COLOUR: this.colour } );
		this.TextWriter.Write(this.Player.Name.GetFullName(), x+10, y, { FONT: "12px Arial", COLOUR: this.colour, STYLE: FONT.STYLE.BOLD } );
		this.TextWriter.Write(this.Player.Age, x+130, y, { FONT: "12px Arial", COLOUR: this.colour } );
		if (!this.Player.Position)
			this.TextWriter.Write("G", x+153, y, { FONT: "12px Arial", COLOUR: this.colour } );
		else
			this.TextWriter.Write(Positions[this.Player.Position], x+153, y, { FONT: "12px Arial", COLOUR: this.colour } );
 
		//Ratings
		this.TextWriter.Write(Utils.NumberToGrade(this.Player.Quality), x+191, y, { FONT: "12px Arial", COLOUR: this.colour } );
		if (this.Player.Age<=FOOTBALLER.AGE.EXPERIENCED)
			ArrowImages.DrawPatchNumber(0, x+216, y-10);
		else if (this.Player.Age>FOOTBALLER.AGE.SEASONED)
			ArrowImages.DrawPatchNumber(1, x+216, y-10);
		this.TextWriter.Write(this.Player.Potential, x+223, y, { FONT: "12px Arial", COLOUR: this.colour } );
		this.TextWriter.Write("+"+this.Player.Variation, x+247, y, { FONT: "12px Arial", COLOUR: this.colour } );

		//Price and wages
		this.num = this.Player.GetPrice();
		/* REDUNDANT
		if (this.num>=1000)
			this.num = (Math.round(this.num/100)/10)+"M";
		else if (this.num>=100)
			this.num = (Math.round(this.num/10)*10)+"K";
		else
			this.num = Math.round(this.num)+"K";
		*/
		this.num = Utils.FormatMoney(this.num);
		this.TextWriter.Write(this.num, x+269, y, { FONT: "12px Arial", COLOUR: this.colour } );
		this.num = this.Player.GetWages();
		this.num = Utils.FormatMoney(this.num);
		if (this.num.length==2)
			this.TextWriter.Write(this.num, x+324, y, { FONT: "12px Arial", COLOUR: this.colour } );
		else
			this.TextWriter.Write(this.num, x+316, y, { FONT: "12px Arial", COLOUR: this.colour } );

		//Symbols
		if (this.Player.Type)
			TypeSymbolImages.DrawPatchNumber(this.Player.Type-1, x-5, y-10);
		if (this.Player.Designation)
			DesignationSymbolImages.DrawPatchNumber(this.Player.Designation-1, x+360-this.Indent, y-10);

		if (this.PlayerSelected===this.Player)
			this.GraphicsTool.DrawRectangle(5, (y-20)+6, x+330, 20, "black", 3);
};
FootballSquadView.prototype.DisplayLegends = function() {
		var i;
		var x, y;

		this.Context.fillStyle = "rgb(63,191,223)";
		this.Context.fillRect(0, 547, 400, 53);

		for (i=0;i<TypeSymbolImages.Specs.C;++i) {
			x = 5 + (90*Math.floor(i/4));
			y = 548 + (13*(i % 4));
			TypeSymbolImages.DrawPatchNumber(i, x, y);
			this.TextWriter.Write(PlayerTypes[i+1], x+15, y+10, { FONT: "12px Arial", COLOUR: "white" } );
		}
		for (i=0;i<DesignationSymbolImages.Specs.C;++i) {
			x = 205 + (90*Math.floor(i/4));
			y = 548 + (13*(i % 4));
			DesignationSymbolImages.DrawPatchNumber(i, x, y);
			this.TextWriter.Write(Designations[i+1], x+15, y+10, { FONT: "12px Arial", COLOUR: "white" } );
		}
};
FootballSquadView.prototype.Clicked = function() {
	var i;

	//UNLOGGED - log when ::Update is fleshed out, otherwise it takes ::Update's log

	for (i=0;i<this.Squad.Players.length;++i) {
		if (i==this.SelectedSlot)
			continue;
		this.SlotRect.L = this.Slots[i].X;
		this.SlotRect.T = this.Slots[i].Y;
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.SlotRect)) {
			this.SelectedSlot = i;
			this.Context.fillStyle = this.Specs.COLOUR;
			this.Context.fillRect(20, 0, SCREEN.WIDTH-20, SCREEN.HEIGHT);
			this.DrawSections();
			this.DisplayPlayers();
			this.ParentView.InfoView.SetFootballer(this.Slots[this.SelectedSlot].Player);
			this.ParentView.InfoView.ColourBackground();
			this.ParentView.InfoView.Draw();
		}
	}
};
