// const Web3 = require('web3');
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const fs = require('fs');
// // const {CryptoJS,AES}= require('crypto-js');
// const { getMaxListeners } = require('process');
// let web3 ="";
// let accounts = "";
// let Owner = "";
// let instance = "";
// const CAddress ='0xa55c39d7126eBc63f6c50D2Ed4cB6f6BCeF12dd6';
// const privateKey="Paste the Private key";
var CryptoJS = require("crypto-js");

// async function connect() {
//   const provider = new HDWalletProvider(privateKey2, `http://127.0.0.1:9545/`);
//   web3 = new Web3(provider);
//   let abi = [];
//   instance = new web3.eth.Contract(abi, CAddress);
//   accounts = await web3.eth.getAccounts();
//   Owner = accounts[0];
// }

// async function bal() {
//   if (Owner == "") {
//     await getAccount();
//   }
//   await instance.methods
//     .balanceOf(Owner)
//     .call()
//     .then((count) => {
//       document.getElementById("bal").innerHTML = count;
//     });
// }

// async function createPreview(_email, _previewName, _url) {
//   if (Owner == "") {
//     await getAccount();
//   }
//   await instance.methods
//     .createPreView(_email, _previewName, _url)
//     .send({
//       from: Owner,
//     })
//     .on("confirmation", function (confirmationNumber, receipt) {
//       document.getElementById("sendConfirm").innerHTML =
//         "confirmationNumber is " +
//         confirmationNumber +
//         "and receipt is" +
//         receipt;
//     });
// }

async function creatingScript(_email, _fullScriptName, _Url, key) {
  // if(Owner == ""){
  //     await getAccount();
  // }

//   encryptIPFSlink(_Url, key);
  ciphertext = encryptIPFSlink(_Url, key)
  console.log(ciphertext);




  // await instance.methods.createScript(_email,_fullScriptName,ciphertext).send({
  //     from: Owner
  // }).on('confirmation', function(confirmationNumber,receipt){
  //     document.getElementById("sendConfirm").innerHTML = "confirmationNumber is "+confirmationNumber+"and receipt is"+receipt;
  // });
}

function encryptIPFSlink(uri, key) {

  var ciphertext = CryptoJS.AES.encrypt(uri, key)
  var hash = CryptoJS.HmacSHA512("Message", "SecretPassphrase");

  // let utf8Encode = new TextEncoder();
  
  // return utf8Encode.encode(ciphertext);
//   const bufferText = Buffer.from(ciphertext, 'utf8'); // or Buffer.from('hello world')
// console.log(bufferText); // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>

// const text = bufferText.toString('hex');
// // To get hex
// console.log(text); // 68656c6c6f20776f726c64
  return hash.toString();
}
// console.log(ciphertext);
// Decrypt

function decryptIPFSlink(_EncryptedUrl, key) {
  var bytes = CryptoJS.AES.decrypt(_EncryptedUrl, key);
  var originalText = bytes.toString(CryptoJS.enc.Utf8);

  console.log(originalText); // 'my message'

  return originalText;
}

function upload() {
  n = 177;
  c = 50;
  no = Math.ceil(n / c);
  console.log(no);
}

// createPreview('rrajdeep2@gmail.com','Harry Potter','url');
creatingScript('rrajdeep2@gmail.com','Harry Potter','pravesh',"yadav");
// upload();

// encryptIPFSlink("DSDS","152");

decryptIPFSlink("5e03d0c1b42ef0b7e61fb333f3993949", "SecretPassphrase");
