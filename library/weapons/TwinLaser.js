
//------------------------------------------------
//---------- TWIN LASER BLAST --------------------
var TwinLaserBlast = function() {
   var SecondPosition;
};
TwinLaserBlast.prototype = new GenieLaserBlast();
TwinLaserBlast.prototype.Activate = function(pos, pos2, dstn) {
   GenieLaserBlast.prototype.Activate.call(this, pos, dstn);

   this.SecondPosition.X = pos2.X;
   this.SecondPosition.Y = pos2.Y;
   this.Extant = this.Frames;
};
TwinLaserBlast.prototype.Draw = function() {
   GenieLaserBlast.prototype.Draw.call(this);

   this.GraphicsTool.GOL.G2D.DrawLine(this.SecondPosition.X, this.SecondPosition.Y, this.Destination.X, this.Destination.Y, this.Specs.COLOUR, this.Specs.LW);
   --this.Extant;
};
