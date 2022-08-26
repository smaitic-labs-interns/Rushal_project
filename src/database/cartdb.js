const fs = require('fs/promises');
require("dotenv").config({path: "../../.env"});
const path = process.env.CART_PATH
const db_connect = require('../config_database/mongoconfig')
const mongodb = require('mongodb')
//const path = "../../files/cart.json"

async function get_cart_data (){
  let con = await db_connect('cart');
  let data = await con.find().toArray();
  return data;
}

async function update_cart(cart) {
  try {
    await fs.writeFile(path, JSON.stringify(cart,null ,2))
    return true;
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}
  
async function update_cart_data(cart){
  try{
    let con = await db_connect('cart');
    let res = await con.updateOne({_id:new mongodb.ObjectId(cart._id)}, {$set:cart})
    return res.acknowledged
  }catch(e){
    throw e
  }
}

async function get_active_cart_data(user_id){
  try{
    let con = await db_connect('cart');
    let cart = await con.findOne({UserId: user_id, status:"active"});
    if(cart){
      return cart
    }
  return false
}catch(e){
  throw e
}
}
async function add_to_cart (cart){
  try {
    let con = await db_connect('cart');
    let result = await con.insertOne(cart);
    return result.acknowledged;
}catch(e){
throw e
}
}
async function update_quantity_from_cart(userid, productid, quantity) {
  try {
    let con = await db_connect("cart");
    let cart = await con.findOne({UserId: userid , status: "active" });
    // let cart = await con.findOne({_id: new mongodb.ObjectId(userid) });
     if(cart.UserId === userid) {
      for (var product of cart.Products) {
        if (product.id === productid) {
          product.Quantity = quantity;
          let res = await con.updateOne(
            { _id: cart._id},
            { $set: cart }
          );
          return res.acknowledged;
        }
      }  
  }
    throw new Error("no Cart found for id:" + userid);
  } catch (e) {
    throw e;
  }
}

async function remove_product_from_cart(userid , productid){
  try {
    let con = await db_connect("cart");
    let cart = await con.findOne({UserId :userid , status : "active"});
    if(cart) {
      let i = 0
      for(var product of cart.Products) {
        if (product.id === productid) {
          cart.Products.splice(i,1)
          let res = await con.updateOne({_id: new mongodb.ObjectId(cart._id)}, {$set : cart})
          return res.acknowledged;
        }
        i += 1
      }
    }
    throw new Error("no Cart found for id:" + userid);
  } catch (e) {
    throw e;
  }
}
async function find_cart (cartId) {
  try{
      const allCart = await get_cart_data()
      for(cart of allCart){
          if(cart.CartId === cartId){
              return cart;
          }
      }
      throw new Error("no cart found for id :" + cartId)
  }catch(e){
      throw e
  }
}

async function deactive_cart(cartid){
  try{
  const allCart = await get_cart_data()
  for(let cart of allCart){
    if(cart.CartId === cartid){
    cart.status = "deactive"
    // console.log(cart);
    return await update_cart(allCart)
    }
  }
  return false
}catch(e){
  throw e
}
}

module.exports = {
  get_cart_data,
  update_cart,
  update_cart_data,
  get_active_cart_data,
  add_to_cart,
  update_quantity_from_cart,
  remove_product_from_cart,
  find_cart,
  deactive_cart
};



