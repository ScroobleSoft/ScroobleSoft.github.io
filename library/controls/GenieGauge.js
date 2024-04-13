/*
 *  TODO: this should be the base class for 2 separate sub-classes: Linear and Circular Gauges
 */
//-------------------------------------------
//---------- GENIE GAUGE --------------------
var GenieGauge = function() {
   var Filled;		//depending on type, gives amount or percentage filled in decimal
};
GenieGauge.prototype = new GenieControl();
GenieGauge.prototype.Set = function(canvas, specs) {  //SPECS: { L: , T: , W: , H: , COLOUR: , ORIENTATION: }
   GenieControl.prototype.Set.call(this, canvas, specs);

   this.Filled = 0;
};
GenieGauge.prototype.Draw = function() {  //TEMP: only very basic fluid one is implemented for now

   this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   this.GraphicsTool.SwitchContext(this.Context);
   if (this.Specs.ORIENTATION==ORIENTATION.HORIZONTAL) {
      this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W*this.Filled, this.Specs.H, this.Specs.COLOUR, 0);
      this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 1);
   } else {
      this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T+(this.Specs.H*(1-this.Filled)), this.Specs.W, this.Specs.H*this.Filled, this.Specs.COLOUR, 0);
      this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "black", 1);
   }
   this.GraphicsTool.RestoreContext();

   //TODO: no labels written here - can see if calling app will be responsible for that
};
GenieGauge.prototype.Update = function(prcntg) {  //TEMP: only very basic fluid one is implemented for now

   //UNLOGGED

   //NOTE: prcntg represents % if not segmented, otherwise number of segments; fill, then call Draw

   if (this.Filled!=prcntg) {
      this.Filled = prcntg;
      this.Draw();
   }
};
GenieGauge.prototype.Hide = function() {
   //-once this is written to erase markers and labels, should remove the same method in GenieFramesMeter
};
