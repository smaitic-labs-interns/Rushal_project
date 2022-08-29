const fs = require('fs/promises');
require("dotenv").config({ path: "../../.env" });
const path = process.env.ORDER_PATH
const db_connect = require('../config_database/mongoconfig')
const mongodb = require('mongodb')

async function get_order_data (){
  let con = await db_connect('order');
  let data = await con.find().toArray();
  return data;
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
    let con = await db_connect('order');
    let result = await con.insertOne(order);
    return result.acknowledged;
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
