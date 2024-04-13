
//-------------------------------------------
//---------- GENIE SOUND --------------------
var GenieSound = function () {
	var Audio;
	var Playable;			//flag
};
GenieSound.prototype = {
	Set(sSrc) {  //s- src
		this.Audio = document.createElement("audio");
		this.Audio.src = sSrc;
		this.Audio.setAttribute("preload", "auto");
		this.Audio.addEventListener("canplay", this.SetPlayable.bind(this));
		this.Audio.style.display = "none";
		document.body.appendChild(this.Audio);
		this.Playable = false;
	},
	SetPlayable() {

		this.Playable = true;
	},
	CheckPlayable() {

		return (this.Playable);
	},
	Play() {

		if (this.Playable)
			this.Audio.play();
		else
			return (false);
	},
	PlayRewound() {

		if (!this.CheckStopped())
			this.Stop();
		this.Audio.play();
	},
	PlayNonStop() {

		this.Audio.loop = true;
		this.Audio.play();
	},
	ResetNonStop() {

		this.Audio.loop = false;
	},
	Stop() {

		this.Audio.pause();
		this.Audio.currentTime = 0;
	},
	CheckStopped() {

		if (this.Audio.ended)
			return (true);
		else
			return (false);
	}
};
