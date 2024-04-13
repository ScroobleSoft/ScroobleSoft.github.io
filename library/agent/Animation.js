
GenieAgent.prototype.SetAnimation = function() {
   this.Animation = new function() {var Mode, State, Frames, Sequence, SequenceIndex;};		//what is Mode to be used for? could be REDUNDANT
   this.Animation.State = 0;
   this.Animation.Frames = this.Specs.ANIMATION.F || ANIMATION.F;
   if (this.Specs.ANIMATION.SEQUENCE)
      this.SetAnimationSequence();
};
GenieAgent.prototype.SetAnimationSequence = function(sqnc) {
   this.Animation.Sequence = sqnc || this.Specs.ANIMATION.SEQUENCE;
   this.Animation.SequenceIndex = 0;
   this.Animation.State = 0;
};
GenieAgent.prototype.ResetAnimation = function() {
   this.Animation.Frames = this.Specs.ANIMATION.F || ANIMATION.F;
   this.Animation.SequenceIndex = 0;
   this.Animation.State = 0;
};
GenieAgent.prototype.UpdateAnimationSequence = function() {
   ++this.Animation.SequenceIndex;
   if (this.Animation.SequenceIndex==this.Animation.Sequence.length)
      this.Animation.SequenceIndex = 0;
   this.Animation.State = this.Animation.Sequence[this.Animation.SequenceIndex];
};
GenieAgent.prototype.UpdateAnimation = function() {
   --this.Animation.Frames;
   if (!this.Animation.Frames) {
      this.Animation.Frames = this.Specs.ANIMATION.F || ANIMATION.F;
      if (this.Animation.Sequence)
	 this.UpdateAnimationSequence();
      else {
	 ++this.Animation.State;
	 if (this.Animation.State==this.Sprite.Specs.S)
	    this.Animation.State = 0;
      }
   }
};
