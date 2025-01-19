
//----------------------------------------------------------------
//----------- GRIDIRON PROJECTS DIALOG VIEW ----------------------
var GridironProjectsDialogView = function() {
	var YesButton, NoButton;
	var SelectionOrder;
};
GridironProjectsDialogView.prototype = new GenieDialogView();
GridironProjectsDialogView.prototype.Set = function(cnvs, specs, pView) {
	GenieDialogView.prototype.Set.call(this, cnvs, specs, pView);

	this.SelectionOrder = new Array(LEAGUE.TEAMS);
	this.State = 0;
};
GridironProjectsDialogView.prototype.SetControls = function() {

	this.YesButton = new TextButton();
	this.YesButton.Set(this.Canvas, this.Specs.BUTTON.YES, this.TextWriter);
	this.YesButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.YesButton);

	this.NoButton = new TextButton();
	this.NoButton.Set(this.Canvas, this.Specs.BUTTON.NO, this.TextWriter);
	this.NoButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.NoButton);

	this.OkButton = new TextButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.OkButton.SetCornersPic(RoundedCornerImages);
	this.Controls.push(this.OkButton);
};
GridironProjectsDialogView.prototype.ShowControls = function() {

	this.YesButton.Show();
	this.NoButton.Show();
};
GridironProjectsDialogView.prototype.Open = function() {
	GenieDialogView.prototype.Open.call(this);

	this.Update();
};
GridironProjectsDialogView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	switch (this.State) {
		case 0:
			if (this.YesButton.CheckClicked()) {
				this.SignProjects();
				this.DisplayProjects();
				++this.State;
			}
			if (this.NoButton.CheckClicked())
				this.Close(this.OpenDraftView.bind(this), 100);
			break;
		case 1:
			if (this.OkButton.CheckClicked())
				this.Close(this.OpenDraftView.bind(this), 100);
	}
};
GridironProjectsDialogView.prototype.Draw = function() {

	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);
	this.TextWriter.Write("Do you want to sign Project players?", 136, 225, { FONT: "bold 14pt Arial" } );
};
GridironProjectsDialogView.prototype.SetSelectionOrder = function(aTeams) {
	var i;

	for (i=LEAGUE.TEAMS;i>0;--i)
		this.SelectionOrder[LEAGUE.TEAMS-i] = aTeams[i-1].Index;
};
GridironProjectsDialogView.prototype.SignProjects = function() {  //TODO: (possibly) added logic of teams possibly picking for projected need
	var i, j;
	var nRounds;
	var nExtras;
/*
	nRounds = Math.ceil(this.ParentView.Draft.Projects.length/LEAGUE.TEAMS);
	nExtras = this.ParentView.Draft.Projects.length % LEAGUE.TEAMS;
	for (i=LEAGUE.TEAMS-1;i>0;--i)
		for (j=0;j<nRounds;++j) {
			if (i<(LEAGUE.TEAMS-nExtras) && j==(nRounds-1))
				continue;

			//TODO: Projects of same quality need to be shuffled since they are being bunched by position, particularly at the top
			//		a facility to sort a section of an array will be needed, or present ::Shuffle method will have to be enhanced
			//		 actually, the 'bunching' may be a coincidence since values of projects tend to be different - have to run a
			//		 few drafts and examine lists via debugger

			Teams[this.SelectionOrder[i]].Roster.AddGridder(this.ParentView.Draft.Projects.shift());
		}
*/
	nRounds = Math.ceil(Draft.Projects.length/LEAGUE.TEAMS);
	for (i=0;i<nRounds;++i)
		for (j=0;j<LEAGUE.TEAMS;++j) {
			Teams[this.SelectionOrder[j]].Roster.AddGridder(Draft.Projects.shift());
			if (Draft.Projects.length==0)
				return;
		}
};
GridironProjectsDialogView.prototype.DisplayProjects = function() {
	var i, j;
	var nPrjcts;
	var name;

	this.YesButton.Hide();
	this.NoButton.Hide();
	this.ColourScape();
	this.GraphicsTool.DrawRectangle(this.Specs.L, this.Specs.T, this.Specs.W, this.Specs.H, "white", 3);
	this.TextWriter.Write("Projects signed:", 228, 225, { FONT: "bold 14pt Arial" } );

	nPrjcts = 0;
	for (i=0;i<PlayerTeam.Roster.Gridders.length;++i)
		for (j=0;j<PlayerTeam.Roster.Gridders[i].length;++j)
			if (PlayerTeam.Roster.Gridders[i][j].Type==GRIDDER.TYPE.PROJECT) {
				this.TextWriter.Write(Positions[PlayerTeam.Roster.Gridders[i][j].Position], 120, 265+(20*nPrjcts));
				name = PlayerTeam.Roster.Gridders[i][j].Name.GetFullName();
				if (StringUtils.GetTextWidth(name, null, this.Context)>170) {
					name = PlayerTeam.Roster.Gridders[i][j].Name.First[0] + " ";
					name += PlayerTeam.Roster.Gridders[i][j].Name.Last;
				}
				this.TextWriter.Write(name, 145, 265+(20*nPrjcts));
				this.TextWriter.Write(Utils.NumberToGrade(PlayerTeam.Roster.Gridders[i][j].Quality), 320, 265+(20*nPrjcts));
				this.TextWriter.Write("+"+PlayerTeam.Roster.Gridders[i][j].Potential, 340, 265+(20*nPrjcts));
				++nPrjcts;
			}

	this.OkButton.Show();
};
GridironProjectsDialogView.prototype.OpenDraftView = function() {

	this.ParentView.State = VIEW.DRAFT.CAMP;
	this.ParentView.Open();
};
