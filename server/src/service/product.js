const product = require('../database/productdb.js')
// const {v4 : uuidv4} = require('uuid')
const Schema = require('../models/productModel')


const get_all_products = async () =>{
  try {
    const products = await product.get_product_data()
    if (products.length > 0) {
      // console.log(products);
      return products
       
     }else{
      return ({
        'message': 'no product found'
      })
     }
  } catch (error) {
    
  }
}
get_all_products()

const get_product_id = async (id) =>{
  try{
    const products = await product.get_product_by_id(id)
    if(products){
      return products
    }
    return ({
      'message': 'no product found'
    })
  }catch(err){
    
  }
}
get_product_id()


const search_product = async(keyword) => {
  try {
    const result = await product.find_product_from_data(keyword)
    if (result.length > 0) {
     console.log(result);
      return result
    }
    throw new Error("no result found");
  }catch (err) {
    console.log(err.message);
    throw err
  }
};

// search_product("s");

const add_product = async(category, name, price, brand, quantity) => {
  try {
    const item =  Schema.product_schema(category, name, price, brand, quantity);
    if (await product.add_product(item)) {
      console.log("item added");
      return "item added"
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
    throw err
  }
};
// add_product("mobile","galaxy" ,  100, "samsung", 50);


const remove_product = async (productid) => {
  try {
    const res = await product.remove_product_from_data(productid)
    if (res) {
      console.log("removed successfully");
      return "removed successfully";
    }
  } catch (err) {
    console.log(err.message);
    throw err
  }
};
// remove_product("09c8a116-c18e-447a-bd3f-d3a4af3c7783");



const update_product = async(productid , productinfo) => {
  try {
    if(await product.update_product_from_data(productid ,productinfo)){
        console.log("updated successfully");
        return "updated successfully" ;
      } 
  } catch (err) {
    console.log(err.message);
    throw err
  }
};

const pro = {price: 150 , Quantity: 50 };
// update_product("30939740-d5df-4fc8-928c-5af178c0c832", pro);

module.exports = {add_product ,search_product,update_product,remove_product , get_all_products , get_product_id }