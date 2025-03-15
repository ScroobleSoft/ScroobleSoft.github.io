
FootballTesting.prototype.SetSideViewPitchTest = function() {

   //UNLOGGED

   this.ScreenRect.Set((PITCH.W-SCREEN.WIDTH)/2, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
};
FootballTesting.prototype.PlaySideViewPitchTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlaySideViewPitchTest.bind(this));

};
