const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');


const CAddress ='0xfa43Ab041e9Dc7bbA3DD11e4Cd3810E721AcB2d4';


// const privateKey = "";
const privateKey = "0xd3109c0a2b5fdbde484d8769d406dd95cbe626374bdfdf25f99e38b14717a5e6";
let web3;
let accounts;
let Owner;
let instance;


const Connect = async() => {
const provider = new HDWalletProvider(privateKey,`https://rpc-mumbai.maticvigil.com/`);
web3 = new Web3(provider);
let abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"_EncryptEmail","type":"bytes32"},{"internalType":"string","name":"_previewName","type":"string"},{"internalType":"string","name":"_url","type":"string"}],"name":"createPreView","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"string","name":"","type":"string"}],"name":"preview","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
//web3 = new Web3('http://localhost:9545');

instance = new web3.eth.Contract(
abi,
CAddress,
);
accounts = await web3.eth.getAccounts()
Owner = accounts[0];
console.log(Owner);
}

const createPreViewforUser = async(_EncryptEmail, _previewName, _url) => {
EncryptEmail = await web3.utils.soliditySha3(_EncryptEmail)
accounts = await web3.eth.getAccounts()
await instance.methods.createPreView(EncryptEmail, _previewName, _url).send({
from: accounts[0],
gas: 8500000
})
.then(()=>{
console.log("---------------------------");
console.log("User",accounts[0],"Encrypted Email",EncryptEmail, "Preview Name",_previewName ," URL ",_url,);
console.log("---------------------------");
});
}

Connect();

createPreViewforUser('ashajampangire@gmail.com','Asha','QmaEM19XDiDq1NnmutqszQjhNgZ4bmjRFn7DoBQrFt88ZK');

