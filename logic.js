// Harmonic Graph
const Harmgraph = {
    "do" : ["re", "mi", "fa", "so", "la"],  // I -> ii, iii, IV, V, vi
    "re" : ["so", "ti"],                    // ii -> V, vii
    "mi" : ["la", "fa"],                    // iii -> vi, IV
    "fa" : ["so", "ti"],                    // IV -> V, vii
    "so" : ["do"],                          // V -> I
    "la" : ["re", "fa"],                    // vi -> ii, IV
    "ti" : ["do"]                           // vii -> I
};

function traverse(start, steps) {
    let path = [start];
    let current = start;

    for (let i = 0; i < steps; i++) {
        let neighbors = Harmgraph[current];
        current = neighbors[i % neighbors.length];
        path.push(current);
    }

    return path;
}

// Cipher Map
const solfegeMap = {};
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SOLFEGE = ["do", "re", "mi", "fa", "so", "la", "ti"];
for (let i = 0; i < LETTERS.length; i++) {
    let letter = LETTERS[i];
    solfegeMap[letter] = SOLFEGE[i % SOLFEGE.length];
}

function getOctave(char) {
    const index = LETTERS.indexOf(char);
    return 3 + Math.floor(index / 7);
}

function getScaleDegree(note) {
    return SOLFEGE.indexOf(note) + 1;
}

// Encryption
function encryptText(text, key) {
    text = text.toUpperCase();
    let result = [];

    for (let char of text) {
        if (!solfegeMap[char]) continue;

        let note = solfegeMap[char];
        let degree = getScaleDegree(note);
        let octave = getOctave(char);

        let path = traverse(note, degree);

        for (let step of path) {
            result.push(convertToLetterNote(step, key, octave));
        }
    }
    console.log(result);
    return result.join(" ");
}

function decryptText(text, key) {
    const notes = text.trim().split(/\s+/);

    let result = "";
    let i = 0;

    while (i < notes.length) {
        let foundMatch = false;

        // try every scale degree
        for (let degreeIndex = 0; degreeIndex < SOLFEGE.length; degreeIndex++) {
            const startSolfege = SOLFEGE[degreeIndex];

            // reconstruct expected traversal path
            const expectedPath = traverse(startSolfege, degreeIndex+1);

            const match = notes[i].match(/^([A-G][b#]?)(\d+)$/);
            if (!match) {
                continue;
            }
            const octave = parseInt(match[2]);

            const expectedNotes = expectedPath.map(step =>
                convertToLetterNote(step, key, octave)
            );

            // compare encrypted sequence
            const slice = notes.slice(i, i + expectedNotes.length);

            let matches = true;
            for (let j = 0; j < expectedNotes.length; j++) {
                if (slice[j] !== expectedNotes[j]) {
                    matches = false;
                    break;
                }
            }

            if (!matches) {
                continue;
            }

            // recover original character
            let recovered = null;
            for (let letter of LETTERS) {
                if (solfegeMap[letter] === startSolfege && getOctave(letter) === octave) {
                    recovered = letter;
                    break;
                }
            }

            if (!recovered) {
                continue;
            }

            result += recovered;

            i += expectedNotes.length;

            foundMatch = true;
            break;
        }

        if (!foundMatch) {
            return `Decryption Failed using "${key}"`;
        }
    }
    return result.toLowerCase();
}

const musicalKeys = {
    "A" : ["A", "B", "C#", "D", "E", "F#", "G#"],
    "Bb" : ["Bb", "C", "D", "Eb", "F", "G", "A"],
    "B" : ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    "C" : ["C", "D", "E", "F", "G", "A", "B"],
    "Cb" : ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
    "C#" : ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
    "Db" : ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    "D" : ["D", "E", "F#", "G", "A", "B", "C#"],
    "Eb" : ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    "E" : ["E", "F#", "G#", "A", "B", "C#", "D#"],
    "F" : ["F", "G", "A", "Bb", "C", "D", "E"],
    "F#" : ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    "G" : ["G", "A", "B", "C", "D", "E", "F#"],
    "Gb" : ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
    "Ab" : ["Ab", "Bb", "C", "Db", "Eb", "F", "G"]
}

function convertToLetterNote(note, key, octave) {
    degree = getScaleDegree(note) - 1;
    return musicalKeys[key][degree] + octave;
}