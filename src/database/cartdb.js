const fs = require('fs');
require('dotenv').config();
const path = "../../files/cart.json"
console.log(path);

function getCartdata (){
    const file = fs.readFileSync(path, {encoding:'utf8'});
return JSON.parse(file) ;
}

function getCartDataUpdate(cart) {

  try{
   fs.writeFileSync(path, JSON.stringify(cart , null , 2))
   return true
  }catch(e){
    console.log(`${e.name} => ${e.message}`)
    return false
  }
  
}
  
module.exports = { getCartdata  ,getCartDataUpdate };



