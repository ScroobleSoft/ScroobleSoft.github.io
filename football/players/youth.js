/*
 *  won't allow youth players to be promoted in-season, unless IR opens up a slot for temporary use
 *  this is the KEY here: justification for needing to monitor youth team, and having its tab present is to see how everyone
 *   is improving and thus project who will be able to make it senior squad as a prospect in one of the next 2 years, only ones
 *   who are E- or better at the end of the season eligible for senior contracts, all remaining 17s (18s, really) having to be released
 *  on average, only 1 player will make it (at least one?), with final grade weighted more towards E- than D+
 *  improvement will be staggered so it is not automatically predictable which prospect will make it, values being pre-calculated
 *   and kept in a hidden array
 */
//--------------------------------------------
//---------- YOUTH PLAYER --------------------		DE-LOG
var YouthPlayer = function() {

   var ImprovementProbability;	//probability of improvement
   var ImprovementList;		//array of appearance numbers
};
YouthPlayer.prototype = new FootballPlayer();
YouthPlayer.prototype.Set = function(rGenerator, indx) {
   FootballPlayer.prototype.Set.call(this, rGenerator, indx);

   this.Position = indx;
//   this.Potential = new Array();
};
YouthPlayer.prototype.Generate = function() {
   var i;
   var tGrade;  //target grade

   this.GenerateName();
   this.Age = this.Randomizer.GetInRange(18,21);
   switch (this.Age) {
      case 18:
	 this.Quality = this.Randomizer.GetInRange(GRADE.Iplus, GRADE.Jminus);
	 break;
      case 19:
	 this.Quality = this.Randomizer.GetInRange(GRADE.Hplus, GRADE.Iminus);
	 break;
      case 20:
	 this.Quality = this.Randomizer.GetInRange(GRADE.Gplus, GRADE.Hminus);
	 break;
      case 21:
	 this.Quality = this.Randomizer.GetInRange(GRADE.Fplus, GRADE.Gminus);
	 break;
   }

   //Determine if player makes senior squad
/* NOTE: this is a RE-DESIGN: instead of an array of improvements, probability will be used to calculate partial grade upgrades
   if (this.Randomizer.GetInRange(1, 100)<12)
      tGrade = this.Randomizer.GetInRange(GRADE.Dplus, GRADE.Eminus);
   else
      tGrade = this.Randomizer.GetInRange(GRADE.Fplus, this.Quality);

   //Create array of potential improvements
   for (i=0;i<(this.Quality-tGrade);++i)
      if (this.Age==16)
	 this.Potential.push(this.Randomizer.GetInRange(1, 2*YOUTH.GAMES));
      else
	 this.Potential.push(this.Randomizer.GetInRange(1, YOUTH.GAMES));
*/
   this.Potential = this.Randomizer.GetInRange(GRADE.Aplus, this.Quality);

   this.GenerateAppearance();
};
YouthPlayer.prototype.GetGradeWithinRange = function(sGrade, eGrade) {  //s- start, e- end

   //UNLOGGED - REDUNDANT

   return (this.Randomizer.GetInRange(Utilities.GradeToNumber(sGrade), Utilities.GradeToNumber(eGrade)));
};
/* RE-DESIGN: not using array any more
YouthPlayer.prototype.Update = function(nGame) {  //n- number NOTE: called after every game
   var i;

   //UNLOGGED

   for (i=0;i<this.Potential.length;++i)
      if (this.Potential[i]==nGame)
	 --this.Quality;
};
*/
YouthPlayer.prototype.Update = function(bSenior, minutes) {  //UNTESTED
   var odd;

   if (this.Quality==this.Potential)
      return;

   odds = (this.Quality-this.Potential)/YOUTH.GAMES;
   if (minutes)
      odds *= minutes/90;
   if (bSenior)
      odds *= 2;
   odds = Math.round(10/odds);
   if (this.Randomizer.CheckUnderOdds(10, odds))
      --this.Quality;
};
YouthPlayer.prototype.ProcessSeason = function() {  //For 16s, adjust .Potential array, for 17s see if senior squad eligible
   var i;

   //UNLOGGED . . . might be REDUNDANT

   ++this.Age;
   if (this.Age==16)
      for (i=0;i<this.Potential.length[i];++i)
	 this.Potential[i] -= YOUTH.GAMES;
   else {
      //TODO: process 17s
   }
};
