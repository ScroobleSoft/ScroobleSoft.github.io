
//-----------------------------------------------
//---------- BASIC MINI GAME --------------------
var BasicMiniGame = function() {
   var Screen;
   var TextWriter;
   var TeamSelected, Opponent;
   var TeamIndex;
   var SelectedPlayer;
   var TempTeam;
   var TeamNeeds;
};
BasicMiniGame.prototype = {
   Set(cntxt, team) {
      this.Screen = cntxt;
      this.TeamSelected = team;
      this.Opponent = Utilities.GetRandomNumber(LEAGUE.TEAMS, STARtAtZERO);
      this.TextWriter = new GenieText();
      this.TextWriter.Set(this.Screen);
      Mouse.LeftClicked = false;

      Teams = Utilities.CreateArray(LEAGUE.TEAMS, FootballSquad);
      Teams.forEach(function(team) {team.Set();});
      Teams.forEach(function(team) {team.Evaluate();});
      this.TempTeam = new FootballTeam();
      this.TempTeam.Set();
      this.TeamNeeds = Utilities.CreateArray(LEAGUE.TEAMS, TeamTransferNeeds);

      this.Screen.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
      this.TextWriter.Write("Budget:", 20, 540, { COLOUR: "blue" } );
      this.TextWriter.Write(this.TempTeam.Budget, 65, 540);
      SellButton.Enabled = true;
      SellButton.Draw();
      BuyButton.Enabled = true;
      BuyButton.Draw();
   },
   DisplaySquad(squad, opponent) {
      var i;
      var xOffset;

      if (opponent) {
	 xOffset = 400;
	 this.Screen.clearRect(400, 0, 300, 510);
      } else
	 xOffset = 0;
      for (i=0;i<squad.length;++i) {
	 if (this.PlayerSelected==i) {
//	    this.Screen.fillStyle = "red";
	    this.TextWriter.Write(squad[i].Name.GetFullName(), xOffset+10, 20*(i+1), { COLOUR: "red" } );
//	    this.Screen.fillStyle = "black";
	 } else
	    this.TextWriter.Write(squad[i].Name.GetFullName(), xOffset+10, 20*(i+1));
	 this.TextWriter.Write(squad[i].Age, xOffset+150, 20*(i+1));
	 this.TextWriter.Write(squad[i].GetPosition(), xOffset+170, 20*(i+1));
	 this.TextWriter.Write(squad[i].Quality, xOffset+210, 20*(i+1));
	 this.TextWriter.Write(squad[i].GetPrice(), xOffset+230, 20*(i+1));
      }
   },
   DisplayTeams() {
      var i;

      for (i=0;i<Teams.length;++i)
	 if (this.Opponent==i)
	    this.TextWriter.Write(ClubNames[i], 300, 20*(i+1), { COLOUR: "green" } );
	 else
	    this.TextWriter.Write(ClubNames[i], 300, 20*(i+1));
   },
   CheckTeamSelected() {
      if (Mouse.ClickX>300 && Mouse.ClickX<400)
	 this.Opponent = Math.floor(Mouse.ClickY/20);
      this.DisplaySquad(Teams[this.Opponent].Players, true);
   },
   CheckPlayerSelected() {
      if (Mouse.ClickX<200 && Mouse.ClickY<510)
	 this.PlayerSelected = Math.floor(Mouse.ClickY/20);
   },
   SellPlayer() {
      var i;
      var pos;
      var player;

      //LOGGED

      this.TempTeam.Budget += Teams[this.TeamSelected].Players[this.PlayerSelected].GetPrice();
      pos = Math.round((this.PlayerSelected.Position - (this.PlayerSelected.Position % 10))/10);
      for (i=0;i<LEAGUE.TEAMS;++i) {
	 this.TeamNeeds[i].TeamIndex = i;
	 this.TeamNeeds[i].TeamNeeds = Teams[i].Needs[pos];
      }
      this.TeamNeeds.sort(function(team1, team2) {return (team1.TeamNeeds-team2.TeamNeeds);});
      player = Teams[this.TeamSelected].Players.splice(this.PlayerSelected, 1);
      Teams[this.TeamNeeds[0].TeamIndex].Players.push(player);
      //NOTE: in the future will call ::AddPlayer in FootballSquad
   },
   Play() {

      this.AnimationFrameHandle = requestAnimationFrame(this.Play.bind(this));

      this.Screen.clearRect(0, 0, 400, 510);

      if (Mouse.CheckLeftClicked()) {
	 this.CheckTeamSelected();
	 this.CheckPlayerSelected();
      }
      this.DisplaySquad(Teams[this.TeamSelected].Players);
      this.DisplayTeams();

      //TODO: check Buy/Sell buttons
      if (SellButton.CheckClicked() && this.PlayerSelected)
	 this.SellPlayer();
   }
};

var TeamTransferNeeds = function() {
   var TeamIndex;
   var TeamNeeds;
};
