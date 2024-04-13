/*
 *  TODO: at the moment only image based tabs are being implemented - option has to be there for ones that are created from text labels (like the original)
 *	  not sure about LOGGING since this is a total re-write
 *  TODO: using one .FirstItem for all tabs (re-setting a closed one to 0), but should a separate one for each
 *
 */
//-----------------------------------------	specs: { L: -1, T: -1, W: -1, H: -1, TAB: { W: -1, H: -1 }, PAGE: { W: -1, H: -1 }, COLOUR: { TAB: "", PAGE: "" },
//---------- GENIE TABS -------------------		 SELECT: -1, LISTS: true, ITEM: { H: -1, COUNT: 10 }, TABS: -1, SCROLLBAR: false }
var GenieTabs = function() {
   var ScrollBar;
   var SelectedTab;			//index
   var FirstItem, SelectedItem;		//indices - .FirstItem indicated first item displayed, and not first in list
   var ItemLists;			//NOTE: this is used optionally for when tabs display lists of info
   var TabChangeFlag, ItemChangeFlag;
   var TabColour, PageColour;
};
GenieTabs.prototype = new GenieControl();
GenieTabs.prototype.Set = function(cnvs, specs, pSpecs) {  //p- pic
   GenieControl.prototype.Set.call(this, cnvs, specs);

   this.Pic = new GenieImage();
   this.Pic.Set(this.Context, ImageManager.Pics[IMAGeINDEX.CONTROLS], pSpecs);
   if (this.Specs.SCROLLBAR) {
      this.ScrollBar = new EmbeddedScrollBar();
      this.ScrollBar.Set(this.Context, { L: this.Specs.L+this.Specs.PAGE.W, T: this.Specs.T+this.Pic.Specs.H, W: 19, H: this.Specs.PAGE.H,
			  ITEMS: this.Specs.ITEM.COUNT }, this);
   }

   this.ItemChangeFlag = false;
   this.TabChangeFlag = false;
   this.SelectedTab = this.Specs.SELECT || 0;

   if (this.Specs.LISTS) {
      this.FirstItem = 0;
      this.SelectedItem = 0;
      this.ItemLists = new Array(this.Specs.TABS);
   }

   if (this.Specs.COLOUR) {
      this.TabColour = this.Specs.COLOUR.TAB;
      this.PageColour = this.Specs.COLOUR.PAGE;
   } else {
      this.TabColour = TABS.COLOUR.TAB;
      this.PageColour = TABS.COLOUR.PAGE;
   }
};
GenieTabs.prototype.SetLists = function(aLists) {

   for (indx=0;indx<aLists.length;++indx)		//NOTE: number of lists passed in must match number expected
      this.ItemLists[indx] = aLists[indx];
};
GenieTabs.prototype.Draw = function() {

   //Draw frame outline
   this.Context.lineWidth = 1;
   this.Context.strokeStyle = "black";			//NOTE: no colour options being provided right now
   this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+this.Pic.Specs.H-0.5, this.Specs.PAGE.W-1, this.Specs.PAGE.H);

   this.ClearPage();

   this.DrawTabStrip();
   if (this.Specs.SCROLLBAR)
      this.ScrollBar.Draw();
};
GenieTabs.prototype.CheckTabChanged = function() {

   if (this.TabChangeFlag) {
      this.TabChangeFlag = false;
      return (true);
   } else
      return (false);
};
GenieTabs.prototype.ClearPage = function() {

   this.Context.fillStyle = this.PageColour;
   this.Context.fillRect(this.Specs.L+1, this.Specs.T+this.Pic.Specs.H, this.Specs.PAGE.W-2, this.Specs.PAGE.H-1);
};
GenieTabs.prototype.MouseDown = function() {

   if (this.Pic.CheckMouseDown()) {
      this.i = this.GetTab();
      if (this.i==-1)
	 return;
      else if (this.i!=this.SelectedTab) {
	 this.SelectedTab = this.i;
	 this.FirstItem = 0;
	 this.SelectedItem = 0;
	 this.TabChangeFlag = true;
	 this.ClearPage();
      }
   } else
      if (this.ScrollBar)
	 if (SpaceUtils.CheckPointInBox(Mouse.Down, this.ScrollBar.Specs))
	    this.ScrollBar.MouseDown();
   Mouse.Downed = false;
};
GenieTabs.prototype.CheckClicked = function() {		//TODO: check to see if if this is now REDUNDANT

   if (this.Pic.CheckClicked() || this.ScrollBar.CheckClicked())
      return;

   return (GenieControl.prototype.CheckClicked.call(this));
};
GenieTabs.prototype.ClickedOn = function() {

   if (this.Pic.CheckClicked() || this.ScrollBar.CheckClicked())
      return;

   if (this.Specs.LISTS) {
      this.i = Math.floor((Mouse.ClickY-(this.Specs.T+this.Pic.Specs.H))/this.Specs.ITEM.H);
      if (this.SelectedItem!=(this.i+this.FirstItem)) {
//	 this.SelectedItem = this.FirstItem + this.i;
	 this.SelectedItem = this.i;				//NOTE: this was a BUG that is hopefully now fixed
	 this.ItemChangeFlag = true;
      }
   }
};
GenieTabs.prototype.CheckItemChanged = function() {
   if (this.ItemChangeFlag) {
      this.ItemChangeFlag = false;
      return (true);
   } else
      return (false);
};
GenieTabs.prototype.GetTab = function() {

   return (Math.floor((Mouse.Down.X-(this.Specs.L+1))/(this.Specs.TAB.W+1)));
};
GenieTabs.prototype.DrawTabStrip = function() {

   this.Context.fillStyle = this.TabColour;
   this.Context.fillRect(this.Specs.L, this.Specs.T+1, this.Pic.Specs.W, this.Pic.Specs.H-2);
   this.Context.fillStyle = this.PageColour;
   this.x = (this.SelectedTab*(this.Specs.TAB.W+1)) + 1;
   this.Context.fillRect(this.Specs.L+this.x, this.Specs.T+1, this.Specs.TAB.W, this.Specs.TAB.H);
   this.Pic.Draw(this.Specs.L, this.Specs.T);
   this.Context.fillRect(this.Specs.L+this.x, this.Specs.T+this.Specs.TAB.H, this.Specs.TAB.W, 2);
};
