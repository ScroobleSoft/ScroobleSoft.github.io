
//Penalty Corner engine
var PenaltyCorner = function () {
   var GoalKeeper;
   var Defenders;
   var Attackers;
};
PenaltyCorner.prototype = {
   Set : function () {
      var i;

      //Create a goalkeeper and an array of 4 attackers and defenders each
      this.GoalKeeper = new GenieSprite();
//      this.Turret.Angle = 0;
      this.Defenders =  new Array();
      for (i=0;i<DEFENDERS.NUMBER;++i) {
	 this.Defenders.push(new GenieSprite());
//	 this.Defenders[i].MoveDelay = 0;
//	 this.Defenders[i].Angle = 0;
      }
      for (i=0;i<ATTACKERS.NUMBER;++i) {
	 this.Attackers.push(new GenieSprite());
//	 this.Attackers[i].MoveDelay = 0;
//	 this.Attackers[i].Angle = 0;
      }
   },
   SetSpritesAndBackgrounds : function() {
      var i
      var PngImage;
      var SpriteRect;

      //Initialize Main Sprites
      PngImage = JumpDuckImages[IMAGEINDEX.SAMI];
      GoalKeeper.Set(FootieScape.PrimeScape.Context, PngImage, 0, 0, 0, WESLEY.W, WESLEY.H);
      for (i=0;i<DEFENDERS.NUMBER;++i) {
	 this.Defenders[i].Set(FootieScape.PrimeScape.Context, PngImage, 0, 0, 0, MUSTI.W, MUSTI.H);
      }
      for (i=0;i<ATTACKERS.NUMBER;++i) {
	 this.Attackers[i].Set(FootieScape.PrimeScape.Context, PngImage, 0, 0, 0, SAMI.W, SAMI.H);
      }
   },
   DrawGameScreen : function() {
      //Draw penalty area

      //Draw players at starting positions

//      DominionScape.PrimeScape.Context.fillStyle = "lightgreen";
//      DominionScape.PrimeScape.Context.fillRect(0, 0, 480, 480);
//      DominionScape.PrimeScape.Context.fillStyle = "chartreuse";
//      DominionScape.PrimeScape.Context.fillRect(40, 40, 400, 400);
//      DominionScape.PrimeScape.Context.beginPath();
//      DominionScape.PrimeScape.Context.fillStyle = "yellow";
//      DominionScape.PrimeScape.Context.arc(240,240,200,0,2*Math.PI);
//      DominionScape.PrimeScape.Context.fill();
//      DominionScape.PrimeScape.Context.beginPath();
//      DominionScape.PrimeScape.Context.fillStyle = "red";
//      DominionScape.PrimeScape.Context.arc(240,240,120,0,2*Math.PI);
//      DominionScape.PrimeScape.Context.fill();
   },
   Start : function() {
   },
   Play : function() {
   }
};
