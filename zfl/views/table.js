
//---------------------------------------------------
//---------- GRIDIRON TABLE VIEW --------------------
var GridironTableView = function() {
   var GraphicsTool, TextWriter;
   var ConsoleScape;

   var DraftRewindButton, DraftForwardButton;

   var ColumnNumber, ColumnChangeFlag;		//.ColumnNumber is left-most drawn column
};
GridironTableView.prototype = new GenieView();
GridironTableView.prototype.Set = function(cnvs, specs,gTool, tWriter) {
   GenieView.prototype.Set.call(this, cnvs, specs);

   this.GraphicsTool = gTool;
   this.TextWriter = tWriter;

   this.ColumnNumber = 0;
};
GridironTableView.prototype.SetSubViews = function() {

   this.InfoView = GridderInfoView;
};
GridironTableView.prototype.SetControls = function() {

   this.DraftRewindButton = new ImageButton();
   this.DraftRewindButton.Set(this.Canvas, DRAFtREWINdBUTTON, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
   this.DraftForwardButton = new ImageButton();
   this.DraftForwardButton.Set(this.Canvas, DRAFtFORWARdBUTTON, ImageManager.Pics[IMAGeINDEX.CONTROLS]);

   this.Controls.push(this.DraftRewindButton);
   this.Controls.push(this.DraftForwardButton);
};
GridironTableView.prototype.Open = function() {

   this.Context.fillStyle = this.Specs.COLOUR.BORDER;
   this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   this.DrawTable();
};
GridironTableView.prototype.Update = function() {

   if (!this.DraftRewindButton.Enabled && !this.DraftForwardButton.Enabled)
      return;

   //Rewind button
   if (this.DraftRewindButton.CheckClicked()) {
      --this.ColumnNumber;
      if (this.ColumnNumber==0)
	 this.DraftRewindButton.Disable();
      if (this.ColumnNumber==(this.Specs.COLUMN.COUNT-5))
	 this.DraftForwardButton.Enable();
      this.ColumnChangeFlag = true;
	 this.DisplayProspects();
   }

   //Forward button
   if (this.DraftForwardButton.CheckClicked()) {
      ++this.ColumnNumber;
      if (this.ColumnNumber==(this.Specs.COLUMN.COUNT-4))
	 this.DraftForwardButton.Disable();
      if (this.ColumnNumber==1)
	 this.DraftRewindButton.Enable();
      this.ColumnChangeFlag = true;
	 this.DisplayProspects();
   }
};
GridironTableView.prototype.ShowControls = function() {

   this.DraftRewindButton.Show();
   this.DraftForwardButton.Show();
};
GridironTableView.prototype.DrawTable = function() {

   this.GraphicsTool.DrawRectangle(VIEW.TABLE.L-3, VIEW.TABLE.T-3, VIEW.TABLE.W+6, VIEW.TABLE.H+6, "black", 3);
   this.ClearTable();
};
GridironTableView.prototype.ClearTable = function() {
   var i;

   this.Context.fillStyle = this.Specs.COLOUR.PANES;
   this.Context.fillRect(VIEW.TABLE.L, VIEW.TABLE.T, VIEW.TABLE.W, VIEW.TABLE.H);

   //Dividers
   for (i=1;i<4;++i)
      this.GraphicsTool.DrawVerticalLine( { X: VIEW.TABLE.L+(VIEW.TABLE.COLUMN.W*i), Y: VIEW.TABLE.T }, VIEW.TABLE.H, "black", 1);
};
GridironTableView.prototype.CheckColumnChanged = function() {

   if (this.ColumnChangeFlag) {
      this.ColumnChangeFlag = false;
      return (true);
   }

   return (false);
};
