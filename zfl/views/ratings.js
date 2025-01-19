
//---------------------------------------------------------
//---------- FOOTBALL RATINGS SUB VIEW --------------------
var FootballRatingsSubView = function() {
   var ControlPanel;
   var TextWriter;
   var Roster;
};
FootballRatingsSubView.prototype = {
   Set(cPanel, tWriter) {
      this.ControlPanel = cPanel;
      this.TextWriter = tWriter;
   },
   SetRoster(rstr) {

      this.Roster = rstr;
   },
   Open() {

      //UNLOGGED

      this.DisplayRatings();
   },
   Update() {

      //UNLOGGED

   },
   Close() {

      //UNLOGGED

   },
   DisplayRatings() {

      //UNLOGGED

   }
};
