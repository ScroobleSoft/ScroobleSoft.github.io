
//--------------------------------------------------------	specs: { L: -1, T: -1, W: -1, H: -1, TABS: -1, PAGE: { W: -1, H: -1 }, COLOURS: [], SCROLLBAR: false,
//---------- GENIE MULTI COLOURED TABS -------------------		 SELECT: -1, LISTS: true, ITEM: { H: -1, COUNT: 10 }, TAB: [] }
var GenieMultiColouredTabs = function() {
};
GenieMultiColouredTabs.prototype = new GenieTabs();
GenieMultiColouredTabs.prototype.Set = function(cnvs, specs, pSpecs) {  //p- pic
   GenieTabs.prototype.Set.call(this, cnvs, specs, pSpecs);

};
GenieMultiColouredTabs.prototype.GetTab = function() {  //NOTE: returns index

   for (this.i=0;this.i<this.Specs.TABS;++this.i)
      if (Mouse.Down.X<(this.Specs.L+this.Specs.TAB[this.i]))
	 return (this.i);
};
GenieMultiColouredTabs.prototype.ClearPage = function() {

   this.Context.fillStyle = this.Specs.COLOURS[this.SelectedTab];
   this.Context.fillRect(this.Specs.L, this.Specs.T+this.Pic.Specs.H, this.Specs.PAGE.W, this.Specs.PAGE.H);
};
