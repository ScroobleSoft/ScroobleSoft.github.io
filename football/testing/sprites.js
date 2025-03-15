
FootballTesting.prototype.SetSpriteCheck = function() {
};
FootballTesting.prototype.PlaySpriteCheck = function() {

//   this.AnimationFrameHandle = requestAnimationFrame(this.PlaySpriteCheck.bind(this));

   this.Screen.fillStyle = "green";
   this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

   this.DrawSideViewSprites();
};
FootballTesting.prototype.DrawSideViewSprites = function() {
   var i;
   var x, y;

   //UNLOGGED

   for (i=0;i<6;++i)
      FrontFootballerSprite.Draw(50+(100*i), 100, i);

   for (i=0;i<6;++i)
      BackFootballerSprite.Draw(50+(100*i), 200, i);

   for (i=0;i<8;++i)
      LeftFootballerSprite.Draw(50+(100*i), 300, i);

   for (i=0;i<8;++i)
      RightFootballerSprite.Draw(50+(100*i), 400, i);
};
