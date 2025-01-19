
//--------------------------------------------------------
//---------- PENDING FREE AGENTS VIEW --------------------
var PendingFreeAgentsView = function() {

   var FAs, PositionFAs;
   var ActiveList;
   var FreeAgent;
};
PendingFreeAgentsView.prototype = new GridironTableView();
PendingFreeAgentsView.prototype.Set = function(cnvs, specs, gTool, tWriter) {
   GridironTableView.prototype.Set.call(this, cnvs, specs, gTool, tWriter);

   this.SetLists();
   this.ActiveList = this.FAs;
};
PendingFreeAgentsView.prototype.SetControls = function() {

   //UNLOGGED

   this.Controls.push(PositionTouchBar);
};
PendingFreeAgentsView.prototype.SetLists = function() {
   var i;
   var aFAs;

   this.FAs = new Array();
   this.PositionFAs = new Array();
   for (i=0;i<POSITION.COUNT;++i) {
      aFAs = new Array();
      this.PositionFAs[i] = aFAs;
   }
};
PendingFreeAgentsView.prototype.Open = function() {

   //UNLOGGED

   this.GenerateLists();
   this.DisplayConsole();

   GridironTableView.prototype.Open.call(this);

   this.DisplayFAs();
};
PendingFreeAgentsView.prototype.Update = function() {
};
/*
PendingFreeAgentsView.prototype.Close = function() {
};
*/
PendingFreeAgentsView.prototype.GenerateLists = function() {
   var i, j, k;

   //Create lists
   for (i=0;i<LEAGUE.TEAMS;++i)
      for (j=0;j<POSITION.COUNT;++j)
	 for (k=0;k<Teams[i].Roster.Gridders[j].length;++k)
	    if (Teams[i].Roster.Gridders[j][k].Experience==3 || Teams[i].Roster.Gridders[j][k].Experience==7) {
	       this.FAs.push(Teams[i].Roster.Gridders[j][k]);
	       this.PositionFAs[j].push(Teams[i].Roster.Gridders[j][k]);
	    }

   //Sort lists
   this.FAs.sort(function(a, b) {return a.Quality-b.Quality;});
   for (i=0;i<POSITION.COUNT;++i)
      this.PositionFAs[i].sort(function(a, b) {return a.Quality-b.Quality;});
};
PendingFreeAgentsView.prototype.DisplayConsole = function() {

   //UNLOGGED

   this.ColourScape(this.ConsoleScape, this.Specs.COLOUR.CONSOLE);
};
PendingFreeAgentsView.prototype.DisplayFAs = function() {
   var x, y;
   var nEntries;
   var info;

   //UNLOGGED

   this.ClearTable();

   nEntries = VIEW.TABLE.COLUMN.ENTRIES * this.ColumnNumber;
   for (x=VIEW.TABLE.L;x<(VIEW.TABLE.L+VIEW.TABLE.W);x+=VIEW.TABLE.COLUMN.W) {
      for (y=VIEW.TABLE.T+12;y<VIEW.TABLE.T+VIEW.TABLE.H;y+=VIEW.TABLE.ENTRY.H) {

	 this.FreeAgent = this.Draft.ValueList[this.Entries[nEntries]];

	 //Prospect index by value
	 this.TextWriter.Write((this.Entries[nEntries]+1) + ".", x+5, y, { FONT: "12px Arial" } );
	 this.TextWriter.Write(SubPositions[this.FreeAgent.Position][this.FreeAgent.SubPosition], x+30, y, { FONT: "12px Arial" } );

	 //Initials
	 info = this.FreeAgent.Name.First[0] + this.FreeAgent.Name.Last[0];
	 this.TextWriter.Write(info, x+60, y, { FONT: "12px Arial" } );

	 //Quality and Team
	 this.TextWriter.Write(Utils.NumberToGrade(this.FreeAgent.Quality), x+90, y, { FONT: "12px Arial" } );
	 this.TextWriter.Write(TeamAbbreviations[this.FreeAgent.Team.Index], x+110, y, { FONT: "12px Arial" } );

	 ++nEntries;
	 if (nEntries==this.ActiveList.length || nEntries==this.Specs.ENTRIES)
	    return;
      }
   }
};
