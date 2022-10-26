
const Web3 = require ('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const CAddress ='0x85B4086d6d6633f83840c925DF19649b837C87B2';

const privateKey = "0xd3109c0a2b5fdbde484d8769d406dd95cbe626374bdfdf25f99e38b14717a5e6";
let web3;
let accounts;
let Owner;
let instance;
 const Connect = async() => {
const provider = new HDWalletProvider(privateKey,`https://rpc-mumbai.maticvigil.com/`);
web3 = new Web3(provider);
let abi =[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"string","name":"_previewName","type":"string"},{"internalType":"string","name":"_url","type":"string"}],"name":"createPreView","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"createUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"deleteUserProfile","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_encryptEmail","type":"bytes32"},{"internalType":"bytes32","name":"_password","type":"bytes32"}],"name":"login","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"string","name":"","type":"string"}],"name":"preview","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];
//web3 = new Web3('http://localhost:9545');
instance = new web3.eth.Contract(
abi,
CAddress,
);
accounts = await web3.eth.getAccounts()
Owner = accounts[0];
console.log(Owner);
}
Connect();
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

//createPreViewforUser('asha@gmail.com', 'Asha','bafybeign6apue5m7u4eetm6vroozkcfl3354s77ro4efftgc2zsrem2kdm');
const ReadPreView = async(_EncryptEmail, _previewName) => {
   
    EncryptEmail = await web3.utils.soliditySha3(_EncryptEmail)
    //accounts = await web3.eth.getAccounts()
    await instance.methods.preview(EncryptEmail, _previewName).call()
    .then(()=>{
    console.log("---------------------------");
    console.log("Encrypted Email",EncryptEmail, "Preview Name",_previewName);
    console.log("---------------------------");
    });
    }



const register = async(Email, Pass ) => {
    EncryptEmail = await web3.utils.soliditySha3(Email)
    EncryptPass = await web3.utils.soliditySha3(Pass)
    accounts = await web3.eth.getAccounts()
    await instance.methods.createUserProfile(EncryptEmail,EncryptPass ).send({
    from: accounts[0],
    gas: 8500000
    })
    .then(()=>{
    console.log("---------------------------");
    console.log("User",accounts[0],"Encrypted Email",EncryptEmail, "Encrypt Password", EncryptPass);
    console.log("---------------------------");
    });
    }

    const userlog = async(Email,Pass) => {
        
        EncryptEmail = await web3.utils.soliditySha3(Email)
        EncryptPass = await web3.utils.soliditySha3(Pass)
        accounts = await web3.eth.getAccounts()
        await instance.methods.login(EncryptEmail,EncryptPass ).call({from:accounts[0]})
        .then((status)=>{
          
        if (status == true) {
            window.location = "index.html";
            alert("Successfully Logged In");
            return true;
        }
	      else {
            alert ("Login was unsuccessful, please Register First");
        }
      });		

        }

    //register("asha@gmail.com","asg566");
module.exports={createPreViewforUser,ReadPreView,register,userlog};

//ReadPreView('abc@gmail.com','XYZ');



