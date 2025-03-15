
FootballTesting.prototype.SetMatchUpsTest = function() {
};
FootballTesting.prototype.PlayMatchUpsTest = function() {

   this.AnimationFrameHandle = requestAnimationFrame(this.PlayMatchUpsTest.bind(this));

};
