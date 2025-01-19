/*
 *	TODO: there is some Improver value matching code in REDUNDANT tradeview.js that could used, 
 */
//--------------------------------------------------------------
//----------- GRIDIRON TRADE CONSOLE VIEW ----------------------
var GridironTradeConsoleView = function() {
	var PositionTouchBar, TargetPagination;
	var CancelButton, OkButton;
	var Gridder, Target, Targets;
};
GridironTradeConsoleView.prototype = new GenieSubView();
GridironTradeConsoleView.prototype.Set = function(cnvs, specs, pView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, pView);

};
GridironTradeConsoleView.prototype.SetControls = function() {

	//Selection
	this.TargetPagination = new GeniePagination();
	this.TargetPagination.Set(this.Canvas, this.Specs.PAGINATION.TARGETS, this.Specs.PAGINATION.TARGETS.IMAGE);
	this.Controls.push(this.TargetPagination);
	this.PositionTouchBar = new GenieTouchBar();
	this.PositionTouchBar.Set(this.Canvas, this.Specs.TOUCHBAR.POSITION, this.Specs.TOUCHBAR.POSITION.IMAGE);
	this.Controls.push(this.PositionTouchBar);

	//Buttons
	this.CancelButton = new TextButton();
	this.CancelButton.Set(this.Canvas, this.Specs.BUTTON.CANCEL, this.TextWriter);
	this.CancelButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.CancelButton);
	this.OkButton = new TextButton();
	this.OkButton.Set(this.Canvas, this.Specs.BUTTON.OK, this.TextWriter);
	this.OkButton.SetCornersPic(RaisedCornerImages);
	this.Controls.push(this.OkButton);
};
GridironTradeConsoleView.prototype.SetGridder = function(grddr) {

	this.Gridder = grddr;
	this.Targets = TeamView.Team.GenerateTradeTargets(this.Gridder, this.PositionTouchBar.SelectedKey);
	this.TargetPagination.SetItems(this.Targets);
};
GridironTradeConsoleView.prototype.Open = function() {
	GenieSubView.prototype.Open.call(this);

	this.DisplayTargets();
	this.Update();
};
GridironTradeConsoleView.prototype.Update = function() {

	this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

	if (this.TargetPagination.CheckPageChanged())
		this.DisplayTargets();

	if (this.TargetPagination.CheckSelectionChanged())
		this.DisplayTargets();

	if (this.PositionTouchBar.CheckKeyChanged()) {
		this.Targets = TeamView.Team.GenerateTradeTargets(this.Gridder, this.PositionTouchBar.SelectedKey);
		this.TargetPagination.SetItems(this.Targets);
		this.TargetPagination.SelectedPage = 0;
		this.TargetPagination.SelectedItemIndex = 0;
		this.TargetPagination.Draw();
		this.DisplayTargets();
	}

	if (this.CancelButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.Close();
	}

	if (this.OkButton.CheckClicked()) {
		cancelAnimationFrame(this.AnimationFrameHandle);
		this.ConsummateTrade();
		this.Close();
	}
};
GridironTradeConsoleView.prototype.Close = function() {
	GenieSubView.prototype.Close.call(this);

	TeamView.Open();
};
GridironTradeConsoleView.prototype.Draw = function() {

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.Write("Players offered:", 5, 20, { COLOUR: "white" } );
	this.TextWriter.ResetContext();
};
GridironTradeConsoleView.prototype.DisplayTargets = function() {
	var i;
	var x, y;
	var start, end;

	this.TargetPagination.DrawPage();

	start = this.TargetPagination.SelectedPage * this.Specs.PAGINATION.TARGETS.ITEM.COUNT;
	end = start + this.Specs.PAGINATION.TARGETS.ITEM.COUNT;
	if (end>=this.Targets.Length)
		end = this.Targets.Length - 1;

	this.TextWriter.SetContext(this.Context);
	this.TextWriter.SetFont("12px Arial");

	for (i=start;i<end;++i) {
		if (i==this.Targets.Length)
			break;
		x = this.Specs.PAGINATION.TARGETS.L;
		y = this.Specs.PAGINATION.TARGETS.T + ((15*((i % this.Specs.PAGINATION.TARGETS.ITEM.COUNT)+1))-3);
		this.TextWriter.Write((i+1), x+5, y, { FONT: "12px Arial" } );
		this.TextWriter.Write(TeamAbbreviations[this.Targets[i].Team.Index],	x+25, y);
		this.TextWriter.Write(SubPositions[this.Targets[i].Position][this.Targets[i].SubPosition], x+57, y);
		this.TextWriter.Write(this.Targets[i].Name.First[0], x+87, y);
		this.TextWriter.Write(this.Targets[i].Name.Last, x+100, y);
		this.TextWriter.Write(this.Targets[i].Experience, x+168, y);
		this.TextWriter.Write(Utils.NumberToGrade(this.Targets[i].Quality), x+188, y);
		if (this.Targets[i].Potential>0)
			this.TextWriter.Write("+" + this.Targets[i].Potential, x+208, y);
		else
			this.TextWriter.Write(this.Targets[i].Potential, x+208, y);
		this.TextWriter.Write(GridderTypes[this.Targets[i].Type], x+228, y);
	}

	this.TextWriter.RestoreFont();
	this.TextWriter.ResetContext();
};
GridironTradeConsoleView.prototype.ConsummateTrade = function() {
	var team;		//trade partner
	var info;

	//First write trade info
	this.Gridder = RosterNestedView.SelectedSlot.Player;
	this.Target = this.TargetPagination.SelectedItem;
	team = this.TargetPagination.SelectedItem.Team;
	info = Positions[this.Gridder.Position] + " " + this.Gridder.Name.Last + " traded to ";
	info += TeamAbbreviations[team.Index] + " for " + Positions[this.Target.Position] + " " + this.Target.Name.Last;
	info += " " + this.Target.Experience + " " + Utils.NumberToGrade(this.Target.Quality);
	if (this.Target.Potential>0)
		info += " +" + this.Target.Potential;
	else
		info += " " + this.Target.Potential;
	alert(info);

	//Send players in opposite directions
	PlayerTeam.Roster.AddGridder(team.Roster.RemoveGridder(this.TargetPagination.SelectedItem));
	team.Roster.AddGridder(PlayerTeam.Roster.RemoveGridder(RosterNestedView.SelectedSlot.Player));
};
