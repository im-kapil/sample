(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
