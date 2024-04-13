
GenieAgent.prototype.SetAvoidance = function() {

   //UNLOGGED
/*
   this.MoveBox = new GenieRect();
   this.MoveBox.W = this.Footprint.W;
   this.MoveBox.H = this.Footprint.H;
*/
};
GenieAgent.prototype.DetermineMoveBox = function() {  //NOTE: ASSUMPTION is ::DetermineFootprint has already been called

   this.MoveBox.L = this.Footprint.L + this.Velocity.X;
   this.MoveBox.T = this.Footprint.T + this.Velocity.Y;
};
