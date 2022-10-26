const { create } = require('ipfs-http-client');	
const dotenv = require('dotenv')
require('dotenv').config()

const projectId = process.env.PROJECTID;   // <---------- your Infura Project ID

const projectSecret = process.env.PROJECTSCREAT;  // <---------- your Infura Secret			
// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })	

				
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')	

// (for security concerns, consider saving these values in .env files)
// const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');			
	console.log(projectId)	
    console.log(projectSecret)	


const client = async ()=>{
const ipfs = await create({				
host: 'ipfs.infura.io',				
port: 5001,				
protocol: 'https',				
apiPath: '/api/v0/',				
headers: {				
authorization: auth				
}				
})

return ipfs;
}	


const save = async()=>{
    const ipfs = await client();

    await ipfs.add("Hello", async(err, hash) =>{				
        if(err){				
            console.log(err)				
        }				
        else {				
            const hash = await hash;				
            console.log(hash);				
        }				
    });				
}