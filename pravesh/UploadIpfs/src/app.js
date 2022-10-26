const {createPreViewforUser} = require('./web3connect')
const { create } = require("ipfs-http-client");
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
file.onchange= fileSelected;

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
const result = await ipfs.add(selectedFile);
console.log("..............>>>>>>>> CID",result.path);
let BlockchainData = await createPreViewforUser('asha@gmail.com', 'Asha Jampangire',result.path);
console.log("....................>>>>>>Blockchain Stored data",BlockchainData);
}