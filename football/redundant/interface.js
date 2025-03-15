
//Create standard objects
var FootieScape = new GenieScape();

//Create game objects
var Sami = new GenieSprite();
var Musti = new GenieSprite();

//Add methods
FootieScape.SetInterface = function() {
   var PngImage;

   //Initialize Main Sprites
   PngImage = FootieImages[IMAGeINDEX.SAMI];
   Sami.Set(FootieScape.PrimeScape.Context, PngImage, 0, 0, 0, SAMI.W, SAMI.H);
   PngImage = FootieImages[IMAGeINDEX.MUSTI];
   Musti.Set(FootieScape.PrimeScape.Context, PngImage, 0, 0, 0, MUSTI.W, MUSTI.H);
};
FootieScape.Display = function() {
   this.PrimeScape.Context.fillStyle = "lightgrey";
   this.PrimeScape.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   FootieText.Write("Pick a team:", 150, 30, { FONT: "18px Arial" } );
   TeamButtons.forEach(function(button) {button.Display();});
};
FootieScape.DrawGameScreen = function() {
   Pitch.Draw();

   //Draw Team Sami
   Sami.Draw(80, 430, 0, 0.15);
   Sami.Draw(140, 430, 0, 0.15);
   Sami.Draw(200, 430, 0, 0.15);
   Sami.Draw(260, 430, 0, 0.15);

   //Draw Team Musti
   Musti.Draw(110, 400, 0, 0.15);
   Musti.Draw(170, 400, 0, 0.15);
   Musti.Draw(230, 400, 0, 0.15);
};
