
//----------------------------------------------
//---------- OFFICE FOLDERS --------------------
var OfficeFolders = function() {
	var LettersPic;
	var State, Frames;
	var FolderLetters;
	var FolderIndex, FolderPosition, FolderClicked;		//.FolderClicked an index
	var ClickRect;
};
OfficeFolders.prototype = new OfficeItem();
OfficeFolders.prototype.Set = function(cnvs, specs, lPic) {
	OfficeItem.prototype.Set.call(this, cnvs, specs);

	this.LettersPic = lPic;
	this.State = this.Specs.STATE.FILED;
	this.Frames = this.Specs.F;
	this.FolderIndex = -1;
	this.FolderPosition = 0;		//NOTE: not making it Coords type since X/Y ratio will be 1
	this.SetData();
};
OfficeFolders.prototype.SetData = function() {

	this.FolderLetters = [ [ 1,7,18,9 ],					//agriculture (agri)
								  [ 3,21,12,20,21,18,5 ],		//culture
								  [ 4,5,6,5,14,3,5 ],			//defence
								  [ 5,14,5,18,7,25 ],			//energy
								  [ 6,15,18,5,9,7,14 ],			//foreign
								  [ 8,5,1,12,20,8],				//health
								  [ 9,14,4,21,19,20,18,25 ],	//industry
								  [ 9,14,6,15 ],					//information (info)
	];
	this.ClickRect = new GenieRect();
};
OfficeFolders.prototype.Update = function() {  //UNLOGGED

	if (this.State==this.Specs.PULLING || this.State==this.Specs.FILING) {
		--this.Frames;
		if (this.Frames)
			return;
		else
			this.Frames = this.Specs.F;
	}

	switch (this.State) {
		case this.Specs.FILED:
			break;
		case this.Specs.PULLING:
			--this.FolderPosition;
			if (this.FolderPosition==this.Specs.WITHDRAWN)
				this.State = this.Specs.PULLED;
			break;
		case this.Specs.PULLED:
			break;
		case this.Specs.FILING:
			++this.FolderPosition;
			if (this.FolderPosition==0) {
				this.State = this.Specs.FILED;
				this.FolderIndex = -1;
			}
			break;
	}
};
OfficeFolders.prototype.Draw = function() {  //UNLOGGED - logos can be drawn somewhere
	var i, j;
	var x, y;

	for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
		x = this.Specs.X + (i*this.Specs.GAP);
		y = this.Specs.Y;
		if (this.FolderIndex==i) {
			x += this.FolderPosition;
			y -= this.FolderPosition;
		}
		this.Pic.Draw(x, y);
		for (j=0;j<this.FolderLetters[i].length;++j)
			this.LettersPic.DrawPatchNumber(this.FolderLetters[i][j]-1, x+3, y+73-(6*j));
	}
};
OfficeFolders.prototype.CheckClicked = function() {
	var i;

	this.FolderClicked = MINISTRY.NONE;
	for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
		this.ClickRect.Set(this.Specs.X+(this.Specs.GAP*i), 280, this.Specs.GAP, 60);
		if (SpaceUtils.CheckPointInBox(Mouse.Click, this.ClickRect)) {
			this.FolderClicked = i;
			return;
		}
	}

	//Information folder (last one) is a special case
	this.ClickRect.Set(this.Specs.X+(this.Specs.GAP*i), 280, this.Specs.GAP, 40);
	if (SpaceUtils.CheckPointInBox(Mouse.Click, this.ClickRect)) {
		this.FolderClicked = i;
		return;
	}
};
