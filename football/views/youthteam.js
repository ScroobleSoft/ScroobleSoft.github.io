
//-----------------------------------------------
//---------- YOUTH TEAM VIEW --------------------
var YouthTeamView = function() {
	var Screen;
	var GraphicsTool;
	var TextWriter;

	var Academy;
};
YouthTeamView.prototype = {
	Set(cntxt, gTool, tWriter) {
		this.Screen = cntxt;
		this.GraphicsTool = gTool;
		this.TextWriter = tWriter;
	},
	SetAcademy(acdmy) {

		this.Academy = acdmy;
	},
	Open() {

		this.DisplayPlayersInfo();
		PromoteButton.Show();		  //enabled/disabled depending on player selected and availability of corresponding slot
	},
	Update() {
	},
	Close() {
	},
	DisplayPlayersInfo() {
		var i;

		for (i=0;i<this.Academy.Players.length;++i) {
			this.TextWriter.Write(this.Academy.Players[i].Name.GetFullName(), 420, 40+(15*(i+1)), { FONT: "12px Arial", COLOUR: "white" } );	//HARD-CODING
			this.TextWriter.Write(this.Academy.Players[i].Age, 600, 40+(15*(i+1)), { FONT: "12px Arial", COLOUR: "white" } );
			this.TextWriter.Write(Positions[this.Academy.Players[i].Position], 630, 40+(15*(i+1)), { FONT: "12px Arial", COLOUR: "white" } );
			this.TextWriter.Write(Utils.NumberToGrade(this.Academy.Players[i].Quality), 670, 40+(15*(i+1)), { FONT: "12px Arial", COLOUR: "white" } );
		}
	}
};
