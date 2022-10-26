const { create } = require("ipfs-http-client");
const projectId = '2FNjE1lCSxe3pPGK3H8FH1gMdT4';   // <---------- your Infura Project ID

const projectSecret = '9466554632345d063b3ecfeb140d1b3e';  // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfsclient = async () =>{
    // const fileInput = document.getElementById('avatar')

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

async function save(){
let ipfs = await ipfsclient();

const result = await ipfs.add("hello MNF");
console.log(result);
// console.log("hello world");

}

save();

