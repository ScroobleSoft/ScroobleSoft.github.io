/* 
 *		Ship sprite section is 18px tall, station sprite is 27px (25px plus 2px padding), meaning 45px of the 792px (4x198) are taken by them,
 *		so the scale will be (distance/7050)*792
 */
//-------------------------------------------
//---------- SOLAR ROUTE --------------------
var SolarRoute = function() {
	var GraphicsTool;
	var Segments;
	var Distance;

	var i;
};
SolarRoute.prototype = {
	Set(gTool) {
		this.GraphicsTool = gTool;
		this.Segments = [ 180,198,198,171 ];
	},
	SetDistance(dstnc) {  //UNLOGGED - this should determine docking station position

		this.Distance = dstnc;
	},
	Display() {

		//Segments
		this.GraphicsTool.SwitchContextByID(CANVAS.CONSOLE);
		for (this.i=0;this.i<4;++this.i) {
			this.GraphicsTool.DrawRectangle(4+((32+5)*this.i), 4, 32, 200, "black", 0);
			this.GraphicsTool.DrawRectangle(4+((32+5)*this.i), 4, 32, 200, "white", 1);
		}
		this.GraphicsTool.RestoreContext();

		//Ship sprite
		//-calculate position (allow for segment starts and ends)

	   //Docking station
		//-calculate position (allow for segment starts and ends)
	}
};
