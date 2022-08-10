const product = require('../database/productdb.js')
const {v4 : uuidv4} = require('uuid')



const search_product = async(keyword) => {
  try {
    const allProduct = await product.getProductdata ()
    const result = [];
    for (let products of allProduct) {
      for (key in products) {
        if(key === "product_id" || key === "brand"){
          continue
        }else{
        if (typeof products[key] === "string" && typeof keyword === "string") {
          if (products[key].toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
            result.push(products);
            break;
          }
        }
      }
      }
    }
    if (result.length > 0) {
     console.log(result);
      return;
    }
    throw new Error("no result found");
  }catch (err) {
    console.log(err.message);
  }
};

// search_product("520");

const add_product = async(category, name, price, brand, quantity) => {
  try {
    const allProduct = await product.getProductdata ()
    allProduct.push({
      product_id: uuidv4(),
      category: category,
      name: name,
      price: price,
      brand: brand,
      Quantity: quantity,
    });
    if (product.updateProductData(allProduct)) {
      console.log("item added");
    } else {
      throw new Error("error while adding");
    }
  } catch (err) {
    console.log(err.message);
  }
};
// add_product("computer","any" ,  100, "dell", 1);


const remove_product = async(productid) => {
  try {
    const allProduct = await product.getProductdata ()
    var i = 0
    for (let Product of allProduct) {
      if (Product.product_id === productid) {
        allProduct.splice(i,1)
        if (product.updateProductData(allProduct)) {
          console.log("removed successfully");
          return;
        }
        throw new Error("error occur while saving on database");
      }
      i += 1
    }
    console.log("no product on this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};
//remove_product("ff97d64e-c90a-466b-9d8a-28a17209a622");



const update_product = async(productid, productinfo) => {
  try {
    const allProduct = await product.getProductdata ()
    for (let Product of allProduct) {
      if (Product.product_id === productid) {
        for (let key in productinfo) {
          Product[key] = productinfo[key];
        }
        if (product.updateProductData(allProduct)) {
          console.log("Data updated");
          return;
        }
        throw new Error("error occured while updating");
      }
    }

    console.log("no product found for this id :" + productid);
  } catch (err) {
    console.log(err.message);
  }
};

const pro = { category: "computer", name: "fantech" ,  price: 100, brand: "samsung", Quantity:2 };
//update_product("2065e804-0034-44a2-b091-dcbcb92dd7ec", pro);
