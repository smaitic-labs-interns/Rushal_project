
const fs = require('fs');



function getUserdata (){
const data = fs.readFileSync('../files/users.json', {encoding:'utf8'});
return JSON.parse(data) ;
}

 function getUserdataupdate (user){
//     fs.readFile('../files/users.json' , (err , data) =>{
//       if (err) throw err;
//       const newData = JSON.parse(data);
//       console.log(typeof newData);
//       newData.push(user);
//       console.log(newData);
//  })
const datab = getUserdata()
// for (key in datab){
//    for (subkey in datab[key]){
//        if(user.email === subkey){
//       console.log("user already exist")
//       break;
//       }
   
//    }
//  }
let userExist = false;
 for (let key in datab){
   // console.log(user.email)
   if(user.email === (datab[key]["email"])){
      console.log("email already exist")
   userExist = true;
     return 
   }
}
if(!userExist){
       datab.push(user)
fs.writeFileSync('../files/users.json', JSON.stringify(datab ,null ,2))
}

//const tempData = { [user["email"]] : user}
//datab.push(user)
// fs.writeFileSync('../files/users.json', JSON.stringify(datab , null ,2))
 } 
 //getUserdataupdate({name : "rushal" , })


 module.exports = {getUserdata , getUserdataupdate } 
//  const datab = fs.readFileSync('../files/users.json')
//  const tempData = JSON.parse(datab)
//  tempData [user["email"]] = user
  
//    fs.writeFileSync('../files/users.json', JSON.stringify(tempData , null, 2), (err) => {
//       if (err) throw err;
//       console.log('The file has been saved!');
//  });
//  console.log(JSON.parse(datab))
 
//}
// getUserdataupdate(user)
 
