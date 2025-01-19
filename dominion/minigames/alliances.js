
DominionMiniGames.prototype.SetBasicAlliances = function() {

	this.AllianceTurns = 0;
	this.DisplayBasicAlliances();
	this.SetAllianceControls();
	this.DisplayAlliancesInfo();  //REDUNDANT
};
DominionMiniGames.prototype.PlayBasicAlliances = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.PlayBasicAlliances.bind(this));

	if (this.AllianceTurnButton.CheckClicked())
		this.ExecuteAllianceTurn();
};
DominionMiniGames.prototype.SetAllianceControls = function() {

	this.ControlPanel.fillStyle = GREY.LIGHT;
	this.ControlPanel.fillRect(0, 0, CONTROlPANEL.WIDTH, CONTROlPANEL.HEIGHT);
	this.ALLIANCeTURnBUTTON = { L: 5, T: 5, W: 40, H: 20, LW: 3, LABEL: "Turn", COLOUR: GREY.ASH, STYLE: BUTTON.STYLE.RAISED };
	this.AllianceTurnButton = new TextButton();
	this.AllianceTurnButton.Set(DominionScape.Console, this.ALLIANCeTURnBUTTON, this.TextWriter);
	this.AllianceTurnButton.SetCornersPic(RaisedCornerImages);
	this.AllianceTurnButton.Show();
};
DominionMiniGames.prototype.DisplayAlliancesInfo = function() {  //REDUNDANT

	//UNLOGGED

	this.InfoBox.clearRect(0, 0, INFoBOX.WIDTH, INFoBOX.HEIGHT);
	this.TextWriter.SwitchContext(CANVAS.ZOOM);

	this.TextWriter.Write("Simple simulation of rivals building", 5, 20);
	this.TextWriter.Write("alliances in response to Tomcat's", 5, 35);
	this.TextWriter.Write("expansion.", 5, 50);

	this.TextWriter.RestoreContext();
};
DominionMiniGames.prototype.DisplayBasicAlliances = function() {

	this.Screen.fillStyle = GREY.LIGHT;
	this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

	this.num = 0;
	for (this.i=0;this.i<POWER.COUNT;++this.i) {
		this.TextWriter.Write(PowerNames[this.i]+":", 5, 20+(15*this.i));
		this.TextWriter.Write(Powers[this.i].Alliances.length, 105, 20+(15*this.i));
		this.num += Powers[this.i].Alliances.length;
	}
	this.TextWriter.Write("Total Alliances:", 5, 170);
	this.TextWriter.Write(this.num, 105, 170);
	this.TextWriter.Write("Turns:", 5, 200);
	this.TextWriter.Write(this.AllianceTurns, 80, 200);
};
DominionMiniGames.prototype.ExecuteAllianceTurn = function() {

	for (this.i=0;this.i<(POWER.COUNT-1);++this.i)
		Powers[this.i].Update();
	Powers[POWER.TOMCAT].ForgeAlliance();
	++this.AllianceTurns;
	this.DisplayBasicAlliances();
};
