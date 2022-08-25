const fs = require('fs/promises');
require("dotenv").config({ path: "../../.env" });
const path = process.env.ORDER_PATH

async function get_order_data (){
    const file = await fs.readFile(path, {encoding:'utf8'});
return JSON.parse(file) ;
}

async function update_order_data(order) {
  try {
    fs.writeFile(path, JSON.stringify(order, null, 2));
    return true;
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}

async function add_order(order) {
  try {
    const allOrder = await get_order_data();
    delete order.status
    delete order.CartId
    allOrder.push(order);
    return update_order_data(allOrder);
  } catch (e) {
    throw e;
  }
}
async function get_order_by_id(orderid) {
  try {
    const allOrder = await get_order_data();
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
async function update_order (orderid , neworder){
  try{
    const allOrder = await get_order_data();
    for(let order of allOrder){
      if(order.OrderId === orderid){
        allOrder[allOrder.indexOf(order)] = neworder;
        return update_order_data(allOrder)
      }
    }
  }catch(e){
   throw e
  }
}




 module.exports = {get_order_data , update_order_data, add_order, get_order_by_id,update_order}
