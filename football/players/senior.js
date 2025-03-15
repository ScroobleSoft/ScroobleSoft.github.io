
//---------------------------------------------
//---------- SENIOR PLAYER --------------------		//REDUNDANT, except for GetPrice, GetWages, GetWorth code . . . DE-LOG
var SeniorPlayer = function() {
   var Decline;			//NOTE: applicable only to players over 29

   var CareerStats;
   var SeasonStats;
};
SeniorPlayer.prototype = new FootballPlayer();
SeniorPlayer.prototype.Set = function(rGenerator) {
   FootballPlayer.prototype.Set.call(this, rGenerator);

   this.CareerStats = new FootballPlayerStats();
   this.SeasonStats = new FootballPlayerStats();
/*
      this.Age = 18 + Utilities.GetRandomNumber(18, STARtAtZERO);
      this.Position = this.GeneratePosition();
      this.Quality = Utilities.NumberToGrade(Utilities.GetRandomNumber(15, STARtAtZERO));
      this.Potential = ;
      this.Improvement = ;
*/
};
SeniorPlayer.prototype.SetStats = function() {

   //UNLOGGED

   //NOTE: this is an alternative to loading stats
   this.CareerStats.Set();
   this.SeasonStats.Set();
};
SeniorPlayer.prototype.GeneratePosition = function() {
      var rNum;

   //ISSUE: method not useful right now, and will have to be re-written if not REDUNDANT

      rNum = Utilities.GetRandomNumber(SQUAD.SIZE, STARtAtZERO);
      switch (true) {
	 case (rNum<SLOT.GK):  return (PLAYER.GOALKEEPER);
	 case (rNum<SLOT.RB):  return (PLAYER.RIGHtBACK);
	 case (rNum<SLOT.RWB): return (PLAYER.RIGHtWINgBACK);
	 case (rNum<SLOT.CB):  return (PLAYER.CENTReBACK);
	 case (rNum<SLOT.LB):  return (PLAYER.LEFtBACK);
	 case (rNum<SLOT.LWB): return (PLAYER.LEFtWINgBACK);
	 case (rNum<SLOT.RM):  return (PLAYER.RIGHtMIDFIELDER);
	 case (rNum<SLOT.DM):  return (PLAYER.DEFENSIVeMIDFIELDER);
	 case (rNum<SLOT.CM):  return (PLAYER.CENTReMIDFIELDER);
	 case (rNum<SLOT.AM):  return (PLAYER.ATTACKINgMIDFIELDER);
	 case (rNum<SLOT.LM):  return (PLAYER.LEFtMIDFIELDER);
	 case (rNum<SLOT.RW):  return (PLAYER.RIGHtWINGER);
	 case (rNum<SLOT.SF):  return (PLAYER.SMALlFORWARD);
	 case (rNum<SLOT.S):   return (PLAYER.STRIKER);
	 case (rNum<SLOT.BF):  return (PLAYER.BIgFORWARD);
	 case (rNum<SLOT.LW):  return (PLAYER.LEFtWINGER);
      }
/*
      this.Type = 10*Utilities.GetRandomNumber(SQUAD.TYPES, STARtAtZERO);
      if (this.Type)
	 this.Type += Utilities.GetRandomNumber(SQUAD.SUbPOSITIONS);
*/
};
SeniorPlayer.prototype.GetPosition = function() {  //maybe REDUNDANT
      switch (this.Position) {
	 case  0: return ("GK");
	 case 11: return ("RB");
	 case 12: return ("RWB");
	 case 13: return ("CB");
	 case 14: return ("LB");
	 case 15: return ("LWB");
	 case 21: return ("RM");
	 case 22: return ("DM");
	 case 23: return ("CM");
	 case 24: return ("AM");
	 case 25: return ("LM");
	 case 31: return ("RW");
	 case 32: return ("SF");
	 case 33: return ("S");
	 case 34: return ("BF");
	 case 35: return ("LW");
      }
};
SeniorPlayer.prototype.GetPrice = function() {

      //TODO: factoring in form
      //TODO: factor in games played for propects
      //NOTE: player will be given the option to sell their own prospects if they so choose

      //Factor in age
      if (this.Age<22)					//HARD-CODED
	 return (((24-this.Age)/2)*this.GetWorth());	//HARD-CODED
      else if (this.Age<26)				//HARD-CODED
	 return (this.GetWorth());
      else
	 return (this.GetWorth(this.Age-25));
};
SeniorPlayer.prototype.GetWages = function() {

      //NOTE: for 22+, it's price/4 years, further divided by 50 (weekly)

      if (this.Age>21)		//HARD-CODED
	 return (Math.round(this.GetWorth()/(4*50)));	//in K, HARD-CODED
      else {
	 return (Math.round((this.GetWorth()/(4*50))/((24-this.Age)/2)));
      }
};
SeniorPlayer.prototype.GetWorth = function(aDifferential) {  //a- age
      if (aDifferential)
	 return (10*Math.pow(1.25, (31-(this.Quality+aDifferential))));	//in K (NOTE: HARD-CODING)
      else
	 return (10*Math.pow(1.25, (31-this.Quality)));
};
SeniorPlayer.prototype.DisplayInfo = function() {

   //UNLOGGED

};
