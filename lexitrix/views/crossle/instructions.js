
CrossleInstructionView.prototype.DisplayInstructions = function() {
	var i;

	//Background and border
	this.Context.fillStyle = this.Specs.COLOUR.BACKGROUND;
	this.Context.fillRect(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H);
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, this.Specs.COLOUR.FRAME, 3);

	this.TextWriter.Write("Drag letters to empty tiles.", 60, 150);

	this.InstructionImages.DrawPatchNumber(0, 40, 160);
	this.InstructionImages.DrawPatchNumber(1, 190, 160);
	for (i=0;i<3;++i)
		this.TileImages.DrawPatchNumber(i, 40, 300+(50*i));
	this.TextWriter.Write("Green indicates a letter", 90, 315);
	this.TextWriter.Write("is in the right position.", 90, 330);
	this.TextWriter.Write("Yellow means it is in the right row or", 90, 365);
	this.TextWriter.Write("column, but in a different position.", 90, 380);
	this.TextWriter.Write("Red appears when the letter is not", 90, 415);
	this.TextWriter.Write("in the row or column at all.", 90, 430);

	this.InstructOkButton.Show();
};
CrossleInstructionView.prototype.PollInstructions = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PollInstructions.bind(this));

	if (this.InstructOkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.ParentView.Open();
	}
};
