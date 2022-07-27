
const user = require ('../userdb.js')
const peoples = user.getUserdata ()
const {v4: uuidv4} = require('uuid')



//sign in
const login = (email , password) => {
    var noUserfound = true;
    for(let i = 0 ; i < peoples.length ; i++){
       // console.log(peoples[i].name)
    if(peoples[i].email === email && peoples[i].password === password){
        console.log("login successful")
        noUserfound = false
  }      
}
if(noUserfound){
    console.log("invalid login details")
}
}
//login("rushal123@gmail.com" , "111")

//sign up

const signUP = (fname , lname , password, email, contact) => {
let userExist = false;
 for(let i = 0 ; i < peoples.length ; i++){
   if(email === peoples[i].email){
      console.log("email already exist")
      userExist = true;
   }
}
if(!userExist){
    const user_ID = {userID: uuidv4() ,fname: fname , lname: lname, password: password , email: email , contact: contact}
      peoples.push(user_ID)

   if (user.getUserdataupdate(peoples)){
    console.log("user registered")
    
   }   else{
    console.log("error")
   }
}
}
signUP ("rushal" , "maharjan", "111" , "ttaskdjasshal123@gmail.com" , "9843437654")










