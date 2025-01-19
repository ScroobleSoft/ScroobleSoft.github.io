/*
 *  general idea is to select a list of 10 most desired FAs (both UFAs and veterans), then have each team select them in a random order
 *  (order being re-generated) after every round)
 *
 *  TODO: see if .PlayerIndex can be made REDUNDANT - probably Ok if it is not
 */
//---------------------------------------------------------
//---------- GRIDIRON FREE AGENCY VIEW --------------------
var GridironFreeAgencyView = function() {
   var Canvas, Context;
   var GraphicsTool, TextWriter;
   var ConsoleScape;
   var FreeAgency;

   var FATypeRadioOptions;

   var Roster;
   var Page;
   var GriddersIndex, AlternatesIndex;

   var Offers;
   var PlayerIndex;
   var TeamOrder;	//for making offers

   var ColumnNumber;
   var Position;			//index
   var Prospect;
   var Prefixes;
};
GridironFreeAgencyView.prototype = new GridironTableView();
GridironFreeAgencyView.prototype.Set = function(cnvs, specs, gTool, tWriter) {
   GridironTableView.prototype.Set.call(this, cnvs, specs);

   this.GraphicsTool = gTool;
   this.TextWriter = tWriter;
//      this.Roster = PlayerTeam.Roster;
      this.Page = 0;
      this.GriddersIndex = 0;
      this.AlternatesIndex = 0;

   this.Offers = new GenieArray();
};
GridironFreeAgencyView.prototype.SetSubControls = function(cScape) {
   GridironTableView.prototype.SetSubControls.call(this, null, cScape);

   this.FATypeRadioOptions = new GenieRadioControls();
   this.FATypeRadioOptions.Set(this.ConsoleScape, FAtYPeRADIoOPTIONS, RadioOptionImage);
};
GridironFreeAgencyView.prototype.SetFreeAgency = function(fAgncy) {

   this.FreeAgency = fAgncy;
};
GridironFreeAgencyView.prototype.Open = function() {

      //UNLOGGED

      this.Roster.DisplayBasic();
      SignButton.Enabled = false;
      SignButton.Display();
};
GridironFreeAgencyView.prototype.Update = function() {

      //UNLOGGED

      this.AnimationFrameHandle = requestAnimationFrame(this.Update.bind(this));

      //Check if 'Sign' button is clicked
      if (SignButton.CheckClicked()) {
	 this.Randomizer.GetUniqueNumbers(this.TeamOrder, LEAGUE.TEAMS, LEAGUE.TEAMS, STARtAtZERO);
	 this.MakeOffers();
      }

      //Check if a player is selected/unselected
      if (Mouse.CheckLeftClicked())
	 if ((Mouse.ClickX>=400 && Mouse.ClickX<600) && (Mouse.ClickY>=20 && Mouse.ClickY<530)) {
	    this.PlayerIndex = Math.floor((Mouse.ClickY-20)/16) + (32*(this.Page-1));
	    if (this.PlayerIndex<FreeAgents.length) {
	       if (this.Offers.includes(this.PlayerIndex))
		  this.Offers.Remove(this.Offers.indexOf(this.PlayerIndex));	//de-select
	       else if (this.Offers.length<10)					//check if 10-player limit has been reached
		  this.Offers.push(this.PlayerIndex);				//select
	    }
	 }

      //Check if a page is selected
      if (FreeAgentImage.CheckClicked())
	 this.Page = Math.floor((Mouse.ClickX-DraftChartImage.X)/15);
	    this.DisplayFreeAgents();
};
/*
GridironFreeAgencyView.prototype.Close = function() {
};
*/
/*
   DisplayFreeAgents() {
      var i;
      var nFAs;
      var iPlayer;

      //LOGGED - UNTESTED

      //NOTE: the most that there can be is 450-(450/4)=336, so will need 11 pages with 32 at most on a page; no minimum

      this.Screen.fillStyle = GREY.LIGHT;
      this.Screen.fillRect(400, 0, 200, 540);
      this.TextWriter.Write("PAGE " + this.Page, 400, 16, { FONT: "14px Arial" } );	//title

      nFAs = FreeAgents.length - (32*this.Page);
      for (i=0;i<nFAs;++i) {
	 iPlayer = (32*this.Page) + i;
	 this.TextWriter.Write((iPlayer+1)+".", 400, 16*(i+2), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(Positions[FreeAgents[iPlayer].Position], 420, 16*(i+2), { FONT: "12px Arial", COLOUR: "black" } );
	 this.TextWriter.Write(FreeAgents[iPlayer].Name.First[0], 445, 16*(i+2), { FONT: "12px Arial" } );
	 this.TextWriter.Write(FreeAgents[iPlayer].Name.Last, 460, 16*(i+2), { FONT: "12px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(FreeAgents[iPlayer].Quality), 560, 16*(i+2), {FONT: "12px Arial"});
	 if (FreeAgents[i+(32*this.Page)].Potential>0)
	    this.TextWriter.Write("+" + FreeAgents[iPlayer].Potential, 580, 16*(i+2), { FONT: "12px Arial" } );
	 else
	    this.TextWriter.Write(FreeAgents[iPlayer].Potential, 580, 16*(i+2), { FONT: "12px Arial" } );
      }
   },
   DisplayAgents() {
      var i;
      var x, y;
      var aPos, iPos;

      //UNLOGGED - a different version of above method, and the one more likely to be used

      this.Screen.fillStyle = GREY.LIGHT;
      this.Screen.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);

      aPos = new Array(10);
      for (i=0;i<10;++i)
	 aPos[i] = 0;

      for (i=0;i<FreeAgents.length;++i) {

	 iPos = FreeAgents[i].Position & 0xF;
	 if (iPos<5)
	    y = 0;
	 else
	    y = 300;
	 x = 5 + (120*(iPos % 5));

	 //Position and name with marker
	 this.TextWriter.Write(Positions[iPos], x, (12*aPos[iPos])+10+y, { FONT: "10px Arial" } );
	 info =  this.Prefixes[FreeAgents[i].Status] + FreeAgents[i].Name.First[0] + FreeAgents[i].Name.Last[0];
	 this.TextWriter.Write(info, x+20, (12*aPos[iPos])+10+y, { FONT: "10px Arial" } );

	 //Age, quality and potential
	 this.TextWriter.Write(FreeAgents[i].Experience, x+45, (12*aPos[iPos])+10+y, { FONT: "10px Arial" } );
	 this.TextWriter.Write(Utilities.NumberToGrade(FreeAgents[i].Quality), x+65, (12*aPos[iPos])+10+y, { FONT: "10px Arial" } );
	 this.TextWriter.Write(FreeAgents[i].Potential, x+85, (12*aPos[iPos])+10+y, { FONT: "10px Arial" } );

	 ++aPos[iPos];
      }
   },
   DisplayFramework() {

      //UNLOGGED

      this.Context.fillStyle = "rgb(000,159,095)";
      this.Context.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   },
*/
GridironFreeAgencyView.prototype.DisplayNormals = function() {
      var i;

      //UNLOGGED

      this.DisplayFramework();

      //Adjust for number of free agents
      VIEW.FREeAGENCY.ENTRIES = this.FreeAgency.Gridders.length;
      VIEW.FREeAGENCY.COLUMN.COUNT = Math.ceil(VIEW.FREeAGENCY.ENTRIES/VIEW.FREeAGENCY.COLUMN.ENTRIES);

//      for (i=0;i<4*VIEW.FREeAGENCY.COLUMN.COUNT;++i)
      //-will only dislpay a section of the free agents
};
GridironFreeAgencyView.prototype.DisplayAlternates = function() {

      //UNLOGGED

      //Adjust for number of free agents
      VIEW.FREeAGENCY.ENTRIES = this.FreeAgency.Alternates.length;
      VIEW.FREeAGENCY.COLUMN.COUNT = Math.ceil(VIEW.FREeAGENCY.ENTRIES/VIEW.FREeAGENCY.COLUMN.ENTRIES);

};
GridironFreeAgencyView.prototype.DisplayPosition = function(pos) {	//TODO: probably don't need to pass position as it will be selected somewhere

      //UNLOGGED

};
/*
   MakeOffers() {
      var i;
      var fa;

      //UNLOGGED

      for (i=0;i<LEAGUE.TEAMS;++i)
	 if (TeamOrder[i].Needs.length) {
	    fa = this.GetBestFAByPosition(TeamOrder[i].Needs[0]);
	    TeamOrder[i].Roster.AddEconomically(fa);
	 }
   },
   GetBestFAByPosition(pos) {  //ASSUMPTION: FreeAgents list is always sorted
      var i;

      for (i=0;i<FreeAgents.length;++i)
	 if (FreeAgents[i].Position==pos)
	    return (FreeAgents.Extract(i));
   }
*/
