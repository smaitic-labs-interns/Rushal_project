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


async function get_order_by_userid(userid) {
  try {
    let con = await db_connect("order");
    let orders = await con.find({ UserId: userid}).toArray();
    if (orders) {
      return orders;
    }
  } catch (e) {
    throw e;
  }
}

async function add_order(order) {
  try {
    let con = await db_connect('order');
    let res = await con.insertOne(order);
    return res;
  } catch (e) {
    throw e;
  }
}
async function get_order_by_id(orderid) {
  try {
    let con = await db_connect("order");
    let order = await con.findOne({ _id: new mongodb.ObjectId(orderid)});
    if (order) {
      return order;
    }
  } catch (e) {
    throw e;
  }
}
async function update_order (orderid , neworder){
  try{
    let con = await db_connect("order");
    let order = await con.findOne({_id : new mongodb.ObjectId(orderid)});
    if(order){
      let res = await con.updateOne({_id : new mongodb.ObjectId(orderid)},{ $set: neworder });
    return res.acknowledged;
    }
    throw new Error("no order found for this id :" + orderid);
  }catch(e){
   throw e
  }
}




 module.exports = {get_order_data , add_order, get_order_by_id,update_order, get_order_by_userid}
