
//-----------------------------------------------
//---------- INFO DIALOG BOX --------------------  //ASSUMPTION: an Ok button already exists
var InfoDialogBox = function() {
   var Info, Code;
   var View;
   var AnimationFrameHandle;
};
InfoDialogBox.prototype = new GenieDialogBox();
InfoDialogBox.prototype.Set = function(specs, cntxt, gTool, tWriter) {
   GenieDialogBox.prototype.Set.call(this, specs, cntxt, gTool, tWriter);

   if (this.Specs.INFO)
      this.SetInfo(this.Specs.INFO);
};
InfoDialogBox.prototype.SetInfo = function(info) {

   //UNLOGGED

   this.Info = this.Specs.INFO;
   this.DetermineDimensions();
};
InfoDialogBox.prototype.Launch = function(view, code) {

   //UNLOGGED - TEMP, only for Capture-Testing-speed

   this.View = view;
   this.Code = code;
   OkButton.Specs.L = this.Specs.L + ((this.Specs.W - OkButton.Specs.W)/2);
   OkButton.Specs.T = this.Specs.T + this.Specs.H - 30;
   this.Context.clearRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
   this.Context.strokeStyle = "black";
   this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W-1, this.Specs.H-1);
   this.DisplayText();
   OkButton.Show();
};
InfoDialogBox.prototype.DetermineDimensions = function() {
   var i;
   var w1, w2;

   //UNLOGGED

   //Determine box width
   w1 = 0;
   for (i=0;i<this.Info.length;++i) {
      w2 = this.Context.measureText(this.Info[i]).width;
      w1 = Math.max(w1, w2);
   }

   //Set dimensions
   this.Specs.W = w1;
   this.Specs.H = 15*this.Info.length;
   this.Specs.W += 20;		//padding
   this.Specs.H += 40;
   this.Specs.L = Math.round((SCREEN.WIDTH-this.Specs.W)/2);
   this.Specs.T = (SCREEN.HEIGHT-this.Specs.H)/2;
};
InfoDialogBox.prototype.DisplayText = function() {
   var i;

   //UNLOGGED

   for (i=0;i<this.Specs.INFO.length;++i)
      this.TextWriter.Write(this.Specs.INFO[i], this.Specs.L+10, this.Specs.T+(15*i)+25);
};
InfoDialogBox.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

   if (OkButton.CheckClicked()) {
      cancelAnimationFrame(this.AnimationFrameHandle);
      this.View.DialogBoxClosed(this.Code);
   }
};
