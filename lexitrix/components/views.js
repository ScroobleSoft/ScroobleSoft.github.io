
LexiComponents.prototype.CreateTurtleViews = function() {

	TurtleView = new LexiTurtleView();
	TurtleOptionsView = new LexiTurtleOptionsView();
	TurtleStashView = new LexiTurtleStashView();
	TurtleGuideDialog = new LexiTurtleGuideDialog();
	TurtleInstructionView = new LexiTurtleInstructionView();
};
LexiComponents.prototype.SetTurtleViews = function() {

	TurtleView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	TurtleView.Set(this.Interface.PrimeScape, TURTLE);
	TurtleOptionsView.SetLinks(null, this.TextWriter);
	TurtleOptionsView.Set(this.Interface.PrimeScape, TURTLE.OPTIONS, TurtleView);
	TurtleStashView.SetLinks(this.GraphicsTool, this.TextWriter);
	TurtleStashView.Set(this.Interface.PrimeScape, TURTLE.STASH);
	TurtleGuideDialog.SetLinks(this.GraphicsTool, this.TextWriter);
	TurtleGuideDialog.Set(this.Interface.PrimeScape, TURTLE.GUIDE, TurtleView);
	TurtleInstructionView.SetLinks(this.GraphicsTool, this.TextWriter);
	TurtleInstructionView.Set(this.Interface.PrimeScape, TURTLE.INSTRUCTIONS, TurtleView);
};
LexiComponents.prototype.CreateFiddleViews = function() {

	FiddleView = new LexiFiddleView();
	FiddleOptionsView = new LexiFiddleOptionsView();
	FiddleStashView = new LexiFiddleStashView();
	FiddleGuideDialog = new LexiFiddleGuideDialog();
	FiddleInstructionView = new LexiFiddleInstructionView();
};
LexiComponents.prototype.SetFiddleViews = function() {

	FiddleView.SetLinks(this.GraphicsTool, this.TextWriter, this.Randomizer);
	FiddleView.Set(this.Interface.PrimeScape, FIDDLE);
	FiddleOptionsView.SetLinks(null, this.TextWriter);
	FiddleOptionsView.Set(this.Interface.PrimeScape, FIDDLE.OPTIONS, FiddleView);
	FiddleStashView.SetLinks(this.GraphicsTool, this.TextWriter);
	FiddleStashView.Set(this.Interface.PrimeScape, FIDDLE.STASH);
	FiddleGuideDialog.SetLinks(this.GraphicsTool, this.TextWriter);
	FiddleGuideDialog.Set(this.Interface.PrimeScape, FIDDLE.GUIDE, FiddleView);
	FiddleInstructionView.SetLinks(this.GraphicsTool, this.TextWriter);
	FiddleInstructionView.Set(this.Interface.PrimeScape, FIDDLE.INSTRUCTIONS, FiddleView);
};
