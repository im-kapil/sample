const AesEncryption = require('aes-encryption');
//const { exit } = require('process');
const aes = new AesEncryption()
function encryptDetails(textToEncrypt,key){
    var arr1 = [];
    for (var n = 0, l = key.length; n < l; n ++)
     {
        var hex = Number(key.charCodeAt(n)).toString(16);
        arr1.push(hex);
     }
    key = arr1.join('');
    x = key.length;
    if(x!=64){
        console.log("cannot execute Length Short");
        key = key.toString().padEnd(64, '1');
        console.log(key);
    }
    aes.setSecretKey(key)
    //aes.setSecretKey('11122233344455566677788822244455555555555555555231231321313aaaff')
    // Note: secretKey must be 64 length of only valid HEX characters, 0-9, A, B, C, D, E and F
    const encrypted = aes.encrypt(textToEncrypt)
    const decrypted = aes.decrypt(encrypted)
    console.log('encrypted >>>>>>', encrypted)
    console.log('decrypted >>>>>>', decrypted)
}
encryptDetails('Rajdeep21313131131hjhsjhkhhjhkjhkjhkjhkjhkhkjhkkhjas123','R1245646456465464663');