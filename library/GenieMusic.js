
//--------------------------------------------------
//---------- GENIE MUSIC PLAYER --------------------
var GenieMusicPlayer = function() {
	var Context;
	var App, ReportChangeFlag;
	var Oscillator;
	var Types, TypeIndex, Octave, Frequency;
	var Frequencies;
	var Notes, NoteIndex, NoteCount;
	var IntervalID;
};
GenieMusicPlayer.prototype = {
	Set() {
		this.Context = new AudioContext();
		this.Oscillator = this.Context.createOscillator();
		this.Types = [ "sine", "square", "sawtooth", "triangle" ];
		this.Frequencies = [ 65.41,73.42,82.41,87.31,98.00,110.00,123.47 ];
		this.TypeIndex = 0;
		this.Octave = 4;
		this.Frequency = 0;
		this.NoteIndex = 0;
		this.NoteCount = 3;
	},
	SetApp(app, bChange) {

		this.App = app;
		this.ReportChangeFlag = bChange;
	},
	SetType(iType) {

		this.TypeIndex = iType;
		this.Oscillator.type = this.Types[this.TypeIndex];
	},
	SetOctave(iOctave) {

		this.Octave = iOctave;
	},
	Start() {

		this.Oscillator.type = "square";
		this.TypeIndex = 1;
		this.Oscillator.frequency.setValueAtTime(440, this.Context.currentTime);			//A4
		this.Oscillator.connect(this.Context.destination);
		this.Oscillator.start();
		this.Mute();
	},
	PlayNote(iNote) {

		this.Oscillator.frequency.value = this.Frequencies[iNote] * Math.pow(2,(this.Octave-2));
		this.UnMute();
		setTimeout(this.Mute.bind(this), 240);
	},
	PlayNotes() {
		var i;
		var note;

		clearInterval(this.IntervalID)

		this.NoteIndex = 0;
		this.Notes = Array(this.NoteCount);			//HACK!!! re-do
		this.Notes.fill(-1);
		for (i=0;i<this.NoteCount;++i) {
			do {
				note = Randomizer.GetIndex(this.Frequencies.length)
			} while (this.Notes.includes(note));
			this.Notes[i] = note;
		}

		this.UnMute();

		this.IntervalID = setInterval(this.SwitchNote.bind(this), 240);
	},
	PlayTune(aNotes) {  //UNLOGGED
		var i;

		clearInterval(this.IntervalID);

		this.NoteIndex = 0;
		this.NoteCount = aNotes.length;
		this.Notes = aNotes;

		this.UnMute();

		this.IntervalID = setInterval(this.SwitchNote.bind(this), 240);
	},
	StopNote() {  //UNLOGGED

		this.Oscillator.stop();
		this.Oscillator = this.Context.createOscillator();
	},
	SwitchNote() {  //UNLOGGED

		this.Oscillator.frequency.value = this.Frequencies[this.Notes[this.NoteIndex]] * Math.pow(2,(this.Octave-2));
		++this.NoteIndex;
		if (this.NoteIndex==this.NoteCount) {
			this.NoteIndex = 0;
			if (this.Octave==8)
				this.Octave = 2;
			else
				++this.Octave;
			if (this.App)
				if (this.ReportChangeFlag)
					this.App.OctaveSwitched();
			if (this.Octave==4) {
				if (this.TypeIndex==3)
					this.TypeIndex = 0;
				else
					++this.TypeIndex;
				if (this.TypeIndex==1) {
					this.Mute();
					clearInterval(this.IntervalID);
				} else
					this.Oscillator.type = this.Types[this.TypeIndex];
				if (this.App)
					if (this.ReportChangeFlag)
						this.App.TypeSwitched();
			}
		}
		if (this.App)
			if (this.ReportChangeFlag)
				this.App.NoteSwitched();
	},
	SetChordCount(nNotes) {  //UNLOGGED

		this.NoteCount = nNotes;
		this.PlayNotes();
	},
	Mute() {

		this.Context.suspend();
	},
	UnMute() {

		this.Context.resume();
	}
};

var Music = new GenieMusicPlayer();
Music.Set();
