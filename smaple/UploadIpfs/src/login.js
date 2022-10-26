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
  
  }
  
  async function loginUser(e){
    e.preventDefault()
    Email = document.getElementById('email').value;
    Pass = document.getElementById('psw').value;
    let log = userlog(Email,Pass);
    console.log(log);
   return Email;
  }

 export function Email(){
    const ema = loginUser() 
    return ema
  }

  