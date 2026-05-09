//set-up
let currSeq = null;
let isPlaying = false;
const playBtn = document.getElementById("playBtn");
const play = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" /></svg>';
const pause = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:24px;height:24px"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" /></svg>';

//basic functionality to add pausing - incomplete
function setState(playTrue) {
    isPlaying = playTrue;
    if (playTrue) {
        playBtn.innerHTML = pause + " Pause";
    }
    else {
        playBtn.innerHTML = play + " Play";
    }
}
//tone.js flattosharpstuff :|
const flatToSharp = {
    "Bb": "A#",
    "Eb": "D#",
    "Ab": "G#",
    "Db": "C#",
    "Gb": "F#",
    "Cb": "B",
    "E#": "F",
    "B#": "C",
    "Fb": "E"
}