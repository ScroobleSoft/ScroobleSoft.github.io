/*
 *  will have the option of multiple selections (by clicking CTRL), as well as a scrollbar . . . actually, left click to select, right-click to unselect
 */
//---------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, COLOUR: { FRAME: "", PAGE: "", SELECTION: "" }, SELECT: -1,
//---------- GENIE LIST BOX -------------------		  ITEM: { H: -1, COUNT: 10 }, SCROLLBAR: false, MULTIPLE: false }
var GenieListBox = function() {
   var Items;
   var SelectedItems, FirstItem;
   var ItemChangeFlag;
   var Colour;
};
GenieListBox.prototype = new GenieControl();
GenieListBox.prototype.Set = function(cnvs, specs) {
   GenieControl.prototype.Set.call(this, cnvs, specs);

   if (this.Specs.SCROLLBAR) {
      this.ScrollBar = new EmbeddedScrollBar();
      this.ScrollBar.Set(this.Context, { L: this.Specs.L-19, T: this.Specs.T, W: 19, H: this.Specs.H, ITEMS: this.Specs.ITEM.COUNT }, this);
   }
   this.Items = this.Specs.ITEMS;
   this.SelectedItems = new Array();
   if (this.Specs.SELECT)
      this.SelectedItems.push(this.Specs.SELECT);
   else
      this.SelectedItems.push(0);
   this.ItemChangeFlag = false;
};
GenieListBox.prototype.SetItems = function(itms) {  //TODO: shouldn't this be in specs?

   //UNLOGGED

   this.Items = itms;
};
GenieListBox.prototype.ClearPage = function() {

   this.Context.fillStyle = this.Specs.COLOUR || LIStBOX.COLOUR;
   this.Context.fillRect(this.Specs.L+1, this.Specs.T+1, this.Specs.W-2, this.Specs.H-2);
};
GenieListBox.prototype.Draw = function() {

   this.ClearPage();

   //Draw frame outline
   this.Context.lineWidth = 1;
   this.Context.strokeStyle = this.Specs.COLOUR.FRAME || "black";
   this.Context.strokeRect(this.Specs.L+0.5, this.Specs.T+0.5, this.Specs.W-1, this.Specs.H-1);

   this.DrawHighlightBands();

   if (this.Specs.SCROLLBAR)
      this.ScrollBar.Draw();
};
GenieListBox.prototype.Refresh = function() {

   //UNLOGGED

   this.ClearPage();
   this.DrawHighlightBands();
};
GenieListBox.prototype.ClickedOn = function() {

   //UNLOGGED

   this.i = Math.floor((Mouse.ClickY-this.Specs.T)/this.Specs.ITEM.H);
   if (this.Specs.MULTIPLE) {
      if (!this.SelectedItems.includes(this.i))
	 this.SelectedItems.push(this.i);		//NOTE: .ItemChangeFlag is irrelevant when there are multiple selections
   } else {
      if (this.SelectedItems[0]!=this.i) {
	 this.SelectedItems[0] = this.i;
	 this.ItemChangeFlag = true;
      }
   }
};
GenieListBox.prototype.CheckItemChanged = function() {

   if (this.ItemChangeFlag) {
      this.ItemChangeFlag = false;
      return (true);
   } else
      return (false);
};
GenieListBox.prototype.DrawHighlightBands = function() {

   this.Context.fillStyle = this.Specs.COLOUR.SELECTION || LIStBOX.COLOUR.SELECTION;
   for (this.i=0;this.i<this.Specs.ITEM.COUNT;++this.i)
      if (this.SelectedItems.includes(this.i))
	 this.Context.fillRect(this.Specs.L+1, this.Specs.T+1+(this.Specs.ITEM.H*this.i), this.Specs.W-2, this.Specs.ITEM.H);
};
GenieListBox.prototype.Fill = function() {

   //TODO: adds the ability to write .Items directly (indicated in specs); better yet, if there are multiple columns, formatting info could be added to specs
   //	   with .Items being a 2D array

};
