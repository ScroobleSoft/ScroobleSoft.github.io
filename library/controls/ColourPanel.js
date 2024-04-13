
//--------------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, C: -1, R: -1, O: -1, PANEL: { W: -1, H: -1 }, SELECT: { C: -1, R: -1 },
//---------- GENIE COLOUR PANEL --------------------	       SELECTION: { COLOUR: "", LW: -1 } }
var GenieColourPanel = function() {
   var SelectedPanel, SelectedColour;		//indices
   var Colours;
   var ColourChangeFlag;
};
GenieColourPanel.prototype = new GenieControl();
GenieColourPanel.prototype.Set = function(cnvs, specs, pic) {  //NOTE: this implementation works for vertical column, horizontal row or grid table designs
   GenieControl.prototype.Set.call(this, cnvs, specs, pic);

   this.SelectedPanel = new GenieTile();
   if (this.Specs.SELECT) {
      this.SelectedPanel.C = this.Specs.SELECT.C;
      this.SelectedPanel.R = this.Specs.SELECT.R;
   } else {
      this.SelectedPanel.C = 0;
      this.SelectedPanel.R = 0;
   }
   this.SelectedColour = (this.Specs.C*this.SelectedPanel.R) + this.SelectedPanel.C;
   this.ColourChangeFlag = false;
};
GenieColourPanel.prototype.SetColours = function(aColours) {  //NOTE: a 1-dimensional array is expected

   this.Colours = aColours;
};
GenieColourPanel.prototype.Draw = function() {
   var c, r, x, y;

   for (c=0;c<this.Specs.C;++c)
      for (r=0;r<this.Specs.R;++r) {

	 //Colour
	 x = this.Specs.L + (this.Specs.PANEL.W*c) - (this.Specs.O*c);
	 y = this.Specs.T + (this.Specs.PANEL.H*r) - (this.Specs.O*r);
	 this.Context.fillStyle = this.Colours[(this.Specs.C*r)+c];
	 this.Context.fillRect(x, y, this.Specs.PANEL.W-this.Specs.O, this.Specs.PANEL.H-this.Specs.O);

	 //Selection rectangle if relevant
	 if (c==this.SelectedPanel.C && r==this.SelectedPanel.R)
	    this.GraphicsTool.DrawRectangle(x, y, this.Specs.PANEL.W, this.Specs.PANEL.H, this.Specs.SELECTION.COLOUR, this.Specs.SELECTION.LW);

	 //Frame
	 this.Pic.Draw(x, y);
      }
};
GenieColourPanel.prototype.DrawColour = function(c, r, bSelected) {
   var x, y;

   x = this.Specs.L + (this.Specs.PANEL.W*c) - (this.Specs.O*c);
   y = this.Specs.T + (this.Specs.PANEL.H*r) - (this.Specs.O*r);
   this.Context.fillStyle = this.Colours[(this.Specs.C*r)+c];
   this.Context.fillRect(x, y, this.Specs.PANEL.W-this.Specs.O, this.Specs.PANEL.H-this.Specs.O);
   if (bSelected)
      this.GraphicsTool.DrawRectangle(x, y, this.Specs.PANEL.W, this.Specs.PANEL.H, this.Specs.SELECTION.COLOUR, this.Specs.SELECTION.LW);
   this.Pic.Draw(x, y);
};
GenieColourPanel.prototype.MouseDown = function() {
   var c, r;

   c = Math.floor((Mouse.Down.X-(this.Specs.L+this.Specs.O))/(this.Specs.PANEL.W-this.Specs.O));
   r = Math.floor((Mouse.Down.Y-(this.Specs.T+this.Specs.O))/(this.Specs.PANEL.H-this.Specs.O));
   if (c!=this.SelectedColour.C || r!=this.SelectedColour.R) {
      this.DrawColour(this.SelectedPanel.C, this.SelectedPanel.R);
      this.DrawColour(c, r, SELECTED);
      this.SelectedPanel.Set(c, r);
      this.SelectedColour = (this.Specs.C*this.SelectedPanel.R) + this.SelectedPanel.C;
      this.ColourChangeFlag = true;
   }
};
GenieColourPanel.prototype.CheckColourChanged = function() {

   if (this.ColourChangeFlag) {
      this.ColourChangeFlag = false;
      return (true);
   } else
      return (false);
};
