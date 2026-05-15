// set-up
/** @type {Tone.Sequence|null} The current active Tone.js sequence, shows null if none are loaded
*/
let currSeq = null;
/** @type {boolean} tells you whether or not the music (audio) is currently playing 
*/
let isPlaying = false;
const playBtn = document.getElementById("playBtn");

const play = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>';
const pause = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>';

/** 
 * Updates the play/pause state of the UI and sync the button's icon and label
 * 
 * @param {boolean} playTrue - Pass 'true' to switch to playing state, 'false' to stop playing
*/
function setState(playTrue) {
    isPlaying = playTrue;
    if (playTrue) {
        playBtn.innerHTML = pause + " Pause";
    }
    else {
        playBtn.innerHTML = play + " Play";
    }
}

/** 
 * Reads, trims, and tokenizes the output text field into an array of note strings.
 * 
 * @returns {string[]} playTrue - Array of note tokens (ex:["C4", "G3, "E5"])
 * or empty array if the input field is blank (no input)
*/
function parseOutput() {
    //checks whether play button should look at input or output text
    const isDecrypt = document.getElementById("modeToggle").checked;
    let sourceID;
    if (isDecrypt) {sourceID = "inputText";}
    else {sourceID = "outputText";}

    const output = document.getElementById(sourceID).value.trim();
    if (!output) return [];
    return output.split(" ").filter(n => n.length > 0);
}

/**
 * Starts playback of the notes in the output field using a Tone.js piano sampler.
 * Stops any in-progress playback first, then builds a new {@link Tone.Sequence}
 * and schedules an automatic stop once all notes have played.
 *
 * @async
 * @returns {Promise<void>} Resolves after the Tone.js audio context has started
 *                          and sample loading has been initiated.
 *                          Playback itself continues asynchronously after the promise resolves.
 * @throws {void} Shows an alert (rather than throwing) if the output field is empty.
 */
async function playMusic() {
    stopMusic();

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
        currSeq = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, "4n", time);
        }, music, "4n");
        console.log(currSeq);

        currSeq.loop = false;
        Tone.Transport.bpm.value = 80;

        Tone.Transport.scheduleOnce(() => {
            Tone.Transport.stop();
            setTimeout(() => setState(false), 100);
        }, "+" + (music.length * (60 / 80)));

        currSeq.start(0);
        Tone.Transport.start();
        setState(true);
    });
}

/**
 * Stops all active playback, resets the Tone.js transport to position 0, and disposes of the current sequence.
 *
 * Safe to call even when nothing is playing.
 *
 * @returns {void}
 */
function stopMusic() {
    Tone.Transport.stop();
    Tone.Transport.cancel();
    Tone.Transport.position = 0;

    if (currSeq) {
        // currSeq.stop();
        currSeq.dispose();
        currSeq = null;
    }
    
    setState(false);
}

/**
 * Click handler for the play/pause button.
 * Stops music if currently playing; starts it otherwise.
 *
 * @listens HTMLButtonElement#click
 */
playBtn.addEventListener("click", () => {
    if (isPlaying) {stopMusic();}
    else {playMusic();}
});