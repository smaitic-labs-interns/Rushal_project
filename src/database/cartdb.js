const fs = require('fs');


function getCartdata (){
    const file = fs.readFileSync('../../files/cart.json', {encoding:'utf8'});
return JSON.parse(file) ;
}

function getCartDataUpdate(cart) {

  try{
   fs.writeFileSync('../../files/cart.json', JSON.stringify(cart , null , 2))
   return true
  }catch(e){
    console.log(`${e.name} => ${e.message}`)
    return false
  }
  
}
  
module.exports = { getCartdata  ,getCartDataUpdate };