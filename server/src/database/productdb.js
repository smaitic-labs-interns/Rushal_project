const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
const db_connect = require('../config_database/mongoconfig')
const path = process.env.PRODUCT_PATH
const mongodb = require('mongodb');


async function get_product_data() {
  let con = await db_connect('products');
  let data = await con.find().toArray();
  // console.log(data);
  return data;
}


// async function update_product_data(product) {
//   try {
//     await fs.writeFile(path, JSON.stringify(product,null ,2))
//     return true;

//   } catch (e) {
//     console.log(`${e.name} => ${e.message}`);
//     return false;
//   }
// }
async function get_product_by_id(id) {
  try {
    let con = await db_connect("products");
    let product = await con.findOne({ _id: new mongodb.ObjectId(id)});
    if (product) {
      return product;
    }
    throw new Error("no product found for this id")
  } catch (e) {
    throw e;
  }
}
async function add_product (product){
  try{
    let con = await db_connect('products');
    let result = await con.insertOne(product);
    return result.acknowledged;
  }catch(e){
    throw e
  }
}

async function find_product_from_data (keyword) {
try{
  const allProduct = await get_product_data()
  const result = [];
    for (let product of allProduct) {
      for (key in product) {
        if(key === "product_id"){
          continue
        }else{
        if (typeof product[key] === "string" && typeof keyword === "string") {
          if (product[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            result.push(product);
            break;
          }
        }
      }
      }
    }
    return result;

}catch(e){
  console.log(e.message);
}
}

async function remove_product_from_data(id) {
  try {
    let con = await db_connect("products");
    let product = await con.findOne({_id :new mongodb.ObjectId(id)});
    if(product){
    let res = await con.deleteOne({_id :new mongodb.ObjectId(id)});
    return res.acknowledged; 
    }
    throw new Error ("no product found for id :" + id)
  } catch (e) {
    throw e;
  }
}

async function update_product_from_data(id, productinfo) {
  try {
    let con = await db_connect("products");
    let product = await con.findOne({_id : new mongodb.ObjectId(id)});
    if(product){
      console.log(productinfo);
      let res = await con.updateOne({_id : new mongodb.ObjectId(id)},{ $set:productinfo});
    return res.acknowledged;
    }
    throw new Error("no product found for this id :" + id);
  } catch (e) {
    throw e;
  }
}
async function checking_product(productid){
  try {
    let db = await db_connect("products");
    const product = await db.findOne({_id : new mongodb.ObjectId(productid)})
      if(product){
        return product
      }
    throw new Error("no product found for id:" + productid);
  } catch (e) {
    throw e;
  }
};

async function update_decrease_quantity(id, quantity) {
  try{
    let con = await db_connect("products");
    let product = await con.findOne({_id : new mongodb.ObjectId(id)});
    if(product){
      let res = await con.updateOne({_id : new mongodb.ObjectId(id)},{$set:{Quantity:(product.Quantity - quantity)}});
      return res.acknowledged
    }
    throw new Error ("no product found for id:" + id);
  }catch(e){
    throw e
  }
}
  async function update_increase_quantity(id, quantity) {
    try{
      let con = await db_connect("products");
      let product = await con.findOne({_id : new mongodb.ObjectId(id)});
      if(product){
        let res = await con.updateOne({_id : new mongodb.ObjectId(id)},{$set:{Quantity:(product.Quantity + quantity)}});
        return res.acknowledged
      }
      throw new Error ("no product found for id:" + id);
    }catch(e){
      throw e
    }
  }

  async function update_product(id, newproduct) {
   try{
    let con = await db_connect("products");
    let product = await con.findOne({_id : new mongodb.ObjectId(id)});
    if(product){
      let res = await con.updateOne({_id : new mongodb.ObjectId(id)},{ $set: newproduct });
    return res.acknowledged;
    }
    throw new Error("no product found for this id :" + id);
   }catch(e){
    throw e
   }
  }


module.exports = {
  get_product_data,
  get_product_by_id,
  add_product,
  find_product_from_data,
  remove_product_from_data,
  update_product_from_data,
  checking_product,
  update_decrease_quantity,
  update_product,
  update_increase_quantity,
};
