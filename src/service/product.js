const product = require('../database/productdb.js')
// const {v4 : uuidv4} = require('uuid')
const Schema = require('../models/productModel')



const search_product = async(keyword) => {
  try {
    const result = await product.find_product_from_data(keyword)
    if (result.length > 0) {
     console.log(result);
      return;
    }
    throw new Error("no result found");
  }catch (err) {
    console.log(err.message);
  }
};

// search_product("r");

const add_product = async(category, name, price, brand, quantity) => {
  try {
    const item =  Schema.product_schema(category, name, price, brand, quantity);
    if (product.add_product(item)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
// add_product("Gaming chair","logitech" ,  100, "dell", 1);


const remove_product = async(productid) => {
  try {
    if(await product.remove_product_from_data(productid)){
        console.log("removed successfully");
        return;
      }
    console.log("no product on this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};
remove_product("6307779f619ef08485006bdb");



const update_product = async(productid , productinfo) => {
  try {
    if(await product.update_product_from_data(productid ,productinfo)){
        console.log("updated successfully");
        return;
      }
    console.log("no product found for this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};

const pro = { category: "Laptop", name: "legion" , price: 100, brand: "lenovo", Quantity:2 };
// update_product("63075cac4f233b1e01250096", pro);
