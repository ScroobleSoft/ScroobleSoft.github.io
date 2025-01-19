
//----------------------------------------------------
//---------- GRIDIRON FREE AGENCY --------------------
var GridironFreeAgency = function() {
	var Gridders;
	var PositionGridders;
	var Alternates;		//NOTE: only Improvers
	var Dimensionals;
};
GridironFreeAgency.prototype = {
	Set() {
		this.SetLists();
	},
	SetLists() {
		var i;
		var aGridders;

		this.Gridders = new Array();
		this.PositionGridders = new Array(POSITION.COUNT);
		for (i=0;i<POSITION.COUNT;++i) {
			aGridders = new Array();
			this.PositionGridders[i] = aGridders;
		}
		this.Alternates = new Array();
		this.Dimensionals = new Array();
	},
	Reset() {

		this.Gridders.length = 0;
		this.PositionGridders.forEach(function(aPos) {aPos.length=0});
		this.Alternates.length = 0;
		this.Dimensionals.length = 0;
	},
	Generate() {
	},
	AddGridder(grddr) {  //add to main list, also to relevant position and alternate ones

		this.Gridders.push(grddr);
		this.PositionGridders[grddr.Position].push(grddr);
		if (grddr.Experience<GRIDDER.YEARS.IMPROVER && grddr.Type) {
			if (grddr.Type==GRIDDER.TYPE.DIMENSIONAL)
				this.Dimensionals.push(grddr);
			else
				this.Alternates.push(grddr);
		}
	},
	RemoveGridder(grddr, iGrddr) {

		//UNLOGGED

		//-an index is supplied to make it easier to remove from the main .Gridders left
		ArrayUtils.Extract(this.Gridders, iGrddr);
	},
	SortGridders() {
		var i;

		this.Gridders.sort(function(a, b) {return (a.Quality-b.Quality);});
		for (i=0;i<POSITION.COUNT;++i)
			this.PositionGridders[i].sort(function(a, b) {return (a.Quality-b.Quality);});
		this.Alternates.sort(function(a, b) {return (a.Quality-b.Quality);});
		this.Dimensionals.sort(function(a, b) {return (a.Quality-b.Quality);});
	},
	StartNewSeason() {
		var i;

		for (i=0;i<this.Gridders.length;++i)
			if (this.Gridders[i].Experience==-1 || this.Gridders[i].Experience==11) {
				this.RemoveGridder(this.Gridders[i], i);
				--i;					//HACK!
			}
	}
};
