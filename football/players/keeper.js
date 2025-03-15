
//-----------------------------------------------------
//---------- FOOTBALL MATCH KEEPER --------------------
var FootballMatchKeeper = function() {
};
FootballMatchKeeper.prototype = new FootballMatchPlayer();  //ISSUE: may be totally separate from other players, taken from GenieAgent
FootballMatchKeeper.prototype.Set = function(sprite, unit) {
   FootballMatchPlayer.prototype.Set.call(this, sprite, unit);

};
FootballMatchKeeper.prototype.SetLinks = function(tWriter, rGenerator, tBuffer) {
   this.TextWriter = tWriter;
   this.Randomizer = rGenerator;
   this.Buffer = tBuffer;
};
FootballMatchKeeper.prototype.Draw = function() {

   //TODO: re-write below (actually, probably just need a call to base class once ::Set and ::Update are amended - might even be inherited! )
      if (this.Direction==DIRECTION.E)
	 GenieAgent.prototype.Draw.call(this, 0);
      else if (this.Direction==DIRECTION.W)
	 this.Sprite.DrawFlipped(this.Position.X-this.ScreenRect.L, this.Position.Y, FLIPPED.HORIZONTAL, 0);

   if (this.Unit) {  //check is TEMP
      strng = this.Unit.Name.Last + " " + Utilities.NumberToGrade(this.Unit.Quality);
      this.TextWriter.Write(strng, this.ScreenCoords.X, this.ScreenCoords.Y-this.Sprite.Height-3, { FONT: "10px Arial", COLOUR: "yellow" } );
   }
};
FootballMatchKeeper.prototype.CheckSaved = function(shot) {

   //UNLOGGED

   //depends in part on quality of shot
   //2nd part depends on keeper quality, with all being able to reach halfway to posts on either side, the remaining quarter
   // distance within reach proportional to quality, with 20% not reachable by anyone (note: no probability in play here)

   return (shot<=50+(30-this.Unit.Quality));  //shot between 1 and 100, 50 or less always saved
};

/*
 *  UNLOGGED: below will replace that above
 */
//--------------------------------------------
//---------- MATCH KEEPER --------------------
var MatchKeeper = function() {
};
MatchKeeper.prototype = new MatchPlayer();  //ISSUE: may be totally separate from other players, taken from GenieAgent
MatchKeeper.prototype.Set = function(specs, sprite) {
   MatchPlayer.prototype.Set.call(this, specs, sprite);

};
