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

search_product("l");

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
// add_product("mouse","logitech" ,  100, "dell", 50);


const remove_product = async (productid) => {
  try {
    const res = await product.remove_product_from_data(productid)
    if (res) {
      console.log("removed successfully");
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};
// remove_product("2ce29e55-1dd2-4b79-9cfc-47e45845fcae");



const update_product = async(productid , productinfo) => {
  try {
    if(await product.update_product_from_data(productid ,productinfo)){
        console.log("updated successfully");
        return ;
      } 
  } catch (err) {
    console.log(err.message);
  }
};

const pro = {price: 150 , Quantity: 4 };
// update_product("6308b359341824941e94f3b9", pro);
