const fs = require("fs/promises");
require("dotenv").config({ path: "../../.env" });
//const path = "../../files/product.json"
const path = process.env.PRODUCT_PATH

async function get_product_data() {
  const file = await fs.readFile(path, {encoding: "utf8",});
  return JSON.parse(file);
}

async function update_product_data(product) {
  try {
    await fs.writeFile(path, JSON.stringify(product,null ,2))
    return true;
  } catch (e) {
    console.log(`${e.name} => ${e.message}`);
    return false;
  }
}
async function get_product_by_id(id) {
  try {
    const allproduct = await get_product_data();
  let res = allproduct.filter((product) => product.product_id === id);
  return res[0]
  } catch (e) {
    console.log(e.message);
  }
}
async function add_product (product){
  try{
    const allProduct = await get_product_data ()
    allProduct.push(product)
    return update_product_data(allProduct)
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
        if(key === "product_id" || key === "brand"){
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

async function remove_product_from_data (id){
try{
  const allProduct = await get_product_data()
  var i = 0
  for (let Product of allProduct) {
    if (Product.product_id === id) {
      allProduct.splice(i,1)
      if (update_product_data(allProduct)) {
        return true;
      } 
    }
    i +=1
  }
  throw new Error ("no product found for id :" + id)
}catch(e){
throw e
}
}

async function update_product_from_data(id , productinfo){
  try{
    const allProduct = await get_product_data()
    for (let Product of allProduct) {
      if (Product.product_id === id) {
        for (let key in productinfo) {
          Product[key] = productinfo[key];
        }
        if (update_product_data(allProduct)) {
          return true;
        }
  }
}
throw new Error ("no product found for id :" + id)
  }catch (e){
    throw e
  }
}
async function checking_product(productid){
  try {
      const allProduct = await get_product_data()
    for (var product of allProduct) {
      if (product.product_id === productid) {
        return product;
      }
    }
    throw new Error("no product found for id:" + productid);
  } catch (e) {
    throw e;
  }
};
async function update_decrease_quantity(id , quantity) {

  const allProduct = await get_product_data()
  for(product of allProduct){
      if (product.product_id === id){
          product.Quantity -= quantity
      }
  }
  if(update_product_data(allProduct)){
      return true
  }else{
      console.log("error Occured");
  }
  }

  async function update_increase_quantity(id , quantity) {

    const allProduct = await get_product_data()
    for(product of allProduct){
        if (product.product_id === id){
            product.Quantity += quantity
        }
    }
    if(update_product_data(allProduct)){
        return true
    }else{
        console.log("error Occured");
    }
    }

  async function update_product(id, newproduct) {
    const allProduct = await get_product_data();
    for (product of allProduct) {
      if (product.product_id === id) {
        allProduct[allProduct.indexOf(product)] = newproduct;
        if (update_product_data(allProduct)) {
          return true;
        }
      }
    }

    throw new Error("error Occured");
  }
module.exports = {
  get_product_data,
  update_product_data,
  get_product_by_id,
  add_product,
  find_product_from_data,
  remove_product_from_data,
  update_product_from_data,
  checking_product,
  update_decrease_quantity,
  update_product,
  update_increase_quantity
};
