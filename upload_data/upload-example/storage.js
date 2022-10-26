import { Web3Storage } from 'web3.storage'

////////////////////////////////
////// Image upload & listing
////////////////////////////////

// #region storeImage


export async function storeImage(imageFile, caption) {
  // const uploadName = [namePrefix, caption].join('|')



  const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRGRjdBMDEwYzUzMzQ3OTc1YzRDOTJGMDJiMkI4MTBiRjFEQTBmYTciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjM3MzY0ODA0MjEsIm5hbWUiOiJ0ZXN0aW5nIn0.RSH5aIBubtGHekP4h4Y9RB-pmwmpCdMSH99j8H-2fjE"
  
  const web3storage = new Web3Storage({ token })
  const cid = await web3storage.put([imageFile], {
    // name: uploadName,

  })
//   const imageURI = `https://dweb.link/ipfs/${cid}/${imageFile.name}`
const imageURI = `https://${cid}.ipfs.dweb.link/${imageFile.name}`
  console.log("imageURI",imageURI)


}