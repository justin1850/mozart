/**
 * Event listener for clicking on the submit button.
 * Reads user input (plaintext or musical text), mode selection (key, ex: C major, F major), and function (encrypting or decrypting the cipher)
 * Writes/Showcases the results to the output field after cipher is run
 */
document.getElementById("submitBtn").addEventListener("click", () => {
    const input = document.getElementById("inputText").value;
    const isDecrypt = document.getElementById("modeToggle").checked;
    const key = document.getElementById("keySelect").value;
    console.log(key)

    let output;

    if (isDecrypt) {
        output = decryptText(input, key);
    } else {
        output = encryptText(input, key);
    }

    document.getElementById("outputText").value = output;
});