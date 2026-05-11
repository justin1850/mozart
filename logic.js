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

        let path = traverse(note, degree);
        result.push(path.join(" "));
    }
    result = result.join(" ").split(" ");
    console.log(result);
    
    for (let i = 0; i < result.length; i++) {
        result[i] = convertToLetterNote(result[i], key)
    }
    console.log(result);

    return result.join(" ");
}

function decryptText(text, key) {
    return false;
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

function convertToLetterNote(note, key) {
    degree = getScaleDegree(note) - 1;
    return musicalKeys[key][degree];
}