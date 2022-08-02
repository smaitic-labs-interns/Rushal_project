const fs = require('fs');


function getOrderdata (){
    const file = fs.readFileSync('../../files/order.json', {encoding:'utf8'});
return JSON.parse(file) ;
}

function updateOrderData(order) {

  try{
   fs.writeFileSync('../../files/order.json', JSON.stringify(order , null , 2))
   return true
  }catch(e){
    console.log(`${e.name} => ${e.message}`)
    return false
  }
  
}
