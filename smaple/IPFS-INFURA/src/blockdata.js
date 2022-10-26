
const {createPreViewforUser} = require('./upload.js')
let Submit1 = document.getElementById('submit');
Submit1.onclick = storedData;

//let Submit2 = document.getElementById('read');
//Submit2.onclick = readData;

async function storedData(){
    //e.preventDefault()
    //const email = sessionStorage.getItem('EMAIL');
    window.addEventListener('load', () => {
    const cid = sessionStorage.getItem('CID');
    console.log("stored Cid is",cid);
})
   let pname = document.getElementById('pName').value;
  let BlockchainDataStored = await createPreViewforUser(email,pname,cid);
  //document.getElementById('result-email').innerHTML = email;
   //document.getElementById('result-pname').innerHTML = pname;
  // document.getElementById('result-cid').innerHTML = cid;
    //console.log("Blockchain Stored data:",BlockchainDataStored);
     //let BlockchainDataRead = await ReadPreView('abc@gmail.com','XYZ'); 
    //console.log("Read Data From Blockchain: ",BlockchainDataRead);
    }
  storedData();

  

    