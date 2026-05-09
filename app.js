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