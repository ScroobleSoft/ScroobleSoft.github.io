
//-------------------------------------------------
//---------- SIDE VIEW GRIDDER --------------------
var SideViewGridder = function() {
   var Gridder;
   var LastName;		//array of indices to name letters
};
SideViewGridder.prototype = new GameGridder();
SideViewGridder.prototype.Set = function(specs, sprite) {
   GameGridder.prototype.Set.call(this, specs, sprite);

   //TODO: need a pointer to parent to monitor play state
};
SideViewGridder.prototype.SetGridder = function(grddr) {

   //UNLOGGED

   this.Gridder = grddr;
   this.LastName = new Array(this.Gridder.Name.Last.length);
   for (this.i=0;this.i<this.LastName.length;++this.i)
      this.LastName[this.i] = this.Gridder.Name.Last.toUpperCase().charCodeAt(this.i) - 65;	//NOTE: 65 is char code for "A"
};
SideViewGridder.prototype.SetLinks = function(rGenerator, sRect) {

   this.Randomizer = rGenerator;
   this.ScreenRect = sRect;
};
SideViewGridder.prototype.DisplayName = function() {

   if (this.Direction==DIRECTION.E)
      this.x = this.ScreenCoords.X - ((6*this.LastName.length)+6);
   else
      this.x = this.ScreenCoords.X + 20;
   this.y = this.ScreenCoords.X - 28;					//TODO: will be different for 3-point stance for OLs
   for (this.i=0;this.i<this.LastName.length;++this.i) {
      LetterSprite.Draw(this.x, this.y, (26*Math.floor(this.Gridder.Quality/3))+this.LastName[this.i]);
      this.x += 6;
   }
};
SideViewGridder.prototype.Update = function() {

   //UNLOGGED

   //OPEN: run and pass methods likely will be over-ridden in sub classes
   switch (this.Play.Type) {
      case PLAY.SPECIAL:
	 break;
      case PLAY.RUN:
	    this.RunUpdate();
	 break;
      case PLAY.PASS:
	    this.PassUpdate();
	 break;
      case PLAY.TRICK:
	 break;
   }
};
SideViewGridder.prototype.SetRoute = function(route) {  //NOTE: must be called AFTER Gridder's Position has been set

   //UNLOGGED

   this.Route = route;
   this.RouteIndex = 0;
   this.StartPosition.Set(this.Position.X, this.Position.Y);
   if (this.Direction==DIRECTION.E)
      this.Velocity.Set(RouteVelocities[0][this.Route[this.RouteIndex]][0], RouteVelocities[0][this.Route[this.RouteIndex]][1]);
   else
      this.Velocity.Set(RouteVelocities[1][this.Route[this.RouteIndex]][0], RouteVelocities[1][this.Route[this.RouteIndex]][1]);
};
SideViewGridder.prototype.DrawRoute = function() {

   this.x = this.StartPosition.X - this.ScreenRect.L;
   this.y = this.StartPosition.Y - this.ScreenRect.T;
   for (this.i=0;this.i<this.Route.length;++this.i)
      for (this.j=0;this.j<80;this.j+=20) {
	 this.x += 20*RouteVelocities[0][this.Route[this.i]][0];
	 this.y += 20*RouteVelocities[0][this.Route[this.i]][1];
	 RouteMarkerSprite.Draw(this.x, this.y, this.State.Open);
   }
};
SideViewGridder.prototype.UpdateRoute = function() {

   this.Move();
   --this.Animation.Frames;
   if (!this.Animation.Frames) {
      ++this.RouteIndex;
      if (this.RouteIndex!=this.Route.length) {
	 this.CheckOpen();
	 if (this.Direction==DIRECTION.E)
	    this.Velocity.Set(RouteVelocities[0][this.Route[this.RouteIndex]][0], RouteVelocities[0][this.Route[this.RouteIndex]][1]);
	 else
	    this.Velocity.Set(RouteVelocities[1][this.Route[this.RouteIndex]][0], RouteVelocities[1][this.Route[this.RouteIndex]][1]);
	 this.Animation.Frames = 80;
      } else
	 this.State.Motion = GRIDDER.STATE.BREAKING;
   }
};
SideViewGridder.prototype.CheckOpen = function() {

   //UNLOGGED

};
