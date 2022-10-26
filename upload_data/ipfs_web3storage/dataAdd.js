
// import process from 'process'
import minimist from 'minimist'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import dotenv  from'dotenv';
dotenv.config();

async function main () {
  const args = minimist(process.argv.slice(2))
  const token = args.token

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }

  if (args._.length < 1) {
    return console.error('Please supply the path to a file or directory')
  }

  const storage = new Web3Storage({ token })
  const files = []

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('https://dweb.link/ipfs/', cid)
}

main()



// import { Web3Storage } from 'web3.storage'



// function getAccessToken () {
//   // If you're just testing, you can paste in a token
//   // and uncomment the following line:
//   // return 'paste-your-token-here'

//   // In a real app, it's better to read an access token from an
//   // environement variable or other configuration that's kept outside of
//   // your code base. For this to work, you need to set the
//   // WEB3STORAGE_TOKEN environment variable before you run your code.
//   const tokenKey= process.env.WEB3STORAGE_TOKEN
//   return tokenKey
// }



// function makeStorageClient () {
//   return new Web3Storage({ token: getAccessToken() })
// }

// console.log(makeStorageClient())
// function setupUploadUI() {

//   const uploadButton = document.getElementById('upload-button')
//   const fileInput = document.getElementById('file-input')
//   const dropArea = document.getElementById('drop-area')
//   console.log(uploadButton);
//   console.log(fileInput)
//   // handle file selection changes
//   fileInput.onchange = fileSelected

//   // handle upload button clicks
//   uploadButton.onclick = uploadClicked
// }

// setupUploadUI()

//   // function getFiles () {
// //   const fileInput = document.querySelector('input[type="file"]')
// //   return fileInput.files
// // }

// // function makeFileObjects () {
// //   // You can create File objects from a Blob of binary data
// //   // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
// //   // Here we're just storing a JSON object, but you can store images,
// //   // audio, or whatever you want!
// //   const obj = { hello: 'world' }
// //   const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

// //   const files = [
// //     new File(['contents-of-file-1'], 'plain-utf8.txt'),
// //     new File([blob], 'hello.json')
// //   ]
// //   return files
// // }
 
//   // const args = minimist(process.argv.slice(2))
//   // const files = []

//   //   const pathFiles = await getFilesFromPath('pizz.png')
//   //   console.log(pathFiles)
//   //   files.push(...pathFiles)

  
// console.log(".....................///...................//............")
// async function storeFiles (file) {
//   const client = makeStorageClient()
//   const cid = await client.put(file)
//   console.log('stored files with cid:', cid)
//   return cid
// }
// storeFiles()
// console.log("..................///.......................///.............///")