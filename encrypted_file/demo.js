//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
//const key = "0x2d436f6e766572742d5468652d537472696e672d746f2d627974657333322d40";
//const iv = "0x2d436f6e766572742d5468652d53742d";

// const key = crypto.randomBytes(32);
const iv = 1234567890123456
// console.log("key",Buffer.from(key));
console.log("iv",iv);

var key = crypto.createHash("sha256").update("pravesh").digest();

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc',key, iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Text send to encrypt function
var hw = encrypt("Welcome to Tutorials Point...")
console.log(hw)
console.log(decrypt(hw))