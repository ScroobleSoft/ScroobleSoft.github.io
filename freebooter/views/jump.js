/*
 *		flaps open faster
 */
//-----------------------------------------------
//---------- SOLAR JUMP VIEW --------------------
var SolarJumpView = function() {
	var Planet;
	var Distance;

	var i;
};
SolarJumpView.prototype = new GenieView();
SolarJumpView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

};
SolarJumpView.prototype.Draw = function() {  //UNLOGGED

	//TEMP
	this.Context.fillStyle = GREY.SILVER;
	this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
	SolarText.Write("A list of planets, sorted alphabetically for easy access.", 30, 200);
	SolarText.Write("Clicking one displays it in the Info Box.", 30, 215);
};
