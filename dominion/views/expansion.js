
//-------------------------------------------------------
//---------- DOMINION EXPANSION VIEW --------------------  REDUNDANT?
var DominionExpansionView = function() {
   var Screen;
   var Nation;
   var PrimaryColour, SecondaryColour, TertiaryColour;

   var i;
};
DominionExpansionView.prototype = new GenieView();
DominionExpansionView.prototype.Set = function(cnvs, specs) {
   GenieView.prototype.Set.call(this, cnvs, specs);

   this.Screen = this.Context;
};
DominionExpansionView.prototype.Open = function() {

   //UNLOGGED

   this.Screen.fillStyle = "rgb(175,175,255)";
   this.Screen.fillRect(SCREEN.WIDTH/2, 0, SCREEN.WIDTH/2, SCREEN.HEIGHT/2);
   Map.DrawHalf(0.5);
};
DominionExpansionView.prototype.Update = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

   this.UpdateMouseMouse();	//this will not be called if a nation is clicked on
   this.UpdateMouseClick();
};
DominionExpansionView.prototype.Close = function() {
};
DominionExpansionView.prototype.SetNation = function(nation) {

   this.Nation = nation;
   this.PrimaryColour = DominionUtils.GetPrimaryColour(nation);
   this.SecondaryColour = DominionUtils.GetSecondaryColour(nation);
   this.TertiaryColour = DominionUtils.GetTertiaryColour(nation);
};
