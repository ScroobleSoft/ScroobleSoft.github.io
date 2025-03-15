/*
 *  NOTE: this exists because team selected has to be skipped in panel
 */
//--------------------------------------------------------------
//---------- FOOTBALL OPPONENT BUTTON PANEL --------------------
var FootballOpponentButtonPanel = function() {
   var TeamIndex;
};
FootballOpponentButtonPanel.prototype = new GenieButtonPanel();
FootballOpponentButtonPanel.prototype.Set = function(canvas, specs, img) {
   GenieButtonPanel.prototype.Set.call(this, canvas, specs, img);

   this.TeamIndex = -1;		//NOTE: not necessary to initialize, really
};
FootballOpponentButtonPanel.prototype.SetTeam = function(tIndx) {

   this.TeamIndex = tIndx;
};
FootballOpponentButtonPanel.prototype.MouseDown = function() {
   var c, r;
   var x, y;

   this.Pressed = true;
   c = Math.floor((Mouse.Down.X-this.Specs.L)/this.Specs.BUTTON.W);
   r = Math.floor((Mouse.Down.Y-this.Specs.T)/this.Specs.BUTTON.H);
   this.ButtonPressed = (r*this.Specs.C) + c;
   if (this.ButtonPressed<this.TeamIndex)
      this.DrawButton(c, r, PRESSED);
   else {
      ++this.ButtonPressed;
      this.DrawButton(c, r+1, PRESSED);
   }

   setTimeout(this.ResetButton.bind(this), 150);
};
FootballOpponentButtonPanel.prototype.DrawButton = function(c, r, bPressed) {
   var iBtn;
   var x, y;

   //Skip drawing button of team selected
   iBtn = (r*this.Specs.C) + c;
   if (iBtn==this.TeamIndex)
      return;

   x = this.Specs.L + (c*this.Specs.BUTTON.W);
   y = this.Specs.T + (r*this.Specs.BUTTON.H);
   if (iBtn>this.TeamIndex)
      y -= this.Specs.BUTTON.H;
   if (bPressed) {
      this.Pic.DrawPatchNumber(1, x, y);
      ++x;
      ++y;
   } else
      this.Pic.DrawPatchNumber(0, x, y);
   this.ButtonPics.DrawPatchNumber(iBtn, x+this.Specs.OFFSETS.X, y+this.Specs.OFFSETS.Y);
};
