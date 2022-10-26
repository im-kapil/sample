
import { storeImage } from './storage.js'


let selectedFile = null


  const uploadButton = document.getElementById('upload-button')
  const fileInput = document.getElementById('file-input')

  // handle file selection changes
  fileInput.onchange = fileSelected

  // handle upload button clicks
  uploadButton.onclick = uploadClicked



function fileSelected(e) {
  if (e.target.files.length < 1) {
    console.log('nothing selected')
    return
  }
  selectedFile = e.target.files[0]
}

function uploadClicked(evt) {
  evt.preventDefault()
  storeImage(selectedFile)
  
}


// API Key: 5e9aad924ccaaa73ade5
//  API Secret: 92c2ee67b794cf5109ffa7e85bf3966e2a1374401e9e663c6c59b8d6965028bf
//  JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MzY2YzEwNS1kYjUyLTRkNDktOGVlMy00MjgyOGMwYzBkNmMiLCJlbWFpbCI6InByYXZlc2hlbnRlcjkzMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjVlOWFhZDkyNGNjYWFhNzNhZGU1Iiwic2NvcGVkS2V5U2VjcmV0IjoiOTJjMmVlNjdiNzk0Y2Y1MTA5ZmZhN2U4NWJmMzk2NmUyYTEzNzQ0MDFlOWU2NjNjNmM1OWI4ZDY5NjUwMjhiZiIsImlhdCI6MTY2Mzg1OTQyOH0.g8MpIHcZqDLkg-0b77lnQxOGxp19N561KKyBR9Gmj1A