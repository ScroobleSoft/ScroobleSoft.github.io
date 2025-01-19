
//---------------------------------------------------
//---------- OFFICE MONITOR BANK --------------------
var OfficeMonitorBank = function() {
   var MonitorPositions;
   var BankFrame, MonitorFrame;
   var Y;			//TODO: change to .Height
   var State;
};
OfficeMonitorBank.prototype = {
   Set() {
      this.MonitorPositions = Utilities.CreateArray(MINISTRY.PORTFOLIOS, Coordinate2D);
      this.State = MONITOR.RAISED;
   },
   SetMonitorOffsets() {  //NOTE: no fixed positions since screen containing them will go up and down
      var i;

      for (i=0;i<this.Monitors.length;++i) {
	 this.MonitorPositions[i].X = (i % 4)*140;
	 this.MonitorPositions[i].Y = 140*Math.floor(i/4);
      }
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
   Draw() {

      //UNLOGGED

      //Draw frames
      this.GraphicsTool.DrawRoundedRectangle(this.Left, this.Top, this.Specs.W, this.Specs.H, this.Specs.RADIUS, this.Specs.COLOUR, this.Specs.FRAME);

   }
};
