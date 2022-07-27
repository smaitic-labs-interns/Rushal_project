const fs = require('fs');


function getProductdata (){
    const file = fs.readFileSync('../files/product.json', {encoding:'utf8'});
return JSON.parse(file) ;
}

// const allProduct = getProductdata ()
function getProductdataUpdate(product) {

  try{
   fs.writeFileSync('../files/product.json', JSON.stringify(product , null , 2))
   return true
  }catch(e){
  //  console.log(e)
    console.log(`${e.name} => ${e.message}`)
    return false
  }
  
}
  
module.exports = { getProductdata , getProductdataUpdate};