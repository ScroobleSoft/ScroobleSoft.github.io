
//------------------------------------------
//----------- ROGUE SUN --------------------
var RogueSun = function() {
	var Screen, InfoBox, ControlPanel;
	var GraphicsTool;

	var i;
};
RogueSun.prototype = {
	Set(cntxt, iBox, cPanel, gTool) {
		this.Screen = cntxt;
		this.InfoBox = iBox;
		this.ControlPanel = cPanel;
		this.GraphicsTool = gTool;
	},
	Draw() {  //ASSUMPTION: a minimum radius of 10

		this.GraphicsTool.SwitchContext(this.InfoBox);
		for (this.i=10;this.i>5;--this.i)
			this.GraphicsTool.DrawCircle(INFoBOX.WIDTH/2, INFoBOX.HEIGHT/2, this.i, ORANGE.ONE, 0, 5/this.i);
		this.GraphicsTool.RestoreContext();
	},
	DrawMain() {

		for (this.i=10;this.i>5;--this.i)
			this.GraphicsTool.DrawCircle(SCREEN.WIDTH/2, SCREEN.HEIGHT/2, this.i, ORANGE.ONE, 0, 5/this.i);
	},
	DrawControlPanel() {

		this.GraphicsTool.SwitchContext(this.ControlPanel);
		for (this.i=10;this.i>5;--this.i)
			this.GraphicsTool.DrawCircle(78, 165, this.i, ORANGE.ONE, 0, 5/this.i);
		this.GraphicsTool.RestoreContext();
	}
};
