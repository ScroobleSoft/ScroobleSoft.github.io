
//----------------------------------------------
//---------- OFFICE FOLDERS --------------------
var OfficeFolders = function() {
	var Specs;
	var Pic, LettersPic;
	var State, Frames;
	var FolderLetters;
	var FolderIndex, FolderPosition;
};
OfficeFolders.prototype = {
	Set(specs, pic, lPic) {
		this.Specs = specs;
		this.Pic = pic;
		this.LettersPic = lPic;
		this.State = this.Specs.STATE.FILED;
		this.Frames = this.Specs.F;
		this.FolderIndex = -1;
		this.FolderPosition = 0;		//NOTE: not making it Coords type since X/Y ratio will be 1
		this.SetData();
	},
	SetData() {

		this.FolderLetters = [ [ 1,7,18,9 ],					//agriculture (agri)
									  [ 3,21,12,20,21,18,5 ],		//culture
									  [ 4,5,6,5,14,3,5 ],			//defence
									  [ 5,14,5,18,7,25 ],			//energy
									  [ 6,15,18,5,9,7,14 ],			//foreign
									  [ 8,5,1,12,20,8],				//health
									  [ 9,14,4,21,19,20,18,25 ],	//industry
									  [ 9,14,6,15 ],					//information (info)
		];
	},
	Update() {  //UNLOGGED

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
	},
	Draw() {  //UNLOGGED - logos can be drawn somewhere
		var i, j;
		var x, y;

		for (i=0;i<MINISTRY.PORTFOLIOS;++i) {
			if (Game.CheckMobile()) {
				x = this.Specs.MOBILE.X + (i*this.Specs.GAP);
				y = this.Specs.MOBILE.Y;
			} else {
				x = this.Specs.X + (i*this.Specs.GAP);
				y = this.Specs.Y;
			}
			if (this.FolderIndex==i) {
				x += this.FolderPosition;
				y -= this.FolderPosition;
			}
			this.Pic.Draw(x, y);
			for (j=0;j<this.FolderLetters[i].length;++j)
				this.LettersPic.DrawPatchNumber(this.FolderLetters[i][j]-1, x+3, y+73-(6*j));
		}
	}
};
