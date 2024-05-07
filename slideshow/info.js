
//---------------------------------------------------
//---------- SLIDESHOW INFO VIEW --------------------
var SlideshowInfoView = function() {
	var PicIndex;

	var i;
};
SlideshowInfoView.prototype = new GenieSubView();
SlideshowInfoView.prototype.Set = function(cnvs, specs, mView) {
	GenieSubView.prototype.Set.call(this, cnvs, specs, mView);

	this.PicIndex = 0;
};
SlideshowInfoView.prototype.Draw = function() {
	var i;

	//UNLOGGED

	for (i=0;i<this.Specs.COUNT;++i) {
		//-draw thumbnails
	}
};
