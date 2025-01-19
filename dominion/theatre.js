
//------------------------------------------------
//---------- DOMINION THEATRE --------------------
var DominionTheatre = function() {
   var Screen, InfoBox, ControlPanel;
   var GraphicsTool, CalcPad, TextWriter;
   var LeftNation, RightNation;
   var LeftPrimaryColour, LeftSecondaryColour, LeftTertiaryColour;
   var RightPrimaryColour, RightSecondaryColour, RightTertiaryColour;
};
DominionTheatre.prototype = new GenieView();
DominionTheatre.prototype.Set = function(cnvs, specs, iBox, cPanel, gTool, cPad, tWriter) {
   GenieView.prototype.Set.call(this, cnvs, specs);

   this.Screen = this.Context;
   this.InfoBox = iBox;
   this.ControlPanel = cPanel;
   this.GraphicsTool = gTool;
   this.CalcPad = cPad;
   this.TextWriter = tWriter;
};
DominionTheatre.prototype.SetNations = function(lNation, rNation) {

   this.LeftNation = lNation;
   this.RightNation = rNation;
   this.LeftPrimaryColour = DominionUtils.GetPrimaryColour(this.LeftNation);
   this.RightPrimaryColour = DominionUtils.GetPrimaryColour(this.RightNation);
   this.LeftSecondaryColour = DominionUtils.GetSecondaryColour(this.LeftNation);
   this.RightSecondaryColour = DominionUtils.GetSecondaryColour(this.RightNation);
   this.LeftTertiaryColour = DominionUtils.GetTertiaryColour(this.LeftNation);
   this.RightTertiaryColour = DominionUtils.GetTertiaryColour(this.RightNation);
};
