/*
 *    * missile launches are a legitimate way to attack a city (by landing on units in bases), while jamming radars placed on the missile base are the counter
 *	against them
 *    ** a missile base theatre will now show all 4 bases in 4 screen quadrants, jamming radars only on bases emitting small circular jamming/counter pulses
 *	 warring with incoming projectiles - actually, am mixing up missile theatre and missile section of conquest theatre
 */
//--------------------------------------------------------
//---------- DOMINION MISSILE THEATRE --------------------
var DominionMissileTheatre = function() {
};
DominionMissileTheatre.prototype = new DominionTheatre();
DominionMissileTheatre.prototype.Set = function(cnvs, specs, iBox, cPanel, gTool, cPad, tWriter) {
   DominionTheatre.prototype.Set.call(this, cnvs, specs, iBox, cPanel, gTool, cPad, tWriter);

};
DominionMissileTheatre.prototype.DrawFrame = function() {

   //UNLOGGED

   this.Screen.fillStyle = this.TertiaryColour;
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
};
