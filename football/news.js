
//-----------------------------------------------------
//---------- FOOTBALL NEWS REPORTS --------------------
var FootballNewsReports = function() {
   var Screen;		//TODO: undecided, but likely will be on bottom right of screen, or could move to Info Box
   var GraphicsTool;

   var Items;
};
FootballNewsReports.prototype = {
   Set(cntxt, gTool) {
      this.Screen = cntxt;
      this.GraphicsTool = gTool;
   },
   Update() {
      //reports on other teams' injury news and signings
   },
   Draw() {
      //basic info only, clicking on which gives more detailed info
   }
};
