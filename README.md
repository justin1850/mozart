# Music Cipher

## Overview
Music Cipher is a browser-based encryption and decryption tool that converts text into musical note syntax and back into readable text. Users can also play the generated notes as audio.

---

## Setup

1. If you have not already unzipped the project folder, do so now.
2. Open the extracted folder.
3. Run `index.html` in your web browser.
4. You are ready to use the software.

---

## Encryption

### Encrypting Text

1. Enter the message you want to encrypt into the input box.
2. Choose the encryption key from the dropdown menu.
3. Ensure the Encrypt/Decrypt slider is set to **Encrypt**.
4. Click **Run Cipher**.
5. The encrypted musical syntax will appear in the output box.

---

## Playing Encrypted Music

1. After encryption, click **Play**.
2. The software will play the generated musical notes.

## Decryption

### Decrypting Text

1. Enter the musical syntax you want to decrypt into the input box.
2. Choose the correct decryption key from the dropdown menu.
3. Ensure the Encrypt/Decrypt slider is set to **Decrypt**.
4. Click **Run Cipher**.
5. The decrypted message will appear in the output box.

---

## Playing Decrypted Music

1. After decryption, click **Play**.
2. The software will play the musical syntax entered into the cipher.

---

## Errors

### Decryption Failed

If the selected key is incorrect or the musical syntax cannot be decrypted, the output will display:

```text
Decryption Failed using "your key"
```

### Empty Output Playback

If you click **Play** without generating output first, the page will display:

```text
Make sure that the cipher has generated notes.
```