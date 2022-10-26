const crypto = require("crypto");

// key and iv   
var iv = "1234567890123456";

function encri(cid,privatekey){
    // this is the string we want to encrypt/decrypt
    var CID = cid;
    var key = crypto.createHash("sha256").update(privatekey).digest();

// create a aes256 cipher based on our password
var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
// update the cipher with our secret string
cipher.update(CID);

// save the encryption as base64-encoded
var encrypted = cipher.final("base64");

console.log("Encrypted: %s", encrypted);

// create a aes267 decipher based on our password
}

function decri(encriptid,secretkey){
    var key = crypto.createHash("sha256").update(secretkey).digest();
    var decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    // update the decipher with our encrypted string
    const x = decipher.update(encriptid, "base64");
    console.log("........>>>>>>",x)
    console.log("Decrypted: %s", decipher.final());
}

// encri("rajdeep12praveshyadav","prav")
decri("xsVyx/aHAKuNU4q8Gqfm8Q==","prav")

