/*
 *		display possibilities
 *		 - surveillance
 *		 - 8 power octagons
 *		 - minister mugshots
 *		ISSUE: cycling/selecting problem
 */
//---------------------------------------------------
//---------- OFFICE MONITOR BANK --------------------
var OfficeMonitorBank = function() {
	var Specs;
	var GraphicsTool;
	var State;
	var Monitors;
};
OfficeMonitorBank.prototype = {
	Set(specs, gTool) {
		this.Specs = specs;
		this.GraphicsTool = gTool;
//		this.State = MONITOR.RAISED;
		this.SetMonitors();
	},
	SetMonitors() {  //TODO: no fixed positions since screen containing them will go up and down
		var i;
		var x, y;
		var specs, gTool;

		//Create 9 monitors
		this.Monitors = ArrayUtils.Create(this.Specs.MONITOR.COUNT+1, OfficeMonitor);
		specs = this.Specs.MONITOR;
		gTool = this.GraphicsTool;
		this.Monitors.forEach(function(mntr) {mntr.Set(specs, gTool);});
		for (i=0;i<this.Monitors.length;++i) {
			x = this.Specs.L + this.Specs.MONITOR.L + ((i % 3)*(this.Specs.MONITOR.W+this.Specs.MONITOR.GAP));
			y = this.Specs.T + this.Specs.MONITOR.T + (Math.floor(i/3)*(this.Specs.MONITOR.H+this.Specs.MONITOR.GAP));
			this.Monitors[i].SetLocation(x, y);
		}

		//Remove central monitor
		ArrayUtils.Remove(this.Monitors, 4);
	},
	Update() {

		//UNLOGGED

		switch (this.State) {
	 case MONITOR.RAISED:
		 break;
	 case MONITOR.LOWERING:
		 ++this.Y;
		 if (this.Y==MONITOR.BANK.Y)
			 this.State = MONITOR.LOWERED;
		 //draw here will show a static image or title in each monitor
		 break;
	 case MONITOR.LOWERED:
		 //draw here will show actual images
		 break;
	 case MONITOR.RAISING:
		 --this.Y;
		 if (this.Y==0)
			 this.State = MONITOR.RAISED;
		 //draw here will probably show blank screens
		 break;
		}
	},
	Draw() {  //UNLOGGED

		//Frame
		this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, GREY.LIGHT, 0);
		this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", this.Specs.LW);

		this.Monitors.forEach(function(mntr) {mntr.EraseScreen(); mntr.DrawFrame();});

		//-leader's pic in centre, drawn at 50% scale using buffer, clicking on which could show approval chart
	}
};
/*
DominionOfficeView.prototype.SetMonitorBank = function() {
		var i;
		var x, y, oy, oy;

		//Caclulate location of monitor bank
		x = (SCREEN.WIDTH - (2*OFFICE.COLUMnW) - ((4*MONITOR.W)+(3*MONITOR.O)))/2;
		x += OFFICE.COLUMnW;
		y = OFFICE.MONITOrBANkT;

		//Create and set monitors
		for (i=0;i<this.MonitorBank.length;++i) {
	 ox = (MONITOR.W+MONITOR.O)*(i % (this.MonitorBank.length/MONITOR.R));
	 oy = Math.floor(i/(this.MonitorBank.length/MONITOR.R));
	 this.MonitorBank[i].Set(Screen, GraphicsTool, x+ox, y+oy, MONITOR);
		}
};
*/