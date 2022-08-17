const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')



const search_product = async(keyword) => {
  try {
    const result = await product.findProductFromData(keyword)
    if (result.length > 0) {
     console.log(result);
      return;
    }
    throw new Error("no result found");
  }catch (err) {
    console.log(err.message);
  }
};

//search_product("r");

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
    if (product.addProduct(item)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
//add_product("mobile","any" ,  100, "dell", 1);


const remove_product = async(productid) => {
  try {
    if(product.removeProductFromData(productid)){
        console.log("removed successfully");
        return;
      }
    console.log("no product on this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};
//remove_product("71ac5d77-b5a4-498b-a747-66f08f3b4850");



const update_product = async(productid , productinfo) => {
  try {
    if(product.updateProductFromData(productid ,productinfo)){
        console.log("updated successfully");
        return;
      }
    console.log("no product found for this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};

const pro = { category: "keyboard", name: "fantech" ,  price: 100, brand: "protech", Quantity:2 };
update_product("bb21e162-973e-4067-bdd5-dc3f80a7beda", pro);
