
//-------------------------------------------------------
//---------- BUFFERED GRIDDER SPRITE --------------------
var BufferedGridderSprite = function() {
   var Buffer;
   var Team;
};
BufferedGridderSprite.prototype = {
   Set() {
      this.Buffer = new GenieBuffer();
      this.Buffer.Set( { WIDTH: 286, HEIGHT: 80 } );
   },
   SetTeam(team) {

      //UNLOGGED

      this.Team = team;

      //re-colour all sprites

      //-most likely will call ::Generate here
   },
   Generate() {

      //UNLOGGED

      //-an array might be useful to draw sprites
   },
   Draw(x, y, state) {

      //UNLOGGED

   }
};

var LeftGridderSprite, RightGridderSprite;
LeftGridderSprite = new BufferedGridderSprite();
LeftGridderSprite.Set();
LeftGridderSprite.SetTeam();
RightGridderSprite = new BufferedGridderSprite();
RightGridderSprite.Set();
RightGridderSprite.SetTeam();
