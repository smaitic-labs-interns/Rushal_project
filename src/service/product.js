const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')



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
    const item = {
      product_id: uuidv4(),
      category: category,
      name: name,
      price: price,
      brand: brand,
      Quantity: quantity,
    };
    if (product.add_product(item)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
// add_product("mobile","any" ,  100, "dell", 1);


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
// remove_product("8429c11c-115d-4914-a1b7-66dadc22646d");



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

const pro = { category: "keyboard", name: "5r32e423" ,  price: 100, brand: "protech", Quantity:2 };
// update_product("8429c11c-115d-4914-a1b7-66dadc22646d", pro);
