
const user = require ('../database/userdb.js')
const peoples = user.getUserdata ()




//sign in
const login = (username , password) => {
    for(let i = 0 ; i < peoples.length ; i++){
       // console.log(peoples[i].name)
    if(peoples[i].username === username && peoples[i].password === password){
        return true;
    }      
}
return false;
}
console.log(login("rushal123" , "111"))


//sign up

const signUP = (fname , lname , password, email, contact) => {
    
    const form = {fname: fname , lname: lname, password: password , email: email , contact: contact}
   
    user.getUserdataupdate(form)
     
}

signUP ("rushal" , "maharjan", "123" , "man@gmail.com" , "9843437654")









