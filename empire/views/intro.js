
//-------------------------------------------------
//---------- EMPIRE INTRO VIEW --------------------
var EmpireIntroView = function() {
	var AttackersTouchBar, DefendersTouchBar;
	var DailyButton, RandomButton;
	var LeftCommand, RightCommand;
};
EmpireIntroView.prototype = new GenieView();
EmpireIntroView.prototype.Set = function(cnvs, specs) {
	GenieView.prototype.Set.call(this, cnvs, specs);

	//TEMP
	this.LeftCommand = new ImperialCommand();
	this.LeftCommand.Set();
	this.RightCommand = new ImperialCommand();
	this.RightCommand.Set();
};
EmpireIntroView.prototype.SetControls = function() {  //UNLOGGED

	this.DailyButton = this.SetTextButton(this.Specs.BUTTON.DAILY, RaisedCornerImages, Text);
	this.RandomButton = this.SetTextButton(this.Specs.BUTTON.RANDOM, RaisedCornerImages, Text);
	this.AttackersTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.ATTACKERS, this.Specs.TOUChBAR.ATTACKERS.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
	this.DefendersTouchBar = this.SetTouchBar(this.Specs.TOUChBAR.DEFENDERS, this.Specs.TOUChBAR.DEFENDERS.IMAGE, ImageManager.Pics[IMAGeINDEX.CONTROLS]);
};
EmpireIntroView.prototype.Update = function() {  //UNLOGGED

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.DailyButton.CheckClicked())
		alert ("Not yet available.");

	if (this.RandomButton.CheckClicked()) {
		if ( this.AttackersTouchBar.SelectedKey==-1 || this.DefendersTouchBar.SelectedKey==-1 ) {
			alert ("Sides not selected.");
			return;
		}
		if (this.AttackersTouchBar.SelectedKey==this.DefendersTouchBar.SelectedKey) {
			alert ("Attackers and defenders can't be the same.");
			return;
		}
		this.Close(this.OpenBattleView.bind(this), 100);
	}
};
EmpireIntroView.prototype.Draw = function() {  //UNLOGGED

	Text.Write("Attackers:", 20, 30);
	Text.Write("Defenders:", 150, 30);
};
EmpireIntroView.prototype.OpenBattleView = function() {  //UNLOGGED
	var aStrpy, dStrpy;  //indices

	aStrpy = this.AttackersTouchBar.SelectedKey;
	dStrpy = this.DefendersTouchBar.SelectedKey;

	//TEMP
	Battlefield.Generate();
	BattleView.SetSatrapies(Satrapies[aStrpy], Satrapies[dStrpy]);
	BattleView.SetCommands(Satrapies[aStrpy].Army.Commands[0], Satrapies[dStrpy].Army.Commands[0]);
//	BattleView.SetRegimentTypes();
//	BattleView.SetRegimentPositions();
	BattleView.Open();
	BattleView.Update();
};
