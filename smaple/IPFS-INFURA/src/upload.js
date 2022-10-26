const {createPreViewforUser,ReadPreView, viewScript} = require('./web3connect.js')
//const{Email3} = require('./index.js');
const { create, CID } = require("ipfs-http-client");
const projectId = '2FNjE1lCSxe3pPGK3H8FH1gMdT4';   // <---------- your Infura Project ID

const projectSecret = '9466554632345d063b3ecfeb140d1b3e';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfsclient = async () =>{

    const ipfs = await create({
        host : "ipfs.infura.io",
        port: 5001,
        protocol:"https",
        headers: {
            authorization: auth,
        },
    });

    return ipfs;
} 


let file = document.getElementById('file-input');
file.onchange = fileSelected;

let Submit = document.getElementById('upload-button');
Submit.onclick = save;

 
function fileSelected(e) {
    if (e.target.files.length < 1) {
      console.log('nothing selected')
      return
    }
    selectedFile = e.target.files[0]
  }

async function save(e){
e.preventDefault()
let ipfs = await ipfsclient();
 let result = await ipfs.add(selectedFile);
console.log(result.path);
 
const preName = document.getElementById('pname1').value;
const Email3 = localStorage.getItem("xyz");
console.log(Email3)
  await createPreViewforUser(Email3 ,preName,result.path);
  //console.log(BlockchainDataStored);
      // document.getElementById('email').innerHTML =email ;
      //document.getElementById('pname').innerHTML = name;
     // document.getElementById('cid1').innerHTML = cid ;

      //let BlockchainDataRead = await ReadPreView('abc@gmail.com','XYZ'); 
   // console.log("Read Data From Blockchain: ",BlockchainDataRead);
}

 const read = document.getElementById("readData");
 read.onclick = readFromBlockchain;
 async function readFromBlockchain(e){
  e.preventDefault()
  const Email3 = localStorage.getItem("xyz");
  console.log(Email3)
  const preName = document.getElementById('pname1').value;

    //console.log(BlockchainDataStored);
        // document.getElementById('email').innerHTML =email ;
        //document.getElementById('pname').innerHTML = name;
       // document.getElementById('cid1').innerHTML = cid ;
  
       await ReadPreView(Email3,preName); 
     
        // console.log(`https://ipfs.io/ipfs/${Blockchain}`);
        
   
      //  document.getElementById('email').innerHTML = BlockchainDataRead ;
      //  document.getElementById("myImg").src = `https://ipfs.io/ipfs/${BlockchainDataRead}`;

    


  }

