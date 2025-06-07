
//-----------------------------------------------
//---------- SOLAR CARGO BAY --------------------
var SolarCargoBay = function() {
	var Context;
	var GraphicsTool;
	var CargoType;
	var CourierPouches;
	var MineralPods;
};
SolarCargoBay.prototype = {
	Set(cntxt, gTool) {
		this.Context = cntxt;
		this.GraphicsTool = gTool;
		this.CargoType = -1;
		this.CourierPouches = new Array(4);
		this.CourierPouches.fill(0);
		this.MineralPods = new Array(8);
		this.MineralPods.fill(0);
	},
	Draw() {  //UNLOGGED

		this.Context.fillStyle = SOLArCOLOUR.COCKPIT.LIVID;
		this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
		this.DrawSections();
		this.DisplayInventory();
	},
	DrawSections() {
		var i;

		//Cargo
		this.GraphicsTool.DrawRectangle(8, 8, 272, 286, SOLArCOLOUR.COCKPIT.SKY, 0);
		this.GraphicsTool.DrawLine( { X: 10, Y: 292 }, { X: 40, Y: 277 }, SOLArCOLOUR.COCKPIT.SEA, 1);
		this.GraphicsTool.DrawVerticalLine( { X: 40, Y: 277 }, -267, SOLArCOLOUR.COCKPIT.SEA, 1);
		this.GraphicsTool.DrawHorizontalLine( { X: 40, Y: 277 }, 238, SOLArCOLOUR.COCKPIT.SEA, 1);
		this.GraphicsTool.DrawRectangle(8, 8, 272, 286, "white", 2);

		//Courier slots
		for (i=0;i<4;++i) {  //TODO: COURIER.SLOTS
			this.GraphicsTool.DrawRectangle(288, ((64+9)*i)+8, 64, 64, SOLArCOLOUR.COCKPIT.SKY, 0);
			this.GraphicsTool.DrawRectangle(288, ((64+9)*i)+8, 64, 64, "white", 2);
		}

		//Mineral pods
		for (i=0;i<8;++i) {  //TODO: MINERAL.PODS
			this.GraphicsTool.DrawRectangle(360, ((32+4)*i)+8, 32, 32, SOLArCOLOUR.COCKPIT.SKY, 0);
			this.GraphicsTool.DrawRectangle(360, ((32+4)*i)+8, 32, 32, "white", 2);
		}

		//Antique slots
		for (i=0;i<4;++i) {  //TODO: ANTIQUE.SLOTS
			this.GraphicsTool.DrawRectangle(((90+8)*i)+8, 302, 90, 90, SOLArCOLOUR.COCKPIT.SKY, 0);
			this.GraphicsTool.DrawRectangle(((90+8)*i)+8, 302, 90, 90, "white", 2);
		}
	},
	DisplayInventory() {  //UNLOGGED
	}
};
