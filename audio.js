// set-up
let currSeq = null;
let isPlaying = false;
const playBtn = document.getElementById("playBtn");
const play = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>';
const pause = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>';

// basic functionality to add pausing
function setState(playTrue) {
    isPlaying = playTrue;
    if (playTrue) {
        playBtn.innerHTML = pause + " Pause";
    }
    else {
        playBtn.innerHTML = play + " Play";
    }
}

// obtains and organizes output
function parseOutput() {
    const output = document.getElementById("outputText").value.trim();
    if (!output) return [];
    return output.split(" ").filter(n => n.length > 0).map((note, i) => {
        return {note: note + "4", duration: durations[i] || "4n"};
    });
}

// plays the music
async function playMusic() {
    await Tone.start();
    const music = parseOutput();

    //check if output is empty
    if (music.length == 0) {
        alert("Make sure that the cipher has generated notes.");
        return;
    }

    const synth = new Tone.Sampler({
	    urls: {
		    C4: "C4.mp3",
		    "D#4": "Ds4.mp3",
		    "F#4": "Fs4.mp3",
		    A4: "A4.mp3",
	    },
	    release: 1,
	    baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    Tone.loaded().then(() => {
        const durationMap = {"16n": 0.25, "8n": 0.5, "4n": 1.0, "2n": 2.0};
        let time = 0;

        const events = music.map(item => {
            const t = time;
            time += durationMap[item.duration] || 0.5;
            return [t, item];
        })

        currSeq = new Tone.Part((time, item) => {
            synth.triggerAttackRelease(item.note, item.duration, time);
        }, events);

        currSeq.loop = false;
        Tone.Transport.bpm.value = 80;

        Tone.Transport.scheduleOnce(() => {
            Tone.Transport.stop();
            setTimeout(() => setState(false), 100);
        }, time);

        currSeq.start(0);
        Tone.Transport.start();
        setState(true);
    });
}

// stops playing the music
function stopMusic() {
    if (currSeq) {
        currSeq.stop();
        currSeq.dispose();
        currSeq = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
    setState(false);
}

// connects click to the playing of music
playBtn.addEventListener("click", () => {
    if (isPlaying) {stopMusic();}
    else {playMusic();}
});