
//----------------------------------------------
//---------- ZFL SCOREBOARD --------------------
var ZFLScoreboard = function() {
   var Screen;
   var TextWriter;
   var Randomizer;
   var Home, Visitors;
   var SVGame;			//TEMP, SV- SideView
};
ZFLScoreboard.prototype = {
   Set(cntxt, tWriter, rGenerator) {
      this.Screen = cntxt;
      this.TextWriter = tWriter;
      this.Randomizer = rGenerator;
   },
   SetTeams(hTeam, vTeam) {
      this.Home = hTeam;
      this.Visitors = vTeam;
   },
   SetGame(game) {	//TEMP and UNLOGGED
      this.SVGame = game;
   },
   ShowFinal() {

      this.Screen.fillStyle = GREY.LIGHT;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, 150);
      this.Screen.clearRect(0, 150, SCREEN.WIDTH, 450);

      //Teams and score
      this.TextWriter.Write(TeamNames[this.Home.Index][0], 5, 20, { FONT: "bold 14px Arial" } );
      this.TextWriter.Write(this.SVGame.Score.Home, 110, 20, { FONT: "bold 14px Arial" } );
      this.TextWriter.Write(TeamNames[this.Visitors.Index][0], 5, 40, { FONT: "bold 14px Arial" } );
      this.TextWriter.Write(this.SVGame.Score.Visitors, 110, 40, { FONT: "bold 14px Arial" } );

      //Stats
      num = this.SVGame.TotalYards/144;
      num = Math.round(10*num)/10;
      this.TextWriter.Write("Yards per play: "+num, 5, 60);

      this.ShowRatings();
      this.ShowBigPlays();

      //Record
      info = this.SVGame.HomeTeam.Record.W + "-" + this.SVGame.HomeTeam.Record.L;
      if (this.SVGame.HomeTeam.Record.T)
	 info += "-" + this.SVGame.HomeTeam.Record.T;
      this.TextWriter.Write(info, 5, 140, { FONT: "bold 18px Arial" } );

      //Transactions
      for (indx=0;indx<PlayerTeam.Transactions.length;++indx) {
	 this.Screen.fillRect(0, 150+(15*indx), SCREEN.WIDTH, 15);
	 this.TextWriter.Write(PlayerTeam.Transactions[indx], 5, 162+(15*indx));
      }
   },
   ShowRatings() {

      //Labels
      this.TextWriter.Write("Off", 50, 75, { FONT: "12px Arial" } );
      this.TextWriter.Write("Def", 75, 75, { FONT: "12px Arial" } );
      this.TextWriter.Write("Total", 105, 75, { FONT: "12px Arial" } );
      this.TextWriter.Write("Home", 5, 90, { FONT: "12px Arial" } );
      this.TextWriter.Write("Visitors", 5, 105, { FONT: "12px Arial" } );

      //Home
      info = Utilities.NumberToGrade(Math.round(this.SVGame.HomeOffRating/OFFENSE.STARTERS));
      this.TextWriter.Write(info, 55, 90, { FONT: "12px Arial" } );
      info = Utilities.NumberToGrade(Math.round(this.SVGame.HomeDefRating/DEFENSE.STARTERS));
      this.TextWriter.Write(info, 80, 90, { FONT: "12px Arial" } );
      info = Utilities.NumberToGrade(Math.round((this.SVGame.HomeOffRating+this.SVGame.HomeDefRating)/(OFFENSE.STARTERS+DEFENSE.STARTERS)));
      this.TextWriter.Write(info, 110, 90, { FONT: "12px Arial" } );

      //Visitors
      info = Utilities.NumberToGrade(Math.round(this.SVGame.VisitorsOffRating/OFFENSE.STARTERS));
      this.TextWriter.Write(info, 55, 105, { FONT: "12px Arial" } );
      info = Utilities.NumberToGrade(Math.round(this.SVGame.VisitorsDefRating/DEFENSE.STARTERS));
      this.TextWriter.Write(info, 80, 105, { FONT: "12px Arial" } );
      info = Utilities.NumberToGrade(Math.round((this.SVGame.VisitorsOffRating+this.SVGame.VisitorsDefRating)/(OFFENSE.STARTERS+DEFENSE.STARTERS)));
      this.TextWriter.Write(info, 110, 105, { FONT: "12px Arial" } );
   },
   ShowBigPlays() {
      var i;

      //NO LOGGING since is mostly a copy, but will log this as re-design

	 for (i=0;i<OFFENSE.STARTERS;++i) {
	    this.TextWriter.Write(OffFormationPositions[this.SVGame.HomeTeam.OffFormation][i]+":", 135, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.HomeTeam.OffStarters[i].Name.Last, 160, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(Utilities.NumberToGrade(this.SVGame.HomeTeam.OffStarters[i].Quality), 220, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.HomeOffBigPlays[i], 240, 13*(i+1), { FONT: "10px Arial" } );

	    this.TextWriter.Write(DefFormationPositions[this.SVGame.HomeTeam.DefFormation][i]+":", 255, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.HomeTeam.DefStarters[i].Name.Last, 275, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(Utilities.NumberToGrade(this.SVGame.HomeTeam.DefStarters[i].Quality), 335, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.HomeDefBigPlays[i], 355, 13*(i+1), { FONT: "10px Arial" } );

	    this.TextWriter.Write(OffFormationPositions[this.SVGame.VisitingTeam.OffFormation][i]+":", 370, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.VisitingTeam.OffStarters[i].Name.Last, 390, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(Utilities.NumberToGrade(this.SVGame.VisitingTeam.OffStarters[i].Quality), 450, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.VisitorsOffBigPlays[i], 470, 13*(i+1), { FONT: "10px Arial" } );

	    this.TextWriter.Write(DefFormationPositions[this.SVGame.VisitingTeam.DefFormation][i]+":", 485, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.VisitingTeam.DefStarters[i].Name.Last, 505, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(Utilities.NumberToGrade(this.SVGame.VisitingTeam.DefStarters[i].Quality), 565, 13*(i+1), { FONT: "10px Arial" } );
	    this.TextWriter.Write(this.SVGame.VisitorsDefBigPlays[i], 585, 13*(i+1), { FONT: "10px Arial" } );
	 }
   }
};
