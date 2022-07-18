const user = require ('../database/userdb.js')
let peoples = user.getUserdata()
//console.log(user.getUserdata())
//console.log(peoples)
//const sign = user.getUserdata()




const login = (username , password) => {
    for(let i = 0 ; i < peoples.length ; i++){
       // console.log(peoples[i].name)
    if(peoples[i].username === username && peoples[i].password === password){
        return true
    }      
}
return false;
}
console.log(login("rushal123" , "111"))

/*function myFunction(username , password){
    for(i= 0 ; i < peoples.length ; i++){

    if(peoples[i].username === username && peoples[i].password === password){
        console.log("logged in")

    }else {
        console.log("unsuccessfull")
        return "not verified"
    }
    
    }
}
console.log(myFunction("rushal123" , "111"))*/

/*function login (username, password){
    let user = peoples.find((user) => {
        return user.username === username && user.password === password
  });
 if(user){
    console.log("Your logged in successfully");
    return user
 }else{
    console.log("Wrong username or password");
 } return "user not found"
}

const loggedInUser = login("" , "111")
console.log(loggedInUser);*/









