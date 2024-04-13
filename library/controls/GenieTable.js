
//  NOTE: TEXT.OFFSETS are required
//-------------------------------------------  specs: { L: -1, T: -1, W: -1, H: -1, C: -1, R: -1, CELL: { W: -1, H: -1 }, SELECT: { C: -1, R: -1 }, FONT: "",
//---------- GENIE TABLE --------------------		TEXT: { OFFSETS: { X: -1, Y: -1 } }, COLOUR: { BACKGROUND: "", SELECTION: "" } };
var GenieTable = function() {
   var SelectedCell, SelectedEntry;
   var Entries;
   var CellChangeFlag;
};
GenieTable.prototype = new GenieControl();
GenieTable.prototype.Set = function(cnvs, specs, pic) {  //NOTE: pic has 'pressed' and 'unpressed' patches, images looking like button outlines
   GenieControl.prototype.Set.call(this, cnvs, specs, pic);

   this.SelectedCell = new GenieTile();
   if (this.Specs.SELECT) {
      this.SelectedCell.C = this.Specs.SELECT.C;
      this.SelectedCell.R = this.Specs.SELECT.R;
   } else {
      this.SelectedCell.C = 0;
      this.SelectedCell.R = 0;
   }
   this.SelectedEntry = (this.Specs.R*this.SelectedCell.C) + this.SelectedCell.R;
   this.CellChangeFlag = false;
};
GenieTable.prototype.SetEntries = function(entries) {

   this.Entries = entries;
};
GenieTable.prototype.Draw = function() {
   var c, r, x, y;

   this.Context.fillStyle = this.Specs.COLOUR.BACKGROUND;
   this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);

   this.TextWriter.SetContext(this.Context);

   //Buttons
   for (c=0;c<this.Specs.C;++c)
      for (r=0;r<this.Specs.R;++r) {

	 //Outline
	 x = this.Specs.L + (c*this.Specs.CELL.W);
	 y = this.Specs.T + (r*this.Specs.CELL.H);
	 if (c==this.SelectedCell.C && r==this.SelectedCell.R) {
	    this.Context.fillStyle = this.Specs.COLOUR.SELECTION;
	    this.Context.fillRect(x, y, this.Specs.CELL.W, this.Specs.CELL.H);
	    this.Pic.DrawPatchNumber(1, x, y);
	    ++x;
	    ++y;
	 } else
	    this.Pic.DrawPatchNumber(0, x, y);

	 //Entry label
	 x += this.Specs.TEXT.OFFSETS.X;
	 y += this.Specs.TEXT.OFFSETS.Y;
	 this.TextWriter.Write(this.Entries[(this.Specs.R*c)+r], x, y, this.Specs.TEXT);
      }

   this.TextWriter.RestoreContext();
};
GenieTable.prototype.DrawEntry = function(c, r, bPressed) {
   var x, y;

   //Button
   x = this.Specs.L + (c*this.Specs.CELL.W);
   y = this.Specs.T + (r*this.Specs.CELL.H);
   if (bPressed) {
      this.Context.fillStyle = this.Specs.COLOUR.SELECTION;
      this.Context.fillRect(x, y, this.Specs.CELL.W, this.Specs.CELL.H);
      this.Pic.DrawPatchNumber(1, x, y);
      x += this.Specs.TEXT.OFFSETS.X + 1;
      y += this.Specs.TEXT.OFFSETS.Y + 1;
   } else {
      this.Context.fillStyle = this.Specs.COLOUR.BACKGROUND;
      this.Context.fillRect(x, y, this.Specs.CELL.W, this.Specs.CELL.H);
      this.Pic.DrawPatchNumber(0, x, y);
      x += this.Specs.TEXT.OFFSETS.X;
      y += this.Specs.TEXT.OFFSETS.Y;
   }

   //Text
   this.TextWriter.SetContext(this.Context);
   this.TextWriter.Write(this.Entries[(this.Specs.R*c)+r], x, y, this.Specs.TEXT);
   this.TextWriter.RestoreContext();
};
GenieTable.prototype.MouseDown = function() {
   var c, r;

   c = Math.floor((Mouse.Down.X-this.Specs.L)/this.Specs.CELL.W);
   r = Math.floor((Mouse.Down.Y-this.Specs.T)/this.Specs.CELL.H);
   if (c!=this.SelectedCell.C || r!=this.SelectedCell.R) {
      this.DrawEntry(this.SelectedCell.C, this.SelectedCell.R);
      this.DrawEntry(c, r, PRESSED);
      this.SelectedCell.Set(c, r);
      this.SelectedEntry = (this.Specs.R*this.SelectedCell.C) + this.SelectedCell.R;
      this.CellChangeFlag = true;
   }
};
GenieTable.prototype.CheckCellChanged = function() {

   if (this.CellChangeFlag) {
      this.CellChangeFlag = false;
      return (true);
   } else
      return (false);
};
