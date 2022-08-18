const fs = require('fs/promises');
require("dotenv").config({ path: "../../.env" });
const path = process.env.ORDER_PATH

async function getOrderdata (){
    const file = await fs.readFile(path, {encoding:'utf8'});
return JSON.parse(file) ;
}

async function updateOrderData(order) {
  try {
    fs.writeFile(path, JSON.stringify(order, null, 2));
    return true;
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}

async function addOrder(order) {
  try {
    const allOrder = await getOrderdata();
    delete order.CartId
    allOrder.push(order);
    return updateOrderData(allOrder);
  } catch (e) {
    throw e;
  }
}
async function getOrderById(orderid) {
  try {
    const allOrder = await getOrderdata();
    for (let order of allOrder) {
      if (order.OrderId === orderid) {
        return order;
      }
    }
    return false;
  } catch (e) {
    throw e;
  }
}
async function updateOrder (orderid , neworder){
  try{
    const allOrder = await getOrderdata();
    for(let order of allOrder){
      if(order.OrderId === orderid){
        allOrder[allOrder.indexOf(order)] = neworder;
        return updateOrderData(allOrder)
      }
    }
  }catch(e){
   throw e
  }
}




 module.exports = {getOrderdata , updateOrderData, addOrder, getOrderById,updateOrder}
