const fs = require('fs/promises');
require("dotenv").config({ path: "../../.env" });
const path = '../../files/order.json'


async function getOrderdata (){
    const file = await fs.readFile(path, {encoding:'utf8'});
return JSON.parse(file) ;
}

async function updateOrderData(order) {
  try{
    // const allOrder = await getOrderdata()
    // allOrder.push(order)
   fs.writeFile('../../files/order.json', JSON.stringify(order , null , 2))
  return true;
  }catch(e){
    console.log(`${e.name} => ${e.message}`)
    return false
  }
  
}
 module.exports = {getOrderdata , updateOrderData}
