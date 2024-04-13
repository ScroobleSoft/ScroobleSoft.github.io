
//--------------------------------------------------
//---------- GENIE FRAMES METER --------------------
var GenieFramesMeter = function() {
	var StampIndex;
	var Start, Stop;
	var Intervals;		//array of time lapses
	var Millisecs;

	var x2;				//scratch variable
};
GenieFramesMeter.prototype = new GenieGauge();
GenieFramesMeter.prototype.Set = function(canvas, specs) {
	GenieGauge.prototype.Set.call(this, canvas, specs);

	this.Intervals = new Array(this.Specs.F || 60);
	this.Intervals.fill(0);
	this.StampIndex = 0;
};
GenieFramesMeter.prototype.StartTimer = function() {

	this.Start = performance.now();
};
GenieFramesMeter.prototype.StopTimer = function() {

	this.Stop = performance.now();
};
GenieFramesMeter.prototype.Update = function() {

	//Add to array
	this.Intervals[this.StampIndex] = this.Stop - this.Start;
	++this.StampIndex;
	if (this.StampIndex==this.Intervals.length)
		this.StampIndex = 0;

	//Calculate average time lapse
	this.Millisecs = 0;
	for (this.i=0;this.i<this.Intervals.length;++this.i) {
		if (this.Intervals[this.i]==0)
			break;
		this.Millisecs += this.Intervals[this.i];
	}
	if (this.i)
		this.Millisecs /= this.i;

	GenieGauge.prototype.Update.call(this, this.Millisecs/16);
};

GenieFramesMeter.prototype.Draw = function() {
	GenieGauge.prototype.Draw.call(this);

	//Draw index markers and write labels
	this.GraphicsTool.SwitchContext(this.Context);
	this.TextWriter.SetContext(this.Context);
	this.x = this.Specs.L + this.Specs.W + 5;
	this.y = this.Specs.T;
	this.x2 = this.Specs.L + this.Specs.W + 20;
	for (this.i=0;this.i<4;++this.i) {
		this.GraphicsTool.DrawLine( { X: this.x, Y: this.y }, { X: this.x2, Y: this.y }, "black", 1);	
		this.TextWriter.Write(4*(4-this.i), this.x, this.y+13);
		this.y += this.Specs.H/4;
	}
	this.GraphicsTool.RestoreContext();
	this.TextWriter.RestoreContext();
};
GenieFramesMeter.prototype.Hide = function() {
	GenieGauge.prototype.Hide.call(this);

	this.Context.clearRect(this.Specs.L+this.Specs.W, this.Specs.T-1, 25, this.Specs.H+2);  //erase labels and markers
};
