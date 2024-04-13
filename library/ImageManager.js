
//---------------------------------------------------
//---------- GENIE IMAGE MANAGER --------------------  NOTE: Image loading monitor
var GenieImageManager = function () {
	var Pics;
	var Srcs;
	var ImagesLoaded, AllLoaded;
	var AnimationFrameHandle;
};
GenieImageManager.prototype = {
	Set(srcs) {
		this.Pics = new Array();
		this.Srcs = srcs;
		this.AllLoaded = false;
		this.ImagesLoaded = 0;
	},
	LoadImages(pics) {
		var i;
		var img;

		for (i=0;i<this.Srcs.length;++i) {
			img = new Image();
			this.Pics.push(img);
			this.Pics[i].addEventListener("load", this.Loaded.bind(this));	 
			this.Pics[i].src = this.Srcs[i];
		}
	},
	Loaded() {

		++this.ImagesLoaded;
	},
	Check() {

		this.AnimationFrameHandle = requestAnimationFrame(this.Check.bind(this));

		if (this.ImagesLoaded==this.Srcs.length) {
			this.AllLoaded = true;
			cancelAnimationFrame(this.AnimationFrameHandle);
		}
	}
};
ImageManager = new GenieImageManager();
