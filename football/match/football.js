
//-------------------------------------------------
//----------- MATCH FOOTBALL ----------------------
var MatchFootball = function() {
   var Mapper;
};
MatchFootball.prototype = new GenieAgent();
MatchFootball.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, specs, sprite);

   this.Elevation = 0;
};
MatchFootball.prototype.SetLinks = function(mppr) {
   this.Mapper = mppr;
};
MatchFootball.prototype.Draw = function() {

   //UNLOGGED

   this.Map(this.Position, this.ScreenCoords);
   this.ExecuteDraw();
};
