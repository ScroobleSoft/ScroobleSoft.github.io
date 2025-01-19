
//-------------------------------------------------
//---------- OFFICE FOLDER SET --------------------
var OfficeFolderSet = function() {
   var Status;  //FILED, PULLING, PULLED, FILING
   var Frames;
   var FolderIndex;
   var FolderPosition;
};
OfficeFolderSet.prototype = {
   Set() {
      this.Status = FOLDERS.FILED;
      this.Frames = FOLDERS.F;
      this.FolderIndex = -1;
      this.FolderPosition = 0;		//NOTE: not making it Coords type since X/Y ratio will be 1
   },
   Update() {

      //UNLOGGED - UNTESTED

      if (this.Status==FOLDERS.PULLING || this.Status==FOLDERS.FILING) {
	 --this.Frames;
	 if (this.Frames)
	    return;
	 else
	    this.Frames = FOLDERS.F;
      }

      switch (this.Status) {
	 case FOLDERS.FILED:
	    break;
	 case FOLDERS.PULLING:
	    --this.FolderPosition;
	    if (this.FolderPosition==FOLDERS.WITHDRAWN)
	       this.Status = FOLDERS.PULLED;
	    break;
	 case FOLDERS.PULLED:
	    break;
	 case FOLDERS.FILING:
	    ++this.FolderPosition;
	    if (this.FolderPosition==0) {
	       this.Status = FOLDERS.FILED;
	       this.FolderIndex = -1;
	    }
	    break;
      }
   },
   Draw() {
      var i;

      //UNLOGGED - UNTESTED

      //TODO: draw logos
      for (i=0;i<MINISTRY.PORTFOLIOS;++i)
	 if (this.FolderIndex==-1)
	    FolderImage.Draw(FOLDErIMAGE.X+(i*FOLDErIMAGE.GAP), FOLDErIMAGE.Y);
	 else
	    if (this.FolderIndex==i)
	       FolderImage.Draw(FOLDErIMAGE.X+(i*FOLDErIMAGE.GAP)+this.FolderPosition, FOLDErIMAGE.Y-this.FolderPosition);
	    else
	       FolderImage.Draw(FOLDErIMAGE.X+(i*FOLDErIMAGE.GAP), FOLDErIMAGE.Y);
   }
};
