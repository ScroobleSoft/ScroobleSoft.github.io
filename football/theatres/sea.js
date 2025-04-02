
//----------------------------------------------------
//---------- DOMINION SEA THEATRE --------------------
var DominionSeaTheatre = function() {
   var CentralOctagon;
   var LeftArmada, RightArmada, LeftShipPositions, RightShipPositions;
};
DominionSeaTheatre.prototype = new DominionTheatre();
DominionSeaTheatre.prototype.Set = function(cnvs, specs, iBox, cPanel, gTool, cPad, tWriter) {
   DominionTheatre.prototype.Set.call(this, cnvs, specs, iBox, cPanel, gTool, cPad, tWriter);

   this.SetOctagon();
};
DominionSeaTheatre.prototype.SetOctagon = function() {

   //UNLOGGED

   this.CentralOctagon = this.CalcPad.GetOctagonVertices(THEATRE.SEA.OCTAGON.SIZE);
};
DominionSeaTheatre.prototype.SetArmadas = function(lArmada, rArmada) {

   //-ship positions are adjusted depending on whether or not any are carriers

};
DominionSeaTheatre.prototype.DrawFrame = function() {

   this.Screen.fillStyle = PAINT.SEA;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   this.GraphicsTool.DrawRectangle(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT, "black", 4);
   this.GraphicsTool.DrawVerticalLine( { X: 120, Y: 240 }, 400, "black", 4);
   this.GraphicsTool.DrawVerticalLine( { X: 520, Y: 240 }, 400, "black", 4);
   this.GraphicsTool.DrawHorizontalLine( { X: 0, Y: 240 }, SCREEN.WIDTH, "black", 4);

   this.GraphicsTool.DrawPolygon(THEATRE.SEA.OCTAGON.X, THEATRE.SEA.OCTAGON.Y, this.CentralOctagon, PAINT.NAVY, 0);
};
DominionSeaTheatre.prototype.DrawShips = function() {
};
