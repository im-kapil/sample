import { create as ipfsHttpClient } from 'ipfs-http-client';
import {Buffer} from 'buffer';
export async function storeImage(imageFile, caption) {
const projectId = '2FNjE1lCSxe3pPGK3H8FH1gMdT4';
const projectSecret = '9466554632345d063b3ecfeb140d1b3e';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});
let added;
added = await client.add(imageFile);
console.log(added);
/*client.add(imageFile, async(err, res) =>{
    console.log(res);
    if(err){
        console.log(err)
    }
    else {
        const hash = await res[0].hash;
        console.log(hash);        
    }
});*/
}