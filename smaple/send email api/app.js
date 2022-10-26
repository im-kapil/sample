const express = require("express");
const bodyParser = require("body-parser")
var fileupload = require("express-fileupload");
var nodemailer = require('nodemailer');


const fs = require("fs");

const app = express();
app.use(fileupload());
app.use(express.json());
app.use(express.static('public'));  

function sendEmail(_to,_subject,_body){
    
    // const rEmail=document.getElementById("remail").value;
    // const Subject=document.getElementById("subject").value;
    // const Body=document.getElementById("body").value;
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: 'mynextflim1234@gmail.com',
      pass: 'zhuiltqcqpxxrrcb'
    }
  });
  var mailOptions = {
    from: "mynextflim1234@gmail.com",
    to: _to,
    subject: _subject,
    text: _body
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      alert("Email send succesfully")
    }
  });
  
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
  const _to = req.body.num1
  const _subject = req.body.num2
  const _body = req.body.num3
//   await save(data,function(err,data) {  
//     if(err) {  
//       return res.end("Error uploading file.");  
//     }  
//     res.end("upload data - ",data);
//    }); 
const save_file =  sendEmail(_to,_subject,_body)
 console.log(save_file)
res.send('File is uploaded successfully!');

});

app.listen(3000, function(){
console.log("server is running on port 3000");
})
