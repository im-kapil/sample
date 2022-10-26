const {register,userlog} = require('./web3connect.js')
let signin = document.getElementById('SignIn');
signin.onclick = loginUser;

let signup = document.getElementById('SignUp');
signup.onclick = registerUser;

async function registerUser(e){
    e.preventDefault()
  
      Email = document.getElementById('email').value;
     Pass = document.getElementById('psw').value;
  
     let reg = register(Email,Pass);
     console.log(reg);
    //  alert("register successfully")
  
  }
  
  async function loginUser(e){
    e.preventDefault()
    Email3 = document.getElementById('email').value;
    Pass = document.getElementById('psw').value;
      userlog(Email3,Pass);
   // console.log(email1,pass);
  }
  //var Email3;
  //console.log(Email3);
  //module.exports={Email3};
  
  