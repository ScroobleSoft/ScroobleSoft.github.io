
//----------------------------------------------
//---------- PERCUTTER DISC --------------------
var PercutterDisc = function() {
};
PercutterDisc.prototype = new GenieAgent();
PercutterDisc.prototype.Set = function(specs, sprite) {
   GenieAgent.prototype.Set.call(this, null, null, null, specs, sprite);

   this.Angle = 0;
};
PercutterDisc.prototype.Update = function() {

   //UNLOGGED

   if (this.Position.Y<=550)
      this.Extant = true;

   if (this.CheckAtDestination()) {
      if (Utilities.GetRandomBoolean())
	 this.SetDestination( { X: 0, Y: this.Position.Y } );
      else
	 this.SetDestination( { X: 600, Y: this.Position.Y } );
   }

   this.Move();
};
/*
PercutterDisc.prototype.Draw = function() {

   //UNLOGGED

   //-rotate
};
*/
