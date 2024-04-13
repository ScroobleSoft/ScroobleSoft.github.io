
//-------------------------------------------------	specs: { L: -1, T: -1, W: -1, H: -1, PANE: { L: -1, T: -1, W: -1, H: -1 }, COLOURS: [ "", "", . . . "" ],
//---------- GENIE TABBED PANES -------------------		 TABS: [-1,-1, . . . -1], SELECT: -1, BACKGROUND: "" }
var GenieTabbedPanes = function() {
   var SelectedTab;			//index
   var TabChangeFlag;
};
GenieTabbedPanes.prototype = new GenieControl();
GenieTabbedPanes.prototype.Set = function(cnvs, specs, pSpecs) {  //p- pic
   GenieControl.prototype.Set.call(this, cnvs, specs);

   this.Pic = new GenieImage();
   this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);

   this.TabChangeFlag = false;
   this.SelectedTab = this.Specs.SELECT || 0;
};
GenieTabbedPanes.prototype.Draw = function() {

   //Tabs
   this.Context.fillStyle = this.Specs.BACKGROUND;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.SpecsW, this.SpecsH);
   this.Pic.Draw(this.Specs.L, this.Specs.T);

   //Pane
   if (this.Specs.PANE) {  //make sure pane needs to be drawn
      this.Context.fillStyle = this.Specs.COLOURS[this.SelectedTab];
      this.Context.fillRect(this.Specs.PANE.L, this.Specs.PANE.T, this.Specs.PANE.W, this.Specs.PANE.H);
   }
};
GenieTabbedPanes.prototype.CheckTabChanged = function() {

   if (this.TabChangeFlag) {
      this.TabChangeFlag = false;
      return (true);
   } else
      return (false);
};
GenieTabbedPanes.prototype.MouseDown = function() {

   this.i = this.GetTab();
   if (this.i==this.SelectedTab)
	 return;

   this.TabChangeFlag = true;
   this.Draw();
};
GenieTabbedPanes.prototype.GetTab = function() {

   this.y = 0;
   for (this.i=0;this.i<this.Specs.TABS.length;++this.i) {
      this.y += this.Specs.TABS[this.i];
      if (Mouse.Click.Y<this.y)
	 return (this.i);
   }
};
