/*
 *  TODO: add a label drawing facility via specs, LABEL: { TEXT: "", X: -1, Y: -1, COLOUR: "" }
 */
//---------------------------------------------
//--------- TIME LAPSE METER ------------------  TODO: a normal linear gauge, vertical orientation, 4 'sections' being enough - each representing 4secs
var TimeLapseMeter = function() {
};
TimeLapseMeter.prototype = new LinearGauge();
/*
TimeLapseMeter.prototype.Set = function(canvas, specs) {  //SPECS: { L: , T: , W: , H: , COLOUR: , ORIENTATION: }
   LinearGauge.prototype.Set.call(this, canvas, specs);

};
*/
TimeLapseMeter.prototype.Draw = function() {

   //UNLOGGED - this is TOTALLY scratch, just to use right away, but inverted bas-relief style can be duplicated in LinearGauge (needs refinement)

   //Background
   this.Context.fillStyle = GREY.SILVER;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

   //Bas-relief outline
   this.Context.fillStyle = "white";
   this.Context.fillRect(this.Specs.L+this.Specs.W, this.Specs.T-2, 2, this.Specs.H+2);
   this.Context.fillRect(this.Specs.L, this.Specs.T+this.Specs.H, this.Specs.W+2, 2);
   this.Context.fillStyle = GREY.ASH;
   this.Context.fillRect(this.Specs.L-2, this.Specs.T-2, this.Specs.W+2, 2);
   this.Context.fillRect(this.Specs.L-2, this.Specs.T, 2, this.Specs.H+2);

   this.Update();
};
TimeLapseMeter.prototype.Update = function(flld) {
   var n;
   var hBar, gap;	//h- height

   //UNLOGGED - TEMP, but a lot of it could become permanent

   this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   this.Context.fillStyle = GREY.SILVER;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

   //Fill
   if (flld) {
      this.Filled = flld;
      if (this.Filled>1.0)
	 this.Filled = 1.0;
      hBar = this.Specs.H * this.Filled;
      this.Context.fillStyle = "red";
      this.Context.fillRect(this.Specs.L, this.Specs.T+(this.Specs.H-hBar), this.Specs.W, hBar);
   }

   //Bas-relief dividers
   gap = Math.round(this.Specs.H/4);	//NOTE: there are 3 dividers for the desired 4 sections - to be decided in Specs in the future
   for (n=1;n<4;++n) {
      this.Context.fillStyle = "white";
      this.Context.fillRect(this.Specs.L, this.Specs.T+(n*gap)-2, this.Specs.W, 2);
      this.Context.fillStyle = GREY.SILVER;
      this.Context.fillRect(this.Specs.L, this.Specs.T+(n*gap), this.Specs.W, 2);
      this.Context.fillStyle = GREY.ASH;
      this.Context.fillRect(this.Specs.L, this.Specs.T+(n*gap)+2, this.Specs.W, 2);
   }
};
