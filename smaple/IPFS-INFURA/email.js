// var nodemailer = require('nodemailer');
var nodemailer = window.require('nodemailer');
const Email =  document.getElementById("sendemail");
Email.onclick = sendEmail;
function sendEmail(e){
  e.preventDefault()
  // const rEmail=document.getElementById("remail").value;
  // const Subject=document.getElementById("subject").value;
  // const Body=document.getElementById("body").value;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  type: 'SMTP', host: 'smtp.gmail.com',
  auth: {
    user: 'mynextflim1234@gmail.com',
    pass: 'zhuiltqcqpxxrrcb'
  }
});
var mailOptions = {
  from: "mynextflim1234@gmail.com",
  to: "praveshenter9303@gmail.com",
  subject: "Subject",
  text: "testing"
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
//main("mynextflim1234@gmail.com","Praveshenter9303@gmail.com","Please permit me to see the script","Batman Script....My mail id is Praveshenter9303@gmail.com");