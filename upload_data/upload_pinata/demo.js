
// import { useState } from 'react';
// import FormData from 'form-data';
// import axios from 'axios';
const rfs = require("recursive-fs")
const fs = require ("fs");
const { async } = require("recursive-fs/lib/copy");



  // const [file, setFile] = useState()
  // const [myipfsHash, setIPFSHASH] = useState('')
  const src = "./box-img-lg.png";
   const file = fs.readFile(src, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(data);
    // const file = data
    return data;
  });
  // const fileToHandle = fs.createReadStream(files)
  console.log(file)
  // console.log(fileToHandle);


//   const handleFile=async (file) =>{

    

//     console.log('starting')

//     // initialize the form data
//     const formData = new FormData()

//     // append the file form data to 
//     formData.append("file", fileToHandle)

//     // call the keys from .env

//     const API_KEY = process.env.public_API_Key
//     const API_SECRET = process.env.private_API_Secretkey

//     // the endpoint needed to upload the file
//     const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

//     const response = await axios.post(
//       url,
//       formData,
//       {
//           maxContentLength: "Infinity",
//           headers: {
//               "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
//               'pinata_api_key': API_KEY,
//               'pinata_secret_api_key': API_SECRET

//           }
//       }
//   )

//   console.log(response)

//   // get the hash
//   setIPFSHASH(response.data.IpfsHash)
// }

  

//   return (
//     <div className="App">
//       <input type="file" onChange={(event)=>setFile(event.target.files[0])}/>
//       <button onClick={()=>handleFile(file)}>Pin to ipfs using pinata api</button>
      
      
//     {

//       //  render the hash
//       myipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>
//     }
    

//     </div>
//   );


// export default App;