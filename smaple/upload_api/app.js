const express = require("express");
const bodyParser = require("body-parser")
const { create } = require("ipfs-http-client");
var fileupload = require("express-fileupload");

// const fs = require("fs");
// const path = __dirname + "/1.json"
// console.log(path)


const app = express();
app.use(fileupload());
app.use(express.json());
app.use(express.static('public'));  






const projectId = '2FwGSAzKPU3GzOdp0LYsR3Y4VDb';   // <---------- your Infura Project ID

const projectSecret = '5a5b618b295a6600315b8009320a6098';  // <---------- your Infura Secret
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


// const files = ["this is new value","pravesh","rajdeep","asha"]

async function save(file){
  // const fruits = [];

// for(i=0;i<files.length; i++){

  // console.log(files[i])
  

    let ipfs = await ipfsclient();
    
    const result = await ipfs.add(file);
    // console.log(result);
    // console.log("hello world");
// fruits.push(result);
    return result;  
//  }
//  console.log(fruits)

}


// New app using express module
app.use(bodyParser.urlencoded({extended: true}));

// app.use(multer({ dest: '/tmp/'}));


app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});
// router.get('/', function(req, res) {
//   res.render('index', { title: 'ONIX Validator' });
// });

app.post("/loadfile",async function(req, res) {
  
  
  // console.dir(req.files.fileName);
  const data = req.files.fileName.data;
//   await save(data,function(err,data) {  
//     if(err) {  
//       return res.end("Error uploading file.");  
//     }  
//     res.end("upload data - ",data);
// }); 
const save_file = await save(data)
 console.log(save_file)
res.send('File is uploaded successfully!'+ 


JSON.stringify(save_file,null));

});

app.listen(3000, function(){
console.log("server is running on port 3000");
})
