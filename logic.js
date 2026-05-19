// Harmonic Graph
const harmonicGraph = new Graph();
harmonicGraph.addEdge("do","re"); //I -> II
harmonicGraph.addEdge("do","mi"); //I -> III
harmonicGraph.addEdge("do","fa"); //I -> IV
harmonicGraph.addEdge("do","so"); //I -> V
harmonicGraph.addEdge("do","la"); //I -> VI

harmonicGraph.addEdge("re","so"); //II -> V
harmonicGraph.addEdge("re","ti"); //II -> VII

harmonicGraph.addEdge("mi","la"); //III -> VI
harmonicGraph.addEdge("mi","fa"); //III -> IV

harmonicGraph.addEdge("fa","so"); //IV -> V
harmonicGraph.addEdge("fa","ti"); //IV -> VII

harmonicGraph.addEdge("so","do"); //V -> I

harmonicGraph.addEdge("la","re"); //VI -> II
harmonicGraph.addEdge("la","fa"); //VI -> IV

harmonicGraph.addEdge("ti","do"); //VII -> I

// const Harmgraph = {
//     "do" : ["re", "mi", "fa", "so", "la"],  // I -> ii, iii, IV, V, vi
//     "re" : ["so", "ti"],                    // ii -> V, vii
//     "mi" : ["la", "fa"],                    // iii -> vi, IV
//     "fa" : ["so", "ti"],                    // IV -> V, vii
//     "so" : ["do"],                          // V -> I
//     "la" : ["re", "fa"],                    // vi -> ii, IV
//     "ti" : ["do"]                           // vii -> I
// };

/**
 * Traverses the harmonic graph starting from a given solfege node.
 * The traversal deterministically cycles through neighboring nodes.
 *
 * @param {string} start - Starting solfege note ("do", "re", etc.).
 * @param {number} steps - Number of traversal steps to perform.
 * @returns {string[]} Ordered traversal path including the starting node.
 *
 */
function traverse(start, steps) {
    let path = [start];
    let current = start;

    for (let i = 0; i < steps; i++) {
        let neighbors = harmonicGraph.getNeighbors(current);
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

/**
 * Determines the octave number assigned to a letter.
 * Every group of 7 letters increments the octave.
 *
 * @param {string} char - Character in the accpeted list of input characters.
 * @returns {number} Octave number.
 *
 */
function getOctave(char) {
    const index = LETTERS.indexOf(char);
    return 3 + Math.floor(index / 7);
}

/**
 * Converts a solfege note into a scale degree.
 *
 * @param {string} note - Solfege syllable.
 * @returns {number} Scale degree (1-7).
 *
 */
function getScaleDegree(note) {
    return SOLFEGE.indexOf(note) + 1;
}

/**
 * Encrypts plaintext into harmonic note sequences.
 *
 * Each letter:
 * 1. Maps to a solfège note
 * 2. Determines a traversal length from its scale degree
 * 3. Traverses the harmonic graph
 * 4. Converts the traversal into musical notes within the selected key
 *
 * @param {string} text - Plaintext message.
 * @param {string} key - Musical key signature/key of the cipher.
 * @returns {string} Space delimited musical notes.
 *
 */
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

/**
 * Decrypts an encrypted harmonic note sequence back into plaintext.
 *
 * The function reconstructs possible harmonic traversals and validates
 * them against the encrypted sequence using the provided key.
 *
 * If traversal reconstruction fails, the key is incorrect.
 *
 * @param {string} text - Encrypted note sequence.
 * @param {string} key - Musical key signature used during encryption/key of cipher.
 * @returns {string} Decrypted plaintext or failure message.
 *
 */
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

/**
 * Converts a solfege note into a concrete musical note
 * within a specified key and octave.
 *
 * @param {string} note - Solfege note.
 * @param {string} key - Musical key signature.
 * @param {number} octave - Octave number.
 * @returns {string} Musical note with octave.
 *
 */
function convertToLetterNote(note, key, octave) {
    let degree = getScaleDegree(note) - 1;
    return musicalKeys[key][degree] + octave;
}