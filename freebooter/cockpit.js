
//---------------------------------------------
//---------- SOLAR COCKPIT --------------------
var SolarCockpit = function() {
	var InfoBox;
	var GraphicsTool;
	var ButtonPushed;

	var i;
};
SolarCockpit.prototype = {
	Set(iBox, gTool) {
		this.InfoBox = iBox;
		this.GraphicsTool = gTool;
		this.ButtonPushed = 0;
	},
	Draw() {

		this.DrawFrame();
		this.DrawDashBoard();
	},
	DrawFrame() {

		this.GraphicsTool.DrawRectangle(0, 0, COCKPIT.W, COCKPIT.H, GREY.ASH, 5);			//outer frame
		this.GraphicsTool.DrawRectangle(5, 5, COCKPIT.W-10, COCKPIT.H-10, GREY.SILVER, 2);
		this.GraphicsTool.DrawRectangle(0, 570, COCKPIT.W, 36, GREY.ASH, 0);
		this.GraphicsTool.DrawRectangle(5, 570, COCKPIT.W-10, 2, GREY.LIGHT, 1);			//dashboard
		this.GraphicsTool.DrawRectangle(5, 490, 100, 100, "black", 0);
		this.GraphicsTool.DrawRectangle(3, 488, 104, 104, GREY.ASH, 2);
		this.GraphicsTool.DrawRectangle(5, 490, 100, 100, GREY.LIGHT, 1);
		this.GraphicsTool.DrawRectangle(495, 490, 100, 100, "black", 0);
		this.GraphicsTool.DrawRectangle(493, 488, 104, 104, GREY.ASH, 2);
		this.GraphicsTool.DrawRectangle(495, 490, 100, 100, GREY.LIGHT, 1);
	},
	DrawDashBoard() {

		//UNLOGGED

		//-control panel is going to be 240x300 (space between that and info box will be less than 12px (4px?))
		//-12 push buttons (arcade style) of size 12x16 spaced out equally

		for (this.i=0;this.i<DASHBOARD.BUTTONS;++this.i)
			this.DrawPushButton(this.i, (this.i==this.ButtonPushed) );

		switch (this.ButtonPushed) {
			case DASHBOARD.WEAPONS:
				this.ShowWeaponsPanel();
				break;
		}
	},
	DrawPushButton(num, bClicked) {  //arcade style

		this.GraphicsTool.DrawRectangle(117+(32*num), 577, 15, 19, GREY.MEDIUM, 1);
		this.GraphicsTool.DrawRectangle(116+(32*num), 576, 15, 19, "white", 1);
		if (bClicked) {
			this.GraphicsTool.DrawRectangle(117+(32*num), 577, 13, 17, "black", 1);
			this.GraphicsTool.DrawRectangle(118+(32*num), 578, 12, 16, DashboardColours[num], 0);
		} else
			this.GraphicsTool.DrawRectangle(117+(32*num), 577, 13, 17, DashboardColours[num], 0);

		//TODO: draw tool tip
	},
	UpdateDashBoard() {
	},
	ShowWeaponsPanel() {
	}
};
