
DominionIntroView.prototype.ShowPastControls = function() {

	this.DisableTouchBarKeys();
	this.MonthsTouchBar.Show();
	this.GenderRadioOptions.Show();
	this.OkButton.Specs.L = 285;
	this.OkButton.Specs.T = 320;
	this.CancelButton.Specs.L = 220;
	this.CancelButton.Specs.T = 320;
	this.OkButton.Show();
	this.CancelButton.Show();
};
DominionIntroView.prototype.OpenPastGamesScreen = function() {

	this.GraphicsTool.DrawRectangle(55, 55, 290, 290, this.Specs.COLOUR, 0);
	this.DisplayPastGames();
	this.ShowControls();
};
DominionIntroView.prototype.ReDrawPastGames = function() {

	this.GraphicsTool.DrawRectangle(55, 90, 292, 230, this.Specs.COLOUR, 0);
	this.GraphicsTool.DrawRectangle(55, 320, 150, 10, this.Specs.COLOUR, 0);
	this.DisplayPastGames();
};
DominionIntroView.prototype.UpdatePastControls = function() {

	this.UpdatePastOptions();
	this.UpdatePastButtons();
	this.UpdatePastMouse();
};
DominionIntroView.prototype.DisplayPastGames = function() {  //UNLOGGED - TODO: doesn't account for a different year
	var i;
	var x, y;
	var days;

	//Check if month is valid
	if (this.MonthsTouchBar.SelectedKey<Calendar.BaseMonth)
		return;

	this.PastGameIndex = 0;
	if (Calendar.BaseMonth<this.MonthsTouchBar.SelectedKey) {
		for (i=(Calendar.BaseMonth+1);i<(this.MonthsTouchBar.SelectedKey-1);++i)		//NOTE: +1 because Base Month days are counted below
			this.PastGameIndex += Calendar.MonthlyDays[i];
		this.PastGameIndex += Calendar.BaseMonthDays;
		this.FirstDayIndex = this.PastGameIndex - 1;
	} else
		this.FirstDayIndex = - Calendar.BaseMonthDay;

	this.TextWriter.SetFont("12px Arial");
	this.TextWriter.SetColour("white");

	//Determine start day
	if (Calendar.BaseMonth==this.MonthsTouchBar.SelectedKey)
		this.StartingSlot = Calendar.BaseMonthDay;
	else
		this.StartingSlot = 1;
	this.SelectedSlot = this.StartingSlot;

	//Draw valid days
	days = Calendar.MonthlyDays[this.MonthsTouchBar.SelectedKey];
	for (i=this.StartingSlot;i<=days;++i) {
		++this.PastGameIndex;
		if (i<=16) {
			x = 56;
			y = 75 + (15*i);
		} else {
			x = 201;
			y = 75 + (15*(i-16));
		}
		this.CellImage.Draw(x, y);
		if (i==this.SelectedSlot)
			this.SelectionImage.Draw(x+1, y+1);
		this.DisplayDigits(this.PastGameIndex, x, y);
		this.TextWriter.Write(Utils.GetOrdinalNumber(i), x+34, y+12);
		if (i>16)
			x += 2;
		if (this.GenderFlag==GENDER.MALE)
			this.TextWriter.Write(Game.DailyCharacters[this.PastGameIndex-1].Male.Name, x+61, y+12);
		else
			this.TextWriter.Write(Game.DailyCharacters[this.PastGameIndex-1].Female.Name, x+61, y+12);

		if (this.PastGameIndex==Game.DailyCharacters.length) {
			this.EndingSlot = i;
			break;
		}
	}

	if (i>days)
		this.EndingSlot = i - 1;

	this.TextWriter.ResetColour();
	this.TextWriter.ResetFont();
};
DominionIntroView.prototype.DisplayDigits = function(num, x, y) {
	var i;
	var nDgts;
	var dgt;

	nDgts = Math.floor(Math.log10(num)) + 1;
	x += this.Specs.NUMBERS.O[nDgts-1];
	for (i=0;i<nDgts;++i) {
		dgt = num % 10;
		MediumDigitImages.DrawPatchNumber(dgt, x+this.Specs.NUMBERS.OX, y+this.Specs.NUMBERS.OY);
		num = Math.floor(num/10);
		x -= 7;
	}
};
DominionIntroView.prototype.UpdatePastOptions = function() {

	//Touch bar
	if (this.MonthsTouchBar.CheckKeyChanged())
		this.ReDrawPastGames();

	//Gender radio options
	if (this.GenderRadioOptions.CheckClicked()) {
		if (this.GenderRadioOptions.Selected==0) {
			if (this.GenderFlag==GENDER.FEMALE) {
				this.GenderFlag = GENDER.MALE;
				this.ReDrawPastGames();
			}
		} else
			if (this.GenderFlag==GENDER.MALE) {
				this.GenderFlag = GENDER.FEMALE;
				this.ReDrawPastGames();
			}
	}
};
DominionIntroView.prototype.UpdatePastButtons = function() {

	//Ok
	if (this.OkButton.CheckClicked()) {
		this.State = this.Specs.STATE.START;
		this.PastGame = "2025-" + (this.MonthsTouchBar.SelectedKey+1) + "-" + this.SelectedSlot;
		this.MaleName = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Male.Name;
		this.MaleProfile = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Male.Profile;
		this.FemaleName = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Female.Name;
		this.FemaleProfile = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Female.Profile;
		if (this.LeaderPickedFlag==GENDER.MALE) {
			this.SelectedName = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Male.Name;
			this.SelectedProfile = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Male.Profile;
		} else if (this.LeaderPickedFlag==GENDER.FEMALE) {
			this.SelectedName = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Female.Name;
			this.SelectedProfile = Game.DailyCharacters[this.FirstDayIndex+this.SelectedSlot].Female.Profile;
		}
		this.GameInfo = new Date(this.PastGame);
		this.GameInfo = this.GameInfo.toDateString();
		this.OpenProfilesScreen();
		this.ShowControls();
	}

	//Cancel
	if (this.CancelButton.CheckClicked()) {
		this.State = this.Specs.STATE.START;
		this.OpenProfilesScreen();
		this.ShowControls();
	}
};
DominionIntroView.prototype.UpdatePastMouse = function() {

	if (Mouse.CheckLeftClicked(CANVAS.PRIME))
		this.SelectSlot();
	else if (Mouse.CheckLeftClicked(CANVAS.ZOOM))
		Mouse.ClearAll();
	else if (Mouse.CheckLeftClicked(CANVAS.CONSOLE))
		Mouse.ClearAll();
};
DominionIntroView.prototype.SelectSlot = function() {
	var i;
	var oSlot, nSlot;

	//Get slot clicked
	for (i=this.StartingSlot;i<=this.EndingSlot;++i) {
		nSlot = this.GetSlot(i);
		if (SpaceUtils.CheckPointInBox(Mouse.Click, nSlot)) {
			if (i==this.SelectedSlot)
				return;
			else
				break;
		}
	}

	//De-select old slot, select new slot
	if (i<=this.EndingSlot) {
		oSlot = this.GetSlot(this.SelectedSlot);
		this.DeselectionImage.Draw(oSlot.L+1, oSlot.T+1);
		this.SelectedSlot = i;
		this.SelectionImage.Draw(nSlot.L+1, nSlot.T+1);
	}
};
DominionIntroView.prototype.GetSlot = function(iSlot) {

	if (iSlot>16)
		return ( { L: 201, T: 75+(15*(iSlot-16)), W: 32, H: 16 } );
	else
		return ( { L: 56, T: 75+(15*iSlot), W: 32, H: 16 } );
};
DominionIntroView.prototype.DisableTouchBarKeys = function() {  //UNLOGGED - only works for current year
	var i;
	var month;
	var aKeys;

	aKeys = new Array();

	//Previous months
	for (i=0;i<Calendar.BaseMonth;++i)
		aKeys.push(i);

	//Following months
	month = this.DailyDate.getMonth();
	for (i=(month+1);i<CALENDAR.MONTHS;++i)
		aKeys.push(i);

	if (aKeys.length)
		this.MonthsTouchBar.SetDisabled(aKeys);
	else
		this.MonthsTouchBar.SetDisabled(null);
};
